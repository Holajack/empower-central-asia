import { useInView } from "react-intersection-observer";
import HeroSection from "@/components/success-stories/HeroSection";
import TestimonialCarousel from "@/components/success-stories/TestimonialCarousel";
import CaseStudiesSection from "@/components/success-stories/CaseStudiesSection";
import CtaSection from "@/components/success-stories/CtaSection";

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
      <div ref={heroRef}>
        <HeroSection inView={heroInView} />
      </div>

      <div ref={testimonialsRef}>
        <TestimonialCarousel 
          testimonials={testimonials}
          inView={testimonialsInView}
        />
      </div>

      <div ref={caseStudiesRef}>
        <CaseStudiesSection 
          caseStudies={caseStudies}
          inView={caseStudiesInView}
        />
      </div>

      <div ref={ctaRef}>
        <CtaSection inView={ctaInView} />
      </div>
    </div>
  );
};

export default SuccessStories;