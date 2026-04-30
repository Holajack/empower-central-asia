/**
 * Fetch FAQ items from Sanity, with hardcoded fallback.
 * - useFaqItems(category?)             → general / GetInvolved FAQs
 * - useFaqItemsForProgram(programSlug) → per-program page FAQs
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

export interface FaqItem {
  _id: string;
  question: string;
  questionRu?: string;
  answer: string;
  answerRu?: string;
  category: "general" | "participants" | "volunteers" | "donors";
  order: number;
}

// Mirrors the inline FAQ array in src/pages/GetInvolved.tsx so the page
// renders identically when Sanity is unreachable.
const FALLBACK_FAQS: FaqItem[] = [
  {
    _id: "fallback.1",
    category: "general",
    order: 10,
    question: "How does BBB decide who receives startup capital?",
    questionRu: "Кто может участвовать в программе?",
    answer:
      "Nobody walks in and gets funded. Every person who receives startup capital first completed the financial literacy course, then the business creation program, then built and validated a real business plan. By the time they receive capital, they've already demonstrated -- through months of showing up and doing the work -- that they're ready. The filter is the point. It protects the participants and produces real results.",
    answerRu:
      "Курс по финансовой грамотности открыт для всех -- бесплатно, без заявки. Просто приходите, учитесь и применяйте знания. Те, кто покажет стабильность и серьёзность, могут продолжить обучение по программе создания бизнеса.",
  },
  {
    _id: "fallback.2",
    category: "donors",
    order: 20,
    question: "Where exactly does my donation go?",
    questionRu: "Сколько стоит участие?",
    answer:
      "Donations fund three things: training (financial literacy and business creation courses), local staff (facilitators in Central Asia who deliver programs on the ground), and startup capital (loans to graduates who have earned it). We don't have a fancy headquarters or a large administrative staff. The money goes to the work.",
    answerRu:
      "Курс финансовой грамотности полностью бесплатный. Программа создания бизнеса также бесплатна для тех, кто успешно завершил первый этап. Мы не берём деньги за обучение.",
  },
  {
    _id: "fallback.3",
    category: "participants",
    order: 30,
    question: "Can I participate if I don't live in Central Asia?",
    questionRu: "Как проходит обучение?",
    answer:
      "The financial literacy course is free and open to anyone, anywhere. The business creation program and startup capital stages are currently focused on communities in Kyrgyzstan, Kazakhstan, and Uzbekistan. We're building toward online group sessions -- sign up for our newsletter to be notified when those launch.",
    answerRu:
      "Курс финансовой грамотности длится 6 или 10 недель. Каждую неделю -- новая тема: бюджет, накопления, управление долгами, планирование. Практические задания, рабочие тетради, и живые обсуждения.",
  },
  {
    _id: "fallback.4",
    category: "donors",
    order: 40,
    question: "Is my donation tax-deductible?",
    questionRu: "Могу ли я стать волонтёром или фасилитатором?",
    answer:
      "Yes. Businesses Beyond Borders is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the full extent allowed by law. You'll receive a receipt for your records.",
    answerRu:
      "Да! Выпускники программы обучаются проводить курсы, наставлять новых участников и развивать лидерство в своих сообществах. Если вы прошли обучение -- вы можете помогать другим.",
  },
  {
    _id: "fallback.5",
    category: "general",
    order: 50,
    question: "How is BBB different from Kiva or other microfinance organizations?",
    questionRu: "Как связаться с нами?",
    answer:
      "Most microfinance organizations provide loans. BBB provides a complete path: free financial education first, then business skills, then capital -- but only after someone has proven through the earlier stages that they're ready. We don't fund ideas. We fund people who have already done the work. And our graduates go on to teach others, which means the impact multiplies without requiring more funding.",
    answerRu:
      "Напишите нам в WhatsApp или по электронной почте. Мы всегда рады ответить на ваши вопросы и помочь вам начать.",
  },
];

const FAQ_QUERY = /* groq */ `
  *[_type == "faqItem" && (active == true || !defined(active))] | order(order asc){
    _id,
    question,
    questionRu,
    answer,
    answerRu,
    "category": coalesce(category, "general"),
    "order": coalesce(order, 99)
  }
`;

export function useFaqItems(category?: FaqItem["category"]): {
  faqs: FaqItem[];
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["faqItems"],
    queryFn: async () => {
      try {
        return await sanity.fetch<FaqItem[]>(FAQ_QUERY);
      } catch {
        return null;
      }
    },
  });
  const all = data && data.length > 0 ? data : FALLBACK_FAQS;
  const filtered = category ? all.filter((f) => f.category === category) : all;
  return {
    faqs: filtered,
    isLoading,
    source: data && data.length > 0 ? "sanity" : "fallback",
  };
}

/** Convert FaqItem[] to the localized {question, answer} shape the page consumes. */
export function localizeFaqs(faqs: FaqItem[], isCentralAsia: boolean) {
  return faqs.map((f) => ({
    question: getLocalized(f.question, f.questionRu, isCentralAsia),
    answer: getLocalized(f.answer, f.answerRu, isCentralAsia),
  }));
}

