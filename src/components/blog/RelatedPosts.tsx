import { useMemo } from "react";
import { Link } from "react-router-dom";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RelatedPostsProps {
  currentPostId: number;
  tags: string[];
  maxPosts?: number;
}

const RelatedPosts = ({ currentPostId, tags, maxPosts = 3 }: RelatedPostsProps) => {
  const relatedPosts = useMemo(() => {
    // Calculate relevance score for each post
    const scoredPosts = blogPosts
      .filter(post => post.id !== currentPostId)
      .map(post => {
        // Count matching tags
        const matchingTags = post.tags.filter(tag => tags.includes(tag)).length;

        // Score based on matching tags (higher is better)
        const score = matchingTags;

        return { post, score };
      })
      .filter(item => item.score > 0) // Only posts with at least one matching tag
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, maxPosts)
      .map(item => item.post);

    // If we don't have enough related posts, fill with recent posts
    if (scoredPosts.length < maxPosts) {
      const existingIds = new Set([currentPostId, ...scoredPosts.map(p => p.id)]);
      const additionalPosts = blogPosts
        .filter(post => !existingIds.has(post.id))
        .slice(0, maxPosts - scoredPosts.length);

      return [...scoredPosts, ...additionalPosts];
    }

    return scoredPosts;
  }, [currentPostId, tags, maxPosts]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <RelatedPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const RelatedPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={`${post.imageUrl}?w=400&h=200&fit=crop`}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h4>

        {/* Meta */}
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
    </Link>
  );
};

export default RelatedPosts;
