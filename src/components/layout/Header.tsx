'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, PhoneCall } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { defaultSiteSettings, type SiteSettings } from '@/lib/siteSettings'

function Logo({ settings }: { settings: SiteSettings['header'] }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Home">
      <Image
        src={settings.logo}
        alt={settings.logoAlt}
        width={150}
        height={74}
        priority
        className="h-auto w-29 sm:w-33 transition-all duration-300"
      />
    </Link>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [settings, setSettings] = useState(defaultSiteSettings.header)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let mounted = true
    async function loadSettings() {
      try {
        const res = await fetch('/api/public/site-settings')
        const data = await res.json()
        if (mounted && data.settings?.header) setSettings(data.settings.header)
      } catch {
        // Keep defaults.
      }
    }
    loadSettings()
    return () => {
      mounted = false
    }
  }, [])

  const navItems = settings.navItems.filter(item => item.enabled !== false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? 'bg-white shadow-md'
        : 'bg-white shadow-xs'
        }`}
    >
      <nav className="mx-auto flex h-20 max-w-350 items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo settings={settings} />

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navItems.map(item => {
            const isDropdown = !!item.dropdownItems
            const isActive = isDropdown
              ? item.dropdownItems?.some(dropItem => dropItem.enabled !== false && pathname === dropItem.href)
              : pathname === item.href

            return (
              <div key={item.label} className="group/nav relative flex items-center">
                {isDropdown ? (
                  <button
                    type="button"
                    aria-haspopup="menu"
                    className={`inline-flex items-center gap-1 border-b-2 py-2 text-[13px] font-semibold transition duration-300 text-[#061331] ${isActive
                      ? 'border-[#d7a23a] text-[#d7a23a]!'
                      : 'border-transparent hover:border-[#d7a23a] hover:text-[#d7a23a]'
                      }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 border-b-2 py-2 text-[13px] font-semibold transition duration-300 text-[#061331] ${isActive
                    ? 'border-[#d7a23a] text-[#d7a23a]!'
                    : 'border-transparent hover:border-[#d7a23a] hover:text-[#d7a23a]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
                {item.dropdownItems && (
                  <div className="absolute left-0 top-full hidden w-64 pt-2 group-hover/nav:block group-focus-within/nav:block">
                    <div className="rounded-md border border-white/10 bg-[#061331] p-2 shadow-xl" role="menu">
                      {item.dropdownItems.filter(dropItem => dropItem.enabled !== false).map(dropItem => (
                        <Link
                          key={dropItem.label}
                          href={dropItem.href}
                          role="menuitem"
                          className="block rounded-md px-3 py-2 text-[13px] text-white transition hover:bg-white/10 hover:text-[#d7a23a]"
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center mr-1 sm:mr-2">
            <Link
              href={settings.courseFinderHref}
              className="relative inline-block text-[12px] sm:text-[14px] font-bold text-[#061331] hover:text-[#d7a23a] transition duration-300 pb-1.5"
            >
              {settings.courseFinderLabel}
              <svg
                className="absolute left-0 -bottom-1 w-full h-2 text-[#d7a23a] pointer-events-none"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5C30 2 70 2 98 4.5C88 6.5 75 8 72 8.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="hidden lg:flex items-center">
            <a
              href={settings.callHref}
              className="flex items-center gap-3 rounded-md border border-[#d7a23a] px-4 py-1.5 transition duration-300 hover:bg-[#061331]/5"
            >
              <PhoneCall className="h-5 w-5 text-[#d7a23a]" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] leading-tight transition duration-300 text-[#061331]/70">{settings.callLabel}</span>
                <span className="text-[13px] font-bold text-[#d7a23a] leading-tight">{settings.callPhone}</span>
              </div>
            </a>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border transition duration-300 text-[#061331] border-[#061331]/20 hover:border-[#d7a23a] hover:text-[#d7a23a] lg:hidden focus-visible:outline-none"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 sm:w-87.5 bg-[#061331] text-white border-l border-white/10 p-6 flex flex-col justify-between focus-visible:outline-none"
            >
              <div className="flex flex-col gap-6">
                <SheetHeader className="text-left border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-white font-bold text-lg">Navigation</SheetTitle>
                  </div>
                </SheetHeader>

                <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
                  {navItems.map(item => {
                    const isDropdown = !!item.dropdownItems
                    const isDropdownOpen = activeDropdown === item.label
                    const isActive = pathname === item.href

                    return (
                      <div key={item.label} className="flex flex-col">
                        {isDropdown ? (
                          <>
                            <button
                              onClick={() => setActiveDropdown(isDropdownOpen ? null : item.label)}
                              className="flex items-center justify-between w-full rounded-md px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#d7a23a] text-left cursor-pointer"
                            >
                              <span>{item.label}</span>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#d7a23a]' : 'opacity-70'}`} />
                            </button>
                            {isDropdownOpen && (
                              <div className="flex flex-col pl-4 pb-2 border-l border-white/10 ml-3 mt-1 space-y-1">
                                {item.dropdownItems?.filter(dropItem => dropItem.enabled !== false).map(dropItem => (
                                  <Link
                                    key={dropItem.label}
                                    href={dropItem.href}
                                    onClick={() => setOpen(false)}
                                    className={`block rounded-md px-3 py-2 text-[13px] transition ${pathname === dropItem.href
                                      ? 'bg-white/10 text-[#d7a23a] font-medium'
                                      : 'text-white/70 hover:bg-white/5 hover:text-[#d7a23a]'
                                      }`}
                                  >
                                    {dropItem.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`block rounded-md px-3 py-3 text-sm font-semibold transition ${isActive
                                  ? 'bg-white/10 text-[#d7a23a]'
                                  : 'text-white hover:bg-white/10 hover:text-[#d7a23a]'
                                }`
                            }
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </nav>
              </div>

              <div className="border-t border-white/10 pt-4 mt-auto">
                <a
                href={settings.callHref}
                  className="flex items-center gap-3 rounded-md border border-[#d7a23a]/40 bg-white/5 px-4 py-3 transition duration-300 hover:bg-[#d7a23a]/10"
                >
                  <PhoneCall className="h-5 w-5 text-[#d7a23a]" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] leading-tight text-white/60">{settings.callLabel}</span>
                    <span className="text-[14px] font-bold text-[#d7a23a] leading-tight">{settings.callPhone}</span>
                  </div>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
