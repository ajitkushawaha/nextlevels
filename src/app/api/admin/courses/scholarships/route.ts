import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Scholarship from '@/models/Scholarship'

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
    const scholarships = await (Scholarship as any).find({})
      .populate('countryId')
      .populate('universityId')
      .populate('programId')
      .sort({ title: 1 })
    return NextResponse.json({ scholarships })
  } catch (error) {
    console.error('Admin scholarships GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, awardAmount, eligibilityCriteria, description, countryId, universityId, programId } = body

    if (!title || !awardAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()
    const created = await Scholarship.create({
      title,
      awardAmount,
      eligibilityCriteria: eligibilityCriteria || '',
      description: description || '',
      countryId: countryId || undefined,
      universityId: universityId || undefined,
      programId: programId || undefined,
    })

    return NextResponse.json({ scholarship: created }, { status: 201 })
  } catch (error) {
    console.error('Admin scholarships POST failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
