"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface PremiumPhoneMockupProps {
  imageSrc: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showReflection?: boolean;
  animate?: boolean;
}

export function PremiumPhoneMockup({
  imageSrc,
  alt,
  className,
  size = "lg",
  showReflection = true,
  animate = true,
}: PremiumPhoneMockupProps) {
  const sizeClasses = {
    sm: "w-[200px]",
    md: "w-[280px]",
    lg: "w-[320px]",
  };

  return (
    <div
      className={cn(
        "relative",
        sizeClasses[size],
        animate && "animate-float",
        className
      )}
    >
      {/* Glow effect behind phone */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-gradient-to-br from-primary/50 via-accent/30 to-primary/20 rounded-[60px] scale-90" />

      {/* iPhone Frame */}
      <div className="iphone-frame relative">
        {/* Side buttons - Volume */}
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-[32px] bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-sm" />
        <div className="absolute -left-[3px] top-[145px] w-[3px] h-[32px] bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-sm" />
        {/* Side button - Power */}
        <div className="absolute -right-[3px] top-[120px] w-[3px] h-[48px] bg-gradient-to-l from-zinc-700 to-zinc-800 rounded-r-sm" />
        {/* Silent switch */}
        <div className="absolute -left-[3px] top-[60px] w-[3px] h-[20px] bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-sm" />

        {/* Inner frame bezel */}
        <div className="absolute inset-0 rounded-[54px] border border-zinc-700/30" />

        {/* Screen area */}
        <div className="iphone-screen relative overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20 shadow-inner">
            {/* Camera lens */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-900 border border-zinc-800">
              <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
              <div className="absolute top-[3px] left-[3px] w-1 h-1 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Screen content */}
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover object-top"
            priority
          />

          {/* Screen reflection overlay */}
          {showReflection && (
            <div className="absolute inset-0 z-10 pointer-events-none screen-reflection" />
          )}

          {/* Screen edge glow */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-[40px] shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]" />
        </div>
      </div>
    </div>
  );
}

// Floating animation keyframes are in globals.css
