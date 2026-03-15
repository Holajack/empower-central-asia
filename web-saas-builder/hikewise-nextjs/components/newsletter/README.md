# Newsletter Signup System

A complete email capture system for HikeWise with multiple variants, validation, GDPR compliance, and rate limiting.

## Components

### NewsletterSignup

The main newsletter signup component with three variants:

#### Variants

1. **default** - Full-featured signup box (for blog posts)
2. **featured** - Large centered variant (for blog listing page)
3. **inline** - Compact inline form (for footer)

#### Usage

```tsx
import { NewsletterSignup } from '@/components/newsletter'

// Default variant (blog post)
<NewsletterSignup />

// Featured variant (blog listing)
<NewsletterSignup
  variant="featured"
  title="Custom Title"
  subtitle="Custom subtitle"
/>

// Inline variant (footer)
<NewsletterSignup variant="inline" />
```

#### Props

- `variant?: 'default' | 'inline' | 'featured'` - Visual style
- `title?: string` - Headline text
- `subtitle?: string` - Subheadline text
- `className?: string` - Additional CSS classes

#### Features

- Email validation
- GDPR consent checkbox
- Loading states
- Success/error messages
- Responsive design
- Accessible (ARIA labels)

### NewsletterPopup

Optional popup modal that appears after a delay or on exit intent.

#### Usage

```tsx
import { NewsletterPopup } from '@/components/newsletter'

// In your layout or page
<NewsletterPopup
  delaySeconds={30}
  showOnExit={true}
/>
```

#### Props

- `delaySeconds?: number` - Seconds before showing popup (default: 30)
- `showOnExit?: boolean` - Show on exit intent (default: true)

#### Features

- Time-based display
- Exit intent detection
- Local storage to prevent re-showing
- Backdrop click to close
- Respects user dismissal

## API Route

### POST /api/newsletter

Handles newsletter subscriptions with validation and rate limiting.

#### Request

```json
{
  "email": "user@example.com"
}
```

#### Response (Success)

```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

#### Response (Error)

```json
{
  "error": "Error message"
}
```

#### Status Codes

- `200` - Success
- `400` - Invalid email
- `409` - Email already subscribed
- `429` - Too many requests (rate limited)
- `500` - Server error

#### Rate Limiting

- **3 requests per minute** per IP address
- In-memory rate limiting (use Redis for production)

## Data Storage

Currently stores subscriptions in a local JSON file at `/data/newsletter-subscribers.json`.

### Production Integration Options

#### Option 1: Resend (Recommended)

```bash
npm install resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.contacts.create({
  email: email,
  audienceId: process.env.RESEND_AUDIENCE_ID,
})
```

#### Option 2: ConvertKit

```typescript
const response = await fetch(
  `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      email: email,
    }),
  }
)
```

#### Option 3: Mailchimp

```bash
npm install @mailchimp/mailchimp_marketing
```

```typescript
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

await mailchimp.lists.addListMember(listId, {
  email_address: email,
  status: 'subscribed',
})
```

## Integrations

### Current Integrations

1. **Blog Post Pages** (`/app/blog/[slug]/page.tsx`)
   - Default variant after content, before related posts

2. **Blog Listing Page** (`/app/blog/page.tsx`)
   - Featured variant at bottom of page

3. **Footer** (`/components/layout/footer.tsx`)
   - Inline variant in brand column

### Optional: Add Popup to Layout

Edit `/app/layout.tsx`:

```tsx
import { NewsletterPopup } from '@/components/newsletter'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <NewsletterPopup delaySeconds={30} showOnExit={true} />
      </body>
    </html>
  )
}
```

## GDPR Compliance

All variants include:
- Explicit consent checkbox
- Clear messaging about what user is signing up for
- "Unsubscribe anytime" language
- No pre-checked boxes

## Styling

Follows HikeWise brand guidelines:
- **Colors**: Forest (#234E3E), Teal (#3D7A80), Cream (#F5F9FA)
- **Typography**: System font stack with proper hierarchy
- **Spacing**: Consistent with existing components
- **Animations**: Subtle transitions and loading states

## Testing

### Manual Testing Checklist

- [ ] Email validation works
- [ ] GDPR checkbox required
- [ ] Success state displays
- [ ] Error messages show
- [ ] Rate limiting prevents spam
- [ ] Duplicate emails handled
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] Screen reader friendly

### Test Cases

```bash
# Valid email
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Invalid email
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email"}'

# Duplicate email
# (run same request twice)

# Rate limiting
# (run 4+ requests quickly)
```

## Future Enhancements

- [ ] Email confirmation flow
- [ ] Welcome email automation
- [ ] Subscriber preferences
- [ ] Unsubscribe page
- [ ] Analytics tracking
- [ ] A/B testing variants
- [ ] Social proof counter
- [ ] Referral incentives
- [ ] Email preview/download leads
- [ ] Integration with CRM

## Files

```
components/newsletter/
├── newsletter-signup.tsx  # Main component
├── newsletter-popup.tsx   # Optional popup
├── index.ts              # Exports
└── README.md             # This file

app/api/newsletter/
└── route.ts              # API handler

data/
└── newsletter-subscribers.json  # Subscriber storage
```

## Support

For issues or questions, refer to:
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Resend Documentation](https://resend.com/docs)
- [GDPR Guidelines](https://gdpr.eu/)
