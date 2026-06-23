import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import SiteSettings from '@/models/SiteSettings'
import { defaultSiteSettings, mergeSiteSettings } from '@/lib/siteSettings'

export async function GET() {
  try {
    await connectDB()
    const settings = await (SiteSettings as any).findOne({ key: 'global' }).lean()
    return NextResponse.json({ settings: mergeSiteSettings(settings) })
  } catch (error) {
    console.error('Public site settings GET failed:', error)
    return NextResponse.json({ settings: defaultSiteSettings })
  }
}
