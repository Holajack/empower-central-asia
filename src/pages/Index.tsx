
import React from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import QuickAbout from "@/components/home/QuickAbout";
import ImpactStats from "@/components/home/ImpactStats";
import ProgramsOverview from "@/components/home/ProgramsOverview";
import SuccessStoryFeature from "@/components/home/SuccessStoryFeature";
import HowToHelp from "@/components/home/HowToHelp";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRegion } from "@/contexts/RegionContext";

const Index = () => {
  const isMobile = useIsMobile();
  const { isCentralAsia } = useRegion();

  return (
    <>
      <Helmet>
        <title>{isCentralAsia
          ? "Businesses Beyond Borders | Надежда, которая строит"
          : "Businesses Beyond Borders | Hope That Builds"}</title>
        <meta name="description" content={isCentralAsia
          ? "BBB вооружает людей финансовой грамотностью и предпринимательством в Центральной Азии. Бесплатные курсы и инструменты для создания устойчивого будущего."
          : "Free entrepreneur training in Central Asia. BBB equips people with financial literacy, business skills, and real opportunity to build dignified, sustainable lives."} />
        <meta name="keywords" content={isCentralAsia
          ? "программы предпринимательства Центральная Азия, волонтёрские возможности, обучение финансовой грамотности, развитие бизнеса Казахстан, поддержка предпринимательства Кыргызстан, микрофинансирование Узбекистан"
          : "Central Asia entrepreneurship programs, nonprofit volunteer opportunities, financial literacy training nonprofit, international development volunteer, business mentorship programs, Kazakhstan business development, Kyrgyzstan entrepreneurship support, Uzbekistan microfinance programs, nonprofit donations, remote volunteer opportunities, global entrepreneurship nonprofit"} />

        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content={isCentralAsia
          ? "Businesses Beyond Borders - Надежда, которая строит"
          : "Businesses Beyond Borders - Hope That Builds"} />
        <meta property="og:description" content={isCentralAsia
          ? "BBB приносит надежду тем, кто её потерял — через финансовую грамотность, предпринимательство и реальные возможности в Центральной Азии."
          : "Hope to the hopeless. We equip diligent people to build dignified, sustainable lives through financial literacy, entrepreneurship, and real opportunity."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com" />
        <meta property="og:image" content="https://businessesbeyondborders.com/images/bbb-logo.png" />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia
          ? "Businesses Beyond Borders - Надежда, которая строит"
          : "Businesses Beyond Borders - Hope That Builds"} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Надежда тем, кто её потерял. Финансовая грамотность, предпринимательство и реальные возможности в Центральной Азии."
          : "Hope to the hopeless. Financial literacy, entrepreneurship, and real opportunity for diligent people in Central Asia."} />
        <meta name="twitter:image" content="https://businessesbeyondborders.com/images/bbb-logo.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Businesses Beyond Borders" />
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Port Orange, Florida" />
        <meta name="geo.position" content="29.1386;-81.0062" />
        <meta name="ICBM" content="29.1386, -81.0062" />
        <link rel="canonical" href="https://businessesbeyondborders.com" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Hero />
        <QuickAbout />
        <ImpactStats isMobile={isMobile} />
        <ProgramsOverview isMobile={isMobile} />
        <SuccessStoryFeature />
        <HowToHelp />
      </div>
    </>
  );
};

export default Index;
