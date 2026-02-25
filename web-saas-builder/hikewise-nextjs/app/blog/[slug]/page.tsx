import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
} from "lucide-react";
import blogData from "@/data/blog-posts.json";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

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

  const imageUrl = post.image || "https://hikewise.app/images/og-image.png";

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
          url: imageUrl,
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
      images: [imageUrl],
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
    .slice(0, 2);

  // Calculate word count for schema
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const imageUrl = post.image || "https://hikewise.app/images/og-image.png";

  return (
    <div className="pt-28 pb-20">
      <BlogPostingSchema
        headline={post.title}
        description={post.description}
        image={imageUrl}
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

      <article className="container mx-auto px-6 max-w-3xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <Badge variant="secondary" className="mb-4 bg-teal/10 text-teal">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b py-4">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-soft">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Content - safe hardcoded HTML, not user input */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-semibold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-ul:my-4 prose-ol:my-4
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-teal prose-a:no-underline hover:prose-a:underline
            [&_.lead]:text-xl [&_.lead]:text-foreground [&_.lead]:leading-relaxed [&_.lead]:mb-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        {post.tags && (
          <div className="mt-10 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <NewsletterSignup className="mt-12" />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t">
            <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group p-6 rounded-2xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-teal transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
