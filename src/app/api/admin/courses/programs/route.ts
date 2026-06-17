import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Program from '@/models/Program'

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
    const programs = await (Program as any).find({}).populate('universityId').sort({ title: 1 })
    return NextResponse.json({ programs })
  } catch (error) {
    console.error('Admin programs GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, universityId, degreeLevel, discipline, duration, tuitionFee, currency, intakes, ieltsScoreRequired, description } = body

    if (!title || !universityId || !duration || !tuitionFee) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()
    const created = await Program.create({
      title,
      universityId,
      degreeLevel: degreeLevel || 'Bachelor',
      discipline: discipline || 'IT',
      duration,
      tuitionFee: Number(tuitionFee),
      currency: currency || 'USD',
      intakes: intakes || [],
      ieltsScoreRequired: ieltsScoreRequired ? Number(ieltsScoreRequired) : 6.0,
      description: description || '',
    })

    return NextResponse.json({ program: created }, { status: 201 })
  } catch (error) {
    console.error('Admin programs POST failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
