import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Quote,
  UsersRound,
} from 'lucide-react'
import BranchEnquiryForm from '@/components/branches/BranchEnquiryForm'
import Footer from '@/components/layout/footer'
import { branches, getBranch } from '@/lib/branches'

type Params = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return branches.map(branch => ({
    slug: branch.slug,
  }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const branch = getBranch(slug)

  if (!branch) return { title: 'Branch Not Found' }

  return {
    title: branch.seoTitle,
    description: branch.metaDescription,
    alternates: {
      canonical: `/branches/${branch.slug}`,
    },
  }
}

export default async function BranchPage({ params }: Params) {
  const { slug } = await params
  const branch = getBranch(slug)

  if (!branch) notFound()

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&output=embed`

  return (
    <div className="min-h-screen bg-white text-[#081638]">
      <main>
        <section className="relative flex min-h-105 flex-col justify-between overflow-hidden bg-[#081638] pt-24 text-white sm:min-h-115 sm:pt-28 lg:min-h-125">
          <Image
            src={branch.heroImage}
            alt={`${branch.city} branch counselling team`}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 z-10 bg-linear-to-r from-[#081638] via-[#081638]/88 to-[#081638]/35" />
          <div className="absolute inset-0 z-10 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #d7a23a 0%, transparent 42%)' }} />

          <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-4 pb-10 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/80 lg:text-sm">
                <li>
                  <Link href="/" className="transition hover:text-[#d7a23a]">Home</Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5 text-white/50" />
                <li>
                  <span>Branches</span>
                </li>
                <ChevronRight className="h-3.5 w-3.5 text-white/50" />
                <li className="text-white">{branch.city}</li>
              </ol>
            </nav>

            <div className="mt-auto max-w-3xl pt-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d7a23a]/45 bg-[#081638]/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#d7a23a]">
                <MapPin className="h-3.5 w-3.5" />
                {branch.city} Branch
              </span>
              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-[58px]" style={{ fontFamily: 'Farro, sans-serif' }}>
                Study Abroad Consultant in {branch.city}
              </h1>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/82 sm:text-base">
                UK, Canada, Australia, and New Zealand admissions support for students across {branch.province}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#branch-enquiry"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#d7a23a] px-6 py-3 text-sm font-bold text-[#081638] transition hover:bg-white"
                >
                  Contact {branch.city} Branch
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#branch-map"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#d7a23a] hover:text-[#d7a23a]"
                >
                  View Location
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">
                Next Level Education {branch.city}
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Professional overseas education support for Northern Province students.
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                {branch.intro.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {branch.destinations.map(destination => (
                  <span key={destination} className="rounded-full border border-[#d7a23a]/25 bg-[#fffbf0] px-3 py-1 text-xs font-bold text-[#081638]">
                    {destination}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
              <h3 className="text-lg font-black text-[#081638]">Branch Contact</h3>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d7a23a]" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#d7a23a]" />
                  <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="font-bold text-[#081638]">{branch.phone}</a>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#d7a23a]" />
                  <a href={`mailto:${branch.email}`} className="font-bold text-[#081638]">{branch.email}</a>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#d7a23a]" />
                  <span>{branch.workingHours}</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-[#f8fafc] py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">
                Supporting Students Across the Northern Province
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Local guidance for every student journey.
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {branch.areas.map(area => (
                <article key={area.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#081638] text-[#d7a23a]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-black text-[#081638]">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">Student Success Stories</p>
              <h2 className="mt-3 text-3xl font-black text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Students from {branch.city} Branch Studying Abroad
              </h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {branch.stories.map(story => (
                <article key={story.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(8,22,56,0.06)]">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full">
                      <Image src={story.image} alt={story.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#081638]">{story.name}</h3>
                      <p className="text-xs font-bold text-[#d7a23a]">{story.country}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-700">{story.university}</p>
                  <Quote className="mt-5 h-5 w-5 text-[#d7a23a]" />
                  <p className="mt-2 text-sm leading-6 text-slate-600">{story.quote}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">Meet the {branch.city} Team</p>
              <h2 className="mt-3 text-3xl font-black text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Counsellors, admissions support, and branch care.
              </h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {branch.team.map(member => (
                <article key={`${member.name}-${member.designation}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-center shadow-sm">
                  <div className="relative h-64 bg-slate-100">
                    <Image src={member.image} alt={member.designation} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-[#081638]">{member.name}</h3>
                    <p className="mt-1 text-sm font-bold text-[#d7a23a]">{member.designation}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">Branch Gallery</p>
                <h2 className="mt-3 text-3xl font-black text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                  Inside the {branch.city} branch
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-500">
                Office photos, counselling sessions, visa celebrations, education fairs, and university delegate visits.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {branch.gallery.map(item => (
                <article key={item.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="p-4 text-sm font-black text-[#081638]">{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="branch-map" className="bg-[#f8fafc] py-10 sm:py-12">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">Google Map</p>
              <h2 className="mt-3 text-3xl font-black text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Visit Next Level Education {branch.city}
              </h2>
              <div className="mt-6 grid gap-3 text-sm text-slate-600">
                {[
                  [MapPin, branch.address],
                  [Phone, branch.phone],
                  [Mail, branch.email],
                  [CalendarDays, branch.workingHours],
                ].map(([Icon, text]) => {
                  const TypedIcon = Icon as typeof MapPin
                  return (
                    <div key={text as string} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
                      <TypedIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#d7a23a]" />
                      <span>{text as string}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="min-h-90 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <iframe
                src={mapSrc}
                title={`${branch.city} branch map`}
                className="h-full min-h-90 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">FAQ Section</p>
              <h2 className="mt-3 text-3xl font-black text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Questions students ask our {branch.city} branch
              </h2>
            </div>
            <div className="mt-8 space-y-3">
              {branch.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-[#d7a23a]/45"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-3 text-left text-base font-black text-[#081638]">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#d7a23a]" />
                      {faq.question}
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-[#d7a23a]" />
                  </summary>
                  <div className="border-t border-slate-100 px-5 pb-5 pt-3">
                    <p className="pl-8 text-sm leading-6 text-slate-600">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="branch-enquiry" className="bg-[#E9EFF6] py-10 sm:py-12">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#081638] text-[#d7a23a]">
                <GraduationCap className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight text-[#081638] sm:text-5xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Ready to Study Abroad from {branch.city}?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Share your details with the {branch.city} branch team. We will review your profile and guide you through country selection, university admissions, student visa preparation, and scholarship options.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Free counselling', 'University admissions', 'Visa assistance', 'Scholarship guidance'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm font-bold text-[#081638]">
                    <UsersRound className="h-4 w-4 text-[#d7a23a]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <BranchEnquiryForm branchName={branch.city} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
