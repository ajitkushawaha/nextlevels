import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import CourseFilterSettings from '@/models/CourseFilterSettings'
import { getDynamicCourseFilterSettings } from '@/lib/courseFilterOptions'
import {
  sanitizeFilterList,
} from '@/lib/courseFilterSettings'

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
    const settings = await (CourseFilterSettings as any).findOne({ key: 'default' }).lean()

    return NextResponse.json({
      settings: await getDynamicCourseFilterSettings(settings),
    })
  } catch (error) {
    console.error('Admin course filter settings GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const payload = {
      countries: sanitizeFilterList(body.countries),
      fields: sanitizeFilterList(body.fields),
      degreeTypes: sanitizeFilterList(body.degreeTypes),
      universities: sanitizeFilterList(body.universities),
    }

    await connectDB()
    const settings = await (CourseFilterSettings as any).findOneAndUpdate(
      { key: 'default' },
      { key: 'default', ...payload },
      { new: true, upsert: true }
    )

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Admin course filter settings PUT failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
