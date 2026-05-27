import Link from 'next/link'
import Footer from '@/components/layout/footer'
import CustomEnquiryForm from '@/components/about/CustomEnquiryForm'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import {
  Phone, Mail, MapPin, MessageSquare,
  Clock, CheckCircle2, ArrowRight,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/contact-us')
  return generateSEOMetadata(seoData)
}

const contactMethods = [
  {
    icon: Phone,
    label: 'Call Anytime',
    value: '+94 77 519 8195',
    sub: 'Mon – Sat  ·  8 AM – 8 PM',
    href: 'tel:+94775198195',
    accent: '#d7a23a',
  },

  {
    icon: Mail,
    label: 'Email',
    value: 'help@nextlevel.edu.lk',
    sub: 'Reply within 24 hours',
    href: 'mailto:help@nextlevel.edu.lk',
    accent: '#6b9fff',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Kondavil, Jaffna',
    sub: 'Palali Road, Sri Lanka',
    href: 'https://maps.google.com/?q=Kondavil,Jaffna,Sri+Lanka',
    accent: '#f87171',
  },
]

const whyUs = [
  '100% Free — No Hidden Charges',
  '98% Visa Approval Rate',
  'Personalised 1-on-1 Counseling',
  'Senior Consultants (5+ Years Exp.)',
  'Support in Tamil, Sinhala & English',
  'End-to-End Post-Arrival Guidance',
]

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f0f7ff] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f8fafc] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

        <div className="relative px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28 lg:px-10 lg:pt-48 lg:pb-32 text-center max-w-4xl mx-auto z-10">
          <nav className="flex justify-center items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-[#061331]/50">
            <Link href="/" className="hover:text-[#d7a23a] transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#d7a23a]">Contact Us</span>
          </nav>

          <h1 className="text-[40px] sm:text-5xl lg:text-[64px] font-extrabold text-[#081638] mb-8 leading-[1.15]">
            Register For A <br className="hidden sm:block" />
            <span className="text-[#d7a23a] relative whitespace-nowrap">
              Free Consultation
              <span className="absolute bottom-2 left-0 w-full h-[4px] bg-[#d7a23a] rounded-full opacity-30"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#59616f] max-w-2xl mx-auto leading-relaxed">
            Provide your academic background details below. Our study abroad coordinators will evaluate your credentials and reach back to schedule a 1-on-1 planning session.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full grow bg-slate-50/50">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-10 items-start">

            {/* LEFT — navy info panel */}
            <div className=" relative bg-[#061331] text-white rounded-[32px] overflow-hidden shadow-2xl p-6">
              {/* Texture & Ambient blobs */}
              <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#d7a23a]/10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#d7a23a]/8 blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-8 text-[#d7a23a]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  Contact Information
                </h3>

                {/* Contact methods */}
                <div className="flex flex-col gap-4 mb-10">
                  {contactMethods.map(m => {
                    const Icon = m.icon
                    return (
                      <a
                        key={m.label}
                        href={m.href}
                        target={m.href.startsWith('http') ? '_blank' : undefined}
                        rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 p-4 transition-all duration-300"
                      >
                        <div
                          className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `${m.accent}18` }}
                        >
                          <Icon className="h-4.5 w-4.5" style={{ color: m.accent }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{m.label}</p>
                          <p className="text-sm font-bold text-white truncate">{m.value}</p>
                          <p className="text-[10px] text-white/30 mt-0.5">{m.sub}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>

                {/* Office hours */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-3.5 w-3.5 text-[#d7a23a]" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#d7a23a]">Office Hours</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      ['Mon – Fri', '8:00 AM – 8:00 PM'],
                      ['Saturday', '9:00 AM – 5:00 PM'],
                      ['Sunday', 'By Appointment'],
                    ].map(([d, h]) => (
                      <div key={d} className="flex justify-between items-center text-sm">
                        <span className="text-white/50 font-medium">{d}</span>
                        <span className="text-white font-bold tabular-nums">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            </div>


            {/* RIGHT — form panel */}
            <div className="bg-white rounded-[32px]  border border-slate-100">
              <CustomEnquiryForm />
            </div>

          </div>
        </div>
      </main>
      {/* Why Us */}
      <div className="mt-auto bg-[#061331] p-12  ">
        <h2 className="text-2xl text-center text-[#d7a23a] font-bold uppercase tracking-widest mb-4">Why Next Level?</h2>
        <div className="grid grid-cols-3 lg:grid-cols-6  pt-10 gap-3">
          {whyUs.map(item => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d7a23a] mt-0.5" />
              <span className="text-xs text-white/70 leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
      {/* ── Map Section ─────────────────────────────────────────── */}
      <section className="border-t border-[#ece8df] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7a23a]">Find Us</span>
              <h2
                className="mt-3 text-2xl sm:text-3xl font-bold text-[#061331] leading-tight"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Our Office Location
              </h2>
              <p className="mt-3 text-sm text-[#59616f] leading-relaxed max-w-md">
                Walk in or book a prior appointment. Our team is ready to welcome you and
                provide comprehensive study abroad guidance in person.
              </p>
              <div className="mt-6 flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-[#061331]/5 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-[#d7a23a]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#061331]">Next Level Education (Pvt) Ltd</p>
                  <p className="text-sm text-[#59616f] mt-0.5">Palali Road, Kondavil<br />Jaffna, Sri Lanka</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Kondavil,Jaffna,Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#061331] border border-[#061331]/20 hover:border-[#d7a23a] hover:text-[#d7a23a] px-5 py-2.5 rounded-lg transition-all duration-300"
              >
                Open in Google Maps
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#ece8df] shadow-lg aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15737.61!2d80.025!3d9.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe54c!2sKondavil%2C+Jaffna%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1700000000"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Next Level Education Office Location"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Small helper for breadcrumb arrow
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
