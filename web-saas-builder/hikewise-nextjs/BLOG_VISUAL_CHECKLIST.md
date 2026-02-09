# Blog Design Visual Checklist

## Quick Reference: Before vs After

### Blog Listing Page (`/blog`)

#### BEFORE:
- ❌ Plain white background
- ❌ Small headings
- ❌ Basic card shadows
- ❌ No search functionality
- ❌ No category filters
- ❌ Simple hover effects
- ❌ Basic newsletter CTA

#### AFTER:
- ✅ Gradient background (cream → white)
- ✅ Large, bold headings with accent bars
- ✅ Enhanced shadows with hover lift
- ✅ Prominent search bar with icon
- ✅ Interactive category filter pills
- ✅ Smooth transforms and scale effects
- ✅ Premium newsletter section with pattern

### Blog Post Page (`/blog/[slug]`)

#### BEFORE:
- ❌ Basic layout
- ❌ Small typography
- ❌ No share buttons
- ❌ Limited whitespace
- ❌ Plain related posts
- ❌ No sidebar
- ❌ Basic prose styling

#### AFTER:
- ✅ Hero section with gradients
- ✅ Large, readable typography (19px body, 60px+ titles)
- ✅ Social share buttons (Twitter, Facebook, LinkedIn, Copy)
- ✅ Generous whitespace throughout
- ✅ Enhanced related posts grid with hover effects
- ✅ Sidebar with TOC and CTA (desktop)
- ✅ Professional prose styling with borders and accents

## Design Elements Applied

### Typography Scale:
```
Hero Title:      text-4xl md:text-5xl lg:text-6xl (48-72px)
Section Heading: text-2xl to text-3xl (24-32px)
Body Text:       text-[19px] leading-[1.8]
Meta Text:       text-xs to text-sm (12-14px)
```

### Color Palette:
```
Teal:         #3D7A80 (primary actions)
Forest:       #234E3E (primary brand)
Forest Light: #2D6A5A (gradients)
Sage:         #D4E5E0 (accents)
Cream:        #F5F9FA (backgrounds)
```

### Spacing Scale:
```
Sections:  mb-16, mb-20 (64-80px)
Cards:     p-6, p-8 (24-32px)
Elements:  gap-3, gap-6, gap-8 (12-32px)
```

### Shadow Scale:
```
Default:  shadow-sm
Cards:    shadow-lg
Hover:    shadow-xl
Premium:  shadow-2xl
```

### Border Radius:
```
Buttons:  rounded-lg (12px)
Cards:    rounded-2xl (16px)
CTA:      rounded-3xl (24px)
Pills:    rounded-full
```

## Key Features Checklist

### Blog Listing:
- [x] Search bar with icon
- [x] Category filter pills (All + dynamic categories)
- [x] Featured posts section (2-column)
- [x] Regular posts grid (3-column on desktop)
- [x] Image overlays with gradients
- [x] Featured badges
- [x] Hover animations (lift + scale)
- [x] Newsletter CTA with pattern background
- [x] Icon accents (Calendar, Clock)
- [x] Responsive layout

### Blog Post:
- [x] Hero section with gradients
- [x] Category badge
- [x] Meta information bar
- [x] Featured image support
- [x] Enhanced prose styling
- [x] Tags section with styled pills
- [x] Share buttons (4 options)
- [x] Sidebar (desktop only)
  - [x] Table of contents placeholder
  - [x] CTA card
- [x] Related posts (3 cards)
- [x] Newsletter signup
- [x] Back to blog link

## Component States

### Hover States:
```
Cards:          -translate-y-2, shadow-xl
Buttons:        scale-[1.02], shadow-md
Images:         scale-110
Links:          text-teal → text-forest
Share Buttons:  scale-[1.02], shadow-md
```

### Focus States:
```
Search Input:   ring-2 ring-teal/30
Buttons:        outline-none focus:ring-2
```

## Responsive Breakpoints

### Mobile (< 768px):
- Single column layout
- Hidden sidebar
- Stacked cards
- Full-width elements
- Touch-friendly sizes (py-4)

### Tablet (768px - 1024px):
- 2-column grid
- Still no sidebar
- Larger typography
- Better spacing

### Desktop (> 1024px):
- 3-column grid for posts
- Sidebar appears
- Maximum readability width (4xl)
- Optimal line lengths

## Animation Timings

```
Fast:    duration-200 (buttons, small elements)
Medium:  duration-300 (cards, links)
Slow:    duration-500 (images)
```

## Accessibility Features

- [ ] Semantic HTML (article, nav, aside)
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation support
- [ ] Focus visible styles
- [ ] Alt text on images
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Color contrast ratios (WCAG AA)
- [ ] Skip to content links

## Performance Optimizations

- [x] Next.js Image component
- [x] Priority loading for hero images
- [x] Lazy loading for below-fold images
- [x] CSS-based animations (transform, opacity)
- [x] Efficient gradients
- [x] Minimal JavaScript
- [x] Optimized bundle size

## Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Print Stylesheet

Consider adding:
- [ ] Clean print layout
- [ ] Remove navigation
- [ ] Black and white friendly
- [ ] Proper page breaks

## SEO Elements

- [x] OpenGraph tags
- [x] Twitter cards
- [x] JSON-LD schema (BlogPosting)
- [x] Breadcrumbs schema
- [x] Semantic HTML
- [x] Meta descriptions
- [x] Proper heading structure
- [x] Alt text on images
- [x] Internal linking

## Content Guidelines

### Article Structure:
1. Lead paragraph with `.lead` class
2. H2 sections with bottom borders
3. H3 subsections
4. Bulleted/numbered lists
5. Blockquotes for callouts
6. Code snippets with syntax highlighting
7. Internal links to related content

### Image Requirements:
- Recommended size: 1200x675 (16:9 ratio)
- Format: WebP or JPEG
- Max file size: 200KB
- Alt text required
- Descriptive filenames

### Metadata Requirements:
- Title: 50-60 characters
- Description: 140-160 characters
- Category: One of predefined list
- Tags: 3-6 relevant tags
- Read time: Auto-calculated or manual
- Author: Name attribution
- Date: ISO format (YYYY-MM-DD)

## Launch Checklist

Before going live:
- [ ] Test all links
- [ ] Verify images load
- [ ] Check mobile responsiveness
- [ ] Test share buttons
- [ ] Verify newsletter signup
- [ ] Check SEO meta tags
- [ ] Test in multiple browsers
- [ ] Validate HTML
- [ ] Check accessibility
- [ ] Performance audit (Lighthouse)
- [ ] Review on actual device
- [ ] Test slow 3G connection

## Maintenance

Regular tasks:
- [ ] Update blog content regularly
- [ ] Monitor page load times
- [ ] Check for broken links
- [ ] Update featured posts
- [ ] Review analytics
- [ ] Update category list
- [ ] Optimize images as needed
- [ ] Keep dependencies updated

---

**Last Updated**: February 9, 2026
**Status**: Ready for Review
