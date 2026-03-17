/**
 * GA4 Conversion Tracking for Businesses Beyond Borders
 * Fires custom events for key conversion actions.
 *
 * Events tracked:
 * - newsletter_signup: Footer/popup newsletter form submissions
 * - donate_click: Donate button opened
 * - volunteer_apply: Volunteer application submitted
 * - partner_apply: Partner application submitted
 * - contact_submit: Contact form submitted
 * - course_signup: Course email capture submitted
 * - resource_download: Lead magnet / resource gated download
 * - cohort_interest: Cohort interest form submitted
 * - sms_optin: SMS opt-in submitted
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type ConversionEvent =
  | "newsletter_signup"
  | "donate_click"
  | "volunteer_apply"
  | "partner_apply"
  | "contact_submit"
  | "course_signup"
  | "resource_download"
  | "cohort_interest"
  | "sms_optin";

interface EventParams {
  method?: string;
  form_type?: string;
  page_location?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackConversion(event: ConversionEvent, params?: EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, {
      ...params,
      page_location: params?.page_location || window.location.href,
    });
  }
}
