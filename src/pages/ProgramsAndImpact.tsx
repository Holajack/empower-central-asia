
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import SpotlightStories from "@/components/programs/SpotlightStories";
import ProgramsSection from "@/components/programs/ProgramsSection";
import CallToAction from "@/components/programs/CallToAction";

const ProgramsAndImpact = () => {
  const { ref: metricsRef, inView: metricsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <Helmet>
        <title>Business Training Programs Volusia County - Financial Literacy & Entrepreneurship | Port Orange Nonprofit</title>
        <meta name="description" content="Port Orange-based Businesses Beyond Borders offers proven business development programs supporting Central Asian entrepreneurs through Volusia County volunteers. Financial literacy, leadership development, and community collaboration with 100% success rate. Volunteer opportunities available in Daytona Beach area." />
        <meta name="keywords" content="business training programs Volusia County, financial literacy programs Florida, entrepreneurship training nonprofit Port Orange, business development programs Daytona Beach, volunteer opportunities Volusia County, nonprofit organizations Port Orange FL, microfinance organizations USA, international development volunteer Florida, business mentorship programs Central Florida, nonprofit volunteer opportunities Daytona Beach" />
        
        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content="Business Training Programs - Volusia County Nonprofit Supporting Global Entrepreneurs" />
        <meta property="og:description" content="Join Volusia County volunteers supporting entrepreneurs in Central Asia through proven business training programs. Based in Port Orange, serving globally." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/programs-and-impact" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Business Training Programs - Port Orange Nonprofit" />
        <meta name="twitter:description" content="Volusia County volunteers supporting global entrepreneurs through comprehensive business development programs." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/programs-and-impact" />
        
        {/* Local business and program schema markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["NonprofitOrganization", "EducationalOrganization"],
            "name": "Businesses Beyond Borders",
            "description": "Port Orange nonprofit providing business training programs and volunteer opportunities for Volusia County residents to support entrepreneurs in Central Asia",
            "url": "https://businessesbeyondborders.com/programs-and-impact",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Port Orange",
              "addressRegion": "FL",
              "addressCountry": "US"
            },
            "areaServed": [
              "Volusia County",
              "Central Florida", 
              "Kazakhstan",
              "Kyrgyzstan", 
              "Tajikistan"
            ],
            "sameAs": [
              "https://www.facebook.com/Businesses.BB",
              "https://www.linkedin.com/company/businesses-beyond-borders",
              "https://www.instagram.com/businessesbeyondborders"
            ],
            "telephone": "(386) 517-1527",
            "email": "donations@businessesbeyondborders.com",
            "foundingDate": "2022",
            "knowsAbout": [
              "Financial Literacy Training",
              "Business Development",
              "Entrepreneurship Education", 
              "International Development",
              "Volunteer Management",
              "Microfinance"
            ],
            "offers": [
              {
                "@type": "Service",
                "name": "Financial Literacy Development",
                "description": "Essential financial education covering budgeting, savings, and investment principles for entrepreneurs"
              },
              {
                "@type": "Service", 
                "name": "Business Creation Training",
                "description": "Comprehensive workshops covering business planning, marketing, and financial management"
              },
              {
                "@type": "Service",
                "name": "Leadership Development", 
                "description": "One-on-one mentoring with experienced business leaders"
              },
              {
                "@type": "Service",
                "name": "Community Collaboration",
                "description": "Initiatives bringing entrepreneurs together for sustainable community impact"
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
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🎯</span>
            Proven Business Training Programs
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
            Transform Lives Through 
            <span className="text-yellow-400"> Business Education</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
            <strong className="text-yellow-300">Volusia County volunteers</strong> provide world-class business training to entrepreneurs in Central Asia. 
            Join our <strong className="text-yellow-300">Port Orange-based team</strong> creating global impact through proven programs.
          </p>
          
          {/* Key Program Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center mb-8">
            <div className="animate-fade-up [--animation-delay:600ms]">
              <div className="text-xl md:text-2xl font-bold text-yellow-400">Proven</div>
              <div className="text-sm text-white/80">Methods</div>
            </div>
            <div className="animate-fade-up [--animation-delay:700ms]">
              <div className="text-xl md:text-2xl font-bold text-yellow-400">4</div>
              <div className="text-sm text-white/80">Core Programs</div>
            </div>
            <div className="animate-fade-up [--animation-delay:800ms]">
              <div className="text-xl md:text-2xl font-bold text-yellow-400">Growing</div>
              <div className="text-sm text-white/80">Team</div>
            </div>
            <div className="animate-fade-up [--animation-delay:900ms]">
              <div className="text-xl md:text-2xl font-bold text-yellow-400">Global</div>
              <div className="text-sm text-white/80">Reach</div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="animate-fade-up [--animation-delay:1000ms]">
            <Link to="/get-involved">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                Join Our Volunteer Team
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <ProgramsSection />

      {/* Impact Metrics Section */}
      <div
        ref={metricsRef}
        className={`mt-20 transition-all duration-700 ${
          metricsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-semibold text-sage-500 mb-12 text-center">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard number={50} label="Trained in Finances" suffix="+" delay={0} />
          <StatCard number={6} label="Communities Served" suffix="+" delay={200} />
          <StatCard number={100} label="Success Rate" suffix="%" delay={400} />
          <StatCard number={150} label="Lives Transformed" suffix="+" delay={600} />
        </div>
      </div>

      {/* Spotlight Stories Section */}
      <SpotlightStories />

      {/* Call to Action Section */}
      <CallToAction />
    </div>
    </>
  );
};

export default ProgramsAndImpact;
