import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BlogImage from '@/components/blog/BlogImage'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import BlogSearch from '@/components/blog/BlogSearch'
import connectDb from '@/lib/db'
import Image from 'next/image'
import Blog from '@/models/Blog'
import { ArrowRight, Clock, UserCircle } from 'lucide-react'

// Force dynamic rendering to prevent build-time API calls
export const dynamic = 'force-dynamic'

// Generate metadata for SEO
export async function generateMetadata() {
  const seoData = await fetchSEOData('/blog')
  return generateSEOMetadata(seoData)
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Get search and category parameters
  const params = await searchParams
  const search = typeof params.search === 'string' ? params.search : ''
  const category =
    typeof params.category === 'string' ? params.category : 'All Posts'
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1
  const postsPerPage = 6

  // Call API directly (server-side)
  let blogPosts = []
  let totalPages = 1

  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    // Build query parameters
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (category && category !== 'All Posts')
      params.append('category', category)
    params.append('page', page.toString())
    params.append('limit', postsPerPage.toString())

    const res = await fetch(`${baseUrl}/api/public/blog?${params}`, {
      cache: 'no-store', // ensures fresh data, not cached
    })

    if (res.ok) {
      const data = await res.json()
      blogPosts = data.blogs || []
      totalPages = data.pagination?.pages || 1
    } else {
      console.error('Failed to fetch blogs:', res.status)
    }
  } catch (error) {
    console.error('Error fetching blogs:', error)
    blogPosts = []
  }

  // Ensure blogPosts is an array and has at least one item
  if (!Array.isArray(blogPosts) || blogPosts.length === 0) {
    blogPosts = []
  }

  // Since we're now using server-side filtering and pagination,
  // we don't need client-side filtering anymore
  const filteredPosts = blogPosts
  const paginatedPosts = blogPosts

  // Fetch unique categories from published blogs
  let allCategories: string[] = []
  try {
    await connectDb()
    const categories = await (Blog as any).distinct('category', { status: 'published' })
    // Filter out null/undefined/empty categories and sort
    allCategories = categories
      .filter((cat): cat is string => Boolean(cat && cat.trim()))
      .sort()
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Fallback to default categories if database fetch fails
    allCategories = [
      'Visa Guides',
      'Travel Tips',
      'Student Visas',
      'Business Travel',
      'Our Updates',
    ]
  }

  // Add 'All Posts' at the beginning for the filter
  const filterCategories = ['All Posts', ...allCategories]

  // Fetch recent blogs for the grid section (exclude already displayed posts)
  let recentBlogs = []
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const recentRes = await fetch(`${baseUrl}/api/public/blog?limit=20`, {
      cache: 'no-store',
    })

    if (recentRes.ok) {
      const recentData = await recentRes.json()
      const allRecentBlogs = recentData.blogs || []

      // Get IDs of already displayed posts to exclude them
      const displayedPostIds = new Set(
        paginatedPosts.map((post: any) => post._id?.toString())
      )

      // Filter out already displayed posts and take first 8
      recentBlogs = allRecentBlogs
        .filter((blog: any) => !displayedPostIds.has(blog._id?.toString()))
        .slice(0, 8)
    }
  } catch (error) {
    console.error('Error fetching recent blogs:', error)
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-24">
      {/* Container for the page */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-32 sm:pt-40">

        {/* New Hero Section (Rounded Banner) */}
        <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-r from-[#061331] to-[#0a2357] shadow-2xl mb-16">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[350px] lg:min-h-[400px]">
            {/* Left Content */}
            <div className="flex flex-col justify-center px-8 py-12 lg:p-16">
              <h1 className="text-[40px] sm:text-5xl lg:text-[56px] font-extrabold text-white mb-6 leading-[1.15]">
                Our Blog
              </h1>
              <p className="text-white/80 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
                Stay informed with the latest updates on international education, university guides, and study abroad tips from our expert consultancy team.
              </p>
              <div className="w-full max-w-sm">
                <BlogSearch />
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:flex items-end justify-center pt-8">
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#d7a23a]/20 rounded-full blur-[80px]"></div>
              <Image
                src="/blog-hero.png"
                alt="Next Level Education Insights"
                width={200}
                height={200}
                className="relative z-10 object-cover h-[100%] w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] translate-y-2 translate-x-4"
                priority
              />
            </div>
          </div>
        </div>

        {/* Search Results Count */}
        {search && (
          <div className="mb-10 text-center lg:text-left">
            <p className="text-[#061331] font-bold text-lg">
              Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{search}"
            </p>
          </div>
        )}

        {/* Search Categories Grid */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start">
          {filterCategories.map(cat => (
            <Link
              key={cat}
              href={
                cat === 'All Posts'
                  ? '/blog'
                  : `/blog?category=${encodeURIComponent(cat)}`
              }
            >
              <Button
                variant={cat === category ? 'default' : 'outline'}
                size="sm"
                className={`px-5 py-2 rounded-full font-bold transition-all duration-300 border ${cat === category
                  ? 'bg-[#061331] text-white border-[#061331] shadow-md hover:scale-[1.02]'
                  : 'border-slate-200 text-[#061331]/70 bg-white hover:bg-slate-50 hover:text-[#061331] hover:border-slate-300 shadow-sm hover:scale-[1.02]'
                  }`}
              >
                {cat}
              </Button>
            </Link>
          ))}
        </div>

        {/* All Posts Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#061331] flex items-center gap-2 mb-10">
            <span className="text-[#d7a23a]">Related</span> Blog Posts
          </h2>

          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {paginatedPosts.map(post => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post._id}
                  className="group flex flex-col h-full bg-white transition-all duration-300"
                >
                  {/* Card Image */}
                  <div className="relative h-60 w-full overflow-hidden rounded-3xl mb-5 border border-slate-100/50 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <BlogImage
                      src={post.featuredImage || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Metadata Row: Pill & Date */}
                  <div className="flex items-center gap-4 mb-4 px-1">
                    <span className="bg-[#d7a23a]/10 text-[#d7a23a] px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                      {post.category || 'Education'}
                    </span>
                    <span className="text-slate-500 text-xs font-bold">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).replace(/\//g, '.')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-[#061331] leading-snug group-hover:text-[#d7a23a] transition-colors px-1 mb-6">
                    {post.title}
                  </h3>

                  {/* Spacer to push author to bottom */}
                  <div className="mt-auto px-1">
                    {/* Author Footer */}
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-5 mt-2">
                      <div className="h-9 w-9 rounded-full bg-[#061331] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#d7a23a] transition-colors duration-300">
                        <UserCircle className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#061331]">Next Level Team</span>
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" /> 5 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-lg">No blog posts found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-20 pt-10 border-t border-slate-100">
            {/* Previous Button */}
            {page > 1 && (
              <Link
                href={`/blog?${new URLSearchParams({
                  ...(search && { search }),
                  ...(category !== 'All Posts' && { category }),
                  page: (page - 1).toString(),
                }).toString()}`}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border border-slate-200 text-[#061331] bg-white hover:bg-[#061331] hover:text-white transition-all shadow-sm"
                >
                  {'<'}
                </Button>
              </Link>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                pageNum => {
                  const shouldShow =
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    Math.abs(pageNum - page) <= 1

                  if (!shouldShow) {
                    if (pageNum === 2 && page > 4) {
                      return <span key={pageNum} className="px-2 text-slate-400 font-bold">...</span>
                    }
                    if (pageNum === totalPages - 1 && page < totalPages - 3) {
                      return <span key={pageNum} className="px-2 text-slate-400 font-bold">...</span>
                    }
                    return null
                  }

                  return (
                    <Link
                      key={pageNum}
                      href={`/blog?${new URLSearchParams({
                        ...(search && { search }),
                        ...(category !== 'All Posts' && { category }),
                        page: pageNum.toString(),
                      }).toString()}`}
                    >
                      <Button
                        variant={pageNum === page ? 'default' : 'outline'}
                        className={`h-10 min-w-[40px] px-3 rounded-full font-bold transition-all shadow-sm ${pageNum === page
                          ? 'bg-[#d7a23a] text-[#061331] border-[#d7a23a] hover:bg-[#efbd5a]'
                          : 'border-slate-200 text-[#061331] hover:bg-slate-50'
                          }`}
                      >
                        {pageNum}
                      </Button>
                    </Link>
                  )
                }
              )}
            </div>

            {/* Next Button */}
            {page < totalPages && (
              <Link
                href={`/blog?${new URLSearchParams({
                  ...(search && { search }),
                  ...(category !== 'All Posts' && { category }),
                  page: (page + 1).toString(),
                }).toString()}`}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border border-slate-200 text-[#061331] bg-white hover:bg-[#061331] hover:text-white transition-all shadow-sm"
                >
                  {'>'}
                </Button>
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
