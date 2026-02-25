import { useState, useEffect, useMemo } from "react";
import { List, ChevronUp, ChevronDown } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  minHeadings?: number;
  variant?: "inline" | "sidebar";
}

const TableOfContents = ({ content, minHeadings = 3, variant = "inline" }: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(variant === "sidebar");
  const [activeId, setActiveId] = useState<string | null>(null);

  const headings = useMemo(() => {
    const items: TOCItem[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].replace(/\*\*/g, '').replace(/\*/g, '');
        const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        items.push({ id, text, level });
      }
    });

    return items;
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveId(headings[i].id);
            return;
          }
        }
      }

      if (headingElements.length > 0) {
        setActiveId(headings[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length < minHeadings) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (variant === "sidebar") {
    return (
      <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <p className="flex items-center gap-2 font-medium text-gray-500 text-xs uppercase tracking-wider mb-2">
          <List className="h-3.5 w-3.5" />
          Contents
        </p>
        <ul className="space-y-0.5 border-l border-gray-200">
          {headings.filter(h => h.level === 2).map((heading) => (
            <li
              key={heading.id}
              className="pl-3"
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full text-xs leading-relaxed py-1 transition-colors hover:text-purple-600 ${
                  activeId === heading.id
                    ? 'text-purple-600 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // Inline variant (mobile)
  return (
    <nav className="bg-gray-50 rounded-lg p-4 mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="flex items-center gap-2 font-semibold text-gray-800">
          <List className="h-5 w-5" />
          Table of Contents
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <ul className="mt-4 space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full text-sm transition-colors hover:text-purple-600 ${
                  activeId === heading.id
                    ? 'text-purple-600 font-medium'
                    : 'text-gray-600'
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default TableOfContents;
