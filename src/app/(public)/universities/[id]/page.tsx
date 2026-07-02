import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowLeft,
  MapPin,
  Globe,
  Calendar,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Clock,
  DollarSign
} from 'lucide-react'
import { universitiesData, coursesData, scholarshipsData } from '@/lib/mockData'
import connectDb from '@/lib/db'
import UniversityModel from '@/models/University'
import mongoose from 'mongoose'
import Image from 'next/image'
import Footer from '@/components/layout/footer'
import UniversityEnquiryForm from './UniversityEnquiryForm'
import UniversityLogo from '@/components/universities/UniversityLogo'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const decodedName = decodeURIComponent(id)

  try {
    await connectDb()
    const isValidId = mongoose.Types.ObjectId.isValid(decodedName)
    const dbUniv = await (UniversityModel as any).findOne({
      $or: [...(isValidId ? [{ _id: decodedName }] : []), { name: decodedName }, { 'cmsData.slug': decodedName }],
    }).populate('countryId').lean()

    if (dbUniv) {
      const seo = dbUniv.cmsData?.seo || {}
      const title = seo.metaTitle || `${dbUniv.name} | Next Level Education`
      const description =
        seo.metaDescription ||
        dbUniv.description ||
        `Explore ${dbUniv.name} programs, admissions, location, and study abroad support.`
      const image = seo.ogImage || dbUniv.bannerImage || dbUniv.logo
      return {
        title,
        description,
        keywords: seo.metaKeywords || undefined,
        robots: seo.robots || 'index, follow',
        alternates: { canonical: seo.canonical || `/universities/${dbUniv.cmsData?.slug || encodeURIComponent(dbUniv.name)}` },
        openGraph: {
          title: seo.ogTitle || title,
          description: seo.ogDescription || description,
          images: image ? [image] : [],
        },
      }
    }
  } catch (error) {
    console.error('University metadata lookup failed:', error)
  }

  return {
    title: `${decodedName} | Next Level Education`,
    description: `Explore ${decodedName} programs, admissions, and study abroad support.`,
  }
}

