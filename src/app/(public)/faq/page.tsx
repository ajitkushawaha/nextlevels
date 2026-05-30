'use client'

import { useState, useMemo } from 'react'

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
        answer: 'We specialize in placing students in world-renowned universities across the United Kingdom (UK), Canada, Australia, New Zealand, and the United States of America (USA).'
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
        answer: 'Most partner universities in the UK, Canada, Australia, and USA require English proficiency scores (IELTS Academic, PTE Academic, or TOEFL). However, some universities may offer IELTS waivers if you have scored exceptionally high in English in your national/international O/L or A/L examinations.'
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
        answer: 'Tuition fees vary significantly depending on the country, university, and field of study. On average, annual tuition starts from £14,000 in the UK, C$20,000 in Canada, A$30,000 in Australia, and $25,000 in the USA. We actively assist in finding budget-friendly universities.'
      },
      {
        question: 'How do you assist with the student visa application process?',
        answer: 'Our certified visa consultants help you prepare your financial proof documents, review your Statement of Purpose (SOP) to ensure it complies with immigration guidelines, fill out the visa forms, schedule biometric appointments, and conduct mock visa interviews.'
      },
      {
        question: 'Do I need to show proof of funds for my student visa?',
        answer: 'Yes, immigration authorities in Canada, UK, Australia, and the USA require proof that you have sufficient funds to cover your first year of tuition fees and living expenses. The exact amount and hold duration (e.g. 28 days for UK, SDS requirements for Canada) depend on your target country.'
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
        answer: 'Yes, in most major destinations (UK, Canada, Australia, NZ), international students on a valid student visa are permitted to work part-time for up to 20 hours per week during academic semesters, and full-time during official university vacations.'
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
    <div className="min-h-screen bg-slate-50/10 text-[#061331] flex items-center justify-center pt-20 pb-4 lg:py-8 relative overflow-hidden select-none">
      
      {/* ── MAIN CARD CONTAINER ──────────────────────────────────────── */}
      <div className="w-full max-w-6xl mx-4 sm:mx-8 bg-white/70 backdrop-blur-md rounded-[24px] lg:rounded-[32px] border border-white/50 p-5 sm:p-8 lg:p-12 z-10 flex flex-col lg:h-[calc(100vh-140px)] lg:max-h-[calc(100vh-140px)] overflow-y-auto lg:overflow-hidden relative">
     
        {/* Centered Header */}
        <div className="text-center mb-6 lg:mb-10 max-w-3xl mx-auto shrink-0 relative z-10">
          <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#061331] tracking-tight leading-tight">
            Frequently Asked <span className="text-[#d7a23a]">Questions</span>
          </h1>
          <p className="text-[11px] sm:text-sm lg:text-[14px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mt-2 lg:mt-4">
            Our platform is built to help you navigate your study abroad journey, not make it harder. It adapts to your needs and supports your goals. Make the most of every feature.
          </p>
        </div>

        {/* FAQ Grid (Switches layouts on mobile/desktop) */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.8fr] gap-4 lg:gap-10 flex-1 min-h-0 items-stretch relative z-10">
          
          {/* Categories Tab Bar: Horizontal scroll on mobile, Vertical stack on desktop */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2.5 lg:pb-0 shrink-0 scrollbar-none snap-x -mx-1 px-1">
            {faqCategories.map(cat => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center justify-center lg:justify-between px-4 py-2.5 lg:px-6 lg:py-4.5 rounded-xl lg:rounded-2xl text-left transition-all duration-300 cursor-pointer shrink-0 snap-start group border ${
                    isActive
                      ? 'bg-[#061331] text-white border-slate-100 lg:bg-white lg:text-[#061331] font-bold lg:shadow-md lg:border-[#d7a23a] scale-[1.01]'
                      : 'bg-white/40 text-[#061331]/75 border-slate-200/20 lg:bg-white/30 lg:hover:bg-white/60 lg:text-slate-400 lg:hover:text-slate-500'
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

          {/* Questions list (Scrollable internally on desktop) */}
          <div className="space-y-3 flex-1 overflow-y-auto lg:pr-3 lg:max-h-[calc(100vh-320px)] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {activeItems.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#e2e8f0]/40 bg-white shadow-[0_10px_30px_rgba(6,19,49,0.03)] lg:shadow-[0_15px_45px_-8px_rgba(6,19,49,0.05)]'
                      : 'border-[#e2e8f0]/20 bg-[#f0f7ff]/40 hover:bg-[#f0f7ff]/60'
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

    </div>
  )
}
