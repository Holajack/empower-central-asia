
import React from "react";
import { useInView } from "react-intersection-observer";
import ProgramCard from "./ProgramCard";
import { useRegion } from "@/contexts/RegionContext";

const programsEn = [
  {
    stage: "ACTIVATE",
    title: "Financial Literacy Training",
    tagline: "The starting line. Open to anyone willing to show up.",
    description:
      "This is where it begins. Free, practical financial education -- budgeting, saving, planning, managing debt. No prerequisites. No application. Just show up, do the work, and learn the skills that most people were never taught. The people who stay consistent are the ones who move forward.",
    details: [
      "6-week and 10-week tracks covering real-world money management",
      "Hands-on budgeting, debt elimination, and savings strategies",
      "No bank account or income level required -- built for real life",
      "Participants who complete the course can apply to facilitate future groups",
    ],
    cta: {
      participantText: "Start the Free Course",
      participantLink: "/programs/financial-literacy",
      donorText: "Fund a Cohort",
      donorLink: "/get-involved",
    },
    color: "navy" as const,
    hideForCa: false,
  },
  {
    stage: "EQUIP",
    title: "Business Creation Training",
    tagline: "For the ones who proved they're serious.",
    description:
      "Not everyone gets here. This stage is for people who completed financial literacy training and demonstrated they're ready for more. We walk alongside them to identify local opportunity, build a real business model, and develop the skills to execute. Twelve weeks. Hands-on. No shortcuts.",
    details: [
      "12-week intensive: business planning, market validation, and launch preparation",
      "Lean Startup methodology adapted for developing economies",
      "Real customer discovery -- not theory, but talking to actual people",
      "Mentorship from experienced entrepreneurs throughout the process",
    ],
    cta: {
      participantText: "Start the Course",
      participantLink: "/course/business-creation",
      donorText: "Sponsor a Participant",
      donorLink: "/get-involved",
    },
    color: "gold" as const,
    hideForCa: false,
  },
  {
    stage: "EMPOWER",
    title: "Startup Capital",
    tagline: "A real investment in a real person who earned it.",
    description:
      "This is not charity. This is a chance -- given to someone who completed the training, built the plan, and proved they can follow through. Startup capital to launch a real business. A $2,000 loan for materials becomes $4,000 in revenue within six months. A father stays instead of leaving. Children stay in school. A family stays whole.",
    details: [
      "Startup capital for graduates who demonstrate readiness",
      "3-year loan terms designed to set businesses up for success",
      "Ongoing mentorship and accountability during the launch phase",
      "Every dollar invested is tracked to real, measurable outcomes",
    ],
    cta: {
      participantText: "See What It Takes",
      participantLink: "/programs/business-creation",
      donorText: "Fund a Business Launch",
      donorLink: "/get-involved",
    },
    color: "navy" as const,
    hideForCa: true,
  },
  {
    stage: "MULTIPLY",
    title: "Community Leadership",
    tagline: "They build. They share. They become the ones who give.",
    description:
      "This is the part most organizations never get to. Graduates don't just build businesses -- they become the people who teach the next group. They facilitate financial literacy classes. They mentor new entrepreneurs. They hire from their own community. Hope stops being something they received and becomes something they give.",
    details: [
      "Graduates trained to facilitate financial literacy courses in their community",
      "Peer mentorship matching -- experienced builders guiding new participants",
      "Local leadership development so programs sustain themselves",
      "The goal: communities that no longer need BBB to keep going",
    ],
    cta: {
      participantText: "See the Full Journey",
      participantLink: "/programs/leadership-development",
      donorText: "Invest in Multiplication",
      donorLink: "/get-involved",
    },
    color: "gold" as const,
    hideForCa: false,
  },
];

