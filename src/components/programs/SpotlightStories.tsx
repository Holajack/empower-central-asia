import { Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    quote: "BBB's mentorship program transformed my small tech startup into a thriving business serving our local community.",
    author: "Sarah Chen",
    role: "Founder, Tech Solutions Co.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    quote: "The financial literacy workshops gave me the confidence to expand my sustainable grocery store to three locations.",
    author: "Marcus Johnson",
    role: "Owner, Green Earth Markets",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
  },
];

const SpotlightStories = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-sage-50">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`space-y-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-semibold text-sage-500 mb-4">
              Spotlight Stories
            </h2>
            <p className="text-gray-600">
              Hear from entrepreneurs who have transformed their businesses through
              our programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="overflow-hidden border-sage-200 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sage-500">
                        {testimonial.author}
                      </h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Quote className="w-8 h-8 text-sage-300 flex-shrink-0" />
                    <p className="text-gray-600 italic">{testimonial.quote}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/success-stories">
              <Button
                variant="outline"
                className="border-sage-300 text-sage-600 hover:bg-sage-50"
              >
                Read More Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightStories;