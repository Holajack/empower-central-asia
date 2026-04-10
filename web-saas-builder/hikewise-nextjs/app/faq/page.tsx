import { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about HikeWise, our study tracking app with focus sessions, AI companion Nora, virtual study rooms, and more.",
  alternates: {
    canonical: "https://hikewise.app/faq",
  },
};
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
        "HikeWise is a comprehensive study companion app designed to help students focus better, track their progress, and achieve their academic goals. It combines focus timers, study rooms, leaderboards, and an AI study companion named Nora — all built around evidence-based study techniques like active recall, spaced repetition, and the Pomodoro technique.",
    },
    {
      question: "Who is HikeWise designed for?",
      answer:
        "HikeWise is perfect for students of all ages, from high school to graduate school. Whether you're preparing for exams, working on projects, or just want to build better study habits, HikeWise can help. It's especially useful for students looking for a smart study planner that adapts to how they learn.",
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
        "Focus Sessions are timed study intervals based on proven productivity techniques. Choose from Balanced (25/5 minutes), Sprint (15/3 minutes), or Deep Work (50/10 minutes) modes to match your study style. Each mode is designed for different study contexts — from quick flashcard review to deep comprehension work.",
    },
    {
      question: "How do Study Rooms work?",
      answer:
        "Study Rooms are virtual co-working spaces where you can study alongside friends or other students. You can see who's currently studying, chat with room members, and stay motivated together. Create a room and share the invite link to get started.",
    },
    {
      question: "Who is Nora?",
      answer:
        "Nora is your AI study companion built into HikeWise. She can answer questions, explain concepts, provide personalized study recommendations, and send smart reminders to keep you on track. Nora learns your study patterns over time to give increasingly relevant suggestions.",
    },
  ],
  "study-science": [
    {
      question: "What study techniques does HikeWise support?",
      answer:
        "HikeWise is built around evidence-based study methods including active recall, spaced repetition, the Pomodoro technique, deep work sessions, and time blocking. These techniques are validated by decades of cognitive science research and are integrated directly into the app's focus sessions, tracking, and AI recommendations.",
    },
    {
      question: "Is HikeWise backed by research?",
      answer:
        "Yes. HikeWise was founded by Dr. Nikolai Lee, whose dual background in clinical science (Doctor of Chiropractic, Licensed Paramedic) and education (3,000+ students taught) informs every feature. All blog content cites peer-reviewed research from cognitive psychology, neuroscience, and education science — covering topics from the Feynman technique to spaced repetition to metacognition.",
    },
    {
      question: "How does the Pomodoro technique work in HikeWise?",
      answer:
        "HikeWise offers three Pomodoro-inspired focus modes: Balanced (25 min focus / 5 min break) for general studying, Sprint (15/3) for quick review sessions, and Deep Work (50/10) for complex problem-solving or writing. Each mode automatically tracks your sessions and builds your study streak.",
    },
  ],
  "privacy": [
    {
      question: "Is my study data private?",
      answer:
        "Yes. Your study data is stored securely and never sold to third parties. HikeWise is designed as a personal study tool — your data belongs to you and is used only to improve your study experience within the app.",
    },
    {
      question: "Can my school see my study data?",
      answer:
        "No. HikeWise is a personal app. Your institution, professors, or school administrators have no access to your study data, sessions, or analytics. What you study and how you study stays between you and the app.",
    },
    {
      question: "What data does Nora AI collect?",
      answer:
        "Nora only analyzes your study patterns within the app — session lengths, frequencies, subjects studied, and streak data — to provide personalized recommendations. No external data is collected, and your conversations with Nora are not shared with anyone.",
    },
  ],
  "getting-started": [
    {
      question: "How do I get the most out of HikeWise?",
      answer:
        "Start with Focus Sessions to build a daily study habit — even 25 minutes a day makes a difference. Then try Study Rooms to study alongside friends for accountability. Over time, let Nora learn your patterns so she can give you smarter recommendations about when and how to study.",
    },
    {
      question: "Can I invite friends to HikeWise?",
      answer:
        "Yes! Create a Study Room and share the invite link with friends. You can study together in real-time, see who's active, and keep each other motivated with leaderboard rankings.",
    },
    {
      question: "What's the difference between free and premium?",
      answer:
        "The free tier includes Focus Sessions (all three modes), basic progress tracking, study rooms, and leaderboards. Premium unlocks advanced analytics with detailed study habit insights, unlimited Nora AI conversations, streak freeze protection, and priority access to new features.",
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
        "Basic features like Focus Sessions work offline — you can study anywhere, even without an internet connection. However, features like Study Rooms, Leaderboards, and Nora AI require connectivity to sync and communicate.",
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
            {Object.keys(faqCategories).map((category) => {
              const labels: Record<string, string> = {
                general: "General",
                features: "Features",
                "study-science": "Study Science",
                "privacy": "Privacy & Data",
                "getting-started": "Getting Started",
                account: "Account",
                technical: "Technical",
              };
              return (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {labels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              );
            })}
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
