'use client'

import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import FreeCounsellingForm from '@/components/contact/FreeCounsellingForm'
import {
  Eye,
  Rocket,
  UserCheck,
  Heart,
  Shield,
  GraduationCap,
  Calendar,
  ArrowRight,
  Award,
  Users,
} from 'lucide-react'
import type {
  AboutCeoMessageSection,
  AboutHeroSection,
  AboutStorySection,
  AboutTeamSection,
  AboutVisionMissionSection,
  AboutPillarsSection,
  AboutCtaSection,
  CmsPageContent,
  CmsSection,
} from '@/lib/cms/types'

const pillarIconMap: Record<string, any> = {
  UserCheck,
  Heart,
  Shield,
}

interface AboutPageContentProps {
  content: CmsPageContent
  includeFooter?: boolean
  sectionId?: string
}

export default function AboutPageContent({
  content,
  includeFooter = true,
  sectionId,
}: AboutPageContentProps) {
  const sections = sectionId
    ? content.sections.filter(section => section.id === sectionId)
    : content.sections

  return (
    <div className="min-h-screen bg-white text-[#061331]">
      <main className="space-y-12 pb-1 ">
        {sections
          .filter(section => section.enabled)
          .map(section => (
            <AboutSectionRenderer key={section.id} section={section} />
          ))}
      </main>
      {includeFooter ? <Footer /> : null}
    </div>
  )
}

function AboutSectionRenderer({ section }: { section: CmsSection }) {
  switch (section.type) {
    case 'aboutHero':
      return <AboutHero section={section} />
    case 'aboutCeoMessage':
      return <AboutCeoMessage section={section} />
    // case 'aboutStory':
    //   return <AboutStory section={section} />
    case 'aboutVisionMission':
      return <AboutVisionMission section={section} />
    case 'aboutTeam':
      return <AboutTeam section={section} />
    case 'aboutPillars':
      return <AboutPillars section={section} />
    case 'aboutCta':
      return <AboutCta section={section} />
    default:
      return null
  }
}

