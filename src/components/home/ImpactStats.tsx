import { useEffect, useRef, useState } from "react";
import StatCard from "../StatCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";

interface ImpactStatsProps {
  isMobile?: boolean;
}

const ImpactStats = ({ isMobile = false }: ImpactStatsProps) => {
  const stats = [
    { number: 50, label: "Trained in Finances", suffix: "+", delay: 0 },
    { number: 6, label: "Communities Served", suffix: "+", delay: 200 },
    { number: 100, label: "Success Rate", suffix: "%", delay: 400 },
    { number: 150, label: "Lives Transformed", suffix: "+", delay: 600 },
  ];

  // Auto-scroll functionality for mobile
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start", 
    loop: true,
    containScroll: "trimSnaps", // Ensures cards are contained properly
  });
  
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const autoScrollIntervalRef = useRef<number | null>(null);
  
  // Reset the counter animation states when a slide changes
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi || !isMobile) return;

    const onSelect = () => {
      setActiveSlideIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, isMobile]);

  // Set up auto-scrolling
  useEffect(() => {
    // Only set up auto-scroll for mobile
    if (!emblaApi || !isMobile) return;
    
    console.log("Auto-scroll setup. Enabled:", autoScrollEnabled);
    
    // Clear any existing interval
    if (autoScrollIntervalRef.current) {
      console.log("Clearing existing interval");
      window.clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    
    // Set up the interval if auto-scroll is enabled
    if (autoScrollEnabled) {
      console.log("Setting up new auto-scroll interval");
      const interval = 4000; // 4 seconds per slide
      
      const autoScroll = () => {
        console.log("Auto-scrolling to next slide");
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      };
      
      autoScrollIntervalRef.current = window.setInterval(autoScroll, interval);
    }
    
    return () => {
      if (autoScrollIntervalRef.current) {
        console.log("Cleanup: Clearing interval");
        window.clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };
  }, [emblaApi, autoScrollEnabled, isMobile]);

  // Pause auto-scroll on interaction
  useEffect(() => {
    if (!emblaApi || !isMobile) return;
    
    const onPointerDown = () => {
      console.log("User interaction detected: pausing auto-scroll");
      setAutoScrollEnabled(false);
    };
    
    const onPointerUp = () => {
      console.log("Interaction ended: will resume auto-scroll soon");
      // Wait a brief moment before re-enabling auto-scroll
      setTimeout(() => {
        console.log("Resuming auto-scroll");
        setAutoScrollEnabled(true);
      }, 2000);
    };
    
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    
    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, isMobile]);

  if (isMobile) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Our Impact
          </h2>
          <div className="w-full">
            <Carousel className="w-full">
              <div className="overflow-hidden" ref={emblaRef}>
                <CarouselContent className="ml-0">
                  {stats.map((stat, index) => (
                    <CarouselItem 
                      key={index} 
                      className="pl-4 basis-[80%]" // Fixed width to prevent overflow
                    >
                      <StatCard 
                        number={stat.number} 
                        label={stat.label} 
                        suffix={stat.suffix} 
                        delay={stat.delay}
                        resetAnimation={index === activeSlideIndex} 
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
              <div className="flex justify-center mt-4">
                <CarouselPrevious 
                  onClick={() => {
                    console.log("Manual navigation: previous");
                    emblaApi?.scrollPrev();
                    // Temporarily pause auto-scroll when manually navigating
                    setAutoScrollEnabled(false);
                    setTimeout(() => setAutoScrollEnabled(true), 2000);
                  }} 
                  className="static translate-y-0 mr-2" 
                />
                <CarouselNext 
                  onClick={() => {
                    console.log("Manual navigation: next");
                    emblaApi?.scrollNext();
                    // Temporarily pause auto-scroll when manually navigating
                    setAutoScrollEnabled(false);
                    setTimeout(() => setAutoScrollEnabled(true), 2000);
                  }} 
                  className="static translate-y-0 ml-2" 
                />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              number={stat.number} 
              label={stat.label} 
              suffix={stat.suffix} 
              delay={stat.delay}
              resetAnimation={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
