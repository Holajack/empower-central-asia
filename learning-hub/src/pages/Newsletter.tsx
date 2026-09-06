
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Phone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";
import { subscribe } from "@/lib/subscribe";
import { useFormSettings } from "@/hooks/useFormSettings";
import {
  useNewsletterPage,
  getNewsletterCopy,
} from "@/hooks/useNewsletterPage";
import { siteConfig } from "@/lib/seo";


const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { isCentralAsia } = useRegion();
  const { forms } = useFormSettings();
  const { data: page } = useNewsletterPage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: getNewsletterCopy(page, "errorInvalidEmailTitle", isCentralAsia),
        description: getNewsletterCopy(page, "errorInvalidEmailBody", isCentralAsia),
        variant: "destructive",
      });
      return;
    }

    if (!firstName.trim()) {
      toast({
        title: getNewsletterCopy(page, "errorMissingNameTitle", isCentralAsia),
        description: getNewsletterCopy(page, "errorMissingNameBody", isCentralAsia),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await subscribe({
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        language: isCentralAsia ? "ru" : "en",
        phone: phone.trim(),
        source: "newsletter-page",
      });

      trackConversion("newsletter_signup", { method: "standalone_page", form_type: "newsletter" });
      setIsSuccess(true);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
    } catch (error) {
      toast({
        title: getNewsletterCopy(page, "errorGenericTitle", isCentralAsia),
        description: getNewsletterCopy(page, "errorGenericBody", isCentralAsia),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form field labels come from formSettings.newsletterFieldLabels (canonical
  // location for all form field text — Agent V wired this up). The newsletterPage
  // singleton (Agent U's work) handles page-level copy: hero, benefits, bottom CTA.
  const firstNameLabel = forms.getFieldLabel("newsletter", "firstName", isCentralAsia);
  const firstNamePlaceholder = forms.getFieldPlaceholder("newsletter", "firstName", isCentralAsia);
  const lastNameLabel = forms.getFieldLabel("newsletter", "lastName", isCentralAsia);
  const lastNamePlaceholder = forms.getFieldPlaceholder("newsletter", "lastName", isCentralAsia);
  const emailLabel = forms.getFieldLabel("newsletter", "email", isCentralAsia);
  const phoneLabel = forms.getFieldLabel("newsletter", "phone", isCentralAsia);
  const phonePlaceholder = forms.getFieldPlaceholder("newsletter", "phone", isCentralAsia);
  const submittingLabel = getNewsletterCopy(page, "submittingLabel", isCentralAsia);
  const confirmationHeading = getNewsletterCopy(page, "confirmationHeading", isCentralAsia);
  const primaryLabel = getNewsletterCopy(page, "primaryLabel", isCentralAsia);
  const bottomCtaSubheading = getNewsletterCopy(page, "bottomCtaSubheading", isCentralAsia);

  // Confirmation body falls back to the centrally-managed Form Copy success
  // message when the Newsletter Page singleton leaves it blank.
  const cmsConfirmationBody = getNewsletterCopy(page, "confirmationBody", isCentralAsia);
  const confirmationBody =
    cmsConfirmationBody || forms.newsletter.getSuccessMessage(isCentralAsia);

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? `Подписаться на новости | ${siteConfig.name}`
            : `Subscribe to Our Newsletter | ${siteConfig.name}`}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Получайте вдохновляющие новости о развитии предпринимательства в Центральной Азии. Истории успеха, обновления программ и возможности для участия."
              : "Get inspiring updates about entrepreneurship development in Central Asia. Stories, program updates, and ways to make a difference."
          }
        />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? `Подписаться на новости | ${siteConfig.name}`
              : "Subscribe to Our Newsletter"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Получайте вдохновляющие новости о развитии предпринимательства в Центральной Азии. Истории успеха, обновления программ и возможности для участия."
              : "Get inspiring updates about entrepreneurship development in Central Asia. Stories, program updates, and ways to make a difference."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteConfig.url}/newsletter`} />
        <meta property="og:site_name" content={`${siteConfig.name}`} />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#C9922A]/5 to-white px-4 py-12">
        {/* Logo */}
        <Link to="/" className="mb-8">
          <img
            src="/images/logo.png"
            alt={`${siteConfig.name} logo`}
            width={64}
            height={64}
            loading="lazy"
            className="h-16 w-auto"
          />
        </Link>

        {isSuccess ? (
          /* Success State */
          <div className="w-full max-w-md text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {confirmationHeading}
              </h1>
              <p className="text-gray-600 mb-6">
                {confirmationBody}
              </p>
              <Link
                to={page.primaryUrl}
                className="text-[#C9922A] hover:text-[#C9922A]/80 font-medium"
              >
                {primaryLabel}
              </Link>
            </div>
          </div>
        ) : (
          /* Signup Form */
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {forms.newsletter.getHeading(isCentralAsia)}
                </h1>
                <p className="text-gray-600">
                  {forms.newsletter.getSubheading(isCentralAsia)}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {firstNameLabel}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={firstNamePlaceholder}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10 h-12 text-base"
                      required
                      autoComplete="given-name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {lastNameLabel}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder={lastNamePlaceholder}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-10 h-12 text-base"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {emailLabel}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-base"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12 text-base"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base bg-[#C9922A] hover:bg-[#C9922A]/90 text-white rounded-lg"
                >
                  {isSubmitting
                    ? submittingLabel
                    : forms.newsletter.getButtonLabel(isCentralAsia)}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  {bottomCtaSubheading}
                </p>
              </form>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              <Link to="/" className="text-[#C9922A] hover:text-[#C9922A]/80">
                {siteConfig.host}
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Newsletter;
