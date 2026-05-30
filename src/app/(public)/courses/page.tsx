'use client'

import { useState, useMemo, Suspense } from 'react'
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
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/footer'

// ── Types ────────────────────────────────────────────────────────────
interface Course {
  id: string
  title: string
  university: string
  location: string
  country: string
  flag: string
  field: string
  level: string
  duration: string
  tuitionFee: string
  intakes: string[]
  visaSuccess: string
  description: string
}

// ── Course Dataset ───────────────────────────────────────────────────
const coursesData: Course[] = [
  {
    id: '1',
    title: 'MSc Data Science & Artificial Intelligence',
    university: 'Coventry University',
    location: 'Coventry',
    country: 'United Kingdom',
    flag: '🇬🇧',
    field: 'Information Technology',
    level: 'Postgraduate',
    duration: '1 Year',
    tuitionFee: '£16,500 - £18,900 / year',
    intakes: ['January', 'May', 'September'],
    visaSuccess: 'Very High',
    description: 'Specialised postgraduate program covering deep learning, machine learning, neural networks, and modern data visualization techniques.'
  },
  {
    id: '2',
    title: 'Bachelor of Computer Science',
    university: 'University of New South Wales',
    location: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    field: 'Information Technology',
    level: 'Undergraduate',
    duration: '3 Years',
    tuitionFee: 'A$45,000 - A$49,000 / year',
    intakes: ['February', 'June', 'September'],
    visaSuccess: 'High',
    description: 'World-renowned undergraduate degree providing a solid foundation in software engineering, algorithms, database systems, and cyber security.'
  },
  {
    id: '3',
    title: 'Master of Business Administration (MBA)',
    university: 'University of Toronto',
    location: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    field: 'Business & Management',
    level: 'Postgraduate',
    duration: '2 Years',
    tuitionFee: 'C$58,000 - C$62,000 / year',
    intakes: ['September'],
    visaSuccess: 'High',
    description: 'Premier executive MBA focusing on global leadership, venture creation, strategic consulting, finance, and corporate management.'
  },
  {
    id: '4',
    title: 'BSc Nursing (Honours)',
    university: 'Humber College',
    location: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    field: 'Health & Medicine',
    level: 'Undergraduate',
    duration: '4 Years',
    tuitionFee: 'C$21,000 - C$24,000 / year',
    intakes: ['January', 'September'],
    visaSuccess: 'Very High',
    description: 'Hands-on clinical training, critical care diagnostics, patient care ethics, and research-led healthcare practices.'
  },
  {
    id: '5',
    title: 'Master of Professional Engineering',
    university: 'University of Western Australia',
    location: 'Perth',
    country: 'Australia',
    flag: '🇦🇺',
    field: 'Engineering',
    level: 'Postgraduate',
    duration: '2 Years',
    tuitionFee: 'A$41,000 - A$44,000 / year',
    intakes: ['February', 'July'],
    visaSuccess: 'High',
    description: 'Accredited professional engineering degree specializing in civil, mechanical, environmental, or electrical engineering.'
  },
  {
    id: '6',
    title: 'Bachelor of Software Engineering (Hons)',
    university: 'Auckland University of Technology',
    location: 'Auckland',
    country: 'New Zealand',
    flag: '🇳🇿',
    field: 'Information Technology',
    level: 'Undergraduate',
    duration: '4 Years',
    tuitionFee: 'NZ$38,000 - NZ$42,000 / year',
    intakes: ['March', 'July'],
    visaSuccess: 'Very High',
    description: 'Core project-based engineering program with a major focus on full stack web apps, mobile systems, Agile methodology, and DevOps.'
  },
  {
    id: '7',
    title: 'MSc International Business & Management',
    university: 'Manchester Metropolitan University',
    location: 'Manchester',
    country: 'United Kingdom',
    flag: '🇬🇧',
    field: 'Business & Management',
    level: 'Postgraduate',
    duration: '1 Year',
    tuitionFee: '£17,000 - £19,500 / year',
    intakes: ['January', 'September'],
    visaSuccess: 'Very High',
    description: 'Advanced master\'s program analyzing global trade markets, multinational operations, digital trade, and supply chain logistics.'
  },
  {
    id: '8',
    title: 'Bachelor of Business Analytics',
    university: 'Deakin University',
    location: 'Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    field: 'Business & Management',
    level: 'Undergraduate',
    duration: '3 Years',
    tuitionFee: 'A$35,000 - A$38,000 / year',
    intakes: ['March', 'July', 'November'],
    visaSuccess: 'High',
    description: 'Integrating business decisions with data analytics, predictive modeling, data visualization, and statistics.'
  },
  {
    id: '9',
    title: 'Master of Public Health (MPH)',
    university: 'University of Auckland',
    location: 'Auckland',
    country: 'New Zealand',
    flag: '🇳🇿',
    field: 'Health & Medicine',
    level: 'Postgraduate',
    duration: '1.5 Years',
    tuitionFee: 'NZ$43,000 - NZ$46,000 / year',
    intakes: ['February', 'July'],
    visaSuccess: 'Very High',
    description: 'Postgraduate public health research program investigating epidemiology, biostatistics, health systems policy, and global health action.'
  },
  {
    id: '10',
    title: 'MSc Cybersecurity & Cloud Computing',
    university: 'Arizona State University',
    location: 'Phoenix, AZ',
    country: 'United States',
    flag: '🇺🇸',
    field: 'Information Technology',
    level: 'Postgraduate',
    duration: '2 Years',
    tuitionFee: '$28,000 - $32,000 / year',
    intakes: ['January', 'August'],
    visaSuccess: 'High',
    description: 'Cutting-edge program designed to protect digital infrastructure, addressing cloud security architecture, cryptography, and network defense.'
  },
  {
    id: '11',
    title: 'Diploma in Hospitality & Tourism Management',
    university: 'Capilano University',
    location: 'Vancouver',
    country: 'Canada',
    flag: '🇨🇦',
    field: 'Hospitality & Tourism',
    level: 'Diploma',
    duration: '2 Years',
    tuitionFee: 'C$16,000 - C$18,000 / year',
    intakes: ['January', 'May', 'September'],
    visaSuccess: 'High',
    description: 'Fast-track industry-focused program providing co-op training options in hotels, resorts, and tourism organizations.'
  },
  {
    id: '12',
    title: 'BEng Creative Technologies & Design',
    university: 'University of Colorado Boulder',
    location: 'Boulder, CO',
    country: 'United States',
    flag: '🇺🇸',
    field: 'Creative Arts & Design',
    level: 'Undergraduate',
    duration: '4 Years',
    tuitionFee: '$38,000 - $42,000 / year',
    intakes: ['August'],
    visaSuccess: 'High',
    description: 'Interdisciplinary degree combining engineering principles with visual arts, design, UX/UI, animation, and digital fabrication.'
  }
]

