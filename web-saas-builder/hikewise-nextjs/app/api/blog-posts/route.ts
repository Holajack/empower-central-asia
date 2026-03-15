import { NextResponse } from "next/server";
import blogData from "@/data/blog-posts.json";

export async function GET() {
  try {
    // Return all blog posts with metadata for sitemap generation
    const posts = blogData.posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      category: post.category,
      author: post.author,
      readTime: post.readTime,
      featured: post.featured,
      tags: post.tags,
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// Disable caching for dynamic content
export const dynamic = "force-dynamic";
