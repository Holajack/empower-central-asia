
import Hero from "@/components/Hero";
import QuickAbout from "@/components/home/QuickAbout";
import ImpactStats from "@/components/home/ImpactStats";
import ProgramsOverview from "@/components/home/ProgramsOverview";
import SuccessStoryFeature from "@/components/home/SuccessStoryFeature";
import HowToHelp from "@/components/home/HowToHelp";

const Index = () => {
  return (
    <div className="min-h-screen bg-sand-50">
      <Hero />
      <QuickAbout />
      <ImpactStats />
      <ProgramsOverview />
      <SuccessStoryFeature />
      <HowToHelp />
    </div>
  );
};

// Make sure to export as default
export default Index;
