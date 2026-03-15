"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Rocket,
  Heart,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "info" | "student" | "supporter" | "success";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  isStudent: boolean | null;
  university: string;
  earlySupporter: "yes" | "maybe" | "no" | null;
}

const defaultForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  isStudent: null,
  university: "",
  earlySupporter: null,
};

const STEP_ORDER: Step[] = ["info", "student", "supporter", "success"];

// ─────────────────────────────────────────────
// WaitlistModalContent — the actual modal panel
// Controlled externally via isOpen / onClose
// ─────────────────────────────────────────────
interface WaitlistModalContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModalContent({
  isOpen,
  onClose,
}: WaitlistModalContentProps) {
  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>(defaultForm);

  // Reset form each time modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("info");
      setForm(defaultForm);
      setError("");
    }
  }, [isOpen]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key closes (except on success)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "success") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, step]);

  const stepIndex = STEP_ORDER.indexOf(step);

  const goToStudent = () => {
    if (!form.firstName.trim()) { setError("Please enter your first name."); return; }
    if (!form.lastName.trim()) { setError("Please enter your last name."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStep("student");
  };

  const goToSupporter = () => {
    if (form.isStudent === null) { setError("Please select one of the options above."); return; }
    setError("");
    setStep("supporter");
  };

  const handleSubmit = async () => {
    if (!form.earlySupporter) { setError("Please select one of the options above."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pre-release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          isStudent: form.isStudent,
          university: form.university.trim(),
          earlySupporter: form.earlySupporter,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("success");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step !== "success" ? onClose : undefined}
      />

      {/* Card — slides up on mobile, centered + zooms on desktop */}
      <div className="relative bg-white w-full sm:max-w-md mx-auto rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-6 duration-300">

        {/* Close button */}
        {step !== "success" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* ── Progress bar ── */}
        {step !== "success" && (
          <div className="flex gap-2 mb-6 pr-8">
            {(["info", "student", "supporter"] as const).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i < stepIndex
                    ? "flex-1 bg-forest"
                    : i === stepIndex
                    ? "w-10 bg-forest"
                    : "w-4 bg-muted"
                }`}
              />
            ))}
          </div>
        )}

        {/* ─────────── STEP 1: Info ─────────── */}
        {step === "info" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Secure your spot 🎯
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Join the HikeWise waitlist and be first to know the moment we
              launch.
            </p>

            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  First name <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="Alex"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  className="rounded-xl h-11"
                  autoFocus
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Last name <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="Chen"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                  className="rounded-xl h-11"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Best email address <span className="text-red-400">*</span>
              </label>
              <Input
                type="email"
                placeholder="alex@university.edu"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && goToStudent()}
                className="rounded-xl h-11"
              />
            </div>

            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

            <Button
              onClick={goToStudent}
              className="w-full h-11 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold"
            >
              Continue{" "}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* ─────────── STEP 2: Student ─────────── */}
        {step === "student" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Tell us about you 🎓
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              This helps us send you the most relevant content and updates.
            </p>

            <div className="flex flex-col gap-3 mb-4">
              <button
                onClick={() => setForm((f) => ({ ...f, isStudent: true }))}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  form.isStudent === true
                    ? "border-forest bg-forest/5"
                    : "border-border hover:border-forest/40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    form.isStudent === true
                      ? "bg-forest text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    Yes, I&apos;m a student
                  </div>
                  <div className="text-xs text-muted-foreground">
                    University or college
                  </div>
                </div>
              </button>

              <button
                onClick={() =>
                  setForm((f) => ({ ...f, isStudent: false, university: "" }))
                }
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  form.isStudent === false
                    ? "border-forest bg-forest/5"
                    : "border-border hover:border-forest/40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    form.isStudent === false
                      ? "bg-forest text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    No, I&apos;m a professional / other
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Working or self-studying
                  </div>
                </div>
              </button>
            </div>

            {form.isStudent === true && (
              <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Which school?{" "}
                  <span className="text-muted-foreground/60">(optional)</span>
                </label>
                <Input
                  placeholder="e.g. University of Michigan"
                  value={form.university}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, university: e.target.value }))
                  }
                  className="rounded-xl h-11"
                />
              </div>
            )}

            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => { setError(""); setStep("info"); }}
                className="h-11 rounded-xl text-muted-foreground px-4"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button
                onClick={goToSupporter}
                className="flex-1 h-11 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold"
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* ─────────── STEP 3: Early Supporter ─────────── */}
        {step === "supporter" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Help us launch sooner 🚀
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              For every 100 early supporters who invest{" "}
              <strong className="text-foreground">$30 before launch</strong>,
              we ship 3 months earlier — and your $30 locks in as the
              lifetime student price.
            </p>

            <div className="flex flex-col gap-3 mb-5">
              {/* Yes */}
              <button
                onClick={() => setForm((f) => ({ ...f, earlySupporter: "yes" }))}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  form.earlySupporter === "yes"
                    ? "border-teal bg-teal/5"
                    : "border-border hover:border-teal/40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    form.earlySupporter === "yes"
                      ? "bg-teal text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    Yes — count me in! 🙌
                  </div>
                  <div className="text-xs text-muted-foreground">
                    I want to help expedite the launch
                  </div>
                </div>
              </button>

              {/* Maybe */}
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, earlySupporter: "maybe" }))
                }
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  form.earlySupporter === "maybe"
                    ? "border-forest bg-forest/5"
                    : "border-border hover:border-forest/40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    form.earlySupporter === "maybe"
                      ? "bg-forest text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    Maybe — I want to hear more first
                  </div>
                  <div className="text-xs text-muted-foreground">
                    I&apos;m excited but want more details
                  </div>
                </div>
              </button>

              {/* Free only */}
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, earlySupporter: "no" }))
                }
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  form.earlySupporter === "no"
                    ? "border-muted-foreground/40 bg-muted/30"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    form.earlySupporter === "no"
                      ? "bg-muted text-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    Just the free version for me
                  </div>
                  <div className="text-xs text-muted-foreground">
                    I&apos;ll wait for the free launch
                  </div>
                </div>
              </button>
            </div>

            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => { setError(""); setStep("student"); }}
                className="h-11 rounded-xl text-muted-foreground px-4"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 h-11 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold"
              >
                {loading ? "Joining..." : "Join Waitlist ✨"}
              </Button>
            </div>
          </div>
        )}

        {/* ─────────── STEP 4: Success ─────────── */}
        {step === "success" && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-teal" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              You&apos;re officially on the list! 🎉
            </h2>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Check your inbox — we just sent you a welcome message. Every
              month we&apos;ll share a behind-the-scenes update on our
              journey to launch.
            </p>
            <p className="text-xs text-muted-foreground italic mb-6">
              &ldquo;Study smarter, not harder&rdquo; — HikeWise is coming for
              you.
            </p>
            <Button
              onClick={onClose}
              className="w-full h-11 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// WaitlistModal — self-contained with trigger
// ─────────────────────────────────────────────
interface WaitlistModalProps {
  trigger: React.ReactNode;
}

export function WaitlistModal({ trigger }: WaitlistModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer inline-flex"
      >
        {trigger}
      </div>
      <WaitlistModalContent
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
