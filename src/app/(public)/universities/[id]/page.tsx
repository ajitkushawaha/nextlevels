import { notFound } from 'next/navigation'
import Link from 'next/link'
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
import { universitiesData, coursesData } from '@/lib/mockData'
import Footer from '@/components/layout/footer'
import UniversityEnquiryForm from './UniversityEnquiryForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function UniversityDetailPage({ params }: Props) {
  const { id } = await params
  const decodedName = decodeURIComponent(id)
  
  // Find structured university profile or create dynamic fallback
  const university = universitiesData[decodedName] || {
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

  // Filter courses offered by this university
  const universityCourses = coursesData.filter(
    c => c.university.toLowerCase() === university.name.toLowerCase()
  )

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
              <ArrowLeft className="w-4 h-4" /> Back to Catalog Search
            </Link>
          </div>

          {/* Banner with Cover Image and Logo */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 mb-8 bg-white text-left">
            <div className="h-48 sm:h-64 w-full relative">
              <img 
                src={university.coverImage} 
                alt={`${university.name} Campus`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            </div>
            
            <div className="relative px-6 pb-6 pt-0 flex flex-col md:flex-row gap-6 items-start md:items-end -mt-10 sm:-mt-16 z-10">
              <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center font-black text-2xl sm:text-3xl text-[#081638] shrink-0 uppercase">
                {university.logo}
              </div>
              
              <div className="space-y-2 text-white grow">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d7a23a] text-[#061331]">
                  🏛️ Partner University
                </span>
                <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                  {university.name}
                </h1>
                <p className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <span>{university.flag}</span> {university.location}, {university.country}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 w-full md:w-auto">
                <a 
                  href={university.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto text-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  Visit Official Website
                </a>
              </div>
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
                <p className="text-sm text-slate-600 leading-relaxed">
                  {university.description}
                </p>
              </div>

              {/* Available Degrees/Courses */}
              <div className="space-y-4">
                <h2 className="text-lg font-black text-[#081638] flex items-center gap-2 text-left">
                  🎓 Available Programs ({universityCourses.length})
                </h2>
                
                {universityCourses.length > 0 ? (
                  <div className="grid gap-4">
                    {universityCourses.map(course => (
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
                          <p className="text-slate-500 text-xs leading-relaxed max-w-3xl line-clamp-2">
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
            <div className="lg:col-span-4 lg:sticky lg:top-24">
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
