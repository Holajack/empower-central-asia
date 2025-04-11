
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
    containScroll: "trimSnaps" // Ensures cards are contained properly
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

  useEffect(() => {
    // Only set up auto-scroll for mobile
    if (!emblaApi || !isMobile || !autoScrollEnabled) return;
    
    const interval = 4000; // 4 seconds per slide
    
    const autoScroll = () => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    };
    
    // Clear any existing interval
    if (autoScrollIntervalRef.current) {
      window.clearInterval(autoScrollIntervalRef.current);
    }
    
    // Set up the interval
    autoScrollIntervalRef.current = window.setInterval(autoScroll, interval);
    
    return () => {
      if (autoScrollIntervalRef.current) {
        window.clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [emblaApi, autoScrollEnabled, isMobile]);

  // Pause auto-scroll on interaction
  useEffect(() => {
    if (!emblaApi || !isMobile) return;
    
    const onPointerDown = () => {
      setAutoScrollEnabled(false);
    };
    
    const onPointerUp = () => {
      setAutoScrollEnabled(true);
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
                      className="pl-4 md:basis-1/2 lg:basis-1/3 basis-[85%]" // Adjust card width for better fit
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
                  onClick={() => emblaApi?.scrollPrev()} 
                  className="static translate-y-0 mr-2" 
                />
                <CarouselNext 
                  onClick={() => emblaApi?.scrollNext()} 
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
