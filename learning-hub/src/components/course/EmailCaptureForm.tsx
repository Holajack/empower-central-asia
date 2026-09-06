import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";
import { subscribe } from "@/lib/subscribe";

const EMAIL_KEY = "bbb-course-email";

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
}

export function getStoredEmail(): EmailData | null {
  try {
    const saved = localStorage.getItem(EMAIL_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

export default function EmailCaptureForm({ onComplete }: { onComplete?: () => void }) {
  const { isCentralAsia } = useRegion();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !email.trim()) {
      setError(isCentralAsia ? "Пожалуйста, введите имя и электронную почту." : "Please enter your first name and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(isCentralAsia ? "Пожалуйста, введите корректный адрес электронной почты." : "Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const data: EmailData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    };

    try {
      localStorage.setItem(EMAIL_KEY, JSON.stringify(data));

      // Fire and forget to Google Sheet
      await subscribe({
        ...data,
        language: isCentralAsia ? "ru" : "en",
        source: "course-signup",
      });

      trackConversion("course_signup", { method: "email_capture", form_type: "course-signup" });
      setIsSubmitted(true);
      onComplete?.();
    } catch {
      setError(isCentralAsia ? "Что-то пошло не так. Попробуйте ещё раз." : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-300 bg-green-50/30">
        <CardContent className="py-6 text-center">
          <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="font-bold text-green-800">{isCentralAsia ? "Вы зарегистрированы!" : "You're in!"}</p>
          <p className="text-sm text-green-700 mt-1">{isCentralAsia ? `Добро пожаловать, ${firstName}. Прокрутите вниз, чтобы начать Неделю 1.` : `Welcome, ${firstName}. Scroll down to start Week 1.`}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#C9922A]/30 bg-gradient-to-br from-white to-[#C9922A]/5">
      <CardContent className="py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-[#C9922A]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-[#C9922A]" />
          </div>
          <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">
            {isCentralAsia ? "Начните свой финансовый путь" : "Start Your Financial Journey"}
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            {isCentralAsia
              ? "Введите своё имя и электронную почту, чтобы открыть курс. Мы будем присылать вам полезные советы — никакого спама."
              : "Enter your name and email to unlock the course. We'll send you encouragement and tips along the way -- no spam, ever."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="ec-first" className="text-xs font-medium text-gray-600 mb-1 block">
                  {isCentralAsia ? "Имя *" : "First Name *"}
                </label>
                <Input
                  id="ec-first"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={isCentralAsia ? "Айгуль" : "Jane"}
                  required
                />
              </div>
              <div>
                <label htmlFor="ec-last" className="text-xs font-medium text-gray-600 mb-1 block">
                  {isCentralAsia ? "Фамилия" : "Last Name"}
                </label>
                <Input
                  id="ec-last"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={isCentralAsia ? "Асанова" : "Doe"}
                />
              </div>
            </div>
            <div>
              <label htmlFor="ec-email" className="text-xs font-medium text-gray-600 mb-1 block">
                {isCentralAsia ? "Эл. почта *" : "Email *"}
              </label>
              <Input
                id="ec-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isCentralAsia ? "aigul@example.com" : "jane@example.com"}
                required
              />
            </div>

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold"
              size="lg"
            >
              {isSubmitting ? (isCentralAsia ? "Сохранение..." : "Saving...") : (isCentralAsia ? "Открыть курс" : "Unlock the Course")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <p className="text-xs text-gray-400 text-center mt-2">
              {isCentralAsia ? "Полностью бесплатно. Без банковской карты. Отписка в любое время." : "100% free. No credit card required. Unsubscribe anytime."}
            </p>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
