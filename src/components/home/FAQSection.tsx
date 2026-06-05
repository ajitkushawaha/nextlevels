'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface FAQCard {
  question: string
  answer: string
  color: string
  illustration: React.ReactNode
}

const faqCards: FAQCard[] = [
  {
    question: 'How do I apply for a UK Student Visa?',
    answer: 'You need admission, CAS letter, passport, financial proof and medical insurance.',
    color: '#3b82f6', // blue
    illustration: (
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background dots */}
        <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-[#82b4ff]/60" />
        <div className="absolute bottom-6 left-2 w-1.5 h-1.5 rounded-full bg-[#82b4ff]/40" />
        <div className="absolute top-8 right-3 w-2.5 h-2.5 rounded-full bg-[#82b4ff]/70" />
        <div className="absolute bottom-3 right-6 w-2 h-2 rounded-full bg-[#82b4ff]/50" />
        
        {/* Main Circle */}
        <div className="w-24 h-24 rounded-full bg-[#e8f1ff] flex items-center justify-center shadow-inner">
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Passport Cover */}
            <rect x="18" y="10" width="28" height="44" rx="4" fill="#1e40af" stroke="#000" strokeWidth="0.5" />
            {/* Gold emblem details */}
            <circle cx="32" cy="30" r="10" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <circle cx="32" cy="30" r="6" stroke="#f59e0b" strokeWidth="1" fill="none" />
            {/* Passport Text lines */}
            <line x1="24" y1="16" x2="40" y2="16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="26" y1="20" x2="38" y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="28" y1="44" x2="36" y2="44" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            {/* Passport inner emblem design */}
            <path d="M32 26V34M28 30H36" stroke="#f59e0b" strokeWidth="1" />
          </svg>
        </div>
      </div>
    )
  },
  {
    question: 'What IELTS score is required?',
    answer: 'Most universities require an overall band score of 6.0 to 7.0.',
    color: '#84cc16', // lime green
    illustration: (
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background dots */}
        <div className="absolute top-4 left-6 w-2.5 h-2.5 rounded-full bg-[#a3e635]/60" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#a3e635]/40" />
        <div className="absolute top-10 right-4 w-2 h-2 rounded-full bg-[#a3e635]/70" />
        <div className="absolute bottom-8 right-6 w-1.5 h-1.5 rounded-full bg-[#a3e635]/50" />
        
        {/* Main Circle */}
        <div className="w-24 h-24 rounded-full bg-[#f4fce3] flex items-center justify-center shadow-inner">
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Clipboard Body */}
            <rect x="18" y="14" width="28" height="38" rx="3" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
            {/* Clip */}
            <path d="M26 14V11C26 10.4477 26.4477 10 27 10H37C37.5523 10 38 10.4477 38 11V14" fill="#64748b" stroke="#334155" strokeWidth="2" />
            {/* IELTS label */}
            <rect x="22" y="19" width="20" height="7" rx="1.5" fill="#f59e0b" />
            <text x="32" y="24" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IELTS</text>
            {/* Checkmarks & Lines */}
            <circle cx="24" cy="32" r="2" fill="#84cc16" />
            <line x1="28" y1="32" x2="38" y2="32" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            
            <circle cx="24" cy="38" r="2" fill="#84cc16" />
            <line x1="28" y1="38" x2="38" y2="38" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            
            <circle cx="24" cy="44" r="2" fill="#84cc16" />
            <line x1="28" y1="44" x2="38" y2="44" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    )
  },
  {
    question: 'How can I get a scholarship abroad?',
    answer: 'Apply early, maintain good academic records and check university scholarships.',
    color: '#a855f7', // purple
    illustration: (
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background dots */}
        <div className="absolute top-6 left-4 w-2 h-2 rounded-full bg-[#c084fc]/60" />
        <div className="absolute bottom-6 left-6 w-2.5 h-2.5 rounded-full bg-[#c084fc]/40" />
        <div className="absolute top-4 right-6 w-2 h-2 rounded-full bg-[#c084fc]/70" />
        <div className="absolute bottom-3 right-4 w-1.5 h-1.5 rounded-full bg-[#c084fc]/50" />
        
        {/* Main Circle */}
        <div className="w-24 h-24 rounded-full bg-[#fae8ff] flex items-center justify-center shadow-inner">
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Books stack */}
            <rect x="18" y="34" width="28" height="6" rx="1" fill="#1e3a8a" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="20" y="40" width="24" height="6" rx="1" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="22" y1="37" x2="42" y2="37" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
            
            {/* Graduation Cap */}
            <path d="M12 24L32 15L52 24L32 33L12 24Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="24" y="27" width="16" height="7" fill="#192231" stroke="#0f172a" strokeWidth="1.5" />
            {/* Tassel */}
            <path d="M32 24L46 27V33" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="46" cy="33" r="1.5" fill="#f59e0b" />
          </svg>
        </div>
      </div>
    )
  },
  {
    question: 'What are the average study expenses?',
    answer: 'It depends on the country and course. Plan for tuition, living and other costs.',
    color: '#f59e0b', // orange
    illustration: (
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background dots */}
        <div className="absolute top-8 left-3 w-1.5 h-1.5 rounded-full bg-[#fcd34d]/60" />
        <div className="absolute bottom-5 left-5 w-2 h-2 rounded-full bg-[#fcd34d]/40" />
        <div className="absolute top-4 right-5 w-2.5 h-2.5 rounded-full bg-[#fcd34d]/75" />
        <div className="absolute bottom-6 right-3 w-2.5 h-2.5 rounded-full bg-[#fcd34d]/50" />
        
        {/* Main Circle */}
        <div className="w-24 h-24 rounded-full bg-[#fffbeb] flex items-center justify-center shadow-inner">
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Wallet Back */}
            <rect x="16" y="20" width="32" height="24" rx="3" fill="#854d0e" stroke="#451a03" strokeWidth="1.5" />
            {/* Cash popping out */}
            <rect x="20" y="14" width="20" height="10" rx="1" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
            <line x1="24" y1="18" x2="36" y2="18" stroke="#166534" strokeWidth="1" />
            {/* Wallet Front flap */}
            <path d="M16 23H48V42C48 43.1046 47.1046 44 46 44H18C16.8954 44 16 43.1046 16 42V23Z" fill="#a16207" stroke="#451a03" strokeWidth="1.5" />
            {/* Wallet tab */}
            <rect x="40" y="27" width="10" height="8" rx="1.5" fill="#854d0e" stroke="#451a03" strokeWidth="1.5" />
            {/* Gold coin on tab */}
            <circle cx="45" cy="31" r="2.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          </svg>
        </div>
      </div>
    )
  },
  {
    question: 'Which country is best for international students?',
    answer: 'Canada, UK, Australia and Germany are popular choices for quality education.',
    color: '#06b6d4', // cyan
    illustration: (
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background dots */}
        <div className="absolute top-4 left-5 w-2 h-2 rounded-full bg-[#67e8f9]/60" />
        <div className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-[#67e8f9]/40" />
        <div className="absolute top-6 right-4 w-2 h-2 rounded-full bg-[#67e8f9]/70" />
        <div className="absolute bottom-4 right-5 w-2.5 h-2.5 rounded-full bg-[#67e8f9]/50" />
        
        {/* Main Circle */}
        <div className="w-24 h-24 rounded-full bg-[#ecfeff] flex items-center justify-center shadow-inner">
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stand */}
            <path d="M32 44V52M24 52H40" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M18 32C18 41.9411 26.0589 50 36 50" stroke="#64748b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Globe Circle */}
            <circle cx="32" cy="28" r="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            {/* Landmasses */}
            <path d="M22 28C23 25 26 24 28 26C30 28 29 31 31 32C33 33 35 31 36 29C37 27 39 28 41 26C43 24 45 28 43 31C41 34 38 35 36 38C34 41 30 41 27 39C24 37 21 31 22 28Z" fill="#22c55e" opacity="0.85" />
            <path d="M30 18C32 16 35 15 38 17C40 19 41 21 38 22C35 23 32 20 30 18Z" fill="#22c55e" opacity="0.85" />
            {/* Grid lines overlay */}
            <ellipse cx="32" cy="28" rx="14" ry="4" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3" />
            <ellipse cx="32" cy="28" rx="4" ry="14" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3" />
          </svg>
        </div>
      </div>
    )
  }
]

