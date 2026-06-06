'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ServicesCarousel from './ServiceSection'
import StudentTestimonialsCarousel from './StudentTestimonialsCarousel'
import { ArrowRight, Award, BookOpenCheck, Building2, CalendarDays, CheckCircle2, ChevronDown, CirclePlay, FileCheck2, Globe2, GraduationCap, Headphones, Mail, MapPin, Menu, Phone, PhoneCall, Plane, ShieldCheck, Star, UsersRound, BookOpen, TrendingUp, Search, Clock, UserCheck, Lock } from 'lucide-react'
import Footer from '../layout/footer'
// import FlyingAeroplane from './FlyingAeroplane'
import FAQSection from './FAQSection'
import VisaConsultationForm from './VisaConsultationForm'
import { universitiesData } from '@/lib/mockData'



const heroFeatures = [
  {
    icon: Headphones,
    title: 'Free Visa Consultation',
    text: '1-on-1 guidance from visa experts.',
  },
  {
    icon: FileCheck2,
    title: 'End-to-End Support',
    text: 'From application to arrival, we are with you.',
  },
  {
    icon: GraduationCap,
    title: '1000+ Students Placed',
    text: 'Trusted by students worldwide.',
  },
  {
    icon: ShieldCheck,
    title: 'High Success Rate',
    text: 'We maximize your chances of success.',
  },
]

const programBenefits = [
  'Wide range of programs and universities',
  'Personalized career counseling',
  'Scholarship & application assistance',
  'Test preparation support',
]

const whyChooseUs = [
  {
    icon: UsersRound,
    title: 'Expert Advisors',
    text: 'Get guidance from experienced counsellors who care about your future.',
  },
  {
    icon: BookOpenCheck,
    title: 'Clear Process',
    text: 'Simple, transparent and hassle-free process from start to finish.',
  },
  {
    icon: Globe2,
    title: 'Global Opportunities',
    text: 'Access to top universities across the USA, UK, Canada, Australia and more.',
  },
  {
    icon: Headphones,
    title: 'Personalized Support',
    text: 'Tailored support at every step to ensure your success.',
  },
]

