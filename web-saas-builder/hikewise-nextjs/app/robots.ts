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
          "/api/", // API routes
          "/admin/", // Admin panel (if any)
          "/_next/", // Next.js internals
          "/private/", // Private content
        ],
      },
      {
        // Google specific rules
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Bing specific rules
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Block AI training crawlers
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
