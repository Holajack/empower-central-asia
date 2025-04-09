
import BlogList from "@/components/blog/BlogList";
import BlogHero from "@/components/blog/BlogHero";

const Blog = () => {
  return (
    <div className="min-h-screen pt-28 bg-gray-50">
      <BlogHero />
      <div className="container mx-auto px-4 py-12">
        <BlogList />
      </div>
    </div>
  );
};

export default Blog;
