
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card className="mx-4">
    <CardHeader>
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <CardTitle>{testimonial.name}</CardTitle>
          {testimonial.business && (
            <CardDescription>{testimonial.business}</CardDescription>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex gap-4">
        <Quote className="w-8 h-8 text-muted-foreground" />
        <p className="text-lg">{testimonial.quote}</p>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialCard;
