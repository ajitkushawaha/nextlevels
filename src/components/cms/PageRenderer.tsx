'use client'

import NextLevelHomepage from '@/components/home/NextLevelHomepage'
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
  switch (section.type) {
    case 'homeHero':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
          renderStaticSections={false}
        />
      )
    case 'homeProgram':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
          renderStaticSections={false}
        />
      )
    case 'homeDestinations':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
          renderStaticSections={false}
        />
      )
    case 'homeWhyChooseUs':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
          renderStaticSections={false}
        />
      )
    case 'homeServices':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
        />
      )
    case 'homeUniversities':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
        />
      )
    case 'homeStats':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
        />
      )
    case 'homeTestimonials':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
        />
      )
    case 'homeAmbassadors':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderFaqs={false}
          renderBlog={false}
        />
      )
    case 'homeFaqs':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderBlog={false}
        />
      )
    case 'homeBlog':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={false}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
        />
      )
    case 'homeStaticSections':
      return (
        <NextLevelHomepage
          content={content}
          includeFooter={includeFooter}
          renderHero={false}
          renderProgram={false}
          renderDestinations={false}
          renderWhyChooseUs={false}
          renderServices={false}
          renderUniversities={false}
          renderStats={false}
          renderTestimonials={false}
          renderAmbassadors={false}
          renderFaqs={false}
          renderBlog={false}
        />
      )
    default:
      return null
  }
}
