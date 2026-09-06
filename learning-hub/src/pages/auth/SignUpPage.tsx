import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { SignUp } from "@clerk/react";
import { CheckCircle2 } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { clerkEnabled } from "@/lib/auth";
import { langPath } from "@/lib/locale";
import { siteConfig } from "@/lib/seo";

export default function SignUpPage() {
  const { isCentralAsia, language } = useRegion();
  const [params] = useSearchParams();
  const redirect = params.get("redirect_url");
  // After sign-up we always run onboarding (language, country, goals) and then
  // continue to the page the learner originally wanted.
  const welcome = langPath("/welcome", language) + (redirect ? `?next=${encodeURIComponent(redirect)}` : "");

  const perks = isCentralAsia
    ? ["3 бесплатных курса: финансы, бизнес, лидерство", "Уроки на русском и английском", "Прогресс и рабочие листы сохраняются", "Сообщество и живые когорты"]
    : ["3 free courses: money, business, leadership", "Lessons in English and Russian", "Progress and worksheets saved to your account", "Community chat and live cohorts"];

  return (
    <>
      <Helmet>
        <title>{isCentralAsia ? `Создать аккаунт | ${siteConfig.name}` : `Create your free account | ${siteConfig.name}`}</title>
        <meta name="description" content={isCentralAsia ? "Бесплатная регистрация: курсы финансовой грамотности, бизнеса и лидерства на русском языке." : "Create a free account to start the financial literacy, business creation, and leadership courses."} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-10 items-start">
          <div className="pt-4">
            <h1 className="text-3xl font-bold text-[#1B2A4A] mb-3">{isCentralAsia ? "Начните учиться бесплатно" : "Start learning for free"}</h1>
            <p className="text-gray-600 mb-6">
              {isCentralAsia
                ? "Один аккаунт открывает все курсы. Мы спросим ваш язык, чтобы присылать материалы на нём."
                : "One account unlocks every course. We'll ask your preferred language so everything we send you is in it."}
            </p>
            <ul className="space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            {clerkEnabled ? (
              <SignUp routing="hash" signInUrl={langPath("/sign-in", language)} fallbackRedirectUrl={welcome} forceRedirectUrl={welcome} />
            ) : (
              <p className="text-gray-600 max-w-md text-center">
                {isCentralAsia ? "Регистрация ещё не настроена. Курсы открыты для всех." : "Sign-up is not configured yet. Courses are open to everyone."}{" "}
                <Link to="/programs" className="text-[#C9922A] underline">
                  {isCentralAsia ? "К курсам" : "Browse courses"}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
