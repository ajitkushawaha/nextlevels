import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/layout/footer'
import ServicesInteractiveHub from '@/components/services/ServicesInteractiveHub'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import {
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookOpen,
  Users,
  Globe
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/services')
  return generateSEOMetadata(seoData)
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#061331] flex flex-col justify-between">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-[340px] sm:h-[360px] lg:h-[400px] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-[110px] pb-6 sm:pb-8 lg:py-[40px] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        
        {/* Background Image */}
        <Image
          src="/shero.png"
          alt="Our Services Banner"
          fill
          priority
          className="object-cover object-top absolute inset-0 z-0"
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
                <li className="pointer-events-none text-white font-semibold">
                  <span>Services</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Bottom Title & Badge */}
          <div className="mt-auto space-y-3 pt-6">
            <div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                Next Level Consultancy
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Our Professional Services
            </h1>
            
            <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              Empowering your global academic aspirations through end-to-end guidance. From university matching to landing safely in your dream destination.
            </p>
          </div>
        </div>
      </section>


      {/* Main Content: Interactive Dashboard Hub */}
      <main className="w-full grow py-10 bg-[#fbf8fc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Renders client-side stateful tabs and bento network */}
          <ServicesInteractiveHub />

          {/* Premium Call to Action Banner */}
       

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
