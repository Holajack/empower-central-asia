
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

interface ProgramsOverviewProps {
  isMobile?: boolean;
}

const ProgramsOverview = ({ isMobile = false }: ProgramsOverviewProps) => {
  const programs = [
    {
      title: "Financial Literacy Development",
      description: "Essential financial education covering budgeting, savings, and investment principles.",
    },
    {
      title: "Business Creation Training",
      description: "Comprehensive workshops covering business planning, marketing, and financial management fundamentals.",
    },
    {
      title: "Leadership Development",
      description: "One-on-one mentoring with experienced business leaders to develop management skills.",
    },
    {
      title: "Community Collaboration",
      description: "Initiatives that bring entrepreneurs together to create sustainable impact in local communities.",
    },
  ];

  if (isMobile) {
    return (
      <section id="programs-section" className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Programs at a Glance
          </h2>
          <Carousel className="w-full" opts={{ align: "start" }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {programs.map((program, index) => (
                <CarouselItem key={program.title} className="pl-2 md:pl-4 basis-4/5 md:basis-1/2">
                  <Card 
                    className="border-sage-200 hover:shadow-lg transition-all duration-300 h-full"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-sage-500">
                        {program.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">
                        {program.description}
                      </CardDescription>
                      <Link 
                        to="/programs"
                        className="inline-flex items-center text-terracotta-500 hover:text-terracotta-400 text-sm font-medium group"
                      >
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
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
    <section id="programs-section" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Programs at a Glance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card 
              key={program.title}
              className="border-sage-200 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-sage-500">
                  {program.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  {program.description}
                </CardDescription>
                <Link 
                  to="/programs"
                  className="inline-flex items-center text-terracotta-500 hover:text-terracotta-400 text-sm font-medium group"
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
