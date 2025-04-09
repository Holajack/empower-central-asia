
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "./BlogCard";

interface BlogListProps {
  page: number;
  postsPerPage: number;
}

const BlogList = ({ page, postsPerPage }: BlogListProps) => {
  // Calculate the posts to display based on current page
  const startIndex = (page - 1) * postsPerPage;
  const selectedPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {selectedPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
