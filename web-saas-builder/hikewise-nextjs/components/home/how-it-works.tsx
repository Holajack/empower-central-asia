import { SectionHeader } from "@/components/shared/section-header";

const steps = [
  {
    number: "1",
    title: "Create Account",
    description: "Sign up in seconds and personalize your study preferences.",
  },
  {
    number: "2",
    title: "Set Your Goals",
    description: "Define what you want to achieve and set daily study targets.",
  },
  {
    number: "3",
    title: "Start a Session",
    description:
      "Choose your focus mode and begin your distraction-free study time.",
  },
  {
    number: "4",
    title: "Track & Improve",
    description: "Review your progress and watch your productivity soar.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Start studying in minutes"
          subtitle="Getting started with HikeWise is simple. Here's how it works."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">
                {step.number}
              </div>
              <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
