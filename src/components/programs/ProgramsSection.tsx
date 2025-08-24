
import React from "react";
import { useInView } from "react-intersection-observer";
import { BookOpen, Users2, Lightbulb, Target } from "lucide-react";
import ProgramCard from "./ProgramCard";

const programs = [
  {
    title: "Three-Thirds Financial Discipleship",
    description: "Proven biblical financial education using the Three-Thirds method: Look Back → Look Up → Look Forward for lasting transformation and multiplication.",
    icon: Target,
    details: [
      "10-week comprehensive curriculum with 6-week and 4-week accelerated tracks",
      "Biblical stewardship training with practical budgeting and debt elimination",
      "Gospel integration tools (Two Kingdoms and Three Circles) for sharing faith",
      "Multiplication focus: participants trained to facilitate new groups",
      "100% completion success rate with ongoing accountability support"
    ],
    cta: {
      text: "Join Next Cohort",
      link: "/programs/financial-literacy"
    }
  },
  {
    title: "Business Creation Training",
    description: "Comprehensive 12-week entrepreneurship program using Lean Startup methodology, Business Model Canvas, and hands-on MVP development for emerging market entrepreneurs.",
    icon: BookOpen,
    details: [
      "4-module intensive program: Think Like Entrepreneur → Shape Business Model → Validate Assumptions → Build Traction",
      "72 total hours over 3 months with hands-on workshops and real customer validation",
      "Lean Startup methodology, Business Model Canvas, and MVP development using modern tools",
      "Customer discovery, market validation, and investment-ready pitch creation",
      "90% of participants launch viable businesses within 6 months with ongoing mentorship"
    ],
    cta: {
      text: "Join Next Cohort",
      link: "/programs/business-creation"
    }
  },
  {
    title: "Leadership Development & Mentorship",
    description: "Launching comprehensive 12-month leadership program using the proven 70-20-10 model. VOLUNTEER MENTORS NEEDED to guide emerging leaders through transformational development.",
    icon: Users2,
    details: [
      "🚀 NEW PROGRAM - Currently recruiting experienced leaders as volunteer mentors",
      "3-phase program: Foundation → Skill Development → Mastery & Multiplication",
      "70% experiential learning, 20% mentorship, 10% formal training methodology",
      "Emotional intelligence, servant leadership, and transformational leadership focus",
      "Seeking executives, entrepreneurs, and senior leaders to mentor next generation"
    ],
    cta: {
      text: "Volunteer as Mentor",
      link: "/programs/leadership-development"
    }
  },
  {
    title: "Community Collaboration Network",
    description: "Building volunteer-driven community partnerships to connect entrepreneurs, businesses, and organizations for sustainable local impact. VOLUNTEERS NEEDED to help launch this initiative.",
    icon: Lightbulb,
    details: [
      "🚀 NEW PROGRAM - Seeking volunteers to help build community partnerships",
      "Volunteer coordinators needed for cross-sector partnership development",
      "Community organizers wanted for resource sharing network facilitation",
      "Looking for business professionals to lead collaborative project initiatives",
      "Help us connect entrepreneurs with mentors, resources, and opportunities"
    ],
    cta: {
      text: "Volunteer to Build Community",
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
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <BookOpen className="w-4 h-4" />
          Comprehensive Training Programs
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Proven Programs Delivering 
          <span className="text-blue-600"> 100% Success Rate</span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          <strong className="text-gray-800">Volusia County volunteers</strong> deliver world-class business training programs 
          designed to empower entrepreneurs in Central Asia. Our <strong className="text-gray-800">Port Orange-based team</strong> has 
          achieved measurable success through comprehensive, culturally-sensitive business education.
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
