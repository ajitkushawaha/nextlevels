import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import SiteSettings from '@/models/SiteSettings'
import Country from '@/models/Country'
import { defaultSiteSettings, mergeSiteSettings } from '@/lib/siteSettings'

export async function GET() {
  try {
    await connectDB()
    const [storedSettings, countries] = await Promise.all([
      (SiteSettings as any).findOne({ key: 'global' }).lean(),
      (Country as any).find({}).select('name code cmsData.slug').lean(),
    ])
    const settings = mergeSiteSettings(storedSettings)
    const countryPaths = new Map(
      countries.map((country: any) => [
        String(country.name).toLowerCase(),
        `/study-abroad/${country.cmsData?.slug || country.code}`,
      ])
    )
    const withSavedCountrySlug = (link: any) => ({
      ...link,
      href: countryPaths.get(String(link.label).toLowerCase()) || link.href,
    })

    settings.header.navItems = settings.header.navItems.map(item => ({
      ...item,
      dropdownItems:
        item.label === 'Study Abroad' && item.dropdownItems
          ? item.dropdownItems.map(withSavedCountrySlug)
          : item.dropdownItems,
    }))
    settings.footer.studyLinks = settings.footer.studyLinks.map(withSavedCountrySlug)

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Public site settings GET failed:', error)
    return NextResponse.json({ settings: defaultSiteSettings })
  }
}
