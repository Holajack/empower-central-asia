
import { getPublishedPosts } from "@/data/blogPosts";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const posts = getPublishedPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
