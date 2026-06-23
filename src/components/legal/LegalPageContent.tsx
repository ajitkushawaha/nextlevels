'use client'

import Footer from '@/components/layout/footer'
import type { CmsPageContent, LegalContentSection } from '@/lib/cms/types'

interface LegalPageContentProps {
  content: CmsPageContent
  includeFooter?: boolean
  sectionId?: string
}

export default function LegalPageContent({
  content,
  includeFooter = true,
  sectionId,
}: LegalPageContentProps) {
  const sections = content.sections.filter(
    section =>
      section.type === 'legalContent' &&
      section.enabled &&
      (!sectionId || section.id === sectionId)
  ) as LegalContentSection[]

  return (
    <div className="min-h-screen bg-[#fbf8fc] text-[#081638]">
      <main className="pb-16">
        {sections.map(section => (
          <LegalSection key={section.id} section={section} />
        ))}
      </main>
      {includeFooter ? <Footer /> : null}
    </div>
  )
}

function LegalSection({ section }: { section: LegalContentSection }) {
  return (
    <section className="px-4 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-md border border-[#d7a23a]/25 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <span className="inline-flex rounded-full bg-[#d7a23a]/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#9d7424]">
            {section.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-[#081638] sm:text-5xl">
            {section.title}
          </h1>
          <p className="mt-3 text-sm font-semibold text-[#d7a23a]">
            {section.updatedLabel}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            {section.intro}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {section.sections.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
            >
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#081638] text-sm font-black text-[#d7a23a]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-xl font-black text-[#081638]">
                    {item.title}
                  </h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                    {item.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
