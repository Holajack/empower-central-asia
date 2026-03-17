
import { Helmet } from "react-helmet";
import BlogList from "@/components/blog/BlogList";
import BlogHero from "@/components/blog/BlogHero";
import { useRegion } from "@/contexts/RegionContext";

const Blog = () => {
  const { isCentralAsia } = useRegion();

  return (
    <>
      <Helmet>
        <title>{isCentralAsia ? "Блог | Businesses Beyond Borders" : "Blog - Business & Finance Insights | BBB"}</title>
        <meta name="description" content={isCentralAsia
          ? "Экспертные статьи о предпринимательстве, финансовой грамотности и развитии бизнеса в Центральной Азии от BBB."
          : "Expert insights on entrepreneurship, financial literacy, and business development. Real strategies and success stories from Central Asia."} />
        <meta name="keywords" content={isCentralAsia
          ? "блог предпринимательство, развитие бизнеса, микрофинансирование, бизнес Центральная Азия, финансовая грамотность, обучение бизнесу"
          : "entrepreneurship blog, business development, microfinance insights, Central Asia business, nonprofit blog, financial literacy, business training, remote volunteer opportunities, international development blog"} />
        <link rel="canonical" href="https://businessesbeyondborders.com/blog" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="author" content="Businesses Beyond Borders" />
        <meta property="og:title" content={isCentralAsia ? "Блог о предпринимательстве" : "Entrepreneurship Blog - Business Development Insights"} />
        <meta property="og:description" content={isCentralAsia
          ? "Экспертные статьи о предпринимательстве и микрофинансировании от Businesses Beyond Borders."
          : "Expert insights on entrepreneurship and microfinance from Businesses Beyond Borders. Real success stories from Central Asia."} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://businessesbeyondborders.com/blog" />
        <meta property="og:image" content="https://businessesbeyondborders.com/images/bbb-logo.png" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Блог о предпринимательстве" : "Entrepreneurship Blog | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Экспертные статьи о предпринимательстве от Businesses Beyond Borders."
          : "Expert insights on entrepreneurship and microfinance from Businesses Beyond Borders."} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: isCentralAsia ? "Блог о предпринимательстве" : "Entrepreneurship Blog",
          description: isCentralAsia
            ? "Экспертные статьи о предпринимательстве от Businesses Beyond Borders."
            : "Expert insights on entrepreneurship and microfinance from Businesses Beyond Borders.",
          url: "https://businessesbeyondborders.com/blog",
          isPartOf: { "@type": "WebSite", name: "Businesses Beyond Borders", url: "https://businessesbeyondborders.com" },
        })}</script>
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
