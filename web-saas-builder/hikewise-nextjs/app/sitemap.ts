import { MetadataRoute } from "next";
import blogData from "@/data/blog-posts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hikewise.app";

  // Static pages with appropriate change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "daily",
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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-04-08"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/nikolai`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/jacken`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamically generate blog post URLs from blog-posts.json
  const blogPosts: MetadataRoute.Sitemap = blogData.posts.map((post) => {
    const daysSincePublished =
      (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24);
    const isVeryRecent = daysSincePublished < 7;
    const isRecent = daysSincePublished < 30;

    // Priority: featured > recent > standard
    let priority = 0.7;
    if (post.featured) priority = 0.85;
    else if (isVeryRecent) priority = 0.82;
    else if (isRecent) priority = 0.78;

    // Signal to crawlers how frequently to revisit
    // New posts: weekly (will change as we update/add internal links)
    // Posts under 30 days: weekly
    // Older posts: monthly (stable)
    const changeFrequency = isRecent
      ? ("weekly" as const)
      : ("monthly" as const);

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency,
      priority,
    };
  });

  // Update blog index lastModified to match most recent post publish date
  const mostRecentPostDate = blogData.posts.length > 0
    ? new Date(blogData.posts[0].date)
    : new Date();
  staticPages[1].lastModified = mostRecentPostDate;

  return [...staticPages, ...blogPosts];
}

// Revalidate sitemap hourly to pick up new blog posts
export const revalidate = 3600;
