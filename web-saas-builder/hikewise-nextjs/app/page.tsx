import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { FeatureShowcase } from "@/components/home/feature-showcase";
import { HowItWorks } from "@/components/home/how-it-works";
import { AISection } from "@/components/home/ai-section";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";
import {
  OrganizationSchema,
  WebsiteSchema,
  SoftwareApplicationSchema,
} from "@/components/seo/json-ld";

export default function Home() {
  return (
    <>
      <OrganizationSchema
        name="HikeWise"
        url="https://hikewise.app"
        logo="https://hikewise.app/images/app-icon.png"
        sameAs={[
          "https://twitter.com/hikewise",
          "https://instagram.com/hikewise",
          "https://linkedin.com/company/hikewise",
        ]}
      />
      <WebsiteSchema name="HikeWise" url="https://hikewise.app" />
      <SoftwareApplicationSchema />

      <HeroSection />
      <FeaturesSection />
      <FeatureShowcase />
      <HowItWorks />
      <AISection />
      <Testimonials />
      <CTASection />
    </>
  );
}
