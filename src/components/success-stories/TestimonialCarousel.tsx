
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  name: string;
  business: string;
  quote: string;
  image: string;
  before?: string;
  after?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  inView: boolean;
}

const TestimonialCarousel = ({ testimonials, inView }: TestimonialCarouselProps) => {
  return (
    <section
      className={`py-12 px-4 md:px-6 lg:px-8 bg-secondary/50 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Testimonial Highlights
        </h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
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
                        <CardDescription>{testimonial.business}</CardDescription>
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
