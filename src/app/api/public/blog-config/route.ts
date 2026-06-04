import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import BlogConfig from '@/models/BlogConfig'

export const revalidate = 3600 // Revalidate every hour

// GET - Fetch blog configuration (public)
export async function GET() {
  try {
    await connectDB()

    const config = await (BlogConfig as any).findOne({})

    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, s-maxage=3600',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
    }

    if (!config) {
      // Return default structure if no config exists
      return NextResponse.json({
        success: true,
        data: {
          authors: [],
          headerCTA: {
            title: 'Ready to Start Your Study Abroad Journey?',
            buttonText: 'Book Free Consultation',
            buttonLink: '/contact-us',
            travelersCount: '10,000+',
            travelersText: 'Join 10,000+ Students',
            trustText: 'who trust our admissions guidance.',
            travelerImages: [],
            isActive: true,
          },
          visaPlanCTA: {
            badgeText: 'Popular',
            title: 'Choose Your Consultation Plan',
            description: 'Get expert guidance on admissions and visas',
            processingTime: 'Within 24 Hours',
            price: 'Free Consultation',
            buttonText: 'Book Now',
            buttonLink: '/contact-us',
            whatsappLink: 'https://wa.me/9822553417',
            phoneLink: 'tel:+919822553417',
            isActive: true,
          },
          footerCTA: {
            title: 'Ready to Study Abroad?',
            description: 'Get expert assistance with university applications, course selection, and student visa guidance. Our team is here to help you every step of the way.',
            buttonText: 'Get Started',
            buttonLink: '/contact-us',
            isActive: true,
          },
        },
      }, {
        headers: cacheHeaders,
      })
    }

    return NextResponse.json({
      success: true,
      data: config,
    }, {
      headers: cacheHeaders,
    })
  } catch (error) {
    console.error('Error fetching blog config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog configuration' },
      { status: 500 }
    )
  }
}

