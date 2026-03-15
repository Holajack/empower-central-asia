
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Phone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { isCentralAsia } = useRegion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: isCentralAsia ? "Некорректный адрес" : "Invalid Email",
        description: isCentralAsia
          ? "Пожалуйста, введите действующий адрес электронной почты."
          : "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!firstName.trim()) {
      toast({
        title: isCentralAsia ? "Укажите имя" : "First Name Required",
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
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
        }),
      });

      trackConversion("newsletter_signup", { method: "standalone_page", form_type: "newsletter" });
      setIsSuccess(true);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
    } catch (error) {
      toast({
        title: isCentralAsia ? "Что-то пошло не так" : "Something went wrong",
        description: isCentralAsia
          ? "Попробуйте ещё раз."
          : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? "Подписаться на новости | Businesses Beyond Borders"
            : "Subscribe to Our Newsletter | Businesses Beyond Borders"}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Получайте вдохновляющие новости о развитии предпринимательства в Центральной Азии. Истории успеха, обновления программ и возможности для участия."
              : "Get inspiring updates about entrepreneurship development in Central Asia. Stories, program updates, and ways to make a difference."
          }
        />
        <link rel="canonical" href="https://businessesbeyondborders.com/newsletter" />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Подписаться на новости | Businesses Beyond Borders"
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
        <meta property="og:url" content="https://businessesbeyondborders.com/newsletter" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#C9922A]/5 to-white px-4 py-12">
        {/* Logo */}
        <Link to="/" className="mb-8">
          <img
            src="/images/bbb-logo.png"
            alt="Businesses Beyond Borders logo"
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
                {isCentralAsia ? "Вы подписались!" : "You're Subscribed!"}
              </h1>
              <p className="text-gray-600 mb-6">
                {isCentralAsia
                  ? "Спасибо, что присоединились к нашему сообществу. Вы будете получать новости о нашей работе по поддержке предпринимателей в Центральной Азии."
                  : "Thank you for joining our community. You'll receive updates about our work empowering entrepreneurs in Central Asia."}
              </p>
              <Link
                to="/"
                className="text-[#C9922A] hover:text-[#C9922A]/80 font-medium"
              >
                {isCentralAsia ? "Перейти на сайт" : "Visit our website"}
              </Link>
            </div>
          </div>
        ) : (
          /* Signup Form */
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {isCentralAsia ? "Оставайтесь на связи" : "Stay Connected"}
                </h1>
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Получайте вдохновляющие новости о нашей работе по развитию предпринимательства в Центральной Азии. Истории успеха, обновления программ и возможности для участия."
                    : "Get inspiring updates about our work empowering entrepreneurs in Central Asia. Success stories, program updates, and ways to make a difference."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isCentralAsia ? "Имя" : "First name"}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={isCentralAsia ? "Имя" : "First name"}
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
                    {isCentralAsia ? "Фамилия" : "Last name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder={isCentralAsia ? "Фамилия" : "Last name"}
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
                    {isCentralAsia ? "Электронная почта" : "Email"}{" "}
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
                    {isCentralAsia ? "Номер телефона" : "Phone number"}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={
                        isCentralAsia ? "+7 (700) 000-0000" : "(386) 555-0123"
                      }
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
                    ? isCentralAsia
                      ? "Подписываемся..."
                      : "Subscribing..."
                    : isCentralAsia
                    ? "Подписаться"
                    : "Subscribe"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  {isCentralAsia
                    ? "Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент."
                    : "We respect your privacy. Unsubscribe at any time."}
                </p>
              </form>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              <Link to="/" className="text-[#C9922A] hover:text-[#C9922A]/80">
                businessesbeyondborders.com
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Newsletter;
