
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
import { usePrograms, type ProgramHero } from "@/hooks/usePrograms";

interface ProgramsOverviewProps {
  isMobile?: boolean;
}

// The four programs render in this curated order (mirrors the
// Activate → Equip → Empower → Multiply progression of the original
// hardcoded version). Programs without a known slug are appended after.
const SLUG_PRIORITY: Record<string, number> = {
  "financial-literacy": 0,
  "business-creation": 1,
  "leadership-development": 2,
  "community-collaboration": 3,
};

function sortPrograms(programs: ProgramHero[]): ProgramHero[] {
  return [...programs].sort((a, b) => {
    const ai = SLUG_PRIORITY[a.slug] ?? 99;
    const bi = SLUG_PRIORITY[b.slug] ?? 99;
    if (ai !== bi) return ai - bi;
    return a.title.localeCompare(b.title);
  });
}

const ProgramsOverview = ({ isMobile = false }: ProgramsOverviewProps) => {
  const { isCentralAsia } = useRegion();
  const { programs: rawPrograms } = usePrograms();
  const programs = sortPrograms(rawPrograms);

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
                    key={program.slug}
                    className="pl-4 md:basis-1/2 lg:basis-1/3 basis-[85%]" // Adjust card width for better fit
                  >
                    <Card
                      className="border-[#1B2A4A]/20 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {program.heroImageUrl && (
                        <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                          <img
                            src={program.heroImageUrl}
                            alt={program.getTitle(isCentralAsia)}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-shrink-0">
                        <CardTitle className="text-xl text-[#1B2A4A] line-clamp-2">
                          {program.getTitle(isCentralAsia)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow">
                        <CardDescription className="text-gray-600 mb-4 flex-grow line-clamp-4">
                          {program.getTagline(isCentralAsia)}
                        </CardDescription>
                        <Link
                          to={program.primaryCtaUrl || `/programs/${program.slug}`}
                          className="inline-flex items-center text-[#C9922A] hover:text-[#C9922A]/90 text-sm font-medium group mt-auto"
                        >
                          {program.getPrimaryCtaLabel(isCentralAsia) || learnMoreLabel}
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
              key={program.slug}
              className="border-[#1B2A4A]/20 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {program.heroImageUrl && (
                <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                  <img
                    src={program.heroImageUrl}
                    alt={program.getTitle(isCentralAsia)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl text-[#1B2A4A]">
                  {program.getTitle(isCentralAsia)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="text-gray-600 mb-4 flex-grow">
                  {program.getTagline(isCentralAsia)}
                </CardDescription>
                <Link
                  to={program.primaryCtaUrl || `/programs/${program.slug}`}
                  className="inline-flex items-center text-[#C9922A] hover:text-[#C9922A]/90 text-sm font-medium group mt-auto"
                >
                  {program.getPrimaryCtaLabel(isCentralAsia) || learnMoreLabel}
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
