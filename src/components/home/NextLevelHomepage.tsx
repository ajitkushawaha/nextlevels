'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ServicesCarousel from './ServiceSection'
import StudentTestimonialsCarousel from './StudentTestimonialsCarousel'
import { ArrowRight, Award, BookOpenCheck, Building2, CalendarDays, CheckCircle2, ChevronDown, CirclePlay, FileCheck2, Globe2, GraduationCap, Headphones, Mail, MapPin, Menu, Phone, PhoneCall, Plane, ShieldCheck, Star, UsersRound, BookOpen, TrendingUp, Search, Clock, UserCheck, Lock, X } from 'lucide-react'
import Footer from '../layout/footer'
// import FlyingAeroplane from './FlyingAeroplane'
import FAQSection from './FAQSection'
import VisaConsultationForm from './VisaConsultationForm'
import { universitiesData } from '@/lib/mockData'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { serviceDetails } from '@/lib/serviceDetails'
import UniversityLogo from '@/components/universities/UniversityLogo'
import type {
  CmsPageContent,
  CmsSection,
  HomeAmbassadorsSection as HomeAmbassadorsSectionData,
  HomeBlogSection as HomeBlogSectionData,
  HomeDestinationsSection as HomeDestinationsSectionData,
  HomeFaqsSection as HomeFaqsSectionData,
  HomeHeroSection as HomeHeroSectionData,
  HomeProgramSection as HomeProgramSectionData,
  HomeScholarshipOfferSection as HomeScholarshipOfferSectionData,
  HomeServicesSection as HomeServicesSectionData,
  HomeStatsSection as HomeStatsSectionData,
  HomeSuccessStoriesSection as HomeSuccessStoriesSectionData,
  HomeTestimonialsSection as HomeTestimonialsSectionData,
  HomeUniversitiesSection as HomeUniversitiesSectionData,
  HomeWhyChooseUsSection as HomeWhyChooseUsSectionData,
} from '@/lib/cms/types'



const heroIconMap = {
  Headphones,
  FileCheck2,
  GraduationCap,
  ShieldCheck,
}

const whyChooseUsIconMap = {
  UsersRound,
  BookOpenCheck,
  Globe2,
  Headphones,
}

const statsIconMap = {
  UsersRound,
  Building2,
  Globe2,
  Award,
}

const scholarshipOfferIconMap = {
  Award,
  ShieldCheck,
  GraduationCap,
}

function getYoutubeVideoId(url?: string) {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname.replace(/^www\./, '')
    let videoId = ''

    if (hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.split('/').filter(Boolean)[0] || ''
    } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (parsedUrl.pathname.startsWith('/shorts/')) {
        videoId = parsedUrl.pathname.split('/').filter(Boolean)[1] || ''
      } else if (parsedUrl.pathname.startsWith('/embed/')) {
        videoId = parsedUrl.pathname.split('/').filter(Boolean)[1] || ''
      } else {
        videoId = parsedUrl.searchParams.get('v') || ''
      }
    }

    return videoId
  } catch {
    return ''
  }
}

function getYoutubeEmbedUrl(url?: string) {
  const videoId = getYoutubeVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : ''
}

function getYoutubeThumbnailUrl(url?: string) {
  const videoId = getYoutubeVideoId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
}

const stats = [
  { icon: UsersRound, targetValue: 1000, suffix: '+', label: 'Students Placed' },
  { icon: Building2, targetValue: 150, suffix: '+', label: 'Partner Universities' },
  { icon: Globe2, targetValue: 20, suffix: '+', label: 'Countries Covered' },
  { icon: Award, targetValue: 98, suffix: '%', label: 'Visa Success Rate' },
]

const approvedHomeServices = serviceDetails.map(service => ({
  title: service.title,
  description: service.shortDesc,
  image: service.image,
  number: service.number,
  stats: service.stats,
  href: `/services/${service.slug}`,
}))

const destinationHrefMap: Record<string, string> = {
  'United Kingdom': '/study-abroad/study-in-uk',
  Canada: '/study-abroad/study-in-canada',
  Australia: '/study-abroad/study-in-australia',
  'New Zealand': '/study-abroad/study-in-new-zealand',
}

const testimonials = [
  {
    name: 'Ananya S.',
    country: 'Canada',
    image: '/home2/happy-gi.png',
    quote:
      'Next Level Education made my dream of studying in Canada a reality. Their support was excellent throughout the process.',
  },
  {
    name: 'Rahul M.',
    country: 'UK',
    image: '/home2/sham.png',
    quote:
      'The team guided me at every step. From university selection to visa approval, everything was so smooth.',
  },
  {
    name: 'Priya K.',
    country: 'Australia',
    image: '/home2/priya.png',
    quote:
      'Highly recommend Next Level Education to anyone who wants to study overseas. Truly professional and supportive.',
  },
  {
    name: 'Sham K.',
    country: 'Australia',
    image: '/home2/ananya.png',
    quote:
      '“Next Level Education made my dream of studying in Canada a reality. Their support was excellent throughout the process. Truly professional and supportive.',
  },
]

const blogs = [
  {
    title: 'Top 10 Universities in Canada for International Students',
    date: 'May 15, 2024',
    image: '/visa/blog1.png',
  },
  {
    title: 'UK Student Visa: Latest Updates and Requirements',
    date: 'May 10, 2024',
    image: '/visa/blog2.png',
  },
  {
    title: 'How to Get Scholarships to Study Abroad',
    date: 'May 05, 2024',
    image: '/visa/blog3.png',
  },
  {
    title: 'Study in Australia: Courses, Fees and Opportunities',
    date: 'Apr 28, 2024',
    image: '/visa/blog4.png',
  },
]

