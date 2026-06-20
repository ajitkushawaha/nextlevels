import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import CourseFilterSettings from '@/models/CourseFilterSettings'
import { defaultCourseFilterSettings } from '@/lib/courseFilterSettings'
import { getDynamicCourseFilterSettings } from '@/lib/courseFilterOptions'

export async function GET() {
  try {
    await connectDB()
    const settings = await (CourseFilterSettings as any).findOne({ key: 'default' }).lean()

    return NextResponse.json({
      settings: await getDynamicCourseFilterSettings(settings),
    })
  } catch (error) {
    console.error('Public course filter settings GET failed:', error)
    return NextResponse.json({ settings: defaultCourseFilterSettings })
  }
}
