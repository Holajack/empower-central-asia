
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";

interface ProgramsOverviewProps {
  isMobile?: boolean;
}

const ProgramsOverview = ({ isMobile = false }: ProgramsOverviewProps) => {
  const programs = [
    {
      title: "Financial Literacy Development",
      description: "Essential financial education covering budgeting, savings, and investment principles.",
      link: "/programs/financial-literacy"
    },
    {
      title: "Business Creation Training",
      description: "Comprehensive workshops covering business planning, marketing, and financial management fundamentals.",
      link: "/programs/business-creation"
    },
    {
      title: "Leadership Development",
      description: "One-on-one mentoring with experienced business leaders to develop management skills.",
      link: "/programs/leadership-development"
    },
    {
      title: "Community Collaboration",
      description: "Initiatives that bring entrepreneurs together to create sustainable impact in local communities.",
      link: "/programs/community-collaboration"
    },
  ];

  // Adding embla carousel for better mobile control
  const [emblaRef] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps"  // Ensures cards are contained properly
  });

  if (isMobile) {
    return (
      <section id="programs-section" className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Programs at a Glance
          </h2>
          <Carousel className="w-full">
            <div className="overflow-hidden" ref={emblaRef}>
              <CarouselContent className="ml-0">
                {programs.map((program, index) => (
                  <CarouselItem 
                    key={program.title}
                    className="pl-4 md:basis-1/2 lg:basis-1/3 basis-[85%]" // Adjust card width for better fit
                  >
                    <Card 
                      className="border-sage-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="flex-shrink-0">
                        <CardTitle className="text-xl text-sage-500 line-clamp-2">
                          {program.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow">
                        <CardDescription className="text-gray-600 mb-4 flex-grow line-clamp-4">
                          {program.description}
                        </CardDescription>
                        <Link 
                          to={program.link}
                          className="inline-flex items-center text-terracotta-500 hover:text-terracotta-400 text-sm font-medium group mt-auto"
                        >
                          Learn More
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
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
    <section id="programs-section" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Programs at a Glance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card 
              key={program.title}
              className="border-sage-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl text-sage-500">
                  {program.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="text-gray-600 mb-4 flex-grow">
                  {program.description}
                </CardDescription>
                <Link 
                  to={program.link}
                  className="inline-flex items-center text-terracotta-500 hover:text-terracotta-400 text-sm font-medium group mt-auto"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsOverview;
