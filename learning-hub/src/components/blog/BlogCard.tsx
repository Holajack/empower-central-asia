
import { BlogPost, getLocalizedPost } from "@/data/blogPosts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegion } from "@/contexts/RegionContext";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { isCentralAsia } = useRegion();
  const localized = getLocalizedPost(post, isCentralAsia);

  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img
            src={`${post.imageUrl}?w=600&h=400&fit=crop`}
            alt={localized.displayTitle}
            width={600}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="flex-none pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {localized.displayTags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="bg-[#C9922A]/10 text-[#C9922A] hover:bg-[#C9922A]/20 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl text-gray-800 group-hover:text-[#C9922A] transition-colors line-clamp-2">
            {localized.displayTitle}
          </CardTitle>
          <CardDescription className="flex items-center text-gray-500 gap-3 mt-2 flex-wrap text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {localized.displayDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {localized.displayReadTime}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pt-0">
          <p className="text-gray-600 line-clamp-3 text-sm">{localized.displayExcerpt}</p>
        </CardContent>
        <CardFooter className="flex-none pt-0">
          <p className="text-sm text-gray-500">
            {isCentralAsia ? "Автор:" : "By"} {post.author}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
