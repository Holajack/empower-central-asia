import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import DonateButton from "./DonateButton";
import { useRegion } from "@/contexts/RegionContext";
import { useHomepageHero } from "@/hooks/useHomepage";

const Hero = () => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { hero } = useHomepageHero();

  // Primary CTA URL can be a #anchor (scroll on page) or a path/URL (navigate).
  const onPrimaryCtaClick = () => {
    const url = hero.primaryCtaUrl;
    if (url.startsWith("#")) {
      const target = document.getElementById(url.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Otherwise treat as navigation
    window.location.href = url;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${hero.backgroundImageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms]">
          {hero.getHeading(isCentralAsia)}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
          {hero.getSubheading(isCentralAsia)}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [--animation-delay:600ms]">
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold min-w-[200px] group"
            onClick={onPrimaryCtaClick}
          >
            {hero.getPrimaryCtaLabel(isCentralAsia)}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          {!isRegionCentralAsia && (
            <DonateButton
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-white min-w-[200px]"
            >
              {hero.getSecondaryCtaLabel(isCentralAsia)}
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
