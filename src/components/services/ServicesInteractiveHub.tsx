'use client'

import { useState } from 'react'
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
  const activeService = servicesData[activeTab]
  const ActiveIcon = activeService.icon

  return (
    <div className="w-full">
      {/* Interactive Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        {/* Left Side: Services List (Navigation) */}
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#d7a23a] mb-6">
            Select a service to explore details
          </p>

          <div className="space-y-3.5">
            {servicesData.map((service, index) => {
              const Icon = service.icon
              const isActive = activeTab === index

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer relative overflow-hidden group ${isActive
                      ? 'bg-[#061331] border-[#d7a23a] text-white shadow-xl scale-[1.02]'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-150 text-[#061331] hover:scale-[1.01] hover:border-[#061331]/20'
                    }`}
                >
                  {/* Glowing background hint on active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(215,162,58,0.1),transparent_60%)] pointer-events-none" />
                  )}

                  {/* Icon Block */}
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive
                        ? 'bg-[#d7a23a] text-[#061331]'
                        : 'bg-[#061331]/5 text-[#061331] group-hover:bg-[#061331] group-hover:text-white'
                      }`}
                  >
                    <Icon className="h-5.5 w-5.5" />
                  </div>

                  {/* Title & Short Description */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-bold text-sm sm:text-base leading-tight transition-colors duration-300 ${isActive ? 'text-[#d7a23a]' : 'text-[#061331]'
                        }`}>
                        {service.title}
                      </h3>
                      <span className={`text-[11px] font-black tracking-wider uppercase opacity-40 ml-2 ${isActive ? 'text-white' : 'text-slate-400'
                        }`}>
                        {service.number}
                      </span>
                    </div>
                    <p className={`text-[12px] leading-snug mt-1.5 line-clamp-1 ${isActive ? 'text-white/70' : 'text-slate-500'
                      }`}>
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Small Chevron indicator */}
                  <div className={`transition-transform duration-300 ${isActive ? 'translate-x-1 text-[#d7a23a]' : 'opacity-0 group-hover:opacity-100 text-[#061331]/50'
                    }`}>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Side: Showcase Panel */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#ece8df] shadow-2xl p-6 sm:p-8 md:p-10 transition-all duration-500 min-h-[580px] flex flex-col justify-between">
            {/* Visual Header / Image Frame */}
            <div>
              <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-100 shadow-md group mb-6">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />

                {/* Floating Stats Badge */}
                <div className="absolute top-4 right-4 bg-[#061331]/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d7a23a]"></span>
                  {activeService.stats}
                </div>

                {/* Aesthetic Corner Crops */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/60"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/60"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/60"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/60"></div>
              </div>

              {/* Title & Icon Eyebrow */}
              <div className="flex items-center gap-3.5 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d7a23a]/10 text-[#d7a23a]">
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
              <p className="text-sm leading-relaxed text-[#59616f] mb-6">
                {activeService.description}
              </p>

              {/* Bullet Features with Checkmarks */}
              <div className="border-t border-slate-100 pt-6">
                <p className="text-xs font-bold text-[#061331] uppercase tracking-wider mb-4">
                  What we cover:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeService.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="text-xs font-medium text-slate-700 leading-snug">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Showcase Action Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate-400 font-medium">Service Fee</p>
                <p className="text-sm font-black text-emerald-600 uppercase tracking-wide mt-0.5">
                  100% Free / No Hidden Costs
                </p>
              </div>

              <Link
                href="/contact-us"
                className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#061331] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#d7a23a] hover:text-[#061331]"
              >
                Schedule Free Consultation
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

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
          <div className="bg-gradient-to-br from-[#061331] to-[#0b1f4d] text-white p-8 rounded-2xl relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2">
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
          <div className="bg-gradient-to-br from-[#d7a23a] to-[#efbd5a] text-[#061331] p-8 rounded-2xl relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 flex flex-col justify-between">
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
