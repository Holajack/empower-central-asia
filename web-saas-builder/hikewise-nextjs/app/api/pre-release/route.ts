import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS) return false;
  userLimit.count++;
  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const timestamp = new Date().toISOString();

    // Forward to Google Apps Script if configured
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cleanEmail,
            formType: "pre-release",
            timestamp,
            source: "hikewise.app",
          }),
        });
      } catch (err) {
        console.error("Google Apps Script error:", err);
      }
    }

    // Push contact to GoHighLevel CRM
    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;
    if (ghlApiKey && ghlLocationId) {
      try {
        const ghlResponse = await fetch(
          "https://services.leadconnectorhq.com/contacts/upsert",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ghlApiKey}`,
              "Content-Type": "application/json",
              Version: "2021-07-28",
            },
            body: JSON.stringify({
              locationId: ghlLocationId,
              email: cleanEmail,
              tags: ["pre-release", "hikewise"],
              source: "hikewise.app",
            }),
          }
        );
        if (!ghlResponse.ok) {
          console.error(
            "GHL upsert error:",
            ghlResponse.status,
            await ghlResponse.text()
          );
        }
      } catch (err) {
        console.error("GoHighLevel API error:", err);
      }
    }

    console.log(`[Pre-Release Signup] ${cleanEmail} - ${timestamp}`);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the pre-release waitlist",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pre-release signup error:", error);
    return NextResponse.json(
      { error: "Failed to process signup. Please try again." },
      { status: 500 }
    );
  }
}
