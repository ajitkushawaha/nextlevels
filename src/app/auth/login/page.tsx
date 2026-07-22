'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Shield, Mail, Lock, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/blog'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [loading, setLoading] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [error, setError] = useState('')
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const resetForgotForm = () => {
    setIsForgotPassword(false)
    setOtpSent(false)
    setOtp('')
    setNewPassword('')
    setConfirmPassword('')
    setShowNewPassword(false)
    setShowConfirmPassword(false)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        role,
        callbackUrl,
      })

      if (!res) {
        setError('Authentication service did not return a response. Please try again.')
        toast.error('Authentication service unavailable')
      } else if (res.error) {
        setError(res.error === 'CredentialsSignin' ? 'Invalid credentials' : res.error)
        toast.error('Authentication Failed: ' + (res.error === 'CredentialsSignin' ? 'Invalid credentials' : res.error))
      } else if (res.ok) {
        toast.success('Successfully logged in!')
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err: any) {
      console.error(err)
      setError('An unexpected error occurred. Please try again.')
      toast.error('Error logging in')
    } finally {
      setLoading(false)
    }
  }

  const sendResetOtp = async () => {
    setResetLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'password_reset' }),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send OTP')
      }

      setOtpSent(true)
      toast.success('OTP sent to your email')
    } catch (err: any) {
      setError(err.message || 'Unable to send OTP')
      toast.error(err.message || 'Unable to send OTP')
    } finally {
      setResetLoading(false)
    }
  }

  const resetPassword = async (event: React.FormEvent) => {
    event.preventDefault()
    setResetLoading(true)
    setError('')

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match')
      toast.error('Passwords do not match')
      setResetLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password: newPassword }),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to reset password')
      }

      toast.success('Password reset successfully. Please sign in.')
      setPassword('')
      resetForgotForm()
    } catch (err: any) {
      setError(err.message || 'Unable to reset password')
      toast.error(err.message || 'Unable to reset password')
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-radial from-slate-900 via-[#061331] to-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#d7a23a] p-2 rounded-xl shadow-lg shadow-[#d7a23a]/20">
              <Shield className="h-8 w-8 text-[#061331]" />
            </div>
          </Link>
        </div>

        <Card className="border border-white/10 bg-[#061331]/80 backdrop-blur-md shadow-2xl text-white">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              {isForgotPassword ? 'Reset Password' : 'Admin Portal'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {isForgotPassword
                ? 'Verify your email OTP and set a new password'
                : 'Enter your credentials to access the administration area'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={isForgotPassword ? resetPassword : handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@nextlevel.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder-slate-500 focus:border-[#d7a23a] focus:ring-[#d7a23a]/20"
                  />
                </div>
              </div>

              {!isForgotPassword ? (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 bg-slate-900/50 border-white/10 text-white placeholder-slate-500 focus:border-[#d7a23a] focus:ring-[#d7a23a]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(value => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#d7a23a]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true)
                      setError('')
                    }}
                    className="text-xs font-semibold text-[#d7a23a] transition hover:text-white"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={sendResetOtp}
                    disabled={resetLoading || !email}
                    className="w-full border border-[#d7a23a]/35 bg-[#d7a23a]/10 text-[#d7a23a] hover:bg-[#d7a23a] hover:text-[#061331]"
                  >
                    <Mail className="h-4 w-4" />
                    {resetLoading && !otpSent ? 'Sending OTP...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                  </Button>

                  {otpSent && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp" className="text-slate-300">Email OTP</Label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="otp"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            required
                            placeholder="Enter 6-digit OTP"
                            className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder-slate-500 focus:border-[#d7a23a] focus:ring-[#d7a23a]/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-slate-300">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                            className="pl-10 pr-10 bg-slate-900/50 border-white/10 text-white placeholder-slate-500 focus:border-[#d7a23a] focus:ring-[#d7a23a]/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(value => !value)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#d7a23a]"
                            aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-slate-300">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="pl-10 pr-10 bg-slate-900/50 border-white/10 text-white placeholder-slate-500 focus:border-[#d7a23a] focus:ring-[#d7a23a]/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(value => !value)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#d7a23a]"
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

            </CardContent>
            
            <CardFooter className="flex flex-col gap-2 pt-2 pb-6">
              <Button 
                type="submit" 
                disabled={isForgotPassword ? resetLoading || !otpSent : loading}
                className="w-full bg-[#d7a23a] hover:bg-[#c59130] text-[#061331] font-semibold py-2 rounded-md transition duration-300 flex items-center justify-center gap-2"
              >
                {(loading || resetLoading) ? (
                  <div className="h-5 w-5 border-2 border-[#061331]/30 border-t-[#061331] rounded-full animate-spin"></div>
                ) : (
                  isForgotPassword ? 'Reset Password' : 'Sign In'
                )}
              </Button>
              {isForgotPassword && (
                <button
                  type="button"
                  onClick={resetForgotForm}
                  className="text-xs font-semibold text-slate-400 transition hover:text-white"
                >
                  Back to sign in
                </button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-radial from-slate-900 via-[#061331] to-slate-950 px-4 py-12">
        <div className="text-white text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#d7a23a] mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm font-medium">Loading form...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
