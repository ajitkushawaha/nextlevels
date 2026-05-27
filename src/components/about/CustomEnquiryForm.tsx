'use client'

import { useState } from 'react'
import {
  User, Mail, Phone, GraduationCap, BookOpen, Globe2,
  Calendar, MessageSquare, CheckCircle, AlertCircle,
  Loader2, ArrowRight, ArrowLeft, ChevronRight,
} from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const STEPS = [
  { label: 'Personal', icon: User },
  { label: 'Academic', icon: GraduationCap },
  { label: 'Destination', icon: Globe2 },
]

const educationOptions = [
  'Ordinary Levels (O/L)',
  'Advanced Levels (A/L)',
  'Diploma / HND',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD / Research Program',
]

const countryOptions = [
  { value: 'United Kingdom', flag: '🇬🇧' },
  { value: 'Canada', flag: '🇨🇦' },
  { value: 'Australia', flag: '🇦🇺' },
  { value: 'New Zealand', flag: '🇳🇿' },
  { value: 'Germany', flag: '🇩🇪' },
  { value: 'Undecided / Not Sure', flag: '🌍' },
]

const monthOptions = ['Any Intake', 'Jan / Feb Intake', 'May / Jun Intake', 'Sep / Oct Intake']

export default function CustomEnquiryForm() {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    educationLevel: '', fieldOfStudy: '',
    preferredCountry: '', intakeYear: '', intakeMonth: '', message: '',
  })

  const set = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const canNext = () => {
    if (step === 0) return formData.fullName && formData.email && formData.phone
    if (step === 1) return !!formData.educationLevel
    return true
  }

  const handleSubmit = async () => {
    if (!formData.preferredCountry || !formData.intakeYear) {
      setStatus('error')
      setErrorMessage('Please select your preferred country and intake year.')
      return
    }
    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-white border border-[#ece8df] shadow-sm overflow-hidden">
        <div className="bg-[#061331] px-8 py-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#d7a23a]">Next Level Education</p>
            <h3 className="text-white font-bold text-lg mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>
              Profile Assessment Form
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#d7a23a] border border-[#d7a23a]/30 px-3 py-1 rounded-full uppercase tracking-widest">
            100% Free
          </span>
        </div>
        <div className="p-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-4 ring-emerald-100">
            <CheckCircle className="h-9 w-9 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-[#061331] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Registration Successful!
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            Thank you, <strong className="text-[#061331]">{formData.fullName}</strong>. A senior consultant
            will contact you at <strong className="text-[#061331]">{formData.phone}</strong> shortly to
            schedule your 1-on-1 planning session.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center border-t border-slate-100 pt-6">
            {[['Response Time', '< 24 hrs'], ['Consultation', 'Free'], ['Success Rate', '98%']].map(([k, v]) => (
              <div key={k}>
                <p className="text-lg font-black text-[#d7a23a]">{v}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">{k}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setFormData({ fullName: '', email: '', phone: '', educationLevel: '', fieldOfStudy: '', preferredCountry: '', intakeYear: '', intakeMonth: '', message: '' }); setStep(0); setStatus('idle') }}
            className="mt-6 text-xs font-bold text-[#061331]/50 hover:text-[#d7a23a] transition-colors cursor-pointer"
          >
            Submit another inquiry →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white border border-[#ece8df] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#061331] px-8 py-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#d7a23a]">Next Level Education</p>
            <h3 className="text-white font-bold text-lg mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>
              Profile Assessment Form
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#d7a23a] border border-[#d7a23a]/30 px-3 py-1 rounded-full uppercase tracking-widest">
            100% Free
          </span>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => {
            const StepIcon = s.icon
            const isDone = i < step
            const isActive = i === step
            return (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isDone ? 'bg-[#d7a23a] text-[#061331]' :
                      isActive ? 'bg-white text-[#061331]' :
                        'bg-white/10 text-white/40'
                    }`}>
                    {isDone ? <CheckCircle className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider hidden sm:block transition-colors duration-300 ${isActive ? 'text-white' : isDone ? 'text-[#d7a23a]' : 'text-white/30'
                    }`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-2 transition-all duration-500" style={{
                    background: isDone ? '#d7a23a' : 'rgba(255,255,255,0.1)'
                  }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div className="mx-6 mt-4 flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Step content */}
      <div className="p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#d7a23a] mb-1">Step 1 of 3</p>
              <h4 className="text-xl font-bold text-[#061331]" style={{ fontFamily: 'Georgia, serif' }}>Personal Details</h4>
              <p className="text-xs text-slate-400 mt-1">Basic information so our team can reach you directly.</p>
            </div>
            <Field icon={<User />} label="Full Name" required>
              <input
                type="text" placeholder="e.g. Kirishanth Selvaraj"
                value={formData.fullName}
                onChange={e => set('fullName', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field icon={<Mail />} label="Email Address" required>
              <input
                type="email" placeholder="e.g. name@example.com"
                value={formData.email}
                onChange={e => set('email', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field icon={<Phone />} label="WhatsApp / Mobile Number" required>
              <input
                type="tel" placeholder="e.g. +94 77 519 8195"
                value={formData.phone}
                onChange={e => set('phone', e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#d7a23a] mb-1">Step 2 of 3</p>
              <h4 className="text-xl font-bold text-[#061331]" style={{ fontFamily: 'Georgia, serif' }}>Academic Profile</h4>
              <p className="text-xs text-slate-400 mt-1">Tell us about your educational background.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#061331] mb-3">
                Highest Level of Education <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {educationOptions.map(opt => (
                  <button
                    key={opt} type="button"
                    onClick={() => set('educationLevel', opt)}
                    className={`text-left px-4 py-3 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${formData.educationLevel === opt
                        ? 'bg-[#061331] border-[#d7a23a] text-[#d7a23a] shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#061331]/30 hover:bg-slate-100'
                      }`}
                  >
                    {formData.educationLevel === opt && (
                      <span className="mr-1.5">✓</span>
                    )}
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <Field icon={<BookOpen />} label="Field of Study / Intended Subject">
              <input
                type="text" placeholder="e.g. Business Administration, Computer Science"
                value={formData.fieldOfStudy}
                onChange={e => set('fieldOfStudy', e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#d7a23a] mb-1">Step 3 of 3</p>
              <h4 className="text-xl font-bold text-[#061331]" style={{ fontFamily: 'Georgia, serif' }}>Study Destination</h4>
              <p className="text-xs text-slate-400 mt-1">Where and when are you planning to study?</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#061331] mb-3">
                Preferred Country <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {countryOptions.map(c => (
                  <button
                    key={c.value} type="button"
                    onClick={() => set('preferredCountry', c.value)}
                    className={`flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${formData.preferredCountry === c.value
                        ? 'bg-[#061331] border-[#d7a23a] shadow-md'
                        : 'bg-slate-50 border-slate-200 hover:border-[#061331]/30 hover:bg-slate-100'
                      }`}
                  >
                    <span className="text-2xl leading-none">{c.flag}</span>
                    <span className={`text-[11px] font-bold leading-tight ${formData.preferredCountry === c.value ? 'text-[#d7a23a]' : 'text-slate-600'}`}>
                      {c.value.replace(' / Not Sure', '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#061331] mb-2">
                  Preferred Year <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  {['2025', '2026', '2027'].map(y => (
                    <button
                      key={y} type="button"
                      onClick={() => set('intakeYear', y)}
                      className={`flex-1 py-2.5 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer ${formData.intakeYear === y
                          ? 'bg-[#061331] border-[#d7a23a] text-[#d7a23a]'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#061331]/30'
                        }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#061331] mb-2">Intake Season</label>
                <select
                  value={formData.intakeMonth}
                  onChange={e => set('intakeMonth', e.target.value)}
                  className={inputCls + ' appearance-none'}
                >
                  {monthOptions.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <Field icon={<MessageSquare />} label="Additional Message">
              <textarea
                rows={3}
                placeholder="Any specific questions, requirements or notes for our team..."
                value={formData.message}
                onChange={e => set('message', e.target.value)}
                className={inputCls + ' resize-none min-h-[80px]'}
              />
            </Field>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 sm:px-8 pb-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:border-[#061331]/30 hover:text-[#061331] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <span key={i} className={`block rounded-full transition-all duration-300 ${i === step ? 'w-5 h-2 bg-[#d7a23a]' : i < step ? 'w-2 h-2 bg-[#d7a23a]/60' : 'w-2 h-2 bg-slate-200'}`} />
          ))}
        </div>

        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            disabled={!canNext()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#061331] text-white text-xs font-bold hover:bg-[#d7a23a] hover:text-[#061331] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#d7a23a] text-[#061331] text-xs font-bold hover:bg-[#efbd5a] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#d7a23a]/30"
          >
            {status === 'submitting' ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Submitting...</>
            ) : (
              <><CheckCircle className="h-3.5 w-3.5" /> Register Now</>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────
const inputCls =
  'w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:outline-none focus:border-[#d7a23a] focus:ring-2 focus:ring-[#d7a23a]/10 transition-all duration-200'

function Field({
  icon, label, required, children,
}: {
  icon: React.ReactNode
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-[#061331]">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}
