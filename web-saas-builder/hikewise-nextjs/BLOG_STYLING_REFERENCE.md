# Blog Styling Reference

## Quick Copy-Paste Styles

### Background Gradients

```tsx
// Page background
className="min-h-screen bg-gradient-to-b from-cream via-white to-cream/30"

// Card background
className="bg-gradient-to-br from-white via-white to-sage/10"

// Image overlay
className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"

// CTA background
className="bg-gradient-to-br from-forest via-forest-light to-teal"
```

### Card Hover Effects

```tsx
// Standard card
className="hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2"

// Image zoom
className="group-hover:scale-110 transition-transform duration-500"

// Button scale
className="transform hover:scale-[1.02] transition-all duration-200"
```

### Typography Classes

```tsx
// Hero title
className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight"

// Section heading
className="text-2xl font-bold mb-8 flex items-center gap-3"

// Body text (enhanced)
className="text-muted-foreground leading-[1.8] text-[19px]"

// Meta text
className="text-xs text-muted-foreground font-medium"
```

### Accent Elements

```tsx
// Vertical accent bar
<span className="w-1 h-8 bg-gradient-to-b from-teal to-forest rounded-full" />

// Category badge
className="px-4 py-1.5 text-sm font-semibold bg-teal/10 text-teal hover:bg-teal/20 border-teal/20"

// Tag pill
className="px-4 py-2 text-sm bg-sage/30 text-forest hover:bg-sage/50 rounded-full transition-colors"
```

### Button Styles

```tsx
// Primary button
className="px-8 py-4 bg-white text-forest rounded-xl font-bold hover:bg-white/95 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"

// Filter pill (active)
className="px-5 py-2 rounded-full text-sm font-semibold bg-teal text-white hover:bg-forest transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"

// Filter pill (inactive)
className="px-5 py-2 rounded-full text-sm font-semibold bg-white text-foreground border border-border/50 hover:border-teal/30 hover:bg-sage/10"

// Social share button
className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
```

### Input Styles

```tsx
// Search input
className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200"
```

### Enhanced Prose Styling

```tsx
className="prose prose-lg lg:prose-xl max-w-none
  // Headings
  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border/30
  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4

  // Paragraphs and lists
  prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[19px]
  prose-li:text-muted-foreground prose-li:leading-[1.8] prose-li:text-[19px] prose-li:my-2
  prose-ul:my-6 prose-ol:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:pl-6

  // Inline elements
  prose-strong:text-foreground prose-strong:font-semibold
  prose-em:text-foreground/90 prose-em:italic

  // Links
  prose-a:text-teal prose-a:no-underline prose-a:font-medium
  hover:prose-a:text-forest hover:prose-a:underline prose-a:transition-all

  // Blockquotes
  prose-blockquote:border-l-4 prose-blockquote:border-teal
  prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground/80
  prose-blockquote:bg-sage/10 prose-blockquote:py-4 prose-blockquote:rounded-r-lg

  // Code
  prose-code:text-forest prose-code:bg-sage/30 prose-code:px-1.5
  prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em]
  prose-code:font-mono prose-code:font-normal

  // Lead paragraph
  [&_.lead]:text-xl [&_.lead]:md:text-2xl [&_.lead]:text-foreground
  [&_.lead]:leading-[1.7] [&_.lead]:mb-8 [&_.lead]:font-light
  [&_.lead]:border-l-4 [&_.lead]:border-teal [&_.lead]:pl-6
  [&_.lead]:py-2 [&_.lead]:bg-sage/5 [&_.lead]:rounded-r-lg"
```

### Sidebar Styles

```tsx
// Sticky sidebar wrapper
className="sticky top-28 space-y-6"

// TOC card
className="bg-gradient-to-br from-sage/20 to-teal/5 rounded-2xl p-6 border border-border/50 shadow-sm"

// CTA card
className="bg-gradient-to-br from-forest to-forest-light rounded-2xl p-6 text-white shadow-xl"
```

### Image Container Styles

```tsx
// Featured post image (with badge)
<div className="relative w-full h-56 overflow-hidden">
  <Image ... className="object-cover group-hover:scale-110 transition-transform duration-500" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
  <Badge className="absolute top-4 left-4 bg-teal text-white border-none font-semibold shadow-lg">
    Featured
  </Badge>
</div>

// Regular post image
<div className="relative w-full h-48 overflow-hidden">
  <Image ... className="object-cover group-hover:scale-110 transition-transform duration-500" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
</div>

// Placeholder (no image)
<div className="h-48 bg-gradient-to-br from-sage/30 via-teal/10 to-forest/5 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
</div>
```

### Related Posts Card

