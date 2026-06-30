import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import ReferralAgent from '@/models/ReferralAgent'

type Params = {
  params: Promise<{ code: string }>
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { code } = await params
    await connectDB()
    const lookupValue = code.toUpperCase()
    const agent = await (ReferralAgent as any)
      .findOne({
        isActive: true,
        $or: [{ code: lookupValue }, { publicToken: lookupValue }],
      })
      .select('name code iframeUrl')
      .lean()

    if (!agent) return NextResponse.json({ error: 'Referral link not found' }, { status: 404 })
    if (!agent.iframeUrl) {
      return NextResponse.json(
        { error: 'Iframe is not configured for this referral agent' },
        { status: 422 }
      )
    }
    return NextResponse.json({ agent })
  } catch (error) {
    console.error('Public referral agent GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
