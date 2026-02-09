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
    <section className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Loved by students everywhere"
          subtitle="See what students are saying about HikeWise."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="bg-white border-none shadow-soft"
            >
              <CardContent className="p-6">
                <div className="text-4xl text-teal mb-4">&ldquo;</div>
                <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-semibold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
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
