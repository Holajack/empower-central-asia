"use client";

import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/shared/waitlist-modal";

interface PreReleaseSignupProps {
  variant?: "hero" | "cta";
  className?: string;
}

export function PreReleaseSignup({
  variant = "hero",
  className = "",
}: PreReleaseSignupProps) {
  return (
    <div
      className={`flex flex-col gap-3 ${
        variant === "cta" ? "items-center" : ""
      } ${className}`}
    >
      <WaitlistModal
        trigger={
          <Button
            className={`h-12 px-8 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold text-base ${
              variant === "hero" ? "w-full sm:w-auto" : "min-w-[200px]"
            }`}
          >
            Join the Waitlist ✨
          </Button>
        }
      />

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Smartphone className="w-3.5 h-3.5 shrink-0" />
        <span>Coming soon to iOS &amp; Android &mdash; no spam, ever</span>
      </div>
    </div>
  );
}
