import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import { useRegion } from "@/contexts/RegionContext";

const CallToAction = () => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {isCentralAsia ? "Начните свой путь" : "Two Ways In"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {isCentralAsia
                ? "Бесплатное обучение, поддержка наставников и сообщество людей, которые строят что-то настоящее."
                : "Whether you want to start building something yourself or help someone else get their chance -- there's a place for you here."}
            </p>
          </div>

          {/* Paths */}
          <div className={`grid ${isRegionCentralAsia ? "md:grid-cols-1 max-w-2xl mx-auto" : "md:grid-cols-2"} gap-8 mb-12`}>
            {/* For Participants */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
                {isCentralAsia ? "ДЛЯ УЧАСТНИКОВ" : "FOR PARTICIPANTS"}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {isCentralAsia
                  ? "Я хочу учиться и строить."
                  : "I want to learn and build."}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {isCentralAsia
                  ? "Начните с бесплатного курса финансовой грамотности. Без заявки, без оплаты. Если вы его завершите и захотите идти дальше -- следующий этап ждёт вас."
                  : "Start with the free financial literacy course. No application, no fee, no catch. If you complete it and want to go further, the next stage is waiting for you. Every step of the way, someone who has been where you are walks alongside you."}
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9922A] mt-0.5">--</span>
                  {isCentralAsia
                    ? "Курс финансовой грамотности: бесплатно, онлайн, начните в любое время"
                    : "Financial literacy course: free, online, start anytime"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9922A] mt-0.5">--</span>
                  {isCentralAsia
                    ? "Обучение созданию бизнеса для тех, кто завершил курс"
                    : "Business creation training for those who complete the course"}
                </li>
                {!isRegionCentralAsia && (
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9922A] mt-0.5">--</span>
                    {isCentralAsia
                      ? "Стартовый капитал для выпускников с жизнеспособным бизнес-планом"
                      : "Startup capital for graduates who build a viable plan"}
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-[#C9922A] mt-0.5">--</span>
                  {isCentralAsia
                    ? "Развитие лидерства в сообществе для выпускников"
                    : "Community leadership development for graduates"}
                </li>
              </ul>
              <Link to="/course/financial-literacy">
                <Button
                  size="lg"
                  className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold py-4"
                >
                  {isCentralAsia ? "Начать бесплатный курс" : "Start the Free Course"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* For Donors / Partners - Hidden for Central Asia */}
            {!isRegionCentralAsia && (
              <div className="bg-[#1B2A4A] rounded-xl p-8 text-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
                  {isCentralAsia ? "ДЛЯ ДОНОРОВ И ПАРТНЁРОВ" : "FOR DONORS & PARTNERS"}
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {isCentralAsia ? "Я хочу дать кому-то шанс." : "I want to give someone their chance."}
                </h3>
                <p className="text-white/85 leading-relaxed mb-6">
                  {isCentralAsia
                    ? "Ваши вложения идут не организации -- они идут конкретному человеку, который уже проделал тяжёлую работу, чтобы быть готовым. Каждый доллар финансирует обучение, наставничество или стартовый капитал. Вы будете знать, куда он ушёл и что создал."
                    : "Your investment doesn't go to an organization -- it goes to a specific person who has already done the hard work to be ready for it. Every dollar funds training, mentorship, or startup capital. You'll know exactly where it went and what it built."}
                </p>
                <ul className="space-y-2 text-sm text-white/80 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9922A] mt-0.5">--</span>
                    {isCentralAsia ? "$150 покрывает месяц работы программы" : "$150 covers one month of program operations"}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9922A] mt-0.5">--</span>
                    {isCentralAsia ? "$400 обучает местного фасилитатора, который научит 20+ человек" : "$400 trains a local facilitator who teaches 20+ people"}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9922A] mt-0.5">--</span>
                    {isCentralAsia ? "$2 000–$5 000 запускает настоящий бизнес для того, кто это заслужил" : "$2,000-$5,000 launches a real business for someone who earned it"}
                  </li>
                </ul>
                <div className="space-y-3">
                  <DonateButton
                    size="lg"
                    className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold py-4"
                  >
                    {isCentralAsia ? "Пожертвовать" : "Donate Now"}
                  </DonateButton>
                  <Link to="/partner-application" className="block">
                    <Button
                      size="lg"
                      className="w-full bg-transparent border border-white/40 text-white hover:bg-white/10 hover:border-white/60 font-medium py-4"
                    >
                      {isCentralAsia ? "Узнать о партнёрстве" : "Explore Partnership"}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="text-center text-gray-500 text-sm">
            {isCentralAsia ? (
              <p>
                Вопросы? Напишите в{" "}
                <a href="https://wa.me/13865171527" target="_blank" rel="noopener noreferrer" className="text-[#1B2A4A] font-medium hover:underline">
                  WhatsApp
                </a>{" "}
                или на{" "}
                <a href="mailto:donations@businessesbeyondborders.com" className="text-[#1B2A4A] font-medium hover:underline">
                  donations@businessesbeyondborders.com
                </a>
              </p>
            ) : (
              <p>
                Questions? Call{" "}
                <a href="tel:+13865171527" className="text-[#1B2A4A] font-medium hover:underline">
                  (386) 517-1527
                </a>{" "}
                or email{" "}
                <a href="mailto:donations@businessesbeyondborders.com" className="text-[#1B2A4A] font-medium hover:underline">
                  donations@businessesbeyondborders.com
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