const ambassadors = [
  {
    name: 'Aastha Paudel',
    program: 'Information Technology',
    university: 'University of Colombo',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    link: '/chat?name=Aastha%20Paudel',
  }, 
  {
    name: 'Geraldine Penarete',
    program: 'Geology',
    university: 'University of Peradeniya',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
    link: '/chat?name=Geraldine%20Penarete',
  },
  {
    name: 'Yumi Wan',
    program: 'Physiotherapy',
    university: 'University of Sydney',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    link: '/chat?name=Yumi%20Wan',
  },
  {
    name: 'Tiara D Souza',
    program: 'Occupational Therapy',
    university: 'Monash University',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    link: '/chat?name=Tiara%20D%20Souza',
  },
   {
    name: 'Yumi Wans',
    program: 'Physiotherapy',
    university: 'University of Melbourne',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    link: '/chat?name=Yumi%20Wans',
  },
]

const services = [
  {
    title: 'University Selection and Application Assistance',
    description:
      'At Next Level Education Consultancy, we understand that choosing the right university can be overwhelming. Our experienced counselors work closely with you to identify institutions that match your academic goals, interests, and budget. We provide comprehensive support throughout the application process.',
    image: '/home2/univercity.png',
  },
  {
    title: 'Visa Guidance and Application Support',
    description:
      'Visa application process can be complex and stressful. Our dedicated team offers personalized assistance to help you understand the visa requirements for your chosen destination. We guide you through each step of the application process, from gathering necessary documentation to filling out forms, ensuring that you meet all deadlines with regulations.',
    image: '/home2/visaappp.png',
  },
  {
    title: 'Scholarship Assistance',
    description:
      'Education can be costly, but our scholarship assistance service helps lighten the financial burden. We conduct thorough research to identify suitable scholarships and funding opportunities. Our experts guide you in crafting compelling scholarship applications that highlight your strengths and increase your chances of securing financial support for your studies.',
    image: '/home2/scollership.png',
  },
  {
    title: 'Pre-Departure and Post-Arrival Support',
    description:
      'Preparing to study abroad involves more than just academics. We provide essential pre-departure briefings that cover cultural and practical tips for adjusting to life in a new country. After you arrive, our post-arrival support ensures that you have access to resources and guidance as you settle into your new environment, helping you adapt smoothly to student life.',
    image: '/home2/pre-deparcher.png',
  },
]

const courseTypes = [
  {
    title: 'Foundation',
    icon: BookOpen,
    eligibility: 'After O/Ls',
    duration: '1 Year',
    description: 'Prepares you for direct entry to university degrees.'
  },
  {
    title: 'Undergraduate',
    icon: GraduationCap,
    eligibility: 'After A/Ls',
    duration: '3-4 Years',
    description: 'Standard Bachelor\'s degree courses.'
  },
  {
    title: 'Top-Up',
    icon: TrendingUp,
    eligibility: 'After HND',
    duration: '1 Year',
    description: 'Upgrade your diploma to a full honors degree.'
  },
  {
    title: 'Postgraduate',
    icon: Award,
    eligibility: 'After Degree',
    duration: '1 Year',
    description: 'Master\'s programs to advance your career.'
  },
  {
    title: 'Research',
    icon: Search,
    eligibility: 'After PG/Master\'s',
    duration: '1-2 Years',
    description: 'MPhil, PhD and high-level academic research.'
  }
]



function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let startTimestamp: number | null = null

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease out

            setCount(Math.floor(easeProgress * target))

            if (progress < 1) {
              window.requestAnimationFrame(step)
            }
          }

          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase text-[#d7a23a]">{children}</p>
  )
}

function getDefaultHomeSection<Type extends CmsSection['type']>(type: Type) {
  return defaultHomePageContent.sections.find(
    section => section.type === type
  ) as Extract<CmsSection, { type: Type }> | undefined
}

function getCountdownTimeLeft(targetTime: number) {
  const safeTargetTime = Number.isFinite(targetTime) ? targetTime : Date.now()
  const remaining = Math.max(safeTargetTime - Date.now(), 0)

  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    mins: Math.floor((remaining / 60000) % 60),
    secs: Math.floor((remaining / 1000) % 60),
  }
}

