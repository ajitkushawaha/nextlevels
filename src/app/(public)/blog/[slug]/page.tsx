import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import CopyLinkButton from '@/app/admin/blog/CopyLinkButton'
import ReadingProgress from '@/components/blog/ReadingProgress'
import TableOfContents from '@/components/blog/TableOfContents'
import RelatedBlogImage from '@/components/blog/RelatedBlogImage'
import { addHeadingIds } from '@/lib/addHeadingIds'
import { processBlogContent } from '@/lib/processBlogContent'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  Calendar,
  User,
  Phone,
  FileText,
  ArrowRight,
  Send,
} from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'

// Enable ISR (Incremental Static Regeneration) - revalidate every hour
export const revalidate = 3600

// Pre-generate static pages for all published blogs at build time
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/admin/blog/create`, {
      cache: 'no-store',
    })

    if (!res.ok) return []

    const blogs = await res.json()
    return (blogs || [])
      .filter((blog: any) => blog.status === 'published')
      .map((blog: any) => ({
        slug: blog.slug,
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

type Blog = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  featuredImageAlt?: string
  author?: string
  authorAvatar?: string
  status: string
  category?: string
  tags?: string[]
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  publishedAt?: string
  readMinutes?: number
  updatedAt?: string
  createdAt?: string
}

type RelatedBlog = {
  title: string
  date: string
  author: string
  excerpt: string
  image: string
  href: string
  category?: string
}

type Props = { params: Promise<{ slug: string }> }

export async function getPostBySlug(slug: string): Promise<Blog | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/public/blog/${slug}`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })

    if (!res.ok) return null

    const text = await res.text()
    try {
      const data = JSON.parse(text)
      return data ?? null // assuming your API returns { blog: {...} }
    } catch {
      return null // not JSON → 404
    }
  } catch (e) {
    console.error('Error fetching post:', e)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post not found' }

  const formattedTitle = `${post.metaTitle || post.title} | Next Level Education Consultancy`

  return {
    title: formattedTitle,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords?.split(',').map(k => k.trim()),
    openGraph: {
      title: formattedTitle,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  }
}

// Function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200 // Average reading speed
  const text = content.replace(/<[^>]*>/g, '') // Remove HTML tags
  const wordCount = text.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, readingTime) // At least 1 minute
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return notFound()

  // Calculate reading time
  const readingTime = calculateReadingTime(post.content)

  // fetch related posts (latest 6 published)
  let related: RelatedBlog[] = []
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const relatedRes = await fetch(`${baseUrl}/api/public/recent-blogs`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })
    if (relatedRes.ok) {
      try {
        const recentblog = await relatedRes.json()
        related = (recentblog?.blogs || []).slice(0, 6)
      } catch {
        related = []
      }
    }
  } catch (error) {
    console.error('Error fetching related posts:', error)
    related = []
  }

  // Get all unique tags for the sidebar - use fallback if none exist
  const allTags =
    post.tags && post.tags.length > 0
      ? post.tags
      : ['Visa Application', 'Travel Tips', 'Immigration', 'Documents Required']

  // Fetch blog configuration for author profiles (optional)
  let blogConfig = null
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const configRes = await fetch(`${baseUrl}/api/public/blog-config`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    if (configRes.ok) {
      const configData = await configRes.json()
      blogConfig = configData.success ? configData.data : null
    }
  } catch (error) {
    console.error('Error fetching blog config:', error)
  }

  // Get author from config or use post author
  const authorConfig =
    blogConfig?.authors?.find(
      (a: any) => a.name === post.author && a.isActive !== false
    ) || null

  // Get CTAs from blog post (blog-specific) with fallbacks
  const postData = post as any

  // Helper to check if CTA object exists and has content
  const hasCTA = (cta: any) => {
    return (
      cta &&
      typeof cta === 'object' &&
      (cta.isActive === true || Object.keys(cta).length > 1)
    )
  }

  // Hardcoded default values for all visa blogs
  const DEFAULT_TRAVELERS_TEXT = 'Join 10,000+ Students'
  const DEFAULT_TRUST_TEXT = 'who trust our admissions guidance.'
  const DEFAULT_WHATSAPP_LINK = 'https://wa.me/9822553417'
  const DEFAULT_PHONE_LINK = 'tel:+919822553417'
  const DEFAULT_TRAVELER_IMAGES = [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
  ]

  const headerCTA = hasCTA(postData.headerCTA)
    ? {
      title:
        postData.headerCTA.title ||
        blogConfig?.headerCTA?.title ||
        'Ready to Start Your Study Abroad Journey?',
      buttonText:
        postData.headerCTA.buttonText ||
        blogConfig?.headerCTA?.buttonText ||
        'Book Free Consultation',
      buttonLink:
        postData.headerCTA.buttonLink ||
        blogConfig?.headerCTA?.buttonLink ||
        '/contact-us',
      travelersText:
        postData.headerCTA.travelersText ||
        blogConfig?.headerCTA?.travelersText ||
        DEFAULT_TRAVELERS_TEXT,
      trustText:
        postData.headerCTA.trustText ||
        blogConfig?.headerCTA?.trustText ||
        DEFAULT_TRUST_TEXT,
      travelerImages:
        postData.headerCTA.travelerImages &&
          postData.headerCTA.travelerImages.length > 0
          ? postData.headerCTA.travelerImages
          : blogConfig?.headerCTA?.travelerImages &&
            blogConfig?.headerCTA?.travelerImages.length > 0
            ? blogConfig?.headerCTA?.travelerImages
            : DEFAULT_TRAVELER_IMAGES,
      isActive: postData.headerCTA.isActive === true,
    }
    : {
      title:
        blogConfig?.headerCTA?.title ||
        'Ready to Start Your Study Abroad Journey?',
      buttonText:
        blogConfig?.headerCTA?.buttonText || 'Book Free Consultation',
      buttonLink: blogConfig?.headerCTA?.buttonLink || '/contact-us',
      travelersText:
        blogConfig?.headerCTA?.travelersText || DEFAULT_TRAVELERS_TEXT,
      trustText: blogConfig?.headerCTA?.trustText || DEFAULT_TRUST_TEXT,
      travelerImages:
        blogConfig?.headerCTA?.travelerImages || DEFAULT_TRAVELER_IMAGES,
      isActive: blogConfig?.headerCTA?.isActive === true,
    }

  // Fetch visa details if visaPlanCTA has selectedVisaId
  let visaDetails: any = null
  if (postData.visaPlanCTA?.selectedVisaId) {
    try {
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
      const visaRes = await fetch(
        `${baseUrl}/api/public/visa/${postData.visaPlanCTA.selectedVisaId}`,
        {
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      )
      if (visaRes.ok) {
        const response = await visaRes.json()
        visaDetails = response.success ? response.data : response
      }
    } catch (error) {
      console.error('Error fetching visa details:', error)
    }
  }

  // Determine plan name and badge visibility from visa details
  const getPlanName = () => {
    if (visaDetails) {
      // Use category (standard/premium) - capitalize first letter
      if (visaDetails.category) {
        const category = visaDetails.category.toLowerCase()
        if (category === 'premium' || category === 'standard') {
          return category.charAt(0).toUpperCase() + category.slice(1)
        }
        // If category is something else, capitalize it
        return (
          visaDetails.category.charAt(0).toUpperCase() +
          visaDetails.category.slice(1).toLowerCase()
        )
      }
      // Fallback to visaType if category not available
      if (visaDetails.visaType) {
        return visaDetails.visaType
      }
    }
    // Fallback to default
    return 'Standard'
  }

  const shouldShowPopularBadge = () => {
    if (visaDetails) {
      return visaDetails.hotListed === 'true' || visaDetails.hotListed === true
    }
    // Fallback to configured badgeText
    return postData.visaPlanCTA?.badgeText === 'Popular'
  }

  // Generate WhatsApp message with plan details
  const generateWhatsAppMessage = (
    planName: string,
    processingTime: string,
    price: string,
    country: string
  ) => {
    const message = `Hello! I'm interested in applying for ${country} Consultation.

📋 Plan Details:
• Plan: ${planName}
• Response Time: ${processingTime}
• Price: ${price}

📝 Blog: ${post.title}

Please help me with the admission consultation process.`

    return encodeURIComponent(message)
  }

  // Generate WhatsApp link with message
  const getWhatsAppLink = (
    baseLink: string,
    planName: string,
    processingTime: string,
    price: string
  ) => {
    // Extract phone number from link (format: https://wa.me/1234567890 or tel:+1234567890)
    const phoneMatch = baseLink.match(/(?:wa\.me\/|tel:)([0-9+]+)/)
    if (phoneMatch && phoneMatch[1]) {
      const phoneNumber = phoneMatch[1].replace(/^\+/, '') // Remove leading + if present
      const country = visaDetails?.country || post.title.split(' ')[0] || 'Consultation'
      const message = generateWhatsAppMessage(
        planName,
        processingTime,
        price,
        country
      )
      return `https://wa.me/${phoneNumber}?text=${message}`
    }
    // Fallback to original link if phone number not found
    return baseLink
  }

  const visaPlanCTA = hasCTA(postData.visaPlanCTA)
    ? {
      badgeText:
        postData.visaPlanCTA.badgeText ||
        blogConfig?.visaPlanCTA?.badgeText ||
        'Popular',
      planName: getPlanName(),
      showPopularBadge: shouldShowPopularBadge(),
      title:
        postData.visaPlanCTA.title ||
        blogConfig?.visaPlanCTA?.title ||
        'Choose Your Consultation Plan',
      description:
        postData.visaPlanCTA.description ||
        blogConfig?.visaPlanCTA?.description ||
        'Get expert guidance on admissions and visas',
      processingTime:
        postData.visaPlanCTA.processingTime ||
        blogConfig?.visaPlanCTA?.processingTime ||
        'Within 24 Hours',
      price:
        postData.visaPlanCTA.price ||
        blogConfig?.visaPlanCTA?.price ||
        'Free Consultation',
      buttonText:
        postData.visaPlanCTA.buttonText ||
        blogConfig?.visaPlanCTA?.buttonText ||
        'Book Now',
      buttonLink:
        postData.visaPlanCTA.buttonLink ||
        blogConfig?.visaPlanCTA?.buttonLink ||
        '/contact-us',
      whatsappLink:
        postData.visaPlanCTA.whatsappLink || DEFAULT_WHATSAPP_LINK,
      phoneLink: postData.visaPlanCTA.phoneLink || DEFAULT_PHONE_LINK,
      isActive: postData.visaPlanCTA.isActive === true,
    }
    : {
      badgeText: blogConfig?.visaPlanCTA?.badgeText || 'Popular',
      planName: 'Standard',
      showPopularBadge: blogConfig?.visaPlanCTA?.badgeText === 'Popular',
      title: blogConfig?.visaPlanCTA?.title || 'Choose Your Consultation Plan',
      description:
        blogConfig?.visaPlanCTA?.description ||
        'Get expert guidance on admissions and visas',
      processingTime: blogConfig?.visaPlanCTA?.processingTime || 'Within 24 Hours',
      price: blogConfig?.visaPlanCTA?.price || 'Free Consultation',
      buttonText: blogConfig?.visaPlanCTA?.buttonText || 'Book Now',
      buttonLink: blogConfig?.visaPlanCTA?.buttonLink || '/contact-us',
      whatsappLink: DEFAULT_WHATSAPP_LINK,
      phoneLink: DEFAULT_PHONE_LINK,
      isActive: blogConfig?.visaPlanCTA?.isActive === true,
    }

  const footerCTA = hasCTA(postData.footerCTA)
    ? {
      title:
        postData.footerCTA.title ||
        blogConfig?.footerCTA?.title ||
        'Ready to Study Abroad?',
      description:
        postData.footerCTA.description ||
        blogConfig?.footerCTA?.description ||
        'Get expert assistance with university applications, course selection, and student visa guidance. Our team is here to help you every step of the way.',
      buttonText:
        postData.footerCTA.buttonText ||
        blogConfig?.footerCTA?.buttonText ||
        'Get Started',
      buttonLink:
        postData.footerCTA.buttonLink ||
        blogConfig?.footerCTA?.buttonLink ||
        '/contact-us',
      isActive: postData.footerCTA.isActive === true,
    }
    : {
      title: blogConfig?.footerCTA?.title || 'Ready to Study Abroad?',
      description:
        blogConfig?.footerCTA?.description ||
        'Get expert assistance with university applications, course selection, and student visa guidance. Our team is here to help you every step of the way.',
      buttonText: blogConfig?.footerCTA?.buttonText || 'Get Started',
      buttonLink: blogConfig?.footerCTA?.buttonLink || '/contact-us',
      isActive: blogConfig?.footerCTA?.isActive === true,
    }

  // Get traveler images (up to 3) - use defaults if not enough provided
  const travelerImages =
    headerCTA.travelerImages && headerCTA.travelerImages.length > 0
      ? headerCTA.travelerImages.slice(0, 3)
      : DEFAULT_TRAVELER_IMAGES.slice(0, 3)

  // Ensure we always have 3 images (fill with defaults if needed)
  const finalTravelerImages = [...travelerImages]
  while (finalTravelerImages.length < 3) {
    finalTravelerImages.push(
      DEFAULT_TRAVELER_IMAGES[finalTravelerImages.length] ||
      DEFAULT_TRAVELER_IMAGES[0]
    )
  }

  // Base URL for schema
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextleveleducation.com'

  // Determine author image
  const authorImage =
    authorConfig?.profileImage || `${baseUrl}/avtarplaceholder.png`

  // Blog Schema Data
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage || `${baseUrl}/placeholder.jpg`,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: authorConfig?.name || post.author || 'Next Level Expert',
      url: `${baseUrl}/blog`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Next Level Education Consultancy',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
  }

  // Breadcrumb Schema Data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-800">
      <JsonLd data={blogJsonLd} id="blog-posting-schema" />
      <JsonLd data={breadcrumbJsonLd} id="breadcrumb-schema" />
      <ReadingProgress />

      {/* ── HERO BANNER ── */}
      <section className="relative bg-[#081638] overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-end">
        {/* Background Image */}
        {post.featuredImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-10 bg-linear-to-t from-[#081638] via-[#081638]/80 to-[#081638]/40" />
        {/* Subtle gold radial accent */}
        <div className="absolute inset-0 z-10 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #d7a23a 0%, transparent 50%)' }}
        />
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-14">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-2 text-xs text-slate-300/80">
            <Link href="/" className="hover:text-[#d7a23a] transition-colors font-medium">Home</Link>
            <span className="text-slate-500">›</span>
            <Link href="/blog" className="hover:text-[#d7a23a] transition-colors font-medium">Blog</Link>
            <span className="text-slate-500">›</span>
            <span className="text-slate-300 line-clamp-1">{post.title}</span>
          </nav>

          {/* Category badge */}
          {post.category && (
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#d7a23a] text-[#081638] text-xs font-black uppercase tracking-wider">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-4xl mb-8 font-serif">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
            {/* Author */}
            <div className="flex items-center gap-3">
              {authorConfig?.profileImage ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d7a23a]/40 shrink-0">
                  <Image src={authorConfig.profileImage} alt={authorConfig.name} width={40} height={40} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#d7a23a] to-[#b8812f] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{(authorConfig?.name || post.author || 'A')?.charAt(0)}</span>
                </div>
              )}
              <div>
                <p className="font-semibold text-white text-xs">By {authorConfig?.name || post.author || 'Admin'}</p>
                <p className="text-slate-400 text-xs">Education Consultant</p>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-600/50" />

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#d7a23a]" />
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : 'Recently Published'}
              </span>
            </div>

            <div className="w-px h-8 bg-slate-600/50" />

            {/* Read time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d7a23a]" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN BODY ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── LEFT: CONTENT ── */}
          <div className="lg:col-span-8">


            {/* Header CTA */}
            {headerCTA.isActive && (
              <div className="mb-8 bg-linear-to-r from-[#081638] to-[#0d2459] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <p className="text-white font-semibold text-sm sm:text-base">{headerCTA.title}</p>
                <Link
                  href={headerCTA.buttonLink}
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#d7a23a] text-[#081638] font-black text-sm rounded-full hover:bg-amber-400 transition-all shadow-sm whitespace-nowrap"
                >
                  {headerCTA.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Article Content */}
            <article
              id="blog-content"
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 md:p-10
              prose prose-base md:prose-lg max-w-none font-sans
              prose-headings:text-[#081638] prose-headings:font-bold prose-headings:font-serif
              prose-h1:text-3xl prose-h1:font-extrabold prose-h1:mb-6 prose-h1:mt-0 prose-h1:leading-tight prose-h1:border-b-4 prose-h1:border-[#d7a23a] prose-h1:pb-3 prose-h1:text-[#081638]
              prose-h2:text-2xl prose-h2:font-extrabold prose-h2:mb-4 prose-h2:mt-10 prose-h2:leading-tight prose-h2:text-[#081638] prose-h2:border-l-4 prose-h2:border-[#d7a23a] prose-h2:pl-4
              prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-8 prose-h3:leading-tight prose-h3:text-[#0d2459]
              prose-h4:text-lg prose-h4:font-bold prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-slate-700 prose-h4:px-4 prose-h4:py-1.5 prose-h4:rounded prose-h4:border-l-4 prose-h4:border-[#d7a23a] prose-h4:bg-slate-50
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base md:prose-p:text-[17px]
              prose-a:text-[#d7a23a] prose-a:no-underline prose-a:font-semibold hover:prose-a:underline
              prose-strong:text-[#081638] prose-strong:font-bold
              prose-ul:text-slate-700 prose-ul:mb-5 prose-ul:pl-0 prose-ul:space-y-2 prose-ul:list-none
              prose-li:text-slate-700 prose-li:mb-2 prose-li:leading-relaxed prose-li:relative prose-li:pl-6
              prose-ol:text-slate-700 prose-ol:mb-5 prose-ol:pl-6 prose-ol:space-y-2
              prose-blockquote:border-l-4 prose-blockquote:border-[#d7a23a] prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:text-slate-600 prose-blockquote:bg-amber-50
              prose-img:rounded-xl prose-img:shadow-md prose-img:my-6 prose-img:w-full
              prose-table:text-sm prose-table:border-collapse prose-table:border prose-table:border-slate-200 prose-table:rounded-xl prose-table:overflow-hidden prose-table:my-6
              prose-th:bg-[#081638] prose-th:text-white prose-th:border prose-th:border-slate-300 prose-th:px-4 prose-th:py-3 prose-th:font-bold prose-th:text-left
              prose-td:border prose-td:border-slate-200 prose-td:px-4 prose-td:py-3 prose-td:text-slate-700
              prose-hr:border-slate-200 prose-hr:my-8 prose-hr:border-t-2"
            >
              <section
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: addHeadingIds(processBlogContent(post.content)) }}
              />
            </article>

            {/* Tags row */}
            {post.tags?.length ? (
              <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-black text-[#081638] uppercase tracking-wider mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#081638]/5 text-[#081638] border border-[#081638]/10 hover:bg-[#081638] hover:text-white transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Share row */}
            <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
              <span className="text-xs font-black text-[#081638] uppercase tracking-wider">Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://nextleveleducation.com/blog/' + post.slug)}`}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#081638] hover:text-white flex items-center justify-center text-slate-500 transition-all" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://nextleveleducation.com/blog/' + post.slug)}`}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0077b5] hover:text-white flex items-center justify-center text-slate-500 transition-all" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" /></svg>
              </a>
              <CopyLinkButton url={`https://nextleveleducation.com/blog/${post.slug}`} />
            </div>

            {/* Footer CTA */}
            {footerCTA.isActive && (
              <div className="mt-6 bg-linear-to-br from-[#081638] to-[#0d2459] rounded-2xl p-8 text-white shadow-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold mb-2 font-serif">{footerCTA.title}</h3>
                    {footerCTA.description && (
                      <p className="text-slate-300 text-sm leading-relaxed max-w-lg">{footerCTA.description}</p>
                    )}
                  </div>
                  <Link href={footerCTA.buttonLink}
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#d7a23a] text-[#081638] font-black text-sm rounded-full hover:bg-amber-400 transition-all shadow-md whitespace-nowrap">
                    {footerCTA.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Author bio card */}
            <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-xs font-black text-[#081638] uppercase tracking-wider mb-4">About the Author</h3>
              <div className="flex items-start gap-4">
                {authorConfig?.profileImage ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#d7a23a]/30 shrink-0">
                    <Image src={authorConfig.profileImage} alt={authorConfig.name} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#d7a23a] to-[#b8812f] flex items-center justify-center shrink-0">
                    <span className="text-white text-2xl font-bold">{(authorConfig?.name || post.author || 'A')?.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <h4 className="font-extrabold text-[#081638] text-base">{authorConfig?.name || post.author || 'Admin'}</h4>
                  <p className="text-xs text-[#d7a23a] font-semibold mb-2">Education Consultant</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {authorConfig?.bio || 'Expert education consultant with years of experience helping students navigate university admissions and study visa applications worldwide.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT: SIDEBAR ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">

              {/* Free Consultation CTA */}
              <div className="bg-linear-to-br from-[#081638] to-[#0d2459] rounded-2xl p-6 text-white shadow-lg text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#d7a23a]/20 border border-[#d7a23a]/40 flex items-center justify-center">
                  <Send className="w-6 h-6 text-[#d7a23a]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg mb-1 font-serif">Free Consultation</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">Talk to our expert counselors about your study abroad journey.</p>
                </div>
                <Link href="/contact-us"
                  className="block w-full py-3 bg-[#d7a23a] text-[#081638] font-black text-sm rounded-full hover:bg-amber-400 transition-all shadow-md">
                  Book Now →
                </Link>
                <a href="https://wa.me/9822553417" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-sm font-semibold transition-all">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  WhatsApp Us
                </a>
              </div>

              {/* Table of Contents */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-black text-[#081638] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-[#d7a23a] inline-block" />
                  Table of Contents
                </h3>
                <TableOfContents content={post.content} />
              </div>

              {/* Recent Posts */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <h3 className="text-xs font-black text-[#081638] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#d7a23a] inline-block" />
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {related.map((item: RelatedBlog) => (
                      <Link key={item.title} href={item.href} className="group flex gap-3 items-start hover:bg-slate-50 p-2 rounded-xl transition-all">
                        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                          <RelatedBlogImage src={item.image || '/placeholder.svg'} alt={item.title || 'Blog'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-slate-800 group-hover:text-[#d7a23a] transition-colors line-clamp-2 leading-tight mb-1">{item.title}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">{item.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-black text-[#081638] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-[#d7a23a] inline-block" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Link key={tag} href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold hover:bg-[#081638] hover:text-white transition-all">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
