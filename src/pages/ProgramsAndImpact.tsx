
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import SpotlightStories from "@/components/programs/SpotlightStories";
import ProgramsSection from "@/components/programs/ProgramsSection";
import CallToAction from "@/components/programs/CallToAction";
import { useRegion } from "@/contexts/RegionContext";

const ProgramsAndImpact = () => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { ref: metricsRef, inView: metricsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: differenceRef, inView: differenceInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <Helmet>
        <title>{isCentralAsia
          ? "Наши программы | Businesses Beyond Borders"
          : "Free Business & Finance Programs | BBB"}</title>
        <meta name="description" content={isCentralAsia
          ? "Бесплатные курсы финансовой грамотности, мастер-классы по созданию бизнеса и стартовый капитал. Четырёхэтапная модель BBB."
          : "Free financial literacy training, business creation workshops, and startup capital for people who earn it. BBB's four-stage model turns learners into community leaders."} />
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
              {isCentralAsia ? "Не благотворительность." : "Not Charity."}
              <span className="text-[#C9922A]">{isCentralAsia ? " Возможность." : " A Chance."}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
              {isCentralAsia
                ? "Бесплатное обучение финансовой грамотности для каждого, кто готов учиться. Путь от знаний — к собственному делу."
                : "Four stages. Every step earned. Free financial literacy training for anyone willing to show up -- and a path from there to owning a real business."}
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
              {isCentralAsia ? "Чем мы отличаемся" : "What Makes This Different"}
            </h2>
            <div className="space-y-6 text-white/90 text-lg leading-relaxed">
              <p>
                {isCentralAsia
                  ? "Большинство организаций помогают людям получать. BBB превращает получателей в строителей — а строителей в людей, которые дают кому-то другому первый шанс."
                  : "Most organizations help people receive. BBB turns receivers into builders -- and builders into people who give someone else their first opportunity."}
              </p>
              <p>
                {isCentralAsia
                  ? "Мы не конкурируем с микрокредитными организациями, образовательными проектами или благотворительными фондами. Мы — следующая глава того, что они начинают. Когда курс заканчивается, когда кредит погашен, когда первая помощь иссякает — BBB — это то, что приходит дальше."
                  : "We are not competing with micro-lenders, curriculum organizations, or relief organizations. We are the next chapter of what they start. When the class ends, when the loan is repaid, when the initial help runs out -- BBB is what comes next."}
              </p>
              <p>
                {isCentralAsia
                  ? "Не каждый проходит все этапы. В этом и суть. Фильтр защищает участников и даёт реальные результаты. Когда кто-то получает стартовый капитал от BBB, он уже доказал — месяцами усердной работы, присутствия и создания бизнес-плана — что он готов. Поэтому это работает."
                  : "Not everyone advances through every stage. That's the point. The filter protects participants and produces real results. When someone receives startup capital from BBB, they've already proven -- through months of showing up, doing the work, and building the plan -- that they're ready. That's why it works."}
              </p>
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
              {isCentralAsia ? "Наши результаты" : "Where We Are So Far"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <StatCard number={50} label={isCentralAsia ? "Обучены финансовой грамотности" : "People Trained in Financial Literacy"} suffix="+" delay={0} />
              <StatCard number={6} label={isCentralAsia ? "Охвачено сообществ" : "Communities Reached"} suffix="+" delay={200} />
              <StatCard number={150} label={isCentralAsia ? "Жизней затронуто напрямую" : "Lives Directly Affected"} suffix="+" delay={400} />
              <StatCard number={3} label={isCentralAsia ? "Стран обслуживается" : "Countries Served"} delay={600} />
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
