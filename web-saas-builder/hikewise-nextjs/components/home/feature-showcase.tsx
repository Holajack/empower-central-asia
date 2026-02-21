"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Timer, Users, BarChart3, Brain } from "lucide-react";

const showcaseFeatures = [
  {
    id: 0,
    icon: Timer,
    title: "Focus Sessions",
    subtitle: "Study smarter, not harder",
    description:
      "Our scientifically-designed focus modes help you study more effectively. Choose between Balanced (25/5), Sprint (15/3), or Deep Work (50/10) sessions based on your task.",
    color: "teal",
    image: "/images/focus-session-select.png",
  },
  {
    id: 1,
    icon: Users,
    title: "Study Rooms",
    subtitle: "Learn together, anywhere",
    description:
      "Create or join virtual study rooms with friends. See who's studying, share encouragement, and stay motivated with ambient sounds and real-time presence.",
    color: "forest",
    image: "/images/community-friends.png",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Progress Tracking",
    subtitle: "See your growth",
    description:
      "Beautiful analytics show your daily, weekly, and monthly progress. Track streaks, hit milestones, and export detailed study reports to see how far you've come.",
    color: "sage",
    image: "/images/study-analytics.png",
  },
  {
    id: 3,
    icon: Brain,
    title: "AI Companion",
    subtitle: "Meet Nora",
    description:
      "Nora is your AI study companion who learns your habits, offers personalized tips, and helps you stay accountable. She celebrates your wins and gently nudges you back on track.",
    color: "teal",
    image: "/images/nora-ai-assistant.png",
  },
];

// Desktop scroll-locked version
function DesktopShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollStart = 0;
      const scrollEnd = sectionHeight - windowHeight;
      const scrolled = -sectionTop;

      if (scrolled < scrollStart) {
        setScrollProgress(0);
        setActiveIndex(0);
      } else if (scrolled > scrollEnd) {
        setScrollProgress(1);
        setActiveIndex(showcaseFeatures.length - 1);
      } else {
        const progress = (scrolled - scrollStart) / (scrollEnd - scrollStart);
        setScrollProgress(progress);
        const index = Math.min(
          Math.floor(progress * showcaseFeatures.length),
          showcaseFeatures.length - 1
        );
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hidden lg:block scroll-section-outer bg-gradient-to-b from-white via-cream to-white"
    >
      <div className="scroll-section-sticky">
        <div className="container mx-auto px-6 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
            {/* Content side */}
            <div>
              {/* Progress indicators */}
              <div className="flex gap-2 mb-8">
                {showcaseFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="h-1 flex-1 rounded-full bg-muted overflow-hidden"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        index < activeIndex
                          ? "w-full bg-forest"
                          : index === activeIndex
                          ? "bg-teal"
                          : "w-0"
                      }`}
                      style={{
                        width:
                          index === activeIndex
                            ? `${((scrollProgress * showcaseFeatures.length) % 1) * 100}%`
                            : index < activeIndex
                            ? "100%"
                            : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Feature content */}
              <div className="relative min-h-[300px]">
                {showcaseFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`transition-all duration-500 ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8 pointer-events-none absolute inset-0"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-teal/20">
                        <feature.icon className="w-6 h-6 text-teal" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        {feature.subtitle}
                      </span>
                    </div>

                    <h2 className="text-5xl font-bold mb-6 gradient-text">
                      {feature.title}
                    </h2>

                    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Scroll hint */}
              <div className="mt-8 text-sm text-muted-foreground">
                <span className="opacity-60">Scroll to explore features</span>
                <span className="ml-2">
                  {activeIndex + 1} / {showcaseFeatures.length}
                </span>
              </div>
            </div>

            {/* Phone side */}
            <div className="flex justify-end">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-teal/10 to-forest/10 rounded-full blur-3xl opacity-50" />

                <div className="relative">
                  <div className="iphone-frame relative w-[320px]">
                    <div className="absolute -left-[3px] top-[100px] w-[3px] h-[32px] bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-sm" />
                    <div className="absolute -left-[3px] top-[145px] w-[3px] h-[32px] bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-sm" />
                    <div className="absolute -right-[3px] top-[120px] w-[3px] h-[48px] bg-gradient-to-l from-zinc-700 to-zinc-800 rounded-r-sm" />
                    <div className="absolute -left-[3px] top-[60px] w-[3px] h-[20px] bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-sm" />

                    <div className="iphone-screen relative overflow-hidden">
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-900 border border-zinc-800">
                          <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
                        </div>
                      </div>

                      {/* Dynamic image based on active feature (scroll position) */}
                      {showcaseFeatures.map((feature, index) => (
                        <Image
                          key={feature.id}
                          src={feature.image}
                          alt={`HikeWise ${feature.title} screen`}
                          fill
                          className={`object-cover object-top transition-opacity duration-500 ${
                            index === activeIndex ? "opacity-100" : "opacity-0"
                          }`}
                          priority={index === 0}
                        />
                      ))}

                      <div className="absolute inset-0 z-10 pointer-events-none screen-reflection" />
                      <div className="absolute inset-0 z-10 pointer-events-none rounded-[40px] shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile simple version - no scroll lock
function MobileShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="lg:hidden py-12 sm:py-16 bg-gradient-to-b from-white via-cream to-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Phone mockup */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-teal/10 to-forest/10 rounded-full blur-2xl opacity-50" />

            <div className="iphone-frame relative w-[220px] sm:w-[240px]">
              <div className="absolute -left-[2px] top-[70px] w-[2px] h-[24px] bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-sm" />
              <div className="absolute -left-[2px] top-[100px] w-[2px] h-[24px] bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-sm" />
              <div className="absolute -right-[2px] top-[85px] w-[2px] h-[36px] bg-gradient-to-l from-zinc-700 to-zinc-800 rounded-r-sm" />

              <div className="iphone-screen relative overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[70px] h-[20px] bg-black rounded-full z-20" />

                {/* Dynamic image based on active feature */}
                {showcaseFeatures.map((feature, index) => (
                  <Image
                    key={feature.id}
                    src={feature.image}
                    alt={`HikeWise ${feature.title} screen`}
                    fill
                    className={`object-cover object-top transition-opacity duration-300 ${
                      index === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                    priority={index === 0}
                  />
                ))}

                <div className="absolute inset-0 z-10 pointer-events-none screen-reflection" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature tabs - scrollable with snap */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide snap-x snap-mandatory">
          {showcaseFeatures.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-full whitespace-nowrap transition-all snap-start min-w-0 ${
                index === activeIndex
                  ? "bg-forest text-white"
                  : "bg-muted text-muted-foreground active:bg-muted/80"
              }`}
            >
              <feature.icon className="w-4 h-4 shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Active feature content */}
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            {showcaseFeatures[activeIndex].subtitle}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 gradient-text">
            {showcaseFeatures[activeIndex].title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            {showcaseFeatures[activeIndex].description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function FeatureShowcase() {
  return (
    <>
      <DesktopShowcase />
      <MobileShowcase />
    </>
  );
}
