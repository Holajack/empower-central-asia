"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Track page views - internal component
function AnalyticsImpl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Track page view
      const url = pathname + (searchParams?.toString() || "");
      trackPageView(url);

      // Track scroll depth
      let maxScroll = 0;
      const handleScroll = () => {
        const scrollPercentage =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        const rounded = Math.floor(scrollPercentage / 25) * 25; // Track in 25% increments

        if (rounded > maxScroll) {
          maxScroll = rounded;
          trackEvent("scroll_depth", {
            depth: rounded,
            page: pathname,
          });
        }
      };

      // Track time on page
      const startTime = Date.now();
      const handleBeforeUnload = () => {
        const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
        trackEvent("time_on_page", {
          duration: timeOnPage,
          page: pathname,
        });
      };

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [pathname, searchParams]);

  return null;
}

// Export with Suspense wrapper
export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsImpl />
    </Suspense>
  );
}

// Track custom events
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== "undefined") {
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag("event", eventName, eventData);
    }

    // Vercel Analytics
    if ((window as any).va) {
      (window as any).va("track", eventName, eventData);
    }

    // Custom analytics endpoint (optional)
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventName,
          data: eventData,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Silently fail
      });
    }
  }
}

// Track page views
function trackPageView(url: string) {
  if (typeof window !== "undefined") {
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }

    // Vercel Analytics
    if ((window as any).va) {
      (window as any).va("pageview", { path: url });
    }
  }
}

// Track CTA clicks
export function trackCTA(ctaName: string, location: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location,
  });
}

// Track social shares
export function trackShare(platform: string, url: string) {
  trackEvent("share", {
    platform,
    url,
  });
}

// Track newsletter signups
export function trackNewsletterSignup(source: string) {
  trackEvent("newsletter_signup", {
    source,
  });
}

// Track download clicks
export function trackDownload(platform: string) {
  trackEvent("download_click", {
    platform,
  });
}
