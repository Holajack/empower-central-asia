import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms]">
          Empowering Through Action
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
          Explore our range of programs designed to create sustainable impact in Central Asia.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [--animation-delay:600ms]">
          <Button
            size="lg"
            className="bg-terracotta-500 hover:bg-terracotta-400 text-white min-w-[200px]"
          >
            Donate Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border-white min-w-[200px] group"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
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