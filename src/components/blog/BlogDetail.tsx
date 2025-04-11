
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

  // Function to render blog content with proper formatting
  const renderContent = (content: string) => {
    // Split by double newlines to identify paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if paragraph is a header (starts with ## or #)
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-800">
            {paragraph.replace('## ', '')}
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-gray-700">
            {paragraph.replace('### ', '')}
          </h3>
        );
      } else if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-10 mb-4 text-gray-900">
            {paragraph.replace('# ', '')}
          </h1>
        );
      } else {
        // Regular paragraph
        return (
          <p key={index} className="text-gray-600 mb-5 leading-relaxed">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link to="/blog" className="text-terracotta-500 hover:text-terracotta-700 flex items-center gap-2 mb-6 md:mb-8">
          <ArrowLeft size={16} /> Back to all articles
        </Link>
        
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-sage-100 text-sage-700 hover:bg-sage-200">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center text-gray-500 gap-4 md:gap-6">
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
        <div className="relative h-52 sm:h-64 md:h-80 lg:h-96 w-full mb-6 md:mb-8 overflow-hidden rounded-lg">
          <img 
            src={`${post.imageUrl}?w=1200&h=600&fit=crop`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6">{post.excerpt}</p>
          <div className="text-gray-600">
            {renderContent(post.content)}
          </div>
        </div>
        
        {/* Author bio and share section could be added here */}
        
        {/* Navigation between posts */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link to="/blog" className="text-terracotta-500 hover:text-terracotta-700 flex items-center gap-2">
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
