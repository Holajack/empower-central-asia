import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, ArrowRight, Star, Target, Phone } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";

interface CtaSectionProps {
  inView: boolean;
}

const CtaSection = ({ inView }: CtaSectionProps) => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();

  return (
    <section
      className={`py-20 px-4 md:px-6 lg:px-8 bg-gray-50 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Main CTA Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C9922A]/10 text-[#C9922A] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            {isCentralAsia ? "Присоединяйтесь к нашей миссии" : "Join Our Mission"}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            {isCentralAsia ? (
              <>
                Помогите написать следующую главу
                <span className="text-[#C9922A]"> глобального влияния</span>
              </>
            ) : (
              <>
                Help Write the Next Chapter of
                <span className="text-[#C9922A]"> Global Impact</span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {isCentralAsia
              ? "Каждая прочитанная вами история успеха началась с того, кто поверил в потенциал предпринимателя. "
              : "Every success story you've read started with someone believing in an entrepreneur's potential. "}
            <strong className="text-gray-800">
              {isCentralAsia
                ? "Ваше участие создаёт следующий прорыв."
                : "Your involvement creates the next breakthrough."}
            </strong>
          </p>

          {/* Impact Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-1">25+</div>
              <div className="text-sm text-gray-600">
                {isCentralAsia ? "Поддержано предпринимателей" : "Entrepreneurs Supported"}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-1">50+</div>
              <div className="text-sm text-gray-600">
                {isCentralAsia ? "Создано рабочих мест" : "Jobs Created"}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#C9922A] mb-1">$500K+</div>
              <div className="text-sm text-gray-600">
                {isCentralAsia ? "Сгенерировано выручки" : "Revenue Generated"}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-1">3</div>
              <div className="text-sm text-gray-600">
                {isCentralAsia ? "Страны охвата" : "Countries Served"}
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className={`mb-16 ${isCentralAsia ? "" : "grid md:grid-cols-2 gap-8"}`}>
          {/* Donation CTA - hidden for CA */}
          {!isRegionCentralAsia && (
            <Card className="relative p-8 bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/90 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="absolute top-4 right-4">
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  MOST NEEDED
                </div>
              </div>
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">Fund the Next Success Story</CardTitle>
                <CardDescription className="text-white/70 text-center text-lg">
                  <strong className="text-white">$50</strong> provides complete business training for one entrepreneur.
                  <strong className="text-white"> $200</strong> funds mentorship for an entire year.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-white/70 mb-2">Your donation creates:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Financial literacy training</li>
                    <li>• 1-on-1 mentorship matching</li>
                    <li>• Business plan development</li>
                    <li>• Ongoing support network</li>
                  </ul>
                </div>
                <Link to="/get-involved">
                  <Button
                    size="lg"
                    className="w-full bg-[#C9922A] text-white hover:bg-[#C9922A]/90 font-bold py-4 text-lg shadow-lg"
                  >
                    Donate Now - Create Impact Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Volunteer/Mentor CTA */}
          <Card className={`p-8 bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${isCentralAsia ? "max-w-2xl mx-auto" : ""}`}>
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <div className="bg-[#C9922A]/10 p-4 rounded-full">
                  <Users className="w-8 h-8 text-[#C9922A]" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-800">
                {isCentralAsia ? "Поделитесь своим опытом" : "Share Your Expertise"}
              </CardTitle>
              <CardDescription className="text-gray-600 text-center text-lg">
                <strong>
                  {isCentralAsia ? "2–4 часа в месяц" : "2-4 hours per month"}
                </strong>{" "}
                {isCentralAsia
                  ? "вашего делового опыта создают преобразующее наставничество для предпринимателей по всему миру."
                  : "of your business experience creates life-changing mentorship for entrepreneurs worldwide."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2 font-medium">
                  {isCentralAsia ? "Возможности для волонтёров:" : "Volunteer opportunities:"}
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {isCentralAsia ? "Дистанционное наставничество в бизнесе" : "Remote business mentoring"}</li>
                  <li>• {isCentralAsia ? "Поддержка в финансовом планировании" : "Financial planning support"}</li>
                  <li>• {isCentralAsia ? "Руководство по маркетинговой стратегии" : "Marketing strategy guidance"}</li>
                  <li>• {isCentralAsia ? "Обмен отраслевым опытом" : "Industry expertise sharing"}</li>
                </ul>
              </div>
              <Link to="/get-involved?type=volunteer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A]/5 font-bold py-4 text-lg"
                >
                  {isCentralAsia ? "Стать наставником" : "Become a Mentor"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Secondary CTAs */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Corporate Partnerships */}
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex justify-center">
                <Target className="w-6 h-6 text-[#1B2A4A]" />
              </div>
              <CardTitle className="text-lg text-center">
                {isCentralAsia ? "Корпоративное партнёрство" : "Corporate Partnership"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center mb-4">
                {isCentralAsia
                  ? "Вовлеките вашу команду в осмысленное глобальное воздействие через волонтёрство на основе навыков."
                  : "Engage your team in meaningful global impact through skills-based volunteering."}
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  {isCentralAsia ? "Изучить партнёрство" : "Explore Partnerships"}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex justify-center">
                <Star className="w-6 h-6 text-[#C9922A]" />
              </div>
              <CardTitle className="text-lg text-center">
                {isCentralAsia ? "Истории успеха" : "Success Stories"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center mb-4">
                {isCentralAsia
                  ? "Получайте ежемесячные обновления о прогрессе предпринимателей и историях влияния."
                  : "Get monthly updates on entrepreneur progress and impact stories."}
              </p>
              <Link to="/get-involved?type=newsletter">
                <Button variant="outline" size="sm" className="w-full">
                  {isCentralAsia ? "Подписаться на обновления" : "Subscribe to Updates"}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex justify-center">
                <Phone className="w-6 h-6 text-[#1B2A4A]" />
              </div>
              <CardTitle className="text-lg text-center">
                {isCentralAsia ? "Свяжитесь с нами" : "Talk to Our Team"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center mb-4">
                {isCentralAsia
                  ? "Есть вопросы об участии? Напишите нам напрямую."
                  : "Questions about getting involved? Speak directly with our team."}
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  {isCentralAsia ? "WhatsApp: +1 (386) 517-1527" : "Call (386) 517-1527"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof and Urgency */}
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
          <p className="text-lg text-gray-700 mb-6">
            <strong className="text-[#1B2A4A]">
              {isCentralAsia
                ? "Присоединяйтесь к нашей растущей сети волонтёров"
                : "Join our growing volunteer network"}
            </strong>{" "}
            {isCentralAsia
              ? "и начните создавать глобальный эффект из вашего дома."
              : "and start creating global impact from your home."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/get-involved">
              <Button size="lg" className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white px-8 py-3">
                {isCentralAsia ? "Начните своё путешествие" : "Start Your Impact Journey"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/blog" className="text-[#1B2A4A] hover:text-[#C9922A] font-medium">
              {isCentralAsia ? "Узнать больше о нашем подходе →" : "Learn More About Our Approach →"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
