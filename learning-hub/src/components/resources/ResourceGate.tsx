import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegion } from "@/contexts/RegionContext";
import { useAuthUser } from "@/lib/auth";
import { subscribe } from "@/lib/subscribe";
import { trackConversion } from "@/lib/analytics";

const EMAIL_KEY = "hub-resource-email";

interface StoredEmail {
  firstName: string;
  lastName: string;
  email: string;
}

function getStoredEmail(): StoredEmail | null {
  try {
    const saved = localStorage.getItem(EMAIL_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* ignore */
  }
  return null;
}

interface ResourceGateProps {
  resourceTitle: string;
  children: React.ReactNode;
}

/**
 * Gate for downloadable toolkits.
 *  - Clerk mode: signed-in learners see the resource (and the download is
 *    logged to the email backend once); signed-out visitors get a blurred
 *    preview + sign-up prompt.
 *  - Open mode (no Clerk): classic name + email capture.
 */
export default function ResourceGate({ resourceTitle, children }: ResourceGateProps) {
  const { isCentralAsia, language } = useRegion();
  const { mode, isLoaded, isSignedIn, user } = useAuthUser();
  const location = useLocation();
  const [unlocked, setUnlocked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "open" && getStoredEmail()) setUnlocked(true);
  }, [mode]);

  // Log the download for signed-in learners (once per resource per session).
  useEffect(() => {
    if (mode !== "clerk" || !isSignedIn || !user) return;
    const key = `hub-resource-logged:${resourceTitle}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    subscribe({ email: user.email, firstName: user.firstName, lastName: user.lastName, language: user.profile.language ?? language, source: "resource-download", resource: resourceTitle, clerkUserId: user.id });
    trackConversion("resource_download", { method: "signed_in", resource: resourceTitle });
  }, [mode, isSignedIn, user, resourceTitle, language]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!firstName.trim() || !email.trim()) {
      setError(isCentralAsia ? "Введите имя и email." : "Please enter your first name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(isCentralAsia ? "Введите корректный email." : "Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    const data: StoredEmail = { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() };
    try {
      localStorage.setItem(EMAIL_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
    await subscribe({ ...data, language, source: "resource-download", resource: resourceTitle });
    trackConversion("resource_download", { method: "resource_gate", resource: resourceTitle });
    setUnlocked(true);
    setIsSubmitting(false);
  }

  if (mode === "clerk" ? isSignedIn : unlocked) return <>{children}</>;
  if (mode === "clerk" && !isLoaded) return <div className="min-h-[300px]" aria-busy="true" />;

  const returnTo = encodeURIComponent(location.pathname);

  return (
    <div className="relative">
      <div className="max-h-[300px] overflow-hidden relative">
        <div className="blur-sm opacity-50 pointer-events-none select-none" aria-hidden="true">
          {children}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
      </div>

      <div className="bg-white border-2 border-[#C9922A]/30 rounded-xl p-6 md:p-8 -mt-12 relative z-10 mx-auto max-w-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="bg-[#C9922A]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-[#C9922A]" />
          </div>
          <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">{isCentralAsia ? "Разблокируйте бесплатный ресурс" : "Unlock This Free Resource"}</h3>
          <p className="text-sm text-gray-600">
            {mode === "clerk"
              ? isCentralAsia
                ? "Создайте бесплатный аккаунт — и все материалы, курсы и сообщество будут доступны сразу."
                : "Create a free account and every toolkit, course, and the community unlocks instantly."
              : isCentralAsia
                ? "Введите ваше имя и email, чтобы получить мгновенный доступ."
                : "Enter your name and email for instant access. No spam, ever."}
          </p>
        </div>

        {mode === "clerk" ? (
          <div className="space-y-3">
            <Link to={`/sign-up?redirect_url=${returnTo}`}>
              <Button className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold" size="lg">
                {isCentralAsia ? "Зарегистрироваться бесплатно" : "Sign up free"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to={`/sign-in?redirect_url=${returnTo}`}>
              <Button variant="outline" className="w-full border-[#1B2A4A]/30 text-[#1B2A4A]" size="lg">
                {isCentralAsia ? "У меня уже есть аккаунт" : "I already have an account"}
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="rg-first" className="text-xs font-medium text-gray-600 mb-1 block">{isCentralAsia ? "Имя *" : "First Name *"}</label>
                <Input id="rg-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={isCentralAsia ? "Аида" : "Jane"} required />
              </div>
              <div>
                <label htmlFor="rg-last" className="text-xs font-medium text-gray-600 mb-1 block">{isCentralAsia ? "Фамилия" : "Last Name"}</label>
                <Input id="rg-last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={isCentralAsia ? "Камалова" : "Doe"} />
              </div>
            </div>
            <div>
              <label htmlFor="rg-email" className="text-xs font-medium text-gray-600 mb-1 block">Email *</label>
              <Input id="rg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isCentralAsia ? "aida@example.com" : "jane@example.com"} required />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold" size="lg">
              {isSubmitting ? (isCentralAsia ? "Загрузка..." : "Unlocking...") : isCentralAsia ? "Получить доступ" : "Get Instant Access"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2">
              <Mail className="w-3 h-3" />
              <span>{isCentralAsia ? "100% бесплатно. Отписаться можно в любое время." : "100% free. Unsubscribe anytime."}</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
