import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegion } from "@/contexts/RegionContext";
import { useHomepageMission } from "@/hooks/useHomepage";
import { getLocalized } from "@/lib/localized";

const QuickAbout = () => {
  const { isCentralAsia } = useRegion();
  const { mission } = useHomepageMission();

  const cards = mission.getCardsLocalized(isCentralAsia);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {getLocalized(mission.heading, mission.headingRu, isCentralAsia)}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            {getLocalized(
              mission.missionStatement,
              mission.missionStatementRu,
              isCentralAsia
            )}
          </p>

          <p className="text-lg text-gray-500 italic">
            {getLocalized(mission.vision, mission.visionRu, isCentralAsia)}
          </p>

          {/* Why We Exist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {cards.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="p-6 rounded-lg bg-gray-50 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-bold text-gray-500 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <Link
            to={mission.ctaUrl}
            className="inline-flex items-center text-[#C9922A] hover:text-[#C9922A]/90 font-medium group"
          >
            {getLocalized(mission.ctaLabel, mission.ctaLabelRu, isCentralAsia)}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickAbout;
