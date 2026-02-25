"use client";

import { StoreButtons } from "@/components/shared/store-buttons";
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
    <section className="relative pt-28 pb-20 overflow-hidden min-h-[90vh] flex items-center">
      {/* Organic background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="blob-background bg-teal/30 w-[500px] h-[500px] -top-20 -right-20"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="blob-background bg-sage/50 w-[400px] h-[400px] bottom-20 -left-40"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="blob-background bg-forest/20 w-[300px] h-[300px] top-1/2 left-1/3"
          style={{ animationDelay: "-14s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 rounded-full text-sm font-medium glass-card border-0"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 inline-block animate-pulse" />
              Now available on iOS &amp; Android
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Study smarter,
              <br className="hidden sm:block" /> not harder with{" "}
              <span className="gradient-text">HikeWise</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transform your study habits with intelligent focus sessions,
              friendly competition, and an AI companion that keeps you on track.
            </p>

            <StoreButtons />

            {/* Scroll indicator */}
            <button
              onClick={scrollToFeatures}
              className="mt-12 mx-auto lg:mx-0 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="text-sm mb-2">Discover more</span>
              <ArrowDown className="w-5 h-5 scroll-indicator" />
            </button>
          </div>

          {/* Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] rounded-full border border-sage/30 animate-[pulse_4s_ease-in-out_infinite]" />
              <div className="absolute w-[500px] h-[500px] rounded-full border border-sage/20 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
              <div className="absolute w-[600px] h-[600px] rounded-full border border-sage/10 animate-[pulse_4s_ease-in-out_infinite_1s]" />
            </div>

            <PremiumPhoneMockup
              imageSrc="/images/homescreen.png"
              alt="HikeWise Focus Session - Track your study progress"
              size="lg"
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
