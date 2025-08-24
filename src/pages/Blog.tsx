
import { Helmet } from "react-helmet";
import BlogList from "@/components/blog/BlogList";
import BlogHero from "@/components/blog/BlogHero";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Entrepreneurship Blog - Business Development Insights | Businesses Beyond Borders</title>
        <meta name="description" content="Expert insights on entrepreneurship, microfinance, and business development in Central Asia from Volusia County nonprofit. Learn from real success stories and proven strategies." />
        <meta name="keywords" content="entrepreneurship blog, business development, microfinance insights, Central Asia business, nonprofit blog, financial literacy, business training, volunteer opportunities Daytona Beach" />
        <meta property="og:title" content="Entrepreneurship Blog - Business Development Insights" />
        <meta property="og:description" content="Expert insights on entrepreneurship and microfinance from Businesses Beyond Borders. Real success stories from Central Asia." />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://businessesbeyondborders.com/blog" />
        <link rel="canonical" href="https://businessesbeyondborders.com/blog" />
      </Helmet>
      <div className="min-h-screen pt-20 md:pt-28 bg-gray-50">
        <BlogHero />
        <div className="container mx-auto px-4 py-8 md:py-12">
          <BlogList />
        </div>
      </div>
    </>
  );
};

export default Blog;
