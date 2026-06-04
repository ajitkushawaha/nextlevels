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

interface ServiceItem {
  id: number
  number: string
  title: string
  shortDesc: string
  description: string
  image: string
  icon: React.ComponentType<{ className?: string }>
  benefits: string[]
  stats: string
  color: string
}

const servicesData: ServiceItem[] = [
  {
    id: 0,
    number: '01',
    title: 'University Selection & Admissions',
    shortDesc: 'Match with 150+ world-class partner institutions and secure admissions through our direct channels.',
    description:
      'Choosing the right university is the foundation of your international career. Our experienced counselors analyze your academic background, financial limits, and career goals to match you with top-tier universities across the UK, Canada, Australia, New Zealand, and Germany. We guide you through compiling credentials, crafting high-impact Statements of Purpose (SOP), and drafting recommendations to ensure your application stands out to admission boards.',
    image: '/home2/univercity.png',
    icon: GraduationCap,
    benefits: [
      'Personalized profile assessment and course matching',
      'Professional SOP editing and review services',
      'Fast-track application processing with partner universities',
      'Direct admissions follow-up and offer letter securement',
    ],
    stats: '150+ Partners',
    color: '#d7a23a'
  },
  {
    id: 1,
    number: '02',
    title: 'Visa Guidance & Application Support',
    shortDesc: 'Navigate complex student visa requirements with professional compliance audits and a 98% success rate.',
    description:
      'Immigration policies are detailed and constantly changing. Our dedicated visa compliance team helps demystify the visa application process. We provide customized checklists for financial sponsorship presentation, document legalizations, and health check-ups. Our specialists carefully inspect all application forms and supporting financial portfolios before submission to ensure complete alignment with government regulations.',
    image: '/home2/visaappp.png',
    icon: FileText,
    benefits: [
      'Expert advice on sponsor funds and liquid assets presentation',
      'Custom checklists for UK, Canada, Australia, and Schengen visas',
      'Meticulous application auditing prior to final submission',
      'High approval rates driven by up-to-date compliance standards',
    ],
    stats: '98% Success',
    color: '#84cc16'
  },
  {
    id: 2,
    number: '03',
    title: 'Scholarship Assistance',
    shortDesc: 'Identify merit-based grants and university-specific funding opportunities to significantly reduce your tuition burden.',
    description:
      'A global education is a significant life investment, but you don\'t have to bear the full cost. We actively research and identify university grants, merit scholarships, and state-funded bursaries suited to your achievements. We help you write winning scholarship essays, emphasize your leadership and community involvements, and guide you on obtaining English proficiency waivers where available.',
    image: '/home2/scollership.png',
    icon: Award,
    benefits: [
      'Tailored searches for merit-based and need-based university scholarships',
      'Comprehensive editing for scholarship personal statements',
      'Advising on IELTS/TOEFL requirements and waiver pathways',
      'Maximizing tuition discounts and partial funding opportunities',
    ],
    stats: 'Up to 50% Off',
    color: '#a855f7'
  },
  {
    id: 3,
    number: '04',
    title: 'Pre-Departure & Post-Arrival Guidance',
    shortDesc: 'Transition smoothly to your new life with support for accommodation booking, bank setups, and local orientation.',
    description:
      'Succeeding abroad goes beyond classroom lectures. Our pre-departure briefings prepare you for the cultural, financial, and climate adjustments of your destination. We assist you in searching for secure student accommodations, sourcing student health insurance, and planning your travel logistics. Once you land, our networks help you coordinate airport pickups, open local bank accounts, and connect with peer groups.',
    image: '/home2/pre-deparcher.png',
    icon: Compass,
    benefits: [
      'Detailed briefings on local regulations, student work rights, and lifestyle',
      'Assistance with verified student accommodation bookings',
      'Support in setting up international health coverage',
      'Connection to local student support groups upon arrival',
    ],
    stats: 'End-to-End Support',
    color: '#f59e0b'
  },
  {
    id: 4,
    number: '05',
    title: 'Mock Interviews & Confidence Coaching',
    shortDesc: 'Prepare for intense university admissions and visa officer credibility interviews with realistic simulations.',
    description:
      'A visa or admissions interview can be the final gating step. Our mock interview program replicates real credibility questioning. We hold mock sessions to coach you on clarity of intent, communication style, and confidence. Our coaches provide constructive, video-reviewed feedback on body language and answer structuring, ensuring you feel prepared and relaxed when facing official interviews.',
    image: '/home2/mock-interview.png',
    icon: UsersRound,
    benefits: [
      'Realistic mock interviews matching embassy formats',
      'Coaching on answering credibility and financial questions',
      'Personalized review on body language, tone, and pacing',
      'Interactive sessions to eliminate interview anxiety',
    ],
    stats: '1-on-1 Coaching',
    color: '#06b6d4'
  }
]

