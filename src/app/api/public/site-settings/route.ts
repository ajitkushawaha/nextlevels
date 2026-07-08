import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import SiteSettings from '@/models/SiteSettings'
import Country from '@/models/Country'
import Branch from '@/models/Branch'
import { defaultSiteSettings, mergeSiteSettings } from '@/lib/siteSettings'
import { getStudyDestinationCanonicalSlug } from '@/lib/studyDestinations'

export async function GET() {
  try {
    await connectDB()
    const [storedSettings, countries, savedBranches] = await Promise.all([
      (SiteSettings as any).findOne({ key: 'global' }).lean(),
      (Country as any).find({}).select('name code cmsData.slug').lean(),
      (Branch as any).find({ isActive: { $ne: false } }).select('slug').lean(),
    ])
    const settings = mergeSiteSettings(storedSettings)
    const countryPaths = new Map(
      countries.map((country: any) => [
        String(country.name).toLowerCase(),
        `/study-abroad/${getStudyDestinationCanonicalSlug(country.cmsData?.slug || country.code)}`,
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

    const liveBranchSlugs = new Set([
      'jaffna',
      'batticaloa',
      ...savedBranches.map((branch: any) => String(branch.slug).toLowerCase()),
    ])
    const withBranchStatus = (link: any) => {
      const slug = String(link.href).split('/').filter(Boolean).pop()?.toLowerCase() || ''
      const isLive = liveBranchSlugs.has(slug)
      return {
        ...link,
        label: isLive ? String(link.label).replace(/\s*\(Coming Soon\)$/i, '') : `${String(link.label).replace(/\s*\(Coming Soon\)$/i, '')} (Coming Soon)`,
      }
    }
    settings.header.navItems = settings.header.navItems.map(item => ({
      ...item,
      dropdownItems:
        item.label === 'Branches' && item.dropdownItems
          ? item.dropdownItems.map(withBranchStatus)
          : item.dropdownItems,
    }))
    settings.footer.branchLinks = settings.footer.branchLinks.map(withBranchStatus)

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Public site settings GET failed:', error)
    return NextResponse.json({ settings: defaultSiteSettings })
  }
}
