import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Calendar,
  Award,
  Globe,
  BookOpen,
  HelpCircle,
  FileCheck,
  GraduationCap,
  MessageCircle,
  Building2,
} from 'lucide-react'
import { scholarshipsData, universitiesData } from '@/lib/mockData'
import connectDb from '@/lib/db'
import ScholarshipModel from '@/models/Scholarship'
import mongoose from 'mongoose'
import Image from 'next/image'
import Footer from '@/components/layout/footer'
import ScholarshipEnquiryForm from './ScholarshipEnquiryForm'
import { slugify } from '@/lib/slug'

interface Props {
  params: Promise<{ id: string }>
}

async function findScholarshipBySlugOrId(value: string) {
  const isValidId = mongoose.Types.ObjectId.isValid(value)
  let scholarshipId: string | null = null

  const directMatch = await (ScholarshipModel as any).findOne({
    $or: [...(isValidId ? [{ _id: value }] : []), { title: value }, { 'cmsData.slug': value }],
  }).select('_id').lean()

  if (directMatch?._id) {
    scholarshipId = directMatch._id.toString()
  } else {
    const titleCandidates = await (ScholarshipModel as any).find({}).select('_id title').lean()
    const generatedSlugMatch = titleCandidates.find((item: any) => slugify(item.title) === value)
    scholarshipId = generatedSlugMatch?._id?.toString() || null
  }

  if (!scholarshipId) return null

  return (ScholarshipModel as any)
    .findById(scholarshipId)
    .populate('countryId')
    .populate('universityId')
    .populate({ path: 'programId', populate: { path: 'universityId' } })
    .lean()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const decodedId = decodeURIComponent(id)

  try {
    await connectDb()
    const dbSchol = await findScholarshipBySlugOrId(decodedId)

    if (dbSchol) {
      const seo = dbSchol.cmsData?.seo || {}
      const title = seo.metaTitle || `${dbSchol.title} | Next Level Education`
      const description =
        seo.metaDescription ||
        dbSchol.description ||
        `Explore ${dbSchol.title} eligibility, award value, deadline, and application support.`
      const image =
        seo.ogImage ||
        dbSchol.heroImage ||
        dbSchol.programId?.heroImage ||
        dbSchol.universityId?.bannerImage ||
        dbSchol.countryId?.heroImage
      return {
        title,
        description,
        keywords: seo.metaKeywords || undefined,
        robots: seo.robots || 'index, follow',
        alternates: { canonical: seo.canonical || `/scholarships/${dbSchol.cmsData?.slug || slugify(dbSchol.title)}` },
        openGraph: {
          title: seo.ogTitle || title,
          description: seo.ogDescription || description,
          images: image ? [image] : [],
        },
      }
    }
  } catch (error) {
    console.error('Scholarship metadata lookup failed:', error)
  }

  return {
    title: `${decodedId} | Next Level Education`,
    description: `Explore ${decodedId} eligibility, award value, deadline, and application support.`,
  }
}

