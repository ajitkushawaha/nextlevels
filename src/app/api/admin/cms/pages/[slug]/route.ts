import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import CmsPage from '@/models/CmsPage'
import { ensureCmsPage } from '@/lib/cms/pages'
import { parseCmsPageContent } from '@/lib/cms/validation'

type Params = { params: Promise<{ slug: string }> }

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

function normalizeSlug(slug: string) {
  return slug === 'home' ? '/' : slug.startsWith('/') ? slug : `/${slug}`
}

export async function GET(_req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await params
    const page = await ensureCmsPage(slug)

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('CMS page GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await params
    const body = await req.json()
    const draftContent = parseCmsPageContent(body.draftContent)
    const title = typeof body.title === 'string' && body.title.trim()
      ? body.title.trim()
      : 'Untitled Page'

    await connectDB()

    const page = await (CmsPage as any).findOneAndUpdate(
      { slug: normalizeSlug(slug) },
      {
        $set: {
          title,
          draftContent,
          status: body.status === 'published' ? 'published' : 'draft',
        },
        $setOnInsert: {
          publishedContent: draftContent,
        },
      },
      { upsert: true, new: true }
    ).lean()

    return NextResponse.json({ page })
  } catch (error: any) {
    console.error('CMS draft save failed:', error)

    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid CMS content', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
