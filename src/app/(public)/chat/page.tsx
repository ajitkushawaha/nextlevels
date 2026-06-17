'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import FreeCounsellingForm from '@/components/contact/FreeCounsellingForm'
import { GraduationCap, BookOpen, User } from 'lucide-react'

function ChatContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'Geraldine Penarete'

  // Ambassador data matching NextLevelHomepage
  const ambassadors = [
    {
      name: 'Aastha Paudel',
      program: 'Information Technology',
      university: 'University of Colombo',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Geraldine Penarete',
      program: 'Geology',
      university: 'University of Peradeniya',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Yumi Wan',
      program: 'Physiotherapy',
      university: 'University of Sydney',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tiara D Souza',
      program: 'Occupational Therapy',
      university: 'Monash University',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Yumi Wans',
      program: 'Physiotherapy',
      university: 'University of Melbourne',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  ]

  const ambassador = ambassadors.find(a => a.name.toLowerCase() === name.toLowerCase()) || ambassadors[1]

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
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={ambassador.image}
                alt={ambassador.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="w-full grow py-10 bg-[#fbf8fc] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-4xl p-4 sm:p-5 lg:p-6 shadow-[0_15px_50px_rgba(8,22,56,0.03)]">
            <FreeCounsellingForm  />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-400 animate-pulse">Loading...</p>
      </div>
    }>
      <ChatContent />
    </Suspense>
  )
}
