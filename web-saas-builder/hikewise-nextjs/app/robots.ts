import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://hikewise.app";

  return {
    rules: [
      {
        // Default rules for all crawlers
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
        ],
      },
      {
        // Google specific rules
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Bing (powers ChatGPT Search)
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // AI Search crawlers — ALLOW for AEO visibility
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Google Gemini training crawler
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // TikTok crawler
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Block pure training scrapers (not search)
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
