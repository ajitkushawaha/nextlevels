import { NextResponse } from 'next/server'
import connectDb from '@/lib/db'
import Blog from '@/models/Blog'

export const dynamic = 'force-dynamic'

const formatDate = (dateValue: any): string => {
  try {
    if (!dateValue) return 'Recently'
    const date = new Date(dateValue)
    if (isNaN(date.getTime())) return 'Recently'
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return 'Recently'
  }
}

export async function GET() {
  try {
    await connectDb()

    const blogs = await (Blog as any)
      .find({ status: 'published' })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(6)
      .select('title slug excerpt featuredImage author category publishedAt createdAt')
      .lean()

    const formattedBlogs = blogs.map((blog: any) => ({
      title: blog.title,
      slug: blog.slug,
      href: `/blog/${blog.slug}`,
      excerpt: blog.excerpt || '',
      image: blog.featuredImage || '/visa/blog-placeholder.png',
      author: blog.author || 'Admin',
      category: blog.category || '',
      date: formatDate(blog.publishedAt || blog.createdAt),
    }))

    return NextResponse.json({ blogs: formattedBlogs }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching recent blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch recent blogs' }, { status: 500 })
  }
}