export default async function UniversityDetailPage({ params }: Props) {
  const { id } = await params
  const decodedName = decodeURIComponent(id)

  let university: any = null
  let canonicalSlug = ''

  try {
    await connectDb()
    const isValidId = mongoose.Types.ObjectId.isValid(decodedName)
    const dbUniv = await (UniversityModel as any).findOne({
      $or: [
        ...(isValidId ? [{ _id: decodedName }] : []),
        { name: decodedName },
        { 'cmsData.slug': decodedName }
      ]
    }).populate('countryId').lean()

    if (dbUniv) {
      canonicalSlug = dbUniv.cmsData?.slug || ''
      university = {
        name: dbUniv.name,
        logo: dbUniv.logo || dbUniv.name.substring(0, 3).toUpperCase(),
        coverImage: dbUniv.bannerImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
        worldRank: dbUniv.globalRanking ? `#${dbUniv.globalRanking}` : '#Rank Unlisted',
        students: dbUniv.cmsData?.students || '10,000+',
        established: dbUniv.cmsData?.established || 'N/A',
        description: dbUniv.description || `Welcome to ${dbUniv.name}.`,
        country: dbUniv.countryId?.name || 'International',
        location: dbUniv.city || 'Global Campus',
        flag: dbUniv.countryId?.flagImage ? '📍' : '🏛️',
        website: dbUniv.websiteUrl || 'https://www.google.com'
      }
    }
  } catch (err) {
    console.error('Failed to load university from database:', err)
  }

  if (canonicalSlug && decodedName !== canonicalSlug) {
    permanentRedirect(`/universities/${canonicalSlug}`)
  }

  if (!university) {
    university = universitiesData[decodedName] || {
      name: decodedName,
      logo: decodedName.substring(0, 3).toUpperCase(),
      coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
      worldRank: '#Rank Unlisted',
      students: '10,000+',
      established: 'N/A',
      description: `Welcome to ${decodedName}. Providing elite academic training with cutting-edge laboratories, world-renowned faculties, and dynamic research programs.`,
      country: 'International',
      location: 'Global Campus',
      flag: '🏛️',
      website: 'https://www.google.com'
    }
  }

  // Filter courses offered by this university
  const universityCourses = coursesData.filter(
    c => c.university.toLowerCase() === university.name.toLowerCase()
  )

  // Filter scholarships matching this university's country
  const matchingScholarships = scholarshipsData.filter(
    s => s.country.toLowerCase() === university.country.toLowerCase()
  )

  const scholarshipMetadataMap: Record<string, {
    type: string;
    numAwards: string;
    grant: string;
    coverage: string[];
    hostCountries: string[];
    degreeLevels: string[];
    disciplines: string;
    locations: string;
    nationality: string;
    studyExperience: string;
    age: string;
    language: string;
    gpa: string;
    applicationStart: string;
    applyLink: string;
    benefits: string[];
  }> = {
    's1': {
      type: 'Merit based',
      numAwards: 'Multiple',
      grant: 'Full tuition fee waiver + monthly stipend & travel allowance',
      coverage: ['tuition fee reduction', 'travel allowance', 'living expenses', 'health'],
      hostCountries: ['United Kingdom', 'Canada', 'Australia', 'New Zealand'],
      degreeLevels: ['Master', 'PhD'],
      disciplines: 'Any development-focused field',
      locations: 'United Kingdom',
      nationality: 'Commonwealth countries (56 countries)',
      studyExperience: "Bachelor's degree",
      age: 'No limit (prefer 21-45)',
      language: 'English (IELTS 6.5+)',
      gpa: 'Second-class honours or above',
      applicationStart: 'August 2025',
      applyLink: 'https://cscuk.fcdo.gov.uk/apply',
      benefits: [
        'Full university tuition fees covered.',
        'Approved round-trip airfare from home country to the UK.',
        'Monthly living allowance (stipend) of £1,347 per month (or £1,652 for London campuses).',
        'Warm clothing allowance and study travel grants.'
      ]
    },
    's2': {
      type: 'Leadership & Merit based',
      numAwards: 'Multiple (1,500+ globally)',
      grant: '100% tuition fee + living allowance + flights',
      coverage: ['tuition fee reduction', 'travel allowance', 'living expenses', 'health'],
      hostCountries: ['United Kingdom'],
      degreeLevels: ['Master'],
      disciplines: 'Any approved one-year Master\'s course',
      locations: 'United Kingdom',
      nationality: '160+ Chevening-eligible countries',
      studyExperience: 'Bachelor\'s degree + 2 years work experience',
      age: 'No limit',
      language: 'English (IELTS 6.5+)',
      gpa: 'Undergraduate degree (any discipline)',
      applicationStart: 'August 2025',
      applyLink: 'https://www.chevening.org/scholarships',
      benefits: [
        'Full university tuition fees (with standard MBA caps).',
        'Monthly living stipend covering accommodation and daily food.',
        'Round-trip travel to and from the UK via approved routes.',
        'Arrival allowance, homeward departure allowance, and visa application fee.'
      ]
    },
    's3': {
      type: 'Merit based',
      numAwards: 'Multiple',
      grant: 'C$15,000 / year (C$5,000 per term)',
      coverage: ['tuition fee reduction', 'living expenses'],
      hostCountries: ['Canada'],
      degreeLevels: ['Master', 'PhD'],
      disciplines: 'Graduate studies (Master\'s or Doctoral)',
      locations: 'Ontario, Canada',
      nationality: 'Domestic and limited international students',
      studyExperience: 'Undergrad degree (minimum A- average)',
      age: 'No limit',
      language: 'English or French',
      gpa: 'A- average (80%+)',
      applicationStart: 'November 2025',
      applyLink: 'https://osap.gov.on.ca',
      benefits: [
        'C$5,000 per term, up to C$15,000 for three consecutive terms.',
        'Jointly funded by the Province of Ontario and the attending university.'
      ]
    },
    's4': {
      type: 'Merit & Location based',
      numAwards: 'Multiple',
      grant: 'A$15,000 / year',
      coverage: ['tuition fee reduction', 'living expenses', 'accommodation'],
      hostCountries: ['Australia (Regional)'],
      degreeLevels: ['Bachelor', 'Master', 'Diploma'],
      disciplines: 'Any registered CRICOS program',
      locations: 'Regional Australia',
      nationality: 'Domestic and international students',
      studyExperience: 'High school or Bachelor\'s degree',
      age: 'No limit',
      language: 'English (IELTS 6.0+)',
      gpa: 'Minimum entry requirements of selected institution',
      applicationStart: 'January 2026',
      applyLink: 'https://www.destinationaustralia.gov.au',
      benefits: [
        'Up to A$15,000 per student per year.',
        'Supports living and studying costs in designated regional communities.'
      ]
    },
  }

  return (
    <div className="min-h-screen bg-white text-[#061331] flex flex-col justify-between">

      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-[340px] sm:h-[360px] lg:h-[400px] flex flex-col justify-between bg-[#081638] pt-24 sm:pt-28 lg:pt-[110px] pb-6 sm:pb-8 lg:py-[40px]">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={university.coverImage}
            alt={university.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-linear-to-b from-[#081638]/80 via-[#081638]/82 to-[#081638]/94 lg:bg-linear-to-r lg:from-[#081638]/90 lg:via-[#081638]/68 lg:to-[#081638]/12" />

        {/* Content Container */}
        <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Breadcrumb */}
          <div className="max-w-[750px]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                <li>
                  <Link href="/" className="hover:text-[#d7a23a] transition-colors">
                    Home
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-[#d7a23a] transition-colors">
                    Universities
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none text-white font-semibold line-clamp-1">
                  <span>{university.name}</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Bottom Title & Badge */}
          <div className="mt-auto space-y-3 pt-6 text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                🏛️ Partner University
              </span>
            </div>

            <h1
              className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              {university.name}
            </h1>

            <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              <span>{university.flag}</span> {university.location}, {university.country}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full grow py-12 bg-[#fbf8fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Row: Back Navigation, Logo and CTA Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <UniversityLogo
                name={university.name}
                src={university.logo}
                className="h-12 w-12 shrink-0 rounded-xl border border-slate-200/80 text-sm shadow-xs"
              />
            </div>

            <div className="shrink-0">
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] font-bold text-xs shadow-sm transition-all cursor-pointer border border-transparent"
              >
                Visit Official Website
              </a>
            </div>
          </div>

          {/* Quick Statistics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-left">
            {[
              { label: 'World Ranking', value: university.worldRank, icon: <Award className="w-5 h-5 text-[#d7a23a]" /> },
              { label: 'Student Body', value: university.students, icon: <Users className="w-5 h-5 text-[#d7a23a]" /> },
              { label: 'Established', value: university.established, icon: <Calendar className="w-5 h-5 text-[#d7a23a]" /> },
              { label: 'Accreditation', value: university.accreditation || 'Recognized Partner', icon: <Globe className="w-5 h-5 text-[#d7a23a]" /> }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#d7a23a]/10 flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#081638] mt-0.5">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Description & Programs list */}
            <div className="lg:col-span-8 space-y-8 text-left">

              {/* About University */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-[#d7a23a]" /> About the Institution
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {university.description}
                </p>
              </div>



              {/* Scholarships Section */}
              {matchingScholarships.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-black text-[#081638] flex items-center gap-2 text-left">
                    🏆 Scholarships & Funding Opportunities
                  </h2>

                  <div className="space-y-8">
                    {matchingScholarships.slice(0, 1).map(sch => {
                      const meta = scholarshipMetadataMap[sch.id] || {
                        type: sch.type,
                        numAwards: 'Multiple',
                        grant: sch.award,
                        coverage: ['tuition fee reduction'],
                        hostCountries: [university.country],
                        degreeLevels: ['Bachelor', 'Master', 'PhD'],
                        disciplines: 'Any',
                        locations: university.country,
                        nationality: 'All nationalities',
                        studyExperience: 'High school or equivalent',
                        age: 'No limit',
                        language: 'Contact institution',
                        gpa: 'Good academic standing',
                        applicationStart: 'Check official portal',
                        applyLink: university.website,
                        benefits: ['Detailed benefits info evaluated case-by-case.']
                      }

                      return (
                        <div
                          key={sch.id}
                          className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 text-left space-y-6"
                        >
                          {/* Title & Badge */}
                          <div className="border-b border-slate-100 pb-4 space-y-2">
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#081638] text-white text-[9px] font-black uppercase tracking-wider">
                                {sch.type}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 text-[9px] font-black uppercase tracking-wider">
                                ⏳ Deadline: {sch.deadline}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-extrabold text-[#081638]">
                              Scholarships Details
                            </h3>
                          </div>

                          {/* Overview Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                            <div>
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-0.5">Scholarship Type</span>
                              <span className="text-[#081638] font-bold">{meta.type}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-0.5">Number of Awards</span>
                              <span className="text-[#081638] font-bold">{meta.numAwards}</span>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-0.5">Grant</span>
                              <span className="text-[#081638] font-bold">{meta.grant}</span>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-1">Scholarship Coverage</span>
                              <div className="flex flex-wrap gap-2 pt-0.5">
                                {meta.coverage.map((cov, index) => (
                                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-bold capitalize">
                                    ✓ {cov}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-1">Host Countries</span>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {meta.hostCountries.map((country, index) => (
                                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 text-[10px] font-bold">
                                    🌍 {country}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-1">Degree Levels</span>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {meta.degreeLevels.map((level, index) => (
                                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#081638]/5 text-[#081638] text-[10px] font-bold">
                                    🎓 {level}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-0.5">Language Required</span>
                              <span className="text-[#081638] font-bold">{meta.language}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-0.5">Academic Requirement</span>
                              <span className="text-[#081638] font-bold">{meta.gpa}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider mb-0.5">Applications Open</span>
                              <span className="text-[#081638] font-bold">{meta.applicationStart}</span>
                            </div>
                          </div>

                          {/* Description */}
                          {sch.overview && (
                            <div className="space-y-2">
                              <h4 className="font-extrabold text-[#081638] text-xs uppercase tracking-wider">Description</h4>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {sch.overview}
                              </p>
                            </div>
                          )}

                          {/* Eligibility */}
                          <div className="space-y-2 border-t border-slate-100 pt-4">
                            <h4 className="font-extrabold text-[#081638] text-xs uppercase tracking-wider">Eligibility</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                              {sch.eligibility}
                            </p>
                          </div>

                          {/* Requirements Grid */}
                          <div className="space-y-3 border-t border-slate-100 pt-4">
                            <h4 className="font-extrabold text-[#081638] text-xs uppercase tracking-wider">Scholarship Requirements</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm">
                              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                <span className="text-slate-400 font-semibold">Disciplines</span>
                                <span className="text-[#081638] font-bold">{meta.disciplines}</span>
                              </div>
                              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                <span className="text-slate-400 font-semibold">Locations</span>
                                <span className="text-[#081638] font-bold">{meta.locations}</span>
                              </div>
                              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 sm:col-span-2">
                                <span className="text-slate-400 font-semibold">Nationality</span>
                                <span className="text-[#081638] font-bold">{meta.nationality}</span>
                              </div>
                              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                <span className="text-slate-400 font-semibold">Study Experience</span>
                                <span className="text-[#081638] font-bold">{meta.studyExperience}</span>
                              </div>
                              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                <span className="text-slate-400 font-semibold">Age Limit</span>
                                <span className="text-[#081638] font-bold">{meta.age}</span>
                              </div>
                            </div>
                          </div>

                          {/* Benefits */}
                          <div className="space-y-3 border-t border-slate-100 pt-4">
                            <h4 className="font-extrabold text-[#081638] text-xs uppercase tracking-wider">Benefits</h4>
                            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-2">
                              {meta.benefits.map((benefit, index) => (
                                <li key={index} className="leading-relaxed">
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 flex flex-wrap gap-3">
                            <Link
                              href={`/courses?university=${encodeURIComponent(university.name)}`}
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] text-xs font-black tracking-wide transition-all shadow-xs"
                            >
                              View Eligible Programmes
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <a
                              href={meta.applyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#081638] text-[#081638] hover:bg-[#081638] hover:text-white text-xs font-black tracking-wide transition-all shadow-xs"
                            >
                              Official Apply Portal
                              <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {/* Available Degrees/Courses */}
              <div className="space-y-4">
                <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 text-left">
                  🎓 Available Programs ({universityCourses.length})
                </h2>

                {universityCourses.length > 0 ? (
                  <div className="grid gap-4">
                    {universityCourses.slice(0, 3).map(course => (
                      <div
                        key={course.id}
                        className="bg-white rounded-3xl border border-slate-200/60 p-6 hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 flex flex-col gap-4 text-left relative"
                      >
                        {/* Top Info */}
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-[9px] font-black text-[#d7a23a] bg-[#d7a23a]/5 px-2 py-0.5 rounded border border-[#d7a23a]/15 uppercase tracking-wider">
                            Ranked Program
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-400">
                            <span className="text-[#d7a23a]">★</span> 4.0 <span className="text-slate-300 font-semibold">(50)</span>
                          </span>
                        </div>

                        {/* Title & description */}
                        <div className="space-y-1.5">
                          <h3 className="font-extrabold text-[#081638] text-lg hover:text-[#d7a23a] transition-colors">
                            <Link href={`/courses/${course.id}`} className="hover:underline">
                              {course.title}
                            </Link>
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed max-w-3xl line-clamp-2">
                            {course.description}
                          </p>
                        </div>

                        {/* Facts: Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#081638]/5 text-[#081638]/90">
                            {course.level}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#d7a23a]/10 text-[#a37517]">
                            {course.field}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                            Full-time
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                            On-campus
                          </span>
                        </div>

                        {/* Footer stats and links */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{course.duration}</span>
                            <span className="text-[#081638] font-black text-sm sm:text-base">{course.tuitionFee}</span>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Link
                              href={`/courses/${course.id}`}
                              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] text-[11px] font-black tracking-wide transition-all shadow-xs whitespace-nowrap"
                            >
                              View Programme Information
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}

                    {universityCourses.length > 3 && (
                      <div className="pt-4 text-center">
                        <Link
                          href={`/courses?university=${encodeURIComponent(university.name)}`}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#081638] text-xs font-bold text-[#081638] hover:bg-[#081638] hover:text-white transition-all shadow-xs"
                        >
                          View More Programs ({universityCourses.length - 3} remaining)
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center shadow-xs">
                    <p className="text-sm text-slate-400 font-bold">No listed programs for this university currently.</p>
                    <p className="text-xs text-slate-400 mt-1">Our team can process custom admissions plans. Submit an inquiry to request customized curriculum parameters.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-4 sticky top-24 self-start h-fit">
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-md">
                <h3 className="font-extrabold text-[#081638] text-sm uppercase tracking-wider pb-2 border-b border-slate-100 mb-4 text-left">Connect with Institution</h3>
                <UniversityEnquiryForm university={university} />
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
