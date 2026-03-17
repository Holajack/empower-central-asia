import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, MessageCircle, Bell } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";

const SmsOptIn = () => {
  const { isCentralAsia } = useRegion();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
    if (!phoneRegex.test(phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      toast({
        title: isCentralAsia ? "Неверный номер телефона" : "Invalid Phone Number",
        description: isCentralAsia
          ? "Пожалуйста, введите корректный номер телефона."
          : "Please enter a valid phone number.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      trackConversion("sms_optin", { method: "sms_page", form_type: "sms-optin" });
      toast({
        title: isCentralAsia ? "Успешно!" : "Success!",
        description: isCentralAsia
          ? "Вы добавлены в наш список SMS. Проверьте телефон — вам отправлено подтверждение."
          : "You've been added to our SMS list. Check your phone for a confirmation message.",
      });

      setPhoneNumber("");
    } catch (error) {
      toast({
        title: isCentralAsia ? "Ошибка" : "Error",
        description: isCentralAsia
          ? "Что-то пошло не так. Пожалуйста, попробуйте позже."
          : "Something went wrong. Please try again later.",
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
          ? "SMS-уведомления | Businesses Beyond Borders"
          : "SMS Updates | Businesses Beyond Borders"}
      </title>
      <meta
        name="description"
        content={
          isCentralAsia
            ? "Подпишитесь на SMS-уведомления от Businesses Beyond Borders. Получайте обновления для доноров, истории успеха и напоминания о мероприятиях."
            : "Sign up for SMS updates from Businesses Beyond Borders. Get donor updates, impact stories, and event reminders."
        }
      />
      <link rel="canonical" href="https://businessesbeyondborders.com/sms" />
    </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-[#C9922A]/5 to-[#1B2A4A]/5 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isCentralAsia
              ? "Оставайтесь на связи через SMS"
              : "Stay Connected with SMS Updates"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isCentralAsia
              ? "Получайте своевременные обновления для доноров, вдохновляющие истории успеха, напоминания о мероприятиях и возможности для волонтёрства прямо на телефон."
              : "Get timely donor updates, inspiring impact stories, event reminders, and volunteer opportunities delivered straight to your phone."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-[#C9922A]" />
                {isCentralAsia ? "Что вы будете получать" : "What You'll Receive"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-[#C9922A] mt-1" />
                <div>
                  <h3 className="font-semibold">
                    {isCentralAsia ? "Обновления для доноров" : "Donor Updates"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isCentralAsia
                      ? "Узнайте, как ваши пожертвования меняют жизни людей"
                      : "Stay informed about how your contributions are making a difference"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-[#C9922A] mt-1" />
                <div>
                  <h3 className="font-semibold">
                    {isCentralAsia ? "Истории успеха" : "Impact Stories"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isCentralAsia
                      ? "Вдохновляющие истории предпринимателей, которым мы помогли добиться успеха"
                      : "Inspiring stories from entrepreneurs we've helped succeed"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-[#C9922A] mt-1" />
                <div>
                  <h3 className="font-semibold">
                    {isCentralAsia ? "Напоминания о мероприятиях" : "Event Reminders"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isCentralAsia
                      ? "Не пропускайте важные мероприятия, семинары и благотворительные акции"
                      : "Never miss important events, workshops, or fundraising activities"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-[#C9922A] mt-1" />
                <div>
                  <h3 className="font-semibold">
                    {isCentralAsia ? "Возможности для волонтёрства" : "Volunteer Opportunities"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isCentralAsia
                      ? "Первыми узнавайте о новых способах участия"
                      : "Be the first to know about new ways to get involved"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-[#C9922A]" />
                {isCentralAsia
                  ? "Подписаться на SMS-уведомления"
                  : "Subscribe to SMS Updates"}
              </CardTitle>
              <CardDescription>
                {isCentralAsia
                  ? "Частота сообщений: 1–4 в месяц"
                  : "Message frequency: 1-4 messages per month"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="phone">
                    {isCentralAsia ? "Номер мобильного телефона" : "Mobile Phone Number"}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(386) 517-1527"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    {isCentralAsia
                      ? "Введя свой номер мобильного телефона и нажав «Подписаться», вы соглашаетесь получать повторяющиеся автоматические и неавтоматические сообщения от Businesses Beyond Borders об обновлениях для доноров, историях успеха, напоминаниях о мероприятиях и возможностях для волонтёрства."
                      : "By entering your mobile number and tapping 'Subscribe,' you agree to receive recurring automated and non-automated texts from Businesses Beyond Borders about donor updates, impact stories, event reminders, and volunteer opportunities."}
                  </p>
                  <p className="mb-2">
                    {isCentralAsia
                      ? "Возможна оплата сообщений и передачи данных. Частота сообщений варьируется. Согласие не является условием пожертвования или покупки. Ответьте STOP для отмены, HELP для помощи."
                      : "Msg & data rates may apply. Msg frequency varies. Consent is not a condition of donation or purchase. Reply STOP to cancel, HELP for help."}
                  </p>
                  <p>
                    {isCentralAsia
                      ? "Политика конфиденциальности и мобильные условия: "
                      : "Privacy Policy and Mobile Terms: "}
                    <a href="/privacy" className="text-[#C9922A] hover:underline">
                      https://businessesbeyondborders.com/privacy
                    </a>{" "}
                    •{" "}
                    <a href="/mobile-terms" className="text-[#C9922A] hover:underline">
                      https://businessesbeyondborders.com/mobile-terms
                    </a>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? isCentralAsia ? "Подписка..." : "Subscribing..."
                    : isCentralAsia ? "Подписаться" : "Subscribe"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">
                {isCentralAsia
                  ? "Альтернативный способ: отправьте SMS"
                  : "Alternative: Text to Join"}
              </h3>
              <p className="text-gray-600">
                {isCentralAsia ? "Отправьте " : "Text "}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">JOIN</span>
                {isCentralAsia ? " на номер " : " to "}
                <span className="font-semibold">(386) 517-1527</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {isCentralAsia
                  ? "Вы получите подтверждение перед добавлением в наш список."
                  : "You'll receive a confirmation message before being added to our list."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default SmsOptIn;
