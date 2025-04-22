
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card className="mx-auto w-full max-w-sm md:max-w-xs p-4 rounded-md shadow transition-transform hover:scale-105 hover:shadow-md duration-200 bg-card/90">
    <CardHeader className="p-3 pb-1">
      <CardTitle className="text-lg sm:text-base font-semibold">{testimonial.name}</CardTitle>
      {testimonial.business && (
        <CardDescription className="text-xs sm:text-xs">{testimonial.business}</CardDescription>
      )}
    </CardHeader>
    <CardContent className="p-3 pt-0">
      <div className="flex gap-2 items-start">
        <Quote className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
        <p className="text-sm">{testimonial.quote}</p>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialCard;
