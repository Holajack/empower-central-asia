
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
      // Process markdown formatting for the text content
      const processMarkdown = (text: string) => {
        // Handle bold text **text**
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
        // Handle italic text *text*
        text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic">$1</em>');
        // Handle links [text](url)
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-800 underline" target="_blank" rel="noopener noreferrer">$1</a>');
        
        return text;
      };

      // Check if paragraph is a header (starts with ## or #)
      if (paragraph.startsWith('## ')) {
        const headerText = processMarkdown(paragraph.replace('## ', ''));
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-800" 
              dangerouslySetInnerHTML={{ __html: headerText }}>
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        const headerText = processMarkdown(paragraph.replace('### ', ''));
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-gray-700"
              dangerouslySetInnerHTML={{ __html: headerText }}>
          </h3>
        );
      } else if (paragraph.startsWith('#### ')) {
        const headerText = processMarkdown(paragraph.replace('#### ', ''));
        return (
          <h4 key={index} className="text-lg font-semibold mt-5 mb-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: headerText }}>
          </h4>
        );
      } else if (paragraph.startsWith('# ')) {
        const headerText = processMarkdown(paragraph.replace('# ', ''));
        return (
          <h1 key={index} className="text-3xl font-bold mt-10 mb-4 text-gray-900"
              dangerouslySetInnerHTML={{ __html: headerText }}>
          </h1>
        );
      } else if (paragraph.startsWith('> ')) {
        // Handle blockquotes
        const quoteText = processMarkdown(paragraph.replace('> ', ''));
        return (
          <blockquote key={index} className="border-l-4 border-purple-500 pl-4 py-2 mb-5 bg-purple-50 italic text-gray-700"
                      dangerouslySetInnerHTML={{ __html: quoteText }}>
          </blockquote>
        );
      } else if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        // Handle unordered lists
        const listItems = paragraph.split('\n').map((item, itemIndex) => {
          if (item.startsWith('- ') || item.startsWith('* ')) {
            const itemText = processMarkdown(item.replace(/^[-*] /, ''));
            return <li key={itemIndex} dangerouslySetInnerHTML={{ __html: itemText }}></li>;
          }
          return null;
        }).filter(Boolean);
        
        return (
          <ul key={index} className="list-disc list-inside mb-5 space-y-2 text-gray-600">
            {listItems}
          </ul>
        );
      } else if (/^\d+\./.test(paragraph)) {
        // Handle ordered lists
        const listItems = paragraph.split('\n').map((item, itemIndex) => {
          if (/^\d+\./.test(item)) {
            const itemText = processMarkdown(item.replace(/^\d+\.\s*/, ''));
            return <li key={itemIndex} dangerouslySetInnerHTML={{ __html: itemText }}></li>;
          }
          return null;
        }).filter(Boolean);
        
        return (
          <ol key={index} className="list-decimal list-inside mb-5 space-y-2 text-gray-600">
            {listItems}
          </ol>
        );
      } else if (paragraph.startsWith('---')) {
        // Handle horizontal rules
        return <hr key={index} className="border-gray-300 my-8" />;
      } else if (paragraph.trim() === '') {
        // Skip empty paragraphs
        return null;
      } else {
        // Regular paragraph
        const processedText = processMarkdown(paragraph);
        return (
          <p key={index} className="text-gray-600 mb-5 leading-relaxed"
             dangerouslySetInnerHTML={{ __html: processedText }}>
          </p>
        );
      }
    }).filter(Boolean); // Remove null entries
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 bg-white">
      {/* Hero Section with Featured Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={`${post.imageUrl}?w=1920&h=1080&fit=crop`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/blog" className="text-white/80 hover:text-white flex items-center gap-2 mb-4">
              <ArrowLeft size={16} /> Back to all articles
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-white/80 gap-4 md:gap-6 text-sm md:text-base">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Excerpt */}
          <div className="mb-10">
            <p className="text-xl md:text-2xl font-normal text-gray-700 leading-relaxed border-l-4 border-purple-500 pl-6 bg-gray-50 py-6 rounded-r-lg">
              {post.excerpt}
            </p>
          </div>
          
          {/* Article Content with Optimal Typography */}
          <article className="prose prose-lg prose-gray max-w-none">
            <div 
              style={{
                fontSize: '18px',
                lineHeight: '1.7',
                maxWidth: '680px',
                margin: '0 auto'
              }}
              className="text-gray-700"
            >
              {renderContent(post.content)}
            </div>
          </article>

          {/* Call to Action Section - Value-Driven Resources */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Free Resources to Get Started</h3>
              <p className="text-gray-600 mb-6">
                Download our complete toolkit to implement community-based international development in your organization. 
                Includes asset mapping templates, volunteer engagement playbooks, and impact measurement frameworks.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-800 mb-2">📋 Asset Mapping Toolkit</h4>
                  <p className="text-sm text-gray-600 mb-3">Identify and mobilize community resources for global work</p>
                  <Link to="/contact" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Download Free →
                  </Link>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-800 mb-2">🌐 Remote Volunteer Playbook</h4>
                  <p className="text-sm text-gray-600 mb-3">Create meaningful virtual international engagement</p>
                  <Link to="/contact" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Download Free →
                  </Link>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-800 mb-2">📊 Impact Measurement Templates</h4>
                  <p className="text-sm text-gray-600 mb-3">Track dual-impact across local and global communities</p>
                  <Link to="/contact" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Download Free →
                  </Link>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-800 mb-2">🚀 Implementation Guide</h4>
                  <p className="text-sm text-gray-600 mb-3">Step-by-step roadmap for launching your program</p>
                  <Link to="/contact" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Download Free →
                  </Link>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Access Complete Toolkit
                </Link>
                <Link 
                  to="/get-involved" 
                  className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Explore BBB Programs
                </Link>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">About the Author</h4>
            <p className="text-gray-600">
              <strong>{post.author}</strong> is the founder of Businesses Beyond Borders, a community-based 
              nonprofit demonstrating the principles outlined in this guide through programs empowering entrepreneurs 
              in Central Asia. The organization serves as a real-world case study for community-based international 
              development, engaging local volunteers remotely while creating measurable global impact.
            </p>
          </div>

          {/* Social Sharing */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Share this article</h4>
            <div className="flex gap-4">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Share on Facebook
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="text-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
