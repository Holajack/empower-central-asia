import { StoreButtons } from "@/components/shared/store-buttons";

export function CTASection() {
  return (
    <section id="download" className="py-14 sm:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Ready to transform your study habits?
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          Join thousands of students who are already studying smarter with
          HikeWise. Download free today.
        </p>
        <StoreButtons />
      </div>
    </section>
  );
}
