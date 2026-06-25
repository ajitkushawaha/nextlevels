import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Enquiry from '@/models/Enquiry'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const inquiries = await (Enquiry as any)
      .find({ sourceType: { $ne: 'referral-agent' } })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ inquiries })
  } catch (error) {
    console.error('Admin inquiries GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
