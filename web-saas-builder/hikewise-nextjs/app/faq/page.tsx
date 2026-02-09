"use client";

import { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQSchema } from "@/components/seo/json-ld";

const faqCategories = {
  general: [
    {
      question: "What is HikeWise?",
      answer:
        "HikeWise is a comprehensive study app designed to help students focus better, track their progress, and achieve their academic goals. It combines focus timers, study rooms, leaderboards, and an AI study companion named Nora.",
    },
    {
      question: "Who is HikeWise designed for?",
      answer:
        "HikeWise is perfect for students of all ages, from high school to graduate school. Whether you're preparing for exams, working on projects, or just want to build better study habits, HikeWise can help.",
    },
    {
      question: "Is HikeWise free to use?",
      answer:
        "Yes! HikeWise offers a generous free tier with access to focus sessions, basic progress tracking, and study rooms. Premium features like advanced analytics and unlimited AI assistance are available with a subscription.",
    },
  ],
  features: [
    {
      question: "What are Focus Sessions?",
      answer:
        "Focus Sessions are timed study intervals based on proven productivity techniques. Choose from Balanced (25/5 minutes), Sprint (15/3 minutes), or Deep Work (50/10 minutes) modes to match your study style.",
    },
    {
      question: "How do Study Rooms work?",
      answer:
        "Study Rooms are virtual co-working spaces where you can study alongside friends or other students. You can see who's currently studying, chat with room members, and stay motivated together.",
    },
    {
      question: "Who is Nora?",
      answer:
        "Nora is your AI study companion built into HikeWise. She can answer questions, explain concepts, provide personalized study recommendations, and send smart reminders to keep you on track.",
    },
  ],
  account: [
    {
      question: "How do I create an account?",
      answer:
        "Download HikeWise from the App Store or Google Play, then sign up with your email or continue with Google/Apple. You'll be studying in under a minute!",
    },
    {
      question: "Can I use HikeWise on multiple devices?",
      answer:
        "Yes! Your HikeWise account syncs across all your devices. Start a session on your phone and check your progress on your tablet.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "You can delete your account in the app under Settings > Account > Delete Account. All your data will be permanently removed within 30 days.",
    },
  ],
  technical: [
    {
      question: "Which devices are supported?",
      answer:
        "HikeWise is available on iOS (iPhone and iPad) and Android devices. We recommend using the latest version of your operating system for the best experience.",
    },
    {
      question: "Does HikeWise work offline?",
      answer:
        "Basic features like Focus Sessions work offline. However, features like Study Rooms, Leaderboards, and Nora AI require an internet connection.",
    },
    {
      question: "How do I report a bug?",
      answer:
        "You can report bugs through the app (Settings > Help > Report a Bug) or by emailing support@hikewise.app. Please include as much detail as possible.",
    },
  ],
};

const allFAQs = Object.values(faqCategories).flat();

export default function FAQPage() {
  return (
    <div className="pt-28 pb-20">
      <FAQSchema
        questions={allFAQs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <div className="container mx-auto px-6">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about HikeWise."
        />

        <Tabs defaultValue="general" className="max-w-3xl mx-auto">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-8">
            {Object.keys(faqCategories).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-full px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(faqCategories).map(([category, faqs]) => (
            <TabsContent key={category} value={category}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-lg px-6 border-none shadow-soft"
                  >
                    <AccordionTrigger className="text-left font-semibold py-6 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
