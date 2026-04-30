
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import SpotlightStories from "@/components/programs/SpotlightStories";
import ProgramsSection from "@/components/programs/ProgramsSection";
import CallToAction from "@/components/programs/CallToAction";
import { useRegion } from "@/contexts/RegionContext";
import { useProgramsAndImpactPage } from "@/hooks/useProgramsAndImpactPage";

// PortableText components — white text on dark background for the
// "Our Difference" section, matching the existing prose styling.
const differencePortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-white/90 text-lg leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/70 my-4">
        {children}
      </blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-white mt-6 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white mt-4 mb-1">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

const ProgramsAndImpact = () => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { page } = useProgramsAndImpactPage();

  const { ref: metricsRef, inView: metricsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: differenceRef, inView: differenceInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const heroHeading = page.getHeroHeading(isCentralAsia);
  const heroSubheading = page.getHeroSubheading(isCentralAsia);
  const differenceHeading = page.getDifferenceHeading(isCentralAsia);
  const differenceBody = page.getDifferenceBody(isCentralAsia);
  const metricsHeading = page.getMetricsHeading(isCentralAsia);
  const metricsLocalized = page.getMetricsLocalized(isCentralAsia);

  return (
    <>
      <Helmet>
        <title>{heroHeading ? `${heroHeading} | Businesses Beyond Borders` : (isCentralAsia
          ? "Наши программы | Businesses Beyond Borders"
          : "Free Business & Finance Programs | BBB")}</title>
        <meta name="description" content={heroSubheading || (isCentralAsia
          ? "Бесплатные курсы финансовой грамотности, мастер-классы по созданию бизнеса и стартовый капитал. Четырёхэтапная модель BBB."
          : "Free financial literacy training, business creation workshops, and startup capital for people who earn it. BBB's four-stage model turns learners into community leaders.")} />
        <meta name="keywords" content={isCentralAsia
          ? "бесплатный курс финансовой грамотности, обучение предпринимательству Центральная Азия, программы развития бизнеса, микрофинансирование, стартовый капитал, бизнес-обучение Кыргызстан"
          : "free financial literacy course, entrepreneurship training Central Asia, business development programs, microfinance nonprofit, startup capital nonprofit, Kyrgyzstan business training, financial education developing countries"} />

        <meta property="og:title" content={isCentralAsia ? "Наши программы - Businesses Beyond Borders" : "Our Programs - Businesses Beyond Borders"} />
        <meta property="og:description" content={isCentralAsia
          ? "Бесплатное обучение финансовой грамотности, создание бизнеса и стартовый капитал. Четыре этапа. Каждый шаг заслужен."
          : "Free financial literacy training, business creation, and startup capital. Four stages. Every step earned."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/programs-and-impact" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Наши программы - Businesses Beyond Borders" : "Our Programs - Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Бесплатное обучение финансовой грамотности, создание бизнеса и стартовый капитал. Каждый шаг заслужен."
          : "Free financial literacy training, business creation, and startup capital. Every step earned."} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/programs-and-impact" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["NonprofitOrganization", "EducationalOrganization"],
            "name": "Businesses Beyond Borders",
            "description": "Nonprofit providing free financial literacy training, business creation workshops, and startup capital to entrepreneurs in Central Asia",
            "url": "https://businessesbeyondborders.com/programs-and-impact",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Port Orange",
              "addressRegion": "FL",
              "addressCountry": "US"
            },
            "areaServed": ["Kazakhstan", "Kyrgyzstan", "Uzbekistan"],
            "sameAs": [
              "https://www.facebook.com/Businesses.BB",
              "https://www.linkedin.com/company/businesses-beyond-borders",
              "https://www.instagram.com/businessesbeyondborders"
            ],
            "telephone": "(386) 517-1527",
            "email": "donations@businessesbeyondborders.com",
            "foundingDate": "2022",
            "offers": [
              {
                "@type": "Service",
                "name": "Financial Literacy Training",
                "description": "Free financial education covering budgeting, savings, debt management, and real-world money skills"
              },
              {
                "@type": "Service",
                "name": "Business Creation Training",
                "description": "12-week entrepreneurship program covering business planning, market validation, and launch preparation"
              },
              {
                "@type": "Service",
                "name": "Startup Capital",
                "description": "Startup funding for graduates who complete training and demonstrate business readiness"
              },
              {
                "@type": "Service",
                "name": "Community Leadership Development",
                "description": "Training graduates to facilitate courses, mentor new entrepreneurs, and lead in their communities"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative h-[70vh] flex items-center justify-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
              {heroHeading}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
              {heroSubheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:600ms]">
              <Link to="/programs/financial-literacy">
                <Button size="lg" className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4 text-lg">
                  {isCentralAsia ? "Начать бесплатный курс" : "Start the Free Course"}
                </Button>
              </Link>
              {!isRegionCentralAsia && (
                <Link to="/get-involved">
                  <Button size="lg" className="bg-white/20 backdrop-blur border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg">
                    See How to Give
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* The Problem */}
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {isCentralAsia
              ? "В Кыргызстане, Казахстане и Узбекистане талантливым и трудолюбивым людям часто говорят — словами или обстоятельствами — что для них здесь ничего нет. Уезжайте или оставайтесь и боритесь. Большинство организаций отвечают краткосрочной помощью. BBB отвечает вопросом: а что, если у вас уже есть всё, что нужно, и вам просто нужен тот, кто покажет, как это использовать?"
              : "In Kyrgyzstan, Kazakhstan, and Uzbekistan, people with talent and work ethic are told -- sometimes with words, often without them -- that there is nothing here for you. Leave, or stay and struggle. Most organizations respond with short-term aid. BBB responds with a question: what if you already have what you need, and you just need someone to show you how to use it?"}
          </p>
        </div>

        {/* Programs Section - The Model */}
        <ProgramsSection />

        {/* What Makes This Different */}
        <div
          ref={differenceRef}
          className={`bg-[#1B2A4A] text-white py-16 transition-all duration-700 ${
            differenceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {differenceHeading}
            </h2>
            <div className="space-y-6">
              <PortableText
                value={differenceBody}
                components={differencePortableTextComponents}
              />
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div
          ref={metricsRef}
          className={`py-16 transition-all duration-700 ${
            metricsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
              {metricsHeading}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {metricsLocalized.map((metric, index) => (
                <StatCard
                  key={index}
                  number={metric.value}
                  label={metric.label}
                  suffix={metric.suffix}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Spotlight Stories */}
        <SpotlightStories />

        {/* Zoom Placeholder */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-[#C9922A]/10 border border-[#C9922A]/30 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">
              {isCentralAsia ? "Скоро: живые групповые занятия" : "Live Group Sessions Coming Soon"}
            </h3>
            <p className="text-gray-600 mb-6">
              {isCentralAsia
                ? "Мы запускаем живые онлайн-классы по финансовой грамотности, чтобы каждый с доступом к интернету мог присоединиться — откуда угодно. Подпишитесь, чтобы первыми узнать о начале регистрации."
                : "We're launching live, online financial literacy classes so anyone with an internet connection can join -- wherever they are. Sign up to be the first to know when registration opens."}
            </p>
            <Link to="/newsletter">
              <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-medium px-6">
                {isCentralAsia ? "Узнать о запуске" : "Get Notified When Classes Launch"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <CallToAction />
      </div>
    </>
  );
};

export default ProgramsAndImpact;
