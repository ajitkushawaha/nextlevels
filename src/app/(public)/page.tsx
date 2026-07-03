export const dynamic = 'force-dynamic'

import PageRenderer from '@/components/cms/PageRenderer'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'
import connectDb from '@/lib/db'
import UniversityModel from '@/models/University'
import type { CmsPageContent } from '@/lib/cms/types'

import { universitiesData } from '@/lib/mockData'

async function syncUniversityLogos(content: CmsPageContent) {
  const universitySection = content.sections.find(section => section.type === 'homeUniversities')
  if (!universitySection || universitySection.type !== 'homeUniversities') return content

  const fallbackUniversities = Object.values(universitiesData).slice(0, 8).map(u => ({
    name: u.name,
    logo: u.logo,
    coverImage: u.coverImage,
    worldRank: u.worldRank,
    students: u.students,
    established: u.established,
    description: u.description,
    country: u.country,
    location: u.location,
    flag: u.flag,
    website: u.website,
    accreditation: u.accreditation,
    slug: u.name
  }))

  const pinnedUniversities = universitySection.universities && universitySection.universities.length > 0
    ? universitySection.universities
    : fallbackUniversities

  try {
    await connectDb()
    const universityRecords = await (UniversityModel as any)
      .find({ name: { $in: pinnedUniversities.map(u => u.name) } })
      .lean()

    const dbUniMap = new Map<string, any>(
      universityRecords.map((univ: any) => [univ.name, univ])
    )

    const syncedUniversities = pinnedUniversities.map(univ => {
      const dbUniv = dbUniMap.get(univ.name)
      if (!dbUniv) return univ

      return {
        ...univ,
        logo: dbUniv.logo || univ.logo,
        coverImage: dbUniv.bannerImage || univ.coverImage,
        worldRank: dbUniv.globalRanking ? `#${dbUniv.globalRanking}` : univ.worldRank,
        location: dbUniv.city ? `${dbUniv.city}, ${univ.country || ''}` : univ.location,
        website: dbUniv.websiteUrl || univ.website,
      }
    })

    return {
      ...content,
      sections: content.sections.map(section =>
        section.type === 'homeUniversities'
          ? {
              ...section,
              universities: syncedUniversities,
            }
          : section
      ),
    }
  } catch (error) {
    console.error('Failed to sync homepage university logos:', error)
    return {
      ...content,
      sections: content.sections.map(section =>
        section.type === 'homeUniversities'
          ? {
              ...section,
              universities: pinnedUniversities,
            }
          : section
      ),
    }
  }
}

export async function generateMetadata() {
  const seoData = await fetchSEOData('/')
  return generateSEOMetadata(seoData)
}

export default async function Home() {
  const savedContent = (await getPublishedCmsContent('/')) || defaultHomePageContent
  const content = await syncUniversityLogos(savedContent)

  return <PageRenderer slug="/" content={content} />
}
