
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRegion } from "@/contexts/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { trackConversion } from "@/lib/analytics";

// Google Apps Script web app URL - handles writing to Google Sheet
// To set up: see NEWSLETTER_SETUP.md in project root
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

interface NewsletterSignupProps {
  className?: string;
}

const NewsletterSignup = ({ className = "" }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isCentralAsia } = useRegion();
  const { t } = useTranslation();

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
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          whatsapp: whatsapp.trim(),
          region: isCentralAsia ? "central-asia" : "us",
          submittedAt: new Date().toISOString(),
        }),
      });

      // no-cors mode always returns opaque response, so we assume success
      trackConversion("newsletter_signup", { method: "footer", form_type: "newsletter" });
      toast({
        title: isCentralAsia ? "Подписка оформлена!" : "Successfully Subscribed!",
        description: isCentralAsia
          ? "Спасибо! Вы будете получать новости о нашей работе в Центральной Азии."
          : "Thank you for joining our newsletter. You'll receive updates about our work in Central Asia.",
      });
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setWhatsapp("");
    } catch {
      toast({
        title: isCentralAsia ? "Ошибка подписки" : "Subscription Failed",
        description: isCentralAsia
          ? "Пожалуйста, попробуйте позже."
          : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">
          {t("footer.newsletter")}
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          {t("footer.newsletterDesc")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t("common.firstName")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder={t("common.lastName")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder={t("common.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            {isCentralAsia ? (
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="tel"
                  placeholder={t("common.whatsapp")}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="pl-10"
                />
              </div>
            ) : (
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="tel"
                  placeholder={isCentralAsia ? "Телефон (необязательно)" : "Phone (optional)"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
          </div>
          <div className="flex">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white px-6"
            >
              {isSubmitting ? t("common.subscribing") : t("common.subscribe")}
            </Button>
          </div>
          </div>
        <p className="text-xs text-gray-500">
          {t("footer.privacyNote")}
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;
