import { NextResponse } from 'next/server'
import { getCmsPageBySlug } from '@/lib/cms/pages'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const { slug } = await params
    const page = await getCmsPageBySlug(slug)

    if (!page || !page.publishedContent) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json({
      slug: page.slug,
      title: page.title,
      content: page.publishedContent,
      publishedAt: page.publishedAt,
    })
  } catch (error) {
    console.error('Public CMS page GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
