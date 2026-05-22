import Link from 'next/link'
import Footer from '@/components/layout/footer'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#061331] text-white">
      <main className="flex-grow flex items-center justify-center p-5 sm:p-10 text-center relative overflow-hidden">
        {/* Background Decorative elements */}
        <div aria-hidden="true" className="absolute left-10 top-20 -translate-y-1/2 opacity-20">
          <div className="h-32 w-16 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] [background-size:1rem_1rem]" />
        </div>
        <div aria-hidden="true" className="absolute right-10 bottom-20 opacity-20">
          <div className="h-32 w-32 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] [background-size:1rem_1rem]" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto space-y-8 bg-[#030A1A]/80 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-2xl">
          <div className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#f6da73]/10 text-[#d7a23a]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            We're working on it!
          </h1>
          
          <p className="text-white/70 text-lg">
            This page is currently under construction. Our developers are working hard behind the scenes to get this ready for you soon.
          </p>
          
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#d7a23a] px-8 py-3 text-sm font-bold text-[#061331] transition hover:bg-[#e3c761] mt-4"
          >
            Return to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
