'use client'

import { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  Loader2, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react'
import type { Scholarship } from '@/lib/mockData'

interface Props {
  scholarship: Scholarship
}

export default function ScholarshipEnquiryForm({ scholarship }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [qualification, setQualification] = useState('')
  const [message, setMessage] = useState('')
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone) {
      setError('Please fill in all required fields.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setError('')

    const payload = {
      fullName: name,
      email: email,
      phone: phone,
      educationLevel: qualification || 'Not Specified',
      fieldOfStudy: `${scholarship.title} - Scholarship Option`,
      preferredCountry: scholarship.country,
      intakeYear: new Date().getFullYear().toString(),
      intakeMonth: scholarship.deadline,
      message: message || `Enquiring for ${scholarship.title} application guidance.`,
      sourcePage: `Scholarship: ${scholarship.title}`,
      sourcePath: `/scholarships/${scholarship.id}`,
      sourceType: 'scholarship',
      sourceCountry: scholarship.country,
      sourceScholarship: scholarship.title,
    }

    try {
      const res = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setPhone('')
        setQualification('')
        setMessage('')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to submit scholarship enquiry. Please try again.')
        setStatus('error')
      }
    } catch {
      setError('A network error occurred. Please check your connection.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 ring-4 ring-emerald-100">
          <CheckCircle className="h-6 w-6 text-emerald-500" />
        </div>
        <h4 className="text-sm font-extrabold text-[#061331]">Application Registered!</h4>
        <p className="text-[11px] text-slate-500 leading-relaxed max-w-[240px] mx-auto">
          Thank you! A senior counselor will review your criteria and contact you shortly to check funding eligibility options.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {status === 'error' && (
        <div className="flex items-start gap-2.5 rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-[11px] text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
          <p className="font-semibold leading-snug">{error}</p>
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-[10px] font-black text-[#061331] uppercase tracking-wider">Full Name <span className="text-rose-500">*</span></label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            required
            placeholder="e.g. Kirishanth Selvaraj"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d7a23a] focus:ring-1 focus:ring-[#d7a23a]/10 bg-slate-50/50 font-medium"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-[10px] font-black text-[#061331] uppercase tracking-wider">Email Address <span className="text-rose-500">*</span></label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="email"
            required
            placeholder="e.g. name@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d7a23a] focus:ring-1 focus:ring-[#d7a23a]/10 bg-slate-50/50 font-medium"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-[10px] font-black text-[#061331] uppercase tracking-wider">WhatsApp Number <span className="text-rose-500">*</span></label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="tel"
            required
            placeholder="e.g. +94 77 519 8195"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d7a23a] focus:ring-1 focus:ring-[#d7a23a]/10 bg-slate-50/50 font-medium"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-[10px] font-black text-[#061331] uppercase tracking-wider">Current Education Qualification</label>
        <select
          value={qualification}
          onChange={e => setQualification(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 bg-slate-50/50 focus:outline-none focus:border-[#d7a23a] font-medium"
        >
          <option value="">Select Level</option>
          <option value="Ordinary Levels (O/L)">Ordinary Levels (O/L)</option>
          <option value="Advanced Levels (A/L)">Advanced Levels (A/L)</option>
          <option value="Diploma / HND">Diploma / HND</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-[10px] font-black text-[#061331] uppercase tracking-wider">Message / Motivation Letter Queries</label>
        <textarea
          rows={2}
          placeholder="Any specific questions, grades or intakes preferences..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d7a23a] bg-slate-50/50 resize-none font-medium"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3 rounded-xl bg-[#081638] text-white hover:bg-[#d7a23a] hover:text-[#081638] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#081638]/5"
      >
        {status === 'submitting' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
        ) : (
          'Send Inquiry'
        )}
      </button>
    </form>
  )
}
