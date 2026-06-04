'use client'

import { useState } from 'react'
import Image from 'next/image'
import Footer from '@/components/layout/footer'
import {
  MapPin,
  Smartphone,
  Mail,
  Video,
  CheckCircle,
  AlertCircle,
  Loader2,
  GraduationCap,
  Award,
  Check
} from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactUsPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredCountry: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/public/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferredCountry: formData.preferredCountry,
          message: formData.message,
          // Add fallback defaults since the API might expect these fields from the wizard form
          educationLevel: 'Not Provided',
          intakeYear: '2026',
          intakeMonth: 'Any Intake'
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setFormData({
          fullName: '',
          email: '',
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
    <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e] font-sans flex flex-col justify-between select-none">
      
      {/* Hero Section */}
      <section className="relative bg-[#0e1a38] py-24 md:py-32 overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(215,162,58,0.15),transparent_70%)]"></div>
        </div>
        
        <div className="max-w-container-max mx-auto px-gutter relative z-10 text-center pt-10">
          <h1 
            className="text-4xl sm:text-5xl lg:text-[56px] font-bold mb-6 tracking-tight leading-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#bac6ec] max-w-2xl mx-auto leading-relaxed">
            Start your journey to international education today. Our expert counseling and support are 100% free for all students.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-10 px-8 bg-[#fbf8fc]">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 border border-slate-200/80 rounded-2xl shadow-xs text-left">
              <h2 
                className="text-2xl sm:text-3xl font-extrabold text-[#0e1a38] mb-8"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Send us a Message
              </h2>

              {status === 'success' && (
                <div className="mb-6 flex items-start gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs text-emerald-700">
                  <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-bold">Message sent successfully!</p>
                    <p className="mt-0.5">Thank you for registering. Our team will contact you within 24 hours.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs text-rose-700">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-500 mt-0.5" />
                  <p className="font-semibold">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 pb-15 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#f5f3f6] border border-transparent border-b-slate-200 rounded-lg p-4 text-sm text-[#1b1b1e] placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#0e1a38] focus:ring-1 focus:ring-[#0e1a38]/5"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#f5f3f6] border border-transparent border-b-slate-200 rounded-lg p-4 text-sm text-[#1b1b1e] placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#0e1a38] focus:ring-1 focus:ring-[#0e1a38]/5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+94 XX XXX XXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#f5f3f6] border border-transparent border-b-slate-200 rounded-lg p-4 text-sm text-[#1b1b1e] placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#0e1a38] focus:ring-1 focus:ring-[#0e1a38]/5"
                    />
                  </div>

                  {/* Preferred Destination */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Preferred Destination
                    </label>
                    <select
                      name="preferredCountry"
                      value={formData.preferredCountry}
                      onChange={handleInputChange}
                      className="w-full bg-[#f5f3f6] border border-transparent border-b-slate-200 rounded-lg p-4 text-sm text-[#1b1b1e] placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#0e1a38] focus:ring-1 focus:ring-[#0e1a38]/5 appearance-none"
                    >
                      <option value="">Select Destination</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Your Message */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#f5f3f6] border border-transparent border-b-slate-200 rounded-lg p-4 text-sm text-[#1b1b1e] placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#0e1a38] focus:ring-1 focus:ring-[#0e1a38]/5 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-black hover:bg-slate-950 text-white w-full py-4 font-bold rounded-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-4 text-left">
              
              {/* Office Locations */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#7d5800]">
                  Office Locations
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#0e1a38]">
                      <MapPin className="h-6 w-6 stroke-[1.5]" />
                    </span>
                    <div>
                      <p className="font-extrabold text-base text-[#0e1a38]">Jaffna Head Office</p>
                      <p className="text-slate-500 text-sm mt-0.5 font-medium">Palali Road, Kondavil, Jaffna, Sri Lanka</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#0e1a38]">
                      <MapPin className="h-6 w-6 stroke-[1.5]" />
                    </span>
                    <div>
                      <p className="font-extrabold text-base text-[#0e1a38]">Batticaloa Branch</p>
                      <p className="text-slate-500 text-sm mt-0.5 font-medium">Main Street, Batticaloa, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Contact */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#7d5800]">
                  Digital Contact
                </h3>
                <div className="space-y-4">
                  <a href="tel:+94775198195" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] transition-transform duration-300 group-hover:scale-110">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-base text-[#0e1a38] group-hover:text-[#7d5800] transition-colors">
                      +94 77 519 8195
                    </span>
                  </a>
                  
                  <a href="mailto:info@nextleveleducation.com" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#0e1a38]/5 flex items-center justify-center text-[#0e1a38] transition-transform duration-300 group-hover:scale-110">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-base text-[#0e1a38] group-hover:text-[#7d5800] transition-colors truncate">
                      info@nextleveleducation.com
                    </span>
                  </a>
                </div>
              </div>

              {/* Zoom Notification Banner */}
              <div className="p-4 bg-[#fffdf5] border-l-4 border-[#7d5800] rounded-r-xl shadow-xs">
                <div className="flex gap-4 items-center">
                  <Video className="h-5 w-5 text-[#7d5800] shrink-0" />
                  <p className="font-bold text-[#0e1a38] text-xs sm:text-sm">
                    Available for Zoom/Online Consultations
                  </p>
                </div>
              </div>

              {/* Image Card Banner */}
              <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200/80 shadow-lg group w-full">
                <Image
                  src="/home2/mock-interview.png"
                  alt="Student Consultation"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <p className="text-white font-bold text-lg">Guiding your global future</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us? (Trust Section) */}
      <section className="py-20 bg-white border-y border-slate-200/40 w-full">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <h2 
            className="text-3xl font-extrabold text-[#0e1a38] mb-16"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Why Contact Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="flex flex-col items-center">
              <div className="mb-6 text-[#7d5800] bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-center w-20 h-20">
                <Check className="h-8 w-8 stroke-[2.5]" />
              </div>
              <h4 className="font-extrabold text-lg text-[#0e1a38] mb-2">100% Free Service</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
                Expert guidance from application to enrollment without any hidden charges.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-6 text-[#7d5800] bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-center w-20 h-20">
                <GraduationCap className="h-8 w-8 stroke-[2]" />
              </div>
              <h4 className="font-extrabold text-lg text-[#0e1a38] mb-2">Official University Partners</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
                We are directly partnered with top institutions in the UK, Canada, and beyond.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-6 text-[#7d5800] bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-center w-20 h-20">
                <Award className="h-8 w-8 stroke-[2]" />
              </div>
              <h4 className="font-extrabold text-lg text-[#0e1a38] mb-2">98% Visa Success Rate</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
                Our detailed documentation support ensures the highest probability of approval.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] w-full relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15737.61!2d80.025!3d9.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe54c!2sKondavil%2C+Jaffna%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1700000000"
          width="100%" height="100%"
          style={{ border: 0 }}
          allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Next Level Education Office Location"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-xl border border-slate-200/80 flex items-center gap-3 animate-bounce">
          <MapPin className="h-5 w-5 text-rose-500 shrink-0" />
          <span className="font-extrabold text-xs text-[#0e1a38]">Next Level Education - Jaffna Office</span>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
