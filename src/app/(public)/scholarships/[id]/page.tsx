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
import { scholarshipsData } from '@/lib/mockData'
import Footer from '@/components/layout/footer'
import ScholarshipEnquiryForm from './ScholarshipEnquiryForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ScholarshipDetailPage({ params }: Props) {
  const { id } = await params
  const scholarship = scholarshipsData.find(s => s.id === id)

  if (!scholarship) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between pt-24">
      <main className="w-full grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-6">
            <Link 
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#081638] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Scholarships List
            </Link>
          </div>

          {/* Hero Banner Section */}
          <div className="bg-linear-to-r from-[#061331] to-[#0a2357] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden text-left text-white mb-8">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d7a23a]/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4 max-w-4xl">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#d7a23a] text-[#061331]">
                  🏆 {scholarship.type}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-white/10 text-white/90">
                  📍 {scholarship.country}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {scholarship.title}
              </h1>
              
              <p className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <DollarSign className="w-5 h-5 shrink-0" />
                <span className="text-base font-extrabold uppercase">Award:</span> {scholarship.award}
              </p>
            </div>
          </div>

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
