
import { Helmet } from "react-helmet";
import BlogList from "@/components/blog/BlogList";
import BlogHero from "@/components/blog/BlogHero";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";

const Blog = () => {
  const { isCentralAsia } = useRegion();

  return (
    <>
      <Helmet>
        <title>{isCentralAsia ? `Блог | ${siteConfig.name}` : `Blog - Business & Finance Insights | ${siteConfig.shortName}`}</title>
        <meta name="description" content={isCentralAsia
          ? `Экспертные статьи о предпринимательстве, финансовой грамотности и развитии бизнеса в Центральной Азии от ${siteConfig.shortName}.`
          : "Expert insights on entrepreneurship, financial literacy, and business development. Real strategies and success stories from Central Asia."} />
        <meta name="keywords" content={isCentralAsia
          ? "блог предпринимательство, развитие бизнеса, микрофинансирование, бизнес Центральная Азия, финансовая грамотность, обучение бизнесу"
          : "entrepreneurship blog, business development, microfinance insights, Central Asia business, nonprofit blog, financial literacy, business training, remote volunteer opportunities, international development blog"} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="author" content={`${siteConfig.name}`} />
        <meta property="og:title" content={isCentralAsia ? "Блог о предпринимательстве" : "Entrepreneurship Blog - Business Development Insights"} />
        <meta property="og:description" content={isCentralAsia
          ? `Экспертные статьи о предпринимательстве и микрофинансировании от ${siteConfig.name}.`
          : `Expert insights on entrepreneurship and microfinance from ${siteConfig.name}. Real success stories from Central Asia.`} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={`${siteConfig.url}/blog`} />
        <meta property="og:image" content={`${siteConfig.url}/images/logo.png`} />
        <meta property="og:site_name" content={`${siteConfig.name}`} />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Блог о предпринимательстве" : `Entrepreneurship Blog | ${siteConfig.name}`} />
        <meta name="twitter:description" content={isCentralAsia
          ? `Экспертные статьи о предпринимательстве от ${siteConfig.name}.`
          : `Expert insights on entrepreneurship and microfinance from ${siteConfig.name}.`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: isCentralAsia ? "Блог о предпринимательстве" : "Entrepreneurship Blog",
          description: isCentralAsia
            ? `Экспертные статьи о предпринимательстве от ${siteConfig.name}.`
            : `Expert insights on entrepreneurship and microfinance from ${siteConfig.name}.`,
          url: `${siteConfig.url}/blog`,
          isPartOf: { "@type": "WebSite", name: `${siteConfig.name}`, url: `${siteConfig.url}` },
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
