import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";
import { trackConversion } from "@/lib/analytics";

interface DonateButtonProps {
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  children?: React.ReactNode;
}

/**
 * Links to the external giving page (Pure Charity / E3 Partners) configured
 * via VITE_DONATE_URL. Renders nothing when no URL is configured, and is
 * hidden for visitors located in Central Asia by the callers that check
 * `isRegionCentralAsia`.
 */
const DonateButton = ({ className = "", variant = "default", size = "default", showIcon = true, children }: DonateButtonProps) => {
  const { isCentralAsia } = useRegion();
  if (!siteConfig.donateUrl) return null;
  const label = children || (isCentralAsia ? "Поддержать" : "Give");
  return (
    <a
      href={siteConfig.donateUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion("donate_click", { method: "external_link" })}
    >
      <Button variant={variant} size={size} className={`bg-[#C9922A] hover:bg-[#C9922A]/90 text-white ${className}`}>
        {showIcon && <Heart className="mr-2 h-4 w-4" />}
        {label}
      </Button>
    </a>
  );
};

export default DonateButton;
