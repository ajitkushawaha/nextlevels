'use client'

import Link from 'next/link'
import Footer from '@/components/layout/footer'
import { MapPin, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import FreeCounsellingForm from '@/components/contact/FreeCounsellingForm'

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white text-[#061331] font-sans flex flex-col justify-between">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-85 sm:h-90 lg:h-100 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-27.5 pb-6 sm:pb-8 lg:py-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
          alt="Contact Us Banner"
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />

        {/* Content Container */}
        <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb */}
          <div className="max-w-187.5">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                <li>
                  <Link href="/" className="hover:text-[#d7a23a] transition-colors">
                    Home
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none text-white font-semibold">
                  <span>Contact Us</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Bottom Title & Badge */}
          <div className="mt-auto space-y-3 pt-6 text-left">
            <div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                Get In Touch
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              Contact Us
            </h1>
            
            <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              Email, call, or complete the form to learn how Next Level Education can guide your study abroad journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full grow py-16 bg-[#fbf8fc] relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-14">
          
          {/* Quick Contact & Channels Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-slate-200/80">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-[#081638] text-base mb-2">Student Support</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Our support team is available to help with university applications and visa questions.
                </p>
              </div>
              <a href="mailto:info@nextleveleducation.com" className="text-xs font-bold text-[#d7a23a] mt-4 hover:underline flex items-center gap-1">
                info@nextleveleducation.com <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-[#081638] text-base mb-2">Feedback & Suggestions</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  We value your input to continuously refine and improve our counseling services.
                </p>
              </div>
              <a href="tel:+94775198195" className="text-xs font-bold text-[#d7a23a] mt-4 hover:underline flex items-center gap-1">
                +94 77 519 8195 <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-[#081638] text-base mb-2">Institutional Inquiries</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  For university partnerships or administrative queries, contact us directly.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400 mt-4">
                Mon - Sat: 9AM - 5PM
              </span>
            </div>
          </div>

          {/* New Free Counselling Form Component */}
          <div className="bg-white  rounded-4xl p-6 sm:p-8 lg:p-12 shadow-[0_15px_50px_rgba(8,22,56,0.03)] ">
            <FreeCounsellingForm />
          </div>

          {/* Bottom Section: Side-by-side Map & Office details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-10 border-t bg-white border-slate-200 px-6 sm:px-8 lg:px-14 mt-12 rounded-[32px] shadow-[0_10px_35px_rgba(8,22,56,0.02)]">
            
            {/* Left: Beautiful Round Map Frame */}
            <div className="lg:col-span-7 w-full h-100 relative rounded-[32px] overflow-hidden border border-slate-200/80 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15737.61!2d80.025!3d9.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe54c!2sKondavil%2C+Jaffna%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1700000000"
                width="100%" 
                height="100%"
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Next Level Education Office Location"
              />
            </div>

            {/* Right: Office Address Details */}
            <div className="lg:col-span-5 text-left space-y-8 lg:pl-6">
              <div className="space-y-3">
                <span className="text-[#d7a23a] text-xs font-black uppercase tracking-widest block">
                  Our Location
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
                  Connecting Near and Far
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-extrabold text-lg text-[#081638] flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#d7a23a] shrink-0" />
                    Jaffna Head Office
                  </h4>
                  <p className="text-slate-500 text-sm mt-1.5 pl-7 leading-relaxed font-medium">
                    Palali Road, Kondavil,<br />
                    Jaffna, Sri Lanka
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-extrabold text-lg text-[#081638] flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#d7a23a] shrink-0" />
                    Batticaloa Branch
                  </h4>
                  <p className="text-slate-500 text-sm mt-1.5 pl-7 leading-relaxed font-medium">
                    Main Street,<br />
                    Batticaloa, Sri Lanka
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
