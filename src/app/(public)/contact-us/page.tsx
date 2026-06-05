'use client'

import { useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import {
  Mail,
  Smartphone,
  MapPin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Globe,
  PhoneCall
} from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactUsPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+94',
    phone: '',
    preferredCountry: '',
    message: ''
  })

  const charLimit = 300

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name === 'message' && value.length > charLimit) return
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const combinedPhone = `${formData.phoneCode} ${formData.phone}`
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()

      const res = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: formData.email,
          phone: combinedPhone,
          preferredCountry: formData.preferredCountry || 'Not Selected',
          message: formData.message,
          educationLevel: 'Not Provided',
          intakeYear: '2026',
          intakeMonth: 'Any Intake'
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneCode: '+94',
          phone: '',
          preferredCountry: '',
          message: ''
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
    <div className="min-h-screen bg-[#081638] text-[#081638] font-sans flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glowing Orbs */}
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#d7a23a_10%,transparent_60%)] opacity-[0.08] blur-3xl"></div>
        <div className="absolute top-20 left-[-200px] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_10%,transparent_60%)] blur-2xl"></div>

        {/* Global Connection / Flight Path SVG Line */}
        <svg className="absolute top-10 right-10 w-full max-w-[600px] h-[400px] opacity-15" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 350 C 150 150, 350 100, 550 50" stroke="#d7a23a" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M 100 380 C 250 250, 400 150, 500 120" stroke="#d7a23a" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="550" cy="50" r="4" fill="#d7a23a" />
          <circle cx="500" cy="120" r="3" fill="#d7a23a" />
          <circle cx="50" cy="350" r="4" fill="#d7a23a" />
        </svg>

        {/* Subtle grid of dots */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      </div>

      {/* Main Container */}
      <main className="w-full grow pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Navigation Path */}
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 mb-8 px-6 sm:px-8 lg:px-14">
            <Link href="/" className="hover:text-[#d7a23a] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#d7a23a]">Contact Us</span>
          </nav>
          
          {/* Top Section: Title & Form */}
          <div className="grid grid-cols-1 pb-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start px-6 sm:px-8 lg:px-14">
            
            {/* Left Column: Heading and info details */}
            <div className="lg:col-span-7 text-left space-y-12 mt-6">
              <div className="space-y-3">
                <h1 className="text-5xl sm:text-6xl font-black text-[#ffff] tracking-tight leading-tight">
                  Contact <span className='text-[#d7a23a]'> Us</span>
                </h1>
                <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                  Email, call, or complete the form to learn how Next Level Education can guide your study abroad journey.
                </p>
              </div>

              {/* Core Email/Phone Contacts */}
              <div className="space-y-3">
                <a 
                  href="mailto:info@nextleveleducation.com" 
                  className="block text-xl font-bold text-[#fff] hover:text-[#d7a23a] transition-colors"
                >
                  info@nextleveleducation.com
                </a>
               <div className="hidden lg:flex items-center">
            <a
              href="tel:+91883456789"
              className="flex items-center gap-3 rounded-md border border-[#d7a23a] px-4 py-1.5 transition duration-300 hover:bg-[#061331]/5"
            >
              <PhoneCall className="h-5 w-5 text-[#d7a23a]" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] leading-tight transition duration-300 text-[#d7a23a]">Call Anytime</span>
                <span className="text-[13px] font-bold text-[#d7a23a] leading-tight">+94775198195</span>
              </div>
            </a>
          </div>
              </div>

              {/* Lower Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/20">
                <div className="space-y-2">
                  <h4 className="font-bold text-[#ffff] text-base">Student Support</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Our support team is available to help with university applications and visa questions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-[#ffff] text-base">Feedback & Suggestions</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    We value your input to continuously refine and improve our counseling services.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-[#ffff] text-base">Institutional Inquiries</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    For university partnerships or administrative queries, contact us directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: "Get in Touch" Card Form */}
            <div 
              id="contact-form-card"
              className="lg:col-span-5 bg-white border border-slate-200/60 rounded-xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(8,22,56,0.05)] text-left relative"
            >
              <div className="mb-5">
                <h2 className="text-2xl font-extrabold text-[#081638]">
                  Get in Touch
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  You can reach us anytime
                </p>
              </div>

              {status === 'success' && (
                <div className="mb-4 flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-2.5 text-xs text-emerald-700">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-bold">Message sent successfully!</p>
                    <p className="mt-0.5">Thank you for registering. Our team will contact you within 24 hours.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-4 flex items-start gap-3 rounded-2xl bg-rose-50 border border-rose-100 px-4 py-2.5 text-xs text-rose-700">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-500 mt-0.5" />
                  <p className="font-semibold">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                
                {/* Names Row */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-full px-4 py-2.5 text-sm text-[#081638] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#081638] focus:ring-1 focus:ring-[#081638]/5 transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-full px-4 py-2.5 text-sm text-[#081638] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#081638] focus:ring-1 focus:ring-[#081638]/5 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400 pointer-events-none">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-full pl-11 pr-4 py-2.5 text-sm text-[#081638] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#081638] focus:ring-1 focus:ring-[#081638]/5 transition-all"
                  />
                </div>

                {/* Phone Input with Country Code Select */}
                <div className="flex border border-slate-200/80 bg-slate-50/50 rounded-full overflow-hidden focus-within:bg-white focus-within:border-[#081638] focus-within:ring-1 focus-within:ring-[#081638]/5 transition-all">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                    className="bg-transparent pl-4 pr-1 py-2.5 text-sm text-[#081638] border-r border-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="+94">+94 (LK)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+1">+1 (CA)</option>
                    <option value="+61">+61 (AU)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent px-3.5 py-2.5 text-sm text-[#081638] placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                {/* Preferred Destination */}
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400 pointer-events-none">
                    <Globe className="h-4.5 w-4.5" />
                  </span>
                  <select
                    name="preferredCountry"
                    value={formData.preferredCountry}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-full pl-11 pr-4 py-2.5 text-sm text-[#081638] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#081638] focus:ring-1 focus:ring-[#081638]/5 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Preferred Destination</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="Germany">Germany</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-4 pointer-events-none flex items-center text-slate-400">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-[16px] p-4 text-sm text-[#081638] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#081638] focus:ring-1 focus:ring-[#081638]/5 transition-all resize-none pb-7"
                  />
                  <span className="absolute bottom-2.5 right-4 text-[9px] font-bold text-slate-400">
                    {formData.message.length}/{charLimit}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] w-full py-3 font-bold rounded-full transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                  ) : (
                    'Submit'
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-400 font-medium leading-relaxed pt-2">
                  By contacting us, you agree to our{' '}
                  <a href="/terms" className="underline hover:text-[#081638]">Terms of service</a> and{' '}
                  <a href="/privacy" className="underline hover:text-[#081638]">Privacy Policy</a>
                </p>
              </form>
            </div>

          </div>

          {/* Bottom Section: Side-by-side Map & Office details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-10 border-t bg-white  border-slate-200 px-6 sm:px-8 lg:px-14">
            
            {/* Left: Beautiful Round Map Frame */}
            <div className="lg:col-span-7 w-full h-[400px] relative rounded-[32px] overflow-hidden border border-slate-200/80 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15737.61!2d80.025!3d9.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe54c!2sKondavil%2C+Jaffna%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1700000000"
                width="100%" 
                height="100%"
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Next Level Education Office Location"
              />
            </div>

            {/* Right: Office Address Details */}
            <div className="lg:col-span-5 text-left space-y-8 lg:pl-6">
              <div className="space-y-3">
                <span className="text-[#d7a23a] text-xs font-black uppercase tracking-widest block">
                  Our Location
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081638]">
                  Connecting Near and Far
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-extrabold text-lg text-[#081638] flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#d7a23a] shrink-0" />
                    Jaffna Head Office
                  </h4>
                  <p className="text-slate-500 text-sm mt-1.5 pl-7 leading-relaxed font-medium">
                    Palali Road, Kondavil,<br />
                    Jaffna, Sri Lanka
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-extrabold text-lg text-[#081638] flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#d7a23a] shrink-0" />
                    Batticaloa Branch
                  </h4>
                  <p className="text-slate-500 text-sm mt-1.5 pl-7 leading-relaxed font-medium">
                    Main Street,<br />
                    Batticaloa, Sri Lanka
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