// ---------------------------------------------------------------------------
// Per-program FAQ fallbacks — extracted from the inline generateFAQSchema calls
// in each program page. The site renders identically when Sanity is unreachable.
// ---------------------------------------------------------------------------

const PROGRAM_FAQ_FALLBACKS: Record<string, FaqItem[]> = {
  "financial-literacy": [
    {
      _id: "fallback.fl.1",
      category: "general",
      order: 10,
      question: "Is the Financial Literacy Program really free?",
      answer:
        "Yes, the program is 100% free with no login required. The self-paced 6-week online course and all interactive tools are available at no cost, forever.",
    },
    {
      _id: "fallback.fl.2",
      category: "general",
      order: 20,
      question: "How long does the Financial Literacy Program take to complete?",
      answer:
        "The self-paced online course is 6 weeks long. A more comprehensive cohort-based version runs 10 weeks with facilitator-led group sessions. Both options allow you to go at your own speed.",
    },
    {
      _id: "fallback.fl.3",
      category: "general",
      order: 30,
      question: "What topics does the Financial Literacy Program cover?",
      answer:
        "The program covers zero-based budgeting, debt elimination strategies (including snowball and avalanche methods), emergency fund planning, income diversification, saving strategies, and the principles of generous giving.",
    },
    {
      _id: "fallback.fl.4",
      category: "general",
      order: 40,
      question: "Do I need any prior financial knowledge to join?",
      answer:
        "No prerequisites are required. The program is open to all backgrounds and is designed to be accessible to anyone who wants to take control of their financial future.",
    },
    {
      _id: "fallback.fl.5",
      category: "general",
      order: 50,
      question:
        "What is the difference between the 6-week course and the 10-week cohort program?",
      answer:
        "The 6-week self-paced online course lets you start anytime and progress at your own speed. The 10-week cohort program includes facilitator-led group sessions, accountability partnerships, and a certificate of completion — ideal for those who thrive in a community setting.",
    },
    {
      _id: "fallback.fl.6",
      category: "general",
      order: 60,
      question: "What interactive tools are included in the program?",
      answer:
        "The program includes a Debt Payoff Calculator (comparing snowball vs. avalanche strategies), guided budget worksheets for building a zero-based budget, and a Financial Snapshot self-assessment tool available in Week 1.",
    },
  ],
  "business-creation": [
    {
      _id: "fallback.bc.1",
      category: "general",
      order: 10,
      question: "What is the Business Creation Training Program?",
      answer:
        "The Business Creation Training Program is a 12-week intensive entrepreneurship program that uses Lean Startup methodology and Business Model Canvas to take participants from a business idea to a market-ready venture. It includes 72 hours of training, 4 progressive modules, and 1:1 mentorship support.",
    },
    {
      _id: "fallback.bc.2",
      category: "general",
      order: 20,
      question: "What does the 12-week Business Creation curriculum cover?",
      answer:
        "The curriculum is divided into 4 modules: Module 1 (Weeks 1-3) covers entrepreneurial mindset and Lean Startup methodology; Module 2 (Weeks 4-6) covers Business Model Canvas and value proposition design; Module 3 (Weeks 7-9) covers customer validation and data-driven decision making; Module 4 (Weeks 10-12) covers MVP development, product-market fit, and investor pitch creation.",
    },
    {
      _id: "fallback.bc.3",
      category: "general",
      order: 30,
      question: "What is the success rate of the Business Creation Program?",
      answer:
        "90% of participants launch a viable business within 6 months of completing the program. Graduates have collectively generated over $2 million in revenue and created 100+ jobs. The program maintains an 85% completion rate.",
    },
    {
      _id: "fallback.bc.4",
      category: "general",
      order: 40,
      question: "How much does the Business Creation Program cost?",
      answer:
        "Scholarships are available to make the program accessible. Contact the BBB program team for details on current cohort costs and scholarship availability.",
    },
    {
      _id: "fallback.bc.5",
      category: "general",
      order: 50,
      question:
        "What tools and resources are included in the Business Creation Program?",
      answer:
        "Participants get access to professional tools including Miro/Mural for Business Model Canvas collaboration, Figma for MVP prototyping and design, Typeform for customer validation surveys, and financial modeling templates for projections.",
    },
    {
      _id: "fallback.bc.6",
      category: "general",
      order: 60,
      question: "When does the next Business Creation cohort start?",
      answer:
        "The next Business Creation cohort starts April 15, 2026. Cohorts meet Tuesday and Thursday evenings from 6-9 PM in a hybrid format (in-person and online), with 12-15 entrepreneurs per cohort. Apply through the BBB website to reserve your spot.",
    },
  ],
  "leadership-development": [
    {
      _id: "fallback.ld.1",
      category: "general",
      order: 10,
      question: "Is the Leadership Development Program free?",
      answer:
        "Yes, the 12-week self-paced online course is 100% free. A mentored cohort-based program is also available for those who prefer guided group learning with one-on-one mentorship sessions.",
    },
    {
      _id: "fallback.ld.2",
      category: "general",
      order: 20,
      question:
        "What are the prerequisites for the Leadership Development Program?",
      answer:
        "The Leadership Development Program is designed to follow the 12-Week Business Creation Course, which provides the entrepreneurship foundation that leadership skills build upon.",
    },
    {
      _id: "fallback.ld.3",
      category: "general",
      order: 30,
      question: "What leadership topics does the program cover?",
      answer:
        "The 12-week program covers emotional intelligence and self-leadership, communication and influence skills, team building and management, conflict resolution, strategic thinking, change management, and organizational leadership — built on research by Covey, Goleman, Kotter, and other leading experts.",
    },
    {
      _id: "fallback.ld.4",
      category: "general",
      order: 40,
      question: "How is the Leadership Development Program structured?",
      answer:
        "The program is organized into four modules over 12 weeks: self-leadership (Weeks 1-3), leading others (Weeks 4-6), team leadership (Weeks 7-9), and organizational leadership (Weeks 10-12). Each module follows a Learn-Practice-Lead framework.",
    },
    {
      _id: "fallback.ld.5",
      category: "general",
      order: 50,
      question:
        "What will I be able to do after completing the Leadership Development Program?",
      answer:
        "Graduates develop emotional intelligence and self-leadership mastery, communication and influence skills, the ability to build and manage high-performance teams, values-based decision-making confidence, conflict resolution abilities, and a personal leadership legacy statement.",
    },
    {
      _id: "fallback.ld.6",
      category: "general",
      order: 60,
      question:
        "Is there a cohort option for the Leadership Development Program?",
      answer:
        "Yes. In addition to the self-paced online course, BBB offers a mentored leadership program with facilitator guidance, group discussions, one-on-one mentorship sessions, accountability partnerships, and a certificate of completion.",
    },
  ],
  "community-collaboration": [
    {
      _id: "fallback.cc.1",
      category: "general",
      order: 10,
      question: "What is the Community Collaboration Network?",
      answer:
        "The Community Collaboration Network is a volunteer-driven initiative by Businesses Beyond Borders that connects entrepreneurs, businesses, and organizations to build sustainable local partnerships for economic development and social impact in Central Asia and beyond.",
    },
    {
      _id: "fallback.cc.2",
      category: "volunteers",
      order: 20,
      question:
        "How can I volunteer with the Community Collaboration Network?",
      answer:
        "Volunteers are needed in several roles including community coordinators, partnership facilitators, business professionals, and event organizers. The program is designed to be run by volunteers with approximately 2 hours per week of commitment. Apply through the BBB website to get involved.",
    },
    {
      _id: "fallback.cc.3",
      category: "general",
      order: 30,
      question: "When will the Community Collaboration Network launch?",
      answer:
        "The program launches in three phases: Phase 1 (Foundation Building, Q2 2026) focuses on recruiting 15-20 volunteer coordinators and building infrastructure; Phase 2 (Program Launch, Q3 2026) includes the inaugural community forum and digital platform launch; Phase 3 (Growth and Impact, Q4 2026 onward) scales the network to 200+ members.",
    },
    {
      _id: "fallback.cc.4",
      category: "volunteers",
      order: 40,
      question:
        "What skills do I need to volunteer with the Community Collaboration Network?",
      answer:
        "Useful skills include community organizing, partnership development, event planning, business networking, project coordination, and communication. The program welcomes volunteers from all professional backgrounds who share a passion for entrepreneurship and community development.",
    },
    {
      _id: "fallback.cc.5",
      category: "general",
      order: 50,
      question:
        "Is the Community Collaboration Network only for Central Asia?",
      answer:
        "While the network has a strong focus on Central Asia, it connects entrepreneurs, businesses, and organizations worldwide. The digital collaboration platform will enable global participation and partnership-building across geographic boundaries.",
    },
  ],
};

const PROGRAM_FAQ_QUERY = /* groq */ `
  *[_type == "faqItem" && (active == true || !defined(active)) && program->slug.current == $programSlug] | order(order asc){
    _id,
    question,
    questionRu,
    answer,
    answerRu,
    "category": coalesce(category, "general"),
    "order": coalesce(order, 99)
  }
`;

/**
 * Fetch FAQ items for a specific program page, filtered by the program
 * reference field. Falls back to per-program hardcoded arrays when Sanity
 * is unreachable or no docs exist yet.
 */
export function useFaqItemsForProgram(programSlug: string): {
  faqs: FaqItem[];
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["faqItems", "program", programSlug],
    queryFn: async () => {
      try {
        return await sanity.fetch<FaqItem[]>(PROGRAM_FAQ_QUERY, {
          programSlug,
        });
      } catch {
        return null;
      }
    },
  });
  const fallback = PROGRAM_FAQ_FALLBACKS[programSlug] ?? [];
  const faqs = data && data.length > 0 ? data : fallback;
  return {
    faqs,
    isLoading,
    source: data && data.length > 0 ? "sanity" : "fallback",
  };
}
