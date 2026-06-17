import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import CmsPage from '@/models/CmsPage'
import { ensureCmsPage, normalizeCmsPageSlug } from '@/lib/cms/pages'
import { parseCmsPageContent } from '@/lib/cms/validation'

type Params = { params: Promise<{ slug: string }> }

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

export async function POST(_req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await params
    const existingPage = await ensureCmsPage(slug)

    if (!existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const draftContent = parseCmsPageContent(existingPage.draftContent)

    await connectDB()

    const page = await (CmsPage as any).findOneAndUpdate(
      { slug: normalizeCmsPageSlug(slug) },
      {
        $set: {
          publishedContent: draftContent,
          status: 'published',
          publishedAt: new Date(),
        },
      },
      { new: true }
    ).lean()

    revalidatePath(normalizeCmsPageSlug(slug))

    return NextResponse.json({ page })
  } catch (error: any) {
    console.error('CMS publish failed:', error)

    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid CMS content', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
