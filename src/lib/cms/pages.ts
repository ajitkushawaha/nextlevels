import connectDB from '@/lib/db'
import CmsPage from '@/models/CmsPage'
import { defaultHomePageContent } from './homeDefaults'
import { defaultAboutPageContent } from './aboutDefaults'
import { defaultServicesPageContent } from './servicesDefaults'
import { defaultContactPageContent } from './contactDefaults'
import { defaultPrivacyPolicyContent, defaultTermsContent } from './legalDefaults'
import { defaultFaqPageContent } from './faqDefaults'
import { parseCmsPageContent } from './validation'
import type { CmsPageContent, CmsPageDocument, CmsSection } from './types'

const defaultPages: Record<string, { title: string; content: CmsPageContent }> = {
  '/': {
    title: 'Home Page',
    content: defaultHomePageContent,
  },
  '/services': {
    title: 'Services Page',
    content: defaultServicesPageContent,
  },
  '/about-us': {
    title: 'About Page',
    content: defaultAboutPageContent,
  },
  '/contact-us': {
    title: 'Contact Page',
    content: defaultContactPageContent,
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    content: defaultPrivacyPolicyContent,
  },
  '/terms': {
    title: 'Terms & Conditions',
    content: defaultTermsContent,
  },
  '/faq': {
    title: 'FAQ Page',
    content: defaultFaqPageContent,
  },
}

const homeDestinationOrder = [
  'United Kingdom',
  'Canada',
  'Australia',
  'New Zealand',
]

export function normalizeCmsPageSlug(slug: string) {
  if (!slug || slug === 'home') return '/'
  if (slug === 'about') return '/about-us'
  if (slug === 'contact') return '/contact-us'
  if (slug === 'privacy') return '/privacy-policy'
  if (slug === 'faqs') return '/faq'
  return slug.startsWith('/') ? slug : `/${slug}`
}

function withDefaultSections(content: unknown, slug: string) {
  const parsed = content as CmsPageContent
  const defaultPage = defaultPages[slug]

  if (!defaultPage || !parsed?.sections) return content

  const existingSectionsById = new Map(
    parsed.sections.map(section => [section.id, section])
  )
  const defaultSectionIds = new Set(
    defaultPage.content.sections.map(section => section.id)
  )
  const mergedSections: CmsSection[] = defaultPage.content.sections.map(defaultSection => {
    const existingSection = existingSectionsById.get(defaultSection.id)
    const section = existingSection || defaultSection

    if (
      slug === '/about-us' &&
      section.type === 'aboutCeoMessage' &&
      defaultSection.type === 'aboutCeoMessage' &&
      (
        section.name === 'CEO Name' ||
        section.image === '/service/team1.png' ||
        section.title === 'A Few Words from Our CEO'
      )
    ) {
      return defaultSection
    }

    if (
      slug === '/contact-us' &&
      section.type === 'contactMapOffice' &&
      defaultSection.type === 'contactMapOffice'
    ) {
      const defaultBranchMap = new Map(
        defaultSection.branches.map(branch => [branch.name, branch])
      )

      return {
        ...section,
        branches: section.branches.map(branch => ({
          ...(defaultBranchMap.get(branch.name) || {}),
          ...branch,
        })),
      } as CmsSection
    }

    if (section.type !== 'homeDestinations') return section

    return {
      ...section,
      destinations: homeDestinationOrder
        .map(countryName =>
          section.destinations.find(destination => destination.name === countryName)
        )
        .filter(Boolean),
    } as CmsSection
  })

  parsed.sections.forEach(section => {
    if (!defaultSectionIds.has(section.id)) {
      mergedSections.push(section)
    }
  })

  return {
    ...parsed,
    sections: mergedSections,
  } as CmsPageContent
}

function serializePage(page: any): CmsPageDocument {
  const slug = normalizeCmsPageSlug(page.slug)
  const defaultPage = defaultPages[slug]

  let draftContent: CmsPageContent
  let publishedContent: CmsPageContent | undefined

  try {
    draftContent = parseCmsPageContent(withDefaultSections(page.draftContent, slug))
  } catch (error) {
    console.warn(`[CMS] Validation failed for draft content of '${slug}'. Falling back to defaults.`)
    if (!defaultPage) throw error
    draftContent = defaultPage.content
  }

  if (page.publishedContent) {
    try {
      publishedContent = parseCmsPageContent(withDefaultSections(page.publishedContent, slug))
    } catch (error) {
      console.warn(`[CMS] Validation failed for published content of '${slug}'. Falling back to defaults.`)
      publishedContent = defaultPage?.content
    }
  }

  return {
    slug,
    title: page.title,
    draftContent,
    publishedContent,
    status: page.status,
    updatedAt: page.updatedAt?.toISOString?.(),
    publishedAt: page.publishedAt?.toISOString?.(),
  }
}

export async function getCmsPageBySlug(slug: string) {
  await connectDB()

  const normalizedSlug = normalizeCmsPageSlug(slug)
  const page = await (CmsPage as any).findOne({ slug: normalizedSlug }).lean()

  if (page) return serializePage(page)

  const defaultPage = defaultPages[normalizedSlug]
  if (!defaultPage) return null

  return {
    slug: normalizedSlug,
    title: defaultPage.title,
    draftContent: defaultPage.content,
    publishedContent: defaultPage.content,
    status: 'published',
  } satisfies CmsPageDocument
}

export async function ensureCmsPage(slug: string) {
  await connectDB()

  const normalizedSlug = normalizeCmsPageSlug(slug)
  const existing = await (CmsPage as any).findOne({ slug: normalizedSlug }).lean()
  if (existing) return serializePage(existing)

  const defaultPage = defaultPages[normalizedSlug]
  if (!defaultPage) return null

  const created = await (CmsPage as any).create({
    slug: normalizedSlug,
    title: defaultPage.title,
    draftContent: defaultPage.content,
    publishedContent: defaultPage.content,
    status: 'published',
    publishedAt: new Date(),
  })

  return serializePage(created)
}

export async function getPublishedCmsContent(slug: string) {
  const page = await getCmsPageBySlug(slug)
  return page?.publishedContent || null
}
