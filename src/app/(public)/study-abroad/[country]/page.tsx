import Image from 'next/image'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  GraduationCap,
  HelpCircle,
  Home,
  Landmark,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import FreeCounsellingForm from '@/components/contact/FreeCounsellingForm'
import Footer from '@/components/layout/footer'
import { coursesData, universitiesData } from '@/lib/mockData'
import { slugify } from '@/lib/slug'
import {
  getStudyDestinationSlugs,
  getStudyDestination,
  normalizeStudyDestinationSlug,
  getStudyDestinationCanonicalSlug,
  type StudyDestination,
} from '@/lib/studyDestinations'
import connectDB from '@/lib/db'
import CountryModel from '@/models/Country'
import UniversityModel from '@/models/University'
import ProgramModel from '@/models/Program'

type Params = {
  params: Promise<{
    country: string
  }>
}

type TableRow = Record<string, string>

export function generateStaticParams() {
  return getStudyDestinationSlugs().map(slug => ({
    country: slug,
  }))
}

function getCountryDisplayName(countryName: string) {
  const nameLower = countryName.toLowerCase()
  if (nameLower === 'united kingdom' || nameLower === 'uk') {
    return `the ${countryName}`
  }
  return countryName
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { country } = await params
  const rawCountry = country.trim().toLowerCase()
  const normalizedCountry = normalizeStudyDestinationSlug(country)
  
  try {
    await connectDB()
    const fallbackDestination = getStudyDestination(normalizedCountry)
    const dbCountry =
      await (CountryModel as any).findOne({ $or: [{ 'cmsData.slug': rawCountry }, { code: rawCountry }] }).lean() ||
      await (CountryModel as any).findOne({ $or: [{ 'cmsData.slug': normalizedCountry }, { code: normalizedCountry }] }).lean() ||
      (fallbackDestination
        ? await (CountryModel as any).findOne({ name: fallbackDestination.country }).lean()
        : null)
    if (dbCountry) {
      const seo = dbCountry.cmsData?.seo || {}
      const title = seo.metaTitle || `Study in ${dbCountry.name} | Next Level Education`
      const description = seo.metaDescription || dbCountry.intro || dbCountry.description || ''
      return {
        title,
        description,
        keywords: seo.metaKeywords || undefined,
        robots: seo.robots || 'index, follow',
        alternates: { canonical: seo.canonical || `/study-abroad/${dbCountry.cmsData?.slug || dbCountry.code}` },
        openGraph: {
          title: seo.ogTitle || title,
          description: seo.ogDescription || description,
          images: seo.ogImage || dbCountry.heroImage || dbCountry.flagImage ? [seo.ogImage || dbCountry.heroImage || dbCountry.flagImage] : [],
        },
      }
    }
  } catch (err) {
    console.error('Metadata DB lookup failed:', err)
  }

  const destination = getStudyDestination(country)
  if (!destination) return { title: 'Study Destination Not Found' }

  return {
    title: `Study in ${destination.country} | Next Level Education`,
    description: destination.intro,
    alternates: { canonical: `/study-abroad/${destination.slug}` },
  }
}

function getCountryUniversities(destination: StudyDestination) {
  return Object.values(universitiesData)
    .filter((university: any) => university.country === destination.country)
    .slice(0, 8)
}

function getCountryCourses(destination: StudyDestination) {
  return coursesData
    .filter(course => course.country === destination.country)
    .slice(0, 4)
}

function hasTableRows(rows?: TableRow[]) {
  return Array.isArray(rows) && rows.some(row =>
    Object.values(row).some(value => String(value || '').trim().length > 0)
  )
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="max-w-full scroll-mt-32 break-words text-lg font-extrabold leading-tight text-[#081638] sm:text-2xl"
      style={{ fontFamily: 'Farro, sans-serif' }}
    >
      {children}
    </h2>
  )
}