export default function FAQSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(4)

  // Adjust responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1)
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2)
      } else {
        setCardsToShow(4)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    if (currentIndex < faqCards.length - cardsToShow) {
      setCurrentIndex(prev => prev + 1)
    } else {
      // Loop back to start
      setCurrentIndex(0)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    } else {
      // Loop to end
      setCurrentIndex(faqCards.length - cardsToShow)
    }
  }

  const selectSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Calculate total number of slide pages/dots
  const totalDots = faqCards.length - cardsToShow + 1

  return (
    <section className="bg-white/45 py-10 text-[#081638] overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div className="text-left">
            {/* Eyebrow / LATEST FAQS */}
            <div className="inline-block mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d7a23a]">
                LATEST FAQS
              </span>
              <div className="mt-1 h-[3px] w-8 bg-[#d7a23a] rounded" />
            </div>
            
            {/* Main Title */}
            <h2 
              className="text-3xl font-extrabold text-[#081638] sm:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          {/* View All FAQs CTA */}
          <Link
            href="/faq"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#081638] hover:text-[#d7a23a] transition-all duration-300 group"
          >
            View All FAQs
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 sm:px-8">
          
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-[-15px] sm:left-[-5px] top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#081638] shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-slate-100 hover:text-[#d7a23a] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Previous FAQs"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Slider Window */}
          <div className="overflow-hidden py-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
              }}
            >
              {faqCards.map((faq, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 px-3"
                  style={{
                    width: `${100 / cardsToShow}%`,
                  }}
                >
                  <div className="flex flex-col justify-between items-center bg-white rounded-3xl border border-slate-100/80 shadow-[0_10px_35px_rgba(8,22,56,0.05)] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,22,56,0.12)] text-center h-full">
                    {/* Circle Illustration */}
                    <div className="mb-4">
                      {faq.illustration}
                    </div>

                    {/* Question */}
                    <h3 className="text-base sm:text-[17px] font-extrabold text-[#081638] leading-snug px-2 min-h-[52px] flex items-center justify-center">
                      {faq.question}
                    </h3>

                    {/* Colored Indicator Line */}
                    <div 
                      className="my-4 h-[3px] w-10 rounded-full" 
                      style={{ backgroundColor: faq.color }}
                    />

                    {/* Answer Summary */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium min-h-[64px] mb-6 flex items-center justify-center">
                      {faq.answer}
                    </p>

                    {/* Read More Link */}
                    <Link
                      href="/faq"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1e40af] hover:text-[#d7a23a] transition-all duration-300 group"
                    >
                      Read More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-[-15px] sm:right-[-5px] top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#081638] shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-slate-100 hover:text-[#d7a23a] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Next FAQs"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Indicator Dots */}
        {totalDots > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => selectSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i ? 'w-6 bg-[#081638]' : 'w-2.5 bg-slate-200'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
