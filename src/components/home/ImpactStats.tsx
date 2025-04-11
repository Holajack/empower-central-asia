
import StatCard from "../StatCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  if (isMobile) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Our Impact
          </h2>
          <Carousel className="w-full" opts={{ align: "start" }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {stats.map((stat, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 md:basis-1/2">
                  <StatCard 
                    number={stat.number} 
                    label={stat.label} 
                    suffix={stat.suffix} 
                    delay={stat.delay} 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
