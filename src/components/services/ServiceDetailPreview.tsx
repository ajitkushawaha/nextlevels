'use client'

import React from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  MapPin,
  Plane,
  Sparkles,
  UserRound,
  PenLine,
  Rocket,
  PhoneCall,
  Calendar,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { ServiceDetail, ServiceCardDetail } from '@/lib/serviceDetails'

interface ServiceDetailPreviewProps {
  service: ServiceDetail
}

export default function ServiceDetailPreview({ service }: ServiceDetailPreviewProps) {
  const coverIcons = [UserRound, PenLine, Rocket, PhoneCall]
  
  const defaultDescriptions = {
    benefits: [
      'We evaluate your academic background, interests, and goals to match you with the right courses and universities.',
      'Our experts refine your documents for clarity, impact, and a strong reflection of your goals.',
      'We streamline your applications through our partner network to reduce waiting time and speed up the process.',
      'We follow up directly with universities and support you until you receive your offer letter.',
    ],
    process: [
      'We understand your profile, aspirations, and budget to create a strong foundation.',
      'We research and recommend the best-fit universities and programs for you.',
      'We help you create compelling documents that highlight your strengths and goals.',
      'We submit applications, track progress, and follow up until you get the offer.',
    ],
    outcomes: [
      'A focused list of right-fit options that match your profile.',
      'Well-prepared, polished, and university-ready application documents.',
      'Improved chances with the right strategy and fewer setbacks.',
      'A smooth, guided process that saves time and brings peace of mind.',
    ],
  }

  const getCardDetails = (
    item: any,
    index: number,
    sectionType: 'cover' | 'process' | 'outcome'
  ) => {
    if (!item || typeof item === 'string') {
      const title = typeof item === 'string' ? item : `Card ${index + 1}`
      let defaultDesc = ''
      if (sectionType === 'cover') defaultDesc = defaultDescriptions.benefits[index] || ''
      else if (sectionType === 'process') defaultDesc = defaultDescriptions.process[index] || ''
      else if (sectionType === 'outcome') defaultDesc = defaultDescriptions.outcomes[index] || ''

      return {
        title,
        description: defaultDesc,
        image: `/service/${sectionType}-${index + 1}.png`,
        iconName: undefined,
      }
    }

    return {
      title: item.title || '',
      description: item.description || '',
      image: item.image || `/service/${sectionType}-${index + 1}.png`,
      iconName: item.iconName,
    }
  }

  const expectedOutcomes = [
    ...(service.outcomes || []),
    'Save time and reduce stress',
  ].slice(0, 4)

  return (
    <div className="min-h-screen bg-white text-[#12174F] font-sans overflow-y-auto max-h-[calc(100vh-10rem)]">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden flex flex-col justify-between pt-20 pb-6 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200'}
            alt={`${service.title || 'Service'} banner`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 text-left">
          <div className="space-y-3 pt-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#12174F] border border-[#FBC02D]/40 text-[#FBC02D] text-[10px] font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Service {service.number || '01'} · {service.stats || 'Free'}
              </span>
            </div>

            <h1
              className="max-w-3xl text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              {service.title || 'Service Title'}
            </h1>

            <p className="text-white/80 text-xs max-w-xl font-medium leading-relaxed">
              {service.shortDesc || 'Service short description text...'}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                type="button"
                className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md bg-[#FBC02D] px-4 py-1.5 text-[10px] font-bold text-[#12174F]"
              >
                Book Free Consultation
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FBC02D]">
            What We Cover
          </p>
          <h2
            className="mt-2 text-xl font-black leading-tight text-[#12174F]"
            style={{ fontFamily: 'Farro, sans-serif' }}
          >
            Clear guidance from first question to next step.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-[#424242]">
            This service is designed to reduce confusion, document gaps, and avoidable delays.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(service.benefits || []).slice(0, 4).map((item, index) => {
              const card = getCardDetails(item, index, 'cover')
              const Icon =
                (card.iconName &&
                  (LucideIcons[card.iconName as keyof typeof LucideIcons] as React.ComponentType<any>)) ||
                coverIcons[index] ||
                LucideIcons.HelpCircle

              return (
                <article
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white text-center shadow-xs"
                >
                  <div className="relative h-36 w-full">
                    <Image
                      src={card.image || '/service/cover-1.png'}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                  <div className="px-4 pb-5">
                    <span className="mx-auto -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F7FA] text-[#1A237E] shadow-sm relative z-20">
                      <Icon className="h-5 w-5" strokeWidth={2.6} />
                    </span>
                    <h3 className="mt-3 text-sm font-black leading-snug text-[#12174F]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-[#424242]">
                      {card.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="relative overflow-hidden bg-[#12174F] py-10 text-center">
        <div className="absolute inset-0 opacity-3 bg-[radial-gradient(circle_at_28%_30%,#fff_0_10%,transparent_11%)]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FBC02D]">
            Our Process
          </p>
          <h2
            className="mt-1 text-xl font-black leading-tight text-white"
            style={{ fontFamily: 'Farro, sans-serif' }}
          >
            How this service works
          </h2>
          <span className="mx-auto mt-2 block h-1 w-8 rounded-full bg-[#FBC02D]" />

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(service.process || []).slice(0, 4).map((item, index) => {
              const card = getCardDetails(item, index, 'process')
              return (
                <article key={index} className="relative text-center flex flex-col items-center">
                  <div className="relative h-28 w-28 rounded-full border-4 border-white bg-white shadow-md">
                    <span className="absolute -left-1 top-0 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-[#FBC02D] text-xs font-black text-[#12174F]">
                      {index + 1}
                    </span>
                    <div className="absolute inset-1 rounded-full overflow-hidden">
                      <Image
                        src={card.image || '/service/process-1.png'}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  </div>

                  <h3 className="mt-3 text-sm font-black text-white max-w-[180px]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/75 max-w-[200px]">
                    {card.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="bg-[#F8F7FA] py-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FBC02D]">
            Expected Outcomes
          </p>
          <h2
            className="mt-1 text-xl font-black leading-tight text-[#12174F]"
            style={{ fontFamily: 'Farro, sans-serif' }}
          >
            We focus on clarity and readiness.
          </h2>
          <span className="mx-auto mt-2 block h-1 w-8 rounded-full bg-[#FBC02D]" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expectedOutcomes.map((item, index) => {
              const card = getCardDetails(item, index, 'outcome')
              return (
                <article
                  key={index}
                  className="relative text-center lg:border-r lg:border-[#E0E0E0]/60 lg:last:border-r-0 pb-4"
                >
                  <div className="relative mx-auto h-24 w-24 rounded-full overflow-hidden shadow-xs">
                    <Image
                      src={card.image || '/service/outcome-1.png'}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="90px"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-black text-[#12174F] max-w-[180px] mx-auto">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#424242] max-w-[200px] mx-auto">
                    {card.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
