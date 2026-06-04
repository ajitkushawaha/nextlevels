'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Smartphone, Monitor, Save, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactCMSPage() {
  const [viewportMode, setViewportMode] = useState<'mobile' | 'desktop'>('mobile')

  // Contact page states
  const [contactPhone, setContactPhone] = useState('+94775198195')
  const [contactEmail, setContactEmail] = useState('info@nextlevel.com')

  const handleSave = () => {
    toast.success('Contact page CMS content saved (Mock)')
  }

  const handleReset = () => {
    setContactPhone('+94775198195')
    setContactEmail('info@nextlevel.com')
    toast.info('Form details reset')
  }

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Contact Page CMS</h1>
          <p className="text-slate-500 text-sm mt-0.5">Edit support phone numbers and email details for website visitor queries.</p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Editor Form */}
        <div className="xl:col-span-5">
          <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-5">
              <CardTitle className="text-sm font-bold text-slate-800">Support Details</CardTitle>
              <CardDescription className="text-[11px] text-slate-400">Modify phone numbers and email contacts</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-5 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="cont-phone">Phone Number</Label>
                <Input
                  id="cont-phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cont-email">Email Address</Label>
                <Input
                  id="cont-email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="bg-slate-50 border-slate-200"
                />
              </div>

              <hr className="border-slate-100" />

              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  className="flex-1 bg-[#061331] text-white hover:bg-slate-800 text-xs font-semibold rounded-lg h-9 flex items-center justify-center gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Content
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="flex-1 text-slate-600 bg-white border-slate-200 text-xs font-semibold rounded-lg h-9 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Live Viewport Preview */}
        <div className="xl:col-span-7">
          <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-800">Live Website Preview</CardTitle>
                <CardDescription className="text-[10px] text-slate-400">Updates instantly as you edit the forms</CardDescription>
              </div>
              <div className="flex items-center gap-1 bg-slate-200/50 p-0.5 rounded-lg border border-slate-200">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setViewportMode('mobile')}
                  className={`h-6 px-2.5 text-[10px] font-bold rounded flex items-center gap-1 ${
                    viewportMode === 'mobile' ? 'bg-white shadow-xs text-slate-800' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Smartphone className="h-3 w-3" /> Mobile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setViewportMode('desktop')}
                  className={`h-6 px-2.5 text-[10px] font-bold rounded flex items-center gap-1 ${
                    viewportMode === 'desktop' ? 'bg-white shadow-xs text-slate-800' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Monitor className="h-3 w-3" /> Desktop
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 bg-slate-100/50 flex justify-center items-center overflow-x-auto">
              {viewportMode === 'mobile' ? (
                <div className="w-full max-w-[270px] bg-white border border-slate-300 rounded-3xl shadow-xl p-3 flex flex-col justify-between aspect-9/16 relative transition-all duration-300">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-slate-800 rounded-full mr-2"></div>
                    <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mt-4 px-1">
                    <span className="font-bold text-[9px] text-slate-900 tracking-tight">Next Level</span>
                  </div>

                  <div className="flex-1 py-8 flex flex-col justify-center text-left space-y-4 px-2">
                    <h2 className="text-sm font-extrabold text-slate-950 leading-tight text-center">Get in Touch</h2>
                    <div className="space-y-2.5">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-[8px] text-slate-400 font-bold block uppercase">Phone Support</span>
                        <p className="text-[10px] font-bold text-slate-800 mt-0.5">{contactPhone}</p>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-[8px] text-slate-400 font-bold block uppercase">Official Email</span>
                        <p className="text-[10px] font-bold text-slate-800 mt-0.5">{contactEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-1 bg-slate-900 w-16 mx-auto rounded-full mt-2"></div>
                </div>
              ) : (
                <div className="w-full bg-white border border-slate-300 rounded-2xl shadow-xl p-4 flex flex-col justify-between aspect-16/10 transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 px-2">
                    <span className="font-bold text-xs text-slate-950 tracking-tight">Next Level</span>
                    <nav className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold">
                      <span>Home</span>
                      <span>About</span>
                      <span className="text-slate-950 font-bold">Contact</span>
                      <span className="bg-[#061331] text-white px-2.5 py-1 rounded-md text-[9px] font-bold">Apply Now</span>
                    </nav>
                  </div>

                  <div className="flex-1 py-8 flex flex-col justify-center items-center text-center space-y-4 px-12">
                    <h2 className="text-base font-extrabold text-slate-950 leading-tight">Get in Touch</h2>
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
                        <span className="text-[9px] text-slate-400 font-bold block uppercase">Phone Support</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">{contactPhone}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
                        <span className="text-[9px] text-slate-400 font-bold block uppercase">Official Email</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">{contactEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
