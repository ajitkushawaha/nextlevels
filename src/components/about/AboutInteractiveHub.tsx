'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Compass,
  Award,
  Globe2,
  UsersRound,
  Eye,
  Target,
  ArrowRight,
  TrendingUp,
  MapPin,
  CalendarDays,
} from 'lucide-react'

const milestones = [
  {
    year: '2020',
    title: 'The Foundation',
    description:
      'Next Level Education was established in Kondavil, Jaffna, Sri Lanka, with a singular mission: to make international admissions simple, transparent, and 100% free of service charges for students.',
    icon: Compass,
    stats: 'Founded in Jaffna',
  },
  {
    year: '2022',
    title: 'Expansion of Networks',
    description:
      'We signed official direct representation agreements with 150+ top universities in the UK, Canada, and Australia. We also opened online advisory desks to support students nationwide.',
    icon: Globe2,
    stats: '150+ Direct Partners',
  },
  {
    year: '2024',
    title: 'Milestone Placements',
    description:
      'Successfully placed over 1,000 students into foreign institutions. Secured high visa approval rates through meticulous compliance audits and interview preparation coaching.',
    icon: UsersRound,
    stats: '1,000+ Placements',
  },
  {
    year: 'Today',
    title: 'Free Global Hub',
    description:
      'Now operating physical consultancy centers in Kondavil and Batticaloa, alongside comprehensive digital portals. We provide end-to-end guidance from admissions to post-arrival support.',
    icon: Award,
    stats: '98% Visa Success',
  },
]

export default function AboutInteractiveHub() {
  const [activeMilestone, setActiveMilestone] = useState(3) // Default to 'Today'
  const [activePurposeTab, setActivePurposeTab] = useState<'vision' | 'mission'>('vision')

  const currentMilestone = milestones[activeMilestone]
  const MilestoneIcon = currentMilestone.icon

  return (
    <div className="w-full">
      {/* Dynamic Milestones Section */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d7a23a]">
            Our Journey
          </span>
          <h2
            className="text-3xl font-bold text-[#061331] mt-3"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Milestones of Trust & Growth
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Click on the timeline milestones below to follow our growth story over the years.
          </p>
        </div>

        {/* Milestone Horizontal Selector */}
        <div className="relative max-w-4xl mx-auto mb-10 px-4">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-1/2 z-0 hidden sm:block"></div>
          <div
            className="absolute top-1/2 left-8 h-0.5 bg-[#d7a23a] -translate-y-1/2 z-0 transition-all duration-500 hidden sm:block"
            style={{
              width: `${(activeMilestone / (milestones.length - 1)) * 90}%`
            }}
          ></div>

          {/* Timeline Nodes */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
            {milestones.map((milestone, idx) => {
              const isActive = activeMilestone === idx
              return (
                <button
                  key={milestone.year}
                  onClick={() => setActiveMilestone(idx)}
                  className={`flex flex-col items-center group cursor-pointer focus:outline-none`}
                >
                  {/* Circle Indicator */}
                  <div
                    className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive
                        ? 'bg-[#061331] border-[#d7a23a] text-[#d7a23a] scale-110 shadow-lg shadow-[#061331]/20'
                        : 'bg-white border-slate-200 text-slate-400 group-hover:border-[#061331] group-hover:text-[#061331]'
                      }`}
                  >
                    <span className="text-xs font-bold">{milestone.year}</span>
                  </div>

                  {/* Year Label */}
                  <span className={`text-xs font-bold mt-2 transition-colors duration-300 ${isActive ? 'text-[#061331]' : 'text-slate-400 group-hover:text-[#061331]'
                    }`}>
                    {milestone.title.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Showcase Milestone Content Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/60 p-6 sm:p-8 md:p-10 shadow-xl transition-all duration-500 hover:shadow-2xl">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,162,58,0.05),transparent_50%)] pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
              {/* Icon container */}
              <div className="h-14 w-14 rounded-xl bg-[#061331] text-[#d7a23a] flex items-center justify-center shrink-0 shadow-lg">
                <MilestoneIcon className="h-6 w-6" />
              </div>

              {/* Text Info */}
              <div className="grow">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-0">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#061331]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {currentMilestone.title} ({currentMilestone.year})
                  </h3>
                  <span className="inline-block text-xs font-black text-[#d7a23a] uppercase tracking-wider bg-[#d7a23a]/10 px-3 py-1 rounded-full mt-1 sm:mt-0">
                    {currentMilestone.stats}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#59616f] mt-4">
                  {currentMilestone.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Vision vs Mission Showcase */}
      <div className="mb-24 bg-linear-to-br from-[#061331] to-[#0a1e47] rounded-3xl text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
        {/* Glow lights */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#d7a23a]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#d7a23a]/10 rounded-full blur-3xl"></div>

        {/* Decorative Grid */}
        <div className="absolute top-6 left-6 opacity-5">
          <div className="h-16 w-32 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] bg-size-[0.75rem_0.75rem]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Custom Switcher */}
          <div className="flex bg-white/5 border border-white/10 rounded-full p-1 mb-10 w-full max-w-[320px] relative shadow-inner">
            <button
              onClick={() => setActivePurposeTab('vision')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all duration-300 relative z-10 cursor-pointer ${activePurposeTab === 'vision' ? 'bg-[#d7a23a] text-[#061331]' : 'text-white hover:text-[#d7a23a]'
                }`}
            >
              Our Vision
            </button>
            <button
              onClick={() => setActivePurposeTab('mission')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all duration-300 relative z-10 cursor-pointer ${activePurposeTab === 'mission' ? 'bg-[#d7a23a] text-[#061331]' : 'text-white hover:text-[#d7a23a]'
                }`}
            >
              Our Mission
            </button>
          </div>

          {/* Sliding panels */}
          <div className="w-full text-center transition-all duration-500">
            {activePurposeTab === 'vision' ? (
              <div className="animate-fadeIn space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#d7a23a] mx-auto shadow-lg border border-white/5">
                  <Eye className="h-7 w-7" />
                </div>
                <h3
                  className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Empowering Futures Globally
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  "To be a trusted leader in education consultancy, empowering students to achieve their academic goals and transform their futures through personalized guidance for studying abroad."
                </p>
                <div className="text-[#d7a23a] text-xs font-bold uppercase tracking-widest pt-2">
                  Building International Pathways since 2020
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#d7a23a] mx-auto shadow-lg border border-white/5">
                  <Target className="h-7 w-7" />
                </div>
                <h3
                  className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Uncompromising Support & Trust
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  "To provide comprehensive, personalized support and guidance to students of all ages and backgrounds as they navigate the complex world of education, ensuring a seamless experience from university selection to visa processing."
                </p>
                <div className="text-[#d7a23a] text-xs font-bold uppercase tracking-widest pt-2">
                  100% Free Counseling & Direct Submissions
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
