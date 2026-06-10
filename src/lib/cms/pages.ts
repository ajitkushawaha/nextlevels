import connectDB from '@/lib/db'
import CmsPage from '@/models/CmsPage'
import { defaultHomePageContent } from './homeDefaults'
import { parseCmsPageContent } from './validation'
import type { CmsPageContent, CmsPageDocument, CmsSection } from './types'

const defaultPages: Record<string, { title: string; content: CmsPageContent }> = {
  '/': {
    title: 'Home Page',
    content: defaultHomePageContent,
  },
}

function normalizeSlug(slug: string) {
  if (!slug || slug === 'home') return '/'
  return slug.startsWith('/') ? slug : `/${slug}`
}

function withDefaultSections(content: unknown, slug: string) {
  const parsed = content as CmsPageContent
  const defaultPage = defaultPages[slug]

  if (!defaultPage || !parsed?.sections) return content

  const existingSectionIds = new Set(parsed.sections.map(section => section.id))
  const mergedSections: CmsSection[] = [...parsed.sections]

  defaultPage.content.sections.forEach(defaultSection => {
    if (existingSectionIds.has(defaultSection.id)) return

    const staticSectionIndex = mergedSections.findIndex(
      section => section.type === 'homeStaticSections'
    )

    if (staticSectionIndex >= 0) {
      mergedSections.splice(staticSectionIndex, 0, defaultSection)
      return
    }

    mergedSections.push(defaultSection)
  })

  return {
    ...parsed,
    sections: mergedSections,
  } as CmsPageContent
}

function serializePage(page: any): CmsPageDocument {
  const slug = normalizeSlug(page.slug)

  return {
    slug,
    title: page.title,
    draftContent: parseCmsPageContent(withDefaultSections(page.draftContent, slug)),
    publishedContent: page.publishedContent
      ? parseCmsPageContent(withDefaultSections(page.publishedContent, slug))
      : undefined,
    status: page.status,
    updatedAt: page.updatedAt?.toISOString?.(),
    publishedAt: page.publishedAt?.toISOString?.(),
  }
}

export async function getCmsPageBySlug(slug: string) {
  await connectDB()

  const normalizedSlug = normalizeSlug(slug)
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

  const normalizedSlug = normalizeSlug(slug)
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
