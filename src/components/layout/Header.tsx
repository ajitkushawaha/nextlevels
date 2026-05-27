'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, PhoneCall } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about-us' },
  {
    label: 'Study Abroad',
    href: '#programs',
    dropdownItems: [
      { label: 'Study in UK', href: '/uk' },
      { label: 'Study in USA', href: '/usa' },
      { label: 'Study in Canada', href: '/canada' },
      { label: 'Study in Australia', href: '/australia' },
    ]
  },
  { label: 'Testimonial', href: '#testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Courses', href: '/corses' }
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Home">
      <Image
        src="/logo.png"
        alt="Next Level Education"
        width={150}
        height={74}
        priority
        className="h-auto w-[116px] sm:w-[132px] transition-all duration-300"
      />
    </Link>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? 'bg-white shadow-md'
        : 'bg-white'
        }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navItems.map(item => (
            <div key={item.label} className="group/nav relative">
              <Link
                href={item.href}
                className={`inline-flex items-center gap-1 border-b-2 py-2 text-[13px] font-semibold transition duration-300 text-[#061331] ${pathname === item.href
                  ? 'border-[#d7a23a] !text-[#d7a23a]'
                  : 'border-transparent hover:border-[#d7a23a] hover:text-[#d7a23a]'
                  }`}
              >
                {item.label}
                {item.dropdownItems ? (
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                ) : null}
              </Link>
              {item.dropdownItems && (
                <div className="absolute left-0 top-full hidden w-64 pt-2 group-hover/nav:block">
                  <div className="rounded-md border border-white/10 bg-[#061331] p-2 shadow-xl">
                    {item.dropdownItems.map(dropItem => (
                      <Link
                        key={dropItem.label}
                        href={dropItem.href}
                        className="block rounded-md px-3 py-2 text-[13px] text-white transition hover:bg-white/10 hover:text-[#d7a23a]"
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+91883456789"
              className="flex items-center gap-3 rounded-md border border-[#d7a23a] px-4 py-1.5 transition duration-300 hover:bg-[#061331]/5"
            >
              <PhoneCall className="h-5 w-5 text-[#d7a23a]" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] leading-tight transition duration-300 text-[#061331]/70">Call Anytime</span>
                <span className="text-[13px] font-bold text-[#d7a23a] leading-tight">+94775198195</span>
              </div>
            </a>
          </div>

          <details className="group relative lg:hidden">
            <summary
              className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border transition duration-300 text-[#061331] border-[#061331]/20 hover:border-[#d7a23a] hover:text-[#d7a23a]"
            >
              <span className="sr-only">Open navigation</span>
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 mt-3 w-64 rounded-lg border border-white/10 bg-[#061331] p-3 shadow-2xl">
              {navItems.map(item => (
                <div key={item.label} className="flex flex-col">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#d7a23a]"
                  >
                    <span>{item.label}</span>
                    {item.dropdownItems ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : null}
                  </Link>
                  {item.dropdownItems && (
                    <div className="flex flex-col pl-4 pb-2">
                      {item.dropdownItems.map(dropItem => (
                        <Link
                          key={dropItem.label}
                          href={dropItem.href}
                          className="block rounded-md px-3 py-2 text-[13px] text-white/70 transition hover:bg-white/5 hover:text-[#d7a23a]"
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  )
}
