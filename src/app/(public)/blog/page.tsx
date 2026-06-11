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
import Footer from '@/components/layout/footer'

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

  let blogPosts = []
  let totalPages = 1
  let allCategories: string[] = []

  try {
    // 1. Connect to DB
    await connectDb()

    // 2. Fetch categories
    try {
      const categories = await (Blog as any).distinct('category', { status: 'published' })
      allCategories = categories
        .filter((cat: any): cat is string => Boolean(cat && cat.trim()))
        .sort()
    } catch (catError) {
      console.error('Error fetching categories from DB:', catError)
      allCategories = [
        'Visa Guides',
        'Travel Tips',
        'Student Visas',
        'Business Travel',
        'Our Updates',
      ]
    }

    // 3. Build query
    const query: any = { status: 'published' }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ]
    }
    if (category && category !== 'All Posts') {
      query.category = category
    }

    // 4. Fetch blogs with pagination
    const skip = (page - 1) * postsPerPage
    const blogs = await (Blog as any).find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(postsPerPage)
      .lean()

    const total = await (Blog as any).countDocuments(query)
    totalPages = Math.ceil(total / postsPerPage)

    blogPosts = JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error('Error querying blogs from DB:', error)
    blogPosts = []
  }

  const paginatedPosts = blogPosts
  const filterCategories = ['All Posts', ...allCategories]

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between">
      
      {/* Hero Header Section */}
      <section className="relative max-w-7xl w-full mx-auto overflow-hidden min-h-85 sm:h-90 lg:h-100 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-27.5 pb-6 sm:pb-8 lg:py-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        
        {/* Background Image */}
        <Image
          src="/visa/blog1.png"
          alt="Our Blog Banner"
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />

        {/* Content Container */}
        <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb */}
          <div className="max-w-7xl">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                <li>
                  <Link href="/" className="hover:text-[#d7a23a] transition-colors">Home</Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none text-white font-semibold">
                  <span>Blog</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Bottom Title & Badge */}
          <div className="mt-auto space-y-3 pt-6 text-left">
            <div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                Latest Insights &amp; Updates
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15] font-serif"
            >
              Our Blog
            </h1>
            
            <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              Stay informed with the latest updates on international education, university guides, and study abroad tips from our expert consultancy team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto grow py-12 bg-slate-50/40">
        <div className="w-full max-w-300 mx-auto px-5 sm:px-8">
          
          {/* Category Filter list */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
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
                    ? 'border-slate-200 text-[#061331]/70 bg-white hover:bg-slate-50 hover:text-[#061331] hover:border-slate-300 shadow-sm hover:scale-[1.02]'
                    : 'bg-[#061331] border-slate-200 text-white  shadow-md hover:scale-[1.02]'
                    }`}
                >
                  {cat} 
                </Button> 
              </Link>
            ))}
          </div>

        {/* Search Results Count */}
        {/* {search && (
          <div className="mb-10 text-center lg:text-left">
            <p className="text-[#061331] font-bold text-lg">
              Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{search}"
            </p>
          </div>
        )} */}



        {/* All Posts Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#061331] flex items-center gap-2 mb-10">
             Blog Posts
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
                        className={`h-10 min-w-10 px-3 rounded-full font-bold transition-all shadow-sm ${pageNum === page
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
    </main>
    <Footer/>
  </div>
)
}
