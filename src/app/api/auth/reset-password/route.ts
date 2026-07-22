import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/db'
import OTP from '@/models/OTP'
import User from '@/models/User'

function normalizeEmail(value: unknown) {
  return String(value || '').trim().toLowerCase()
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = normalizeEmail(body.email)
    const otp = String(body.otp || '').trim()
    const password = String(body.password || '')

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'Valid 6-digit OTP is required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    await connectDB()

    const otpRecord = await (OTP as any).findOne({
      identifier: email,
      otp,
      type: 'email',
      purpose: 'password_reset',
      isUsed: false,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    const user = await (User as any).findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'No account found with this email' }, { status: 404 })
    }

    user.password = await bcrypt.hash(password, 10)
    user.status = { ...(user.status || {}), isActive: true }
    await user.save()

    otpRecord.isUsed = true
    await otpRecord.save()

    return NextResponse.json({ success: true, message: 'Password reset successfully' })
  } catch (error) {
    console.error('Reset password failed:', error)
    return NextResponse.json({ error: 'Unable to reset password' }, { status: 500 })
  }
}
