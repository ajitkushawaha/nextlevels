import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import ReferralAgent from '@/models/ReferralAgent'
import Enquiry from '@/models/Enquiry'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

function makeCode(name: string) {
  const base = name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 18) || 'AGENT'
  return `${base}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

function makeToken() {
  return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`.toUpperCase()
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const existingAgents = await (ReferralAgent as any).find({}).sort({ createdAt: -1 })
    await Promise.all(
      existingAgents
        .filter((agent: any) => !agent.publicToken)
        .map((agent: any) => {
          agent.publicToken = makeToken()
          return agent.save()
        })
    )
    const agents = existingAgents.map((agent: any) => agent.toObject())
    const counts = await (Enquiry as any).aggregate([
      { $match: { referralAgentCode: { $nin: ['', null] } } },
      { $group: { _id: '$referralAgentCode', total: { $sum: 1 } } },
    ])
    const countMap = new Map(counts.map((item: any) => [item._id, item.total]))

    return NextResponse.json({
      agents: agents.map((agent: any) => ({
        ...agent,
        totalLeads: countMap.get(agent.code) || 0,
      })),
    })
  } catch (error) {
    console.error('Admin referral agents GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    if (!body.name) {
      return NextResponse.json({ error: 'Agent name is required' }, { status: 400 })
    }

    await connectDB()
    const created = await ReferralAgent.create({
      name: body.name,
      code: body.code ? String(body.code).trim().toUpperCase() : makeCode(body.name),
      publicToken: makeToken(),
      email: body.email || '',
      phone: body.phone || '',
      notes: body.notes || '',
      isActive: body.isActive !== false,
    })

    return NextResponse.json({ agent: created }, { status: 201 })
  } catch (error: any) {
    console.error('Admin referral agents POST failed:', error)
    return NextResponse.json(
      { error: error.code === 11000 ? 'Agent code already exists' : 'Internal server error' },
      { status: 500 }
    )
  }
}
