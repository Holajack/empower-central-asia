'use client'

import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

interface Section {
  id: string
  title: string
}

interface TableOfContentsProps {
  sections: Section[]
  onNavigate?: () => void
}

export function TableOfContents({ sections, onNavigate }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  // Scroll spy - track which section is currently in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all section elements
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sections])

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Call onNavigate callback (used to close mobile menu)
      onNavigate?.()
    }
  }

  return (
    <nav className="space-y-1" aria-label="Table of contents">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all group flex items-center gap-2 ${
            activeSection === section.id
              ? 'bg-teal text-white font-medium'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          aria-current={activeSection === section.id ? 'location' : undefined}
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              activeSection === section.id ? 'text-white' : 'text-muted-foreground'
            } ${activeSection === section.id ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
          />
          <span className="flex-1 leading-snug">{section.title}</span>
        </button>
      ))}
    </nav>
  )
}