const programsRu = [
  {
    stage: "АКТИВАЦИЯ",
    title: "Обучение финансовой грамотности",
    tagline: "Начальная точка. Открыто для всех, кто готов учиться.",
    description:
      "Здесь всё начинается. Бесплатное практическое финансовое образование -- бюджет, накопления, планирование, управление долгами. Без предварительных условий. Без заявки. Просто приходите, работайте и учитесь навыкам, которым большинство людей никогда не учили.",
    details: [
      "Курсы на 6 и 10 недель по управлению финансами в реальной жизни",
      "Практические навыки бюджетирования, устранения долгов и стратегий накопления",
      "Не требуется банковский счёт или определённый уровень дохода",
      "Выпускники могут стать фасилитаторами будущих групп",
    ],
    cta: {
      participantText: "Начать бесплатный курс",
      participantLink: "/programs/financial-literacy",
      donorText: "",
      donorLink: "",
    },
    color: "navy" as const,
    hideForCa: false,
  },
  {
    stage: "ПОДГОТОВКА",
    title: "Обучение созданию бизнеса",
    tagline: "Для тех, кто доказал свою серьёзность.",
    description:
      "Не все доходят до этого этапа. Он для тех, кто завершил курс финансовой грамотности и готов к большему. Мы помогаем найти возможности, построить реальную бизнес-модель и развить навыки для реализации. Двенадцать недель. Практика. Без сокращений.",
    details: [
      "12-недельный интенсив: бизнес-планирование, проверка рынка и подготовка к запуску",
      "Методология Lean Startup, адаптированная для развивающихся экономик",
      "Реальное исследование клиентов -- не теория, а разговоры с людьми",
      "Наставничество от опытных предпринимателей на протяжении всего процесса",
    ],
    cta: {
      participantText: "Начать курс",
      participantLink: "/course/business-creation",
      donorText: "",
      donorLink: "",
    },
    color: "gold" as const,
    hideForCa: false,
  },
  {
    stage: "УМНОЖЕНИЕ",
    title: "Лидерство в сообществе",
    tagline: "Они строят. Они делятся. Они становятся теми, кто помогает.",
    description:
      "Это то, до чего большинство организаций не доходит. Выпускники не просто строят бизнес -- они становятся теми, кто учит следующую группу. Они ведут курсы финансовой грамотности. Они наставляют новых предпринимателей. Они нанимают людей из своего сообщества.",
    details: [
      "Выпускники обучаются проводить курсы финансовой грамотности в своём сообществе",
      "Менторство: опытные предприниматели помогают новым участникам",
      "Развитие местного лидерства для устойчивости программ",
      "Цель: сообщества, которым больше не нужна BBB для продолжения роста",
    ],
    cta: {
      participantText: "Узнать весь путь",
      participantLink: "/programs/leadership-development",
      donorText: "",
      donorLink: "",
    },
    color: "gold" as const,
    hideForCa: false,
  },
];

const ProgramsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isCentralAsia, isRegionCentralAsia } = useRegion();

  const programs = isCentralAsia
    ? programsRu
    : programsEn.filter((p) => !(isCentralAsia && p.hideForCa));

  // Re-index after filtering (so numbers stay sequential)
  const filteredPrograms = isCentralAsia
    ? programs
    : programsEn.filter((p) => !p.hideForCa || !isRegionCentralAsia);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          {isCentralAsia ? "Как это работает" : "How It Works"}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {isCentralAsia
            ? "BBB не раздаёт деньги. Мы даём возможность тем, кто доказал, что готов. Каждый этап заслужен. Каждый шаг вперёд — доказательство того, что человек строит что-то настоящее."
            : "BBB does not give things away. We give opportunity to people who demonstrate they are ready for it. Each stage is earned. Each step forward is proof that someone is building something real."}
        </p>
      </div>

      {/* Journey Path Connector */}
      <div className="relative">
        {/* Vertical connector line (hidden on mobile) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1B2A4A] via-[#C9922A] to-[#1B2A4A] -translate-x-1/2 z-0" />

        <div
          ref={ref}
          className={`space-y-12 md:space-y-16 relative z-10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filteredPrograms.map((program, index) => (
            <ProgramCard
              key={index}
              {...program}
              index={index}
              hideDonorButton={isCentralAsia}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsSection;
