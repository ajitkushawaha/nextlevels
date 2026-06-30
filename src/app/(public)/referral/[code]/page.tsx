'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Footer from '@/components/layout/footer'

export default function ReferralPage() {
  const params = useParams<{ code: string }>()
  const [iframeUrl, setIframeUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadAgent() {
      try {
        const response = await fetch(`/api/public/referral-agents/${encodeURIComponent(String(params.code || ''))}`)
        const data = await response.json()
        if (!mounted) return
        if (!response.ok || !data.agent?.iframeUrl) {
          setError(data.error || 'Referral form not found')
          return
        }
        setIframeUrl(data.agent.iframeUrl)
      } catch {
        if (mounted) setError('Unable to load referral form')
      }
    }

    loadAgent()
    return () => {
      mounted = false
    }
  }, [params.code])

  return (
    <div className="min-h-screen bg-[#eaf0f6] text-[#061331]">
      <section className="relative overflow-hidden px-4 pb-8 pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:px-8">
        <div className="absolute inset-x-0 top-0 hidden h-80 bg-[#061331] sm:block" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-0 hidden h-80 opacity-20 sm:block"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(215,162,58,0.18) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full">
          {iframeUrl ? (
            <iframe
              title="Next Level CRM enquiry form"
              src={iframeUrl}
              height="1050"
              loading="lazy"
              className="block w-full border-0"
            />
          ) : (
            <div className="flex min-h-96 items-center justify-center rounded-2xl bg-white p-6 text-center text-sm font-semibold text-slate-500">
              {error || 'Loading referral form...'}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
