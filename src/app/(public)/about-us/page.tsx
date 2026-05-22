import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/layout/footer'
import AboutInteractiveHub from '@/components/about/AboutInteractiveHub'
import CustomEnquiryForm from '@/components/about/CustomEnquiryForm'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import {
  CheckCircle2,
  Users,
  Compass,
  Briefcase,
  GraduationCap,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/about-us')
  return generateSEOMetadata(seoData)
}

const keyValues = [
  {
    icon: Users,
    title: 'Student-First Approach',
    text: 'Every student is unique. We tailor our academic and visa guidance to match your specific backgrounds and goals.',
  },
  {
    icon: GraduationCap,
    title: '100% Free Services',
    text: 'We never charge students for counseling, applications, or visa support. Our operations are fully funded by partner universities.',
  },
  {
    icon: Briefcase,
    title: 'Ethical & Transparent',
    text: 'We maintain strict compliance and integrity in our applications, ensuring authentic documentation and high credibility.',
  },
]

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061331]/5 to-transparent border-b border-[#061331]/10">
        <div className="absolute inset-0 bg-[#061331]/[0.01]"></div>
        <div className="relative px-8 py-20 sm:px-16 sm:pt-28 text-center max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 mb-6 text-sm text-[#061331]/60 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-[#d7a23a] transition-colors">Home</Link>
            <span>&bull;</span>
            <span className="text-[#d7a23a]">About Us</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#061331] mb-6 leading-tight" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            About{' '}
            <span className="block sm:inline text-gradient-gold">
              Next Level
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#061331]/80 max-w-3xl mx-auto leading-relaxed">
            We are a leading study abroad consultancy in Sri Lanka, dedicated to guiding students toward global success through expert, zero-cost education support.
          </p>
        </div>

        {/* Decorative ambient blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#d7a23a]/10 rounded-full -translate-y-36 translate-x-36 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#d7a23a]/10 rounded-full translate-y-28 -translate-x-28 blur-3xl"></div>
      </section>

      {/* Main Content */}
      <main className="w-full flex-grow">
        {/* Who We Are Section */}
        <section className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text Column */}
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7a23a] mb-3">
                Who We Are
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#061331] leading-tight mb-6"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Your Trusted Partner for Global Education
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-[#59616f] mb-5">
                Founded with a vision to simplify international student placement, <strong>Next Level Education (Pvt) Ltd</strong> is a premier study abroad agency headquartered in Palali Road, Kondavil, Jaffna, Sri Lanka. We believe that global education transforms lives, which is why we provide our counseling and application support completely <strong>100% free of charge</strong> for all students.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-[#59616f] mb-6">
                Our consultancy partners with highly ranked universities in the UK, Canada, Australia, New Zealand, Germany, and beyond. Whether you are looking for undergraduate entry after your O/Ls or A/Ls, or wishing to advance your career with a post-graduate research degree, our advisors represent your best interests at every single stage of the process.
              </p>

              {/* Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#061331] text-white" />
                  <span>Personalized Counseling</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#061331] text-white" />
                  <span>150+ Partner Universities</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#061331] text-white" />
                  <span>98% Visa Success Rate</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#061331] text-white" />
                  <span>End-to-End Post Arrival Support</span>
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <div className="relative">
              {/* Backdrop effects */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#d7a23a]/15 via-[#061331]/5 to-transparent blur-md"></div>

              {/* Image Container with premium frame and hover zoom */}
              <div className="relative group overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-500 hover:border-[#d7a23a] shadow-2xl">
                <div className="relative h-64 sm:h-80 md:h-[420px] w-full bg-slate-50">
                  <Image
                    src="/home2/mock-interview.png"
                    alt="Next Level Education Team Counseling"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                  <div className="absolute inset-0 bg-[#061331]/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute bottom-6 left-6 bg-[#061331] border border-white/10 p-4 rounded-xl shadow-xl text-left transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <p className="text-2xl font-black text-[#d7a23a] leading-none">1000+</p>
                  <p className="text-[11px] font-bold text-white/80 uppercase tracking-wider mt-1">Students Placed</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Milestones, Vision & Mission, and Values Section */}
        <section className="bg-gradient-to-b from-slate-50 to-white border-y border-[#ece8df]/40 py-16 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">

            {/* Stateful timeline & vision tabs */}
            <AboutInteractiveHub />

            {/* Key Core Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#ece8df]/60">
              {keyValues.map((value, idx) => {
                const ValIcon = value.icon
                return (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#061331]/5 text-[#061331] transition-colors duration-300 group-hover:bg-[#d7a23a] group-hover:text-[#061331]">
                      <ValIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#061331] group-hover:text-[#d7a23a] transition-colors duration-300">
                        {value.title}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-[#59616f] leading-relaxed">
                        {value.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </section>


      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
