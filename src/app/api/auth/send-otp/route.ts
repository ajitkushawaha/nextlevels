import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import OTP from '@/models/OTP'
import User from '@/models/User'
import { sendEmail } from '@/lib/email'

const allowedPurposes = new Set(['registration', 'login', 'password_reset'])

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function normalizeEmail(value: unknown) {
  return String(value || '').trim().toLowerCase()
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = normalizeEmail(body.email || body.identifier)
    const purpose = String(body.purpose || 'login')

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!allowedPurposes.has(purpose)) {
      return NextResponse.json({ error: 'Invalid OTP purpose' }, { status: 400 })
    }

    await connectDB()

    if (purpose === 'password_reset') {
      const user = await (User as any).findOne({ email })
      if (!user) {
        return NextResponse.json({ error: 'No account found with this email' }, { status: 404 })
      }
    }

    const otp = generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await (OTP as any).updateMany(
      { identifier: email, type: 'email', purpose, isUsed: false },
      { $set: { isUsed: true } }
    )

    await (OTP as any).create({
      identifier: email,
      email,
      otp,
      type: 'email',
      purpose,
      expiresAt,
      isUsed: false,
      attempts: 0,
    })

    await sendEmail({
      to: email,
      subject: 'Your Next Level Education OTP',
      text: `Your Next Level Education OTP is ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; color: #061331;">
          <h2 style="margin: 0 0 12px;">Next Level Education OTP</h2>
          <p style="margin: 0 0 16px; color: #475569;">Use the code below to continue. This OTP will expire in 10 minutes.</p>
          <div style="display: inline-block; padding: 14px 22px; border-radius: 12px; background: #061331; color: #d7a23a; font-size: 28px; font-weight: 800; letter-spacing: 6px;">
            ${otp}
          </div>
          <p style="margin-top: 20px; color: #64748b; font-size: 13px;">If you did not request this code, you can safely ignore this email.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, message: 'OTP sent successfully' })
  } catch (error) {
    console.error('Send OTP failed:', error)
    return NextResponse.json({ error: 'Unable to send OTP' }, { status: 500 })
  }
}
