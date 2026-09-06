import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { SignIn } from "@clerk/react";
import { useRegion } from "@/contexts/RegionContext";
import { clerkEnabled } from "@/lib/auth";
import { langPath } from "@/lib/locale";
import { siteConfig } from "@/lib/seo";

export default function SignInPage() {
  const { isCentralAsia, language } = useRegion();
  const [params] = useSearchParams();
  const redirect = params.get("redirect_url") || langPath("/dashboard", language);

  return (
    <>
      <Helmet>
        <title>{isCentralAsia ? `Войти | ${siteConfig.name}` : `Sign in | ${siteConfig.name}`}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 flex flex-col items-center px-4">
        <h1 className="text-2xl font-bold text-[#1B2A4A] mb-6">{isCentralAsia ? "С возвращением" : "Welcome back"}</h1>
        {clerkEnabled ? (
          <SignIn routing="hash" signUpUrl={langPath("/sign-up", language)} fallbackRedirectUrl={redirect} />
        ) : (
          <p className="text-gray-600 max-w-md text-center">
            {isCentralAsia
              ? "Вход ещё не настроен (нужен VITE_CLERK_PUBLISHABLE_KEY). Все курсы пока открыты без регистрации."
              : "Sign-in is not configured yet (set VITE_CLERK_PUBLISHABLE_KEY). All courses are currently open without an account."}{" "}
            <Link to="/programs" className="text-[#C9922A] underline">
              {isCentralAsia ? "К курсам" : "Browse courses"}
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
