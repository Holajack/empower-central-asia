import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { BlogListSchema } from "@/components/seo/json-ld";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import blogData from "@/data/blog-posts.json";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

export const metadata: Metadata = {
  title: "Blog - Study Tips, Productivity & Student Life",
  description:
    "Expert tips, science-backed study strategies, and productivity insights to help you study smarter. Explore guides on focus, time management, and academic success.",
  openGraph: {
    title: "HikeWise Blog - Study Smarter, Not Harder",
    description:
      "Expert tips, science-backed study strategies, and productivity insights to help you study smarter.",
    type: "website",
    url: "https://hikewise.app/blog",
  },
  alternates: {
    canonical: "https://hikewise.app/blog",
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Study Methods": { bg: "bg-teal/10", text: "text-teal", border: "border-teal/20" },
  "Technology": { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  "Productivity": { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  "Mental Health": { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  "Student Life": { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
};

function getCategoryColor(category: string) {
  return categoryColors[category] || { bg: "bg-teal/10", text: "text-teal", border: "border-teal/20" };
}

export default function BlogPage() {
  const sortedPosts = [...blogData.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredPosts = sortedPosts.filter((post) => post.featured);

  const categories = Array.from(
    new Set(blogData.posts.map((post) => post.category))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream/30 pt-28 pb-20">
      <BlogListSchema posts={sortedPosts} totalCount={blogData.posts.length} />
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader
            title="HikeWise Blog"
            subtitle="Science-backed study strategies, productivity tips, and insights to help you achieve your academic goals."
          />

          {/* Category Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="px-5 py-2 rounded-full text-sm font-semibold bg-teal text-white hover:bg-forest transition-all duration-200 shadow-sm">
              All Articles
            </button>
            {categories.map((category) => {
              const color = getCategoryColor(category);
              return (
                <button
                  key={category}
                  className={`px-5 py-2 rounded-full text-sm font-semibold ${color.bg} ${color.text} border ${color.border} hover:shadow-sm transition-all duration-200`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {blogData.posts.length} articles published
          </p>
        </div>

        {/* Featured Hero */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <Link href={`/blog/${featuredPosts[0].slug}`} className="group block">
              <div className="relative rounded-3xl bg-gradient-to-br from-forest via-forest-light to-teal p-8 md:p-12 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10 max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm border border-white/20">
                      Featured
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/10">
                      {featuredPosts[0].category}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                    {featuredPosts[0].title}
                  </h2>

                  <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl">
                    {featuredPosts[0].description}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPosts[0].date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPosts[0].readTime}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/80 font-medium group-hover:gap-3 transition-all duration-300">
                      Read article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Featured Grid */}
        {featuredPosts.length > 1 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-gradient-to-b from-teal to-forest rounded-full" />
              Featured Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(1, 4).map((post) => {
                const color = getCategoryColor(post.category);
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <div className="h-full rounded-2xl bg-white border border-border/50 p-6 hover:shadow-xl hover:border-teal/20 transition-all duration-300 group-hover:-translate-y-1.5">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className={`${color.bg} ${color.text} border-none font-semibold text-xs`}>
                          {post.category}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold mb-3 group-hover:text-teal transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-teal" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-teal opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All Posts - Clean list layout */}
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-gradient-to-b from-teal to-forest rounded-full" />
            All Articles
          </h2>

          <div className="space-y-4">
            {sortedPosts.map((post) => {
              const color = getCategoryColor(post.category);
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="rounded-2xl bg-white border border-border/50 p-6 md:p-8 hover:shadow-lg hover:border-teal/20 transition-all duration-300 group-hover:-translate-y-0.5">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`${color.bg} ${color.text} border-none font-semibold text-xs`}>
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge className="bg-amber-50 text-amber-600 border-none font-semibold text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-teal transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                          {post.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-teal" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-teal" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-teal" />
                            {post.tags?.length || 0} topics
                          </span>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center">
                        <div className="w-10 h-10 rounded-full bg-sage/30 flex items-center justify-center group-hover:bg-teal/10 transition-colors">
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-teal group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Newsletter */}
        <NewsletterSignup variant="featured" className="mt-20" />
      </div>
    </div>
  );
}
