
import * as LucideIcons from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import DonateButton from "../DonateButton";
import { useRegion } from "@/contexts/RegionContext";
import { useHomepageHowToHelp, type HelpCard } from "@/hooks/useHomepageHowToHelp";
import { getLocalized } from "@/lib/localized";

interface HowToHelpProps {
  isMobile?: boolean;
}

const HowToHelp = ({ isMobile = false }: HowToHelpProps) => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { howToHelp } = useHomepageHowToHelp();

  // Resolve a Lucide icon component by name with a sensible fallback.
  // Lucide exports a wide range of components without a unified type that
  // narrows nicely; `any` is acceptable for the lookup pattern.
  const resolveIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name] as
      | React.ComponentType<{ className?: string }>
      | undefined;
    return Icon ?? Sparkles;
  };

  // The visual layout has two columns: "I want to learn" and "I want to give".
  // The give-column merges Sanity's separate volunteer + partner card arrays.
  // The Donate card is conventionally seeded as the first volunteer card
  // (and identified at render time by the absence of a `link`).
  const learnCards = howToHelp.learnCards;
  const giveCardsAll: HelpCard[] = [
    ...howToHelp.volunteerCards,
    ...howToHelp.partnerCards,
  ];

  // Hide donation card for actual Central Asia visitors (not just Russian
  // language toggle). A card is treated as a "donate" card when it has no
  // `link`, so the CMS doesn't need a separate boolean flag.
  const giveCards = isRegionCentralAsia
    ? giveCardsAll.filter((c) => !!c.link)
    : giveCardsAll;

  const renderCard = (card: HelpCard, accentColor: "yellow" | "blue") => {
    const Icon = resolveIcon(card.icon);
    const colorMap: Record<
      "yellow" | "blue",
      { bg: string; text: string; border: string; btn: string }
    > = {
      yellow: {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-200",
        btn: "bg-yellow-500 hover:bg-yellow-600 text-black",
      },
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        btn: "bg-blue-600 hover:bg-blue-700 text-white",
      },
    };
    const colors = colorMap[accentColor];

    const title = getLocalized(card.title, card.titleRu, isCentralAsia);
    const description = getLocalized(
      card.description,
      card.descriptionRu,
      isCentralAsia
    );
    const buttonText = getLocalized(
      card.buttonText,
      card.buttonTextRu,
      isCentralAsia
    );

    // No link → render as DonateButton (admins can omit `link` in Sanity to
    // make any card use the donation flow).
    const isDonate = !card.link;

    return (
      <Card
        key={`${card.title}-${card.icon}`}
        className={`${colors.border} border hover:shadow-lg transition-all duration-300 flex flex-col h-full`}
      >
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`${colors.bg} p-2 rounded-lg`}>
              <Icon className={`h-5 w-5 ${colors.text}`} />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between space-y-4">
          <CardDescription className="flex-grow text-gray-600">
            {description}
          </CardDescription>
          <div className="mt-auto">
            {isDonate ? (
              <DonateButton className={`w-full ${colors.btn} font-medium`}>
                {buttonText}
              </DonateButton>
            ) : (
              <Link to={card.link!}>
                <Button className={`w-full ${colors.btn} font-medium group`}>
                  {buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const sectionHeading = howToHelp.getSectionHeading(isCentralAsia);
  const learnHeading = howToHelp.getLearnHeading(isCentralAsia);
  const giveHeading = howToHelp.getVolunteerHeading(isCentralAsia);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          {sectionHeading}
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {isCentralAsia
            ? "Хотите развить собственные навыки или поддержать чей-то путь — здесь найдётся место для вас."
            : "Whether you want to grow your own skills or support someone else's journey, there's a place for you."}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learn Track */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                {learnHeading}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {learnCards.map((card) => renderCard(card, "yellow"))}
            </div>
          </div>

          {/* Give Track */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                {giveHeading}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {giveCards.map((card) => renderCard(card, "blue"))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;
