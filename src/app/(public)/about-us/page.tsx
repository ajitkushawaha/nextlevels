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
  Users,
  HeartHandshake,
  ShieldCheck,
  ArrowRight
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/about-us')
  return generateSEOMetadata(seoData)
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e] font-sans overflow-x-hidden flex flex-col justify-between select-none">

      {/* Hero Section */}
      <section className="bg-[#0e1a38] text-white py-16 md:py-24 relative overflow-hidden">
        {/* Subtle grid line decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-gutter relative z-10 text-center pt-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffdea9] mb-4 inline-block">
            ESTABLISHED 2020
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold mb-6 tracking-tight leading-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            About Next Level
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto text-[#bac6ec] leading-relaxed">
            Guiding students toward global success through expert, zero-cost education support. We are your bridge to prestigious international universities.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-8 max-w-container-max mx-auto px-gutter w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <div className="space-y-6 text-left">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#0e1a38] leading-tight"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Rooted in Jaffna, Focused Globally
            </h2>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
              Founded with a vision to simplify international student placement, Next Level Education (Pvt) Ltd is a premier study abroad agency headquartered in Jaffna, Sri Lanka. We believe that global education transforms lives, which is why we provide our counseling and application support completely 100% free of charge for all students.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="block text-[#7d5800] font-black text-3xl sm:text-4xl">98%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1 block">
                  VISA SUCCESS
                </span>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="block text-[#7d5800] font-black text-3xl sm:text-4xl">1000+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1 block">
                  STUDENTS PLACED
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#7d5800]/5 -z-10 rounded-full"></div>
            <div className="rounded-2xl overflow-hidden border border-slate-200/60 shadow-2xl relative h-64 sm:h-80 md:h-[400px]">
              <Image
                alt="Mock Interview Consultation"
                src="/home2/mock-interview.png"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#0e1a38]/5 -z-10 rounded-full"></div>
          </div>

        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#f0edf0]/60 border-y border-slate-200/40 py-16 px-10  w-full">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white p-10 sm:p-12 rounded-3xl border border-slate-200/60 shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md text-left flex flex-col items-start">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7d5800]/10 text-[#7d5800] mb-6">
                <Eye className="h-6 w-6 stroke-2" />
              </span>
              <h3
                className="text-2xl font-extrabold text-[#0e1a38] mb-4"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Our Vision
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                To be a trusted leader in education consultancy, empowering students to achieve their academic goals and transform their futures through personalized guidance for studying abroad.
              </p>
            </div>

            <div className="bg-white p-10 sm:p-12 rounded-3xl border border-slate-200/60 shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md text-left flex flex-col items-start">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7d5800]/10 text-[#7d5800] mb-6">
                <Rocket className="h-6 w-6 stroke-2" />
              </span>
              <h3
                className="text-2xl font-extrabold text-[#0e1a38] mb-4"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Our Mission
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Building international pathways since 2020 by providing ethical, transparent, and comprehensive support that removes financial barriers to global education excellence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-10 px-8 max-w-container-max mx-auto px-gutter w-full">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#0e1a38]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Our Core Pillars
          </h2>
          <div className="h-1 w-20 bg-[#7d5800] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-xs transition-all duration-300 hover:shadow-md">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200/80 rounded-full flex items-center justify-center mb-6 shadow-xs text-[#0e1a38]">
              <Users className="h-7 w-7 stroke-2" />
            </div>
            <h4 className="text-xl font-extrabold text-[#0e1a38] mb-3">
              Student-First Approach
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Every student is unique. We tailor our academic and visa guidance to match your specific backgrounds and goals.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-xs transition-all duration-300 hover:shadow-md">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200/80 rounded-full flex items-center justify-center mb-6 shadow-xs text-[#0e1a38]">
              <HeartHandshake className="h-7 w-7 stroke-2" />
            </div>
            <h4 className="text-xl font-extrabold text-[#0e1a38] mb-3">
              100% Free Services
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We never charge students for counseling, applications, or visa support. Our operations are fully funded by partner universities.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-xs transition-all duration-300 hover:shadow-md">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200/80 rounded-full flex items-center justify-center mb-6 shadow-xs text-[#0e1a38]">
              <ShieldCheck className="h-7 w-7 stroke-2" />
            </div>
            <h4 className="text-xl font-extrabold text-[#0e1a38] mb-3">
              Ethical &amp; Transparent
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We maintain strict compliance and integrity in our applications, ensuring authentic documentation and high credibility.
            </p>
          </div>

        </div>
      </section>

      {/* Our Growth Timeline */}
      <section className="py-10 px-8 bg-slate-50 border-y border-slate-200/40 overflow-hidden w-full">
        <div className="max-w-container-max mx-auto px-gutter">

          <div className="mb-16 text-center">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#0e1a38]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Milestones of Trust &amp; Growth
            </h2>
            <p className="text-slate-500 text-sm font-semibold mt-2">
              Follow our journey from local roots to global impact
            </p>
          </div>

          <div className="relative pt-6 pb-12">
            {/* Horizontal Timeline Progress Line */}
            <div className="absolute top-[38px] left-8 right-8 h-1 bg-linear-to-r from-[#7d5800] to-[#0e1a38] opacity-25 rounded-full hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative text-left">

              {/* 2020 */}
              <div className="relative bg-white p-6 rounded-2xl border border-slate-150 shadow-xs md:bg-transparent md:border-0 md:shadow-none md:p-0">
                <div className="w-8 h-8 rounded-full bg-[#7d5800] border-4 border-slate-50 shadow-md mb-4 hidden md:block"></div>
                <div>
                  <span className="text-xs font-black text-[#7d5800] uppercase tracking-wider mb-2 block">
                    2020
                  </span>
                  <h5 className="text-lg font-bold text-[#0e1a38] mb-2">The Foundation</h5>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                    Established in Jaffna with a mission to democratize access to international education for local students.
                  </p>
                </div>
              </div>

              {/* 2022 */}
              <div className="relative bg-white p-6 rounded-2xl border border-slate-150 shadow-xs md:bg-transparent md:border-0 md:shadow-none md:p-0">
                <div className="w-8 h-8 rounded-full bg-[#0e1a38] border-4 border-slate-50 shadow-md mb-4 hidden md:block"></div>
                <div>
                  <span className="text-xs font-black text-[#7d5800] uppercase tracking-wider mb-2 block">
                    2022
                  </span>
                  <h5 className="text-lg font-bold text-[#0e1a38] mb-2">Expansion</h5>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                    Forged partnerships with 50+ tier-1 universities in the UK and Canada, doubling our success rate.
                  </p>
                </div>
              </div>

              {/* 2024 */}
              <div className="relative bg-white p-6 rounded-2xl border border-slate-150 shadow-xs md:bg-transparent md:border-0 md:shadow-none md:p-0">
                <div className="w-8 h-8 rounded-full bg-[#0e1a38] border-4 border-slate-50 shadow-md mb-4 hidden md:block"></div>
                <div>
                  <span className="text-xs font-black text-[#7d5800] uppercase tracking-wider mb-2 block">
                    2024
                  </span>
                  <h5 className="text-lg font-bold text-[#0e1a38] mb-2">Milestone</h5>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                    Reached 1,000+ successful student placements and expanded physical presence to Batticaloa.
                  </p>
                </div>
              </div>

              {/* Today */}
              <div className="relative bg-white p-6 rounded-2xl border border-slate-150 shadow-xs md:bg-transparent md:border-0 md:shadow-none md:p-0">
                <div className="w-8 h-8 rounded-full bg-[#0e1a38] border-4 border-slate-50 shadow-md mb-4 hidden md:block"></div>
                <div>
                  <span className="text-xs font-black text-[#7d5800] uppercase tracking-wider mb-2 block">
                    TODAY
                  </span>
                  <h5 className="text-lg font-bold text-[#0e1a38] mb-2">Global Hub</h5>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                    Now operating as a comprehensive digital portal with end-to-end post-arrival support across 5 countries.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#0e1a38] text-white text-center w-full">
        <div className="max-w-3xl mx-auto px-gutter">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-base sm:text-lg text-[#bac6ec] mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful students who have achieved their dreams with Next Level Education. Your future starts with a single conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto bg-[#ffc65a] text-[#271900] px-10 py-4 rounded-xl font-bold hover:bg-[#efbd5a] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto border-2 border-[#7d5800] text-[#ffdea9] hover:text-white px-10 py-4 rounded-xl font-bold hover:bg-[#7d5800]/25 transition-all text-sm block"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
