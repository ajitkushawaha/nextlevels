'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Search } from 'lucide-react'

export default function VisaConsultationForm() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const countries = [
    { name: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
    { name: 'Canada', flag: '🇨🇦', code: 'CA' },
    { name: 'Australia', flag: '🇦🇺', code: 'AU' },
    { name: 'New Zealand', flag: '🇳🇿', code: 'NZ' },
    { name: 'United States', flag: '🇺🇸', code: 'USA' }
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!searchQuery.trim()) return
    window.location.href = `/courses?search=${encodeURIComponent(searchQuery.trim())}`
  }

  const handleCountryClick = (countryName: string) => {
    setSearchQuery(countryName)
    setIsFocused(false)
    window.location.href = `/courses?search=${encodeURIComponent(countryName)}`
  }

  // Filter countries as the user types
  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full max-w-lg mt-6 relative z-30" ref={containerRef}>
      <div className="text-left mb-2.5 pl-2">
        <label className="text-xs font-bold text-[#061331]/50 uppercase tracking-widest">
          Where am I Going?
        </label>
      </div>
      <form onSubmit={handleSearchSubmit} className="relative z-20">
        <div className="bg-white border border-[#061331]/10 rounded-full p-1.5 shadow-lg flex items-center justify-between gap-2 transition-all duration-300 focus-within:border-[#d7a23a] focus-within:ring-2 focus-within:ring-[#d7a23a]/15">
          <div className="flex items-center gap-2.5 pl-4 grow">
            <Search className="h-4 w-4 text-[#061331]/40 shrink-0" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[#061331] placeholder:text-[#061331]/30 focus:outline-none py-2 font-medium"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-linear-to-r from-[#081638] to-[#1e3a75] hover:from-[#1e3a75] hover:to-[#081638] px-5 py-2.5 text-xs font-black text-white shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            Find Course
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown List */}
      {isFocused && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 z-[98] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d7a23a] pl-1">
              Popular Destinations
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.name}
                  type="button"
                  onClick={() => handleCountryClick(country.name)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <p className="text-xs font-bold text-[#061331] group-hover:text-[#d7a23a] transition-colors">
                        {country.name}
                      </p>
                      <p className="text-[10px] text-slate-400">Study abroad programs</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No countries found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
