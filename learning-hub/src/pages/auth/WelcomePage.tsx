/**
 * Onboarding step shown once after sign-up. Captures the learner's preferred
 * language, country, and goals into Clerk metadata and syncs the contact to
 * the email backend, then continues to the dashboard (or the page they came
 * from).
 */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Globe, MapPin, Target, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegion } from "@/contexts/RegionContext";
import { useAuthUser, type LearningGoal } from "@/lib/auth";
import { subscribe } from "@/lib/subscribe";
import { langPath, stripLangPrefix } from "@/lib/locale";
import { siteConfig, type SupportedLanguage } from "@/lib/seo";
import { trackConversion } from "@/lib/analytics";

const COUNTRIES: { code: string; en: string; ru: string }[] = [
  { code: "KG", en: "Kyrgyzstan", ru: "Кыргызстан" },
  { code: "KZ", en: "Kazakhstan", ru: "Казахстан" },
  { code: "UZ", en: "Uzbekistan", ru: "Узбекистан" },
  { code: "TJ", en: "Tajikistan", ru: "Таджикистан" },
  { code: "TM", en: "Turkmenistan", ru: "Туркменистан" },
  { code: "RU", en: "Russia", ru: "Россия" },
  { code: "US", en: "United States", ru: "США" },
  { code: "OTHER", en: "Other", ru: "Другая страна" },
];

const GOALS: { id: LearningGoal; en: string; ru: string }[] = [
  { id: "financial-literacy", en: "Get control of my money (budget, debt, savings)", ru: "Навести порядок в финансах (бюджет, долги, сбережения)" },
  { id: "business-creation", en: "Start or grow a business", ru: "Открыть или развить бизнес" },
  { id: "leadership", en: "Lead a team, organization, or community", ru: "Вести за собой команду, организацию или сообщество" },
  { id: "community", en: "Find a community and a live cohort", ru: "Найти сообщество и живую группу" },
];

export default function WelcomePage() {
  const { isCentralAsia, language } = useRegion();
  const { isLoaded, isSignedIn, user, updateProfile, mode } = useAuthUser();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next");

  const [lang, setLang] = useState<SupportedLanguage>(language);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Already onboarded (or open mode) → skip straight through.
  useEffect(() => {
    if (mode === "open") {
      navigate("/dashboard", { replace: true });
      return;
    }
    if (isLoaded && !isSignedIn) navigate("/sign-up", { replace: true });
    if (isLoaded && user?.profile.onboarded) navigate(next ? stripLangPrefix(next) : "/dashboard", { replace: true });
  }, [isLoaded, isSignedIn, user?.profile.onboarded, mode, navigate, next]);

  function toggleGoal(id: LearningGoal) {
    setGoals((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError("");
    setSaving(true);
    try {
      await updateProfile({
        language: lang,
        country,
        city: city.trim(),
        whatsapp: whatsapp.trim(),
        goals,
        onboarded: true,
        onboardedAt: new Date().toISOString(),
        source: "learning-hub",
      });
      await subscribe({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        language: lang,
        country,
        city: city.trim(),
        whatsapp: whatsapp.trim(),
        goals,
        source: "signup",
        clerkUserId: user.id,
        consent: true,
      });
      trackConversion("onboarding_complete", { language: lang, country });
      // Continue in the language the learner chose.
      const destination = next ? stripLangPrefix(next) : "/dashboard";
      if (lang !== language) {
        window.location.assign(langPath(destination, lang));
      } else {
        navigate(destination, { replace: true });
      }
    } catch (err) {
      setError(isCentralAsia ? "Не удалось сохранить. Попробуйте ещё раз." : "Could not save your preferences. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (!isLoaded || !user) return <div className="min-h-screen" aria-busy="true" />;

  return (
    <>
      <Helmet>
        <title>{isCentralAsia ? `Добро пожаловать | ${siteConfig.name}` : `Welcome | ${siteConfig.name}`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-[#1B2A4A] mb-2">
            {isCentralAsia ? `Добро пожаловать, ${user.firstName || "друг"}!` : `Welcome, ${user.firstName || "friend"}!`}
          </h1>
          <p className="text-gray-600 mb-8">
            {isCentralAsia
              ? "Ответьте на три коротких вопроса, чтобы мы показывали материалы на вашем языке и подобрали подходящий курс."
              : "Three quick questions so we can show you lessons in your language and point you to the right course."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-bold text-[#1B2A4A] flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-[#C9922A]" />
                  {isCentralAsia ? "На каком языке вам удобнее учиться?" : "Which language do you prefer to learn in?"}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {(["en", "ru"] as SupportedLanguage[]).map((l) => (
                    <button
                      type="button"
                      key={l}
                      onClick={() => setLang(l)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${lang === l ? "border-[#C9922A] bg-[#C9922A]/5" : "border-gray-200 hover:border-[#C9922A]/50"}`}
                      lang={l}
                    >
                      <span className="block font-semibold text-[#1B2A4A]">{l === "en" ? "English" : "Русский"}</span>
                      <span className="block text-xs text-gray-500">{l === "en" ? "Lessons, emails, and community in English" : "Уроки, письма и сообщество на русском"}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="font-bold text-[#1B2A4A] flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-[#C9922A]" />
                  {isCentralAsia ? "Где вы находитесь?" : "Where are you based?"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    aria-label={isCentralAsia ? "Страна" : "Country"}
                  >
                    <option value="">{isCentralAsia ? "Выберите страну" : "Select a country"}</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {isCentralAsia ? c.ru : c.en}
                      </option>
                    ))}
                  </select>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder={isCentralAsia ? "Город (необязательно)" : "City (optional)"} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="font-bold text-[#1B2A4A] flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-[#C9922A]" />
                  {isCentralAsia ? "Что вы хотите получить? (можно несколько)" : "What do you want to get out of this? (pick any)"}
                </h2>
                <div className="space-y-2">
                  {GOALS.map((g) => (
                    <label key={g.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${goals.includes(g.id) ? "border-[#C9922A] bg-[#C9922A]/5" : "border-gray-200 hover:border-[#C9922A]/50"}`}>
                      <input type="checkbox" className="mt-1" checked={goals.includes(g.id)} onChange={() => toggleGoal(g.id)} />
                      <span className="text-sm text-gray-700">{isCentralAsia ? g.ru : g.en}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="font-bold text-[#1B2A4A] flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-[#C9922A]" />
                  {isCentralAsia ? "WhatsApp / Telegram (необязательно)" : "WhatsApp / Telegram (optional)"}
                </h2>
                <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+996 ..." type="tel" />
                <p className="text-xs text-gray-500 mt-2">
                  {isCentralAsia ? "Только для приглашений в живые когорты. Никакого спама." : "Only used for live-cohort invitations. Never spam."}
                </p>
              </CardContent>
            </Card>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" size="lg" disabled={saving} className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold">
              {saving ? (isCentralAsia ? "Сохранение..." : "Saving...") : isCentralAsia ? "Начать обучение" : "Start learning"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-xs text-gray-400 text-center">
              {isCentralAsia
                ? "Регистрируясь, вы соглашаетесь получать письма с материалами курса. Отписаться можно в любой момент."
                : "By continuing you agree to receive course emails. Unsubscribe any time."}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
