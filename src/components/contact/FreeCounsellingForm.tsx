'use client'

import { Suspense, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Check, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FreeCounsellingFormProps = {
  heading?: string
  description?: string
  qualificationLabel?: string
  qualificationPlaceholder?: string
  qualificationOptions?: string[]
  termsLabel?: string
  submitLabel?: string
  image?: string
  imageAlt?: string
  compact?: boolean
  showImage?: boolean
  sourcePage?: string
  sourceType?: string
  sourceCountry?: string
  sourceProgram?: string
  sourceUniversity?: string
  sourceScholarship?: string
  sourceBranch?: string
  referralAgentCode?: string
  referralAgentName?: string
}

const defaultQualificationOptions = [
  'Ordinary Level (O/L)',
  'Advanced Level (A/L)',
  'HND or Diploma',
  "Bachelor's Degree",
  "Master's Degree",
]

export default function FreeCounsellingForm(props: FreeCounsellingFormProps) {
  return (
    <Suspense fallback={<div className="p-4 text-center text-slate-500 text-xs">Loading assessment form...</div>}>
      <FreeCounsellingFormInner {...props} />
    </Suspense>
  )
}

function FreeCounsellingFormInner({
  heading = 'Get FREE Counselling Today!',
  description = 'Enter your details and our expert will reach out to you to discuss your plans. By the way, all our services are free!',
  qualificationLabel = 'Highest qualification',
  qualificationPlaceholder = 'Select your highest qualification',
  qualificationOptions = defaultQualificationOptions,
  termsLabel = 'I agree to the Terms of use and privacy policy',
  submitLabel = 'FREE Counselling',
  image = '/hero5.png',
  imageAlt = 'Expert counseling session representation',
  compact = false,
  showImage = true,
  sourcePage,
  sourceType = 'free-counselling',
  sourceCountry = '',
  sourceProgram = '',
  sourceUniversity = '',
  sourceScholarship = '',
  sourceBranch = '',
  referralAgentCode = '',
  referralAgentName = '',
}: FreeCounsellingFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const detectedAgentCode = referralAgentCode || searchParams.get('agent') || searchParams.get('ref') || ''
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dialCode: '+94',
    phone: '',
    highestQualification: '',
    termsAccepted: false,
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

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.highestQualification) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    if (!formData.termsAccepted) {
      setStatus('error')
      setErrorMessage('You must accept the terms and conditions.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const combinedPhone = `${formData.dialCode} ${formData.phone}`
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      const detailedMessage = 'Free counselling request'

      const res = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: formData.email,
          phone: combinedPhone,
          preferredCountry: 'Not Selected',
          educationLevel: formData.highestQualification,
          intakeYear: '2026',
          intakeMonth: 'Any Intake',
          message: detailedMessage,
          sourcePage: sourcePage || heading,
          sourcePath: pathname,
          sourceType,
          sourceCountry,
          sourceProgram,
          sourceUniversity,
          sourceScholarship,
          sourceBranch,
          referralAgentCode: detectedAgentCode,
          referralAgentName,
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
          highestQualification: '',
          termsAccepted: false,
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
    <div
      data-testid="mediaCardPosition"
      className={
        compact
          ? 'grid grid-cols-1 gap-5 items-stretch'
          : 'grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch'
      }
    >
      {/* Form Side */}
      <div className={compact ? 'py-1' : 'col-span-1 md:col-span-7 py-3 md:py-5'}>
        <div className="text-left">
          <h2 className="text-[#081638] text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
            {heading}
            <span className="block bg-[#d7a23a] w-10 h-1 rounded-full mt-2"></span>
          </h2>
          <p className="text-slate-500 mt-2 text-xs sm:text-sm leading-6">
            {description}
          </p>
        </div>

        <div className="mt-5">
          {status === 'success' && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-800">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-bold">Form submitted successfully!</p>
                <p className="mt-1">Thank you. One of our expert advisors will contact you shortly.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-800">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <p className="font-semibold">{errorMessage}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            data-testid="enquiry-form"
            className={compact ? 'grid gap-3.5 text-left' : 'grid gap-3.5 md:grid-cols-2 text-left'}
          >
            {/* First Name */}
            <div className="form-field flex min-w-0 flex-col">
              <label htmlFor="first_name" className="text-[11px] font-bold text-[#081638] uppercase tracking-wider mb-1">
                First name*
              </label>
              <input
                type="text"
                name="firstName"
                id="first_name"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all"
              />
            </div>

            {/* Last Name */}
            <div className="form-field flex min-w-0 flex-col">
              <label htmlFor="last_name" className="text-[11px] font-bold text-[#081638] uppercase tracking-wider mb-1">
                Last name*
              </label>
              <input
                type="text"
                name="lastName"
                id="last_name"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all"
              />
            </div>

            {/* Email Address */}
            <div className={`form-field flex min-w-0 flex-col ${compact ? '' : 'md:col-span-2'}`}>
              <label htmlFor="primary_email" className="text-[11px] font-bold text-[#081638] uppercase tracking-wider mb-1">
                Email address*
              </label>
              <input
                type="email"
                name="email"
                id="primary_email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all"
              />
            </div>

            {/* Mobile Number */}
            <div className={`form-field flex min-w-0 flex-col ${compact ? '' : 'md:col-span-2'}`}>
              <label htmlFor="primary_mobile_number" className="text-[11px] font-bold text-[#081638] uppercase tracking-wider mb-1">
                Mobile number*
              </label>
              <div className="flex min-w-0 gap-2">
                <select
                  name="dialCode"
                  id="dialCode"
                  value={formData.dialCode}
                  onChange={handleInputChange}
                  className="max-w-26.25 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] cursor-pointer"
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
                  className="min-w-0 flex-1 bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all"
                />
              </div>
            </div>

            {/* Highest Qualification */}
            <div className={`form-field flex min-w-0 flex-col ${compact ? '' : 'md:col-span-2'}`}>
              <label htmlFor="highest_qualification" className="text-[11px] font-bold text-[#081638] uppercase tracking-wider mb-1">
                {qualificationLabel}*
              </label>
              <select
                name="highestQualification"
                id="highest_qualification"
                required
                value={formData.highestQualification}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-[#081638] focus:outline-none focus:border-[#d7a23a] transition-all cursor-pointer"
              >
                <option value="">{qualificationPlaceholder}</option>
                {qualificationOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkbox 1: Terms */}
            <div className={`flex items-start gap-2.5 mt-1 ${compact ? '' : 'md:col-span-2'}`}>
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="termsAndConditionsAcceptance"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-[#d7a23a] checked:border-[#d7a23a] focus:outline-none transition-all cursor-pointer"
                />
                <Check className="pointer-events-none absolute left-0 top-0 h-4 w-4 text-white scale-0 peer-checked:scale-100 transition-transform p-0.5" />
              </div>
              <label htmlFor="termsAndConditionsAcceptance" className="text-[11px] text-slate-500 leading-5 cursor-pointer select-none">
                {termsLabel}*
              </label>
            </div>

            {/* Submit Button */}
            <div className={compact ? 'mt-2' : 'md:col-span-2 mt-2'}>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full md:w-auto px-7 py-2.5 bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] font-bold rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-md text-sm flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  submitLabel
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Side */}
      {showImage && (
        <div className="hidden md:block col-span-1 md:col-span-5 relative self-stretch min-h-90">
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-4xl">
            <Image
              alt={imageAlt}
              loading="eager"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain object-center"
              src={image}
            />
          </div>
        </div>
      )}
    </div>
  )
}
