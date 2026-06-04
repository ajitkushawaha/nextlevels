'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Smartphone, Monitor, Save, Sparkles, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export default function HomeCMSPage() {
  const [viewportMode, setViewportMode] = useState<'mobile' | 'desktop'>('mobile')

  // Homepage editable states
  const [heroHeading, setHeroHeading] = useState('Next Level Education')
  const [heroSubtitle, setHeroSubtitle] = useState('Your Study Abroad Partners')
  const [heroDescription, setHeroDescription] = useState('Leading overseas education consultancy providing free student visa consultation, university admission guidance, and comprehensive support.')
  const [ctaText, setCtaText] = useState('Course Finder')
  const [ctaLink, setCtaLink] = useState('/courses')

  const handleSave = () => {
    toast.success('Home page CMS content saved (Mock)')
  }

  const handleReset = () => {
    setHeroHeading('Next Level Education')
    setHeroSubtitle('Your Study Abroad Partners')
    setHeroDescription('Leading overseas education consultancy providing free student visa consultation, university admission guidance, and comprehensive support.')
    setCtaText('Course Finder')
    setCtaLink('/courses')
    toast.info('Form details reset')
  }

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Home Page CMS</h1>
          <p className="text-slate-500 text-sm mt-0.5">Edit homepage sections and see modifications live in the viewport frame.</p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Editor Form */}
        <div className="xl:col-span-5">
          <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-5">
              <CardTitle className="text-sm font-bold text-slate-800">Hero Section Content</CardTitle>
              <CardDescription className="text-[11px] text-slate-400">Modify content blocks and save parameters</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-5 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="hero-heading">Hero Title</Label>
                <Input
                  id="hero-heading"
                  value={heroHeading}
                  onChange={(e) => setHeroHeading(e.target.value)}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hero-sub">Hero Subtitle</Label>
                <Input
                  id="hero-sub"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hero-desc">Hero Description</Label>
                <Textarea
                  id="hero-desc"
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  rows={4}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cta-text">CTA Button Text</Label>
                  <Input
                    id="cta-text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cta-link">CTA Redirect URL</Label>
                  <Input
                    id="cta-link"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
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
                    <div className="h-4 w-4 bg-[#d7a23a] rounded flex items-center justify-center">
                      <Sparkles className="h-2 w-2 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 py-8 flex flex-col justify-center text-center space-y-4 px-2">
                    <div className="space-y-1">
                      <span className="text-[8px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded-full border border-amber-200 inline-block uppercase tracking-wider">{heroSubtitle || 'Subtitle'}</span>
                      <h2 className="text-base font-extrabold text-slate-950 leading-tight transition-all">{heroHeading || 'Heading Title'}</h2>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium line-clamp-4">{heroDescription || 'Description'}</p>
                    <div className="pt-2">
                      <button className="bg-[#061331] text-[#d7a23a] text-[9px] font-bold py-2 px-6 rounded-lg shadow-md border border-[#d7a23a]/30">
                        {ctaText || 'CTA Button'}
                      </button>
                    </div>
                  </div>

                  <div className="h-1 bg-slate-900 w-16 mx-auto rounded-full mt-2"></div>
                </div>
              ) : (
                <div className="w-full bg-white border border-slate-300 rounded-2xl shadow-xl p-4 flex flex-col justify-between aspect-16/10 transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 px-2">
                    <span className="font-bold text-xs text-slate-950 tracking-tight">Next Level</span>
                    <nav className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold">
                      <span className="text-slate-950 font-bold">Home</span>
                      <span>About</span>
                      <span>Contact</span>
                      <span className="bg-[#061331] text-white px-2.5 py-1 rounded-md text-[9px] font-bold">Apply Now</span>
                    </nav>
                  </div>

                  <div className="flex-1 py-8 flex flex-col justify-center items-center text-center space-y-4 px-12">
                    <div className="space-y-1.5 max-w-lg">
                      <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200 inline-block uppercase tracking-wider">{heroSubtitle || 'Subtitle'}</span>
                      <h2 className="text-xl font-extrabold text-slate-950 leading-tight transition-all">{heroHeading || 'Heading Title'}</h2>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-md line-clamp-3">{heroDescription || 'Description'}</p>
                    <div className="pt-2">
                      <button className="bg-[#061331] text-[#d7a23a] text-xs font-bold py-2.5 px-8 rounded-lg shadow-md border border-[#d7a23a]/30">
                        {ctaText || 'CTA Button'}
                      </button>
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
