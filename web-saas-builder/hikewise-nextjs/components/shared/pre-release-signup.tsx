"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Smartphone } from "lucide-react";

interface PreReleaseSignupProps {
  variant?: "hero" | "cta";
  className?: string;
}

export function PreReleaseSignup({
  variant = "hero",
  className = "",
}: PreReleaseSignupProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/pre-release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className={`flex flex-col ${variant === "cta" ? "items-center" : ""} gap-2 ${className}`}
      >
        <div className="flex items-center gap-2 text-teal font-semibold text-base">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>You&apos;re on the list! We&apos;ll notify you at launch.</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Coming soon to iOS &amp; Android
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-3 ${variant === "cta" ? "items-center" : ""} ${className}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-2 w-full ${variant === "cta" ? "max-w-sm" : "max-w-sm"}`}
      >
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="flex-1 rounded-xl h-11 text-sm"
        />
        <Button
          type="submit"
          disabled={loading}
          className="rounded-xl px-5 h-11 shrink-0 bg-forest hover:bg-forest/90 text-white font-semibold w-full sm:w-auto"
        >
          {loading ? "Joining..." : "Join Waitlist"}
        </Button>
      </form>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Smartphone className="w-3.5 h-3.5 shrink-0" />
        <span>Coming soon to iOS &amp; Android &mdash; no spam, ever</span>
      </div>
    </div>
  );
}