```tsx
<Link href={...} className="group">
  <article className="h-full p-6 rounded-2xl bg-gradient-to-br from-white to-sage/10 border border-border/50 hover:border-teal/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <Badge className="mb-3 text-xs bg-teal/10 text-teal border-teal/20 font-semibold">
      {category}
    </Badge>
    <h3 className="font-bold text-lg mb-2 group-hover:text-teal transition-colors duration-200 line-clamp-2">
      {title}
    </h3>
    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
      {description}
    </p>
    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
      <Clock className="w-3.5 h-3.5" />
      {readTime}
    </div>
  </article>
</Link>
```

### Newsletter CTA Section

```tsx
<div className="mt-24 bg-gradient-to-br from-forest via-forest-light to-teal rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
  {/* Pattern background */}
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-50" />

  <div className="relative z-10">
    <h3 className="text-3xl md:text-4xl font-bold mb-4">
      Never Miss an Update
    </h3>
    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
      Get the latest study tips...
    </p>
    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Enter your email address"
        className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm"
      />
      <button className="px-8 py-4 bg-white text-forest rounded-xl font-bold hover:bg-white/95 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
        Subscribe
      </button>
    </div>
    <p className="text-white/70 text-xs mt-4">
      Join 10,000+ students improving their study game. Unsubscribe anytime.
    </p>
  </div>
</div>
```

## Color Reference

### HikeWise Colors (from globals.css)

```css
--color-cream: #F5F9FA
--color-cream-dark: #E8F0F2
--color-forest: #234E3E
--color-forest-light: #2D6A5A
--color-teal: #3D7A80
--color-sage: #D4E5E0
```

### Opacity Modifiers

```tsx
// Background overlays
from-black/40  // 40% black
via-black/10   // 10% black
to-transparent // fade to transparent

// Color tints
bg-teal/10     // 10% teal
bg-sage/30     // 30% sage
text-white/90  // 90% white
border-border/50 // 50% border color
```

### Social Media Brand Colors

```tsx
Twitter:   #1DA1F2
Facebook:  #1877F2
LinkedIn:  #0A66C2
```

## Icon Sizes

```tsx
// Small (meta info)
className="w-3.5 h-3.5"  // 14px

// Regular (inline)
className="w-4 h-4"       // 16px

// Medium (section headers)
className="w-5 h-5"       // 20px

// Large (hero/CTA)
className="w-6 h-6"       // 24px
```

## Spacing Scale

```tsx
// Gaps
gap-2   // 8px
gap-3   // 12px
gap-4   // 16px
gap-6   // 24px
gap-8   // 32px
gap-12  // 48px

// Padding
p-4     // 16px
p-6     // 24px
p-8     // 32px
p-12    // 48px
p-16    // 64px

// Margin
mb-4    // 16px
mb-6    // 24px
mb-8    // 32px
mb-12   // 48px
mb-16   // 64px
mb-20   // 80px
```

## Transition Patterns

```tsx
// Fast (small elements)
transition-all duration-200

// Medium (cards, standard)
transition-all duration-300

// Slow (images, special effects)
transition-transform duration-500

// Combined
transition-all duration-300 hover:shadow-xl hover:-translate-y-2
```

## Responsive Patterns

```tsx
// Typography responsive
text-4xl md:text-5xl lg:text-6xl

// Spacing responsive
p-8 md:p-12 lg:p-16

// Grid responsive
grid md:grid-cols-2 lg:grid-cols-3

// Visibility responsive
hidden lg:block

// Flex responsive
flex-col sm:flex-row
```

## Shadow Scale

```tsx
shadow-sm    // Subtle
shadow-md    // Medium
shadow-lg    // Large
shadow-xl    // Extra large
shadow-2xl   // Double extra large
```

## Border Radius Scale

```tsx
rounded-lg   // 12px (buttons)
rounded-xl   // 16px (inputs)
rounded-2xl  // 24px (cards)
rounded-3xl  // 32px (sections)
rounded-full // Pills, badges
```

## Z-Index Scale

```tsx
relative z-10   // Content above overlay
absolute inset-0 // Full overlay
```

## Useful Utility Combos

```tsx
// Centered container
"container mx-auto px-6"

// Centered text
"max-w-3xl mx-auto text-center"

// Icon with text
"flex items-center gap-2"

// Line clamp
"line-clamp-2" // 2 lines
"line-clamp-3" // 3 lines

// Full-width image container
"relative w-full h-48 overflow-hidden"

// Sticky element
"sticky top-28"

// Backdrop blur
"backdrop-blur-sm bg-white/80"
```

## Animation Classes

```tsx
// Transform
transform
hover:scale-[1.02]
hover:-translate-y-1
hover:-translate-y-2
group-hover:scale-110
group-hover:translate-x-1

// Opacity
opacity-0 group-hover:opacity-100

// Filters
backdrop-blur-sm
```

---

**Note**: All measurements are based on Tailwind's default spacing scale (1 unit = 4px).
