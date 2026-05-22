'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight, HelpCircle, MessageSquare } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What services does Next Level Education Consultancy provide?',
    answer: 'We offer complete end-to-end guidance for studying abroad. This includes profile evaluation, university and program selection, application editing and processing, scholarship hunting, student visa documentation, mock visa interviews, pre-departure briefings, and post-arrival support like accommodation assistance.'
  },
  {
    question: 'Are your counseling and consultation sessions free of cost?',
    answer: 'Yes, our initial counseling sessions and study-abroad consultations are 100% free. We help you map out your educational goals, choose suitable destinations, and evaluate your visa eligibility without any upfront fees.'
  },
  {
    question: 'Which study destinations do you specialize in?',
    answer: 'We specialize in placing students in world-renowned universities across the United Kingdom (UK), United States of America (USA), Canada, Australia, New Zealand, and popular European countries.'
  },
  {
    question: 'How do you assist with the student visa application process?',
    answer: 'Our experienced visa experts guide you through every step of the visa application: preparing your financial proofs, verifying statement of purpose (SOP) letters, filling out application forms, scheduling appointments, and preparing you with rigorous mock visa interview sessions to maximize your success rate.'
  },
  {
    question: 'Can you help me find and secure scholarships?',
    answer: 'Absolutely. We actively research university-specific and government-funded scholarship opportunities that match your academic profile, extracurricular achievements, and financial needs. We also assist you in polishing your scholarship application essays.'
  },
  {
    question: 'What is the ideal timeline to start my application process?',
    answer: 'We strongly recommend starting your application process at least 8 to 10 months prior to the intake month. This leaves sufficient time for taking standardized tests (like IELTS, PTE, or GRE), acquiring university admission offers, applying for scholarships, and smoothly processing your student visa.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-gradient-to-b from-[#061331] to-[#0b1f4d] py-16 sm:py-24 text-white relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d7a23a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d7a23a]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Left Column: Heading & CTA Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-[#d7a23a]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#d7a23a]">
                  Frequently Asked Questions
                </span>
              </div>
              
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Clear Answers to Your <span className="text-gradient-gold block mt-1">Study Abroad Queries</span>
              </h2>
              
              <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
                Embarking on an overseas education journey can bring up many questions. 
                Here are the answers to the most common topics students ask us about.
              </p>
            </div>

            {/* Premium Mini-CTA Box */}
            <div className="mt-8 lg:mt-12 p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1f4d]/90 to-[#061331]/90 shadow-[0_12px_36px_rgba(6,19,49,0.2)] relative group hover:border-[#d7a23a]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7a23a]/30 to-transparent group-hover:via-[#d7a23a] transition-all duration-500"></div>
              
              <div className="flex items-center gap-3.5 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d7a23a]/10 text-[#d7a23a]">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg text-white">Still Have Questions?</h3>
              </div>
              
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Can't find the answers you're looking for? Connect with our expert advisors for a free, customized study-abroad roadmap.
              </p>
              
              <Link 
                href="/contact-us"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d7a23a] px-5 py-3 text-sm font-bold text-[#061331] shadow-[0_4px_14px_rgba(215,162,58,0.25)] hover:bg-[#efbd5a] hover:shadow-[0_6px_20px_rgba(215,162,58,0.35)] transition-all duration-300"
              >
                Get Free Consultation
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div 
                  key={index}
                  className={`rounded-xl border transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#d7a23a] bg-[#0b1f4d]/50 shadow-[0_10px_25px_rgba(215,162,58,0.06)]' 
                      : 'border-white/10 bg-[#0b1f4d]/20 hover:border-[#d7a23a]/30 hover:bg-[#0b1f4d]/30'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-bold text-sm sm:text-base pr-4 transition-colors duration-200 ${
                      isOpen ? 'text-[#d7a23a]' : 'text-white hover:text-[#d7a23a]/90'
                    }`}>
                      {faq.question}
                    </span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all duration-300 ${
                      isOpen ? 'bg-[#d7a23a] text-[#061331] rotate-180' : 'text-white'
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  
                  {/* Smooth height transition wrapper using grid-rows-[0fr]->[1fr] */}
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-white/70 border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
