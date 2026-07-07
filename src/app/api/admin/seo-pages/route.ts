import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Page from '@/models/Page'

const defaultSeoPages = [
  { title: 'Home', slug: '' },
  { title: 'About Us', slug: 'about-us' },
  { title: 'Services', slug: 'services' },
  { title: 'Contact Us', slug: 'contact-us' },
  { title: 'FAQ', slug: 'faq' },
  { title: 'Testimonials', slug: 'testimonial' },
  { title: 'Blog', slug: 'blog' },
  { title: 'Privacy Policy', slug: 'privacy-policy' },
  { title: 'Terms & Conditions', slug: 'terms' },
]

const canonicalSeoSlugs: Record<string, string> = {
  '': '',
  '/': '',
  home: '',
  about: 'about-us',
  'about-us': 'about-us',
  services: 'services',
  'our services': 'services',
  'our-services': 'services',
  'our/services': 'services',
  'contact-us': 'contact-us',
  contact: 'contact-us',
  faq: 'faq',
  testimonial: 'testimonial',
  testimonials: 'testimonial',
  'testimonial-next-level-education': 'testimonial',
  'testimonials-next': 'testimonial',
  blog: 'blog',
  'privacy-policy': 'privacy-policy',
  privacy: 'privacy-policy',
  terms: 'terms',
  'terms-and-conditions': 'terms',
}

const defaultSeoPageBySlug = new Map(defaultSeoPages.map(page => [page.slug, page]))

function normalizeSeoSlug(value: unknown) {
  const slug = String(value ?? '')
    .trim()
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')

  return canonicalSeoSlugs[slug.toLowerCase()] ?? slug
}

function makeDefaultSeoPage(page: { title: string; slug: string }, index = 0) {
  return {
    ...page,
    description: '',
    status: 'active',
    order: index,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    featuredImage: '',
    ogTitle: '',
    ogDescription: '',
    canonical: '',
    robots: 'index, follow',
  }
}

function preferSeoPage(current: any | undefined, next: any) {
  if (!current) return next
  if (!current._id && next._id) return next
  if (current._id && !next._id) return current

  const currentIsCanonical = normalizeSeoSlug(current.slug) === String(current.slug ?? '').trim().replace(/^\/+/, '').replace(/\/+$/, '')
  const nextIsCanonical = normalizeSeoSlug(next.slug) === String(next.slug ?? '').trim().replace(/^\/+/, '').replace(/\/+$/, '')

  if (!currentIsCanonical && nextIsCanonical) return next
  if (currentIsCanonical && !nextIsCanonical) return current

  const currentUpdatedAt = current.updatedAt ? new Date(current.updatedAt).getTime() : 0
  const nextUpdatedAt = next.updatedAt ? new Date(next.updatedAt).getTime() : 0
  return nextUpdatedAt > currentUpdatedAt ? next : current
}

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
    const pages = await (Page as any).find().sort({ order: 1, title: 1 }).lean()
    const pagesBySlug = new Map<string, any>()

    defaultSeoPages.forEach((page, index) => {
      pagesBySlug.set(page.slug, makeDefaultSeoPage(page, index))
    })

    pages.forEach((page: any) => {
      const slug = normalizeSeoSlug(page.slug)
      const defaultPage = defaultSeoPageBySlug.get(slug)
      const normalizedPage = {
        ...page,
        title: defaultPage?.title || page.title,
        slug,
        robots: page.robots || 'index, follow',
      }

      pagesBySlug.set(slug, preferSeoPage(pagesBySlug.get(slug), normalizedPage))
    })

    const mergedPages = Array.from(pagesBySlug.values()).sort((a, b) => {
      const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : 999
      const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : 999
      return orderA - orderB || String(a.title || '').localeCompare(String(b.title || ''))
    })

    return NextResponse.json({ pages: mergedPages })
  } catch (error) {
    console.error('SEO pages GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const page = body.page || {}
    const slug = normalizeSeoSlug(page.slug)
    const title = String(page.title || defaultSeoPageBySlug.get(slug)?.title || slug || 'Home').trim()

    await connectDB()
    const saved = await (Page as any).findOneAndUpdate(
      { slug },
      {
        title,
        slug,
        description: page.description || '',
        content: page.content || '',
        status: page.status || 'active',
        order: Number(page.order || 0),
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || '',
        metaKeywords: page.metaKeywords || '',
        featuredImage: page.featuredImage || '',
        ogTitle: page.ogTitle || '',
        ogDescription: page.ogDescription || '',
        canonical: page.canonical || '',
        robots: page.robots || 'index, follow',
        category: page.category || 'seo',
        tags: Array.isArray(page.tags) ? page.tags : [],
        author: page.author || 'Admin',
        publishedAt: new Date(),
      },
      { new: true, upsert: true }
    ).lean()

    return NextResponse.json({ page: saved })
  } catch (error) {
    console.error('SEO pages PUT failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
