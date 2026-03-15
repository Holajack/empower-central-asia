import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PremiumPhoneMockup } from "@/components/shared/premium-phone-mockup";

const features = [
  "Personalized study recommendations",
  "Smart reminders and motivation",
  "Answer questions and explain concepts",
  "Adaptive learning support",
];

export function AISection() {
  return (
    <section id="nora" className="py-14 sm:py-20 bg-forest text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Meet Nora, your AI study companion
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8">
              Nora is more than just an assistant. She&apos;s your personal
              study coach, available 24/7 to help you stay on track and reach
              your goals.
            </p>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 inline-block text-left">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-forest" />
                  </div>
                  <span className="text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
            <div>
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
              >
                <Link href="#download">Try Nora Free</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center order-1 lg:order-2">
            <PremiumPhoneMockup
              imageSrc="/images/nora-ai-assistant.png"
              alt="Nora AI Study Companion - Your personal AI study coach"
              size="sm"
              className="sm:!w-[280px]"
              animate={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
