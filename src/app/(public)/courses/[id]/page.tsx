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
import { coursesData, scholarshipsData } from '@/lib/mockData'
import Footer from '@/components/layout/footer'
import Image from 'next/image'
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

  const matchingScholarships = scholarshipsData.filter(
    s => s.country.toLowerCase() === course.country.toLowerCase()
  )

  const universityInitials = course.university
    .split(' ')
    .filter(w => w !== 'of' && w !== 'University' && w !== 'College')
    .map(w => w[0])
    .join('')
    .substring(0, 3)

  return (
    <div className="min-h-screen bg-white text-[#061331] flex flex-col justify-between">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-[340px] sm:h-[360px] lg:h-[400px] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-[110px] pb-6 sm:pb-8 lg:py-[40px] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200"
          alt={course.title}
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
                    Courses
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none text-white font-semibold line-clamp-1">
                  <span>{course.title}</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Bottom Title & Badge */}
          <div className="mt-auto space-y-3 pt-6 text-left">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                {course.level}
              </span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/10 text-white/90 text-[10px] font-black uppercase tracking-wider shadow-sm">
                {course.field}
              </span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider shadow-sm">
                Visa success: {course.visaSuccess}
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
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
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full grow py-12 bg-[#fbf8fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Back Navigation & Institution Profile Mini-card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
            
            <div className="shrink-0 flex items-center gap-4 bg-white border border-slate-200/80 p-3.5 rounded-2xl shadow-[0_4px_15px_rgba(6,19,49,0.02)]">
              <div className="h-12 w-12 rounded-xl bg-[#d7a23a]/10 border border-[#d7a23a]/20 flex items-center justify-center text-sm font-black text-[#d7a23a] uppercase">
                {universityInitials}
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-[#d7a23a] uppercase tracking-wider">Institution Profile</p>
                <Link 
                  href={`/universities/${encodeURIComponent(course.university)}`}
                  className="text-xs font-extrabold text-[#081638] hover:text-[#d7a23a] transition-colors line-clamp-1 underline decoration-dotted"
                >
                  {course.university}
                </Link>
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

              {/* Scholarships Card */}
              {matchingScholarships.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-md text-left space-y-4">
                  <h3 className="font-extrabold text-[#081638] text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                    🏆 Funding Available
                  </h3>
                  <div className="space-y-3">
                    {matchingScholarships.map(sch => (
                      <div key={sch.id} className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:border-[#d7a23a] transition-all">
                        <Link href={`/scholarships/${sch.id}`} className="font-extrabold text-[#081638] text-xs hover:text-[#d7a23a] hover:underline line-clamp-1">
                          {sch.title}
                        </Link>
                        <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">{sch.award}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
