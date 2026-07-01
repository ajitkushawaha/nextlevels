'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

const errorMessages: Record<string, string> = {
  AccessDenied: 'You do not have permission to access this account.',
  Configuration: 'Authentication is temporarily unavailable because of a server configuration issue.',
  CredentialsSignin: 'The email, password, or selected role is incorrect.',
  OAuthAccountNotLinked: 'This email is already connected to another sign-in method.',
  OAuthCallback: 'The external sign-in provider could not complete authentication.',
  OAuthCreateAccount: 'We could not create an account with the external sign-in provider.',
  OAuthSignin: 'The external sign-in provider could not be started.',
  SessionRequired: 'Please sign in to continue.',
  Verification: 'The sign-in link is invalid or has expired.',
}

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('error') || ''
  const message =
    errorMessages[errorCode] ||
    'We could not complete your sign-in. Please return to the login page and try again.'

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#061331] px-5 py-16 text-white">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:4rem_4rem]" />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b1c42]/85 p-7 text-center shadow-2xl backdrop-blur-md sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d7a23a] text-[#061331] shadow-lg shadow-[#d7a23a]/20">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-[#d7a23a]">
          Authentication Error
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">Sign-in was not completed</h1>
        <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-7 text-slate-300">
          {message}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/auth/login"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#d7a23a] px-5 py-3 text-sm font-bold text-[#061331] transition hover:bg-white"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-[#d7a23a] hover:text-[#d7a23a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#061331]" />}>
      <AuthErrorContent />
    </Suspense>
  )
}
