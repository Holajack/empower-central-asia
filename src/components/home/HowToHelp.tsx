
import { Heart, Users2, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HowToHelpProps {
  isMobile?: boolean;
}

const HowToHelp = ({ isMobile = false }: HowToHelpProps) => {
  const helpOptions = [
    {
      title: "Donate",
      description: "Your financial support helps provide essential resources and training materials to aspiring entrepreneurs in our communities.",
      icon: Heart,
      buttonText: "Make a Donation",
      buttonClass: "bg-terracotta-500 hover:bg-terracotta-400",
    },
    {
      title: "Volunteer",
      description: "Share your expertise and experience by mentoring entrepreneurs or leading workshops in your area of expertise.",
      icon: Users2,
      buttonText: "Become a Volunteer",
      buttonClass: "border-sage-500 text-sage-500 hover:bg-sage-50",
      variant: "outline" as const,
    },
    {
      title: "Partner",
      description: "Collaborate with us to create sustainable impact through resource sharing, sponsorships, or joint initiatives.",
      icon: Handshake,
      buttonText: "Partner With Us",
      buttonClass: "border-sand-500 text-sand-500 hover:bg-sand-50",
      variant: "outline" as const,
    },
  ];

  // Function to scroll to top when navigating to get-involved page
  const handleVolunteerClick = () => {
    window.scrollTo(0, 0);
  };

  if (isMobile) {
    return (
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            How You Can Help
          </h2>
          <Carousel className="w-full" opts={{ align: "start" }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {helpOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <CarouselItem key={option.title} className="pl-2 md:pl-4 basis-4/5 md:basis-1/2">
                    <Card 
                      className="border-sage-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                    >
                      <CardHeader className="flex-grow-0">
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-terracotta-500" />
                          <CardTitle className="text-xl">{option.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow justify-between space-y-4">
                        <CardDescription className="flex-grow">
                          {option.description}
                        </CardDescription>
                        <Link 
                          to="/get-involved"
                          onClick={option.title === "Volunteer" ? handleVolunteerClick : undefined}
                          className="mt-auto"
                        >
                          <Button 
                            variant={option.variant} 
                            className={`w-full ${option.buttonClass}`}
                          >
                            {option.buttonText}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
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
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          How You Can Help
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {helpOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card 
                key={option.title} 
                className="border-sage-200 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <CardHeader className="flex-grow-0">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-terracotta-500" />
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between space-y-4">
                  <CardDescription className="flex-grow">
                    {option.description}
                  </CardDescription>
                  <Link 
                    to="/get-involved"
                    onClick={option.title === "Volunteer" ? handleVolunteerClick : undefined}
                    className="mt-auto"
                  >
                    <Button 
                      variant={option.variant} 
                      className={`w-full ${option.buttonClass}`}
                    >
                      {option.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;
