import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  BookOpen, 
  Award,
  Globe,
  GraduationCap,
  ShieldCheck,
  Zap
} from 'lucide-react'
import { coursesData } from '@/lib/mockData'
import Footer from '@/components/layout/footer'
import CourseEnquiryForm from './CourseEnquiryForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params
  const course = coursesData.find(c => c.id === id)

  if (!course) {
    notFound()
  }

  const universityInitials = course.university
    .split(' ')
    .filter(w => w !== 'of' && w !== 'University' && w !== 'College')
    .map(w => w[0])
    .join('')
    .substring(0, 3)

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
              <ArrowLeft className="w-4 h-4" /> Back to Search Catalog
            </Link>
          </div>

          {/* Main Hero Header Section */}
          <div className="bg-[#061331] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden text-left text-white mb-8">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d7a23a]/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-4 max-w-4xl">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#d7a23a] text-[#061331]">
                    {course.level}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-white/10 text-white/90">
                    {course.field}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Visa success: {course.visaSuccess}
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  {course.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="text-xl">{course.flag}</span> {course.country}
                  </span>
                  <span className="h-4 w-px bg-white/20 hidden sm:block"></span>
                  <span className="flex items-center gap-1.5 font-bold">
                    🏛️ {course.university}
                  </span>
                  <span className="h-4 w-px bg-white/20 hidden sm:block"></span>
                  <span className="flex items-center gap-1.5">
                    📍 {course.location}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-full lg:w-auto">
                <div className="h-16 w-16 rounded-xl bg-[#d7a23a]/10 border border-[#d7a23a]/20 flex items-center justify-center text-xl font-black text-[#d7a23a] uppercase">
                  {universityInitials}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#d7a23a] uppercase tracking-wider">Institution Profile</p>
                  <Link 
                    href={`/universities/${encodeURIComponent(course.university)}`}
                    className="text-sm font-extrabold hover:text-[#d7a23a] transition-colors line-clamp-1 underline decoration-dotted"
                  >
                    {course.university}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Course details */}
            <div className="lg:col-span-8 space-y-8 text-left">
              
              {/* Overview */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-[#d7a23a]" /> Program Overview
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {course.description}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  Graduating from this program unlocks premier opportunities worldwide. Our global placement cell helps students process credentials, prepare CVs, and secure post-study work authorization directly after completing the curriculum.
                </p>
              </div>

              {/* Course Structure / Modules */}
              {course.structure && course.structure.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-[#d7a23a]" /> Course Modules & Curriculum
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.structure.map((module, index) => (
                      <div key={index} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#081638]/5 text-[10px] font-black text-[#081638] shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-700 leading-relaxed">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {course.requirements && (
                <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-[#d7a23a]" /> Admission Entry Requirements
                  </h2>
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-xs font-bold text-amber-900 leading-relaxed mb-4">
                    📢 Always consult a Study Abroad consultant for standard waivers, exemptions, and country-specific qualification mappings.
                  </div>
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed whitespace-pre-line">
                    {course.requirements}
                  </p>
                </div>
              )}

              {/* Visa & Career Support */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#d7a23a]" /> Global Visa & Career Guidance
                </h2>
                <div className="space-y-4 text-xs font-semibold text-slate-600 leading-relaxed">
                  <p>
                    ✓ <strong>Fast-track Visa processing</strong>: Leveraging high visa success scores with custom sponsor portfolio audits.
                  </p>
                  <p>
                    ✓ <strong>Post-study Work Permits</strong>: Dedicated counsel on post-grad visa durations, work allowances, and pathway eligibility.
                  </p>
                  <p>
                    ✓ <strong>Mock Interview training</strong>: Dedicated coaching sessions mimicking high-commission visa interviews.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Stats Card & Assessment Inquiry Form */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Stats Card */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-md text-left space-y-4">
                <h3 className="font-extrabold text-[#081638] text-sm uppercase tracking-wider pb-2 border-b border-slate-100">Key Information</h3>
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> Duration</span>
                    <span className="text-[#081638] font-bold">{course.duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400 flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> Tuition Fees</span>
                    <span className="text-emerald-600 font-black">{course.tuitionFee}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Location</span>
                    <span className="text-[#081638] font-bold">{course.location}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Intakes</span>
                    <span className="text-[#081638] font-bold">{course.intakes.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Enquiry Form Component */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-md">
                <h3 className="font-extrabold text-[#081638] text-sm uppercase tracking-wider pb-2 border-b border-slate-100 mb-4 text-left">Request Assessment</h3>
                <CourseEnquiryForm course={course} />
              </div>

            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
