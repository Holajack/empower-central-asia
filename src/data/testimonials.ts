
export interface Testimonial {
  name: string;
  business?: string;
  quote: string;
  image: string;
  before?: string;
  after?: string;
}

// Only update images for Carter and Stephanie as per chat history.
export const testimonials: Testimonial[] = [
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
    image: "/lovable-uploads/YOUR_CARTER_IMAGE_FILENAME.png", // REPLACE with actual filename
  },
  {
    name: "Stephanie",
    quote: "Businesses Beyond Borders helped me create a strong business plan for my guest house—which will help me build my business step-by-step.",
    image: "/lovable-uploads/YOUR_STEPHANIE_IMAGE_FILENAME.png", // REPLACE with actual filename
  },
];