const countries = ['United Kingdom', 'Canada', 'Australia', 'New Zealand', 'United States']
const fields = [
  'Information Technology',
  'Business & Management',
  'Health & Medicine',
  'Engineering',
  'Hospitality & Tourism',
  'Creative Arts & Design'
]
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
  const [selectedCountry, setSelectedCountry] = useState(matchedCountry)
  const [selectedField, setSelectedField] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

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
      
      const matchCountry = selectedCountry ? course.country === selectedCountry : true
      const matchField = selectedField ? course.field === selectedField : true
      const matchLevel = selectedLevel ? course.level === selectedLevel : true

      return matchSearch && matchCountry && matchField && matchLevel
    })
  }, [searchTerm, selectedCountry, selectedField, selectedLevel])

  // Handle Wizard Match click
  const handleWizardSelect = (key: 'country' | 'field' | 'level', value: string) => {
    setWizardAnswers(prev => ({ ...prev, [key]: value }))
    if (wizardStep < 2) {
      setWizardStep(s => s + 1)
    } else {
      setSelectedCountry(wizardAnswers.country || (key === 'country' ? value : ''))
      setSelectedField(wizardAnswers.field || (key === 'field' ? value : ''))
      setSelectedLevel(wizardAnswers.level || (key === 'level' ? value : ''))
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
    setSelectedCountry('')
    setSelectedField('')
    setSelectedLevel('')
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between pt-20">
      
      {/* Hero section */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100 py-16 sm:py-24">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#f0f7ff] rounded-full blur-[90px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#fffcf4] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 text-center z-10">
          <nav className="flex justify-center items-center gap-2 mb-6 text-xs font-bold uppercase tracking-widest text-[#061331]/50">
            <Link href="/" className="hover:text-[#d7a23a] transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#d7a23a]">Course Finder</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black text-[#081638] tracking-tight leading-[1.1] mb-6">
            Find Your Dream <br />
            <span className="text-[#d7a23a] relative inline-block mt-2">
              Global Course
              <span className="absolute bottom-2 left-0 w-full h-[4px] bg-[#d7a23a] rounded-full opacity-30"></span>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Search, match, and filter through top undergraduate, postgraduate, and diploma degrees in the UK, Canada, Australia, New Zealand, and USA. 
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setShowWizard(true)
                setWizardStep(0)
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#081638] to-[#1e3a75] hover:from-[#1e3a75] hover:to-[#081638] px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#d7a23a]" />
              Start Course Matcher Quiz
            </button>
            
            {showWizard && (
              <button
                onClick={() => setShowWizard(false)}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200 px-6 py-3 text-sm font-semibold text-[#061331] transition-colors cursor-pointer"
              >
                Close Matcher
              </button>
            )}
          </div>
        </div>
      </section>

      <main className="w-full grow py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">

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

          {/* Search bar and filters */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search course title or university..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d7a23a] focus:ring-2 focus:ring-[#d7a23a]/10 transition-all bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto grow max-w-2xl">
                <select
                  value={selectedCountry}
                  onChange={e => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50 focus:outline-none focus:border-[#d7a23a] appearance-none"
                >
                  <option value="">All Destinations</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select
                  value={selectedField}
                  onChange={e => setSelectedField(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50 focus:outline-none focus:border-[#d7a23a] appearance-none"
                >
                  <option value="">All Fields</option>
                  {fields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>

                <select
                  value={selectedLevel}
                  onChange={e => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50 focus:outline-none focus:border-[#d7a23a] appearance-none"
                >
                  <option value="">All Levels</option>
                  {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {(searchTerm || selectedCountry || selectedField || selectedLevel) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-[#061331] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Directory Listings */}
          <div id="courses-list" className="scroll-mt-24">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Found <span className="text-[#061331]">{filteredCourses.length}</span> matching courses
              </p>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => {
                  const universityInitials = course.university
                    .split(' ')
                    .filter(w => w !== 'of' && w !== 'University' && w !== 'College')
                    .map(w => w[0])
                    .join('')
                    .substring(0, 3)

                  return (
                    <div
                      key={course.id}
                      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                    >
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black text-[#061331] border border-slate-200/50 uppercase">
                            {universityInitials}
                          </div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <CheckCircle2 className="w-3 h-3" />
                            Visa: {course.visaSuccess}
                          </span>
                        </div>

                        <h3 className="font-bold text-[#061331] text-base leading-snug group-hover:text-[#d7a23a] transition-colors line-clamp-2 min-h-[44px]">
                          {course.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 mt-1.5 flex items-center gap-1">
                          {course.university}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#061331]/5 text-[#061331]/80">
                            {course.level}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#d7a23a]/10 text-[#a37517]">
                            {course.field}
                          </span>
                        </div>
                      </div>

                      <div className="px-6 py-4 border-y border-slate-50 bg-slate-50/50 grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Duration</p>
                            <p className="font-semibold text-[#061331] mt-0.5">{course.duration}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500">
                          <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Country</p>
                            <p className="font-semibold text-[#061331] mt-0.5">{course.flag} {course.country}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500 col-span-2">
                          <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Est. Tuition Fees</p>
                            <p className="font-semibold text-[#061331] mt-0.5">{course.tuitionFee}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-4 flex items-center justify-between gap-4 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Intakes</span>
                          <span className="text-[11px] font-bold text-slate-600 truncate max-w-[120px]">
                            {course.intakes.join(', ')}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedCourseForEnquiry(course)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#061331] hover:bg-[#d7a23a] text-white hover:text-[#061331] text-xs font-bold transition-all duration-300 cursor-pointer shadow-md shadow-[#061331]/5"
                        >
                          Enquire Now
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
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

        </div>
      </main>

      {/* Enquiry modal */}
      {selectedCourseForEnquiry && (
        <div className="fixed inset-0 z-50 bg-[#061331]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-slate-100">
            
            <div className="bg-[#061331] px-6 py-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-[#d7a23a] uppercase tracking-widest">Selected Course Inquiry</span>
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