function ScholarshipOfferSection({
  section,
}: {
  section: HomeScholarshipOfferSectionData
}) {
  const slides = ((section as any).offers?.length ? (section as any).offers : [section]) as HomeScholarshipOfferSectionData[]
  const [activeSlide, setActiveSlide] = useState(0)
  const [slideTick, setSlideTick] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const activeOffer = slides[activeSlide] || section

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = window.setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [slides.length, slideTick])

  const goToOffer = (index: number) => {
    setActiveSlide(index)
    setSlideTick(prev => prev + 1)
  }

  const showPrevOffer = () => {
    setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))
    setSlideTick(prev => prev + 1)
  }

  const showNextOffer = () => {
    setActiveSlide(prev => (prev + 1) % slides.length)
    setSlideTick(prev => prev + 1)
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current || slides.length <= 1) return
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    touchStart.current = null

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return
    if (deltaX < 0) showNextOffer()
    else showPrevOffer()
  }

  return (
    <section className="relative overflow-hidden bg-[#061331] px-4 py-6 text-white sm:px-6 sm:py-12 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-18"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(215,162,58,0.16) 1px, transparent 1px), linear-gradient(rgba(215,162,58,0.08) 1px, transparent 1px)",
          backgroundSize: '72px 72px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(215,162,58,0.18),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(255,255,255,0.10),transparent_24%),linear-gradient(115deg,rgba(0,0,0,0.38),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
      <div
        key={activeSlide}
        onTouchStart={event => {
          const touch = event.touches[0]
          touchStart.current = { x: touch.clientX, y: touch.clientY }
        }}
        onTouchEnd={handleTouchEnd}
        className="grid items-center gap-5 transition-all duration-500 ease-out sm:gap-8 lg:grid-cols-[1.25fr_0.85fr]"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d7a23a] px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#061331] sm:gap-2 sm:px-4 sm:py-2 sm:text-[11px]">
              <Award className="h-3 w-3 fill-[#061331] sm:h-3.5 sm:w-3.5" />
              {activeOffer.badgeText}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d7a23a]/35 bg-white/8 px-3 py-1.5 text-[10px] font-bold text-[#f3d79c] sm:gap-2 sm:py-2 sm:text-xs">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {activeOffer.intakeLabel}
            </span>
          </div>

          <h2 className="mt-4 max-w-4xl text-2xl font-black leading-[1.08] tracking-tight text-white sm:mt-7 sm:text-5xl lg:text-[64px]">
            {activeOffer.titlePrefix}{' '}
            <span className="text-[#d7a23a]">{activeOffer.scholarshipAmount}</span>{' '}
            {activeOffer.titleSuffix}
          </h2>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">
            {activeOffer.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs font-bold text-white/82 sm:mt-7 sm:gap-3 sm:text-sm">
            {activeOffer.featureChips.map(item => {
              const Icon = scholarshipOfferIconMap[item.icon] || Award

              return (
                <span key={item.text} className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#d7a23a]/30 bg-[#d7a23a]/15 text-[#d7a23a] sm:h-8 sm:w-8">
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </span>
                  {item.text}
                </span>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={activeOffer.ctaHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#d7a23a] px-6 text-sm font-black text-[#061331] shadow-[0_20px_42px_rgba(215,162,58,0.18)] transition hover:-translate-y-0.5 hover:bg-[#e4b85d] sm:min-h-14 sm:gap-3 sm:px-8 sm:text-base"
            >
              {activeOffer.ctaLabel}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            {activeOffer.note ? (
              <span className="text-center text-xs font-medium text-white/38 sm:text-left sm:text-sm">{activeOffer.note}</span>
            ) : null}
          </div>
        </div>

        <ScholarshipOfferCountdownCard
          key={`${activeSlide}-${activeOffer.countdownTarget}`}
          offer={activeOffer}
        />
      </div>
      {slides.length > 1 ? (
        <>
        <div className="mt-4 flex items-center justify-center gap-2 sm:hidden" aria-label={`Offer ${activeSlide + 1} of ${slides.length}`}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToOffer(index)}
              aria-label={`Show offer ${index + 1}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-7 bg-[#d7a23a]' : 'w-2 bg-white/30'}`}
            />
          ))}
        </div>
        <div className="mt-8 hidden flex-wrap items-center justify-center gap-4 sm:flex">
          <button
            type="button"
            onClick={showPrevOffer}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a23a]/35 bg-white/8 text-[#d7a23a] transition hover:bg-[#d7a23a] hover:text-[#061331]"
            aria-label="Previous offer"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToOffer(index)}
                aria-label={`Show offer ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === index ? 'w-9 bg-[#d7a23a]' : 'w-2.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={showNextOffer}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a23a]/35 bg-white/8 text-[#d7a23a] transition hover:bg-[#d7a23a] hover:text-[#061331]"
            aria-label="Next offer"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        </>
      ) : null}
      </div>
    </section>
  )
}

function ScholarshipOfferCountdownCard({
  offer,
}: {
  offer: HomeScholarshipOfferSectionData
}) {
  const targetTime = new Date(offer.countdownTarget).getTime()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    setTimeLeft(getCountdownTimeLeft(targetTime))

    const interval = window.setInterval(() => {
      setTimeLeft(getCountdownTimeLeft(targetTime))
    }, 1000)

    return () => window.clearInterval(interval)
  }, [targetTime])

  const countdown = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.mins },
    { label: 'Secs', value: timeLeft.secs },
  ]

  return (
    <div className="hidden rounded-[28px] border border-[#d7a23a]/20 bg-white/7 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-md md:block md:p-8">
      <div className="mb-6 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#d7a23a]">
        <Clock className="h-4 w-4" />
        Intake Opens In
      </div>

      <div className="grid grid-cols-4 gap-3">
        {countdown.map(item => (
          <div key={item.label} className="text-center">
            <div className="rounded-2xl border border-[#d7a23a]/25 bg-[#d7a23a]/14 px-2 py-4 text-3xl font-black leading-none text-[#d7a23a] sm:text-4xl">
              {String(item.value).padStart(2, '0')}
            </div>
            <span className="mt-2 block text-[10px] font-black uppercase tracking-wider text-white/42">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="my-7 h-px bg-white/10" />

      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/42">
          {offer.benefitsTitle}
        </p>
        <ul className="mt-4 space-y-3 text-sm font-medium text-white/68">
          {offer.benefits.map(item => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d7a23a]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 rounded-2xl border border-dashed border-[#d7a23a]/30 bg-[#d7a23a]/9 px-5 py-4 text-center text-sm font-black text-[#d7a23a]">
        {offer.urgencyText}
      </div>
    </div>
  )
}

function HomeUniversitiesSlider({
  universities,
}: {
  universities: any[]
}) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const slideWidthRef = useRef(1)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const measureSlides = () => {
      const firstCard = slider.querySelector<HTMLElement>('[data-university-slide]')
      slideWidthRef.current = firstCard ? firstCard.getBoundingClientRect().width + 16 : slider.clientWidth
    }
    const updateActiveIndex = () => {
      setActiveIndex(Math.round(slider.scrollLeft / Math.max(slideWidthRef.current, 1)))
    }

    measureSlides()
    updateActiveIndex()
    slider.addEventListener('scroll', updateActiveIndex, { passive: true })
    const resizeObserver = new ResizeObserver(() => {
      measureSlides()
      updateActiveIndex()
    })
    resizeObserver.observe(slider)

    return () => {
      slider.removeEventListener('scroll', updateActiveIndex)
      resizeObserver.disconnect()
    }
  }, [universities.length])

  const scroll = (direction: 'prev' | 'next') => {
    const slider = sliderRef.current
    if (!slider) return
    slider.scrollBy({
      left: direction === 'next' ? slider.clientWidth * 0.9 : -slider.clientWidth * 0.9,
      behavior: 'smooth',
    })
  }

  const scrollToSlide = (index: number) => {
    const slider = sliderRef.current
    const target = slider?.querySelector<HTMLElement>(`[data-university-slide="${index}"]`)
    if (!slider || !target) return
    slider.scrollTo({ left: target.offsetLeft - slider.offsetLeft, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll('prev')}
        className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d7a23a]/40 bg-white text-[#081638] shadow-lg transition hover:bg-[#081638] hover:text-white md:flex"
        aria-label="Previous universities"
      >
        <ArrowRight className="h-4 w-4 rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => scroll('next')}
        className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d7a23a]/40 bg-white text-[#081638] shadow-lg transition hover:bg-[#081638] hover:text-white md:flex"
        aria-label="Next universities"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
      <div className="mb-5 flex justify-end gap-2 md:hidden">
        <button
          type="button"
          onClick={() => scroll('prev')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a23a]/40 bg-white text-[#081638] shadow-sm transition hover:bg-[#081638] hover:text-white"
          aria-label="Previous universities"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scroll('next')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a23a]/40 bg-white text-[#081638] shadow-sm transition hover:bg-[#081638] hover:text-white"
          aria-label="Next universities"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div ref={sliderRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {universities.map((univ: any, index) => (
          <div
            key={univ.name}
            data-university-slide={index}
            className="group relative flex min-w-[82%] snap-start flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,19,49,0.12)] sm:min-w-[48%] lg:min-w-[24%]"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={univ.coverImage}
                alt={`${univ.name} Campus`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
              <span className="absolute top-4 right-4 bg-[#d7a23a] text-[#061331] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm z-10">
                Rank {univ.worldRank}
              </span>
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                <UniversityLogo
                  name={univ.name}
                  src={univ.logo}
                  className="h-10 w-10 rounded-xl border border-slate-200 text-sm shadow-sm"
                />
                <div className="text-white">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-200 leading-none">Est. {univ.established}</p>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between grow text-left">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2">
                  <span>{univ.location}, {univ.country}</span>
                </div>
                <h3 className="text-lg font-black text-[#081638] group-hover:text-[#d7a23a] transition-colors duration-300 line-clamp-1 mb-2">
                  {univ.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-3">
                  {univ.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 mt-auto">
                <div className="text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Students</span>
                  <span className="text-xs font-black text-[#081638]">{univ.students}</span>
                </div>
                <Link
                  href={`/universities/${univ.slug || encodeURIComponent(univ.name)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] text-[11px] font-black tracking-wide transition-all shadow-sm"
                >
                  View Profile
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {universities.length > 1 ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {universities.map((univ: any, index) => (
            <button
              key={`${univ.name}-indicator`}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Show ${univ.name}`}
              className={`h-2.5 rounded-full transition-all ${
                Math.min(activeIndex, universities.length - 1) === index
                  ? 'w-9 bg-[#d7a23a]'
                  : 'w-2.5 bg-[#081638]/18 hover:bg-[#081638]/35'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function getHomeHeroSection(content: CmsPageContent): HomeHeroSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeHero' && section.enabled
    ) as HomeHeroSectionData | undefined
  ) || (getDefaultHomeSection('homeHero') as HomeHeroSectionData)
}

function getHomeProgramSection(content: CmsPageContent): HomeProgramSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeProgram' && section.enabled
    ) as HomeProgramSectionData | undefined
  ) || (getDefaultHomeSection('homeProgram') as HomeProgramSectionData)
}

function getHomeScholarshipOfferSection(content: CmsPageContent): HomeScholarshipOfferSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeScholarshipOffer' && section.enabled
    ) as HomeScholarshipOfferSectionData | undefined
  ) || (getDefaultHomeSection('homeScholarshipOffer') as HomeScholarshipOfferSectionData)
}

function getHomeDestinationsSection(content: CmsPageContent): HomeDestinationsSectionData {
  const section = (
    content.sections.find(
      section => section.type === 'homeDestinations' && section.enabled
    ) as HomeDestinationsSectionData | undefined
  ) || (getDefaultHomeSection('homeDestinations') as HomeDestinationsSectionData)

  return section
}

function getHomeWhyChooseUsSection(content: CmsPageContent): HomeWhyChooseUsSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeWhyChooseUs' && section.enabled
    ) as HomeWhyChooseUsSectionData | undefined
  ) || (getDefaultHomeSection('homeWhyChooseUs') as HomeWhyChooseUsSectionData)
}

