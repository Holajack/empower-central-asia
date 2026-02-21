import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "HikeWise completely changed how I study. The focus sessions keep me on track and the leaderboards make studying actually fun!",
    author: "Jamie Miller",
    role: "Pre-Med Student",
    initials: "JM",
  },
  {
    quote:
      "Nora is amazing! Having an AI that understands my study patterns and gives personalized tips has been a game-changer for my grades.",
    author: "Sarah Kim",
    role: "Engineering Major",
    initials: "SK",
  },
  {
    quote:
      "The study rooms feature is perfect for exam prep. My friends and I use it every day to keep each other accountable.",
    author: "Tyler Chen",
    role: "Law Student",
    initials: "TC",
  },
];

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Loved by students everywhere"
          subtitle="See what students are saying about HikeWise."
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="bg-white border-none shadow-soft"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl text-teal mb-3 sm:mb-4">&ldquo;</div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-medium text-sm sm:text-base">{testimonial.author}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
