
import React from "react";
import { useInView } from "react-intersection-observer";
import { BookOpen, Users2, Lightbulb, Target } from "lucide-react";
import ProgramCard from "./ProgramCard";

const programs = [
  {
    title: "Financial Literacy Development",
    description: "Essential financial education covering budgeting, savings, and investment principles designed specifically for entrepreneurs.",
    icon: Target,
    details: [
      "Micro-financing opportunities and management",
      "Strategic budgeting and saving techniques",
      "Investment principles for small businesses",
      "Digital financial tools and technologies"
    ],
    cta: {
      text: "Register for Classes",
      link: "/programs/financial-literacy"
    }
  },
  {
    title: "Business Creation Training",
    description: "Comprehensive workshops covering business planning, marketing, and financial management fundamentals.",
    icon: BookOpen,
    details: [
      "Business planning, marketing strategies, and operational management",
      "Guest lectures from successful local entrepreneurs",
      "90% of participants launch businesses within one year",
      "Hands-on practical sessions and real-world case studies"
    ],
    cta: {
      text: "Join Next Workshop",
      link: "/programs/business-creation"
    }
  },
  {
    title: "Leadership Development",
    description: "One-on-one mentoring with experienced business leaders to develop management skills and leadership capabilities.",
    icon: Users2,
    details: [
      "Personalized mentor matching program",
      "Monthly group leadership workshops",
      "Access to regional business networks",
      "Ongoing support and guidance"
    ],
    cta: {
      text: "Find a Mentor",
      link: "/programs/leadership-development"
    }
  },
  {
    title: "Community Collaboration",
    description: "Initiatives that bring entrepreneurs together to create sustainable impact in local communities through shared resources.",
    icon: Lightbulb,
    details: [
      "Cross-sector partnership opportunities",
      "Resource sharing networks",
      "Joint community development projects",
      "Technology and innovation collaborations"
    ],
    cta: {
      text: "Collaborate With Us",
      link: "/programs/community-collaboration"
    }
  },
];

const ProgramsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <p className="text-lg text-gray-600">
          Our programs are designed to empower local entrepreneurs with practical skills, 
          knowledge, and resources. Through our community-driven approach, we focus on 
          building sustainable businesses that create lasting impact in Central Asia.
        </p>
      </div>

      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {programs.map((program, index) => (
          <ProgramCard key={index} {...program} />
        ))}
      </div>
    </div>
  );
};

export default ProgramsSection;
