import Link from 'next/link'
import Footer from '@/components/layout/footer'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E9EFF6] text-[#061331] py-20">
      <main className="grow flex items-center justify-center p-5 sm:p-10 text-center relative overflow-hidden pt-28">
        {/* Background Decorative elements */}
        <div aria-hidden="true" className="absolute left-10 top-32 opacity-25">
          <div className="h-32 w-16 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] bg-size-[1rem_1rem]" />
        </div>
        <div aria-hidden="true" className="absolute right-10 bottom-20 opacity-25">
          <div className="h-32 w-32 bg-[radial-gradient(#d7a23a_2px,transparent_1px)] bg-size-[1rem_1rem]" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto space-y-8 bg-white/90 backdrop-blur-md p-10 rounded-3xl border border-gray-200 shadow-2xl">
          <div className="mx-auto text-7xl font-black leading-none text-[#d7a23a] sm:text-8xl" aria-hidden="true">
            404
          </div>

          <h1 className="text-3xl font-extrabold text-[#081638] sm:text-4xl" style={{ fontFamily: 'Farro, sans-serif' }}>
            Page Not Found
          </h1>

          <p className="text-gray-600 text-base md:text-lg font-medium">
            The page you&apos;re looking for doesn&apos;t exist, may have moved, or is no longer available.
          </p>
          
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#d7a23a] px-8 py-3 text-sm font-bold text-[#061331] shadow-md hover:bg-[#e3c761] transition-all duration-200 mt-4"
          >
            Return to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
