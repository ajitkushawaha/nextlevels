import { Metadata } from 'next'
import connectDB from '@/lib/db'
import Page from '@/models/Page'
import Visa from '@/models/Visa'
import HeroSection from '@/models/HeroSection'
import SiteSettings from '@/models/SiteSettings'
import { defaultSiteSettings, mergeSiteSettings } from '@/lib/siteSettings'

interface SEOData {
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  ogTitle: string
  ogDescription: string
  ogImage: string
  canonical: string
  robots: string
}

interface ServerSEOProps {
  seoData: SEOData
}

export function generateMetadata(seoData: SEOData): Metadata {
  const {
    metaTitle,
    metaDescription,
    metaKeywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonical,
    robots,
  } = seoData

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    robots: robots,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: ogTitle || metaTitle,
      description: ogDescription || metaDescription,
      type: 'website',
      url: canonical,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: ogTitle || metaTitle,
            },
          ]
        : [],
      siteName: 'Next Level Education Consultancy',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle || metaTitle,
      description: ogDescription || metaDescription,
      images: ogImage ? [ogImage] : [],
    },
    other: {
      'theme-color': '#061331',
      author: 'Next Level Education Consultancy',
      generator: 'Next.js',
    },
  }
}

// Utility function to fetch SEO data server-side (directly from database)
export async function fetchSEOData(path: string): Promise<SEOData> {
  let siteSettings = defaultSiteSettings
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || defaultSiteSettings.seo.baseUrl

  try {
    // Ensure database connection
    const db = await connectDB()
    if (!db) {
      throw new Error('Database connection failed')
    }

    const settingsDoc = await (SiteSettings as any).findOne({ key: 'global' }).lean()
    siteSettings = mergeSiteSettings(settingsDoc)
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || siteSettings.seo.baseUrl || defaultSiteSettings.seo.baseUrl

    // Try to find page by slug first
    const slug = path.startsWith('/') ? path.slice(1) : path
    const page: any = await (Page as any).findOne({ slug, status: 'active' }).lean()

    if (page) {
      return {
        metaTitle: page.metaTitle || page.title || siteSettings.seo.defaultMetaTitle,
        metaDescription:
          page.metaDescription || page.description || siteSettings.seo.defaultMetaDescription,
        metaKeywords: page.metaKeywords
          ? page.metaKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
          : siteSettings.seo.defaultMetaKeywords.split(',').map(keyword => keyword.trim()).filter(Boolean),
        ogTitle: page.ogTitle || page.metaTitle || page.title || siteSettings.seo.defaultMetaTitle,
        ogDescription: page.ogDescription || page.metaDescription || page.description || siteSettings.seo.defaultMetaDescription,
        ogImage: page.featuredImage || siteSettings.seo.defaultOgImage,
        canonical: page.canonical || `${baseUrl}${path}`,
        robots: page.robots || siteSettings.seo.defaultRobots,
      }
    }

    // Fallback for homepage if no page document exists
    if (slug === '') {
      const heroData: any = await (HeroSection as any).findOne({
        status: 'active',
      }).lean()
      if (heroData) {
        const computedTitle =
          heroData.metaTitle ||
          (typeof heroData.title === 'string' &&
          heroData.title.trim().length > 8 &&
          !/^get$/i.test(heroData.title.trim())
            ? heroData.title
            : 'Next Level Education | Study Abroad Expert')
        const computedDescription =
          heroData.metaDescription ||
          heroData.description ||
          'Expert guidance for your overseas education and student visa journey. We make it simple, you make it happen.'
        return {
          metaTitle: computedTitle,
          metaDescription: computedDescription,
          metaKeywords: [
            'education consultancy',
            'study abroad',
            'student visa',
            'free visa consultation',
            'Next Level Education',
          ],
          ogTitle: computedTitle || 'Next Level Education - Study Abroad Expert',
          ogDescription:
            computedDescription ||
            'Professional study abroad consulting and student visa guidance. Expert support for your educational dreams.',
          ogImage: '/logo.png',
          canonical: `${baseUrl}/`,
          robots: siteSettings.seo.defaultRobots,
        }
      }

      return {
        metaTitle: siteSettings.seo.defaultMetaTitle,
        metaDescription: siteSettings.seo.defaultMetaDescription,
        metaKeywords: siteSettings.seo.defaultMetaKeywords.split(',').map(keyword => keyword.trim()).filter(Boolean),
        ogTitle: siteSettings.seo.defaultMetaTitle,
        ogDescription: siteSettings.seo.defaultMetaDescription,
        ogImage: siteSettings.seo.defaultOgImage,
        canonical: `${baseUrl}/`,
        robots: siteSettings.seo.defaultRobots,
      }
    }

    // If not found in pages, try to find in visa quotations
    // Check if path matches visa pattern: /quotation/[country-slug-id]
    const visaMatch = path.match(/^\/quotation\/([^\/]+)$/)
    if (visaMatch) {
      const countrySlugId = visaMatch[1]

      // Extract visa ID from the slug (last part after the last dash)
      const parts = countrySlugId.split('-')
      const visaId = parts[parts.length - 1]

      // Try to find visa by ID first
      let visa: any = await (Visa as any).findById(visaId).lean()

      // If not found by ID, try by country name (fallback)
      if (!visa) {
        const countrySlug = parts.slice(0, -1).join('-')
        const countryName = countrySlug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l: string) => l.toUpperCase())
        visa = await (Visa as any).findOne({
          country: { $regex: new RegExp(`^${countryName}$`, 'i') },
          status: 'active',
        }).lean()
      }

      if (visa) {
        return {
          metaTitle:
            visa.metaTitle || `${visa.country} ${visa.visaType} Visa - Next Level`,
          metaDescription:
            visa.metaDescription ||
            `Apply for ${visa.country} ${visa.visaType} visa online with Next Level. Fast processing, expert guidance, and high success rate.`,
          metaKeywords: visa.metaKeyword
            ? visa.metaKeyword.split(',').map((k: string) => k.trim())
            : [],
          ogTitle:
            visa.metaTitle || `${visa.country} ${visa.visaType} Visa - Next Level`,
          ogDescription:
            visa.metaDescription ||
            `Apply for ${visa.country} ${visa.visaType} visa online with Next Level. Fast processing, expert guidance, and high success rate.`,
          ogImage: visa.countryFlag || '',
          canonical: `${baseUrl}${path}`,
          robots: visa.metaRobots || 'INDEX, FOLLOW',
        }
      }
    }
  } catch (error) {
    // Silently fail and use fallback - don't log to avoid noise
  }

  // Fallback SEO data
  return {
    metaTitle: siteSettings.seo.defaultMetaTitle,
    metaDescription: siteSettings.seo.defaultMetaDescription,
    metaKeywords: siteSettings.seo.defaultMetaKeywords.split(',').map(keyword => keyword.trim()).filter(Boolean),
    ogTitle: siteSettings.seo.defaultMetaTitle,
    ogDescription: siteSettings.seo.defaultMetaDescription,
    ogImage: siteSettings.seo.defaultOgImage,
    canonical: `${baseUrl}${path}`,
    robots: siteSettings.seo.defaultRobots,
  }
}
