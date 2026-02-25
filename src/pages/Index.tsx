
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import QuickAbout from "@/components/home/QuickAbout";
import ImpactStats from "@/components/home/ImpactStats";
import ProgramsOverview from "@/components/home/ProgramsOverview";
import SuccessStoryFeature from "@/components/home/SuccessStoryFeature";
import HowToHelp from "@/components/home/HowToHelp";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Businesses Beyond Borders - Empowering Central Asia Entrepreneurs | Volunteer & Donate</title>
        <meta name="description" content="International nonprofit transforming Central Asian communities through proven business training programs. 100% success rate in Kazakhstan, Kyrgyzstan, Tajikistan. Remote volunteer opportunities & donation options. Join our mission today." />
        <meta name="keywords" content="Central Asia entrepreneurship programs, nonprofit volunteer opportunities, financial literacy training nonprofit, international development volunteer, business mentorship programs, Kazakhstan business development, Kyrgyzstan entrepreneurship support, Tajikistan microfinance programs, nonprofit donations, remote volunteer opportunities, global entrepreneurship nonprofit" />

        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content="Businesses Beyond Borders - Empowering Central Asia Entrepreneurs" />
        <meta property="og:description" content="Transform communities through proven entrepreneurship programs. International nonprofit with 100% success rate serving Kazakhstan, Kyrgyzstan & Tajikistan. Volunteer & donation opportunities worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Businesses Beyond Borders - Transform Central Asia Through Entrepreneurship" />
        <meta name="twitter:description" content="Join our volunteers empowering entrepreneurs in Kazakhstan, Kyrgyzstan & Tajikistan through proven business training programs with 100% success rate." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Businesses Beyond Borders" />
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Port Orange, Florida" />
        <meta name="geo.position" content="29.1386;-81.0062" />
        <meta name="ICBM" content="29.1386, -81.0062" />
        <link rel="canonical" href="https://businessesbeyondborders.com" />
        
        {/* Local business schema markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["NonprofitOrganization", "Organization"],
            "name": "Businesses Beyond Borders",
            "description": "International nonprofit empowering entrepreneurs in Central Asia through proven business training, financial literacy, and leadership development programs",
            "url": "https://businessesbeyondborders.com",
            "logo": "https://businessesbeyondborders.com/logo.png",
            "image": "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Port Orange",
              "addressRegion": "FL",
              "postalCode": "32127",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-386-517-1527",
              "contactType": "customer support",
              "areaServed": ["US-FL", "KZ", "KG", "TJ"],
              "availableLanguage": ["English", "Russian"]
            },
            "sameAs": [
              "https://www.facebook.com/Businesses.BB",
              "https://www.linkedin.com/company/businesses-beyond-borders",
              "https://www.instagram.com/businessesbeyondborders"
            ],
            "foundingDate": "2022",
            "email": "donations@businessesbeyondborders.com",
            "areaServed": [
              {
                "@type": "Place",
                "name": "United States"
              },
              {
                "@type": "Country", 
                "name": "Kazakhstan"
              },
              {
                "@type": "Country",
                "name": "Kyrgyzstan" 
              },
              {
                "@type": "Country",
                "name": "Tajikistan"
              }
            ],
            "knowsAbout": [
              "Financial Literacy Training",
              "Business Development Programs",
              "Entrepreneurship Education",
              "Leadership Development",
              "Community Collaboration",
              "International Development",
              "Microfinance Programs"
            ],
            "offers": [
              {
                "@type": "Service",
                "name": "Financial Literacy Development",
                "description": "Comprehensive financial education covering budgeting, savings, investment principles, and business financial management for entrepreneurs in Central Asia"
              },
              {
                "@type": "Service",
                "name": "Business Creation Training", 
                "description": "Step-by-step business development workshops covering business planning, marketing strategies, and operational management"
              },
              {
                "@type": "Service",
                "name": "Leadership Development Programs",
                "description": "One-on-one mentoring and leadership training with experienced business professionals and executives"
              },
              {
                "@type": "Service",
                "name": "Community Collaboration Initiatives",
                "description": "Programs connecting entrepreneurs and communities for sustainable economic development and social impact"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Hero />
        <QuickAbout />
        <ImpactStats isMobile={isMobile} />
        <ProgramsOverview isMobile={isMobile} />
        <SuccessStoryFeature />
        <HowToHelp isMobile={isMobile} />
      </div>
    </>
  );
};

export default Index;
