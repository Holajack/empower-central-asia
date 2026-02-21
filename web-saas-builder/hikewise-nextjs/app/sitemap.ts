import { MetadataRoute } from "next";
import blogData from "@/data/blog-posts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hikewise.app";

  // Static pages with appropriate change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily", // Blog index updates with new posts
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-02-09"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2026-02-09"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date("2026-02-09"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date("2026-02-09"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-02-09"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-02-09"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamically generate blog post URLs from blog-posts.json
  const blogPosts: MetadataRoute.Sitemap = blogData.posts.map((post) => {
    // Determine priority based on recency and featured status
    const daysSincePublished =
      (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24);
    const isRecent = daysSincePublished < 30;

    let priority = 0.7;
    if (post.featured) priority = 0.85;
    else if (isRecent) priority = 0.8;

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority,
    };
  });

  return [...staticPages, ...blogPosts];
}

// Enable dynamic rendering for sitemap to pick up new blog posts
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour
