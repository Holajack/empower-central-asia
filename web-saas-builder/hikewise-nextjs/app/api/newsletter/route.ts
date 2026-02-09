import { NextRequest, NextResponse } from 'next/server'

// In-memory rate limiting (simple implementation)
// In production, use Redis or a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 3 // Max 3 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return true
  }

  if (userLimit.count >= MAX_REQUESTS) {
    return false
  }

  userLimit.count++
  return true
}

// Email validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// Store newsletter subscriptions (simple file-based storage)
// In production, use a database or email service API (Resend, ConvertKit, etc.)
async function storeSubscription(email: string): Promise<void> {
  const timestamp = new Date().toISOString()

  // For now, just log to console
  // In production, you would:
  // 1. Store in database
  // 2. Send to email service API (Resend, ConvertKit, Mailchimp)
  // 3. Send confirmation email
  console.log(`[Newsletter Signup] ${email} - ${timestamp}`)

  // Example: Save to a JSON file (basic implementation)
  // You could also integrate with services like:
  // - Resend: https://resend.com/docs/send-with-nextjs
  // - ConvertKit: https://developers.convertkit.com/
  // - Mailchimp: https://mailchimp.com/developer/

  try {
    const fs = require('fs').promises
    const path = require('path')
    const dataDir = path.join(process.cwd(), 'data')
    const subscribersFile = path.join(dataDir, 'newsletter-subscribers.json')

    // Ensure data directory exists
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }

    // Read existing subscribers
    let subscribers: Array<{ email: string; timestamp: string }> = []
    try {
      const fileContent = await fs.readFile(subscribersFile, 'utf-8')
      subscribers = JSON.parse(fileContent)
    } catch {
      // File doesn't exist yet, start with empty array
    }

    // Check if email already exists
    if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already subscribed')
    }

    // Add new subscriber
    subscribers.push({ email, timestamp })

    // Write back to file
    await fs.writeFile(subscribersFile, JSON.stringify(subscribers, null, 2))
  } catch (error) {
    console.error('Error storing subscription:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Store subscription
    try {
      await storeSubscription(email.toLowerCase().trim())
    } catch (error) {
      if (error instanceof Error && error.message === 'Email already subscribed') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      }
      throw error
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
