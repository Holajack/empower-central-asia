
import { BlogPost } from "@/data/blogPosts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.id}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={`${post.imageUrl}?w=600&h=400&fit=crop`}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="flex-none">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="bg-sage-100 text-sage-700 hover:bg-sage-200">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl text-gray-800 group-hover:text-terracotta-500 transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="flex items-center text-gray-500 gap-4 mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex-none pt-0">
          <p className="text-sm text-gray-500">By {post.author}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
