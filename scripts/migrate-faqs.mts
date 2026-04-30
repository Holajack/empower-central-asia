/**
 * Phase 6 — seed FAQ items from the inline ternary in
 * src/pages/GetInvolved.tsx into Sanity faqItem docs.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-faqs.mts
 *
 * Idempotent — _id="faqItem.<n>".
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN.\n");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

interface FaqSeed {
  id: string;
  category: "general" | "participants" | "volunteers" | "donors";
  order: number;
  question: string;
  questionRu: string;
  answer: string;
  answerRu: string;
}

const FAQS: FaqSeed[] = [
  {
    id: "1-startup-capital",
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
    id: "2-donation-allocation",
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
    id: "3-participation-location",
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
    id: "4-tax-deductible",
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
    id: "5-bbb-vs-microfinance",
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

async function main() {
  console.log(`\n🚀 Seeding ${FAQS.length} FAQ items\n`);
  for (const f of FAQS) {
    const _id = `faqItem.${f.id}`;
    console.log(`→ ${f.id} (${f.category})`);
    await client.createOrReplace({
      _id,
      _type: "faqItem",
      question: f.question,
      questionRu: f.questionRu,
      answer: f.answer,
      answerRu: f.answerRu,
      category: f.category,
      order: f.order,
      active: true,
    });
  }
  console.log(`\n✅ Done. Visit https://bbborders.sanity.studio/structure/faqItem to verify.\n`);
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
