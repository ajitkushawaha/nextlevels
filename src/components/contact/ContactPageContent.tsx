'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import Footer from '@/components/layout/footer'
import FreeCounsellingForm from '@/components/contact/FreeCounsellingForm'
import type {
  ContactHeroSection,
  ContactCardsSection,
  ContactFormSection,
  ContactMapOfficeSection,
  CmsPageContent,
  CmsSection,
} from '@/lib/cms/types'

interface ContactPageContentProps {
  content: CmsPageContent
  includeFooter?: boolean
  sectionId?: string
}

export default function ContactPageContent({
  content,
  includeFooter = true,
  sectionId,
}: ContactPageContentProps) {
  const sections = sectionId
    ? content.sections.filter(section => section.id === sectionId)
    : content.sections

  return (
    <div className="min-h-screen bg-white text-[#061331] flex flex-col justify-between">
      <main className="w-full grow space-y-12 pb-16 bg-[#fbf8fc] relative z-10">
        {sections
          .filter(section => section.enabled)
          .map(section => {
            if (section.type === 'contactHero') {
              return <ContactHero key={section.id} section={section as ContactHeroSection} />
            }
            return (
              <div key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ContactSectionRenderer section={section} />
              </div>
            )
          })}
      </main>
      {includeFooter ? <Footer /> : null}
    </div>
  )
}

function ContactSectionRenderer({ section }: { section: CmsSection }) {
  switch (section.type) {
    case 'contactHero':
      return <ContactHero section={section as ContactHeroSection} />
    case 'contactCards':
      return <ContactCards section={section as ContactCardsSection} />
    case 'contactForm':
      return <ContactForm section={section as ContactFormSection} />
    case 'contactMapOffice':
      return <ContactMapOffice section={section as ContactMapOfficeSection} />
    default:
      return null
  }
}

function ContactHero({ section }: { section: ContactHeroSection }) {
  return (
    <section className="relative overflow-hidden min-h-85 sm:h-90 lg:h-100 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-27.5 pb-6 sm:pb-8 lg:py-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
      <Image
        src={section.backgroundImage}
        alt={section.title}
        fill
        priority
        className="object-cover object-center absolute inset-0 z-0"
      />
      <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-187.5">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
              <li>
                <Link href="/" className="hover:text-[#d7a23a] transition-colors">
                  Home
                </Link>
                <span className="ml-1.5 text-white/60">/</span>
              </li>
              <li className="pointer-events-none text-white font-semibold">
                <span>Contact Us</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="mt-auto space-y-3 pt-6 text-left">
          <div>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
              {section.eyebrow}
            </span>
          </div>
          <h1
            className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]"
            style={{ fontFamily: 'Farro, sans-serif' }}
          >
            {section.title}
          </h1>
          <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
            {section.description}
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactCards({ section }: { section: ContactCardsSection }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-slate-200/80">
      {section.cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between"
        >
          <div>
            <h4 className="font-bold text-[#081638] text-base mb-2">{card.title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{card.description}</p>
          </div>
          {card.isLink ? (
            <a
              href={card.linkHref}
              className="text-xs font-bold text-[#d7a23a] mt-4 hover:underline flex items-center gap-1"
            >
              {card.linkText} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="text-xs font-bold text-slate-400 mt-4">{card.linkText}</span>
          )}
        </div>
      ))}
    </div>
  )
}

function ContactForm({ section }: { section: ContactFormSection }) {
  return (
    <div className="bg-white rounded-4xl p-4 sm:p-5 lg:p-6 shadow-[0_15px_50px_rgba(8,22,56,0.03)]">
      <FreeCounsellingForm />
    </div>
  )
}

function ContactMapOffice({ section }: { section: ContactMapOfficeSection }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-10 border-t bg-white border-slate-200 px-6 sm:px-8 lg:px-14 rounded-4xl shadow-[0_10px_35px_rgba(8,22,56,0.02)]">
      <div className="lg:col-span-7 w-full h-100 relative rounded-4xl overflow-hidden border border-slate-200/80 shadow-md">
        <iframe
          src={section.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Next Level Office Location"
        />
      </div>

      <div className="lg:col-span-5 text-left space-y-8 lg:pl-6">
        <div className="space-y-3">
          <span className="text-[#d7a23a] text-xs font-black uppercase tracking-widest block">
            {section.eyebrow}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#081638]"
            style={{ fontFamily: 'Farro, sans-serif' }}
          >
            {section.title}
          </h2>
        </div>

        <div className="space-y-6">
          {section.branches.map((branch, idx) => (
            <div
              key={branch.name}
              className={idx > 0 ? 'border-t border-slate-100 pt-6' : ''}
            >
              <h4 className="font-extrabold text-lg text-[#081638] flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#d7a23a] shrink-0" />
                {branch.name}
              </h4>
              <p className="text-slate-500 text-sm mt-1.5 pl-7 leading-relaxed font-medium">
                {branch.addressLine1}
                <br />
                {branch.addressLine2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
