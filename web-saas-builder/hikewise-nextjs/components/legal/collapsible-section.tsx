'use client'

import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface CollapsibleSectionProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-xl overflow-hidden my-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-6 bg-muted/50 hover:bg-muted transition-colors text-left"
        aria-expanded={isOpen}
        aria-controls={`collapsible-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {icon && (
          <div className="shrink-0 w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
            {icon}
          </div>
        )}
        <span className="flex-1 font-semibold text-lg">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={`collapsible-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 prose prose-sm max-w-none">
          {children}
        </div>
      </div>
    </div>
  )
}
