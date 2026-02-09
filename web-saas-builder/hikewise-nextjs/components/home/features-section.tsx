"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { Timer, Users, BarChart3, Trophy, Sparkles } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Focus Sessions",
    description:
      "Choose from Balanced, Sprint, or Deep Work modes tailored to your study style.",
    details: {
      heading: "Focus Sessions",
      text: "Scientifically-designed study intervals that maximize retention and minimize burnout.",
      bullets: [
        "Balanced Mode: 25/5 minute cycles",
        "Sprint Mode: 15/3 quick bursts",
        "Deep Work: 50/10 for complex tasks",
        "Custom timers available",
      ],
    },
    gradient: "from-teal/20 to-forest/20",
  },
  {
    icon: Users,
    title: "Study Rooms",
    description:
      "Join virtual study rooms and collaborate with friends in real-time.",
    details: {
      heading: "Study Rooms",
      text: "Virtual co-working spaces that bring the library experience to your home.",
      bullets: [
        "Create private or public rooms",
        "See friends studying live",
        "Ambient background sounds",
        "In-room chat and reactions",
      ],
    },
    gradient: "from-sage/30 to-teal/20",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Visualize your study habits with detailed analytics and insights.",
    details: {
      heading: "Progress Tracking",
      text: "Beautiful dashboards that turn your effort into visible progress.",
      bullets: [
        "Daily, weekly, monthly stats",
        "Streak tracking and milestones",
        "Subject-wise breakdowns",
        "Exportable study reports",
      ],
    },
    gradient: "from-forest/15 to-sage/30",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description:
      "Compete with friends and climb the ranks to stay motivated.",
    details: {
      heading: "Leaderboards",
      text: "Healthy competition that transforms studying into an engaging challenge.",
      bullets: [
        "Friend and global rankings",
        "Weekly competitions",
        "Achievements and badges",
        "Seasonal challenges",
      ],
    },
    gradient: "from-teal/25 to-sage/20",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sage/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          title="Everything you need to study better"
          subtitle="Powerful features designed to help you stay focused, track progress, and achieve your academic goals."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative h-[340px]"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card container with 3D transform */}
              <div
                className="relative w-full h-full transition-transform duration-700 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    hoveredIndex === index ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 glass-card rounded-2xl p-6 flex flex-col"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${feature.gradient}`}
                  >
                    <feature.icon className="w-7 h-7 text-forest" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground flex-1">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-teal mt-4 font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>Hover for details</span>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-forest to-forest-light text-white rounded-2xl p-6 flex flex-col"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.details.heading}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {feature.details.text}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {feature.details.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-white/90"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hover glow effect */}
              <div
                className={`absolute inset-0 -z-10 rounded-2xl blur-xl transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} ${
                  hoveredIndex === index ? "opacity-60" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
