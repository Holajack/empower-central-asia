
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
import { useRegion } from "@/contexts/RegionContext";

interface ProgramsOverviewProps {
  isMobile?: boolean;
}

const ProgramsOverview = ({ isMobile = false }: ProgramsOverviewProps) => {
  const { isCentralAsia } = useRegion();

  const programs = isCentralAsia
    ? [
        {
          title: "ACTIVATE",
          description:
            "Бесплатное обучение финансовой грамотности. Практические навыки: бюджетирование, сбережения, планирование, управление долгами. Открыто для всех. Те, кто приходят стабильно — двигаются дальше.",
          link: "/programs/financial-literacy",
        },
        {
          title: "EQUIP",
          description:
            "Развитие бизнеса для тех, кто показал усердие. Мы помогаем построить устойчивую модель и развить реальные навыки. Не все доходят сюда — те, кто доходят, уже доказали серьёзность намерений.",
          link: "/programs/business-creation",
        },
        {
          title: "EMPOWER",
          description:
            "Стартовый капитал для тех, кто прошёл путь и доказал готовность. Реальные инвестиции в реального человека, который это заслужил. Не благотворительность — шанс.",
          link: "/programs/leadership-development",
        },
        {
          title: "MULTIPLY",
          description:
            "Они строят. Они делятся. Они становятся теми, кто даёт кому-то другому первый шанс. Так надежда распространяется — от человека к человеку.",
          link: "/programs/community-collaboration",
        },
      ]
    : [
        {
          title: "ACTIVATE",
          description:
            "Free financial literacy training. Practical, real-world skills: budgeting, saving, planning, debt management. Open to anyone. The people who show up consistently are the ones who move forward.",
          link: "/programs/financial-literacy",
        },
        {
          title: "EQUIP",
          description:
            "Business development for those who demonstrate diligence. We walk alongside them to build a sustainable model and develop real skills. Not everyone makes it here -- the ones who do have proven they're serious.",
          link: "/programs/business-creation",
        },
        {
          title: "EMPOWER",
          description:
            "Startup capital for those who complete the journey and demonstrate readiness. A real investment in a real person who earned it. Not charity -- a chance.",
          link: "/programs/leadership-development",
        },
        {
          title: "MULTIPLY",
          description:
            "They build. They share. They become the one who gives someone else their first opportunity. This is how hope spreads -- person to person.",
          link: "/programs/community-collaboration",
        },
      ];

  const learnMoreLabel = isCentralAsia ? "Узнать больше" : "Learn More";

  // Adding embla carousel for better mobile control
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps", // Ensures cards are contained properly
  });

  if (isMobile) {
    return (
      <section id="programs-section" className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            {isCentralAsia ? "Наша 4-этапная модель" : "Our 4-Stage Model"}
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
                      className="border-[#1B2A4A]/20 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="flex-shrink-0">
                        <CardTitle className="text-xl text-[#1B2A4A] line-clamp-2">
                          {program.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow">
                        <CardDescription className="text-gray-600 mb-4 flex-grow line-clamp-4">
                          {program.description}
                        </CardDescription>
                        <Link
                          to={program.link}
                          className="inline-flex items-center text-[#C9922A] hover:text-[#C9922A]/90 text-sm font-medium group mt-auto"
                        >
                          {learnMoreLabel}
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
          {isCentralAsia ? "Программы на первый взгляд" : "Programs at a Glance"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card
              key={program.title}
              className="border-[#1B2A4A]/20 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl text-[#1B2A4A]">{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="text-gray-600 mb-4 flex-grow">
                  {program.description}
                </CardDescription>
                <Link
                  to={program.link}
                  className="inline-flex items-center text-[#C9922A] hover:text-[#C9922A]/90 text-sm font-medium group mt-auto"
                >
                  {learnMoreLabel}
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
