import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  BlogPostingSchema,
  BreadcrumbSchema,
} from "@/components/seo/json-ld";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";
import blogData from "@/data/blog-posts.json";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { ReadingProgress } from "@/components/article/reading-progress";
import { MobileTableOfContents, DesktopTableOfContents } from "@/components/article/table-of-contents";
import { ShareButtons } from "@/components/article/share-buttons";
import { Breadcrumbs } from "@/components/article/breadcrumbs";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://hikewise.app/blog/${slug}`,
      images: [
        {
          url: "https://hikewise.app/images/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["https://hikewise.app/images/og-image.png"],
    },
    alternates: {
      canonical: `https://hikewise.app/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.slug === slug);
  const content = post?.content;

  if (!post || !content) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogData.posts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  // Calculate word count for schema
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;

  // Content is statically authored by site owner and stored in codebase JSON.
  // It is NOT user-generated or sourced from external input.
  const articleHtml = content;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream/30">
      <ReadingProgress />
      <BlogPostingSchema
        headline={post.title}
        description={post.description}
        image="https://hikewise.app/images/og-image.png"
        datePublished={post.date}
        dateModified={post.date}
        author={post.author}
        url={`https://hikewise.app/blog/${slug}`}
        keywords={post.tags}
        wordCount={wordCount}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://hikewise.app" },
          { name: "Blog", url: "https://hikewise.app/blog" },
          { name: post.title, url: `https://hikewise.app/blog/${slug}` },
        ]}
      />

      {/* Article Header */}
      <section className="pt-28 pb-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.category, href: `/blog` },
              { label: post.title },
            ]}
          />

          <Badge
            variant="secondary"
            className="mb-4 bg-teal/10 text-teal hover:bg-teal/20 font-semibold"
          >
            {post.category}
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight text-foreground">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-teal" />
              {post.author}
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-teal" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-teal" />
              {post.readTime}
            </span>
          </div>

          <div className="mt-4">
            <ShareButtons title={post.title} slug={slug} />
          </div>

          {/* Divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </section>

      {/* Content with TOC sidebar */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-16">
            {/* Main content */}
            <div className="mx-auto max-w-4xl lg:max-w-none">
              {/* Mobile TOC */}
              <MobileTableOfContents />

              {/* Article body */}
              <article
                className="article-content max-w-none"
                dangerouslySetInnerHTML={{ __html: articleHtml }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sage/30 border border-sage px-3 py-1 text-xs font-medium text-forest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="mt-12">
                <NewsletterSignup className="" />
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-16 pt-10 border-t border-border/50">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-1 h-7 bg-gradient-to-b from-teal to-forest rounded-full" />
                    Keep Reading
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="group rounded-2xl bg-white border border-border/50 p-6 hover:shadow-lg hover:border-teal/20 transition-all duration-300 hover:-translate-y-1"
                      >
                        <Badge
                          variant="secondary"
                          className="mb-3 text-xs bg-teal/10 text-teal font-semibold"
                        >
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-semibold mb-2 group-hover:text-teal transition-colors leading-snug line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {relatedPost.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-teal" />
                          {relatedPost.readTime}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Navigation */}
              <div className="mt-12 flex justify-between items-center pt-8 border-t border-border/50">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  All Articles
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-teal to-forest text-white px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Try HikeWise Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Desktop TOC sidebar */}
            <aside className="hidden lg:block">
              <DesktopTableOfContents />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
