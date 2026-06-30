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

function normalizeSlug(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

function getIframeUrl(value: unknown) {
  const input = String(value || '').trim()
  const srcMatch = input.match(/<iframe\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1/i)
  const candidate = (srcMatch?.[2] || input).replace(/&amp;/g, '&')
  try {
    const url = new URL(candidate)
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null
  } catch {
    return null
  }
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const agents = await (ReferralAgent as any).find({}).sort({ createdAt: -1 }).lean()
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
    const code = normalizeSlug(String(body.code || ''))
    if (!String(body.name || '').trim()) {
      return NextResponse.json({ error: 'Agent name is required' }, { status: 400 })
    }
    if (!code) {
      return NextResponse.json({ error: 'URL slug is required' }, { status: 400 })
    }

    const iframeUrl = getIframeUrl(body.iframeUrl)
    if (!iframeUrl) return NextResponse.json({ error: 'A valid iframe URL or embed code is required' }, { status: 400 })

    await connectDB()
    const created = await ReferralAgent.create({
      name: String(body.name).trim(),
      code,
      iframeUrl,
      email: body.email || '',
      phone: body.phone || '',
      notes: body.notes || '',
      isActive: body.isActive !== false,
    })

    return NextResponse.json({ agent: created }, { status: 201 })
  } catch (error: any) {
    console.error('Admin referral agents POST failed:', error)
    return NextResponse.json(
      { error: error.code === 11000 ? 'This URL slug already exists' : 'Internal server error' },
      { status: 500 }
    )
  }
}
