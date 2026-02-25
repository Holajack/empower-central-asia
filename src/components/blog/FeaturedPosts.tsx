import { Link } from "react-router-dom";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeaturedPostsProps {
  featuredIds?: number[];
  maxPosts?: number;
}

const FeaturedPosts = ({ featuredIds, maxPosts = 3 }: FeaturedPostsProps) => {
  // If specific IDs provided, use those. Otherwise, use the most recent posts
  const featuredPosts: BlogPost[] = featuredIds
    ? featuredIds.map(id => blogPosts.find(post => post.id === id)).filter(Boolean) as BlogPost[]
    : blogPosts.slice(0, maxPosts);

  if (featuredPosts.length === 0) {
    return null;
  }

  const [mainPost, ...secondaryPosts] = featuredPosts;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800">Featured Articles</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Featured Post */}
        <Link
          to={`/blog/${mainPost.id}`}
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={`${mainPost.imageUrl}?w=800&h=500&fit=crop`}
              alt={mainPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {mainPost.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} className="bg-purple-600/80 text-white border-0">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
              {mainPost.title}
            </h3>
            <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4">
              {mainPost.excerpt}
            </p>
            <div className="flex items-center text-white/70 gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {mainPost.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {mainPost.readTime}
              </span>
            </div>
          </div>
        </Link>

        {/* Secondary Featured Posts */}
        {secondaryPosts.length > 0 && (
          <div className="flex flex-col gap-4">
            {secondaryPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group flex gap-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={`${post.imageUrl}?w=200&h=150&fit=crop`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 1).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500 gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors self-center flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
