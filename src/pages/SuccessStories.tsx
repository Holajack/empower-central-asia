import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Heart, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Chen",
    business: "Tech Solutions Co.",
    quote: "BBB's mentorship program transformed my small tech startup into a thriving business serving our local community.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    before: "Solo freelancer with limited reach",
    after: "15 employees and growing tech firm",
  },
  {
    name: "Marcus Johnson",
    business: "Green Earth Markets",
    quote: "The financial literacy workshops gave me the confidence to expand my sustainable grocery store to three locations.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    before: "Single market stall owner",
    after: "Multi-location sustainable business",
  },
  {
    name: "Maria Rodriguez",
    business: "Digital Learning Hub",
    quote: "Thanks to BBB's startup incubator, I've been able to bring digital education to underserved communities.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    before: "Teaching from home",
    after: "Educational platform reaching thousands",
  },
];

const caseStudies = [
  {
    title: "From Market Stall to Market Leader",
    description: "How Sarah transformed her local produce stand into a sustainable business empire.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    impact: "Created 50+ jobs in the community",
  },
  {
    title: "Tech Innovation in Rural Areas",
    description: "Marcus brought affordable internet solutions to underserved communities.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    impact: "Connected 1000+ households",
  },
];

const partnerLogos = [
  "Local Chamber of Commerce",
  "City Economic Development",
  "Small Business Association",
  "Tech Innovators Network",
];

const SuccessStories = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [caseStudiesRef, caseStudiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`pt-24 pb-12 px-4 md:px-6 lg:px-8 transition-opacity duration-1000 ${
          heroInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Businesses Beyond Borders has helped entrepreneurs transform
            their dreams into reality.
          </p>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section
        ref={testimonialsRef}
        className={`py-12 px-4 md:px-6 lg:px-8 bg-secondary/50 transition-opacity duration-1000 ${
          testimonialsInView ? "opacity-100" : "opacity-0"
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
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-background rounded-lg">
                          <h4 className="font-semibold mb-2">Before</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.before}
                          </p>
                        </div>
                        <div className="p-4 bg-background rounded-lg">
                          <h4 className="font-semibold mb-2">After</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.after}
                          </p>
                        </div>
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

      {/* Case Studies */}
      <section
        ref={caseStudiesRef}
        className={`py-12 px-4 md:px-6 lg:px-8 transition-opacity duration-1000 ${
          caseStudiesInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{study.title}</CardTitle>
                  <CardDescription>{study.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="font-semibold">Impact:</p>
                    <p className="text-muted-foreground">{study.impact}</p>
                  </div>
                  <Button className="mt-4 w-full">Read Full Story</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-secondary/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {partnerLogos.map((partner, index) => (
              <div
                key={index}
                className="p-4 bg-background rounded-lg shadow-sm flex items-center justify-center h-24"
              >
                <p className="font-semibold text-center">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className={`py-16 px-4 md:px-6 lg:px-8 bg-sage-50 transition-opacity duration-1000 ${
          ctaInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-sand-500">Be Part of Our Next Success Story</h2>
          <p className="text-lg text-sage-500 mb-8">
            Your involvement can help create more inspiring entrepreneurial journeys across Central Asia.
            Join us in empowering the next generation of business leaders.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-2">
                <div className="flex justify-center">
                  <Heart className="w-12 h-12 text-terracotta-400" />
                </div>
                <CardTitle className="text-xl">Support Our Mission</CardTitle>
                <CardDescription>
                  Help create more success stories through your generous donation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/get-involved">
                  <Button 
                    size="lg"
                    className="w-full bg-terracotta-400 hover:bg-terracotta-500"
                  >
                    Donate Today
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-2">
                <div className="flex justify-center">
                  <Users className="w-12 h-12 text-sage-500" />
                </div>
                <CardTitle className="text-xl">Share Your Expertise</CardTitle>
                <CardDescription>
                  Become a mentor and help shape the future of entrepreneurship
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/get-involved?type=mentor">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full border-sage-300 text-sage-600 hover:bg-sage-50"
                  >
                    Become a Mentor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
