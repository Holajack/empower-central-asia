
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegion } from "@/contexts/RegionContext";

const QuickAbout = () => {
  const { isCentralAsia } = useRegion();

  const cards = isCentralAsia
    ? [
        {
          title: "Бедность — это не лень",
          description: "Это нехватка доступа к знаниям, инструментам и возможностям.",
        },
        {
          title: "Предпринимательство — это достоинство",
          description: "Создание своего дела преображает семьи и целые сообщества.",
        },
        {
          title: "Вы можете помочь отсюда",
          description: "Ваши знания, время и поддержка способны изменить чью-то судьбу.",
        },
      ]
    : [
        {
          title: "Poverty isn't laziness",
          description: "It's a lack of access to knowledge, tools, and opportunity.",
        },
        {
          title: "Entrepreneurship is dignity",
          description: "Building something of your own transforms families and communities.",
        },
        {
          title: "You can help from anywhere",
          description: "Your time, skills, or support can change someone's trajectory.",
        },
      ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {isCentralAsia ? "Наша миссия" : "Our Mission"}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            {isCentralAsia
              ? "Businesses Beyond Borders существует, чтобы принести надежду тем, кто её потерял — вооружая трудолюбивых людей знаниями и возможностями для достойной и устойчивой жизни через финансовую грамотность, предпринимательство и реальные шансы."
              : "Businesses Beyond Borders exists to bring hope to the hopeless -- equipping diligent people to build dignified, sustainable lives through financial literacy, entrepreneurship, and opportunity."}
          </p>

          <p className="text-lg text-gray-500 italic">
            {isCentralAsia
              ? "Наше видение: мир, в котором люди видят надежду прямо там, где они есть, и строят её для кого-то другого."
              : "Our vision: a world where people see hope right where they are, and build it for someone else."}
          </p>

          {/* Why We Exist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {cards.map((item, index) => (
              <div
                key={item.title}
                className="p-6 rounded-lg bg-gray-50 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-bold text-gray-500 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-flex items-center text-[#C9922A] hover:text-[#C9922A]/90 font-medium group"
          >
            {isCentralAsia ? "Наша история" : "Read Our Story"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickAbout;
