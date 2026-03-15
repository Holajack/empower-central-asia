# HikeWise Website - Project Guide

## Overview
HikeWise is a smart study tracking app for students. This is the marketing/landing website hosted at **hikewise.app** on Vercel.

## Tech Stack
- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Font:** Plus Jakarta Sans (primary), Geist Mono (code)
- **Icons:** Lucide React
- **Deployment:** Vercel (project: hikewise-nextjs)

## Brand Colors
- **Cream:** #F5F9FA (background)
- **Forest:** #234E3E (dark green, headings/accents)
- **Teal:** #3D7A80 (primary accent, links, badges)
- **Sage:** #D4E5E0 (light green, secondary)
- **Foreground:** #1A1A1A (text)
- **Muted:** #6B6B6B (secondary text)

Use Tailwind classes: `cream`, `forest`, `teal`, `sage`, `cream-dark`, `forest-light`

## Project Structure
```
app/
  page.tsx              # Homepage
  blog/
    page.tsx            # Blog listing page
    [slug]/page.tsx     # Individual blog post (dynamic route)
  api/                  # API routes
  careers/, contact/, faq/, help/, privacy/, terms/
components/
  home/                 # Hero, features, CTA, testimonials, AI section
  layout/               # Header, Footer
  shared/               # Section headers, phone mockup, store buttons
  seo/                  # JSON-LD structured data
  newsletter/           # Newsletter signup component
  analytics/            # Analytics tracking
  ui/                   # shadcn/ui components (Card, Badge, etc.)
data/
  blog-posts.json       # All blog content (titles, metadata, HTML content)
```

## Blog System
- Blog posts are stored in `data/blog-posts.json` as an array of objects
- Each post has: slug, title, description, date, author, category, readTime, featured, tags, content (HTML string), image
- Blog listing at `/blog` with featured posts section and category filters
- Individual posts render HTML content from the JSON data
- SEO: BlogPostingSchema + BreadcrumbSchema JSON-LD on each post
- Related posts shown based on matching category

## Conventions
- Components use PascalCase filenames and named exports
- Use `@/` path alias for imports
- Rounded corners: `rounded-2xl` standard, `rounded-full` for pills/badges
- Shadows: `shadow-sm`, `shadow-lg`, `shadow-xl` with hover transitions
- Animations: `transition-all duration-300`, hover transforms like `group-hover:-translate-y-2`
- Gradients: `bg-gradient-to-b from-cream via-white to-cream/30` for page backgrounds

## Important Notes
- The blog-posts.json file is large (~266KB) - read with offset/limit or use Grep
- Internal links between blog posts use relative paths like `/blog/slug-name`
- All blog posts currently dated 2026-02-09
- Images stored in `/public/images/`
