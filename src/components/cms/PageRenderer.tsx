'use client'

import NextLevelHomepage from '@/components/home/NextLevelHomepage'
import ServicesPageContent from '@/components/services/ServicesPageContent'
import AboutPageContent from '@/components/about/AboutPageContent'
import ContactPageContent from '@/components/contact/ContactPageContent'
import LegalPageContent from '@/components/legal/LegalPageContent'
import FaqPageContent from '@/components/faq/FaqPageContent'
import type { CmsPageContent, CmsSection } from '@/lib/cms/types'

interface PageRendererProps {
  content: CmsPageContent
  slug?: string
  includeFooter?: boolean
  sectionId?: string
}

export default function PageRenderer({
  content,
  slug = '/',
  includeFooter = true,
  sectionId,
}: PageRendererProps) {
  if (slug === '/') {
    const sections = sectionId
      ? content.sections.filter(section => section.id === sectionId)
      : content.sections

    return (
      <div className="bg-white text-[#081638]">
        {sections
          .filter(section => section.enabled)
          .map(section => (
            <CmsSectionRenderer
              key={section.id}
              content={content}
              section={section}
              includeFooter={includeFooter}
            />
          ))}
      </div>
    )
  }

  if (slug === '/services') {
    return (
      <ServicesPageContent
        content={content}
        includeFooter={includeFooter}
        sectionId={sectionId}
      />
    )
  }

  if (slug === '/about-us') {
    return (
      <AboutPageContent
        content={content}
        includeFooter={includeFooter}
        sectionId={sectionId}
      />
    )
  }

  if (slug === '/contact-us') {
    return (
      <ContactPageContent
        content={content}
        includeFooter={includeFooter}
        sectionId={sectionId}
      />
    )
  }

  if (slug === '/privacy-policy' || slug === '/terms') {
    return (
      <LegalPageContent
        content={content}
        includeFooter={includeFooter}
        sectionId={sectionId}
      />
    )
  }

  if (slug === '/faq') {
    return (
      <FaqPageContent
        content={content}
        includeFooter={includeFooter}
        sectionId={sectionId}
      />
    )
  }

  return (
    <main className="min-h-screen bg-white px-5 py-24 text-[#081638]">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase text-[#d7a23a]">CMS Page</p>
        <h1 className="mt-3 text-4xl font-black">Page renderer unavailable</h1>
        <p className="mt-4 text-slate-600">
          No section renderer has been registered for this slug yet.
        </p>
      </div>
    </main>
  )
}

function CmsSectionRenderer({
  content,
  section,
  includeFooter,
}: {
  content: CmsPageContent
  section: CmsSection
  includeFooter: boolean
}) {
  const homePreviewProps = {
    content,
    includeFooter: false,
    renderHero: false,
    renderProgram: false,
    renderScholarshipOffer: false,
    renderDestinations: false,
    renderWhyChooseUs: false,
    renderServices: false,
    renderUniversities: false,
    renderStats: false,
    renderTestimonials: false,
    renderAmbassadors: false,
    renderSuccessStories: false,
    renderFaqs: false,
    renderBlog: false,
    renderStaticSections: false,
  }

  switch (section.type) {
    case 'homeHero':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderHero
        />
      )
    case 'homeProgram':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderProgram
        />
      )
    case 'homeScholarshipOffer':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderScholarshipOffer
        />
      )
    case 'homeDestinations':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderDestinations
        />
      )
    case 'homeWhyChooseUs':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderWhyChooseUs
        />
      )
    case 'homeServices':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderServices
        />
      )
    case 'homeUniversities':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderUniversities
        />
      )
    case 'homeStats':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderStats
        />
      )
    case 'homeTestimonials':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderTestimonials
        />
      )
    case 'homeAmbassadors':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderAmbassadors
        />
      )
    case 'homeSuccessStories':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderSuccessStories
        />
      )
    case 'homeFaqs':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderFaqs
        />
      )
    case 'homeBlog':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          renderBlog
        />
      )
    case 'homeStaticSections':
      return (
        <NextLevelHomepage
          {...homePreviewProps}
          includeFooter={includeFooter}
          renderStaticSections
        />
      )
    default:
      return null
  }
}
