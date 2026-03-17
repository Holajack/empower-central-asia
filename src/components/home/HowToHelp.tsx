
import { BookOpen, Briefcase, Calculator, Newspaper, Heart, Users2, Handshake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import DonateButton from "../DonateButton";
import { useRegion } from "@/contexts/RegionContext";

interface HowToHelpProps {
  isMobile?: boolean;
}

const HowToHelp = ({ isMobile = false }: HowToHelpProps) => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();

  const learnOptions = isCentralAsia
    ? [
        {
          title: "Бесплатный курс",
          description:
            "Наш 6-недельный курс по финансовой грамотности охватывает составление бюджета, устранение долгов, накопления и основы предпринимательства.",
          icon: BookOpen,
          link: "/course/financial-literacy",
          buttonText: "Начать обучение",
        },
        {
          title: "Курс создания бизнеса",
          description:
            "12-недельный интенсив для выпускников курса финансовой грамотности: бизнес-модель, проверка рынка, запуск.",
          icon: Briefcase,
          link: "/course/business-creation",
          buttonText: "Начать курс",
        },
        {
          title: "Калькулятор долгов",
          description:
            "Сравните стратегии погашения «снежный ком» и «лавина» и узнайте точную дату, когда вы освободитесь от долгов.",
          icon: Calculator,
          link: "/tools/debt-calculator",
          buttonText: "Открыть калькулятор",
        },
        {
          title: "Блог и ресурсы",
          description:
            "Подробные статьи по финансовой грамотности, предпринимательству и устойчивому развитию.",
          icon: Newspaper,
          link: "/blog",
          buttonText: "Читать статьи",
        },
      ]
    : [
        {
          title: "Free Course",
          description:
            "Our 6-week financial literacy course covers budgeting, debt elimination, saving, and entrepreneurship basics.",
          icon: BookOpen,
          link: "/course/financial-literacy",
          buttonText: "Start Learning",
        },
        {
          title: "Business Course",
          description:
            "12-week intensive for financial literacy graduates: business model, market validation, and launch.",
          icon: Briefcase,
          link: "/course/business-creation",
          buttonText: "Start the Course",
        },
        {
          title: "Debt Calculator",
          description:
            "Compare snowball vs. avalanche payoff strategies and see exactly when you'll be debt-free.",
          icon: Calculator,
          link: "/tools/debt-calculator",
          buttonText: "Try the Calculator",
        },
        {
          title: "Blog & Resources",
          description:
            "Deep-dive articles on financial literacy, entrepreneurship, and sustainable development.",
          icon: Newspaper,
          link: "/blog",
          buttonText: "Read Articles",
        },
      ];

  const giveOptionsAll = isCentralAsia
    ? [
        {
          title: "Пожертвовать",
          description:
            "100% пожертвований финансируют проверенные программы, которые обучают предпринимателей и преобразуют сообщества Центральной Азии.",
          icon: Heart,
          isDonate: true,
          buttonText: "Сделать пожертвование",
        },
        {
          title: "Волонтёрство",
          description:
            "Делитесь своим опытом дистанционно — наставляйте предпринимателей, проводите мастер-классы или поддерживайте работу программ.",
          icon: Users2,
          link: "/get-involved",
          buttonText: "Стать волонтёром",
        },
        {
          title: "Партнёрство",
          description:
            "Корпоративное и организационное партнёрство, создающее измеримое социальное воздействие и устойчивые изменения.",
          icon: Handshake,
          link: "/partner-application",
          buttonText: "Стать партнёром",
        },
      ]
    : [
        {
          title: "Donate",
          description:
            "100% of donations fund proven programs that train entrepreneurs and transform communities in Central Asia.",
          icon: Heart,
          isDonate: true,
          buttonText: "Make a Donation",
        },
        {
          title: "Volunteer",
          description:
            "Share your expertise remotely -- mentor entrepreneurs, lead workshops, or support program operations.",
          icon: Users2,
          link: "/get-involved",
          buttonText: "Become a Volunteer",
        },
        {
          title: "Partner",
          description:
            "Corporate and organizational partnerships that create measurable social impact and sustainable change.",
          icon: Handshake,
          link: "/partner-application",
          buttonText: "Partner With Us",
        },
      ];

  // Hide donation card for actual Central Asia visitors (not just Russian language toggle)
  const giveOptions = isRegionCentralAsia
    ? giveOptionsAll.filter((o) => !("isDonate" in o && o.isDonate))
    : giveOptionsAll;

  type LearnOption = (typeof learnOptions)[0];
  type GiveOption = (typeof giveOptionsAll)[0];

  const renderCard = (option: LearnOption | GiveOption, accentColor: string) => {
    const Icon = option.icon;
    const colorMap: Record<string, { bg: string; text: string; border: string; btn: string }> = {
      yellow: {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-200",
        btn: "bg-yellow-500 hover:bg-yellow-600 text-black",
      },
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        btn: "bg-blue-600 hover:bg-blue-700 text-white",
      },
    };
    const colors = colorMap[accentColor];

    return (
      <Card
        key={option.title}
        className={`${colors.border} border hover:shadow-lg transition-all duration-300 flex flex-col h-full`}
      >
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`${colors.bg} p-2 rounded-lg`}>
              <Icon className={`h-5 w-5 ${colors.text}`} />
            </div>
            <CardTitle className="text-lg">{option.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between space-y-4">
          <CardDescription className="flex-grow text-gray-600">
            {option.description}
          </CardDescription>
          <div className="mt-auto">
            {"isDonate" in option && option.isDonate ? (
              <DonateButton className={`w-full ${colors.btn} font-medium`}>
                {option.buttonText}
              </DonateButton>
            ) : (
              <Link to={"link" in option ? option.link : "#"}>
                <Button className={`w-full ${colors.btn} font-medium group`}>
                  {option.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          {isCentralAsia ? "Как вы можете помочь" : "How You Can Help"}
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {isCentralAsia
            ? "Хотите развить собственные навыки или поддержать чей-то путь — здесь найдётся место для вас."
            : "Whether you want to grow your own skills or support someone else's journey, there's a place for you."}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learn Track */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                {isCentralAsia ? "Хочу учиться" : "I want to learn"}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {learnOptions.map((option) => renderCard(option, "yellow"))}
            </div>
          </div>

          {/* Give Track */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                {isCentralAsia ? "Хочу помочь" : "I want to give"}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {giveOptions.map((option) => renderCard(option, "blue"))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;
