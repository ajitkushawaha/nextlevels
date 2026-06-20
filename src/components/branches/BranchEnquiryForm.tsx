'use client'

import { useState } from 'react'
import { AlertCircle, Check, CheckCircle2, Loader2 } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type BranchEnquiryFormProps = {
  branchName: string
}

export default function BranchEnquiryForm({ branchName }: BranchEnquiryFormProps) {
  const branchPath = `/branches/${branchName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dialCode: '+94',
    phone: '',
    preferredCountry: '',
    educationLevel: '',
    message: '',
    termsAccepted: false,
    contactAccepted: false,
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (event.target as HTMLInputElement).checked }))
      return
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!formData.fullName || !formData.email || !formData.phone || !formData.preferredCountry || !formData.educationLevel) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    if (!formData.termsAccepted || !formData.contactAccepted) {
      setStatus('error')
      setErrorMessage('Please accept the terms and contact permissions.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.dialCode} ${formData.phone}`,
          educationLevel: formData.educationLevel,
          preferredCountry: formData.preferredCountry,
          intakeYear: '2026',
          intakeMonth: 'Any Intake',
          message: `Branch enquiry: ${branchName}\n${formData.message || 'No additional message provided.'}`,
          sourcePage: `${branchName} Branch`,
          sourcePath: branchPath,
          sourceType: 'branch',
          sourceCountry: formData.preferredCountry,
          sourceBranch: branchName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setFormData({
        fullName: '',
        email: '',
        dialCode: '+94',
        phone: '',
        preferredCountry: '',
        educationLevel: '',
        message: '',
        termsAccepted: false,
        contactAccepted: false,
      })
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(8,22,56,0.08)] sm:p-6">
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-[#d7a23a]">
          {branchName} Branch
        </p>
        <h2 className="mt-2 text-2xl font-black text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
          Ready to Study Abroad from {branchName}?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Send your details to the {branchName} team and a counsellor will contact you.
        </p>
      </div>

      {status === 'success' && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <div>
            <p className="font-bold">Enquiry submitted successfully.</p>
            <p className="mt-1">Our {branchName} branch team will contact you shortly.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-100 bg-rose-50 p-3 text-xs text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
          <p className="font-semibold">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3.5 text-left">
        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#081638]">
            Full name*
          </label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-[#081638] outline-none transition focus:border-[#d7a23a]"
          />
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#081638]">
            Email address*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-[#081638] outline-none transition focus:border-[#d7a23a]"
          />
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#081638]">
            Mobile number*
          </label>
          <div className="flex gap-2">
            <select
              name="dialCode"
              value={formData.dialCode}
              onChange={handleChange}
              className="max-w-27 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-[#081638] outline-none focus:border-[#d7a23a]"
            >
              <option value="+94">+94 LK</option>
              <option value="+91">+91 IN</option>
              <option value="+44">+44 GB</option>
              <option value="+61">+61 AU</option>
              <option value="+1">+1 CA</option>
            </select>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              inputMode="numeric"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-[#081638] outline-none transition focus:border-[#d7a23a]"
            />
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#081638]">
              Destination*
            </label>
            <select
              name="preferredCountry"
              value={formData.preferredCountry}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-[#081638] outline-none transition focus:border-[#d7a23a]"
            >
              <option value="">Select</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#081638]">
              Study level*
            </label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-[#081638] outline-none transition focus:border-[#d7a23a]"
            >
              <option value="">Select</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Diploma">Diploma</option>
              <option value="Pathway">Pathway</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#081638]">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-[#081638] outline-none transition focus:border-[#d7a23a]"
            placeholder="Tell us your preferred course, intake, or questions..."
          />
        </div>

        <label className="flex items-start gap-2.5 text-[11px] leading-5 text-slate-500">
          <span className="relative mt-0.5 flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:border-[#d7a23a] checked:bg-[#d7a23a]"
            />
            <Check className="pointer-events-none absolute left-0 top-0 h-4 w-4 scale-0 p-0.5 text-white transition-transform peer-checked:scale-100" />
          </span>
          I agree to the terms of use and privacy policy.
        </label>

        <label className="flex items-start gap-2.5 text-[11px] leading-5 text-slate-500">
          <span className="relative mt-0.5 flex items-center">
            <input
              type="checkbox"
              name="contactAccepted"
              checked={formData.contactAccepted}
              onChange={handleChange}
              className="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:border-[#d7a23a] checked:bg-[#d7a23a]"
            />
            <Check className="pointer-events-none absolute left-0 top-0 h-4 w-4 scale-0 p-0.5 text-white transition-transform peer-checked:scale-100" />
          </span>
          Please contact me by phone, email, or SMS to assist with my enquiry.
        </label>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#081638] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#d7a23a] hover:text-[#081638] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            `Contact ${branchName} Branch`
          )}
        </button>
      </form>
    </div>
  )
}
