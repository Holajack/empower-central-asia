import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Stethoscope,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import blogData from "@/data/blog-posts.json";

export const metadata: Metadata = {
  title: "Dr. Nikolai Lee - Founder, Educator & Author",
  description:
    "Dr. Nikolai Lee is a Doctor of Chiropractic, paramedic, and collegiate educator who has taught over 3,000 students. He built HikeWise to help the next generation study smarter.",
  alternates: {
    canonical: "https://hikewise.app/about/nikolai",
  },
};

const credentials = [
  {
    icon: Stethoscope,
    title: "Doctor of Chiropractic",
    description:
      "Completed a rigorous doctoral program requiring mastery of anatomy, physiology, neurology, and clinical diagnosis across thousands of study hours.",
  },
  {
    icon: Award,
    title: "Licensed Paramedic",
    description:
      "Trained and certified as a paramedic, bringing real-world clinical decision-making under pressure — the kind of learning that demands focus and retention.",
  },
  {
    icon: Users,
    title: "3,000+ Students Taught",
    description:
      "As a collegiate educator, has taught over 3,000 students across the country, seeing firsthand what separates students who thrive from those who struggle.",
  },
  {
    icon: GraduationCap,
    title: "Founder of HikeWise",
    description:
      "Built HikeWise from the insight that student success almost always comes down to habits and focus — not talent or intelligence.",
  },
];

export default function NikolaiAuthorPage() {
  const recentPosts = blogData.posts
    .filter((p) => p.author === "Dr. Nikolai Lee")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const nikolaiSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Nikolai Lee",
    url: "https://hikewise.app/about/nikolai",
    jobTitle: "Founder & Lead Author",
    description:
      "Doctor of Chiropractic, paramedic, and collegiate educator who has taught over 3,000 students. Built HikeWise to help the next generation of students take control of how they study.",
    worksFor: {
      "@type": "Organization",
      name: "HikeWise",
      url: "https://hikewise.app",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Doctor of Chiropractic",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Licensed Paramedic",
      },
    ],
    sameAs: ["https://hikewise.app/about/nikolai"],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Palmer College of Chiropractic",
    },
    knowsAbout: [
      "Spaced repetition",
      "Active recall",
      "Study techniques",
      "Learning science",
      "Student productivity",
      "Human performance",
      "Habits and focus",
      "Evidence-based education",
      "Pomodoro technique",
      "Feynman technique",
      "Metacognition",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream/30 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nikolaiSchema) }}
      />

      <div className="container mx-auto px-6 max-w-4xl">
        {/* Author Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-forest to-teal flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
            NL
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Dr. Nikolai Lee
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Founder of HikeWise &middot; Chiropractor &middot; Paramedic
            &middot; Educator
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-forest/10 text-forest border-none">
              Doctor of Chiropractic
            </Badge>
            <Badge className="bg-teal/10 text-teal border-none">
              Licensed Paramedic
            </Badge>
            <Badge className="bg-sage text-forest border-none">
              3,000+ Students Taught
            </Badge>
          </div>
        </div>

        {/* Bio */}
        <Card className="bg-white border-none shadow-soft mb-12">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-4">About Nikolai</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;ve made it my life&apos;s work to understand how people
                perform at their best. As a Doctor of Chiropractic, a paramedic,
                and a collegiate educator who has taught over 3,000 students
                across the country, I&apos;ve seen firsthand what separates
                students who thrive from those who struggle. It almost always
                comes down to two things: habits and focus.
              </p>
              <p>
                That insight is exactly why I built HikeWise — a smarter way for
                the next generation of students to take control of how they
                study. My clinical training taught me how the brain actually
                learns and retains information under pressure. My years in the
                classroom showed me that even brilliant students fail when they
                don&apos;t have systems for staying focused and building
                consistent study habits.
              </p>
              <p>
                The articles on this blog draw from that dual perspective:
                the science of how learning works (from my medical and clinical
                background) and the practical reality of what students actually
                need (from teaching thousands of them). Every piece is grounded
                in peer-reviewed research, but filtered through years of
                real-world classroom experience.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Credentials */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-gradient-to-b from-teal to-forest rounded-full" />
          Credentials & Background
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {credentials.map((cred) => (
            <Card
              key={cred.title}
              className="bg-white border-none shadow-soft"
            >
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-3">
                  <cred.icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-semibold mb-2">{cred.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cred.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Articles */}
        {recentPosts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-gradient-to-b from-teal to-forest rounded-full" />
              Recent Articles by Dr. Lee
            </h2>
            <div className="space-y-3 mb-12">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <Card className="bg-white border-none shadow-soft hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
                    <CardContent className="p-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm group-hover:text-teal transition-colors truncate">
                          {post.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          &middot; {post.readTime}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-teal shrink-0 transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-forest transition-colors"
              >
                View all articles <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        )}

        {/* Meet the Developer */}
        <div className="mt-16 pt-10 border-t border-border/50">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-gradient-to-b from-teal to-forest rounded-full" />
            The Team Behind HikeWise
          </h2>
          <Link href="/about/jacken" className="group block">
            <Card className="bg-white border-none shadow-soft hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal to-forest flex items-center justify-center text-white font-bold text-lg shrink-0">
                  JH
                </div>
                <div>
                  <p className="font-semibold group-hover:text-teal transition-colors">
                    Jacken Holland
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Developer & Operator
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    UCF graduate, app developer, and web developer who builds
                    the technology behind HikeWise. Has traveled to 20+
                    countries and builds websites and apps for businesses.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
