/**
 * Fetch FAQ items from Sanity, with hardcoded fallback.
 * Filter by category (general / participants / volunteers / donors).
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
