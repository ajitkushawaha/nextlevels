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
    const existingSlugs = new Set(pages.map((page: any) => page.slug))
    const mergedPages = [
      ...pages,
      ...defaultSeoPages
        .filter(page => !existingSlugs.has(page.slug))
        .map((page, index) => ({
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
        })),
    ]

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
    const slug = String(page.slug ?? '').replace(/^\/+/, '').trim()
    const title = String(page.title || slug || 'Home').trim()

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
