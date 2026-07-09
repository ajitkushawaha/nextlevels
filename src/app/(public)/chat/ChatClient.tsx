'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import FreeCounsellingForm from '@/components/contact/FreeCounsellingForm'
import { GraduationCap, BookOpen } from 'lucide-react'

export type Ambassador = {
  name: string
  program: string
  university: string
  image: string
  link?: string
  intro?: string
}

export const fallbackAmbassadors: Ambassador[] = [
  {
    name: 'Aastha Paudel',
    program: 'Information Technology',
    university: 'University of Colombo',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    intro:
      'Hi, I am Aastha. As a student ambassador, I help new students understand course choices, campus life, application steps, and what to expect before starting their study abroad journey.',
  },
  {
    name: 'Geraldine Penarete',
    program: 'Geology',
    university: 'University of Peradeniya',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
    intro:
      'Hi, I am Geraldine. I share practical student guidance about academics, daily life, documents, and how to prepare confidently for university abroad.',
  },
]

export function AmbassadorChatContent({
  ambassadorName,
  serverAmbassadors = [],
}: {
  ambassadorName?: string
  serverAmbassadors?: Ambassador[]
}) {
  const searchParams = useSearchParams()
  const name = ambassadorName || searchParams.get('name') || 'Geraldine Penarete'

  const ambassadors = serverAmbassadors.length > 0 ? serverAmbassadors : fallbackAmbassadors
  const ambassador = ambassadors.find(a => a.name.toLowerCase() === name.toLowerCase()) || ambassadors[1]

  const introText =
    ambassador.intro ||
    `Hi, I am ${ambassador.name}. As a student ambassador, I can help you understand university life, course expectations, application preparation, and practical study abroad questions.`

  return (
    <div className="min-h-screen bg-white text-[#061331] font-sans flex flex-col justify-between">
      {/* Banner / Header */}
      <section className="relative overflow-hidden bg-[#E9EFF6] py-16 pt-28">
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-14 text-left">
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <li>
                <Link href="/" className="hover:text-[#d7a23a] transition-colors">Home</Link>
                <span className="ml-2">/</span>
              </li>
              <li>
                <span className="text-slate-800 font-semibold">Chat with Ambassador</span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-200">
              <img
                src={ambassador.image}
                alt={ambassador.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grow">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] text-white text-[10px] font-black uppercase tracking-wider mb-2">
                Student Ambassador
              </span>
              <h1 className="text-3xl font-extrabold text-[#081638]" style={{ fontFamily: 'Farro, sans-serif' }}>
                Chat with {ambassador.name}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4.5 w-4.5 text-[#d7a23a]" />
                  {ambassador.university}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4.5 w-4.5 text-[#d7a23a]" />
                  {ambassador.program}
                </span>
              </div>
              <p className="mt-4 max-w-3xl rounded-2xl border border-white/70 bg-white/70 p-4 text-sm font-medium leading-7 text-slate-600 shadow-sm">
                {introText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="w-full grow py-10 bg-[#fbf8fc] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-4xl p-4 sm:p-5 lg:p-6 shadow-[0_15px_50px_rgba(8,22,56,0.03)]">
            <FreeCounsellingForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