function getHomeServicesSection(content: CmsPageContent): HomeServicesSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeServices' && section.enabled
    ) as HomeServicesSectionData | undefined
  ) || (getDefaultHomeSection('homeServices') as HomeServicesSectionData)
}

function getHomeUniversitiesSection(content: CmsPageContent): HomeUniversitiesSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeUniversities' && section.enabled
    ) as HomeUniversitiesSectionData | undefined
  ) || (getDefaultHomeSection('homeUniversities') as HomeUniversitiesSectionData)
}

function getHomeStatsSection(content: CmsPageContent): HomeStatsSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeStats' && section.enabled
    ) as HomeStatsSectionData | undefined
  ) || (getDefaultHomeSection('homeStats') as HomeStatsSectionData)
}

function getHomeTestimonialsSection(content: CmsPageContent): HomeTestimonialsSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeTestimonials' && section.enabled
    ) as HomeTestimonialsSectionData | undefined
  ) || (getDefaultHomeSection('homeTestimonials') as HomeTestimonialsSectionData)
}

function getHomeAmbassadorsSection(content: CmsPageContent): HomeAmbassadorsSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeAmbassadors' && section.enabled
    ) as HomeAmbassadorsSectionData | undefined
  ) || (getDefaultHomeSection('homeAmbassadors') as HomeAmbassadorsSectionData)
}

