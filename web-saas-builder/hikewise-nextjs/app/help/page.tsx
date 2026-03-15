import { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  MessageCircle,
  Video,
  Search,
  Timer,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Get help with HikeWise. Find answers, tutorials, and support resources.",
};

const helpCategories = [
  {
    icon: Timer,
    title: "Focus Sessions",
    description: "Learn how to use focus modes effectively",
    href: "/faq",
  },
  {
    icon: Users,
    title: "Study Rooms",
    description: "Create and join virtual study spaces",
    href: "/faq",
  },
  {
    icon: BarChart3,
    title: "Progress & Stats",
    description: "Understand your study analytics",
    href: "/faq",
  },
  {
    icon: Settings,
    title: "Account Settings",
    description: "Manage your profile and preferences",
    href: "/faq",
  },
];

const popularArticles = [
  { title: "Getting started with HikeWise", href: "/faq" },
  { title: "How to use Focus Sessions", href: "/faq" },
  { title: "Creating your first Study Room", href: "/faq" },
  { title: "Understanding your study statistics", href: "/faq" },
  { title: "Meet Nora, your AI companion", href: "/faq" },
];

export default function HelpPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Help Center"
          subtitle="How can we help you today?"
        />

        {/* Search */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-12 py-6 rounded-full text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {helpCategories.map((category) => (
            <Link key={category.title} href={category.href}>
              <Card className="h-full bg-white border-none shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-6 h-6 text-forest" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="bg-white border-none shadow-soft">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-teal" />
                <h2 className="text-xl font-semibold">Popular Articles</h2>
              </div>
              <ul className="space-y-4">
                {popularArticles.map((article) => (
                  <li key={article.title}>
                    <Link
                      href={article.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-soft">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-teal" />
                <h2 className="text-xl font-semibold">Still need help?</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Can&apos;t find what you&apos;re looking for? Our support team
                is here to help.
              </p>
              <div className="space-y-4">
                <Link
                  href="/contact"
                  className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="font-medium">Contact Support</div>
                  <div className="text-sm text-muted-foreground">
                    Get help from our team
                  </div>
                </Link>
                <Link
                  href="/faq"
                  className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="font-medium">FAQ</div>
                  <div className="text-sm text-muted-foreground">
                    Browse frequently asked questions
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
