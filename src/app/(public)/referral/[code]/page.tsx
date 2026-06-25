'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Footer from '@/components/layout/footer'
import FreeCounsellingForm from '@/components/contact/FreeCounsellingForm'
import { CheckCircle2, UserRoundCheck } from 'lucide-react'

export default function ReferralPage() {
  const params = useParams<{ code: string }>()
  const [code, setCode] = useState('')
  const [agentName, setAgentName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadAgent() {
      const referralCode = String(params.code || '').toUpperCase()

      try {
        const response = await fetch(`/api/public/referral-agents/${referralCode}`)
        const data = await response.json()
        if (!mounted) return
        if (!response.ok) {
          setError(data.error || 'Referral link not found')
          return
        }
        setAgentName(data.agent.name)
        setCode(data.agent.code || '')
      } catch {
        if (mounted) setError('Unable to load referral link')
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

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-7 hidden flex-col gap-4 sm:flex lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Link href="/" className="text-xs font-black uppercase tracking-[0.24em] text-[#d7a23a]">
                Next Level Education
              </Link>
              <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
                Register for your study abroad assessment
              </h1>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/72">
                Complete the form and our counsellor will guide your next step.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-black text-white/80">
              {['Free counselling', 'University admissions', 'Visa guidance'].map(item => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#d7a23a]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white p-4 shadow-[0_30px_90px_rgba(6,19,49,0.16)] sm:rounded-[32px] sm:p-6">
            <div className="mb-5 hidden items-center gap-3 rounded-2xl bg-[#f6f8fb] p-4 sm:flex">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#061331] text-[#d7a23a]">
                <UserRoundCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Registration</p>
                <p className="mt-0.5 text-sm font-black text-[#061331]">
                  Next Level Education
                </p>
              </div>
            </div>

            <FreeCounsellingForm
              heading="Register"
              description="Complete this short form and our team will contact you with country, course, university admission, visa, and scholarship guidance."
              submitLabel="Submit Registration"
              image="/branch-form-student.png"
              imageAlt="Student pointing to the registration form"
              sourcePage={agentName ? `Referral Agent: ${agentName}` : 'Referral Agent'}
              sourceType="referral-agent"
              referralAgentCode={code}
              referralAgentName={agentName}
              showImage
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
