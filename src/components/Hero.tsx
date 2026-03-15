
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import DonateButton from "./DonateButton";
import { useRegion } from "@/contexts/RegionContext";

const Hero = () => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();

  const scrollToPrograms = () => {
    const programsSection = document.getElementById("programs-section");
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/hero-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms]">
          {isCentralAsia ? "Надежда, Которая Строит" : "Hope That Builds"}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
          {isCentralAsia
            ? "Чтобы потерявшие надежду могли её обрести — а обретшие надежду могли её приумножить."
            : "So that the hopeless can find hope -- and the hopeful can multiply it."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [--animation-delay:600ms]">
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold min-w-[200px] group"
            onClick={scrollToPrograms}
          >
            {isCentralAsia ? "Начать обучение (бесплатно)" : "Start Learning (Free)"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          {!isRegionCentralAsia && (
            <DonateButton
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-white min-w-[200px]"
            >
              {isCentralAsia ? "Поддержать будущего предпринимателя" : "Support a Future Entrepreneur"}
            </DonateButton>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 rounded-full bg-white/20 relative overflow-hidden">
          <div className="w-full h-1/2 bg-white absolute top-0 animate-[scroll_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
