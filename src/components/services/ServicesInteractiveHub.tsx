'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  GraduationCap,
  FileText,
  Award,
  Compass,
  UsersRound,
  ArrowRight,
  Check,
  Building,
  Plane,
  X,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Wallet
} from 'lucide-react'
import { serviceDetails, type ServiceDetail } from '@/lib/serviceDetails'
import type { ServicesCredentialsSection } from '@/lib/cms/types'

type ServiceItem = ServiceDetail & {
  id: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const serviceIcons = [
  UsersRound,
  FileText,
  GraduationCap,
  Building,
  ShieldCheck,
  Award,
  Wallet,
  UsersRound,
  Building,
  Plane,
  ShieldCheck,
  Sparkles,
]

const serviceColors = ['#d7a23a', '#84cc16', '#a855f7', '#f59e0b', '#06b6d4']

function buildServicesData(services: ServiceDetail[]): ServiceItem[] {
  return services.map((service, index) => ({
    ...service,
    id: index,
    icon: serviceIcons[index] || GraduationCap,
    color: serviceColors[index % serviceColors.length],
  }))
}

export default function ServicesInteractiveHub({
  services = serviceDetails,
  credentials,
  showServices = true,
  showCredentials = true,
}: {
  services?: ServiceDetail[]
  credentials?: ServicesCredentialsSection
  showServices?: boolean
  showCredentials?: boolean
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const servicesData = buildServicesData(services)
  const activeService = servicesData[activeTab]
  const ActiveIcon = activeService?.icon || GraduationCap

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  return (
    <div className="w-full">
      {/* Services Grid Layout */}
      {showServices && servicesData.length > 0 && (
      <section className="" id="services">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="bg-white border border-slate-200/80 rounded-3xl flex flex-col overflow-hidden h-full group hover:-translate-y-1 hover:border-[#d7a23a] transition-all duration-300 shadow-[0_10px_35px_rgba(8,22,56,0.03)] hover:shadow-[0_20px_50px_rgba(8,22,56,0.08)] cursor-pointer"
              >
                {/* Large Illustration Header */}
                <div className="relative h-48 w-full bg-slate-50/80 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-slate-100 rounded-full px-3 py-1 text-xs font-black text-[#d7a23a] tracking-wider">
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col grow text-left">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#081638] mb-3 group-hover:text-[#d7a23a] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 grow">
                    {service.shortDesc}
                  </p>
                  <div className="inline-flex items-center gap-2 font-bold text-sm text-[#081638] group-hover:text-[#d7a23a] transition-colors pt-4 border-t border-slate-100 w-full mt-auto">
                    Explore Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      )}

      {/* Why Next Level Stands Out */}
      {showCredentials && credentials && (
      <section className="py-10 bg-white/70 rounded-3xl border border-slate-100 p-8 sm:p-12 mt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="text-[#081638] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[#d7a23a]"></div>
              {credentials.eyebrow}
            </div>

            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#081638] mb-6 leading-tight"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              {credentials.title}
            </h2>

            <p className="text-base text-slate-500 mb-10 leading-relaxed">
              {credentials.description}
            </p>

            <div className="space-y-8">
              {credentials.points.map(point => (
                <div key={point.title} className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-[#d7a23a]/30 bg-[#d7a23a]/5 flex items-center justify-center text-[#d7a23a]">
                    <Check className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#081638] text-lg mb-2">{point.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-90 overflow-hidden rounded-3xl border border-slate-200 bg-[#E9EFF6] shadow-[0_24px_60px_rgba(8,22,56,0.12)]">
            <Image
              src={credentials.image}
              alt={credentials.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#061331]/65 via-[#061331]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-black uppercase tracking-wider text-[#d7a23a]">
                {credentials.imageEyebrow}
              </p>
              <p className="mt-2 max-w-sm text-lg font-extrabold leading-snug">
                {credentials.imageTitle}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {credentials.stats.map(stat => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="flex items-center justify-between rounded-2xl border border-[#d7a23a]/20 bg-[#fffcf0] p-6 shadow-sm sm:col-span-2 lg:col-span-1"
            >
              {stat.variant === 'gold' ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-[#d7a23a] text-[10px] uppercase font-extrabold tracking-widest">ZERO FEES</span>
                    <span className="text-[#081638] text-3xl font-black mt-2">{stat.value}</span>
                    <span className="text-slate-500 text-xs font-semibold mt-1">{stat.label}</span>
                  </div>
                  <Wallet className="h-12 w-12 text-[#d7a23a] opacity-30 stroke-[1.5]" />
                </>
              ) : (
                <div className="flex flex-col">
                  <span className="text-[#081638] text-3xl font-black">{stat.value}</span>
                  <span className="text-slate-500 text-xs font-semibold mt-1">{stat.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Modal Overlay */}
      {isModalOpen && activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#081638]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#081638] hover:bg-slate-100 shadow-sm transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Visual Header / Image Frame */}
            <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden group bg-slate-50 border-b border-slate-100">
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                className="object-contain p-6 sm:p-10 transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 800px"
              />

              {/* Floating Stats Badge */}
              <div className="absolute top-4 left-4 bg-[#081638]/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d7a23a]"></span>
                {activeService.stats}
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-10 grow">
              {/* Title & Icon Eyebrow */}
              <div className="flex items-center gap-3.5 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d7a23a]/10 text-[#d7a23a]">
                  <ActiveIcon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">
                  Service Detail {activeService.number}
                </span>
              </div>

              {/* Service Title */}
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#081638] leading-tight mb-4"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                {activeService.title}
              </h2>

              {/* Full Description */}
              <p className="text-sm leading-relaxed text-[#59616f] mb-8 font-medium">
                {activeService.description}
              </p>

              {/* Bullet Features with Checkmarks */}
              <div className="border-t border-slate-100 pt-6">
                <p className="text-xs font-extrabold text-[#081638] uppercase tracking-wider mb-5">
                  What we cover:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeService.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mt-0.5">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </span>
                      <span className="text-xs font-semibold text-slate-700 leading-snug">
                        {typeof benefit === 'string' ? benefit : benefit?.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showcase Action Button */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-slate-400 font-medium">Service Fee</p>
                  <p className="text-sm font-black text-emerald-600 uppercase tracking-wide mt-0.5">
                    100% Free / No Hidden Costs
                  </p>
                </div>

                <Link
                  href="/contact-us"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#081638] px-8 py-3 text-[13px] font-bold text-white transition hover:bg-[#d7a23a] hover:text-[#081638]"
                >
                  Schedule Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
