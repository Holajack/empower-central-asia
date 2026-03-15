import { PreReleaseSignup } from "@/components/shared/pre-release-signup";

export function CTASection() {
  return (
    <section id="waitlist" className="py-14 sm:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-4 sm:mb-5">
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
          Pre-Release Waitlist
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Be the first to experience HikeWise
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          We&apos;re putting the finishing touches on something great. Join the
          waitlist and get early access when we launch on iOS &amp; Android.
        </p>
        <div className="flex justify-center">
          <PreReleaseSignup variant="cta" />
        </div>
      </div>
    </section>
  );
}
