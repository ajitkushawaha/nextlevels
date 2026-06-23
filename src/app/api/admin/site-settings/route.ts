import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import SiteSettings from '@/models/SiteSettings'
import { defaultSiteSettings, mergeSiteSettings } from '@/lib/siteSettings'

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
    const settings = await (SiteSettings as any).findOne({ key: 'global' }).lean()
    return NextResponse.json({ settings: mergeSiteSettings(settings) })
  } catch (error) {
    console.error('Admin site settings GET failed:', error)
    return NextResponse.json({ settings: defaultSiteSettings })
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const settings = mergeSiteSettings(body.settings)

    await connectDB()
    const saved = await (SiteSettings as any).findOneAndUpdate(
      { key: 'global' },
      {
        key: 'global',
        header: settings.header,
        footer: settings.footer,
      },
      { new: true, upsert: true }
    ).lean()

    return NextResponse.json({ settings: mergeSiteSettings(saved) })
  } catch (error) {
    console.error('Admin site settings PUT failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
