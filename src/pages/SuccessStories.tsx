import { useInView } from "react-intersection-observer";
import HeroSection from "@/components/success-stories/HeroSection";
import TestimonialCarousel from "@/components/success-stories/TestimonialCarousel";
import CaseStudiesSection from "@/components/success-stories/CaseStudiesSection";
import CtaSection from "@/components/success-stories/CtaSection";

const SuccessStoriesHeroHeader = () => (
  <div 
    className="relative h-[60vh] flex items-center justify-center"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative z-10 container mx-auto px-4 text-center text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
        Success Stories
      </h1>
      <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
        Discover how Businesses Beyond Borders has helped entrepreneurs transform their dreams into reality.
      </p>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Nicole",
    business: "Thread & Thistle Apparel",
    quote: "Businesses Beyond Borders gave me the courage and support I needed to launch my own clothing line. Their resources and mentorship made my dream a reality.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    name: "Kyle",
    business: "Sparkle Squad Cleaning Services",
    quote: "Businesses Beyond Borders gave me the guidance and resources I needed to transform my cleaning side hustle into a professional business. Their mentorship helped me develop a solid business plan and secure my first commercial contracts.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    before: "Single market stall owner",
    after: "Multi-location sustainable business",
  },
  {
    name: "Carter",
    business: "Digital Bazaar Boutique",
    quote: "Businesses Beyond Borders provided the crucial support I needed to transform my online shop from a small side project into a thriving e-commerce platform. Their mentorship helped me develop a robust digital strategy and expand my customer base.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    name: "Stephanie",
    quote: "Businesses Beyond Borders helped me create a strong business plan for my guest house—turning my idea into a real, sustainable business.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
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
      <SuccessStoriesHeroHeader />
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
