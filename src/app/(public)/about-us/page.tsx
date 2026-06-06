import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/layout/footer'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import {
  Eye,
  Rocket,
  Award,
  Users,
  UserCheck,
  Heart,
  Shield,
  ArrowRight,
  GraduationCap,
  Calendar,
  Building
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/about-us')
  return generateSEOMetadata(seoData)
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-[#061331] font-sans flex flex-col justify-between">

      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-[340px] sm:h-[360px] lg:h-[400px] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-[110px] pb-6 sm:pb-8 lg:py-[40px] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200"
          alt="About Us Banner"
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />
        <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[750px]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                <li>
                  <Link href="/" className="hover:text-[#d7a23a] transition-colors">Home</Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none text-white font-semibold">
                  <span>About Us</span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="mt-auto space-y-3 pt-6">
            <div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                Rooted in Jaffna, Focused Globally
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15] font-serif">
              About Next Level
            </h1>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              We believe that global education transforms lives, which is why we provide counseling and application support completely 100% free of charge.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <main className="grow pb-10">

        {/* Story Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Column: Text & Stats */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#d7a23a] block">
                  ABOUT NEXT LEVEL EDUCATION
                </span>

                <div className="relative inline-block">
                  <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#061331] leading-[1.15] tracking-tight">
                    Our Story &amp; Vision
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-28 h-1.5 bg-[#d7a23a] rounded-full"></div>
                </div>
              </div>

              <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                Founded with a vision to simplify international student placement, Next Level Education (Pvt) Ltd is a premier study abroad agency headquartered in Jaffna, Sri Lanka. We believe that global education transforms lives, which is why we provide our counseling and application support completely 100% free of charge for all students.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Visa Success Card */}
                <div className="flex items-center gap-4 p-5 bg-[#fcfbfa] border border-[#f3eee2] rounded-2xl shadow-[0_4px_20px_rgba(6,19,49,0.02)]">
                  <div className="w-12 h-12 rounded-xl bg-[#d7a23a]/10 flex items-center justify-center text-[#d7a23a] shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-3xl font-bold text-[#061331] leading-none">98%</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 block">
                      VISA SUCCESS
                    </span>
                  </div>
                </div>

                {/* Students Placed Card */}
                <div className="flex items-center gap-4 p-5 bg-[#fcfbfa] border border-[#f3eee2] rounded-2xl shadow-[0_4px_20px_rgba(6,19,49,0.02)]">
                  <div className="w-12 h-12 rounded-xl bg-[#d7a23a]/10 flex items-center justify-center text-[#d7a23a] shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-3xl font-bold text-[#061331] leading-none">1000+</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 block">
                      STUDENTS PLACED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Image Container */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              {/* Decorative Dots Pattern */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[radial-gradient(#d7a23a_2px,transparent_2px)] bg-size-[12px_12px] opacity-40"></div>

              {/* Image Frame with Offset Outline */}
              <div className="relative w-full max-w-[520px] aspect-16/10 sm:aspect-[1.5] rounded-tl-[140px] rounded-br-[140px] rounded-tr-[40px] rounded-bl-[40px] border border-[#d7a23a]/30 shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 border-2 border-[#d7a23a]/30 rounded-tl-[140px] rounded-br-[140px] rounded-tr-[40px] rounded-bl-[40px] transform translate-x-4.5 translate-y-4.5 -z-10 transition-transform duration-300"></div>
                <div className="relative w-full h-full overflow-hidden rounded-tl-[136px] rounded-br-[136px] rounded-tr-[36px] rounded-bl-[36px]">
                  <Image
                    alt="Education Consultancy Consultation"
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 520px"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Vision & Mission Section (Light Container Banner) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 ">
          <div className="bg-[#fdfbf7] border border-[#f5efe4] rounded-[32px] p-8 md:p-12 shadow-[0_10px_35px_rgba(6,19,49,0.02)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative">

              {/* Vision */}
              <div className="flex flex-col md:flex-row gap-6 text-left items-start">
                <div className="w-14 h-14 rounded-full bg-[#061331] flex items-center justify-center text-[#d7a23a] shrink-0 shadow-lg shadow-[#061331]/10">
                  <Eye className="w-6 h-6 stroke-2" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-serif text-[#061331]">Our Vision</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    To be a trusted leader in education consultancy, empowering students to achieve their academic goals and transform their futures through personalized guidance for studying abroad.
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
                  <h3 className="text-xl font-bold font-serif text-[#061331]">Our Mission</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    Building international pathways since 2020 by providing ethical, transparent, and comprehensive support that removes financial barriers to global education excellence.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Core Pillars Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-10">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold font-serif text-[#061331]">
              Our Core Pillars
            </h2>
            <div className="h-1 w-16 bg-[#d7a23a] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Student-First Approach */}
            <div className="flex gap-5 p-6 bg-white border border-[#f2ece2]/80 rounded-[24px] shadow-[0_8px_30px_rgba(6,19,49,0.015)] hover:shadow-[0_8px_30px_rgba(6,19,49,0.03)] hover:-translate-y-1 transition-all duration-300 text-left items-start">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#061331] border border-slate-100 shrink-0 shadow-xs">
                <UserCheck className="w-6 h-6 stroke-2" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#061331]">
                  Student-First Approach
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  Every student is unique. We tailor our academic and visa guidance to match your specific backgrounds and goals.
                </p>
              </div>
            </div>

            {/* 100% Free Services */}
            <div className="flex gap-5 p-6 bg-white border border-[#f2ece2]/80 rounded-[24px] shadow-[0_8px_30px_rgba(6,19,49,0.015)] hover:shadow-[0_8px_30px_rgba(6,19,49,0.03)] hover:-translate-y-1 transition-all duration-300 text-left items-start">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#061331] border border-slate-100 shrink-0 shadow-xs">
                <Heart className="w-6 h-6 stroke-2" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#061331]">
                  100% Free Services
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  We never charge students for counseling, applications, or visa support. Our operations are fully funded by partner universities.
                </p>
              </div>
            </div>

            {/* Ethical & Transparent */}
            <div className="flex gap-5 p-6 bg-white border border-[#f2ece2]/80 rounded-[24px] shadow-[0_8px_30px_rgba(6,19,49,0.015)] hover:shadow-[0_8px_30px_rgba(6,19,49,0.03)] hover:-translate-y-1 transition-all duration-300 text-left items-start">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#061331] border border-slate-100 shrink-0 shadow-xs">
                <Shield className="w-6 h-6 stroke-2" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#061331]">
                  Ethical &amp; Transparent
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  We maintain strict compliance and integrity in our applications, ensuring authentic documentation and high credibility.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Banner Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-r from-[#02133f] via-[#052062] to-[#0a3297] text-white rounded-[24px] p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(215,162,58,0.1),transparent_40%)] pointer-events-none"></div>

            {/* Left Content Column */}
            <div className="w-full lg:w-1/2 space-y-6 text-left relative z-10">
              {/* Graduation Cap Icon in Gold */}
              <div className="text-[#d7a23a] flex items-center gap-2">
                <GraduationCap className="w-8 h-8 stroke-[1.5]" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Start Journey</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-[1.15] tracking-tight">
                Ready to Start Your<br />
                <span className="text-[#d7a23a]">Study Abroad</span> Journey?
              </h2>

              <p className="text-[#bac6ec] text-sm sm:text-base leading-relaxed max-w-lg">
                Join thousands of successful students who have achieved their dreams with <span className="text-white font-semibold">Next Level Education.</span> Your future starts with a single conversation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact-us"
                  className="group flex items-center justify-between gap-6 px-6 py-4 border border-amber-400  text-white font-bold rounded-2xl shadow-[0_4px_25px_rgba(135,57,229,0.35)] hover:scale-[1.02] transition-all text-sm w-full sm:w-auto"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white/90" />
                    <span>Book a Free Consultation</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#8739E5] transition-transform group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                <Link
                  href="/services"
                  className="group flex items-center justify-between gap-6 px-6 py-4 border border-white/20 bg-[#061331]/40 text-white font-bold rounded-2xl hover:bg-[#061331]/60 transition-all text-sm w-full sm:w-auto"
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-white/90" />
                    <span>View Our Services</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#061331] transition-transform group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Graphic Column */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10">
              <div className="relative w-full max-w-[480px] aspect-square lg:scale-110">
                <Image
                  src="/study-abrode-cta-globe.png"
                  alt="Study Abroad Destination Illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