function DataTable({
  columns,
  rows,
}: {
  columns: Array<{ key: string; label: string }>
  rows: TableRow[]
}) {
  return (
    <div className="my-5 max-w-full overflow-x-auto overscroll-x-contain border border-slate-200 bg-white [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="min-w-full">
        <table className="w-full min-w-full table-fixed border-collapse text-left text-[13px]">
          <thead className="bg-slate-50 text-[#081638]">
            <tr>
              {columns.map(column => (
                <th key={column.key} className="border border-slate-200 px-3 py-3 font-bold sm:px-4">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {columns.map(column => (
                  <td
                    key={column.key}
                    className="break-words border border-slate-200 px-3 py-3 leading-6 text-slate-600 sm:px-4"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ArticleBlock({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-b border-slate-200 py-7 last:border-b-0">
      <H2 id={id}>{title}</H2>
      <div className="mt-3 max-w-full break-words text-[14px] leading-7 text-slate-600">
        {children}
      </div>
    </section>
  )
}

export default async function StudyDestinationPage({ params }: Params) {
  const { country } = await params
  const rawCountry = country.trim().toLowerCase()
  const normalizedCountry = normalizeStudyDestinationSlug(country)
  
  await connectDB()
  const fallbackDestination = getStudyDestination(normalizedCountry)
  const dbCountry =
    await (CountryModel as any).findOne({ $or: [{ 'cmsData.slug': rawCountry }, { code: rawCountry }] }).lean() ||
    await (CountryModel as any).findOne({ $or: [{ 'cmsData.slug': normalizedCountry }, { code: normalizedCountry }] }).lean() ||
    (fallbackDestination
      ? await (CountryModel as any).findOne({ name: fallbackDestination.country }).lean()
      : null)
  let destination: any = null
  let universities: any[] = []
  let courses: any[] = []

  if (dbCountry) {
    destination = {
      slug: dbCountry.cmsData?.slug || dbCountry.code,
      country: dbCountry.name,
      shortName: dbCountry.name,
      flag: dbCountry.flagImage,
      heroImage: dbCountry.heroImage || dbCountry.cmsData?.heroImage || dbCountry.flagImage,
      intro: dbCountry.intro || dbCountry.description || '',
      highlights: dbCountry.highlights || [],
      visa: dbCountry.visa || { name: '', who: '', whenToApply: '', arrival: '' },
      costs: dbCountry.costs || [],
      scholarships: dbCountry.scholarships || [],
      intakes: dbCountry.intakes || [],
      topCourses: dbCountry.topCourses || [],
      jobProspects: dbCountry.jobProspects || [],
      livingCosts: dbCountry.livingCosts || [],
      faqs: dbCountry.faqs || [],
      cmsData: dbCountry.cmsData || {},
      faqTitle: dbCountry.cmsData?.faqTitle || 'Ask Next Level Education',
      faqDescription:
        dbCountry.cmsData?.faqDescription ||
        `Key questions students ask before applying to ${dbCountry.name}.`,
    }

    // Load associated universities
    const dbUniversities = await (UniversityModel as any).find({ countryId: dbCountry._id }).lean()
    universities = dbUniversities.map((u: any) => ({
      name: u.name,
      slug: u.cmsData?.slug,
      logo: u.logo,
      coverImage: u.bannerImage || dbCountry.heroImage || dbCountry.flagImage,
      location: u.city,
      country: dbCountry.name,
      flag: dbCountry.flagImage,
    }))

    // Load first 4 courses for universities in this country
    const dbUnivIds = dbUniversities.map((u: any) => u._id)
    const dbCourses = await (ProgramModel as any).find({ universityId: { $in: dbUnivIds } }).populate('universityId').limit(4).lean()
    courses = dbCourses.map((c: any) => ({
      id: c._id.toString(),
      slug: c.cmsData?.slug,
      title: c.title,
      level: c.degreeLevel,
      university: c.universityId?.name || '',
    }))
  } else {
    const mockDest = getStudyDestination(country)
    if (!mockDest) notFound()
    destination = mockDest
    universities = getCountryUniversities(destination)
    courses = getCountryCourses(destination)
  }

  const canonicalCountrySlug = getStudyDestinationCanonicalSlug(destination.slug || normalizedCountry)
  if (rawCountry !== canonicalCountrySlug) {
    permanentRedirect(`/study-abroad/${canonicalCountrySlug}`)
  }

  const heroTiles = [
    destination.heroImage,
    universities[0]?.coverImage || destination.heroImage,
    universities[1]?.coverImage || destination.heroImage,
  ]
  const hasTuitionCosts = hasTableRows(destination.costs)
  const hasLivingCosts = hasTableRows(destination.livingCosts)
  const shouldShowCostSection = hasTuitionCosts || hasLivingCosts
  const navLinks = [
    ['Why study', 'why-study'],
    ['Requirements', 'requirements'],
    ...(shouldShowCostSection ? [['Cost', 'cost']] : []),
    ['Scholarships', 'scholarships'],
    ['Universities', 'universities'],
    ['Jobs', 'jobs'],
    ['FAQs', 'faqs'],
  ]
  const articleCards = [
    {
      title: `Guide to studying in ${getCountryDisplayName(destination.country)}`,
      image: destination.heroImage,
    },
    {
      title: `${destination.country} student visa checklist`,
      image: universities[0]?.coverImage || destination.heroImage,
    },
    {
      title: `Best courses for Sri Lankan students`,
      image: universities[1]?.coverImage || destination.heroImage,
    },
    {
      title: `How to apply for ${destination.shortName}`,
      image: universities[2]?.coverImage || destination.heroImage,
    },
  ]
  const legacyMarketingBanner = destination.cmsData?.marketingBanner
  const marketingBanners = (
    Array.isArray(destination.cmsData?.marketingBanners)
      ? destination.cmsData.marketingBanners
      : legacyMarketingBanner?.image
        ? [{ ...legacyMarketingBanner, enabled: true }]
        : []
  )
    .filter((banner: any) => banner?.enabled !== false && typeof banner?.image === 'string' && banner.image.trim())
    .slice(0, 4)
  const hasMarketingBanners = marketingBanners.length > 0

  return (
    <div className="min-h-screen bg-white text-[#081638]">
      <main >
        <section className="bg-[#E9EFF6] pt-24">

          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:w-1/2">
              <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <Link href="/" className="hover:text-[#d7a23a]">Home</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span>Study abroad</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span>{destination.country}</span>
              </nav>
              <h1 className="text-3xl font-extrabold text-[#061331] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                Study in {getCountryDisplayName(destination.country)}
              </h1>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                Looking for overseas education information? Explore everything about studying in {getCountryDisplayName(destination.country)}, including visa, admission, costs, scholarships and top universities.
              </p>
              <Link
                href="/contact-us"
                className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md bg-[#d7a23a] px-5 py-2 text-xs font-bold text-[#061331] transition hover:bg-[#061331] hover:text-white"
              >
                Enquire now
              </Link>
            </div>
            <div className="relative mx-auto grid w-4/5 items-center sm:w-full lg:mx-0 lg:w-1/3">
              <div
                role="img"
                aria-label={`${destination.country} landmark`}
                className="relative  h-40 overflow-hidden bg-[#E9EFF6] bg-contain bg-no-repeat bg-center bg-blend-multiply sm:h-44"
                style={{ backgroundImage: `url(${heroTiles[0]})` }}
              >

              </div>
            </div>
            {/* <Image
                  src="/countries/lg.png"
                  alt=""
                  width={400}
                  height={200}
                  className="absolute right-0 top-20 z-10 w-28 object-contain sm:w-40"
                /> */}
          </div>
        </section>

        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-5 py-3 text-[12px] font-semibold text-slate-500 sm:px-8">
            {navLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="shrink-0 hover:text-[#d7a23a]">
                {label}
              </a>
            ))}
          </div>
        </div>

        <section className="bg-white py-9">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,920px)_400px]">
            <article className="min-w-0">
              <ArticleBlock id="why-study" title={`Why study in ${getCountryDisplayName(destination.country)}?`}>
                <p>{destination.intro}</p>
                <ul className="mt-4 space-y-2">
                  {destination.highlights.map(highlight => (
                    <li key={highlight} className="flex gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#d7a23a]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </ArticleBlock>

              <ArticleBlock id="requirements" title={`Student visa requirements for ${getCountryDisplayName(destination.country)}`}>
                <p>
                  A complete student visa file usually includes a valid offer, passport, financial evidence, academic documents, English test evidence where required, and country-specific supporting documents.
                </p>
                <DataTable
                  columns={[
                    { key: 'item', label: 'Requirement' },
                    { key: 'detail', label: 'Details' },
                  ]}
                  rows={[
                    { item: 'Visa type', detail: destination.visa.name },
                    { item: 'Who can apply', detail: destination.visa.who },
                    { item: 'When to apply', detail: destination.visa.whenToApply },
                    { item: 'Arrival guidance', detail: destination.visa.arrival },
                  ]}
                />
              </ArticleBlock>

              <ArticleBlock id="intakes" title={`Intakes available in ${getCountryDisplayName(destination.country)}`}>
                <p>
                  Plan your intake based on course availability, offer deadlines, financial documents, English test dates, and visa processing timelines.
                </p>
                <DataTable
                  columns={[
                    { key: 'name', label: 'Intake' },
                    { key: 'duration', label: 'Timeline' },
                  ]}
                  rows={destination.intakes}
                />
              </ArticleBlock>

              <ArticleBlock id="courses" title={`Popular courses to study in ${getCountryDisplayName(destination.country)}`}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {destination.topCourses.map(course => (
                    <div key={course} className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] font-semibold text-[#081638]">
                      <BookOpenCheck className="h-4 w-4 text-[#d7a23a]" />
                      {course}
                    </div>
                  ))}
                </div>
                {courses.length > 0 ? (
                  <div className="mt-5 grid gap-3">
                    {courses.map(course => (
                      <Link key={course.id} href={`/courses/${(course as any).slug || slugify(course.title)}`} className="block border border-slate-200 p-4 transition hover:border-[#d7a23a]">
                        <p className="text-[11px] font-bold uppercase text-slate-400">{course.level}</p>
                        <h3 className="mt-1 text-sm font-extrabold text-[#081638]">{course.title}</h3>
                        <p className="mt-1 text-xs font-semibold text-slate-500">{course.university}</p>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </ArticleBlock>

              {shouldShowCostSection ? (
                <ArticleBlock id="cost" title={`Cost of studying in ${getCountryDisplayName(destination.country)}`}>
                  <p>
                    Tuition and living costs vary by institution, city, study level and lifestyle. The table below gives a practical planning range.
                  </p>
                  {hasTuitionCosts ? (
                    <DataTable
                      columns={[
                        { key: 'program', label: 'Program' },
                        { key: 'fee', label: 'Indicative tuition fee' },
                      ]}
                      rows={destination.costs}
                    />
                  ) : null}
                  {hasLivingCosts ? (
                    <DataTable
                      columns={[
                        { key: 'item', label: 'Living cost item' },
                        { key: 'cost', label: 'Estimated cost' },
                      ]}
                      rows={destination.livingCosts}
                    />
                  ) : null}
                </ArticleBlock>
              ) : null}

              <ArticleBlock id="scholarships" title={`Scholarships to study in ${getCountryDisplayName(destination.country)}`}>
                <p>
                  Scholarships depend on your academic record, course, institution and intake. We help you shortlist realistic options and prepare strong applications.
                </p>
                <DataTable
                  columns={[
                    { key: 'name', label: 'Scholarship' },
                    { key: 'description', label: 'Overview' },
                  ]}
                  rows={destination.scholarships}
                />
              </ArticleBlock>

              <ArticleBlock id="jobs" title={`Job prospects in ${getCountryDisplayName(destination.country)}`}>
                <p>
                  Career outcomes depend on your course, work rights, experience, city and employer demand. These sectors are commonly explored by international students.
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {destination.jobProspects.map(job => (
                    <div key={job} className="flex items-center gap-2 border border-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-600">
                      <BriefcaseBusiness className="h-4 w-4 text-[#d7a23a]" />
                      {job}
                    </div>
                  ))}
                </div>
              </ArticleBlock>
            </article>

            <aside
              id="request-assessment"
              className={`hidden scroll-mt-28 self-start lg:block ${hasMarketingBanners ? '' : 'sticky top-24'}`}
            >
              <div className={hasMarketingBanners ? 'space-y-4' : 'min-h-[calc(100vh-8rem)]'}>
                <div className={`${hasMarketingBanners ? 'sticky top-24' : ''} rounded-md border border-[#d7a23a]/20 bg-white p-4 shadow-sm`}>
                  <FreeCounsellingForm
                    compact
                    showImage={false}
                    heading="Request Assessment"
                    description={`Share your details and our ${destination.country} advisor will review your study options.`}
                    submitLabel="Request Assessment"
                    sourcePage={`Study in ${destination.country}`}
                    sourceType="country-assessment"
                    sourceCountry={destination.country}
                  />
                </div>
                {hasMarketingBanners ? (
                  <div className="space-y-3">
                    {marketingBanners.map((banner: any, index: number) => (
                      <Link
                        key={`${banner.image}-${index}`}
                        href={typeof banner.href === 'string' && banner.href.trim() ? banner.href : '/contact-us'}
                        className="relative block aspect-video overflow-hidden rounded-md border border-[#d7a23a]/20 bg-[#fffcf0] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <Image
                          src={banner.image}
                          alt={
                            typeof banner.alt === 'string' && banner.alt.trim()
                              ? banner.alt
                              : `${destination.country} image CTA ${index + 1}`
                          }
                          fill
                          priority={index === 0}
                          className="object-cover object-center"
                          sizes="400px"
                        />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-slate-50 py-9">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-4 rounded-md bg-white p-6 md:grid-cols-[1fr_220px] md:items-center">
              <div>
                <h2 className="text-xl font-extrabold text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
                  Why Next Level Education?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Get free expert guidance on course selection, application documents, visa preparation and scholarship options.
                </p>
              </div>
              <Link href="#request-assessment" className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#d7a23a] px-5 py-2 text-xs font-bold text-[#061331] transition hover:bg-[#061331] hover:text-white">
                Talk to an advisor
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-8">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-xl font-extrabold text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
              Explore in {getCountryDisplayName(destination.country)}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Student visa', 'Visa process and document checklist', ShieldCheck],
                ['Courses', 'Find programs by field and level', GraduationCap],
                ['Intakes', 'Plan your application timeline', CalendarDays],
                ['Living costs', 'Budget your student life', CircleDollarSign],
              ].map(([title, text, Icon]) => {
                const TypedIcon = Icon as typeof ShieldCheck
                return (
                  <Link key={title as string} href="/contact-us" className="rounded-md bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <TypedIcon className="mb-4 h-6 w-6 text-[#d7a23a]" />
                    <h3 className="text-sm font-extrabold text-[#081638]">{title as string}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{text as string}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section id="universities" className="bg-white py-9">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
                  Top universities in {getCountryDisplayName(destination.country)}
                </h2>
                <p className="mt-2 text-sm text-slate-500">Compare popular partner institutions and shortlist based on your profile.</p>
              </div>
              <Link href="/courses" className="hidden text-xs font-bold text-[#d7a23a] sm:inline-flex">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {universities.slice(0, 4).map((university: any, index) => (
                <Link key={university.name} href={`/universities/${university.slug || encodeURIComponent(university.name)}`} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#d7a23a]">
                  <div className="relative h-24 overflow-hidden rounded bg-slate-50">
                    <Image
                      src={university.coverImage}
                      alt={`${university.name} campus`}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? undefined : 'lazy'}
                      className="object-cover"
                      sizes="260px"
                    />
                  </div>
                  <div className="mt-3">
                    <div>
                      <h3 className="line-clamp-2 text-sm font-extrabold text-[#081638]">{university.name}</h3>
                      <p className="mt-1 text-[11px] text-slate-500">{university.location}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] font-bold text-[#d7a23a]">View details</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-9">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Find your home away from home', 'Get guidance on accommodation and arrival planning.', Home],
                ['Send funds securely with trusted transfer options', 'Plan tuition and living cost payments before deadlines.', Landmark],
                ['Cost of living calculator', 'Estimate your monthly expenses before choosing your city.', CircleDollarSign],
                ['Get reliable advice', 'Book a free session with a destination specialist.', HelpCircle],
              ].map(([title, text, Icon]) => {
                const TypedIcon = Icon as typeof Home
                return (
                  <div key={title as string} className="rounded-md bg-white p-5 shadow-sm">
                    <TypedIcon className="mb-4 h-6 w-6 text-[#d7a23a]" />
                    <h3 className="text-sm font-extrabold text-[#081638]">{title as string}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{text as string}</p>
                    <Link href="/contact-us" className="mt-4 inline-flex min-h-9 items-center justify-center rounded-md bg-[#d7a23a] px-4 py-2 text-xs font-bold text-[#061331] transition hover:bg-[#061331] hover:text-white">
                      Get started
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-9">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-xl font-extrabold text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
              Articles about {getCountryDisplayName(destination.country)}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {articleCards.map(article => (
                <Link key={article.title} href="/blog" className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
                  <div className="relative h-28">
                    <Image src={article.image} alt={article.title} fill className="object-cover" sizes="280px" />
                  </div>
                  <h3 className="p-4 text-xs font-extrabold leading-5 text-[#081638]">{article.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="faqs" className="bg-[#061331] py-10 text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-xl font-extrabold" style={{ fontFamily: 'Farro, sans-serif' }}>
              {destination.faqTitle || 'Ask Next Level Education Education'}
            </h2>
            <p className="mt-2 text-sm text-white/65">
              {destination.faqDescription ||
                `Key questions students ask before applying to ${getCountryDisplayName(destination.country)}.`}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destination.faqs.map((faq, index) => (
                <div key={`${faq.question}-${index}`} className="min-h-44 rounded-md bg-white p-4 text-[#081638]">
                  <h3 className="text-xs font-extrabold leading-5">{faq.question}</h3>
                  <p className="mt-2 line-clamp-3 text-[11px] leading-5 text-slate-500">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#E9EFF6] py-10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="rounded-md bg-white/40 p-3 sm:p-4">
              <FreeCounsellingForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