function getHomeSuccessStoriesSection(content: CmsPageContent): HomeSuccessStoriesSectionData {
  const section = content.sections.find(
    section => section.type === 'homeSuccessStories' && section.enabled
  ) as HomeSuccessStoriesSectionData | undefined

  if (section) return section

  return getDefaultHomeSection('homeSuccessStories') as HomeSuccessStoriesSectionData
}

function getHomeFaqsSection(content: CmsPageContent): HomeFaqsSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeFaqs' && section.enabled
    ) as HomeFaqsSectionData | undefined
  ) || (getDefaultHomeSection('homeFaqs') as HomeFaqsSectionData)
}

function getHomeBlogSection(content: CmsPageContent): HomeBlogSectionData {
  return (
    content.sections.find(
      section => section.type === 'homeBlog' && section.enabled
    ) as HomeBlogSectionData | undefined
  ) || (getDefaultHomeSection('homeBlog') as HomeBlogSectionData)
}

interface NextLevelHomepageProps {
  content?: CmsPageContent
  includeFooter?: boolean
  renderHero?: boolean
  renderProgram?: boolean
  renderScholarshipOffer?: boolean
  renderDestinations?: boolean
  renderWhyChooseUs?: boolean
  renderServices?: boolean
  renderUniversities?: boolean
  renderStats?: boolean
  renderTestimonials?: boolean
  renderAmbassadors?: boolean
  renderSuccessStories?: boolean
  renderFaqs?: boolean
  renderBlog?: boolean
  renderStaticSections?: boolean
  showAmbassadorViewAll?: boolean
  showSuccessStoriesViewAll?: boolean
  ambassadorSectionBottomGap?: boolean
}

