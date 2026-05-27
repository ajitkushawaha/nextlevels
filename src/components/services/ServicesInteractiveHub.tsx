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
  CheckCircle2,
  PhoneCall,
  Calendar,
  Building,
  Check,
  Plane,
  X
} from 'lucide-react'

const servicesData = [
  {
    id: 0,
    number: '01',
    title: 'University Selection & Admissions',
    shortDesc: 'Match with 150+ world-class partner institutions and secure admissions.',
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
  },
  {
    id: 1,
    number: '02',
    title: 'Visa Guidance & Application Support',
    shortDesc: 'Navigate complex student visa requirements with a 98% success rate.',
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
  },
  {
    id: 2,
    number: '03',
    title: 'Scholarship Assistance',
    shortDesc: 'Identify merit-based grants and funding opportunities to ease your tuition fees.',
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
  },
  {
    id: 3,
    number: '04',
    title: 'Pre-Departure & Post-Arrival Guidance',
    shortDesc: 'Transition smoothly to local life abroad with housing and bank setups.',
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
  },
  {
    id: 4,
    number: '05',
    title: 'Mock Interviews & Confidence Coaching',
    shortDesc: 'Prepare for university admissions and visa officer credibility interviews.',
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
  },
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
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#d7a23a] mb-3">
            Select a service to explore details
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const Icon = service.icon
            return (
              <button
                key={service.id}
                onClick={() => {
                  setActiveTab(index)
                  setIsModalOpen(true)
                }}
                className="w-full text-left p-6 rounded-3xl border bg-white border-slate-200 text-[#061331] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(6,19,49,0.08)] hover:border-[#d7a23a]/50 hover:-translate-y-1.5 group flex flex-col gap-5"
              >
                {/* Icon Block */}
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 bg-[#061331]/5 text-[#061331] group-hover:bg-[#d7a23a] group-hover:text-[#061331] transition-all duration-300 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title & Short Description */}
                <div className="grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg sm:text-xl leading-tight group-hover:text-[#d7a23a] transition-colors duration-300 pr-4">
                      {service.title}
                    </h3>
                    <span className="text-xs font-black tracking-wider uppercase opacity-30 text-slate-400 mt-1">
                      {service.number}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-slate-500 line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex items-center text-xs font-bold text-[#d7a23a] opacity-80 group-hover:opacity-100 transition-all duration-300 border-t border-slate-100 w-full">
                  Explore Details <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#061331]/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur border border-slate-200 text-slate-500 hover:text-[#061331] hover:bg-slate-100 shadow-sm transition-all"
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
              <div className="absolute top-4 left-4 bg-[#061331]/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
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
                className="text-2xl sm:text-3xl font-bold text-[#061331] leading-tight mb-4"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {activeService.title}
              </h2>

              {/* Full Description */}
              <p className="text-sm leading-relaxed text-[#59616f] mb-8">
                {activeService.description}
              </p>

              {/* Bullet Features with Checkmarks */}
              <div className="border-t border-slate-100 pt-6">
                <p className="text-xs font-bold text-[#061331] uppercase tracking-wider mb-5">
                  What we cover:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeService.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mt-0.5">
                        <Check className="h-3 w-3 stroke-3" />
                      </span>
                      <span className="text-xs font-medium text-slate-700 leading-snug">
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
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#061331] px-8 py-3 text-[13px] font-bold text-white transition hover:bg-[#d7a23a] hover:text-[#061331]"
                >
                  Schedule Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bento Grid Features - Asymmetric Unique Layout */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d7a23a]">
            Our Credentials
          </span>
          <h2
            className="text-3xl font-bold text-[#061331] mt-3"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Why Next Level Stands Out
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Providing unique, personalized guidance that eliminates study abroad stress entirely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Broad Partner Network */}
          <div className="bg-linear-to-br from-[#061331] to-[#0b1f4d] text-white p-8 rounded-2xl relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#d7a23a]/10 rounded-full translate-x-16 -translate-y-16 blur-2xl"></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#d7a23a] mb-5">
                  <Building className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d7a23a] transition-colors duration-300">
                  Global Admissions Representative
                </h3>
                <p className="text-xs text-white/70 leading-relaxed max-w-xl">
                  We maintain official direct relationships with over 150+ highly ranked universities and colleges across Australia, Canada, the United Kingdom, New Zealand, and Germany. This allows us to submit applications directly and bypass standard communication lag times.
                </p>
              </div>

              <div className="mt-8 flex gap-8 border-t border-white/10 pt-5 text-left">
                <div>
                  <p className="text-2xl font-black text-[#d7a23a]">150+</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Partner Colleges</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#d7a23a]">5+</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Destinations</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#d7a23a]">100%</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Direct Channels</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Visa Success */}
          <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#061331]/5 text-[#061331] mb-5 group-hover:bg-[#061331] group-hover:text-white transition-colors duration-300">
              <Plane className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-[#061331] mb-2 group-hover:text-[#d7a23a] transition-colors duration-300">
              Credibility-First Visa Success
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We audit every visa portfolio with high compliance rigor. This ensures financial sponsorship records are bulletproof and statements of purpose are fully aligned with immigration laws, netting a 98% visa success rate.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#061331]">98%</span>
              <span className="text-xs text-[#d7a23a] font-bold">Visa Approvals</span>
            </div>
          </div>

          {/* Card 3: Free Support */}
          <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#061331]/5 text-[#061331] mb-5 group-hover:bg-[#061331] group-hover:text-white transition-colors duration-300">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-[#061331] mb-2 group-hover:text-[#d7a23a] transition-colors duration-300">
              Completely Zero Fees
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our support model is structured through direct institutional funding. Students do not pay any service fees, administrative costs, or file processing charges. We prioritize transparency.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#061331]">LKR 0</span>
              <span className="text-xs text-emerald-600 font-bold">Student Costs</span>
            </div>
          </div>

          {/* Card 4: Quick Schedule */}
          <div className="bg-linear-to-br from-[#d7a23a] to-[#efbd5a] text-[#061331] p-8 rounded-2xl relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/20 rounded-full translate-x-8 -translate-y-8 blur-xl"></div>

            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#061331]/10 text-[#061331] mb-5">
                <Calendar className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-black mb-2">
                Need customized planning?
              </h3>
              <p className="text-xs text-[#061331]/80 leading-relaxed max-w-lg font-medium">
                No matter where you are in Sri Lanka, you can book an online Zoom consultation or schedule a visit to our Palali Road head office. We evaluate your details and map out target intakes for 2026/2027.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-[#061331]/10 pt-5">
              <a href="tel:+94775198195" className="flex items-center gap-2 text-xs font-bold hover:underline">
                <PhoneCall className="h-4 w-4" />
                Call +94 77 519 8195
              </a>
              <Link
                href="/contact-us"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#061331] text-white px-5 py-2.5 text-xs font-bold shadow-md hover:bg-slate-900 transition-colors"
              >
                Book Profile Evaluation
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
