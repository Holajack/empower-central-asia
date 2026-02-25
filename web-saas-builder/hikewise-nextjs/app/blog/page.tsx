import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import blogData from "@/data/blog-posts.json";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, insights, and strategies to help you study smarter and achieve your academic goals.",
  openGraph: {
    title: "HikeWise Blog",
    description:
      "Tips, insights, and strategies to help you study smarter and achieve your academic goals.",
    type: "website",
    url: "https://hikewise.app/blog",
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogData.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredPosts = sortedPosts.filter((post) => post.featured);
  const regularPosts = sortedPosts.filter((post) => !post.featured);

  // Get all unique categories
  const categories = Array.from(
    new Set(blogData.posts.map((post) => post.category))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream/30 pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Enhanced Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader
            title="HikeWise Blog"
            subtitle="Expert tips, insights, and strategies to help you study smarter and achieve your academic goals."
          />

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="px-5 py-2 rounded-full text-sm font-semibold bg-teal text-white hover:bg-forest transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]">
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-5 py-2 rounded-full text-sm font-semibold bg-white text-foreground border border-border/50 hover:border-teal/30 hover:bg-sage/10 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-teal to-forest rounded-full" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-white to-sage/10 border-none shadow-lg group-hover:-translate-y-2 overflow-hidden">
                    {post.image ? (
                      <div className="relative w-full h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-teal text-white border-none font-semibold shadow-lg">
                          Featured
                        </Badge>
                      </div>
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-teal/20 via-forest/10 to-sage/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-teal text-white border-none font-semibold shadow-lg">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-8">
                      <Badge
                        variant="secondary"
                        className="mb-4 bg-teal/10 text-teal hover:bg-teal/20 font-semibold"
                      >
                        {post.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-teal transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-base leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-4 h-4 text-teal" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-4 h-4 text-teal" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-teal opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-teal to-forest rounded-full" />
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white border border-border/50 hover:border-teal/30 shadow-sm group-hover:-translate-y-2 overflow-hidden">
                  {post.image ? (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-sage/30 via-teal/10 to-forest/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <Badge
                      variant="secondary"
                      className="mb-3 text-xs bg-teal/10 text-teal hover:bg-teal/20 font-semibold"
                    >
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-teal transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal" />
                        {formatDate(post.date)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup variant="featured" className="mt-20" />
      </div>
    </div>
  );
}
