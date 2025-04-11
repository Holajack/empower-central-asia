
import { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-sand-50">
      <Hero />
      <QuickAbout />
      <ImpactStats isMobile={isMobile} />
      <ProgramsOverview isMobile={isMobile} />
      <SuccessStoryFeature />
      <HowToHelp isMobile={isMobile} />
    </div>
  );
};

export default Index;
