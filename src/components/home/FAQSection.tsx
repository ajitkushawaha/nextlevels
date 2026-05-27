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
    <section className="bg-[#f8fafc] py-16 sm:py-20 text-[#061331] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d7a23a]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#061331]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-[#d7a23a]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#d7a23a]">
              Frequently Asked Questions
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight text-[#061331]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Clear Answers to Your <span className="text-gradient-gold font-extrabold">Study Abroad Queries</span>
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Embarking on an overseas education journey can bring up many questions.
            Here are the answers to the most common topics students ask us about.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#d7a23a] bg-white shadow-[0_10px_30px_rgba(6,19,49,0.05)]'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-bold text-sm sm:text-base pr-4 transition-colors duration-200 ${
                      isOpen ? 'text-[#061331]' : 'text-[#061331]/90 hover:text-[#d7a23a]'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#061331] text-[#d7a23a] rotate-180'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {/* Smooth height transition wrapper using grid-rows-[0fr]->[1fr] */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Premium Mini-CTA Box */}
        <div className="mt-12 p-6 bg-[#061331] sm:p-8 rounded-2xl border border-slate-200  shadow-[0_12px_40px_rgba(6,19,49,0.04)] relative group hover:border-[#d7a23a]/30 transition-all duration-300 text-center sm:flex sm:items-center sm:justify-between sm:text-left overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d7a23a]/30 to-transparent group-hover:via-[#d7a23a] transition-all duration-500"></div>

          <div className="sm:max-w-md ">
            <div className="flex items-center justify-center sm:justify-start gap-3.5 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#061331]/5 text-white">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Still Have Questions?</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6 sm:mb-0 font-medium">
              Can't find the answers you're looking for? Connect with our expert advisors for a free, customized roadmap.
            </p>
          </div>

          <Link
            href="/contact-us"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#d7a23a] hover:bg-[#d7a23a] px-6 py-3.5 text-sm font-bold text-white hover:text-[#061331] shadow-[0_4px_14px_rgba(8,22,56,0.15)] hover:shadow-[0_6px_20px_rgba(215,162,58,0.25)] transition-all duration-300"
          >
            Get Free Consultation
            <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
