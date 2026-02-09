import { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, Globe, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the HikeWise team and help students around the world study smarter.",
};

const values = [
  {
    icon: Heart,
    title: "Student-First",
    description: "Every decision we make is guided by what's best for students.",
  },
  {
    icon: Zap,
    title: "Move Fast",
    description: "We ship quickly, learn from feedback, and iterate constantly.",
  },
  {
    icon: Globe,
    title: "Think Global",
    description: "We're building for students everywhere, not just one market.",
  },
  {
    icon: Users,
    title: "Win Together",
    description: "We celebrate team wins and support each other through challenges.",
  },
];

const benefits = [
  "Competitive salary & equity",
  "Remote-first culture",
  "Unlimited PTO",
  "Health, dental & vision",
  "Learning & development budget",
  "Home office setup",
  "Team retreats",
  "Mental health support",
];

export default function CareersPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Join Our Team"
          subtitle="Help us build the future of education technology."
        />

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value) => (
            <Card key={value.title} className="bg-white border-none shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <Card className="bg-forest text-white mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Benefits & Perks
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-white/90"
                >
                  <span className="text-sage">✓</span>
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
          <Card className="bg-white border-none shadow-soft max-w-xl mx-auto">
            <CardContent className="p-8">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">
                No Open Positions Right Now
              </h3>
              <p className="text-muted-foreground mb-4">
                We don&apos;t have any open positions at the moment, but we&apos;re
                always looking for talented people. Send us your resume and
                we&apos;ll keep you in mind for future opportunities.
              </p>
              <Badge variant="secondary" className="px-4 py-2">
                Send resume to careers@hikewise.app
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
