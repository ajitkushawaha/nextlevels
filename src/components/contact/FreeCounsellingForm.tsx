'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'



export default function FreeCounsellingForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dialCode: '+94',
    phone: '',
    preferredCountry: '',
    studyTimeline: '',
    howWeHelp: '',
    counsellingMode: '',
    studyLevel: '',
    financialSource: '',
    termsAccepted: false,
    contactMeAccepted: false,
    marketingAccepted: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.preferredCountry || !formData.studyLevel) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    if (!formData.termsAccepted || !formData.contactMeAccepted) {
      setStatus('error')
      setErrorMessage('You must accept the terms and contact permissions.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const combinedPhone = `${formData.dialCode} ${formData.phone}`
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()

      // Country mapper
      const countryMap: Record<string, string> = {
        AU: 'Australia',
        CA: 'Canada',
        NZ: 'New Zealand',
        GB: 'United Kingdom',
      }
      const preferredCountry = countryMap[formData.preferredCountry] || formData.preferredCountry

      // Study level mapper
      const studyLevelMap: Record<string, string> = {
        IDPL02: 'School',
        IDPL03: 'Undergraduate',
        IDPL04: 'Postgraduate',
        IDPL05: 'Doctorate',
        IDPL06: 'Vocational',
        IDPL01: 'English Language',
        IDPL07: 'University Preparation'
      }
      const educationLevel = studyLevelMap[formData.studyLevel] || 'Undergraduate'

      // Timeline / intake mapper
      const timelineMap: Record<string, string> = {
        '1': 'Now / Immediate',
        '3': '3 Months',
        '6': '6 Months',
        '12': '12 Months',
        '15': 'More than 12 Months',
        '18': 'Not sure yet'
      }
      const timelineText = timelineMap[formData.studyTimeline] || 'Not sure yet'

      // Financial source mapper
      const financialMap: Record<string, string> = {
        '01': 'Self-Funded',
        '02': 'Parents',
        '03': 'Seeking Scholarship',
        '04': 'Seeking Government Scholarship',
        '05': 'Have Government Scholarship',
        '06': 'Bank Loan',
        '07': 'Other',
        '08': 'Employer Scholarship'
      }
      const financialText = financialMap[formData.financialSource] || 'Not Specified'

      const detailedMessage = `How we can help: ${formData.howWeHelp || 'Not Specified'}
Preferred Mode: ${formData.counsellingMode || 'Not Specified'}
Timeline: ${timelineText}
Funding Source: ${financialText}
Marketing Opt-in: ${formData.marketingAccepted ? 'Yes' : 'No'}`

      const res = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: formData.email,
          phone: combinedPhone,
          preferredCountry,
          educationLevel,
          intakeYear: '2026',
          intakeMonth: timelineText,
          message: detailedMessage
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          dialCode: '+94',
          phone: '',
          preferredCountry: '',
          studyTimeline: '',
          howWeHelp: '',
          counsellingMode: '',
          studyLevel: '',
          financialSource: '',
          termsAccepted: false,
          contactMeAccepted: false,
          marketingAccepted: false,
        })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div data-testid="mediaCardPosition" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
      {/* Form Side */}
      <div className="col-span-1 md:col-span-7 py-6 md:py-10 pr-0 md:pr-6 lg:pr-12">
        <div className="text-left">
          <h2 className="text-[#081638] text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Get FREE Counselling Today!
            <span className="block bg-[#d7a23a] w-12 h-1.5 rounded-full mt-3"></span>
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed">
            Enter your details and our expert will reach out to you to discuss your plans. By the way, all our services are free!
          </p>
        </div>

        <div className="mt-8">
          {status === 'success' && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-bold">Form submitted successfully!</p>
                <p className="mt-1">Thank you. One of our expert advisors will contact you shortly.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-800">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
              <p className="font-semibold">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} data-testid="enquiry-form" className="grid gap-5 md:grid-cols-2 text-left">
            {/* First Name */}
            <div className="form-field flex flex-col">
              <label htmlFor="first_name" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                First name*
              </label>
              <input
                type="text"
                name="firstName"
                id="first_name"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all"
              />
            </div>

            {/* Last Name */}
            <div className="form-field flex flex-col">
              <label htmlFor="last_name" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                Last name*
              </label>
              <input
                type="text"
                name="lastName"
                id="last_name"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="form-field md:col-span-2 flex flex-col">
              <label htmlFor="primary_email" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                Email address*
              </label>
              <input
                type="email"
                name="email"
                id="primary_email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all"
              />
            </div>

            {/* Mobile Number */}
            <div className="form-field md:col-span-2 flex flex-col">
              <label htmlFor="primary_mobile_number" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                Mobile number*
              </label>
              <div className="flex gap-3">
                <select
                  name="dialCode"
                  id="dialCode"
                  value={formData.dialCode}
                  onChange={handleInputChange}
                  className="max-w-[110px] bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] cursor-pointer"
                >
                  <option value="+94">+94 (LK)</option>
                  <option value="+91">+91 (IN)</option>
                  <option value="+44">+44 (GB)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+61">+61 (AU)</option>
                </select>
                <input
                  type="text"
                  name="phone"
                  id="primary_mobile_number"
                  required
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all"
                />
              </div>
            </div>

            {/* Preferred study destination */}
            <div className="form-field flex flex-col">
              <label htmlFor="preferredCountryCode" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                Your preferred study destination*
              </label>
              <select
                id="preferredCountryCode"
                name="preferredCountry"
                required
                value={formData.preferredCountry}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="AU">Australia</option>
                <option value="CA">Canada</option>
                <option value="NZ">New Zealand</option>
                <option value="GB">UK</option>
             
              </select>
            </div>

            {/* Start Timeline */}
            <div className="form-field flex flex-col">
              <label htmlFor="studyPlanTimeline" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                When would you like to start?*
              </label>
              <select
                id="studyPlanTimeline"
                name="studyTimeline"
                required
                value={formData.studyTimeline}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="1">Now</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="15">More than 12 months</option>
                <option value="18">Not sure yet</option>
              </select>
            </div>

            {/* How we can help you succeed */}
            <div className="form-field flex flex-col">
              <label htmlFor="howWeHelpSucceed" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                How we can help you succeed*
              </label>
              <select
                id="howWeHelpSucceed"
                name="howWeHelp"
                required
                value={formData.howWeHelp}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="Student Counselling">Student Counselling</option>
                <option value="Documents Check">Documents Check</option>
                <option value="Course Selection">Course Selection</option>
                <option value="University Admissions">University Admissions</option>
                <option value="Visa Assistance">Visa Assistance</option>
                <option value="Scholarship Assistance">Scholarship Assistance</option>
                <option value="Financial Aid Support">Financial Aid Support</option>
                <option value="Interview Preparation">Interview Preparation</option>
                <option value="Accommodation Assistance">Accommodation Assistance</option>
                <option value="Pre-Departure Orientation">Pre-Departure Orientation</option>
                <option value="PSW Visa Guidance">PSW Visa Guidance</option>
                <option value="Ambassador Program">Ambassador Program</option>
              </select>
            </div>

            {/* Preferred mode of counselling */}
            <div className="form-field flex flex-col">
              <label htmlFor="modeOfCounselling" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                Preferred mode of counselling*
              </label>
              <select
                id="modeOfCounselling"
                name="counsellingMode"
                required
                value={formData.counsellingMode}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="In-person">In-person</option>
                <option value="Virtual Counselling">Virtual Counselling</option>
              </select>
            </div>

            {/* Preferred study level */}
            <div className="form-field flex flex-col">
              <label htmlFor="preferredStudyLevel" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                Preferred study level*
              </label>
              <select
                id="preferredStudyLevel"
                name="studyLevel"
                required
                value={formData.studyLevel}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="IDPL02">School</option>
                <option value="IDPL03">Undergraduate</option>
                <option value="IDPL04">Postgraduate</option>
                <option value="IDPL05">Doctorate</option>
                <option value="IDPL06">Vocational</option>
                <option value="IDPL01">English Language</option>
                <option value="IDPL07">University Preparation</option>
              </select>
            </div>

            {/* How would you fund your education? */}
            <div className="form-field flex flex-col">
              <label htmlFor="primaryFinancialSource" className="text-xs font-bold text-[#081638] uppercase tracking-wider mb-1.5">
                How would you fund your education?*
              </label>
              <select
                id="primaryFinancialSource"
                name="financialSource"
                required
                value={formData.financialSource}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="01">Self-Funded</option>
                <option value="02">Parents</option>
                <option value="03">Seeking Scholarship</option>
                <option value="04">Seeking Government Scholarship</option>
                <option value="05">Have Government Scholarship</option>
                <option value="06">Bank Loan</option>
                <option value="07">Other</option>
                <option value="08">Employer Scholarship</option>
              </select>
            </div>

            {/* Checkbox 1: Terms */}
            <div className="md:col-span-2 flex items-start gap-3 mt-2">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="termsAndConditionsAcceptance"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="peer h-5 w-5 appearance-none rounded border border-slate-300 bg-white checked:bg-[#d7a23a] checked:border-[#d7a23a] focus:outline-none transition-all cursor-pointer"
                />
                <Check className="pointer-events-none absolute left-0 top-0 h-5 w-5 text-white scale-0 peer-checked:scale-100 transition-transform p-0.5" />
              </div>
              <label htmlFor="termsAndConditionsAcceptance" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#d7a23a] font-bold hover:underline">Terms of use</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#d7a23a] font-bold hover:underline">privacy policy</a>*
              </label>
            </div>

            {/* Checkbox 2: Contact Me */}
            <div className="md:col-span-2 flex items-start gap-3">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="contactMeBy"
                  name="contactMeAccepted"
                  checked={formData.contactMeAccepted}
                  onChange={handleInputChange}
                  className="peer h-5 w-5 appearance-none rounded border border-slate-300 bg-white checked:bg-[#d7a23a] checked:border-[#d7a23a] focus:outline-none transition-all cursor-pointer"
                />
                <Check className="pointer-events-none absolute left-0 top-0 h-5 w-5 text-white scale-0 peer-checked:scale-100 transition-transform p-0.5" />
              </div>
              <label htmlFor="contactMeBy" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
                Please contact me by phone, email or SMS to assist with my enquiry*
              </label>
            </div>

            {/* Checkbox 3: Marketing */}
            <div className="md:col-span-2 flex items-start gap-3">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="marketing_acceptance_flag"
                  name="marketingAccepted"
                  checked={formData.marketingAccepted}
                  onChange={handleInputChange}
                  className="peer h-5 w-5 appearance-none rounded border border-slate-300 bg-white checked:bg-[#d7a23a] checked:border-[#d7a23a] focus:outline-none transition-all cursor-pointer"
                />
                <Check className="pointer-events-none absolute left-0 top-0 h-5 w-5 text-white scale-0 peer-checked:scale-100 transition-transform p-0.5" />
              </div>
              <label htmlFor="marketing_acceptance_flag" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
                I would like to receive updates and offers from Next Level Education
              </label>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full md:w-auto px-8 py-3 bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] font-bold rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-md text-sm flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'FREE Counselling'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden md:block col-span-1 md:col-span-5 relative self-stretch min-h-[450px]">
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[32px]">
          <Image
            alt="Expert counseling session representation"
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-contain object-center"
            src="/hero5.png"
          />
        </div>
      </div>
    </div>
  )
}
