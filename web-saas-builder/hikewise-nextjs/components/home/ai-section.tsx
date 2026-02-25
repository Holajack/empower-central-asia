import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "Personalized study recommendations",
  "Smart reminders and motivation",
  "Answer questions and explain concepts",
  "Adaptive learning support",
];

export function AISection() {
  return (
    <section id="nora" className="py-20 bg-forest text-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Nora, your AI study companion
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Nora is more than just an assistant. She&apos;s your personal
              study coach, available 24/7 to help you stay on track and reach
              your goals.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-forest" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="secondary"
              className="rounded-full px-8 py-6 text-lg"
            >
              <Link href="#download">Try Nora Free</Link>
            </Button>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/nora-ai.png"
              alt="Nora AI Assistant"
              width={500}
              height={500}
              className="max-w-md w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
