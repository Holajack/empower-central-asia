import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet";
import { TrendingUp } from "lucide-react";
import TestimonialCarousel from "@/components/success-stories/TestimonialCarousel";
import CaseStudiesSection from "@/components/success-stories/CaseStudiesSection";
import CtaSection from "@/components/success-stories/CtaSection";
import { testimonials } from "@/data/testimonials";
import { useRegion } from "@/contexts/RegionContext";
import { useSuccessStories, toCaseStudyCard } from "@/hooks/useSuccessStories";

const SuccessStories = () => {
  const { isCentralAsia } = useRegion();
  const { stories } = useSuccessStories();

  // CaseStudiesSection consumes a flat shape — convert + localize per-story.
  const caseStudies = stories.map((s) => toCaseStudyCard(s, isCentralAsia));

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
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          {isCentralAsia
            ? "Истории успеха | Businesses Beyond Borders"
            : "Entrepreneur Success Stories | BBB"}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Вдохновляющие истории предпринимателей Центральной Азии. Узнайте, как участники BBB строят бизнес и меняют свои сообщества."
              : "See how entrepreneurs in Central Asia build businesses and transform communities through BBB's training programs. Real stories of lasting impact."
          }
        />
        <meta
          name="keywords"
          content="entrepreneur success stories, business development results, Central Asia success stories, volunteer impact stories, nonprofit success stories, microfinance success stories, international development testimonials, global entrepreneurship impact"
        />

        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content={isCentralAsia ? "Истории успеха — предприниматели, меняющие сообщества | Businesses Beyond Borders" : "Success Stories - Entrepreneurs Creating Global Impact"} />
        <meta property="og:description" content={isCentralAsia ? "Реальные истории трансформации: как Businesses Beyond Borders помогает предпринимателям Центральной Азии через наставничество и программы делового развития." : "Real stories of transformation: How Businesses Beyond Borders helps entrepreneurs in Central Asia through volunteer-driven mentorship and business training programs."} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        <meta property="og:url" content="https://businessesbeyondborders.com/success-stories" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Истории успеха — глобальное влияние через предпринимательство | Businesses Beyond Borders" : "Success Stories - Global Impact Through Entrepreneurship"} />
        <meta name="twitter:description" content={isCentralAsia ? "Вдохновляющие истории успеха предпринимателей Businesses Beyond Borders в Центральной Азии." : "Inspiring entrepreneurship success stories from Businesses Beyond Borders serving Central Asia."} />
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

      {/* Hero */}
      <div
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up [--animation-delay:100ms]">
            <TrendingUp className="w-4 h-4" />
            {isCentralAsia ? "Реальные истории" : "Real Impact Stories"}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
            {isCentralAsia ? (
              <>
                Меняем жизни через
                <span className="text-[#C9922A]"> предпринимательство</span>
              </>
            ) : (
              <>
                Transforming Lives Through
                <span className="text-[#C9922A]"> Entrepreneurship</span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed">
            {isCentralAsia
              ? "Познакомьтесь с предпринимателями, которые создали процветающий бизнес при поддержке наших наставников и команды."
              : "Meet the entrepreneurs who built thriving businesses with mentorship from our volunteer network and support from our team."}
          </p>
        </div>
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
