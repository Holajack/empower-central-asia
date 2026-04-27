/**
 * Renders the global Primary CTA (button + link) defined in Sanity Site Settings.
 *
 * Use this as the "default" CTA on hero sections or marketing sections that
 * don't define their own CTA. BBB staff can change the label, URL, and
 * Russian translation in Studio without touching code.
 *
 * Props let pages override the default styling/size while keeping the URL
 * and label centrally managed.
 */
import { Link } from "react-router-dom";
import { useRegion } from "@/contexts/RegionContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface PrimaryCTAProps {
  /** Override the global CTA label. If unset, uses Site Settings. */
  label?: string;
  /** Override the global CTA URL. If unset, uses Site Settings. */
  url?: string;
  /** Tailwind classes — defaults to standard BBB gold button. */
  className?: string;
  /** Optional: render a different element (e.g. anchor for external URLs). */
  variant?: "primary" | "secondary";
}

const PrimaryCTA = ({ label, url, className, variant = "primary" }: PrimaryCTAProps) => {
  const { isCentralAsia } = useRegion();
  const { settings } = useSiteSettings();

  const finalLabel = label ?? settings.getCtaLabel(isCentralAsia);
  const finalUrl = url ?? settings.primaryCTA?.url ?? "/get-involved";
  const openInNewTab = settings.primaryCTA?.openInNewTab ?? false;

  const baseStyle =
    variant === "primary"
      ? "bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
      : "border border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A]/5";

  const cls =
    className ??
    `${baseStyle} px-6 py-3 rounded-lg font-medium transition-colors text-center inline-block`;

  // External URLs use <a>; internal paths use react-router <Link> for SPA navigation.
  const isExternal = /^https?:\/\//.test(finalUrl);

  if (isExternal || openInNewTab) {
    return (
      <a
        href={finalUrl}
        className={cls}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {finalLabel}
      </a>
    );
  }

  return (
    <Link to={finalUrl} className={cls}>
      {finalLabel}
    </Link>
  );
};

export default PrimaryCTA;
