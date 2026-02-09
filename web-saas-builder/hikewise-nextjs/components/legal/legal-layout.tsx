'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { TableOfContents } from './table-of-contents'

interface LegalLayoutProps {
  children: ReactNode
  title: string
  lastUpdated: string
  icon: ReactNode
  sections: Array<{
    id: string
    title: string
  }>
}

export function LegalLayout({
  children,
  title,
  lastUpdated,
  icon,
  sections,
}: LegalLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = (scrolled / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <div className="relative pt-20 pb-20 min-h-screen">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          className="h-full bg-gradient-to-r from-teal to-forest transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full bg-teal text-white shadow-lg flex items-center justify-center hover:bg-forest transition-colors"
        aria-label="Toggle table of contents"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Table of Contents Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 bg-card border-l border-border z-40 transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-lg">Table of Contents</h3>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-80px)] p-6">
          <TableOfContents
            sections={sections}
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex gap-12 max-w-7xl mx-auto">
          {/* Desktop Table of Contents - Fixed on Left */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <div className="bg-muted rounded-2xl p-6">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                  Table of Contents
                </h3>
                <TableOfContents sections={sections} />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal/10 mb-6">
                {icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-muted-foreground text-lg">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