export default function ServicesInteractiveHub() {
  const [activeTab, setActiveTab] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const activeService = servicesData[activeTab]
  const ActiveIcon = activeService.icon

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
      <section className="py-10 " id="services">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                onClick={() => {
                  setActiveTab(index)
                  setIsModalOpen(true)
                }}
                className="bg-white border border-slate-200/80 rounded-3xl flex flex-col overflow-hidden h-full group hover:translate-y-[-4px] hover:border-[#d7a23a] transition-all duration-300 shadow-[0_10px_35px_rgba(8,22,56,0.03)] hover:shadow-[0_20px_50px_rgba(8,22,56,0.08)] cursor-pointer"
              >
                {/* Large Illustration Header */}
                <div className="relative h-48 w-full bg-slate-50/80 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-slate-100 rounded-full px-3 py-1 text-xs font-black text-[#d7a23a] tracking-wider">
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow text-left">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#081638] mb-3 group-hover:text-[#d7a23a] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {service.shortDesc}
                  </p>
                  <div className="inline-flex items-center gap-2 font-bold text-sm text-[#081638] group-hover:text-[#d7a23a] transition-colors pt-4 border-t border-slate-100 w-full mt-auto">
                    Explore Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why Next Level Stands Out */}
      <section className="py-10 bg-slate-50/50 rounded-3xl border border-slate-100 p-8 sm:p-12 mt-16">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <div className="text-[#081638] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#d7a23a]"></div>
              OUR CREDENTIALS
            </div>
            
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-[#081638] mb-6 leading-tight"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Why Next Level Stands Out
            </h2>
            
            <p className="text-base text-slate-500 mb-10 leading-relaxed">
              Providing unique, personalized guidance that eliminates study abroad stress entirely. We operate with high compliance rigor and a commitment to transparent, zero-fee support.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full border border-[#d7a23a]/30 bg-[#d7a23a]/5 flex items-center justify-center text-[#d7a23a]">
                  <Check className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#081638] text-lg mb-2">Global Admissions Representative</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Direct relationships with over 150+ highly ranked universities across Australia, Canada, UK, and New Zealand.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full border border-[#d7a23a]/30 bg-[#d7a23a]/5 flex items-center justify-center text-[#d7a23a]">
                  <Check className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#081638] text-lg mb-2">Credibility-First Visa Success</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Every portfolio undergoes rigorous auditing to ensure financial records and statements are bulletproof.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="bg-[#081638] p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg">
              <span className="text-[#d7a23a] text-4xl font-extrabold mb-1">150+</span>
              <span className="text-white/80 text-[10px] uppercase font-bold tracking-widest">Partner Colleges</span>
            </div>
            
            <div className="bg-white border border-slate-200/60 p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-[#081638] text-4xl font-extrabold mb-1">5+</span>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Destinations</span>
            </div>
            
            <div className="bg-white border border-slate-200/60 p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-[#081638] text-4xl font-extrabold mb-1">100%</span>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Direct Channels</span>
            </div>
            
            <div className="bg-[#081638] p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg">
              <span className="text-[#d7a23a] text-4xl font-extrabold mb-1">98%</span>
              <span className="text-white/80 text-[10px] uppercase font-bold tracking-widest">Visa Approvals</span>
            </div>
            
            <div className="col-span-2 bg-[#fffcf0] border border-[#d7a23a]/20 p-8 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="text-[#d7a23a] text-[10px] uppercase font-extrabold tracking-widest">COMPLETELY ZERO FEES</span>
                <span className="text-[#081638] text-3xl font-black mt-2">LKR 0</span>
                <span className="text-slate-500 text-xs font-semibold mt-1">Student Service Costs</span>
              </div>
              <Wallet className="h-14 w-14 text-[#d7a23a] opacity-30 stroke-[1.5]" />
            </div>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {isModalOpen && (
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
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
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
                        {benefit}
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
