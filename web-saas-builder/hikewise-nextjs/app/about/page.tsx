import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Users,
  Stethoscope,
  Award,
  Code2,
  Globe,
  Smartphone,
  ArrowRight,
  Target,
  Brain,
  Timer,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About HikeWise - Smart Study Companion App for Students",
  description:
    "HikeWise is a smart study companion app built by Dr. Nikolai Lee and Jacken Holland. Combining clinical science with modern technology to help students study smarter with focus timers, AI insights, and study tracking.",
  alternates: {
    canonical: "https://hikewise.app/about",
  },
};

const mission = [
  {
    icon: Brain,
    title: "Science-Backed Methods",
    description:
      "Every feature in HikeWise is grounded in proven study techniques like active recall, spaced repetition, and the Pomodoro technique — methods validated by decades of cognitive research.",
  },
  {
    icon: Target,
    title: "Built for Real Students",
    description:
      "Designed from the insight that student success comes down to habits and focus. HikeWise is a smart study planner that helps students build consistent study routines that stick.",
  },
  {
    icon: Timer,
    title: "Focus Timer for Students",
    description:
      "Our intelligent focus timer adapts to how you study, with Balanced, Sprint, and Deep Work modes. Track your study sessions, build streaks, and see your progress over time.",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Study Tracking",
    description:
      "Nora, your AI study companion, learns your patterns and gives personalized recommendations. Track study habits, set academic goals, and measure your progress with real analytics.",
  },
];

const team = [
  {
    name: "Dr. Nikolai Lee",
    role: "Founder & Lead Author",
    initials: "NL",
    gradient: "from-forest to-teal",
    href: "/about/nikolai",
    badges: ["Doctor of Chiropractic", "Licensed Paramedic", "3,000+ Students Taught"],
    bio: "Doctor of Chiropractic, paramedic, and collegiate educator who has taught over 3,000 students. Built HikeWise from the insight that student success almost always comes down to habits and focus.",
    credentials: [
      { icon: Stethoscope, text: "Doctor of Chiropractic" },
      { icon: Award, text: "Licensed Paramedic" },
      { icon: Users, text: "3,000+ Students Taught" },
      { icon: GraduationCap, text: "Founder of HikeWise" },
    ],
  },
  {
    name: "Jacken Holland",
    role: "Developer & Operator",
    initials: "JH",
    gradient: "from-teal to-forest",
    href: "/about/jacken",
    badges: ["UCF Graduate", "Full-Stack Developer", "20+ Countries"],
    bio: "UCF graduate and full-stack developer who builds the technology behind HikeWise. Has traveled to over 20 countries, bringing a global perspective to product design and understanding diverse student needs.",
    credentials: [
      { icon: GraduationCap, text: "University of Central Florida" },
      { icon: Code2, text: "Full-Stack Developer" },
      { icon: Globe, text: "20+ Countries" },
      { icon: Smartphone, text: "App Developer" },
    ],
  },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HikeWise",
    url: "https://hikewise.app",
    description:
      "HikeWise is a smart study companion app that helps students study smarter with science-backed focus timers, AI-powered study tracking, and intelligent study habit analytics.",
    foundingDate: "2025",
    founder: [
      {
        "@type": "Person",
        name: "Dr. Nikolai Lee",
        jobTitle: "Founder & Lead Author",
        url: "https://hikewise.app/about/nikolai",
      },
      {
        "@type": "Person",
        name: "Jacken Holland",
        jobTitle: "Developer & Operator",
        url: "https://hikewise.app/about/jacken",
      },
    ],
    sameAs: ["https://hikewise.app"],
    knowsAbout: [
      "Study tracking",
      "Focus timers",
      "Spaced repetition",
      "Active recall",
      "Pomodoro technique",
      "AI study assistant",
      "Student productivity",
      "Study habit tracking",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream/30 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <div className="container mx-auto px-6 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <Badge className="bg-teal/10 text-teal border-none mb-4">
            About HikeWise
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Helping Students Study{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-teal">
              Smarter
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            HikeWise is a study companion app built by an educator and a
            developer who believe that the right tools can transform how students
            learn. Combining clinical science with modern technology to create a
            smarter way to study.
          </p>
        </div>

        {/* Our Story */}
        <Card className="bg-white border-none shadow-soft mb-16">
          <CardContent className="p-8 sm:p-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-gradient-to-b from-teal to-forest rounded-full" />
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                HikeWise started with a simple observation: even the brightest
                students struggle when they don&apos;t have systems for staying
                focused and building consistent study habits. After teaching over
                3,000 students across the country, Dr. Nikolai Lee saw the same
                pattern over and over — it wasn&apos;t about talent or
                intelligence. It was about habits and focus.
              </p>
              <p>
                That insight became the foundation of HikeWise. We built a study
                tracker app that combines evidence-based study techniques —
                active recall, spaced repetition, the Pomodoro technique, and
                deep work principles — with intelligent tracking and AI-powered
                insights. The result is a smart study planner that actually helps
                students build the habits that lead to academic success.
              </p>
              <p>
                Every feature in HikeWise is informed by Dr. Lee&apos;s clinical
                training in how the brain learns and retains information, and
                built with the technical precision of a developer who has
                shipped products across 20+ countries. We&apos;re not just
                another study app — we&apos;re a study habit tracker designed
                from the ground up to help students take control of how they
                learn.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What Makes HikeWise Different */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-gradient-to-b from-teal to-forest rounded-full" />
          What Makes HikeWise Different
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {mission.map((item) => (
            <Card
              key={item.title}
              className="bg-white border-none shadow-soft"
            >
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meet the Team */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-gradient-to-b from-teal to-forest rounded-full" />
          Meet the Team
        </h2>
        <div className="space-y-6 mb-12">
          {team.map((member) => (
            <Link
              key={member.name}
              href={member.href}
              className="group block"
            >
              <Card className="bg-white border-none shadow-soft hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-xl shrink-0`}
                    >
                      {member.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg group-hover:text-teal transition-colors">
                          {member.name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-teal transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.badges.map((badge) => (
                          <Badge
                            key={badge}
                            className="bg-sage text-forest border-none text-xs"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-forest to-teal border-none shadow-soft text-white">
          <CardContent className="p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Study Smarter?
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Join thousands of students using HikeWise to build better study
              habits, stay focused, and achieve their academic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#features"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-forest font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Explore Features
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Read Our Blog
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
