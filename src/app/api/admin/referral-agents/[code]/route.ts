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

type Params = {
  params: Promise<{ code: string }>
}

export async function GET(_req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { code } = await params
    await connectDB()
    const agent = await (ReferralAgent as any).findOne({ code: code.toUpperCase() }).lean()
    if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })

    const enquiries = await (Enquiry as any)
      .find({ referralAgentCode: agent.code })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ agent, enquiries })
  } catch (error) {
    console.error('Admin referral agent GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { code } = await params
    const body = await req.json()
    await connectDB()
    const updated = await (ReferralAgent as any).findOneAndUpdate(
      { code: code.toUpperCase() },
      {
        name: body.name,
        email: body.email || '',
        phone: body.phone || '',
        notes: body.notes || '',
        isActive: body.isActive !== false,
      },
      { new: true }
    )
    if (!updated) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    return NextResponse.json({ agent: updated })
  } catch (error) {
    console.error('Admin referral agent PATCH failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
