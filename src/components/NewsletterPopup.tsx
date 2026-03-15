
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowLeft, ArrowRight, Mail, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRegion } from "@/contexts/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { trackConversion } from "@/lib/analytics";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

const INTEREST_OPTIONS = [
  { id: "donate", labelEn: "I want to donate / support financially", labelRu: "Хочу пожертвовать / поддержать финансово" },
  { id: "volunteer", labelEn: "I want to volunteer my skills", labelRu: "Хочу стать волонтёром" },
  { id: "learn", labelEn: "I want to learn (take a course)", labelRu: "Хочу учиться (пройти курс)" },
  { id: "partner", labelEn: "I want to partner with BBB", labelRu: "Хочу стать партнёром BBB" },
  { id: "explore", labelEn: "I'm just exploring", labelRu: "Просто изучаю" },
];

const NewsletterPopup = () => {
  const { isCentralAsia } = useRegion();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Skip during prerendering to avoid dialog markup in static HTML
    if ((window as any).__PRERENDERING) return;

    const checkAndShowPopup = () => {
      const hasSeenPopup = localStorage.getItem("newsletter-popup-seen");
      const dontShowAgain = localStorage.getItem("newsletter-popup-dismissed");

      if (dontShowAgain === "true") {
        return;
      }

      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setHasMounted(true);
          setIsOpen(true);
          localStorage.setItem("newsletter-popup-seen", "true");
        }, 5000);

        return () => clearTimeout(timer);
      }
    };

    checkAndShowPopup();
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem("newsletter-popup-dismissed", "true");
    setIsOpen(false);
  };

  const toggleInterest = (id: string) => {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: isCentralAsia ? "Неверный email" : "Invalid Email",
        description: isCentralAsia
          ? "Пожалуйста, введите действительный адрес электронной почты."
          : "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!firstName.trim()) {
      toast({
        title: isCentralAsia ? "Имя обязательно" : "First Name Required",
        description: isCentralAsia
          ? "Пожалуйста, введите ваше имя."
          : "Please enter your first name.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "newsletter",
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          interests: interests.join(", "),
          city: city.trim(),
          state: state.trim(),
          region: isCentralAsia ? "central-asia" : "us",
          submittedAt: new Date().toISOString(),
        }),
      });

      localStorage.setItem("newsletter-popup-dismissed", "true");
      trackConversion("newsletter_signup", {
        method: "popup",
        form_type: "newsletter",
        interests: interests.join(", "),
      });
      toast({
        title: isCentralAsia ? "Добро пожаловать!" : "Welcome Aboard!",
        description: isCentralAsia
          ? "Спасибо, что присоединились к нашему движению. Ждите первое письмо!"
          : "Thank you for joining the movement. Watch your inbox for your first update!",
      });
      setIsOpen(false);
    } catch {
      toast({
        title: isCentralAsia ? "Ошибка" : "Something went wrong",
        description: isCentralAsia ? "Попробуйте позже." : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>
            {isCentralAsia ? t("popup.headline") : t("popup.headline")}
          </DialogTitle>
        </VisuallyHidden>

        {/* Gold-to-navy gradient accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#C9922A] via-[#D4A94B] to-[#1B2A4A]" />

        {step === 1 ? (
          /* Step 1: Interest Selection */
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {t("popup.headline")}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {t("popup.subtitle")}
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {INTEREST_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleInterest(option.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all ${
                    interests.includes(option.id)
                      ? "border-[#C9922A] bg-[#C9922A]/5 text-gray-900"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    interests.includes(option.id)
                      ? "border-[#C9922A] bg-[#C9922A]"
                      : "border-gray-300"
                  }`}>
                    {interests.includes(option.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {isCentralAsia ? option.labelRu : option.labelEn}
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white h-11"
            >
              {t("popup.continue")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-center mt-4">
              <button
                onClick={handleDontShowAgain}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {t("popup.dontShow")}
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Contact Info */
          <div className="p-6 sm:p-8">
            <div className="mb-5">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                {t("popup.step2Title")}
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9922A] mt-0.5">&#10003;</span>
                  {t("popup.benefit1")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9922A] mt-0.5">&#10003;</span>
                  {t("popup.benefit2")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9922A] mt-0.5">&#10003;</span>
                  {t("popup.benefit3")}
                </li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder={t("common.firstName")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10 h-10"
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={t("common.lastName")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-10"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder={t("common.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder={isCentralAsia ? "Город (необязательно)" : "City (optional)"}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="pl-10 h-10"
                    autoComplete="address-level2"
                  />
                </div>
                <div className="w-28">
                  <Input
                    type="text"
                    placeholder={isCentralAsia ? "Регион" : "State"}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="h-10"
                    autoComplete="address-level1"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white h-11"
              >
                {isSubmitting
                  ? (isCentralAsia ? "Отправка..." : "Joining...")
                  : t("popup.joinButton")}
              </Button>
            </form>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                {isCentralAsia ? "Назад" : "Back"}
              </button>
              <p className="text-xs text-gray-400">
                {t("footer.privacyNote")}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