const stats = [
  { icon: UsersRound, targetValue: 1000, suffix: '+', label: 'Students Placed' },
  { icon: Building2, targetValue: 150, suffix: '+', label: 'Partner Universities' },
  { icon: Globe2, targetValue: 20, suffix: '+', label: 'Countries Covered' },
  { icon: Award, targetValue: 98, suffix: '%', label: 'Visa Success Rate' },
]

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
    program: 'Information Tech...',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
  {
    name: 'Geraldine Penarete',
    program: 'Geology',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
  {
    name: 'Yumi Wan',
    program: 'Physiotherapy ...',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
  {
    name: 'Tiara D Souza',
    program: 'Occupational T...',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
   {
    name: 'Yumi Wans',
    program: 'Physiotherapys ...',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
]

const studentLifeVideos = [
  {
    title: 'What does a typical student day look like at CQU?',
    studentName: 'Jean Manreal',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80',
    textOverlay: 'Day in a life of an International MBM Student in AUS 🇵🇭 🇳🇿 (School Day Edition)',
    isLocked: false,
  },
  {
    title: 'Fav spot in campus',
    studentName: 'Nayla Hafeeza Putri',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80',
    isLocked: false,
  },
  {
    title: 'What kind of food options are there on campus?',
    studentName: 'Kun Deng',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&auto=format&fit=crop&q=80',
    isLocked: true,
  },
  {
    title: 'How are different cultures and events celebrated on campus?',
    studentName: 'Tioluwalase Arowolo',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
    isLocked: true,
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

export default function NextLevelHomepage() {
  return (
    <div className="bg-white text-[#081638]">
      <main>
        <section className="relative overflow-hidden bg-[#E9EFF6] text-[#061331] pt-40 md:pt-20  lg:pt-28  px-5 sm:px-8 lg:px-10">
          {/* Subtle light background matrix dots & world map overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#081638 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-center bg-no-repeat bg-cover mix-blend-multiply" style={{ backgroundImage: "url('/visa/map.png')" }}></div>

          {/* Decorative Dashed Circles */}
          <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full border border-[#081638]/5 border-dashed pointer-events-none"></div>
          <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full border border-[#081638]/3 border-dashed pointer-events-none"></div>
          <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full border border-[#081638]/5 border-dashed pointer-events-none"></div>

          <div className="relative z-30 mx-auto grid max-w-6xl items-center gap-8 lg:gap-12 lg:grid-cols-[1.15fr_0.95fr]">
            {/* Left Column */}
            <div className="flex flex-col justify-center z-10 text-left px-2">
              <h1 className="text-4xl sm:text-5xl text-[#081638]  lg:text-[56px] font-black   leading-[1.1] tracking-tight">
                <span className="text-[#081638]  block mb-1">Free Student Visa</span>
                Consultation to
                <span className=" text-[#d7a23a] block mb-1">Study Abroad</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#59616f] font-medium">
                By taking our expert guidance for your global education journey, you can build your profile and save time. Starting right now.
              </p>

              {/* Interactive consultation lookup and action selectors */}
              <VisaConsultationForm />
            </div>

            {/* Right Column */}
            <div className="relative  flex items-center justify-center  w-full overflow-visible">

              {/* Main Image Box */}
              <div className="relative  z-6 w-[280px] h-[400px] sm:w-[340px] py-4 sm:h-[450px] lg:w-[480px] lg:h-[600px] rounded-2xl overflow-hidden    transition-all duration-500 hover:scale-[1.00]">
                <Image
                  src="/image.png"
                  alt="Student with Suitcase"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 480px"
                  className="object-contain  object-top hover:scale-100 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="relative z-20 mx-auto max-w-7xl mb-4 sm:mb-0 ">
            {/* Features Highlight Grid */}
            <div className="grid  gap-3 rounded-lg bg-white p-4 text-[#081638] shadow-[0_20px_55px_rgba(6,19,49,0.14)] sm:grid-cols-2 lg:grid-cols-4">
              {heroFeatures.map(feature => {
                const Icon = feature.icon
                return (
                  <article
                    key={feature.title}
                    className="group flex min-h-[105px] items-center gap-4 rounded-md border border-[#ece8df] bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(6,19,49,0.08)] hover:border-[#d7a23a]/50"
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
        </section>

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
            <div className="relative min-h-[360px] sm:min-h-[430px]">
              <div className="absolute left-0 top-0 h-48 w-72 overflow-hidden rounded-lg shadow-[0_16px_42px_rgba(8,22,56,0.15)] border-2 border-transparent transition-all duration-300 hover:scale-105 hover:z-20 hover:border-[#d7a23a]">
                <Image
                  src="/home2/happy-ma.png"
                  alt="Students discussing study abroad options"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="absolute right-0 -top-10 h-56 w-72 translate-y-[50%] overflow-hidden rounded-lg shadow-[0_16px_42px_rgba(8,22,56,0.15)] border-2 border-transparent transition-all duration-300 hover:scale-105 hover:z-20 hover:border-[#d7a23a]">
                <Image
                  src="/home2/happy-team.png"
                  alt="Students with passports"
                  fill
                  className="object-cover"
                  sizes="384px"
                />
              </div>
              <div className="absolute bottom-0 -right-24 h-48 w-80 -translate-x-1/2 overflow-hidden rounded-lg shadow-[0_16px_42px_rgba(8,22,56,0.15)] border-2 border-transparent transition-all duration-300 hover:scale-105 hover:z-20 hover:border-[#d7a23a]">
                <Image
                  src="/home2/happy-gi.png"
                  alt="Visa application documents"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#061331] px-8 py-5 text-center shadow-[0_16px_36px_rgba(6,19,49,0.22)]">
                <p
                  className="text-xl font-bold leading-6 text-white"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Your Future
                  <br />
                  Starts Here
                </p>
              </div>
            </div>

            <div>
              <Eyebrow>WHO WE ARE</Eyebrow>
              <h2
                className="mt-3 max-w-lg text-3xl font-bold leading-tight text-[#081638] sm:text-4xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Find the Right Program in Top Universities
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-7 text-[#59616f] sm:text-base">
                We help you choose the right course and university that matches
                your goals and future aspirations.
              </p>

              <ul className="mt-3 space-y-1">
                {programBenefits.map(benefit => (
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
                href="/services"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-[#061331] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d2459]"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Study Destinations Section */}
        <section className="bg-slate-50 py-10 px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Title Section */}
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-extrabold text-[#081638] sm:text-4xl" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                Your dream study destination awaits
              </h2>
              {/* Short thick accent line */}
              <div className="mt-3 h-[5px] w-12 bg-[#d7a23a] rounded" />
              <p className="mt-5 text-sm leading-relaxed text-[#59616f] sm:text-base font-medium">
                Start your inspiring academic journey in these vibrant and welcoming study destinations!
              </p>
            </div>

            {/* Country Cards Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Australia', image: '/destinations_australia.png' },
                { name: 'Canada', image: '/destinations_canada.png' },
                { name: 'New Zealand', image: '/destinations_nz.png' },
                { name: 'United Kingdom', image: '/destinations_uk.png' },
              ].map((country) => (
                <div
                  key={country.name}
                  className="group w-full overflow-hidden rounded-2xl shadow-[0_12px_36px_rgba(8,22,56,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(8,22,56,0.15)] cursor-pointer"
                  style={{ position: 'relative', height: '300px' }}
                >
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark overlay with transition */}
                  <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/45" />

                  {/* Country Name Centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white tracking-wide drop-shadow-md text-center transition-transform duration-500 group-hover:scale-105">
                      {country.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#061331] py-10 text-white ">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <div className="relative inline-block pb-2.5 mb-2">
                <Eyebrow>Why Choose Next Level Education</Eyebrow>
                <svg
                  className="absolute left-0 bottom-0 w-full h-[8px] text-[#d7a23a] pointer-events-none"
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
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                We Make Your Study Abroad Journey Easy
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-4">
              {whyChooseUs.map(item => {
                const Icon = item.icon
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

        <section className="bg-white py-10 ">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <Eyebrow>Our Services</Eyebrow>
              <h2
                className="mt-3 text-3xl font-bold leading-tight sm:text-4xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                How We Can Help You Succeed
              </h2>
            </div>
            <div className="mt-10">
              <ServicesCarousel services={services} />
            </div>
          </div>
        </section>

        {/* Featured Partner Universities Section */}
        <section className="bg-slate-50 border-y border-[#ece8df]/40 py-10 relative overflow-hidden">
          <div aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30">
            <div className="h-56 w-28 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] bg-size-[1.25rem_1.25rem]" />
          </div>
          <div aria-hidden="true" className="absolute right-0 top-10 opacity-30">
            <div className="h-28 w-56 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] bg-size-[1.25rem_1.25rem]" />
          </div>

          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Eyebrow>Top Institutions</Eyebrow>
              <h2
                className="mt-3 text-3xl font-bold leading-tight text-[#081638] sm:text-4xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Featured <span className="text-[#d7a23a]">Partner Universities</span>
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#59616f] sm:text-base">
                Explore our elite partner institutions from around the globe. Get direct admissions assistance, visa processing support, and scholarship options.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(universitiesData).slice(0, 3).map((univ: any) => (
                <div
                  key={univ.name}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,19,49,0.12)]"
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
                      <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-black text-sm text-[#081638] uppercase">
                        {univ.logo}
                      </div>
                      <div className="text-white">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-200 leading-none">Est. {univ.established}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between grow text-left">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2">
                        <span>{univ.flag}</span>
                        <span>{univ.location}, {univ.country}</span>
                      </div>
                      <h3 className="text-lg font-black text-[#081638] group-hover:text-[#d7a23a] transition-colors duration-300 line-clamp-1 mb-2">
                        {univ.name}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6">
                        {univ.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 mt-auto">
                      <div className="text-left">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Students</span>
                        <span className="text-xs font-black text-[#081638]">{univ.students}</span>
                      </div>
                      <Link
                        href={`/universities/${encodeURIComponent(univ.name)}`}
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

            <div className="mt-12 text-center">
              <Link
                href="/courses"
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-[#061331] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d7a23a] hover:text-[#061331] shadow-md"
              >
                Browse All Universities & Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#031336] py-10">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
            {stats.map(stat => {
              const Icon = stat.icon
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

        {/* Testimonials, Ambassador & Student Life Container */}
        <section id="testimonials" className=" py-10  overflow-hidden bg-amber-50">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center mb-10">
              <Eyebrow>Testimonials</Eyebrow>
              <h2
                className="mt-3 text-3xl font-bold leading-tight text-[#081638] sm:text-4xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                What Our Students Say
              </h2>
            </div>

            <StudentTestimonialsCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* Student Ambassador & Life Combined Section */}
        <section className="bg-white py-10 px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Chat to a Student Ambassador Subsection */}
            <div className="mb-5">
              <div className="text-left mb-5">
                <h2 className="text-3xl font-extrabold text-[#081638] tracking-tight sm:text-4xl" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  Chat to a student ambassador
                </h2>
                <p className="mt-3 text-sm text-[#59616f] font-semibold sm:text-base">
                  Speak to Next Level ambassadors today!
                </p>
              </div>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {ambassadors.map((ambassador) => (
                  <div
                    key={ambassador.name}
                    className="bg-white border border-[#ece8df] rounded-3xl p-8 flex flex-col items-center justify-between text-center shadow-[0_12px_34px_rgba(8,22,56,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
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
                      <span className="bg-[#eff6ff] text-[#1e40af] text-[11px] font-bold px-3.5 py-1 rounded-full mb-3 max-w-[160px] truncate block">
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
            </div>

            {/* Student Life Videos Subsection */}
            <div className="pt-3 border-t border-[#ece8df]/60">
              <div className="text-left mb-5">
                <h2 className="text-3xl font-extrabold text-[#081638] tracking-tight sm:text-4xl" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  Student life
                </h2>
                <p className="mt-3 text-sm text-[#59616f] font-semibold sm:text-base">
                  Hear from past students!
                </p>
              </div>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {studentLifeVideos.map((video) => (
                  <div
                    key={video.title}
                    className="bg-white rounded-3xl border border-[#ece8df] overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
                  >
                    {/* Video Thumbnail Area */}
                    <div className="relative h-64 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    
                        <div className="absolute inset-0 bg-black/15 flex items-center justify-center group/play cursor-pointer hover:bg-black/25 transition-all">
                          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/play:scale-110">
                            <CirclePlay className="w-12 h-12 text-[#081638] fill-white" />
                          </div>
                          {video.textOverlay && (
                            <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold p-2 rounded-lg leading-normal">
                              {video.textOverlay}
                            </div>
                          )}
                        </div>
                   
                    </div>

                    {/* Content below image */}
                    <div className="p-5 flex flex-col justify-between grow text-left">
                      <h4 className="text-sm font-bold text-[#081638] leading-snug mb-5 line-clamp-2">
                        {video.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 border-t border-slate-100 pt-3.5">
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
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQSection />

        <section className="bg-white py-10 ">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Latest From Our Blog</Eyebrow>
                <h2
                  className="mt-3 text-3xl font-bold leading-tight text-[#081638] sm:text-4xl"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Tips &amp; Updates for Students
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#061331] transition hover:text-[#d7a23a]"
              >
                View All Blogs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {blogs.map((blog, index) => (
                <article
                  key={`${blog.title}-${index}`}
                  className="overflow-hidden rounded-lg border border-[#ece8df] bg-white shadow-[0_12px_34px_rgba(8,22,56,0.06)] transition-all duration-300 hover:scale-[1.025] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(8,22,56,0.12)] hover:border-[#d7a23a]/40"
                >
                  <div className="relative h-40">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      loading="eager"
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-2 text-xs text-[#7a8190]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {blog.date}
                    </p>
                    <h3 className="mt-3 min-h-[58px] text-sm font-bold leading-5 text-[#081638]">
                      {blog.title}
                    </h3>
                    <Link
                      href="/blog"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#061331] transition hover:text-[#d7a23a]"
                    >
                      Read More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  )
}