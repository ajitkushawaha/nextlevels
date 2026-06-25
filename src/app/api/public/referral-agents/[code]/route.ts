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
    const agent = await (ReferralAgent as any)
      .findOne({ publicToken: code.toUpperCase(), isActive: true })
      .select('name code')
      .lean()

    if (!agent) return NextResponse.json({ error: 'Referral link not found' }, { status: 404 })
    return NextResponse.json({ agent })
  } catch (error) {
    console.error('Public referral agent GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
