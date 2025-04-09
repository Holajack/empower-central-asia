
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === Number(id));

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Link to="/blog" className="text-terracotta-500 hover:text-terracotta-700 flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Return to all articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/blog" className="text-terracotta-500 hover:text-terracotta-700 flex items-center gap-2 mb-8">
          <ArrowLeft size={16} /> Back to all articles
        </Link>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-sage-100 text-sage-700 hover:bg-sage-200">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-500 gap-6">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span>By {post.author}</span>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="relative h-64 md:h-96 w-full mb-8 overflow-hidden rounded-lg">
          <img 
            src={`${post.imageUrl}?w=1200&h=600&fit=crop`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl font-medium text-gray-700 mb-6">{post.excerpt}</p>
          <p className="text-gray-600 whitespace-pre-line">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