export default async function ScholarshipDetailPage({ params }: Props) {
  const { id } = await params
  const decodedId = decodeURIComponent(id)

  let scholarship: any = null
  let canonicalSlug = ''

  try {
    await connectDb()
    const dbSchol = await findScholarshipBySlugOrId(decodedId)

    if (dbSchol) {
      canonicalSlug = dbSchol.cmsData?.slug || slugify(dbSchol.title)
      scholarship = {
        id: dbSchol._id.toString(),
        title: dbSchol.title,
        type: dbSchol.type || 'Merit based',
        country: dbSchol.countryId?.name || 'Global',
        award: dbSchol.awardAmount,
        deadline: dbSchol.deadline || 'December 2026',
        overview: dbSchol.description || 'Welcome to this scholarship study guide.',
        eligibility: dbSchol.eligibilityCriteria || 'No eligibility criteria listed.',
        howToApply: dbSchol.howToApply || 'Apply via our advisor panel or directly at partner institutions.',
        heroImage:
          dbSchol.heroImage ||
          dbSchol.programId?.heroImage ||
          dbSchol.programId?.universityId?.bannerImage ||
          dbSchol.universityId?.bannerImage ||
          dbSchol.countryId?.heroImage ||
          ''
      }
    }
  } catch (err) {
    console.error('Failed to load scholarship from database:', err)
  }

  if (!scholarship) {
    scholarship = scholarshipsData.find(s => s.id === decodedId || slugify(s.title) === decodedId)
    if (scholarship) {
      canonicalSlug = slugify(scholarship.title)

      try {
        const matchingScholarship = await (ScholarshipModel as any)
          .findOne({ title: scholarship.title })
          .select('cmsData.slug')
          .lean()

        if (matchingScholarship?.cmsData?.slug) {
          canonicalSlug = matchingScholarship.cmsData.slug
        }
      } catch (error) {
        console.error('Failed to resolve saved scholarship slug:', error)
      }
    }
  }

  if (!scholarship) {
    notFound()
  }

  if (canonicalSlug && decodedId !== canonicalSlug) {
    permanentRedirect(`/scholarships/${canonicalSlug}`)
  }

  const matchingUniversities = Object.values(universitiesData).filter(
    u => u.country.toLowerCase() === scholarship.country.toLowerCase()
  )
  const quickFacts = [
    { label: 'Country', value: scholarship.country, icon: Globe },
    { label: 'Award Value', value: scholarship.award, icon: Award },
    { label: 'Deadline', value: scholarship.deadline, icon: Calendar },
    { label: 'Funding Type', value: scholarship.type, icon: GraduationCap },
  ]
  const accordionSections = [
    {
      title: 'Scholarship overview',
      icon: BookOpen,
      content: scholarship.overview,
      open: true,
    },
    {
      title: 'Eligibility criteria',
      icon: Award,
      content: scholarship.eligibility,
    },
    {
      title: 'How to apply',
      icon: FileCheck,
      content: scholarship.howToApply,
    },
    {
      title: 'Application support',
      icon: HelpCircle,
      content:
        'Securing international funding is highly competitive. Our study advisors review student profiles, match qualifications, and guide documents so students can apply with a stronger scholarship file.',
    },
  ].filter(section => section.content)
  const heroImage =
    scholarship.heroImage ||
    (scholarship.id ? `/home2/${Number(scholarship.id.replace(/\D/g, '')) % 2 === 0 ? 'happy-gi' : 'scollership'}.png` : '') ||
    '/home2/scollership.png'

  return (
    <div className="min-h-screen bg-white text-[#061331] flex flex-col justify-between">

      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-85 sm:h-90 lg:h-120 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-27.5 pb-6 sm:pb-8 lg:py-10">

        {/* Background Image */}
        <Image
          src={heroImage}
          alt={scholarship.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 z-10 bg-linear-to-b from-[#081638]/88 via-[#081638]/90 to-[#081638]/96 lg:bg-linear-to-r lg:from-[#081638] lg:via-[#081638]/82 lg:to-[#081638]/10" />

        {/* Content Container */}
        <div className="relative z-20 py-10 flex h-full w-full max-w-7xl flex-col justify-between px-4 sm:px-6 lg:mx-auto lg:px-8">

          <div className="max-w-187.5">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/75 lg:text-sm">
                <li>
                  <Link href="/" className="hover:text-[#d7a23a] transition-colors">
                    Home
                  </Link>
                  <span className="ml-1.5 text-white/35">/</span>
                </li>
                <li>
                  <Link href="/scholarships" className="hover:text-[#d7a23a] transition-colors">
                    Scholarships
                  </Link>
                  <span className="ml-1.5 text-white/35">/</span>
                </li>
                <li className="pointer-events-none font-semibold line-clamp-1">
                  <span>{canonicalSlug}</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="mt-auto max-w-3xl space-y-3 pt-6 text-left">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-[#d7a23a]/40 bg-[#081638] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#d7a23a] shadow-sm">
                {scholarship.type}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur">
                {scholarship.country}
              </span>
            </div>

            <h1
              className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-[48px] leading-[1.15]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              {scholarship.title}
            </h1>

            <p className="max-w-xl text-xs font-medium leading-relaxed text-white/80 sm:text-sm">
              <span className="font-bold text-[#d7a23a]">Award Value:</span> {scholarship.award}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#scholarship-enquiry"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#081638] px-6 py-3 text-xs font-black text-white transition hover:bg-[#d7a23a] hover:text-[#081638]"
              >
                Check Eligibility
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#scholarship-info"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs font-black text-white transition hover:border-[#d7a23a] hover:text-[#d7a23a]"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d7a23a]/20 bg-[#081638] text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {quickFacts.map(fact => {
            const Icon = fact.icon

            return (
              <div key={fact.label} className="flex items-start gap-3 border-white/10 py-2 lg:border-r lg:last:border-r-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d7a23a]/15 text-[#d7a23a]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/45">{fact.label}</p>
                  <p className="mt-1 text-sm font-extrabold leading-snug text-white">{fact.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full grow bg-white">
        <section id="scholarship-info" className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Details Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Descriptions */}
            <div className="lg:col-span-8 space-y-8 text-left">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d7a23a]">Scholarship info</p>
                <h2 className="mt-2 text-3xl font-black text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
                  Funding details and application guidance
                </h2>
              </div>

              <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
                {accordionSections.map(section => {
                  const Icon = section.icon

                  return (
                    <details key={section.title} open={section.open} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left sm:px-6">
                        <span className="flex items-center gap-3 text-base font-black text-[#081638]">
                          <Icon className="h-5 w-5 text-[#d7a23a]" />
                          {section.title}
                        </span>
                        <span className="text-2xl font-light text-[#081638] transition group-open:rotate-45">+</span>
                      </summary>
                      <div className="px-5 pb-6 sm:px-6">
                        <p className="max-w-3xl whitespace-pre-line text-sm leading-7 text-slate-600">
                          {section.content}
                        </p>
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Key info card & inquiry form */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-[#d7a23a]/25 bg-[#eaf8fb] p-6 text-left shadow-sm">
                <h3 className="text-lg font-black text-[#081638]">Need help checking eligibility?</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Our counsellors can review your profile, documents, and country options before you apply.
                </p>
                <a
                  href="#scholarship-enquiry"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#081638] px-5 py-3 text-xs font-black text-white transition hover:bg-[#d7a23a] hover:text-[#081638]"
                >
                  Meet a counsellor
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
                <h3 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-extrabold uppercase tracking-wider text-[#081638]">
                  <Building2 className="h-4 w-4 text-[#d7a23a]" />
                  Related universities
                </h3>
                <div className="mt-4 space-y-3">
                  {(matchingUniversities.length > 0 ? matchingUniversities.slice(0, 4) : Object.values(universitiesData).slice(0, 4)).map(uni => (
                    <div key={uni.name} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-black text-[#081638]">
                        {uni.logo}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link href={`/universities/${encodeURIComponent(uni.name)}`} className="block truncate text-xs font-extrabold text-[#081638] hover:text-[#d7a23a]">
                          {uni.name}
                        </Link>
                        <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">{uni.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        <section className="bg-[#081638] py-12 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d7a23a]">Your action plan</p>
            <h2 className="mt-2 text-3xl font-black" style={{ fontFamily: 'Farro, sans-serif' }}>
              Apply with a clearer funding strategy
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                ['Step 1', 'Check your eligibility', 'Share your academic background, country choice, and budget so we can check realistic scholarship options.'],
                ['Step 2', 'Prepare your documents', 'Build a stronger document set with academic records, statements, references, and financial evidence.'],
                ['Step 3', 'Submit with support', 'Apply through the right pathway and keep follow-up clear until the decision stage.'],
              ].map(([step, title, text]) => (
                <div key={step} className="rounded-xl border border-white/15 p-6">
                  <p className="text-[11px] font-black uppercase tracking-wider text-white/50">{step}</p>
                  <h3 className="mt-3 text-base font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="scholarship-enquiry" className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d7a23a]">Free counselling</p>
              <h2 className="mt-2 text-3xl font-black text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Get FREE scholarship guidance today.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Enter your details and our team will contact you to discuss eligibility, documentation, and application options for this scholarship.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-7">
                <ScholarshipEnquiryForm scholarship={scholarship} />
              </div>

              <div className="relative min-h-90 overflow-hidden rounded-3xl bg-[#081638] lg:col-span-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(215,162,58,0.34),transparent_34%),linear-gradient(135deg,#081638_0%,#10245f_100%)]" />
                <div className="absolute bottom-0 right-2 h-[92%] w-[78%] sm:right-8">
                  <Image
                    src="/girlwith.png"
                    alt="Student ready for scholarship counselling"
                    fill
                    sizes="(max-width: 1024px) 70vw, 380px"
                    className="object-contain object-bottom"
                  />
                </div>
                <div className="relative z-10 max-w-60 p-6 text-left text-white sm:p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d7a23a]">Next Level Support</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight" style={{ fontFamily: 'Farro, sans-serif' }}>
                    Scholarship help from profile to application.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Get clear advice before you submit documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
