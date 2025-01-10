import React from "react";
import { useInView } from "react-intersection-observer";
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Empowering Through Action
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Explore our range of programs designed to create sustainable impact in Central Asia.
          </p>
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
          <StatCard number={500} label="Entrepreneurs Trained" suffix="+" delay={0} />
          <StatCard number={10} label="Communities Served" suffix="+" delay={200} />
          <StatCard number={85} label="Success Rate" suffix="%" delay={400} />
          <StatCard number={2000} label="Jobs Created" suffix="+" delay={600} />
        </div>
      </div>

      {/* Spotlight Stories Section */}
      <SpotlightStories />

      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
};

export default ProgramsAndImpact;