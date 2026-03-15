"use client";

import { PreReleaseSignup } from "@/components/shared/pre-release-signup";
import { PremiumPhoneMockup } from "@/components/shared/premium-phone-mockup";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden min-h-[auto] lg:min-h-[90vh] flex items-center">
      {/* Organic background blobs - scaled down on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="blob-background bg-teal/30 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] -top-20 -right-20"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="blob-background bg-sage/50 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bottom-20 -left-40"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="blob-background bg-forest/20 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] top-1/2 left-1/3"
          style={{ animationDelay: "-14s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <Badge
              variant="secondary"
              className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium glass-card border-0"
            >
              <span className="w-2 h-2 bg-teal rounded-full mr-2 inline-block animate-pulse" />
              Pre-Release &mdash; Join the Waitlist
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6">
              Study smarter,
              <br className="hidden sm:block" /> not harder with{" "}
              <span className="gradient-text">HikeWise</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transform your study habits with intelligent focus sessions,
              friendly competition, and an AI companion that keeps you on track.
            </p>

            <PreReleaseSignup variant="hero" />

            {/* Scroll indicator - hidden on small mobile */}
            <button
              onClick={scrollToFeatures}
              className="mt-8 sm:mt-12 mx-auto lg:mx-0 hidden sm:flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="text-sm mb-2">Discover more</span>
              <ArrowDown className="w-5 h-5 scroll-indicator" />
            </button>
          </div>

          {/* Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            {/* Decorative rings - scaled for mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full border border-sage/30 animate-[pulse_4s_ease-in-out_infinite]" />
              <div className="absolute w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full border border-sage/20 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
              <div className="absolute hidden sm:block w-[600px] h-[600px] rounded-full border border-sage/10 animate-[pulse_4s_ease-in-out_infinite_1s]" />
            </div>

            <PremiumPhoneMockup
              imageSrc="/images/home-screen.png"
              alt="HikeWise Focus Session - Track your study progress"
              size="md"
              className="relative z-10 sm:!w-[320px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
