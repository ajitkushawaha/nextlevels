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
import Blog from '@/models/Blog'
import { ArrowRight } from 'lucide-react'

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
    <div className="min-h-screen bg-white text-slate-800">
      <div className="w-full pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#061331]/5 to-transparent border-b border-[#061331]/10 mb-16">
          <div className="absolute inset-0 bg-[#061331]/[0.01]"></div>
          <div className="relative px-8 p-24 sm:px-16 sm:pt-32 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#061331] mb-6 leading-tight" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              Next Level{" "}
              <span className="block text-gradient-gold">
                Education Insights
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#061331]/80 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest updates on international education, university guides, scholarship opportunities, and study abroad tips from our expert consultancy team.
            </p>
            <BlogSearch />
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d7a23a]/8 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d7a23a]/8 rounded-full translate-y-24 -translate-x-24 blur-3xl"></div>
        </div>
        
        {/* Search and Categories */}
        <div className="max-w-4xl mx-auto mb-12 px-4">
          <div className="flex flex-wrap justify-center gap-3">
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
                  size="lg"
                  className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 border ${
                    cat === category
                      ? 'bg-[#d7a23a] text-[#061331] border-[#d7a23a] shadow-[0_4px_14px_rgba(215,162,58,0.25)] hover:bg-[#efbd5a] hover:scale-[1.02]'
                      : 'border-[#061331]/20 text-[#061331]/85 bg-white hover:bg-[#061331] hover:text-white hover:border-[#061331] hover:scale-[1.02] shadow-sm'
                  }`}
                >
                  {cat}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[90%] mx-auto">
          {/* Results Count */}
          {search && (
            <div className="mb-8 text-center">
              <p className="text-slate-500 font-medium">
                Found {filteredPosts.length} result
                {filteredPosts.length !== 1 ? 's' : ''} for "{search}"
              </p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {paginatedPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map(post => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post._id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#ece8df] bg-white p-2 text-slate-800 shadow-[0_12px_36px_rgba(8,22,56,0.05)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(215,162,58,0.15)] hover:border-[#d7a23a]/40"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7a23a]/40 to-transparent transition-all duration-300 group-hover:via-[#d7a23a]"></div>
                  
                  <div className="relative h-56 overflow-hidden rounded-lg">
                    <BlogImage
                      src={post.featuredImage || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-[#d7a23a] text-[#061331] hover:bg-[#d7a23a] px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-md border-none">
                        {post.date}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#061331] py-2 line-clamp-2 group-hover:text-[#d7a23a] transition-colors break-words leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-slate-650 text-sm line-clamp-3 leading-relaxed break-words mt-1">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#d7a23a] uppercase tracking-wider">
                      <span>Read Article</span>
                      <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16">
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
                    size="lg"
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-[#061331] bg-white hover:bg-[#061331] hover:text-white hover:border-[#061331] font-bold transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  >
                    {'<<'}
                  </Button>
                </Link>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  pageNum => {
                    const shouldShow =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - page) <= 1

                    if (!shouldShow) {
                      if (pageNum === 2 && page > 4) {
                        return (
                          <span
                            key={pageNum}
                            className="px-3 py-2 text-slate-400"
                          >
                            ...
                          </span>
                        )
                      }
                      if (pageNum === totalPages - 1 && page < totalPages - 3) {
                        return (
                          <span
                            key={pageNum}
                            className="px-3 py-2 text-slate-400"
                          >
                            ...
                          </span>
                        )
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
                          size="lg"
                          className={`px-4 py-2.5 rounded-full font-bold transition-all duration-300 border ${
                            pageNum === page
                              ? 'bg-[#d7a23a] text-[#061331] border-[#d7a23a] shadow-[0_4px_12px_rgba(215,162,58,0.25)]'
                              : 'border-slate-200 text-[#061331] bg-white hover:bg-[#061331] hover:text-white hover:border-[#061331] hover:scale-[1.02] shadow-sm'
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
                    size="lg"
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-[#061331] bg-white hover:bg-[#061331] hover:text-white hover:border-[#061331] font-bold transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  >
                    {'>>'}
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Recent Blogs Grid */}
          {recentBlogs.length > 0 && (
            <div className="mt-20 border-t border-slate-200 pt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[#061331]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  Recent <span className="text-gradient-gold">Blogs</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentBlogs.map((post: any) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post._id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#ece8df] bg-white p-1.5 text-slate-800 shadow-[0_12px_36px_rgba(8,22,56,0.04)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(215,162,58,0.12)] hover:border-[#d7a23a]/30"
                  >
                    <div className="relative h-44 overflow-hidden rounded-lg">
                      <BlogImage
                        src={post.featuredImage || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-[#d7a23a] text-[#061331] hover:bg-[#d7a23a] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md border-none">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-3 overflow-hidden">
                      <h3 className="text-sm font-bold text-[#061331] py-1.5 line-clamp-2 group-hover:text-[#d7a23a] transition-colors break-words leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed break-words">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Categories Section */}
          <div className="mt-20 border-t border-slate-200 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#061331] mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                Browse by <span className="text-gradient-gold">Category</span>
              </h2>
              <p className="text-slate-650 max-w-2xl mx-auto">
                Explore our comprehensive study abroad guides and student visa resources
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {allCategories.length > 0 ? (
                allCategories.map(cat => (
                  <Link
                    key={cat}
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                  >
                    <Button
                      variant="outline"
                      className="px-5 py-2.5 rounded-full font-bold transition-all duration-300 border border-slate-200 text-[#061331] bg-white hover:bg-[#061331] hover:text-white hover:border-[#061331] hover:scale-[1.02] shadow-sm"
                    >
                      {cat}
                    </Button>
                  </Link>
                ))
              ) : (
                <p className="text-slate-400">No categories available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
