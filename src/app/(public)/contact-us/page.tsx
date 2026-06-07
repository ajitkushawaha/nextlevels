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

import Image from 'next/image'

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
    <div className="min-h-screen bg-white text-[#061331] font-sans flex flex-col justify-between">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden min-h-[340px] sm:h-[360px] lg:h-[400px] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-[110px] pb-6 sm:pb-8 lg:py-[40px] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
          alt="Contact Us Banner"
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />

        {/* Content Container */}
        <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb */}
          <div className="max-w-[750px]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                <li>
                  <Link href="/" className="hover:text-[#d7a23a] transition-colors">
                    Home
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none text-white font-semibold">
                  <span>Contact Us</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Bottom Title & Badge */}
          <div className="mt-auto space-y-3 pt-6 text-left">
            <div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                Get In Touch
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              Contact Us
            </h1>
            
            <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              Email, call, or complete the form to learn how Next Level Education can guide your study abroad journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full grow py-16 bg-[#fbf8fc] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Section: Title & Form */}
          <div className="grid grid-cols-1 pb-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start px-6 sm:px-8 lg:px-14">
            
            {/* Left Column: Heading and info details */}
            <div className="lg:col-span-7 text-left space-y-12 mt-6">
              <div className="space-y-3">
                <span className="text-[#d7a23a] text-xs font-black uppercase tracking-widest block">
                  Reach Out To Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
                  We'd Love to Hear From You
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                  Have questions about university options, scholarships, or the visa application process? Our expert counselors are here to help.
                </p>
              </div>

              {/* Core Email/Phone Contacts */}
              <div className="space-y-4">
                <a 
                  href="mailto:info@nextleveleducation.com" 
                  className="block text-xl font-bold text-[#081638] hover:text-[#d7a23a] transition-colors"
                >
                  info@nextleveleducation.com
                </a>
                <div className="flex items-center">
                  <a
                    href="tel:+94775198195"
                    className="flex items-center gap-3 rounded-md border border-[#d7a23a] px-4 py-1.5 transition duration-300 hover:bg-[#061331]/5"
                  >
                    <PhoneCall className="h-5 w-5 text-[#d7a23a]" />
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] leading-tight text-slate-400">Call Anytime</span>
                      <span className="text-[13px] font-bold text-[#081638] leading-tight">+94775198195</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Lower Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-slate-200">
                <div className="space-y-2">
                  <h4 className="font-bold text-[#081638] text-base">Student Support</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    Our support team is available to help with university applications and visa questions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-[#081638] text-base">Feedback & Suggestions</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    We value your input to continuously refine and improve our counseling services.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-[#081638] text-base">Institutional Inquiries</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    For university partnerships or administrative queries, contact us directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: "Get in Touch" Card Form */}
            <div 
              id="contact-form-card"
              className="lg:col-span-5 bg-white border border-slate-200/60 rounded-[32px] p-6 sm:p-8 shadow-[0_15px_50px_rgba(8,22,56,0.03)] text-left relative"
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
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-[24px] p-4 text-sm text-[#081638] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#081638] focus:ring-1 focus:ring-[#081638]/5 transition-all resize-none pb-7"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-10 border-t bg-white border-slate-200 px-6 sm:px-8 lg:px-14 mt-16 rounded-[32px] shadow-[0_10px_35px_rgba(8,22,56,0.02)]">
            
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
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
