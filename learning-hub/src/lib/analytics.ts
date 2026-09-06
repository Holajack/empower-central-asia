/**
 * GA4 conversion tracking. `gtag` is injected at build time from
 * VITE_GA_MEASUREMENT_ID (see vite.config.ts / index.html); when it is not
 * configured every call is a no-op.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type ConversionEvent =
  | "newsletter_signup"
  | "donate_click"
  | "contact_submit"
  | "course_signup"
  | "signup_complete"
  | "onboarding_complete"
  | "resource_download"
  | "cohort_interest"
  | "week_complete"
  | "sms_optin";

interface EventParams {
  method?: string;
  form_type?: string;
  page_location?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackConversion(event: ConversionEvent, params?: EventParams) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, { ...params, page_location: params?.page_location || window.location.href });
  }
  if (window.fbq && (event === "signup_complete" || event === "onboarding_complete" || event === "course_signup")) {
    window.fbq("track", "CompleteRegistration", { content_name: event });
  }
}
