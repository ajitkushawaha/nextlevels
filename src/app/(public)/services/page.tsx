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
      <section className="relative overflow-hidden bg-[url('/shero.png')] bg-cover bg-top pt-32 pb-0 lg:pt-60 lg:pb-36 border-b border-slate-100/60">
        {/* Soft overlay on mobile to ensure legibility */}
        <div className="absolute inset-0 bg-white/20 lg:bg-transparent pointer-events-none"></div>

        <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-2 text-left">
              {/* Eyebrow Badge */}
              <div className=" flex w-fit items-center px-4 py-2 rounded-full bg-[#f6ebdc] text-[#7d5800] text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-[#d7a23a]" />
                TRANSFORMING FUTURES
              </div>
              
              <div className="space-y-10 md:space-y-8 relative inline-block">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#081638] tracking-tight leading-[1.1]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Our Professional<br />
                  <span className="text-[#d7a23a]">Services</span>
                </h1>
                {/* Decorative gold line */}
                <div className="w-24 h-1 bg-[#d7a23a] rounded-full mt-1.5 opacity-60"></div>
              </div>
              
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
                Empowering your global academic aspirations through end-to-end, <strong className="text-[#061331] font-bold">100% free</strong> guidance. From university matching to landing safely in your dream destination.
              </p>
 
              <div className="pt-2">
                <a 
                  href="#services" 
                  className="inline-flex items-center justify-center gap-2 bg-[#081638] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-900 active:scale-95 transition-all text-sm shadow-md"
                >
                  <span>View Offerings</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            {/* Right Column: Empty to allow the background image's students to display cleanly */}
            <div className="hidden lg:col-span-6 lg:block h-[350px]"></div>

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
