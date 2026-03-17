import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProgramProps {
  stage: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  cta: {
    participantText: string;
    participantLink: string;
    donorText: string;
    donorLink: string;
  };
  color: "navy" | "gold";
  index: number;
  hideDonorButton?: boolean;
}

const ProgramCard = ({
  stage,
  title,
  tagline,
  description,
  details,
  cta,
  color,
  index,
  hideDonorButton = false,
}: ProgramProps) => {
  const isEven = index % 2 === 0;
  const colorMap = {
    navy: {
      badge: "bg-[#1B2A4A] text-white",
      border: "border-[#1B2A4A]/20",
      accent: "text-[#1B2A4A]",
      dot: "bg-[#1B2A4A]",
      button: "bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white",
    },
    gold: {
      badge: "bg-[#C9922A] text-white",
      border: "border-[#C9922A]/20",
      accent: "text-[#C9922A]",
      dot: "bg-[#C9922A]",
      button: "bg-[#C9922A] hover:bg-[#C9922A]/90 text-white",
    },
  };
  const colors = colorMap[color];

  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Stage Number / Badge */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          className={`w-16 h-16 rounded-full ${colors.badge} flex items-center justify-center text-sm font-bold shadow-lg`}
        >
          {index + 1}
        </div>
        <span className={`text-xs font-bold tracking-widest mt-2 ${colors.accent}`}>
          {stage}
        </span>
      </div>

      {/* Content Card */}
      <div
        className={`flex-1 bg-white rounded-xl border ${colors.border} p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow`}
      >
        <h3 className={`text-2xl font-bold mb-1 ${colors.accent}`}>{title}</h3>
        <p className="text-sm text-gray-500 italic mb-4">{tagline}</p>
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

        <ul className="space-y-2 mb-6">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
              <div
                className={`w-1.5 h-1.5 mt-2 rounded-full ${colors.dot} flex-shrink-0`}
              />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to={cta.participantLink}>
            <Button className={`${colors.button} font-medium`}>
              {cta.participantText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          {!hideDonorButton && cta.donorText && cta.donorLink && (
            <Link to={cta.donorLink}>
              <Button
                variant="outline"
                className={`border-current ${colors.accent} hover:bg-gray-50 font-medium`}
              >
                {cta.donorText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
