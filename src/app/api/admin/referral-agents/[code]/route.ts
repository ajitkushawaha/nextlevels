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
    const nextCode = normalizeSlug(String(body.code || ''))
    const iframeUrl = getIframeUrl(body.iframeUrl)
    if (!String(body.name || '').trim() || !nextCode) {
      return NextResponse.json({ error: 'Agent name and URL slug are required' }, { status: 400 })
    }
    if (!iframeUrl) {
      return NextResponse.json({ error: 'A valid iframe URL or embed code is required' }, { status: 400 })
    }

    await connectDB()
    const currentCode = code.toUpperCase()
    const updated = await (ReferralAgent as any).findOneAndUpdate(
      { code: currentCode },
      {
        name: String(body.name).trim(),
        code: nextCode,
        iframeUrl,
        email: body.email || '',
        phone: body.phone || '',
        notes: body.notes || '',
        isActive: body.isActive !== false,
      },
      { new: true }
    )
    if (!updated) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    if (currentCode !== nextCode) {
      await (Enquiry as any).updateMany(
        { referralAgentCode: currentCode },
        { $set: { referralAgentCode: nextCode, referralAgentName: updated.name } }
      )
    }
    return NextResponse.json({ agent: updated })
  } catch (error: any) {
    console.error('Admin referral agent PATCH failed:', error)
    return NextResponse.json(
      { error: error.code === 11000 ? 'This URL slug already exists' : 'Internal server error' },
      { status: error.code === 11000 ? 409 : 500 }
    )
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { code } = await params
    await connectDB()
    const deleted = await (ReferralAgent as any).findOneAndDelete({ code: code.toUpperCase() })
    if (!deleted) return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin referral agent DELETE failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