export default function NextLevelHomepage({
  content = defaultHomePageContent,
  includeFooter = true,
  renderHero = true,
  renderProgram = true,
  renderScholarshipOffer = true,
  renderDestinations = true,
  renderWhyChooseUs = true,
  renderServices = true,
  renderUniversities = true,
  renderStats = true,
  renderTestimonials = true,
  renderAmbassadors = true,
  renderSuccessStories = true,
  renderFaqs = true,
  renderBlog = true,
  renderStaticSections = true,
  showAmbassadorViewAll = true,
  showSuccessStoriesViewAll = true,
  ambassadorSectionBottomGap = false,
}: NextLevelHomepageProps) {
  const heroSection = getHomeHeroSection(content)
  const programSection = getHomeProgramSection(content)
  const scholarshipOfferSection = getHomeScholarshipOfferSection(content)
  const destinationsSection = getHomeDestinationsSection(content)
  const whyChooseUsSection = getHomeWhyChooseUsSection(content)
  const servicesSection = getHomeServicesSection(content)
  const universitiesSection = getHomeUniversitiesSection(content)
  const statsSection = getHomeStatsSection(content)
  const testimonialsSection = getHomeTestimonialsSection(content)
  const ambassadorsSection = getHomeAmbassadorsSection(content)
  const successStoriesSection = getHomeSuccessStoriesSection(content)
  const [activeSuccessStory, setActiveSuccessStory] = useState<
    HomeSuccessStoriesSectionData['videos'][number] | null
  >(null)
  const faqsSection = getHomeFaqsSection(content)
  const blogSection = getHomeBlogSection(content)
  const pinnedHomeServices =
    servicesSection.services && servicesSection.services.length > 0
      ? servicesSection.services.map((service, index) => {
          const matchingService = serviceDetails.find(
            detail => detail.title === service.title
          )

          return {
            title: service.title,
            description: service.description,
            image: service.image,
            number:
              matchingService?.number ||
              String(index + 1).padStart(2, '0'),
            stats: matchingService?.stats || '100% Free',
            href: matchingService
              ? `/services/${matchingService.slug}`
              : '/services',
          }
        })
      : approvedHomeServices

  return (
    <div className="bg-white text-[#081638]">
      <main>
        {renderHero && <section className="relative overflow-visible bg-[#E9EFF6] text-[#061331] pt-40 md:pt-20  lg:pt-28  px-4 sm:px-8 ">
          {/* Subtle light background matrix dots & world map overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#081638 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-center bg-no-repeat bg-cover mix-blend-multiply" style={{ backgroundImage: "url('/visa/map.png')" }}></div>

          {/* Decorative Dashed Circles */}
          <div className="absolute -bottom-37.5 -left-37.5 w-125 h-125 rounded-full border border-[#081638]/5 border-dashed pointer-events-none"></div>
          <div className="absolute -bottom-25 -left-25 w-100 h-100 rounded-full border border-[#081638]/3 border-dashed pointer-events-none"></div>
          <div className="absolute -top-50 -right-50 w-150 h-150 rounded-full border border-[#081638]/5 border-dashed pointer-events-none"></div>

          <div className="relative z-30 mx-auto grid max-w-6xl items-center gap-8 lg:gap-12 lg:grid-cols-[1.15fr_0.95fr]">
            {/* Left Column */}
            <div className="flex flex-col justify-center z-10 text-left px-2">
              <h1 className="text-4xl sm:text-5xl text-[#081638]  lg:text-[56px] font-black   leading-[1.1] tracking-tight">
                <span className="text-[#081638]  block mb-1">{heroSection.titleLine1}</span>
                {heroSection.titleLine2}
                <span className=" text-[#d7a23a] block mb-1">{heroSection.highlightedTitle}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#59616f] font-medium">
                {heroSection.description}
              </p>

              {/* Interactive consultation lookup and action selectors */}
              <VisaConsultationForm />
            </div>

            {/* Right Column */}
            <div className="relative  flex items-center justify-center  w-full overflow-visible">

              {/* Main Image Box */}
              <div className="relative  z-6 w-70 h-100 sm:w-85 py-4 sm:h-112.5 lg:w-120 lg:h-150 rounded-2xl overflow-hidden    transition-all duration-500 hover:scale-[1.00]">
                <Image
                  src={heroSection.image.src}
                  alt={heroSection.image.alt}
                  fill
                  sizes="(max-width: 639px) 280px, (max-width: 1023px) 340px, 480px"
                  className="object-contain  object-top hover:scale-100 transition-transform duration-700"
                  priority
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl mb-4 sm:mb-0 ">
            {/* Features Highlight Grid */}
            <div className="grid  gap-3 rounded-lg bg-white p-4 text-[#081638]  sm:grid-cols-2 lg:grid-cols-4">
              {heroSection.features.map(feature => {
                const Icon = heroIconMap[feature.icon] || Headphones
                return (
                  <article
                    key={feature.title}
                    className="group flex min-h-26.25 items-center gap-4 rounded-md border border-[#ece8df] bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(6,19,49,0.08)] hover:border-[#d7a23a]/50"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#061331] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d7a23a] group-hover:text-[#061331]">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold leading-5 transition-colors duration-300 group-hover:text-[#d7a23a]">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[#59616f]">
                        {feature.text}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
          {/* <FlyingAeroplane /> */}
        </section>}

        {renderProgram && (
        <section id="programs" className="relative bg-white py-10  overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute hidden md:flex left-10 bottom-8 -translate-y-1/2"
          >
            <div className="h-32 w-16 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] bg-size-[1rem_1rem]" />
          </div>
          <div
            aria-hidden="true"
            className="absolute right-4 top-20 -translate-y-1/2"
          >
            <div className="h-16 w-32 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] bg-size-[1rem_1rem]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
            <div className="relative min-h-90 sm:min-h-107.5">
              <div className="absolute left-0 top-0 h-48 w-72 overflow-hidden rounded-lg shadow-[0_16px_42px_rgba(8,22,56,0.15)] border-2 border-transparent transition-all duration-300 hover:scale-105 hover:z-20 hover:border-[#d7a23a]">
	                <Image
	                  src={programSection.images[0].src}
	                  alt={programSection.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="absolute right-0 -top-10 h-56 w-72 translate-y-[50%] overflow-hidden rounded-lg shadow-[0_16px_42px_rgba(8,22,56,0.15)] border-2 border-transparent transition-all duration-300 hover:scale-105 hover:z-20 hover:border-[#d7a23a]">
	                <Image
	                  src={programSection.images[1].src}
	                  alt={programSection.images[1].alt}
                  fill
                  className="object-cover"
                  sizes="384px"
                />
              </div>
              <div className="absolute bottom-0 -right-24 h-48 w-80 -translate-x-1/2 overflow-hidden rounded-lg shadow-[0_16px_42px_rgba(8,22,56,0.15)] border-2 border-transparent transition-all duration-300 hover:scale-105 hover:z-20 hover:border-[#d7a23a]">
	                <Image
	                  src={programSection.images[2].src}
	                  alt={programSection.images[2].alt}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#061331] px-8 py-5 text-center shadow-[0_16px_36px_rgba(6,19,49,0.22)]">
                <p
                  className="text-xl font-bold leading-6 text-white"
                  style={{ fontFamily: 'Farro, sans-serif' }}
                >
	                  {programSection.badge.line1}
	                  <br />
	                  {programSection.badge.line2}
                </p>
              </div>
            </div>

            <div>
              <Eyebrow>{programSection.eyebrow}</Eyebrow>
              <h2
                className="mt-3 max-w-lg text-3xl font-bold  text-[#081638] sm:text-4xl"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                {programSection.title}
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-7 text-[#59616f] sm:text-base">
                {programSection.description}
              </p>

              <ul className="mt-3 space-y-1">
                {programSection.benefits.map(benefit => (
                  <li
                    key={benefit}
                    className="flex items-start gap-1 text-sm font-medium text-[#273149]"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-[#061331] text-white" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

	              <Link
	                href="/courses"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-[#061331] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d2459]"
              >
	                {programSection.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        )}

        {renderScholarshipOffer && (
          <ScholarshipOfferSection section={scholarshipOfferSection} />
        )}

        {renderDestinations && (
        <section className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Title Section */}
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-extrabold text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                {destinationsSection.title}
              </h2>
              {/* Short thick accent line */}
              <div className="mt-3 h-1.25 w-12 bg-[#d7a23a] rounded" />
              <p className="mt-5 text-sm leading-relaxed text-[#59616f] sm:text-base font-medium">
                {destinationsSection.description}
              </p>
            </div>

            {/* Country Cards Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {destinationsSection.destinations.map((country) => (
                <Link
                  key={country.name}
                  href={destinationHrefMap[country.name] || `/courses?search=${encodeURIComponent(country.name)}`}
                  className="group w-full overflow-hidden rounded-2xl shadow-[0_12px_36px_rgba(8,22,56,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(8,22,56,0.15)] cursor-pointer"
                  style={{ position: 'relative', height: '300px' }}
                >
                  {country.image?.trim() ? (
                    <Image
                      src={country.image}
                      alt={country.alt || country.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-300" aria-hidden="true" />
                  )}
                  {/* Dark overlay with transition */}
                  <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/45" />

                  {/* Country Name Centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white tracking-wide drop-shadow-md text-center transition-transform duration-500 group-hover:scale-105">
                      {country.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        )}

        {renderWhyChooseUs && (
        <section className="bg-[#061331] py-10 text-white ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="relative inline-block pb-2.5 mb-2">
                <Eyebrow>{whyChooseUsSection.eyebrow}</Eyebrow>
                <svg
                  className="absolute left-0 bottom-0 w-full h-2 text-[#d7a23a] pointer-events-none"
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
              </div>
              <h2
                className="mt-1 text-3xl font-bold leading-tight sm:text-4xl"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                {whyChooseUsSection.title}
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-4">
              {whyChooseUsSection.items.map(item => {
                const Icon = whyChooseUsIconMap[item.icon] || Headphones
                return (
                  <article
                    key={item.title}
                    className="group flex gap-4 border-white/20 p-3 rounded-lg transition-all duration-300 hover:bg-white/5 lg:border-r lg:pr-6 lg:last:border-r-0 hover:-translate-y-1"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7a23a] text-[#d7a23a] transition-all duration-300 group-hover:bg-[#d7a23a] group-hover:text-[#061331] group-hover:rotate-12">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-bold transition-colors duration-300 group-hover:text-[#d7a23a]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        {item.text}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
        )}

        {renderServices && (
        <section className="bg-white py-10 ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Eyebrow>{servicesSection.eyebrow}</Eyebrow>
              <h2
                className="mt-3 text-3xl font-bold leading-tight sm:text-4xl"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                {servicesSection.title}
              </h2>
            </div>
            <div className="mt-10">
              <ServicesCarousel services={pinnedHomeServices} />
            </div>
          </div>
        </section>
        )}

        {/* Featured Partner Universities Section */}
        {renderUniversities && (
        <section className="bg-slate-50 border-y border-[#ece8df]/40 py-10 relative overflow-hidden">
          <div aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30">
            <div className="h-56 w-28 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] bg-size-[1.25rem_1.25rem]" />
          </div>
          <div aria-hidden="true" className="absolute right-0 top-10 opacity-30">
            <div className="h-28 w-56 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] bg-size-[1.25rem_1.25rem]" />
          </div>

          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl text-left">
                <Eyebrow>{universitiesSection.eyebrow}</Eyebrow>
                <h2
                  className="mt-3 text-3xl font-bold leading-tight text-[#081638] sm:text-4xl"
                  style={{ fontFamily: 'Farro, sans-serif' }}
                >
                  {universitiesSection.title} <span className="text-[#d7a23a]">{universitiesSection.highlightedTitle}</span>
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#59616f] sm:text-base">
                  {universitiesSection.description}
                </p>
              </div>
              <Link
                href={universitiesSection.cta.href}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-md bg-[#061331] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d7a23a] hover:text-[#061331] shadow-md lg:self-start"
              >
                {universitiesSection.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <HomeUniversitiesSlider
              universities={
                universitiesSection.universities && universitiesSection.universities.length > 0
                  ? universitiesSection.universities
                  : Object.values(universitiesData).slice(0, 8)
              }
            />

          </div>
        </section>
        )}

        {renderStats && (
        <section className="bg-[#031336] py-10">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
            {statsSection.stats.map(stat => {
              const Icon = statsIconMap[stat.icon] || UsersRound
              return (
                <article
                  key={stat.label}
                  className="group flex items-center justify-center gap-4 rounded-lg border-r border-white/10 bg-transparent px-5 py-6 transition-all duration-300 hover:bg-white/5 last:border-r-0"
                >
                  <Icon className="h-9 w-9 text-[#d7a23a] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-360" />
                  <div>
                    <p className="text-3xl font-bold text-[#d7a23a] transition-all duration-300 group-hover:scale-105 origin-left">
                      <AnimatedCounter target={stat.targetValue} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs font-semibold text-white/80 transition-colors duration-300 group-hover:text-white">
                      {stat.label}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
        )}

        {/* Testimonials, Ambassador & Student Life Container */}
        {renderTestimonials && (
        <section id="testimonials" className=" py-10  overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Eyebrow>{testimonialsSection.eyebrow}</Eyebrow>
              <h2
                className="mt-3 text-3xl font-bold leading-tight text-[#081638] sm:text-4xl"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                {testimonialsSection.title}
              </h2>
            </div>

            <StudentTestimonialsCarousel testimonials={testimonialsSection.testimonials} />
          </div>
        </section>
        )}

        {/* Student Ambassador & Life Combined Section */}
        {renderAmbassadors && (
        <section id="ambassadors" className={`bg-white scroll-mt-24 ${ambassadorSectionBottomGap ? 'pb-10 sm:pb-14' : ''}`}>
          {/* Chat to a Student Ambassador Subsection */}
          <div className="mb-5 bg-[#081638] py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                    {ambassadorsSection.ambassadorTitle}
                  </h2>
                  <div className="mt-3 h-1.5 w-16 rounded-full bg-[#d7a23a]" />
                  <p className="mt-3 text-sm font-semibold text-white/80 sm:text-base">
                    {ambassadorsSection.ambassadorDescription}
                  </p>
                </div>
                {showAmbassadorViewAll && (
                  <Link
                    href="/testimonial#ambassadors"
                    className="hidden items-center gap-2 rounded-md px-4 py-2 text-sm font-bold text-white transition hover:text-[#d7a23a] sm:inline-flex"
                  >
                    View All Ambassadors
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {ambassadorsSection.ambassadors.map((ambassador) => (
                  <div
                    key={ambassador.name}
                    className="bg-white border border-[#ece8df] rounded-3xl p-4 flex flex-col items-center justify-between text-center shadow-[0_12px_34px_rgba(8,22,56,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex flex-col items-center w-full">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                        <img
                          src={ambassador.image}
                          alt={ambassador.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-base font-bold text-[#081638] mb-2">
                        {ambassador.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500 mb-2 block">
                        {ambassador.university}
                      </span>
                      <span className="bg-[#eff6ff] text-[#1e40af] text-[11px] font-bold px-3.5 py-1 rounded-full mb-3 max-w-40 truncate block">
                        {ambassador.program}
                      </span>
                    </div>
                    <Link
                      href={ambassador.link}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#0f54b6] hover:text-[#0b3e87] transition-colors"
                    >
                      Chat with me <span className="font-semibold">&gt;</span>
                  </Link>
                </div>
              ))}
              </div>
              {showAmbassadorViewAll && (
                <div className="mt-8 flex justify-center sm:hidden">
                  <Link
                    href="/testimonial#ambassadors"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:text-[#d7a23a]"
                  >
                    View All Ambassadors
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
        )}

        {/* Success Story Videos Subsection */}
        {renderSuccessStories && (
        <section id="success-stories" className="bg-white py-10 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-5">

                <div>
                  <h2 className="text-3xl font-extrabold text-[#081638] tracking-tight sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
                  {successStoriesSection.title}
                </h2>
                <div className="mt-3 h-1.5 w-16 rounded-full bg-[#d7a23a]" />
                <p className="mt-1 text-sm text-[#59616f] font-semibold sm:text-base">
                  {successStoriesSection.description}
                </p>
                </div>
                {showSuccessStoriesViewAll && (
                <div>
                <Link
                  href="/testimonial#success-stories"
                  className="hidden items-center gap-2 rounded-md px-4 py-2 text-sm font-bold text-[#081638] transition hover:text-[#d7a23a] sm:inline-flex"
                >
                  View All Success Stories
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                </div>
                )}
              </div>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {successStoriesSection.videos.map((video) => {
                  const isYoutube = video.mediaType === 'youtube'
                  const embedUrl = isYoutube ? getYoutubeEmbedUrl(video.youtubeUrl) : ''
                  const thumbnail =
                    (isYoutube ? getYoutubeThumbnailUrl(video.youtubeUrl) : '') ||
                    video.thumbnail ||
                    '/home2/happy-team.png'

                  return (
                    <div
                      key={`${video.studentName}-${thumbnail}-${video.youtubeUrl || ''}`}
                      className="bg-white rounded-3xl border border-[#ece8df] overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
                    >
                      {embedUrl ? (
                        <button
                          type="button"
                          onClick={() => setActiveSuccessStory(video)}
                          className="group relative h-64 w-full cursor-pointer overflow-hidden bg-slate-100"
                          aria-label={`Open ${video.studentName} success story video`}
                        >
                          <img
                            src={thumbnail}
                            alt={`${video.studentName} success story`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/35">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full  text-[#081638] shadow-lg transition-transform duration-300 group-hover:scale-110">
                              <CirclePlay className="h-11 w-11 text-white" />
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                          <img
                            src={thumbnail}
                            alt={`${video.studentName} success story`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="p-5 text-left">
                        <div className="flex items-center gap-2">
                          <img
                            src={video.studentAvatar}
                            alt={video.studentName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs font-semibold text-[#59616f]">
                            {video.studentName}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {showSuccessStoriesViewAll && (
                <div className="mt-8 flex justify-center sm:hidden">
                  <Link
                    href="/testimonial#success-stories"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 px-5 py-3 text-sm font-bold text-[#081638] transition hover:text-[#d7a23a]"
                  >
                    View All Success Stories
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
        </section>
        )}

        {activeSuccessStory && getYoutubeEmbedUrl(activeSuccessStory.youtubeUrl) && (
          <div
            className="fixed inset-0 z-100 flex items-center justify-center  bg-black/72 px-4 py-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeSuccessStory.studentName} success story`}
            onClick={() => setActiveSuccessStory(null)}
          >
            <div
              className="relative max-h-[88vh] w-full max-w-107.5 overflow-hidden rounded-3xl bg-black shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
              onClick={event => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveSuccessStory(null)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/60"
                aria-label="Close success story video"
              >
                <X className="h-7 w-7" />
              </button>

              <div className="relative aspect-9/16 rounded-2xl max-h-[88vh] w-full bg-black">
                <iframe
                  src={getYoutubeEmbedUrl(activeSuccessStory.youtubeUrl)}
                  title={`${activeSuccessStory.studentName} success story video`}
                  className="h-full w-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {renderFaqs && <FAQSection section={faqsSection} />}

        {renderBlog && (
        <section className="bg-white py-10 ">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>{blogSection.eyebrow}</Eyebrow>
                <div className="mt-3 h-1.5 w-16 rounded-full bg-[#d7a23a]" />
                <h2
                  className="mt-3 text-3xl font-bold leading-tight text-[#081638] sm:text-4xl"
                  style={{ fontFamily: 'Farro, sans-serif' }}
                >
                  {blogSection.title}
                </h2>
              </div>
              <Link
                href={blogSection.cta.href}
                className="hidden items-center gap-2 text-sm font-bold text-[#061331] transition hover:text-[#d7a23a] sm:inline-flex"
              >
                {blogSection.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {blogSection.posts.map((blog, index) => (
                <article
                  key={`${blog.title}-${index}`}
                  className="overflow-hidden rounded-3xl border border-[#ece8df] bg-white shadow-[0_12px_34px_rgba(8,22,56,0.06)] transition-all duration-300 hover:scale-[1.025] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(8,22,56,0.12)] hover:border-[#d7a23a]/40"
                >
                  <div className="relative h-40">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-2 text-xs text-[#7a8190]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {blog.date}
                    </p>
                    <h3 className="mt-3 min-h-14.5 text-sm font-bold leading-5 text-[#081638]">
                      {blog.title}
                    </h3>
                    <Link
                      href={blog.href}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#061331] transition hover:text-[#d7a23a]"
                    >
                      Read More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex justify-center sm:hidden">
              <Link
                href={blogSection.cta.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 px-5 py-3 text-sm font-bold text-[#061331] transition hover:text-[#d7a23a]"
              >
                {blogSection.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        )}


      </main>

      {includeFooter && <Footer />}
    </div>
  )
}
