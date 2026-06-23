'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import type { CmsPageContent, FaqContentSection } from '@/lib/cms/types'

interface FaqPageContentProps {
  content: CmsPageContent
  includeFooter?: boolean
  sectionId?: string
}

export default function FaqPageContent({
  content,
  includeFooter = true,
  sectionId,
}: FaqPageContentProps) {
  const section = content.sections.find(
    item =>
      item.type === 'faqContent' &&
      item.enabled &&
      (!sectionId || item.id === sectionId)
  ) as FaqContentSection | undefined

  if (!section) return null

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white text-[#061331]">
      <FaqContent section={section} />
      {includeFooter ? <Footer /> : null}
    </div>
  )
}

function FaqContent({ section }: { section: FaqContentSection }) {
  const firstCategory = section.categories[0]?.id || ''
  const [activeCategory, setActiveCategory] = useState(firstCategory)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const activeItems = useMemo(() => {
    return section.categories.find(category => category.id === activeCategory)?.items || []
  }, [activeCategory, section.categories])

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id)
    setOpenIndex(0)
  }

  return (
    <>
      <section className="relative flex min-h-85 flex-col justify-between overflow-hidden pt-24 pb-6 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 sm:h-90 sm:pt-28 sm:pb-8 lg:h-100 lg:py-10 lg:pt-27.5 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        <Image
          src={section.backgroundImage}
          alt={section.title}
          fill
          priority
          className="absolute inset-0 z-0 object-cover object-center"
          sizes="100vw"
        />

        <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8">
          <div className="max-w-187.5">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/90 lg:text-sm">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#d7a23a]">
                    Home
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none font-semibold text-white">
                  <span>FAQ</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="mt-auto space-y-3 pt-6 text-left">
            <span className="inline-flex items-center rounded-full border border-[#d7a23a]/40 bg-[#081638] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#d7a23a] shadow-sm">
              {section.badge}
            </span>
            <h1
              className="text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[48px]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              {section.title}
            </h1>
            <p className="max-w-xl text-xs font-medium leading-relaxed text-white/80 sm:text-sm">
              {section.description}
            </p>
          </div>
        </div>
      </section>

      <main className="w-full grow bg-[#fbf8fc] py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-6 lg:grid lg:grid-cols-[1fr_1.8fr] lg:gap-10">
            <div className="scrollbar-none sticky top-20 z-10 flex w-full shrink-0 snap-x flex-row gap-2 overflow-x-auto bg-[#fbf8fc]/90 py-2 pb-2.5 backdrop-blur-xs lg:w-auto lg:flex-col lg:overflow-x-visible lg:py-0 lg:pb-0">
              {section.categories.map(category => {
                const isActive = activeCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`group flex w-full shrink-0 snap-start items-center justify-center rounded-xl border px-4 py-2.5 text-left transition-all duration-300 lg:justify-between lg:rounded-2xl lg:px-6 lg:py-4.5 ${
                      isActive
                        ? 'scale-[1.01] border-slate-100 bg-[#061331] font-bold text-white lg:border-[#d7a23a] lg:bg-white lg:text-[#061331] lg:shadow-md'
                        : 'border-slate-200/40 bg-white/70 text-[#061331]/75 lg:bg-white/40 lg:text-slate-400 lg:hover:bg-white/80 lg:hover:text-slate-500'
                    }`}
                  >
                    <span className="text-xs font-semibold tracking-tight sm:text-sm lg:text-[15px] lg:font-bold">
                      {category.name}
                    </span>
                    <span className={`hidden transition-transform duration-300 lg:inline ${isActive ? 'translate-x-0.5 text-[#061331]' : 'text-slate-300 group-hover:text-slate-400'}`}>
                      &#8250;
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="w-full space-y-3">
              {activeItems.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div
                    key={`${item.question}-${index}`}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? 'border-[#e2e8f0]/40 bg-white shadow-[0_10px_30px_rgba(6,19,49,0.03)]'
                        : 'border-[#e2e8f0]/20 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between p-4 text-left lg:p-5"
                      aria-expanded={isOpen}
                    >
                      <span className={`pr-6 text-[13px] font-bold transition-colors duration-200 lg:text-[15px] ${isOpen ? 'text-[#061331]' : 'text-[#061331]/80 group-hover:text-[#d7a23a]'}`}>
                        {item.question}
                      </span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-black text-[#061331]">
                        {isOpen ? '×' : '+'}
                      </span>
                    </button>

                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="mt-1 border-t border-slate-50 px-4 pt-1 pb-4 text-[12px] font-medium leading-relaxed text-slate-500 lg:px-5 lg:pb-5 lg:text-sm">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
