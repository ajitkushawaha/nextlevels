import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Calendar,
  Award,
  Globe,
  BookOpen,
  Send,
  HelpCircle,
  FileCheck
} from 'lucide-react'
import { scholarshipsData, universitiesData } from '@/lib/mockData'
import connectDb from '@/lib/db'
import ScholarshipModel from '@/models/Scholarship'
import mongoose from 'mongoose'
import Image from 'next/image'
import Footer from '@/components/layout/footer'
import ScholarshipEnquiryForm from './ScholarshipEnquiryForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ScholarshipDetailPage({ params }: Props) {
  const { id } = await params
  const decodedId = decodeURIComponent(id)

  let scholarship: any = null

  try {
    await connectDb()
    const isValidId = mongoose.Types.ObjectId.isValid(decodedId)
    const dbSchol = await (ScholarshipModel as any).findOne({
      $or: [
        ...(isValidId ? [{ _id: decodedId }] : []),
        { title: decodedId }
      ]
    }).populate('countryId').populate('universityId').populate('programId').lean()

    if (dbSchol) {
      scholarship = {
        id: dbSchol._id.toString(),
        title: dbSchol.title,
        type: 'Merit based',
        country: dbSchol.countryId?.name || 'Global',
        award: dbSchol.awardAmount,
        deadline: 'December 2026',
        overview: dbSchol.description || 'Welcome to this scholarship study guide.',
        eligibility: dbSchol.eligibilityCriteria || 'No eligibility criteria listed.',
        howToApply: 'Apply via our advisor panel or directly at partner institutions.'
      }
    }
  } catch (err) {
    console.error('Failed to load scholarship from database:', err)
  }

  if (!scholarship) {
    scholarship = scholarshipsData.find(s => s.id === decodedId)
  }

  if (!scholarship) {
    notFound()
  }

  const matchingUniversities = Object.values(universitiesData).filter(
    u => u.country.toLowerCase() === scholarship.country.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-white text-[#061331] flex flex-col justify-between">

      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-[340px] sm:h-[360px] lg:h-[400px] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-[110px] pb-6 sm:pb-8 lg:py-[40px] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">

        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200"
          alt={scholarship.title}
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />

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
                    Scholarships
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none text-white font-semibold line-clamp-1">
                  <span>{scholarship.title}</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Bottom Title & Badge */}
          <div className="mt-auto space-y-3 pt-6 text-left">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                🏆 {scholarship.type}
              </span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/10 text-white/90 text-[10px] font-black uppercase tracking-wider shadow-sm">
                📍 {scholarship.country}
              </span>
            </div>

            <h1
              className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              {scholarship.title}
            </h1>

            <p className="text-emerald-400 text-xs sm:text-sm max-w-xl font-bold flex items-center gap-1">
              <span className="text-white/80 font-medium">Award Value:</span> {scholarship.award}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full grow py-12 bg-[#fbf8fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Details Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Descriptions */}
            <div className="lg:col-span-8 space-y-8 text-left">

              {/* Overview */}
              {scholarship.overview && (
                <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-[#d7a23a]" /> Scholarship Overview
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {scholarship.overview}
                  </p>
                </div>
              )}

              {/* Eligibility */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[#d7a23a]" /> Eligibility Criteria
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {scholarship.eligibility}
                </p>
              </div>

              {/* How to Apply */}
              {scholarship.howToApply && (
                <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                    <FileCheck className="w-5 h-5 text-[#d7a23a]" /> Application Guidelines & Procedures
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {scholarship.howToApply}
                  </p>
                </div>
              )}

              {/* General Advising Support */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-[#d7a23a]" /> Need Assistance?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Securing international funding is highly competitive. Our study advisors specialize in reviewing student portfolios, matching qualifications, and optimizing statements of purpose to give you the highest chance of receiving global scholarships.
                </p>
              </div>

            </div>

            {/* Right Column: Key info card & inquiry form */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">

              {/* Summary Stats */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-md text-left space-y-4">
                <h3 className="font-extrabold text-[#081638] text-sm uppercase tracking-wider pb-2 border-b border-slate-100">Quick Facts</h3>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400 flex items-center gap-1.5"><Globe className="w-4 h-4" /> Country</span>
                    <span className="text-[#081638] font-bold">{scholarship.country}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Deadline</span>
                    <span className="text-amber-600 font-extrabold">{scholarship.deadline}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400 flex items-center gap-1.5"><Award className="w-4 h-4" /> Funding Type</span>
                    <span className="text-[#081638] font-bold">{scholarship.type}</span>
                  </div>
                </div>
              </div>

              {/* Partner Universities Card */}
              {matchingUniversities.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-md text-left space-y-4">
                  <h3 className="font-extrabold text-[#081638] text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                    🏛️ Partner Universities
                  </h3>
                  <div className="space-y-3">
                    {matchingUniversities.map(uni => (
                      <div key={uni.name} className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#d7a23a] transition-all">
                        <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-[#081638] shrink-0">
                          {uni.logo}
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link href={`/universities/${encodeURIComponent(uni.name)}`} className="font-extrabold text-[#081638] text-xs hover:text-[#d7a23a] hover:underline block truncate">
                            {uni.name}
                          </Link>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">{uni.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enquiry Form */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-md">
                <h3 className="font-extrabold text-[#081638] text-sm uppercase tracking-wider pb-2 border-b border-slate-100 mb-4 text-left">Inquire for Application</h3>
                <ScholarshipEnquiryForm scholarship={scholarship} />
              </div>

            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
