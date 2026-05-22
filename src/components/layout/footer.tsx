import { Mail, MapPin, Phone, PhoneCall, ArrowRight } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6'
import Link from 'next/link'
import Image from 'next/image'

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Home">
      <Image
        src="/logo.png"
        alt="Next Level Education"
        width={150}
        height={74}
        priority={!footer}
        className="h-auto w-[116px] brightness-0 invert sm:w-[132px]"
      />
    </Link>
  )
}

export default async function Footer() {
  return (
    <footer className="relative bg-[#061331] pt-14 text-white bg-[url('/visa/footervector.png')] bg-cover bg-center">
      {/* Ready to Start Your Journey Section */}
      <div className="border-b border-white/10 pb-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:px-10">
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f6da73] text-[#061331]">
              <PhoneCall className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                Ready to Start Your Journey?
              </h2>
              <p className="mt-1 text-sm text-white/75">
                Book a free consultation with our experts today.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact-us" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#f6da73] px-8 py-3 text-sm font-bold text-[#061331] transition hover:bg-[#e3c761]">
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="hidden lg:block relative -mt-4 opacity-80 pl-4">
              <Image src="/visa/air1.png" width={100} height={90} alt="Airplane" className="object-contain" style={{ width: 'auto', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:px-10">
        {/* Logo & Description */}
        <div className="lg:col-span-1">
          <Logo footer />
          <p className="mt-5 text-[13px] leading-6 text-white/70 pr-4">
            Your trusted partner for global education. We help you achieve your dreams and build a better future.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: FaFacebook, label: 'Facebook' },
              { icon: FaInstagram, label: 'Instagram' },
              { icon: FaLinkedin, label: 'LinkedIn' },
              { icon: FaYoutube, label: 'YouTube' },
            ].map(item => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white/80 transition hover:border-[#f6da73] hover:text-[#f6da73]"
                  aria-label={item.label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[15px] font-bold">Quick Links</h3>
          <ul className="mt-6 space-y-3 text-[13px] text-white/70">
            {[
              ['Home', '/'],
              ['About Us', '/about-us'],
              ['Programs', '#programs'],
              ['Destinations', '#programs'],
              ['Events', '/events'],
              ['Blog', '/blog'],
              ['Contact Us', '/contact-us'],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Study Abroad */}
        <div>
          <h3 className="text-[15px] font-bold">Study Abroad</h3>
          <ul className="mt-6 space-y-3 text-[13px] text-white/70">
            {[
              'University of Hertfordshire',
              'University of Chester',
              'Coventry University',
              'University of Greenwich',
              'Study in Canada',
              'Study in Australia',
            ].map(item => (
              <li key={item}>
                <Link href="#" className="transition hover:text-white">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-[15px] font-bold">Contact Us</h3>
          <ul className="mt-6 space-y-4 text-[13px] text-white/70">
            <li className="flex gap-3 items-start">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
              <span>123 456 7890</span>
            </li>
            <li className="flex gap-3 items-start">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
              <span>info@nextleveleducation.com</span>
            </li>
            <li className="flex gap-3 items-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
              <span>123, Education Street<br />Dream City, Country</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#030A1A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Next Level Education. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span className="text-white/40">|</span>
            <Link href="/terms" className="hover:text-white transition">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
