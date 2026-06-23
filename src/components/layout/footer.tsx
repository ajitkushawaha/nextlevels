'use client'

import { Mail, MapPin, Phone, PhoneCall, ArrowRight } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { defaultSiteSettings, type SiteSettings } from '@/lib/siteSettings'

const socialIconMap: Record<string, any> = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
}

function Logo({ footer = false, settings }: { footer?: boolean; settings: SiteSettings['footer'] }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Home">
      <Image
        src={settings.logo}
        alt={settings.logoAlt}
        width={150}
        height={74}
        priority={!footer}
        className="h-auto w-29 brightness-0 invert sm:w-33"
      />
    </Link>
  )
}

export default function Footer() {
  const [settings, setSettings] = useState(defaultSiteSettings.footer)

  useEffect(() => {
    let mounted = true
    async function loadSettings() {
      try {
        const res = await fetch('/api/public/site-settings')
        const data = await res.json()
        if (mounted && data.settings?.footer) setSettings(data.settings.footer)
      } catch {
        // Keep defaults.
      }
    }
    loadSettings()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <footer className="relative bg-[#061331] pt-8 text-white bg-[url('/visa/footervector.png')] bg-cover bg-center">
      {/* Ready to Start Your Journey Section */}
      <div className="border-b border-white/10 pb-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:px-8 lg:flex-row lg:px-10">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d7a23a] text-[#d7a23a]">
              <PhoneCall className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold leading-tight sm:text-2xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                {settings.ctaTitle}
              </h2>
              <p className="mt-1 text-sm text-white/75">
                {settings.ctaDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href={settings.ctaButtonHref} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-[#d7a23a] px-6 py-2 text-sm font-bold text-[#d7a23a] transition hover:bg-white hover:text-black">
              {settings.ctaButtonText}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="hidden lg:block relative -mt-4 opacity-80 pl-4">
              <Image src="/visa/air1.png" width={100} height={90} alt="Airplane" className="object-contain" style={{ width: 'auto', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 grid-cols-2 lg:grid-cols-5 lg:px-10">
        {/* Logo & Description */}
        <div className="lg:col-span-1">
          <Logo footer settings={settings} />
          <p className="mt-5 text-[13px] leading-6 text-white/70 pr-4">
            {settings.description}
          </p>

        </div>

        {/* Quick Links */}
        <div className='pt-8 lg:pt-0'>
          <h3 className="text-[15px] font-bold">Quick Links</h3>
          <ul className="mt-6 space-y-3 text-[13px] text-white/70">
            {settings.quickLinks.filter(item => item.enabled !== false).map(item => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Study Abroad */}
        <div>
          <h3 className="text-[15px] font-bold">Study Abroad</h3>
          <ul className="mt-6 space-y-3 text-[13px] text-white/70">
            {settings.studyLinks.filter(item => item.enabled !== false).map(item => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Branches */}
        <div>
          <h3 className="text-[15px] font-bold">Branches</h3>
          <ul className="mt-6 space-y-3 text-[13px] text-white/70">
            {settings.branchLinks.filter(item => item.enabled !== false).map(item => (
              <li key={item.label} className="text-[13px] text-white/70">
                {item.href === '#' ? (
                  item.label
                ) : (
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-[15px] font-bold">Contact Us</h3>
          <ul className="mt-3 space-y-4 text-[13px] text-white/70">
            <li className="flex gap-3 items-start">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
              <span>{settings.phone}</span>
            </li>
            <li className="flex gap-3 items-start">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
              <span>{settings.email}</span>
            </li>
            <li className="flex gap-3 items-start">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
              <span>
                {settings.address}</span>
            </li>
            <li>
              <div className="mt-3 flex items-center gap-3">
                {settings.socialLinks.filter(item => item.enabled !== false).map(item => {
                  const Icon = socialIconMap[item.label] || FaFacebook
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-[#f6da73] hover:text-[#f6da73]"
                      aria-label={item.label}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  )
                })}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#030A1A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>{settings.copyright}</p>
          <div className="flex gap-4">
            {settings.legalLinks.filter(item => item.enabled !== false).map((item, index) => (
              <span key={item.label} className="contents">
                {index > 0 ? <span className="text-white/40">|</span> : null}
                <Link href={item.href} className="hover:text-white transition">
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
