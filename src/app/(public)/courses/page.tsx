'use client'

import { useState, useMemo, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  Filter,
  Globe2,
  BookOpen,
  GraduationCap,
  Clock,
  DollarSign,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  X,
  Phone,
  Mail,
  User,
  AlertCircle,
  Loader2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  SlidersHorizontal
} from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/footer'

import { coursesData, scholarshipsData, universitiesData } from '@/lib/mockData'
import type { Course } from '@/lib/mockData'

const countries = ['United Kingdom', 'Canada', 'Australia', 'New Zealand', 'United States', 'Germany']
const fields = [
  'Information Technology',
  'Business & Management',
  'Health & Medicine',
  'Engineering',
  'Law',
  'Hospitality & Tourism',
  'Creative Arts & Design'
]
const degreeTypes = ['BSc', 'MSc', 'MBA', 'BEng', 'LLB', 'LLM', 'Diploma']
const levels = ['Undergraduate', 'Postgraduate', 'Diploma']

function CourseFinderContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  // Map initial search to a specific country filter if it matches country names/abbreviations
  const matchedCountry = useMemo(() => {
    if (!initialSearch) return ''
    const cleanSearch = initialSearch.toLowerCase().trim()
    if (cleanSearch === 'uk' || cleanSearch === 'united kingdom') return 'United Kingdom'
    if (cleanSearch === 'usa' || cleanSearch === 'united states' || cleanSearch === 'us') return 'United States'
    if (cleanSearch === 'nz' || cleanSearch === 'new zealand') return 'New Zealand'
    return countries.find(c => c.toLowerCase() === cleanSearch) || ''
  }, [initialSearch])

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState(matchedCountry ? '' : initialSearch)
  const [selectedCountries, setSelectedCountries] = useState<string[]>(matchedCountry ? [matchedCountry] : [])
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedDegreeTypes, setSelectedDegreeTypes] = useState<string[]>([])
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([])

  // Sync state with URL parameter changes
  useEffect(() => {
    if (matchedCountry) {
      setSelectedCountries([matchedCountry])
      setSearchTerm('')
    } else if (initialSearch) {
      setSearchTerm(initialSearch)
      setSelectedCountries([])
    } else {
      setSelectedCountries([])
      setSearchTerm('')
    }
  }, [matchedCountry, initialSearch])

  const [sortBy, setSortBy] = useState('popularity')
  const [activeTab, setActiveTab] = useState<'programmes' | 'universities' | 'scholarships'>('programmes')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showMobileSort, setShowMobileSort] = useState(false)

  const [openSections, setOpenSections] = useState({
    location: true,
    field: true,
    degree: true,
    university: true
  })

  const [searchDestinationQuery, setSearchDestinationQuery] = useState('')
  const [searchFieldQuery, setSearchFieldQuery] = useState('')
  const [searchDegreeQuery, setSearchDegreeQuery] = useState('')
  const [searchUniversityQuery, setSearchUniversityQuery] = useState('')

  // Wizard / Matcher States
  const [showWizard, setShowWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(0)
  const [wizardAnswers, setWizardAnswers] = useState({
    country: '',
    field: '',
    level: ''
  })

  // Enquiry Modal States
  const [selectedCourseForEnquiry, setSelectedCourseForEnquiry] = useState<Course | null>(null)
  const [enquiryName, setEnquiryName] = useState('')
  const [enquiryEmail, setEnquiryEmail] = useState('')
  const [enquiryPhone, setEnquiryPhone] = useState('')
  const [enquiryQualification, setEnquiryQualification] = useState('')
  const [enquiryMessage, setEnquiryMessage] = useState('')
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [enquiryError, setEnquiryError] = useState('')

  // Dynamic filter lists
  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.country.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchCountry = selectedCountries.length > 0 ? selectedCountries.includes(course.country) : true
      const matchField = selectedFields.length > 0 ? selectedFields.includes(course.field) : true
      const matchLevel = selectedDegreeTypes.length > 0 ? selectedDegreeTypes.includes(course.degreeType) : true
      const matchUniversity = selectedUniversities.length > 0 ? selectedUniversities.includes(course.university) : true

      return matchSearch && matchCountry && matchField && matchLevel && matchUniversity
    })
  }, [searchTerm, selectedCountries, selectedFields, selectedDegreeTypes, selectedUniversities])

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCountries.length > 0) count += selectedCountries.length
    if (selectedFields.length > 0) count += selectedFields.length
    if (selectedDegreeTypes.length > 0) count += selectedDegreeTypes.length
    if (selectedUniversities.length > 0) count += selectedUniversities.length
    if (searchTerm) count += 1
    return count
  }, [selectedCountries, selectedFields, selectedDegreeTypes, selectedUniversities, searchTerm])

  // Sorted list of matching programs
  const sortedCourses = useMemo(() => {
    const courses = [...filteredCourses]
    if (sortBy === 'fee_asc') {
      const getNumericFee = (feeStr: string) => {
        if (feeStr.includes('€0')) return 0
        const match = feeStr.replace(/,/g, '').match(/\d+/)
        return match ? parseInt(match[0]) : 999999
      }
      return courses.sort((a, b) => getNumericFee(a.tuitionFee) - getNumericFee(b.tuitionFee))
    }
    if (sortBy === 'fee_desc') {
      const getNumericFee = (feeStr: string) => {
        if (feeStr.includes('€0')) return 0
        const match = feeStr.replace(/,/g, '').match(/\d+/)
        return match ? parseInt(match[0]) : 0
      }
      return courses.sort((a, b) => getNumericFee(b.tuitionFee) - getNumericFee(a.tuitionFee))
    }
    if (sortBy === 'duration_asc') {
      const getDurationVal = (dStr: string) => {
        const match = dStr.match(/\d+(\.\d+)?/)
        return match ? parseFloat(match[0]) : 99
      }
      return courses.sort((a, b) => getDurationVal(a.duration) - getDurationVal(b.duration))
    }
    return courses // popularity
  }, [filteredCourses, sortBy])

  // Count helper functions for options
  const getCountryCount = (country: string) => {
    return coursesData.filter(course => {
      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.country.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchField = selectedFields.length > 0 ? selectedFields.includes(course.field) : true
      const matchLevel = selectedDegreeTypes.length > 0 ? selectedDegreeTypes.includes(course.degreeType) : true
      const matchUniversity = selectedUniversities.length > 0 ? selectedUniversities.includes(course.university) : true

      return matchSearch && course.country === country && matchField && matchLevel && matchUniversity
    }).length
  }

  const getFieldCount = (field: string) => {
    return coursesData.filter(course => {
      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.country.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchCountry = selectedCountries.length > 0 ? selectedCountries.includes(course.country) : true
      const matchLevel = selectedDegreeTypes.length > 0 ? selectedDegreeTypes.includes(course.degreeType) : true
      const matchUniversity = selectedUniversities.length > 0 ? selectedUniversities.includes(course.university) : true

      return matchSearch && matchCountry && course.field === field && matchLevel && matchUniversity
    }).length
  }

  const getDegreeCount = (degreeType: string) => {
    return coursesData.filter(course => {
      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.country.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchCountry = selectedCountries.length > 0 ? selectedCountries.includes(course.country) : true
      const matchField = selectedFields.length > 0 ? selectedFields.includes(course.field) : true
      const matchUniversity = selectedUniversities.length > 0 ? selectedUniversities.includes(course.university) : true

      return matchSearch && matchCountry && matchField && course.degreeType === degreeType && matchUniversity
    }).length
  }

  const getUniversityCount = (university: string) => {
    return coursesData.filter(course => {
      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.country.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchCountry = selectedCountries.length > 0 ? selectedCountries.includes(course.country) : true
      const matchField = selectedFields.length > 0 ? selectedFields.includes(course.field) : true
      const matchLevel = selectedDegreeTypes.length > 0 ? selectedDegreeTypes.includes(course.degreeType) : true

      return matchSearch && matchCountry && matchField && matchLevel && course.university === university
    }).length
  }

  // Get list of unique universities
  const universitiesList = useMemo(() => {
    const list = coursesData.map(c => c.university)
    return Array.from(new Set(list))
  }, [])

  // Handle Wizard Match click
  const handleWizardSelect = (key: 'country' | 'field' | 'level', value: string) => {
    setWizardAnswers(prev => ({ ...prev, [key]: value }))
    if (wizardStep < 2) {
      setWizardStep(s => s + 1)
    } else {
      setSelectedCountries(wizardAnswers.country ? [wizardAnswers.country] : (key === 'country' ? [value] : []))
      setSelectedFields(wizardAnswers.field ? [wizardAnswers.field] : (key === 'field' ? [value] : []))
      if (wizardAnswers.level || key === 'level') {
        const lvl = wizardAnswers.level || value
        if (lvl === 'Undergraduate') setSelectedDegreeTypes(['BSc', 'BEng', 'LLB'])
        else if (lvl === 'Postgraduate') setSelectedDegreeTypes(['MSc', 'MBA', 'LLM'])
        else setSelectedDegreeTypes(['Diploma'])
      }
      setShowWizard(false)
      const listEl = document.getElementById('courses-list')
      if (listEl) {
        listEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCountries([])
    setSelectedFields([])
    setSelectedDegreeTypes([])
    setSelectedUniversities([])
    setWizardAnswers({ country: '', field: '', level: '' })
    setWizardStep(0)
  }

  // Handle Quick Enquiry submit
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!enquiryName || !enquiryEmail || !enquiryPhone) {
      setEnquiryError('Please fill in all required fields.')
      setEnquiryStatus('error')
      return
    }
    setEnquiryStatus('submitting')
    setEnquiryError('')

    const payload = {
      fullName: enquiryName,
      email: enquiryEmail,
      phone: enquiryPhone,
      educationLevel: enquiryQualification || 'Not Specified',
      fieldOfStudy: selectedCourseForEnquiry?.title || 'Unknown Course',
      preferredCountry: selectedCourseForEnquiry?.country || 'Any',
      intakeYear: new Date().getFullYear().toString(),
      intakeMonth: selectedCourseForEnquiry?.intakes[0] || 'Any Intake',
      message: enquiryMessage || `Enquiring for ${selectedCourseForEnquiry?.title} at ${selectedCourseForEnquiry?.university}.`
    }

    try {
      const res = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setEnquiryStatus('success')
        setEnquiryName('')
        setEnquiryEmail('')
        setEnquiryPhone('')
        setEnquiryQualification('')
        setEnquiryMessage('')
      } else {
        const data = await res.json()
        setEnquiryError(data.error || 'Failed to submit enquiry. Please try again.')
        setEnquiryStatus('error')
      }
    } catch {
      setEnquiryError('A network error occurred. Please check your connection.')
      setEnquiryStatus('error')
    }
  }

  // Render filters in sidebar or mobile drawer
  const renderSidebarFilters = () => (
    <div className="bg-white rounded-3xl border border-slate-200/60 p-5 shadow-[0_8px_30px_rgba(8,22,56,0.02)] text-left space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <h3 className="font-extrabold text-[#081638] text-lg">Filters</h3>
        {(searchTerm || selectedCountries.length > 0 || selectedFields.length > 0 || selectedDegreeTypes.length > 0 || selectedUniversities.length > 0) && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#d7a23a] hover:text-[#081638] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div className="space-y-2">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Search Keywords</label>
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-slate-200/80 text-xs focus:outline-none focus:border-[#d7a23a] focus:ring-1 focus:ring-[#d7a23a]/10 bg-slate-50/50"
          />
        </div>
      </div>

      {/* 1. Location / Destination Accordion */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => setOpenSections(prev => ({ ...prev, location: !prev.location }))}
          className="w-full flex items-center justify-between font-extrabold text-[#081638] text-sm py-1.5 focus:outline-none"
        >
          <span>Location</span>
          {openSections.location ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        
        {openSections.location && (
          <div className="mt-3 space-y-3.5 transition-all">
            <div className="relative">
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 text-xs font-bold text-slate-500 bg-slate-50/50 focus:outline-none appearance-none cursor-pointer"
                value=""
                onChange={e => {
                  const val = e.target.value
                  if (val && !selectedCountries.includes(val)) {
                    setSelectedCountries(prev => [...prev, val])
                  }
                }}
              >
                <option value="">Search by Study Destination</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none flex items-center text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Narrow by Country or Region</p>
              {countries.map(country => {
                const flags: { [k: string]: string } = {
                  'United Kingdom': '🇬🇧',
                  'Canada': '🇨🇦',
                  'Australia': '🇦🇺',
                  'New Zealand': '🇳🇿',
                  'United States': '🇺🇸',
                  'Germany': '🇩🇪'
                }
                const isChecked = selectedCountries.includes(country)
                return (
                  <label key={country} className="flex items-center justify-between py-1.5 cursor-pointer hover:bg-slate-50 rounded px-1.5 transition-colors group">
                    <span className="text-xs font-bold text-slate-600 group-hover:text-[#081638]">
                      {flags[country] || '🌍'} {country}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-400">{getCountryCount(country)}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedCountries(prev =>
                            prev.includes(country)
                              ? prev.filter(c => c !== country)
                              : [...prev, country]
                          )
                        }}
                        className="h-4 w-4 rounded border-slate-300 text-[#081638] focus:ring-[#d7a23a] cursor-pointer"
                      />
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Field of Study Accordion */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => setOpenSections(prev => ({ ...prev, field: !prev.field }))}
          className="w-full flex items-center justify-between font-extrabold text-[#081638] text-sm py-1.5 focus:outline-none"
        >
          <span>Field of Study</span>
          {openSections.field ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.field && (
          <div className="mt-3 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search fields..."
                value={searchFieldQuery}
                onChange={e => setSearchFieldQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-full border border-slate-200/80 text-xs focus:outline-none focus:border-[#d7a23a] bg-slate-50/30"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>

            <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
              {fields
                .filter(f => f.toLowerCase().includes(searchFieldQuery.toLowerCase()))
                .map(field => {
                  const isChecked = selectedFields.includes(field)
                  return (
                    <label key={field} className="flex items-center justify-between py-1.5 cursor-pointer hover:bg-slate-50 rounded px-1.5 transition-colors group">
                      <span className="text-xs font-bold text-slate-600 group-hover:text-[#081638] truncate max-w-[140px]">{field}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400">{getFieldCount(field)}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedFields(prev =>
                              prev.includes(field)
                                ? prev.filter(f => f !== field)
                                : [...prev, field]
                            )
                          }}
                          className="h-4 w-4 rounded border-slate-300 text-[#081638] focus:ring-[#d7a23a] cursor-pointer"
                        />
                      </div>
                    </label>
                  )
                })}
            </div>
          </div>
        )}
      </div>

      {/* 3. Degree Type Accordion */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => setOpenSections(prev => ({ ...prev, degree: !prev.degree }))}
          className="w-full flex items-center justify-between font-extrabold text-[#081638] text-sm py-1.5 focus:outline-none"
        >
          <span>Degree Type</span>
          {openSections.degree ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.degree && (
          <div className="mt-3 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search degrees..."
                value={searchDegreeQuery}
                onChange={e => setSearchDegreeQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-full border border-slate-200/80 text-xs focus:outline-none focus:border-[#d7a23a] bg-slate-50/30"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>

            <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
              {degreeTypes
                .filter(d => d.toLowerCase().includes(searchDegreeQuery.toLowerCase()))
                .map(deg => {
                  const isChecked = selectedDegreeTypes.includes(deg)
                  return (
                    <label key={deg} className="flex items-center justify-between py-1.5 cursor-pointer hover:bg-slate-50 rounded px-1.5 transition-colors group">
                      <span className="text-xs font-bold text-slate-600 group-hover:text-[#081638]">{deg}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400">{getDegreeCount(deg)}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedDegreeTypes(prev =>
                              prev.includes(deg)
                                ? prev.filter(d => d !== deg)
                                : [...prev, deg]
                            )
                          }}
                          className="h-4 w-4 rounded border-slate-300 text-[#081638] focus:ring-[#d7a23a] cursor-pointer"
                        />
                      </div>
                    </label>
                  )
                })}
            </div>
          </div>
        )}
      </div>

      {/* 4. University Accordion */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => setOpenSections(prev => ({ ...prev, university: !prev.university }))}
          className="w-full flex items-center justify-between font-extrabold text-[#081638] text-sm py-1.5 focus:outline-none"
        >
          <span>University</span>
          {openSections.university ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.university && (
          <div className="mt-3 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search universities..."
                value={searchUniversityQuery}
                onChange={e => setSearchUniversityQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-full border border-slate-200/80 text-xs focus:outline-none focus:border-[#d7a23a] bg-slate-50/30"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>

            <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
              {universitiesList
                .filter(u => u.toLowerCase().includes(searchUniversityQuery.toLowerCase()))
                .map(uni => {
                  const isChecked = selectedUniversities.includes(uni)
                  return (
                    <label key={uni} className="flex items-center justify-between py-1.5 cursor-pointer hover:bg-slate-50 rounded px-1.5 transition-colors group">
                      <span className="text-xs font-bold text-slate-600 group-hover:text-[#081638] truncate max-w-[140px]">{uni}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400">{getUniversityCount(uni)}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedUniversities(prev =>
                              prev.includes(uni)
                                ? prev.filter(u => u !== uni)
                                : [...prev, uni]
                            )
                          }}
                          className="h-4 w-4 rounded border-slate-300 text-[#081638] focus:ring-[#d7a23a] cursor-pointer"
                        />
                      </div>
                    </label>
                  )
                })}
            </div>
          </div>
        )}
      </div>

    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between pt-10">

      <main className="w-full grow py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-14">

          {/* Interactive Matcher Wizard */}
          {showWizard && (
            <div className="mb-12 bg-[#061331] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#d7a23a]/5 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold text-[#d7a23a] uppercase tracking-widest">Step {wizardStep + 1} of 3</span>
                  <h3 className="text-xl font-bold text-white mt-1">Course Matcher Assistant</h3>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2].map((idx) => (
                    <span
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === wizardStep ? 'w-8 bg-[#d7a23a]' : idx < wizardStep ? 'w-2 bg-[#d7a23a]/50' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                {wizardStep === 0 && (
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Globe2 className="w-5 h-5 text-[#d7a23a]" /> Where is your preferred study destination?
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                      {countries.map(country => {
                        const flags: { [k: string]: string } = {
                          'United Kingdom': '🇬🇧',
                          'Canada': '🇨🇦',
                          'Australia': '🇦🇺',
                          'New Zealand': '🇳🇿',
                          'United States': '🇺🇸'
                        }
                        return (
                          <button
                            key={country}
                            onClick={() => handleWizardSelect('country', country)}
                            className="flex flex-col items-center justify-center p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#d7a23a] transition-all group cursor-pointer text-center"
                          >
                            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{flags[country] || '🌍'}</span>
                            <span className="text-xs font-bold text-white/90 group-hover:text-[#d7a23a] transition-colors">{country}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {wizardStep === 1 && (
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#d7a23a]" /> What is your primary field of interest?
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {fields.map(field => (
                        <button
                          key={field}
                          onClick={() => handleWizardSelect('field', field)}
                          className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#d7a23a] text-left transition-colors cursor-pointer"
                        >
                          <div className="h-8 w-8 rounded-lg bg-[#d7a23a]/10 flex items-center justify-center text-[#d7a23a]">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-white/90">{field}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#d7a23a]" /> What degree level are you seeking?
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {levels.map(level => (
                        <button
                          key={level}
                          onClick={() => handleWizardSelect('level', level)}
                          className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#d7a23a] transition-colors cursor-pointer text-center"
                        >
                          <GraduationCap className="w-8 h-8 text-[#d7a23a] mb-2" />
                          <span className="text-sm font-bold text-white/90">{level}</span>
                          <span className="text-[10px] text-white/40 mt-1">
                            {level === 'Undergraduate' ? 'Bachelor\'s Degrees' : level === 'Postgraduate' ? 'Master\'s & Ph.D.' : 'Professional Diplomas'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2-Column Search layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Filter Sidebar (Desktop only) */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6 lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto pr-1">
              {renderSidebarFilters()}
            </aside>

            {/* Right Column: Search Results List */}
            <section className="lg:col-span-9 space-y-6">
              
              {/* Results count & Header stats with dynamic tabs and mobile actions */}
              <div className="sticky top-[80px] bg-slate-50 z-20 pb-4 pt-4 flex flex-col gap-4 border-b border-slate-200 text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-extrabold text-[#081638] text-xl sm:text-2xl">
                      Search Degrees
                    </h2>
                    <p className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">
                      {activeTab === 'programmes' && (
                        <>Found <span className="text-[#081638] font-bold">{filteredCourses.length}</span> matching programs</>
                      )}
                      {activeTab === 'universities' && (
                        <>Found <span className="text-[#081638] font-bold">{universitiesList.length}</span> partner institutions</>
                      )}
                      {activeTab === 'scholarships' && (
                        <>Found <span className="text-[#081638] font-bold">{scholarshipsData.filter(s => selectedCountries.length === 0 || selectedCountries.includes(s.country)).length}</span> scholarships available</>
                      )}
                    </p>
                  </div>
                  
                  {/* Premium Tab switcher directly in the header */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    <div className="bg-slate-100 p-1 rounded-xl flex gap-1 items-center">
                      <button 
                        onClick={() => setActiveTab('programmes')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          activeTab === 'programmes' 
                            ? 'bg-[#081638] text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                        }`}
                      >
                        Programmes
                      </button>
                      <button 
                        onClick={() => setActiveTab('universities')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          activeTab === 'universities' 
                            ? 'bg-[#081638] text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                        }`}
                      >
                        Universities
                      </button>
                      <button 
                        onClick={() => setActiveTab('scholarships')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          activeTab === 'scholarships' 
                            ? 'bg-[#081638] text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                        }`}
                      >
                        Scholarships
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-header controls for sorting and filters */}
                <div className="flex items-center justify-between gap-4">
                  <div className="hidden lg:flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#081638] bg-white focus:outline-none focus:border-[#d7a23a] cursor-pointer"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="fee_asc">Tuition Fee: Low to High</option>
                      <option value="fee_desc">Tuition Fee: High to Low</option>
                      <option value="duration_asc">Duration: Shortest first</option>
                    </select>
                  </div>

                  {/* Mobile Trigger buttons */}
                  <div className="lg:hidden flex gap-2 w-full justify-between sm:justify-end">
                    <button
                      onClick={() => setShowMobileFilters(true)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#081638] text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Filter className="w-3.5 h-3.5" /> Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </button>
                    <button
                      onClick={() => setShowMobileSort(true)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-200 text-[#081638] font-bold text-[11px] uppercase tracking-wider bg-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5" /> Sort
                    </button>
                  </div>
                </div>
              </div>

              {/* Conditional tab body rendering */}
              <div className="space-y-6">
                {activeTab === 'programmes' && (
                  <div className="space-y-6">
                    {sortedCourses.length > 0 ? (
                      sortedCourses.map(course => {
                        const universityInitials = course.university
                          .split(' ')
                          .filter(w => w !== 'of' && w !== 'University' && w !== 'College')
                          .map(w => w[0])
                            return (
                          <div
                            key={course.id}
                            className="bg-white rounded-3xl border border-slate-200/60 p-6 hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 flex flex-col gap-5 text-left relative"
                          >
                            {/* Top Row: Logo & Organisation Info */}
                            <div className="flex gap-4 items-start">
                              <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center font-black text-sm text-[#081638] uppercase shrink-0 shadow-2xs">
                                {universityInitials}
                              </div>
                              <div className="grow space-y-0.5 min-w-0">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                  <strong className="text-xs font-black text-[#081638] hover:text-[#d7a23a] transition-colors truncate max-w-[220px] sm:max-w-none">
                                    <Link href={`/universities/${encodeURIComponent(course.university)}`} className="hover:underline">
                                      {course.university}
                                    </Link>
                                  </strong>
                                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-400 shrink-0">
                                    <span className="text-[#d7a23a]">★</span> 4.0 <span className="text-slate-300 font-semibold">(50)</span>
                                  </span>
                                </div>
                                <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                                  <span>{course.flag}</span> {course.location}, {course.country}
                                </p>
                                <span className="inline-block text-[9px] font-black text-[#d7a23a] bg-[#d7a23a]/5 px-2 py-0.5 rounded border border-[#d7a23a]/15 uppercase tracking-wider mt-1">
                                  Top 5% Worldwide
                                </span>
                              </div>
                            </div>

                            {/* Middle Row: Title & description */}
                            <div className="space-y-1.5">
                              <h2 className="font-extrabold text-[#081638] text-lg sm:text-xl leading-snug hover:text-[#d7a23a] transition-colors">
                                <Link href={`/courses/${course.id}`} className="hover:underline">
                                  {course.title}
                                </Link>
                              </h2>
                              <p className="text-slate-500 text-xs leading-relaxed max-w-3xl line-clamp-2">
                                {course.description}
                              </p>
                            </div>

                            {/* Facts Row: Tags */}
                            <div className="flex flex-wrap gap-1.5">
                              <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#081638]/5 text-[#081638]/90">
                                {course.level}
                              </span>
                              <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#d7a23a]/10 text-[#a37517]">
                                {course.field}
                              </span>
                              <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                                Full-time
                              </span>
                              <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                                On-campus
                              </span>
                            </div>

                            {/* Bottom Row: Price, Duration, and Call to Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-1">
                              <div className="flex flex-wrap items-baseline gap-2">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{course.duration}</span>
                                <span className="text-[#081638] font-black text-sm sm:text-base">{course.tuitionFee}</span>
                              </div>

                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                                <button
                                  onClick={() => setSelectedCourseForEnquiry(course)}
                                  className="px-4 py-2 rounded-full border border-slate-200 text-[#081638] hover:bg-slate-50 text-[11px] font-black tracking-wide cursor-pointer transition-colors whitespace-nowrap text-center"
                                >
                                  Enquire Now
                                </button>
                                <Link
                                  href={`/courses/${course.id}`}
                                  className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] text-[11px] font-black tracking-wide transition-all shadow-xs whitespace-nowrap text-center"
                                >
                                  View Programme Information
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-xl mx-auto shadow-xs">
                        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                          <Search className="h-6 w-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-[#061331]">No Courses Found</h3>
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                          We couldn&apos;t find any courses matching your specific search or filter combinations. Try resetting filters or request a custom university plan.
                        </p>
                        <button
                          onClick={resetFilters}
                          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#061331] hover:bg-[#d7a23a] text-white hover:text-[#061331] text-xs font-bold transition-all cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" /> Reset Filters
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'universities' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {universitiesList.map(uni => {
                      const count = coursesData.filter(c => c.university === uni).length
                      const sampleCourse = coursesData.find(c => c.university === uni)
                      const country = sampleCourse ? sampleCourse.country : ''
                      const flag = sampleCourse ? sampleCourse.flag : '🏛️'
                      const isSelected = selectedUniversities.includes(uni)
                      
                      const uniDetails = universitiesData[uni] || {
                        worldRank: '#900+',
                        location: sampleCourse ? sampleCourse.location : 'Global Campus',
                        established: '1970'
                      }
                      const logoInitials = uni.split(' ').filter(w => w !== 'of' && w !== 'University' && w !== 'College').map(w => w[0]).join('').substring(0, 3)

                      return (
                        <div 
                          key={uni}
                          onClick={() => {
                            setSelectedUniversities(prev => 
                              prev.includes(uni) ? prev.filter(u => u !== uni) : [...prev, uni]
                            )
                            setActiveTab('programmes')
                          }}
                          className={`bg-white rounded-3xl border p-6 transition-all duration-300 text-left cursor-pointer flex flex-col justify-between gap-5 hover:shadow-xl ${
                            isSelected 
                              ? 'border-[#d7a23a] bg-[#d7a23a]/2 shadow-sm' 
                              : 'border-slate-200/60 hover:border-slate-300'
                          }`}
                        >
                          {/* Header section */}
                          <header className="flex gap-4 items-start">
                            <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center font-black text-sm text-[#081638] uppercase shrink-0 shadow-2xs">
                              {logoInitials}
                            </div>
                            <div className="space-y-0.5 min-w-0 grow">
                              <h2 className="font-extrabold text-[#081638] text-base truncate">
                                <Link 
                                  href={`/universities/${encodeURIComponent(uni)}`} 
                                  onClick={(e) => e.stopPropagation()} 
                                  className="hover:underline hover:text-[#d7a23a] transition-colors"
                                >
                                  {uni}
                                </Link>
                              </h2>
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                <strong className="text-[#081638] font-extrabold">4.1</strong>
                                <span className="text-[#d7a23a]">★</span>
                                <span className="text-slate-300 font-semibold">(107 reviews)</span>
                              </div>
                            </div>
                          </header>

                          {/* Content section */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                              <div className="space-y-1">
                                <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Location</div>
                                <div className="text-[#081638] font-bold truncate">{flag} {uniDetails.location || country}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Attendance</div>
                                <div className="text-[#081638] font-bold">Online / On campus</div>
                              </div>
                            </div>

                            {/* QuickFacts icons row */}
                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-slate-100 pt-4 text-xs">
                              <div className="flex items-center gap-2 text-slate-500 font-semibold">
                                <span className="text-base">📊</span>
                                <div>
                                  <div className="text-slate-400 text-[9px] font-black uppercase tracking-wider">Global Rank</div>
                                  <div className="text-[#081638] font-extrabold text-[11px]">{uniDetails.worldRank}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500 font-semibold">
                                <span className="text-base">🏫</span>
                                <div>
                                  <div className="text-slate-400 text-[9px] font-black uppercase tracking-wider">Type</div>
                                  <div className="text-[#081638] font-extrabold text-[11px]">Public</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500 font-semibold">
                                <span className="text-base">📚</span>
                                <div>
                                  <div className="text-slate-400 text-[9px] font-black uppercase tracking-wider">Bachelors</div>
                                  <div className="text-[#081638] font-extrabold text-[11px]">{count} Programs</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500 font-semibold">
                                <span className="text-base">🎓</span>
                                <div>
                                  <div className="text-slate-400 text-[9px] font-black uppercase tracking-wider">Scholarships</div>
                                  <div className="text-[#081638] font-extrabold text-[11px]">Available</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer section */}
                          <footer className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-4 mt-1">
                            <Link 
                              href={`/universities/${encodeURIComponent(uni)}`} 
                              onClick={(e) => e.stopPropagation()} 
                              className="px-4 py-2 rounded-full border border-slate-200 text-[#081638] hover:bg-slate-50 text-[11px] font-black tracking-wide cursor-pointer transition-colors text-center whitespace-nowrap"
                            >
                              Visit University Page
                            </Link>

                            <div className="flex gap-1.5 flex-wrap self-end sm:self-center">
                              <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                                Global Top 5%
                              </span>
                              <span className="text-[9px] font-black text-[#d7a23a] bg-[#d7a23a]/5 px-2 py-0.5 rounded border border-[#d7a23a]/15 uppercase tracking-wider">
                                Featured
                              </span>
                            </div>
                          </footer>
                        </div>
                      )
                    })}
                  </div>
                )}

                {activeTab === 'scholarships' && (
                  <div className="space-y-6">
                    {scholarshipsData
                      .filter(s => selectedCountries.length === 0 || selectedCountries.includes(s.country))
                      .map(sch => (
                        <div 
                          key={sch.id}
                          className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-xs hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between gap-5 relative"
                        >
                          {/* Top Provider Tag */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#081638] text-white">
                              {sch.type}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-500">
                              Independent Provider
                            </span>
                          </div>

                          {/* Quick Facts section */}
                          <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4 text-xs font-semibold">
                            <div className="space-y-1">
                              <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Grant / Award</div>
                              <div className="text-emerald-600 font-extrabold truncate">{sch.award}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Deadline</div>
                              <div className="text-amber-600 font-extrabold">{sch.deadline}</div>
                            </div>
                          </div>

                          {/* Middle Section: Title & Description */}
                          <div className="space-y-2">
                            <h2 className="font-extrabold text-[#081638] text-lg sm:text-xl leading-snug hover:text-[#d7a23a] transition-colors">
                              <Link href={`/scholarships/${sch.id}`} className="hover:underline">
                                {sch.title}
                              </Link>
                            </h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md inline-block">
                              Merit-based
                            </p>
                            <p className="text-slate-500 text-xs leading-relaxed max-w-3xl line-clamp-2">
                              {sch.eligibility}
                            </p>
                            <Link 
                              href={`/scholarships/${sch.id}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7a23a] hover:text-[#081638] transition-colors mt-2"
                            >
                              Read more about eligibility <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                          {/* Footer Provider Info & Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-4 mt-1">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-[#081638]/5 flex items-center justify-center shrink-0 text-base">
                                🏛️
                              </div>
                              <div>
                                <div className="text-[11px] font-extrabold text-[#081638]">Global Scholarship Office</div>
                                <div className="text-[10px] text-slate-400 font-bold">{sch.country}</div>
                              </div>
                            </div>

                            <button
                              onClick={() => setSelectedCourseForEnquiry({
                                id: sch.id,
                                title: `${sch.title} Application`,
                                university: sch.type,
                                location: 'Global Scholarship Office',
                                country: sch.country,
                                flag: '🏆',
                                field: 'Scholarships & Bursaries',
                                level: 'Funding Assistance',
                                duration: 'Academic Year',
                                tuitionFee: sch.award,
                                intakes: [sch.deadline],
                                visaSuccess: 'Guaranteed Assistance',
                                description: sch.eligibility,
                                degreeType: 'Scholarship'
                              })}
                              className="px-5 py-2.5 rounded-full bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] text-[11px] font-black tracking-wide transition-all cursor-pointer shadow-xs text-center"
                            >
                              Enquire For Scholarship
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        
      </main>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-[#061331]/80 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-[#081638] text-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#d7a23a]" />
                <h3 className="font-bold text-base">Filter Search</h3>
              </div>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grow overflow-y-auto p-6 space-y-6 text-left">
              {renderSidebarFilters()}
            </div>
            
            <div className="p-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-3 rounded-xl bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] text-xs font-bold transition-all cursor-pointer"
              >
                Show {filteredCourses.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sort Bottom Sheet */}
      {showMobileSort && (
        <div className="fixed inset-0 z-50 bg-[#061331]/60 backdrop-blur-xs flex items-end justify-center">
          <div className="absolute inset-0" onClick={() => setShowMobileSort(false)}></div>
          <div className="relative bg-white w-full rounded-t-3xl max-w-lg p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 z-50">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-[#081638] text-base">Sort Options</h3>
              <button 
                onClick={() => setShowMobileSort(false)}
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-2">
              {[
                { value: 'popularity', label: 'Popularity' },
                { value: 'fee_asc', label: 'Tuition Fee: Low to High' },
                { value: 'fee_desc', label: 'Tuition Fee: High to Low' },
                { value: 'duration_asc', label: 'Duration: Shortest first' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value)
                    setShowMobileSort(false)
                  }}
                  className={`w-full text-left py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    sortBy === opt.value 
                      ? 'bg-[#081638]/5 text-[#081638]' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <CheckCircle className="w-4 h-4 text-[#d7a23a]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enquiry modal */}
      {selectedCourseForEnquiry && (
        <div className="fixed inset-0 z-50 bg-[#061331]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-slate-100">
            
            <div className="bg-[#061331] px-6 py-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-[#d7a23a] uppercase tracking-widest">Selected Course/Scholarship Inquiry</span>
                <h3 className="text-white font-bold text-lg leading-tight mt-0.5 line-clamp-1">
                  {selectedCourseForEnquiry.title}
                </h3>
                <p className="text-white/60 text-xs mt-0.5">
                  {selectedCourseForEnquiry.university} • {selectedCourseForEnquiry.country}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCourseForEnquiry(null)
                  setEnquiryStatus('idle')
                }}
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {enquiryStatus === 'error' && (
              <div className="mx-6 mt-4 flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                <p className="font-medium">{enquiryError}</p>
              </div>
            )}

            {enquiryStatus === 'success' ? (
              <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-4 ring-emerald-100">
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-[#061331] mb-2">Request Received!</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Thank you! Your profile assessment has been registered. A study abroad advisor will reach out to you within 24 hours to plan your application process for <strong>{selectedCourseForEnquiry.university}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSelectedCourseForEnquiry(null)
                    setEnquiryStatus('idle')
                  }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#061331] hover:bg-[#d7a23a] text-white hover:text-[#061331] text-xs font-bold transition-all cursor-pointer"
                >
                  Return to course listing
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
                
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#061331] uppercase tracking-wider">Full Name <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kirishanth Selvaraj"
                      value={enquiryName}
                      onChange={e => setEnquiryName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d7a23a] focus:ring-2 focus:ring-[#d7a23a]/10 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#061331] uppercase tracking-wider">Email Address <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@example.com"
                        value={enquiryEmail}
                        onChange={e => setEnquiryEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d7a23a] focus:ring-2 focus:ring-[#d7a23a]/10 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#061331] uppercase tracking-wider">WhatsApp Number <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +94 77 519 8195"
                        value={enquiryPhone}
                        onChange={e => setEnquiryPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d7a23a] focus:ring-2 focus:ring-[#d7a23a]/10 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#061331] uppercase tracking-wider">Highest Level of Education</label>
                  <select
                    value={enquiryQualification}
                    onChange={e => setEnquiryQualification(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 bg-slate-50 focus:outline-none focus:border-[#d7a23a]"
                  >
                    <option value="">Select Qualification</option>
                    <option value="Ordinary Levels (O/L)">Ordinary Levels (O/L)</option>
                    <option value="Advanced Levels (A/L)">Advanced Levels (A/L)</option>
                    <option value="Diploma / HND">Diploma / HND</option>
                    <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                    <option value="Master's Degree">Master&apos;s Degree</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#061331] uppercase tracking-wider">Additional Message (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Any specific questions, grades or intakes preferences..."
                    value={enquiryMessage}
                    onChange={e => setEnquiryMessage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d7a23a] bg-slate-50 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourseForEnquiry(null)
                      setEnquiryStatus('idle')
                    }}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={enquiryStatus === 'submitting'}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#d7a23a] text-[#061331] text-xs font-bold hover:bg-[#efbd5a] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {enquiryStatus === 'submitting' ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...</>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </button>
                </div>

              </form>
            )}
            
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default function CourseFinderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-[#d7a23a] h-10 w-10" /></div>}>
      <CourseFinderContent />
    </Suspense>
  )
}
