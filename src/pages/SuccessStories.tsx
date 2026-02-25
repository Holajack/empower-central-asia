import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/success-stories/HeroSection";
import TestimonialCarousel from "@/components/success-stories/TestimonialCarousel";
import CaseStudiesSection from "@/components/success-stories/CaseStudiesSection";
import CtaSection from "@/components/success-stories/CtaSection";
import { testimonials } from "@/data/testimonials";

import { successStories } from "@/data/successStories";

const SuccessStoriesHeroHeader = () => (
  <div 
    className="relative h-[70vh] flex items-center justify-center"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
    <div className="relative z-10 container mx-auto px-4 text-center text-white">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
        <span>📈</span>
        Real Impact Stories from Central Asia
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
        Transforming Lives Through 
        <span className="text-yellow-400"> Entrepreneurship</span>
      </h1>
      <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed">
        Meet the entrepreneurs who built thriving businesses with mentorship from 
        <strong className="text-yellow-300"> our volunteer network</strong> and support from our team.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
        <div className="animate-fade-up [--animation-delay:600ms]">
          <div className="text-xl md:text-2xl font-bold text-yellow-400">Rising</div>
          <div className="text-sm text-white/80">Entrepreneurs</div>
        </div>
        <div className="animate-fade-up [--animation-delay:700ms]">
          <div className="text-xl md:text-2xl font-bold text-yellow-400">Growing</div>
          <div className="text-sm text-white/80">Impact</div>
        </div>
        <div className="animate-fade-up [--animation-delay:800ms]">
          <div className="text-xl md:text-2xl font-bold text-yellow-400">New</div>
          <div className="text-sm text-white/80">Opportunities</div>
        </div>
        <div className="animate-fade-up [--animation-delay:900ms]">
          <div className="text-xl md:text-2xl font-bold text-yellow-400">Global</div>
          <div className="text-sm text-white/80">Vision</div>
        </div>
      </div>
    </div>
  </div>
);

// Transform success stories into case study format for the existing component
const caseStudies = successStories.map(story => ({
  title: story.title,
  description: story.excerpt,
  image: story.heroImage,
  impact: story.impact[0], // Use first impact item
  id: story.id
}));

const SuccessStories = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [caseStudiesRef, caseStudiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Success Stories - Entrepreneurs Transforming Communities | Businesses Beyond Borders</title>
        <meta 
          name="description" 
          content="Discover inspiring success stories from Businesses Beyond Borders. See how entrepreneurs in Central Asia and our dedicated volunteers create lasting impact through business development programs."
        />
        <meta 
          name="keywords" 
          content="entrepreneur success stories, business development results, Central Asia success stories, volunteer impact stories, nonprofit success stories, microfinance success stories, international development testimonials, global entrepreneurship impact"
        />
        
        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content="Success Stories - Entrepreneurs Creating Global Impact" />
        <meta property="og:description" content="Real stories of transformation: How Businesses Beyond Borders helps entrepreneurs in Central Asia through volunteer-driven mentorship and business training programs." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        <meta property="og:url" content="https://businessesbeyondborders.com/success-stories" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Success Stories - Global Impact Through Entrepreneurship" />
        <meta name="twitter:description" content="Inspiring entrepreneurship success stories from Businesses Beyond Borders serving Central Asia." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/success-stories" />
        
        {/* Local business schema markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NonprofitOrganization",
            "name": "Businesses Beyond Borders",
            "description": "International nonprofit supporting entrepreneurship in Central Asia through volunteer-driven business training and mentorship programs",
            "url": "https://businessesbeyondborders.com/success-stories",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Port Orange",
              "addressRegion": "FL",
              "addressCountry": "US"
            },
            "sameAs": [
              "https://www.facebook.com/Businesses.BB",
              "https://www.linkedin.com/company/businesses-beyond-borders",
              "https://www.instagram.com/businessesbeyondborders"
            ],
            "telephone": "(386) 517-1527",
            "email": "donations@businessesbeyondborders.com"
          })}
        </script>
      </Helmet>
      <SuccessStoriesHeroHeader />
      <div ref={heroRef}>
        <HeroSection inView={heroInView} />
      </div>

      <div ref={testimonialsRef}>
        <TestimonialCarousel 
          testimonials={testimonials}
          inView={testimonialsInView}
        />
      </div>

      <div ref={caseStudiesRef}>
        <CaseStudiesSection 
          caseStudies={caseStudies}
          inView={caseStudiesInView}
        />
      </div>

      <div ref={ctaRef}>
        <CtaSection inView={ctaInView} />
      </div>
    </div>
  );
};

export default SuccessStories;
