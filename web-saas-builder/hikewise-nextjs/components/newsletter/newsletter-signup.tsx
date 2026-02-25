'use client'

import { useState, FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'default' | 'inline' | 'featured'
  title?: string
  subtitle?: string
  className?: string
}

export function NewsletterSignup({
  variant = 'default',
  title = 'Get Study Tips in Your Inbox',
  subtitle = 'Join 1,000+ students improving their focus. Weekly tips, no spam.',
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Reset error
    setErrorMessage('')

    // Validate email
    if (!email || !validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      setStatus('error')
      return
    }

    // Check consent
    if (!consent) {
      setErrorMessage('Please agree to receive our newsletter')
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setEmail('')
      setConsent(false)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.')
    }
  }

  // Inline variant (for footer)
  if (variant === 'inline') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 bg-white dark:bg-input/30"
            aria-label="Email address"
          />
          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-forest hover:bg-forest-light text-white"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Subscribing...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Subscribed!
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
        <label className="flex items-start gap-2 mt-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={status === 'loading' || status === 'success'}
            className="mt-0.5 rounded border-muted-foreground/30"
          />
          <span>I agree to receive study tips and updates from HikeWise</span>
        </label>
        {status === 'error' && errorMessage && (
          <p className="text-sm text-destructive mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errorMessage}
          </p>
        )}
      </div>
    )
  }

  // Featured variant (for blog listing page)
  if (variant === 'featured') {
    return (
      <div className={`p-8 bg-gradient-to-br from-forest to-forest-light rounded-3xl text-white ${className}`}>
        <div className="max-w-xl mx-auto text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-white/80 mb-6">{subtitle}</p>

          {status === 'success' ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-white" />
              <h4 className="text-xl font-semibold mb-2">Welcome!</h4>
              <p className="text-white/80">
                Check your email to confirm your subscription.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/30"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-white text-forest hover:bg-white/90 font-medium px-8"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>

              <label className="flex items-start gap-2 text-sm text-white/90 text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={status === 'loading'}
                  className="mt-0.5 rounded border-white/30 bg-white/10"
                  required
                />
                <span>I agree to receive study tips and updates from HikeWise</span>
              </label>

              {status === 'error' && errorMessage && (
                <p className="text-sm text-white bg-destructive/20 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    )
  }

  // Default variant (for blog post bottom)
  return (
    <div className={`border border-sage bg-gradient-to-br from-white to-cream rounded-2xl p-8 ${className}`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center">
              <Mail className="w-8 h-8 text-teal" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{subtitle}</p>

            {status === 'success' ? (
              <div className="bg-teal/10 rounded-xl p-4 flex items-center gap-3 text-teal">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Welcome to the community!</p>
                  <p className="text-sm text-teal/80">Check your email to confirm your subscription.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="flex-1"
                    aria-label="Email address"
                  />
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-teal hover:bg-teal/90 text-white px-6"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      'Get Study Tips'
                    )}
                  </Button>
                </div>

                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={status === 'loading'}
                    className="mt-0.5 rounded border-muted-foreground/30"
                    required
                  />
                  <span>
                    I agree to receive study tips and updates from HikeWise. Unsubscribe anytime.
                  </span>
                </label>

                {status === 'error' && errorMessage && (
                  <p className="text-sm text-destructive flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
