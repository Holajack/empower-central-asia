'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { NewsletterSignup } from './newsletter-signup'

interface NewsletterPopupProps {
  delaySeconds?: number
  showOnExit?: boolean
}

export function NewsletterPopup({
  delaySeconds = 30,
  showOnExit = true,
}: NewsletterPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const dismissed = localStorage.getItem('newsletter-popup-dismissed')
    const subscribed = localStorage.getItem('newsletter-subscribed')

    if (dismissed || subscribed) {
      return
    }

    // Show popup after delay
    const timeoutId = setTimeout(() => {
      setIsVisible(true)
    }, delaySeconds * 1000)

    // Exit intent detection
    if (showOnExit) {
      const handleMouseLeave = (e: MouseEvent) => {
        // If cursor moves to top of screen (exit intent)
        if (e.clientY <= 0 && !isDismissed) {
          setIsVisible(true)
        }
      }

      document.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [delaySeconds, showOnExit, isDismissed])

  const handleClose = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('newsletter-popup-dismissed', 'true')
  }

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8">
            <NewsletterSignup
              title="Before you go..."
              subtitle="Join 1,000+ students getting weekly study tips. No spam, unsubscribe anytime."
            />
          </div>
        </div>
      </div>
    </>
  )
}
