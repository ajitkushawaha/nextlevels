'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ArrowRight, CirclePlay } from 'lucide-react'
import Link from 'next/link'

export default function VisaConsultationForm() {
  const [whereFrom, setWhereFrom] = useState('Sri Lanka')
  const [whereGoing, setWhereGoing] = useState('Select')
  const [fromOpen, setFromOpen] = useState(false)
  const [goingOpen, setGoingOpen] = useState(false)

  const fromRef = useRef<HTMLDivElement>(null)
  const goingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setFromOpen(false)
      }
      if (goingRef.current && !goingRef.current.contains(event.target as Node)) {
        setGoingOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fromOptions = [
    { name: 'Western (Colombo)', flag: '🇱🇰' },
    { name: 'Central (Kandy)', flag: '🇱🇰' },
    { name: 'Southern (Galle)', flag: '🇱🇰' },
    { name: 'Northern (Jaffna)', flag: '🇱🇰' },
    { name: 'Eastern (Trincomalee)', flag: '🇱🇰' },
    { name: 'North Western (Kurunegala)', flag: '🇱🇰' },
    { name: 'North Central (Anuradhapura)', flag: '🇱🇰' },
    { name: 'Uva (Badulla)', flag: '🇱🇰' },
    { name: 'Sabaragamuwa (Ratnapura)', flag: '🇱🇰' },
  ]

  const goingOptions = [
    { name: 'USA', flag: '🇺🇸' },
    { name: 'UK', flag: '🇬🇧' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Thailand', flag: '🇹🇭' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Tanzania', flag: '🇹🇿' },
  ]

  const handleGetEVisa = () => {
    const fromParam = whereFrom !== 'Select' ? `?from=${encodeURIComponent(whereFrom)}` : ''
    const goingParam = whereGoing !== 'Select' ? `${fromParam ? '&' : '?'}to=${encodeURIComponent(whereGoing)}` : ''
    window.location.href = `/contact-us${fromParam}${goingParam}`
  }

  return (
    <>
      {/* Form Selectors */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        {/* Select 1 */}
        <div className={`flex-1 relative ${fromOpen ? 'z-40' : 'z-10'}`} ref={fromRef}>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-left">
            Where am I From?
          </label>
          <button
            type="button"
            onClick={() => {
              setFromOpen(!fromOpen)
              setGoingOpen(false)
            }}
            className="flex items-center justify-between w-full bg-white/90 border border-gray-300 hover:border-[#1E52E8] px-4 py-3.5 rounded-2xl text-sm font-bold text-gray-800 transition-all shadow-xs"
          >
            <span>
              {whereFrom === 'Sri Lanka' ? '🇱🇰' : (fromOptions.find((o) => o.name === whereFrom)?.flag || '🌍')}{' '}
              {whereFrom}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${fromOpen ? 'rotate-180' : ''}`} />
          </button>
          {fromOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto p-1.5">
              {fromOptions.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => {
                    setWhereFrom(opt.name)
                    setFromOpen(false)
                  }}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-[#1E52E8] rounded-lg transition-colors"
                >
                  <span>{opt.flag}</span>
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Select 2 */}
        <div className={`flex-1 relative ${goingOpen ? 'z-40' : 'z-10'}`} ref={goingRef}>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-left">
            Where am I Going?
          </label>
          <button
            type="button"
            onClick={() => {
              setGoingOpen(!goingOpen)
              setFromOpen(false)
            }}
            className="flex items-center justify-between w-full bg-white/90 border border-gray-300 hover:border-[#1E52E8] px-4 py-3.5 rounded-2xl text-sm font-bold text-gray-800 transition-all shadow-xs"
          >
            <span>
              {goingOptions.find((o) => o.name === whereGoing)?.flag || '🌍'}{' '}
              {whereGoing}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${goingOpen ? 'rotate-180' : ''}`} />
          </button>
          {goingOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto p-1.5">
              {goingOptions.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => {
                    setWhereGoing(opt.name)
                    setGoingOpen(false)
                  }}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-[#1E52E8] rounded-lg transition-colors"
                >
                  <span>{opt.flag}</span>
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <button
          onClick={handleGetEVisa}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-linear-to-r from-[#081638] to-[#1e3a75] hover:from-[#1e3a75] hover:to-[#081638] px-8 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,22,56,0.25)] hover:shadow-[0_12px_28px_rgba(8,22,56,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Find Course <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </>
  )
}
