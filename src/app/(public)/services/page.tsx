import Link from 'next/link'
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
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/services')
  return generateSEOMetadata(seoData)
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        {/* Subtle light background blobs to match the clean aesthetic */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f0f7ff] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f8fafc] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

        <div className="relative px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28 lg:px-10 lg:pt-48 lg:pb-32 text-center max-w-4xl mx-auto z-10">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-[#061331]/50">
            <Link href="/" className="hover:text-[#d7a23a] transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#d7a23a]">Services</span>
          </nav>
          
          <h1 
            className="text-[40px] sm:text-5xl lg:text-[64px] font-extrabold text-[#081638] mb-8 leading-[1.15]" 
          >
            Our Professional <br className="hidden sm:block" />
            <span className="text-[#d7a23a] relative whitespace-nowrap">
              Services
              <span className="absolute bottom-2 left-0 w-full h-[4px] bg-[#d7a23a] rounded-full opacity-30"></span>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-[#59616f] max-w-2xl mx-auto leading-relaxed">
            Empowering your global academic aspirations through end-to-end, <strong className="text-[#061331]">100% free</strong> guidance. From university matching to landing safely in your dream destination.
          </p>
        </div>
      </section>

      {/* Main Content: Interactive Dashboard Hub */}
      <main className="w-full grow py-16">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          
          {/* Renders client-side stateful tabs and bento network */}
          <ServicesInteractiveHub />

          {/* Premium Call to Action Banner */}
          <section className="mt-8 relative rounded-3xl overflow-hidden bg-linear-to-br from-[#061331] to-[#0b1f4d] text-white p-8 sm:p-12 md:p-16 shadow-[0_24px_50px_rgba(6,19,49,0.25)]">
            {/* Ambient Background Lights */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d7a23a]/15 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#d7a23a]/10 rounded-full blur-3xl"></div>
            
            {/* Decorative dot grids */}
            <div className="absolute top-8 left-8 opacity-10">
              <div className="h-16 w-32 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] bg-size-[0.75rem_0.75rem]" />
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#d7a23a] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
                Start Your Abroad Journey
              </span>
              
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Ready to Take the Next Step?
              </h2>
              
              <p className="text-white/80 text-[15px] sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
                Consult with our dedicated counselors to evaluate your profile, select target universities, and start your application. Our services are <strong className="text-[#d7a23a]">100% Free</strong> for students.
              </p>

              {/* Consultation Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-left">
                {/* Option 1: WhatsApp */}
                <a 
                  href="https://wa.me/94775198195" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#d7a23a]/30 group"
                >
                  <div className="h-12 w-12 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:scale-115 transition-transform duration-300">
                    <MessageSquare className="h-5 w-5 fill-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 font-semibold uppercase">WhatsApp Chat</p>
                    <p className="text-sm font-bold text-white mt-0.5">+94 77 519 8195</p>
                  </div>
                </a>

                {/* Option 2: Phone */}
                <a 
                  href="tel:+94775198195"
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#d7a23a]/30 group"
                >
                  <div className="h-12 w-12 rounded-lg bg-[#d7a23a]/10 text-[#d7a23a] flex items-center justify-center group-hover:scale-115 transition-transform duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 font-semibold uppercase">Call Center</p>
                    <p className="text-sm font-bold text-white mt-0.5">+94 77 519 8195</p>
                  </div>
                </a>

                {/* Option 3: Email */}
                <a 
                  href="mailto:help@nextlevel.edu.lk"
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#d7a23a]/30 group sm:col-span-2 md:col-span-1"
                >
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-115 transition-transform duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 font-semibold uppercase">Email Support</p>
                    <p className="text-sm font-bold text-white mt-0.5 truncate">help@nextlevel.edu.lk</p>
                  </div>
                </a>
              </div>

              {/* Booking CTA Button */}
              <div className="flex justify-center mt-6">
                <Link
                  href="/contact-us"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#d7a23a] px-8 py-3 text-sm font-bold text-[#061331] shadow-[0_12px_30px_rgba(215,162,58,0.28)] transition-all duration-300 hover:bg-[#efbd5a] hover:scale-[1.03] active:scale-[0.98] btn-shimmer"
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
