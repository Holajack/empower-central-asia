
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card className="mx-auto w-full max-w-xl min-h-[170px] p-6 rounded-lg shadow transition-transform hover:scale-[1.025] hover:shadow-lg duration-200 bg-card/90 flex flex-col justify-between">
    <CardHeader className="p-0 pb-2">
      <CardTitle className="text-xl font-semibold">{testimonial.name}</CardTitle>
      {testimonial.business && (
        <CardDescription className="text-sm">{testimonial.business}</CardDescription>
      )}
    </CardHeader>
    <CardContent className="p-0 pt-0">
      <div className="flex gap-3 items-start">
        <Quote className="w-6 h-6 text-muted-foreground shrink-0 mt-1" />
        <p className="text-base leading-snug">{testimonial.quote}</p>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialCard;