function AboutHero({ section }: { section: AboutHeroSection }) {
  return (
    <section className="relative overflow-hidden min-h-85 sm:h-90 lg:h-100 flex flex-col justify-between pt-2 sm:pt-28 lg:pt-27.5 pb-6 sm:pb-8 lg:py-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30 ">
      <Image
        src={section.image}
        alt={section.title}
        fill
        priority
        className="object-cover object-center absolute inset-0 z-0"
      />
      <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-187.5 text-left">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
              <li>
                <Link href="/" className="hover:text-[#d7a23a] transition-colors">
                  Home
                </Link>
                <span className="ml-1.5 text-white/60">/</span>
              </li>
              <li className="pointer-events-none text-white font-semibold">
                <span>About Us</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="mt-auto space-y-3 pt-26 sm:pt-6 text-left">
          <div>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
              About Us
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

function AboutCeoMessage({ section }: { section: AboutCeoMessageSection }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-4xl border border-[#f2ece2] bg-[#fdfbf7] shadow-[0_16px_50px_rgba(6,19,49,0.04)] lg:grid-cols-12">
        <div className="flex flex-col justify-center p-6 text-left sm:p-8 lg:col-span-7 lg:p-12">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">
            {section.eyebrow}
          </span>
          <h2
            className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-[#061331] sm:text-4xl"
            style={{ fontFamily: 'Farro, sans-serif' }}
          >
            {section.title}
          </h2>
          <div className="mt-5 h-1.5 w-24 rounded-full bg-[#d7a23a]" />
          <div className="mt-6 max-w-3xl space-y-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
            {section.message
              .split(/\n{2,}/)
              .map(paragraph => paragraph.trim())
              .filter(Boolean)
              .map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
          {section.quote ? (
            <p className="mt-6 border-l-4 border-[#d7a23a] pl-4 text-sm font-extrabold leading-6 text-[#061331]">
              {section.quote}
            </p>
          ) : null}
        </div>

        <div className="relative min-h-96 bg-[#061331] lg:col-span-5">
          <Image
            src={section.image}
            alt={section.imageAlt}
            fill
            priority
            loading="eager"
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 520px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#061331]/90 via-[#061331]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <h3 className="text-2xl font-extrabold leading-tight">{section.name}</h3>
              <p className="mt-1 text-sm font-bold text-[#d7a23a]">{section.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// function AboutStory({ section }: { section: AboutStorySection }) {
//   return (
//     <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
//       <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
//         <div className="space-y-6 lg:col-span-7">
//           <div className="space-y-4">
//             <span className="block text-[11px] font-bold uppercase tracking-widest text-[#d7a23a]">
//               About Next Level Education
//             </span>
//             <div className="relative inline-block">
//               <h2 className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#061331] sm:text-4xl">
//                 {section.title}
//               </h2>
//               <div className="absolute -bottom-2 left-0 h-1.5 w-24 rounded-full bg-[#d7a23a]" />
//             </div>
//           </div>
//           <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
//             {section.content}
//           </p>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
//           {section.stats.map(stat => (
//             <div
//               key={`${stat.label}-${stat.value}`}
//               className={`rounded-2xl border p-5 shadow-[0_4px_20px_rgba(6,19,49,0.02)] flex items-center gap-4 ${
//                 stat.variant === 'gold'
//                   ? 'border-[#d7a23a]/30 bg-[#d7a23a] text-white'
//                   : stat.variant === 'dark'
//                     ? 'border-[#061331] bg-[#061331] text-white'
//                     : 'border-[#f3eee2] bg-[#fcfbfa] text-[#061331]'
//               }`}
//             >
//               <div className="w-12 h-12 rounded-xl bg-[#d7a23a]/10 flex items-center justify-center text-[#d7a23a] shrink-0">
//                 {stat.label.toUpperCase().includes('VISA') ? (
//                   <Award className="w-6 h-6" />
//                 ) : (
//                   <Users className="w-6 h-6" />
//                 )}
//               </div>
//               <div>
//                 <span className="block text-3xl font-bold leading-none">{stat.value}</span>
//                 <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   {stat.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

function AboutVisionMission({ section }: { section: AboutVisionMissionSection }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="bg-[#fdffff] border border-[#f5efe4] rounded-4xl p-8 md:p-12 shadow-[0_10px_35px_rgba(6,19,49,0.02)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative">
          {/* Vision */}
          <div className="flex flex-col md:flex-row gap-6 text-left items-start">
            <div className="w-14 h-14 rounded-full bg-[#061331] flex items-center justify-center text-[#d7a23a] shrink-0 shadow-lg shadow-[#061331]/10">
              <Eye className="w-6 h-6 stroke-2" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-[#061331]">
                {section.visionTitle}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {section.visionText}
              </p>
            </div>
          </div>

          {/* Vertical Separator for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#f0e8d9]"></div>

          {/* Mission */}
          <div className="flex flex-col md:flex-row gap-6 text-left items-start">
            <div className="w-14 h-14 rounded-full bg-[#061331] flex items-center justify-center text-[#d7a23a] shrink-0 shadow-lg shadow-[#061331]/10">
              <Rocket className="w-6 h-6 stroke-2" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-[#061331]">
                {section.missionTitle}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {section.missionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutTeam({ section }: { section: AboutTeamSection }) {
  return (
    <section className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="block text-[11px] font-bold uppercase tracking-widest text-[#d7a23a]">
          Our Team
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold leading-[1.15] text-[#061331] sm:text-4xl">
          {section.title}
        </h2>
        {section.description && (
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
            {section.description}
          </p>
        )}
        <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-[#d7a23a]" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {section.members.map((member, index) => (
          <div
            key={`${member.name}-${member.role}-${index}`}
            className="group overflow-hidden rounded-3xl border border-[#f2ece2]/80 bg-white text-center shadow-[0_8px_30px_rgba(6,19,49,0.015)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(6,19,49,0.05)]"
          >
            <div className="relative h-64 bg-slate-100 sm:h-58 lg:h-56">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="px-5 py-5">
              <h3 className="text-lg font-bold text-[#061331]">{member.name}</h3>
              <p className="mt-1 text-sm font-bold text-[#d7a23a]">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function AboutPillars({ section }: { section: AboutPillarsSection }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-serif text-[#061331]">{section.title}</h2>
        <div className="h-1 w-16 bg-[#d7a23a] mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {section.pillars.map(pillar => {
          const IconComponent = pillarIconMap[pillar.icon] || Heart

          return (
            <div
              key={pillar.title}
              className="flex gap-5 p-6 bg-white border border-[#f2ece2]/80 rounded-3xl shadow-[0_8px_30px_rgba(6,19,49,0.015)] hover:shadow-[0_8px_30px_rgba(6,19,49,0.03)] hover:-translate-y-1 transition-all duration-300 text-left items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#061331] border border-slate-100 shrink-0 shadow-xs">
                <IconComponent className="w-6 h-6 stroke-2" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#061331]">{pillar.title}</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function AboutCta({ section }: { section: AboutCtaSection }) {
  const buttonHref =
    section.buttonHref === '/contact-us' && section.buttonText === 'Book a Free Consultation'
      ? '#about-consultation-form'
      : section.buttonHref

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-linear-to-r from-[#02133f] via-[#052062] to-[#0a3297] text-white rounded-3xl px-4 py-6 sm:px-6 lg:flex-row lg:gap-10 lg:px-10 lg:py-2 relative overflow-hidden shadow-2xl flex flex-col items-center justify-between gap-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(215,162,58,0.1),transparent_40%)] pointer-events-none"></div>

        <div className="w-full lg:w-1/2 space-y-6 text-left relative z-10">
          <div className="text-[#d7a23a] flex items-center gap-2">
            <GraduationCap className="w-8 h-8 stroke-[1.5]" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Start Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-[1.15] tracking-tight">
            {section.titleLine1}
            <br />
            <span className="text-[#d7a23a]">{section.titleLine2Highlighted}</span>
          </h2>

          <p className="text-[#bac6ec] text-sm sm:text-base leading-relaxed max-w-lg">
            {section.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href={buttonHref}
              className="group flex items-center justify-between gap-6 px-6 py-4 border border-amber-400 text-white font-bold rounded-2xl shadow-[0_4px_25px_rgba(135,57,229,0.35)] hover:scale-[1.02] transition-all text-sm w-full sm:w-auto"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white/90" />
                <span>{section.buttonText}</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#8739E5] transition-transform group-hover:translate-x-1 shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        <div id="about-consultation-form" className="w-full scroll-mt-28 lg:w-1/2 relative z-10">
          <div className="rounded-2xl border border-[#d7a23a]/25 bg-white p-4 shadow-2xl">
            <FreeCounsellingForm
              compact
              showImage={false}
              heading={section.formHeading || 'Book a Free Consultation'}
              description={
                section.formDescription ||
                'Share your details and our study abroad advisor will contact you with the next steps.'
              }
              submitLabel={section.formSubmitLabel || 'Start My Journey'}
              sourcePage="About CTA"
              sourceType="about-cta"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
