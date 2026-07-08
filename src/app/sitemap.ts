import type { MetadataRoute } from 'next'
import connectDB from '@/lib/db'
import { getBranchSlugs } from '@/lib/branchPages'
import { serviceDetails } from '@/lib/serviceDetails'
import { slugify } from '@/lib/slug'
import { getStudyDestinationCanonicalSlug } from '@/lib/studyDestinations'
import Blog from '@/models/Blog'
import Country from '@/models/Country'
import Program from '@/models/Program'
import Scholarship from '@/models/Scholarship'
import ServicePage from '@/models/ServicePage'
import University from '@/models/University'

const BASE_URL = 'https://www.nextlevel.edu.lk'

type SitemapEntry = MetadataRoute.Sitemap[number]

function entry(
  path: string,
  changeFrequency: SitemapEntry['changeFrequency'],
  priority: number,
  lastModified: Date = new Date()
): SitemapEntry {
  return {
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    entry('', 'weekly', 1),
    entry('/about-us', 'monthly', 0.8),
    entry('/services', 'weekly', 0.9),
    entry('/courses', 'daily', 0.9),
    entry('/blog', 'daily', 0.8),
    entry('/testimonial', 'monthly', 0.7),
    entry('/contact-us', 'monthly', 0.8),
    entry('/faq', 'monthly', 0.6),
    entry('/privacy-policy', 'yearly', 0.3),
    entry('/terms', 'yearly', 0.3),
  ]

  const [branchSlugs, databaseEntries] = await Promise.all([
    getBranchSlugs(),
    getDatabaseEntries(),
  ])

  const branchEntries = branchSlugs.map(slug => entry(`/branches/${slug}`, 'monthly', 0.8))
  const serviceEntries = serviceDetails.map(service =>
    entry(`/services/${service.slug}`, 'monthly', 0.8)
  )
  const uniqueEntries = new Map<string, SitemapEntry>()
  for (const item of [
    ...staticEntries,
    ...branchEntries,
    ...serviceEntries,
    ...databaseEntries,
  ]) {
    uniqueEntries.set(item.url, item)
  }

  return Array.from(uniqueEntries.values())
}

async function getDatabaseEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB()
    const [blogs, countries, programs, scholarships, services, universities] = await Promise.all([
      (Blog as any).find({ status: 'published' }).select('slug updatedAt').lean(),
      (Country as any).find({}).select('code cmsData.slug updatedAt').lean(),
      (Program as any).find({}).select('title cmsData.slug updatedAt').lean(),
      (Scholarship as any).find({}).select('title cmsData.slug updatedAt').lean(),
      (ServicePage as any).find({ status: 'published' }).select('slug updatedAt').lean(),
      (University as any).find({}).select('name cmsData.slug updatedAt').lean(),
    ])

    return [
      ...blogs.map((item: any) => entry(`/blog/${item.slug}`, 'weekly', 0.7, item.updatedAt)),
      ...countries.map((item: any) => entry(`/study-abroad/${getStudyDestinationCanonicalSlug(item.cmsData?.slug || item.code)}`, 'monthly', 0.8, item.updatedAt)),
      ...programs.map((item: any) => entry(`/courses/${item.cmsData?.slug || slugify(item.title)}`, 'monthly', 0.7, item.updatedAt)),
      ...scholarships.map((item: any) => entry(`/scholarships/${item.cmsData?.slug || slugify(item.title)}`, 'weekly', 0.7, item.updatedAt)),
      ...services.map((item: any) => entry(`/services/${item.slug}`, 'monthly', 0.8, item.updatedAt)),
      ...universities.map((item: any) => entry(`/universities/${item.cmsData?.slug || encodeURIComponent(item.name)}`, 'monthly', 0.7, item.updatedAt)),
    ]
  } catch (error) {
    console.error('Sitemap database lookup failed:', error)
    return []
  }
}
