import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "33afa1c18d9161177701605264a641bd";
const BASE_URL = "https://hikewise.app";

// POST /api/indexnow
// Body: { slugs: string[] }
// Submits new blog post URLs to IndexNow (notifies Bing, Yandex, and partner engines instantly)
export async function POST(request: NextRequest) {
  const { slugs } = await request.json();

  if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
    return NextResponse.json({ error: "slugs array required" }, { status: 400 });
  }

  const urls = slugs.map((slug: string) => `${BASE_URL}/blog/${slug}`);

  const payload = {
    host: "hikewise.app",
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const results: Record<string, number> = {};

  // Submit to Bing IndexNow (Bing shares with Yandex and other IndexNow partners)
  const bingRes = await fetch("https://www.bing.com/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  results.bing = bingRes.status;

  // Submit to IndexNow.org directly as a cross-engine catchall
  const indexNowRes = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  results.indexnow = indexNowRes.status;

  return NextResponse.json({
    submitted: urls,
    results,
    message: `Submitted ${urls.length} URL(s) to IndexNow`,
  });
}
