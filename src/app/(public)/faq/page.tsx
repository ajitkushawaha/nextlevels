'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/layout/footer'

// ── Types ────────────────────────────────────────────────────────────
interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  name: string
  items: FAQItem[]
}

// ── FAQ Data ( Consultancy & Study Abroad focused ) ─────────────────
const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    name: 'General Questions',
    items: [
      {
        question: 'Are your counseling and application sessions free of cost?',
        answer: 'Yes, 100% of our educational counseling, university admissions advice, and student visa evaluation services are free of charge. Our operations are fully funded by our partner universities abroad.'
      },
      {
        question: 'What is the ideal timeline to start my application process?',
        answer: 'We strongly recommend starting your application process at least 8 to 10 months prior to the intake month. This leaves sufficient time for taking standardized tests (like IELTS, PTE, or TOEFL), acquiring university admission offers, applying for scholarships, and smoothly processing your student visa.'
      },
      {
        question: 'Which study destinations do you specialize in?',
        answer: 'We specialize in placing students in world-renowned universities across the United Kingdom (UK), Canada, Australia, and New Zealand.'
      },
      {
        question: 'What services does Next Level Education Consultancy provide?',
        answer: 'We offer complete end-to-end guidance for studying abroad: profile evaluation, university/program matching, application editing and submission, scholarship assistance, student visa documentation, mock visa interview preparation, pre-departure briefings, and post-arrival accommodation guidance.'
      }
    ]
  },
  {
    id: 'admissions',
    name: 'Support team',
    items: [
      {
        question: 'Can I apply for a bachelor degree with my O/L results?',
        answer: 'Yes, students who have completed their Ordinary Levels (O/Ls) can gain entry into international universities through a Foundation Year program, which prepares them for direct entry to the first year of their bachelor degree.'
      },
      {
        question: 'What documents are required to apply for a university admission offer?',
        answer: 'Generally, you will need your academic transcripts (O/L and A/L certificates or Bachelor degree transcripts), a copy of your passport, a Statement of Purpose (SOP), 2 Letters of Recommendation (LORs), a copy of your CV, and your English Language proficiency test results (e.g. IELTS/PTE).'
      },
      {
        question: 'Is an English language proficiency test (IELTS / PTE) mandatory?',
        answer: 'Most partner universities in the UK, Canada, Australia, and New Zealand require English proficiency scores (IELTS Academic, PTE Academic, or TOEFL). However, some universities may offer IELTS waivers if you have scored exceptionally high in English in your national/international O/L or A/L examinations.'
      },
      {
        question: 'Can I apply to universities if my final results are still pending?',
        answer: 'Yes, you can apply using your mock/predicted results or semester transcripts. The university can issue you a Conditional Offer Letter, which will be converted to an Unconditional Offer Letter once you submit your final official academic results.'
      }
    ]
  },
  {
    id: 'visa-finance',
    name: 'Miscellaneous',
    items: [
      {
        question: 'What is the average cost of tuition for international students?',
        answer: 'Tuition fees vary significantly depending on the country, university, and field of study. On average, annual tuition starts from £14,000 in the UK, C$20,000 in Canada, A$30,000 in Australia, and NZ$22,000 in New Zealand. We actively assist in finding budget-friendly universities.'
      },
      {
        question: 'How do you assist with the student visa application process?',
        answer: 'Our certified visa consultants help you prepare your financial proof documents, review your Statement of Purpose (SOP) to ensure it complies with immigration guidelines, fill out the visa forms, schedule biometric appointments, and conduct mock visa interviews.'
      },
      {
        question: 'Do I need to show proof of funds for my student visa?',
        answer: 'Yes, immigration authorities in the UK, Canada, Australia, and New Zealand require proof that you have sufficient funds to cover your first year of tuition fees and living expenses. The exact amount and hold duration (e.g. 28 days for UK, SDS requirements for Canada) depend on your target country.'
      },
      {
        question: 'Can my spouse or dependents travel with me?',
        answer: 'Spousal/dependent visa regulations vary by country. For example, some countries permit postgraduate research students or master degree students to bring dependents, while others have updated restrictions. Our advisors will evaluate your profile and guide you based on current immigration laws.'
      }
    ]
  },
  {
    id: 'arrival',
    name: 'Donsectetur',
    items: [
      {
        question: 'Do you help students find accommodation abroad?',
        answer: 'Yes, we guide you through finding both on-campus university student halls and private off-campus shared student housing. We also connect you with senior student networks already residing in your target city.'
      },
      {
        question: 'Can I work part-time while studying?',
        answer: 'Yes, in our major destinations (UK, Canada, Australia, NZ), international students on a valid student visa are permitted to work part-time during academic semesters, and full-time during official university vacations, subject to visa conditions.'
      },
      {
        question: 'How do I set up a bank account and get a SIM card upon arrival?',
        answer: 'During our pre-departure briefings, we provide detailed guides on local essentials. Many digital bank accounts can be set up online before you fly, and we provide pointers on student SIM networks and transport cards.'
      },
      {
        question: 'What happens in a pre-departure briefing session?',
        answer: 'Our pre-departure briefings cover packing checklists, travel insurance, airport customs procedures, immigration checks, university registration steps, student cards, emergency contacts, and adjusting to the cultural environment.'
      }
    ]
  },
  {
    id: 'gabitasse',
    name: 'Gabitasse',
    items: [
      {
        question: 'Are the university guidelines identical across all intake terms?',
        answer: 'Generally yes, but universities update their criteria periodically. We recommend checking with your advisor to confirm specific requirements for your selected intake.'
      },
      {
        question: 'How can I ensure my application stands out?',
        answer: 'A strong Statement of Purpose (SOP), solid recommendation letters, and a high GPA or standardized score are key factors. We help you polish all components to maximize your acceptance potential.'
      }
    ]
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('general')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Get active items
  const activeItems = useMemo(() => {
    return faqCategories.find(cat => cat.id === activeCategory)?.items || []
  }, [activeCategory])

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id)
    setOpenIndex(0) // Default to opening the first item in the new category
  }

  return (
    <div className="min-h-screen bg-white text-[#061331] flex flex-col justify-between">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-[340px] sm:h-[360px] lg:h-[400px] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-[110px] pb-6 sm:pb-8 lg:py-[40px] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1200"
          alt="FAQ Banner"
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />

        {/* Content Container */}
        <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb */}
          <div className="max-w-[750px]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                <li>
                  <Link href="/" className="hover:text-[#d7a23a] transition-colors">
                    Home
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none text-white font-semibold">
                  <span>FAQ</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Bottom Title & Badge */}
          <div className="mt-auto space-y-3 pt-6 text-left">
            <div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                Got Questions?
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              Frequently Asked Questions
            </h1>
            
            <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              Find answers to common questions about admissions, student visas, scholarships, and our consultancy services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full grow py-12 lg:py-16 bg-[#fbf8fc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* FAQ Grid */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.8fr] gap-6 lg:gap-10 items-start">
            
            {/* Categories Tab Bar */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2.5 lg:pb-0 shrink-0 w-full lg:w-auto scrollbar-none snap-x sticky top-[80px] z-10 bg-[#fbf8fc]/90 backdrop-blur-xs py-2 lg:py-0">
              {faqCategories.map(cat => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center justify-center lg:justify-between px-4 py-2.5 lg:px-6 lg:py-4.5 rounded-xl lg:rounded-2xl text-left transition-all duration-300 cursor-pointer shrink-0 snap-start group border w-full ${
                      isActive
                        ? 'bg-[#061331] text-white border-slate-100 lg:bg-white lg:text-[#061331] font-bold lg:shadow-md lg:border-[#d7a23a] scale-[1.01]'
                        : 'bg-white/70 text-[#061331]/75 border-slate-200/40 lg:bg-white/40 lg:hover:bg-white/80 lg:text-slate-400 lg:hover:text-slate-500'
                    }`}
                  >
                    <span className="text-xs sm:text-sm lg:text-[15px] font-semibold lg:font-bold tracking-tight">{cat.name}</span>
                    <span className={`hidden lg:inline transition-transform duration-300 ${isActive ? 'translate-x-0.5 text-[#061331]' : 'text-slate-300 group-hover:text-slate-400'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Questions list */}
            <div className="space-y-3 w-full">
              {activeItems.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-[#e2e8f0]/40 bg-white shadow-[0_10px_30px_rgba(6,19,49,0.03)]'
                        : 'border-[#e2e8f0]/20 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-4 lg:p-5 text-left focus:outline-none cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`font-bold text-[13px] lg:text-[15px] pr-6 transition-colors duration-200 ${
                          isOpen ? 'text-[#061331]' : 'text-[#061331]/80 group-hover:text-[#d7a23a]'
                        }`}
                      >
                        {item.question}
                      </span>
                      <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors">
                        {isOpen ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 text-[#061331]">
                            <path d="M18 6 6 18M6 6l12 12"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 text-[#061331]">
                            <path d="M5 12h14M12 5v14"/>
                          </svg>
                        )}
                      </span>
                    </button>

                    {/* Content Height Transition */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4 lg:px-5 lg:pb-5 text-[12px] lg:text-sm leading-relaxed text-slate-500 pt-1 border-t border-slate-50 mt-1 font-medium animate-in fade-in duration-200">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
