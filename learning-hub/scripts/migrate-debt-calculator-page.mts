/**
 * Seed the `debtCalculatorPage` singleton with the bilingual copy that was
 * previously hardcoded in `src/pages/tools/DebtCalculator.tsx` (hero,
 * instructions, methodology, footnote, next-steps, related resources,
 * bottom CTA).
 *
 * The interactive calculator UI itself stays hardcoded — we only persist
 * the surrounding copy here.
 *
 * Idempotent — uses createOrReplace with _id="debtCalculatorPage". Stable
 * `_key` values on every array entry so re-running this script does not
 * orphan references in Sanity.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:debt-calculator
 */
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_WRITE_TOKEN. Get one at https://sanity.io/manage and run:\n" +
      "   SANITY_WRITE_TOKEN=<token> npm run migrate:debt-calculator\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Portable Text helpers ────────────────────────────────────────────────────

interface SpanChild {
  _type: "span";
  _key: string;
  marks: string[];
  text: string;
}

interface PtBlock {
  _type: "block";
  _key: string;
  style: string;
  markDefs: unknown[];
  children: SpanChild[];
}

function block(key: string, text: string, style = "normal"): PtBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s1`, marks: [], text }],
  };
}

// ── Portable Text bodies ─────────────────────────────────────────────────────

const INSTRUCTIONS_BODY: PtBlock[] = [
  block(
    "ib1",
    "Add every debt you currently owe — credit cards, student loans, auto loans, medical bills, and any personal lines of credit. Enter the current balance, the annual interest rate (APR), and the minimum monthly payment your lender requires."
  ),
  block(
    "ib2",
    "Tell the calculator how much extra you can put toward debt each month above your minimums. Even an extra $50 changes the curve in a way most people find motivating. Then choose snowball (smallest balance first) or avalanche (highest interest rate first) — toggle between them to see how each strategy plays out."
  ),
  block(
    "ib3",
    "Your numbers are saved in your browser, so you can come back later and refine the plan. Nothing is sent to a server."
  ),
];

const INSTRUCTIONS_BODY_RU: PtBlock[] = [
  block(
    "ibr1",
    "Добавьте все ваши текущие долги — кредитные карты, студенческие кредиты, автокредиты, медицинские счета и любые личные кредитные линии. Введите текущий остаток, годовую процентную ставку (APR) и минимальный ежемесячный платёж, требуемый банком."
  ),
  block(
    "ibr2",
    "Укажите, сколько дополнительно сверх минимальных платежей вы можете направлять на погашение долга каждый месяц. Даже дополнительные $50 заметно меняют график. Затем выберите стратегию: «снежный ком» (сначала наименьший остаток) или «лавину» (сначала самая высокая ставка) — переключайтесь между ними, чтобы сравнить результаты."
  ),
  block(
    "ibr3",
    "Ваши данные сохраняются в браузере — вы можете вернуться и уточнить план позже. Ничто не передаётся на сервер."
  ),
];

const METHODOLOGY_BODY: PtBlock[] = [
  block(
    "mb1",
    "Each month the calculator does two passes through your debts. First, it charges interest on each remaining balance using the standard formula (APR ÷ 12 ÷ 100), then applies your minimum payment. Second, it directs your extra monthly payment to a single target debt — the smallest balance under the snowball strategy, or the highest interest rate under the avalanche strategy."
  ),
  block(
    "mb2",
    "When a debt hits zero, its minimum payment is freed up and added to your extra payment for the remaining debts. This is the rolling-snowball mechanic that makes both strategies accelerate over time. The calculator caps the simulation at 600 months (50 years) so unrealistic inputs don't run forever."
  ),
  block(
    "mb3",
    "Total interest is the sum of every monthly interest charge across the whole timeline. Total paid is principal + interest combined. The chart samples every month for the first two years, then every third month afterward, to keep the visualization readable on long payoff timelines."
  ),
];

const METHODOLOGY_BODY_RU: PtBlock[] = [
  block(
    "mbr1",
    "Каждый месяц калькулятор делает два прохода по вашим долгам. Сначала он начисляет проценты на каждый остаток по стандартной формуле (годовая ставка ÷ 12 ÷ 100), затем применяет минимальный платёж. После этого ваш дополнительный ежемесячный платёж направляется на один целевой долг — наименьший остаток в стратегии «снежного кома» или долг с самой высокой ставкой в «лавине»."
  ),
  block(
    "mbr2",
    "Когда долг обнуляется, его минимальный платёж освобождается и добавляется к вашему дополнительному платежу по оставшимся долгам. Этот эффект «нарастающего снежного кома» ускоряет обе стратегии со временем. Симуляция ограничена 600 месяцами (50 лет), чтобы нереалистичные данные не приводили к бесконечному циклу."
  ),
  block(
    "mbr3",
    "Общая сумма процентов — это сумма всех ежемесячных начислений за весь срок. Общая сумма выплат включает основную сумму и проценты. Для длинных графиков диаграмма показывает каждый месяц первые два года, а затем — каждый третий месяц, чтобы визуализация оставалась читаемой."
  ),
];

// ── Migration ────────────────────────────────────────────────────────────────

async function main() {
  console.log("\nSeeding debtCalculatorPage singleton...\n");

  await client.createOrReplace({
    _id: "debtCalculatorPage",
    _type: "debtCalculatorPage",

    // ── Hero ────────────────────────────────────────────────────────────────
    heroBadge: "Free Interactive Tool",
    heroBadgeRu: "Бесплатный интерактивный инструмент",
    heroHeading: "Debt Payoff Calculator",
    heroHeadingRu: "Калькулятор погашения долгов",
    heroSubheading:
      "Compare snowball vs. avalanche strategies and see exactly when you'll be debt-free.",
    heroSubheadingRu:
      "Сравните стратегии снежного кома и лавины и узнайте, когда именно вы избавитесь от долгов.",

    // ── Instructions ────────────────────────────────────────────────────────
    instructionsHeading: "How to use this calculator",
    instructionsHeadingRu: "Как пользоваться калькулятором",
    instructionsBody: INSTRUCTIONS_BODY,
    instructionsBodyRu: INSTRUCTIONS_BODY_RU,
    howItWorksSteps: [
      {
        _key: "step-list-debts",
        _type: "howItWorksStep",
        stepNumber: 1,
        icon: "DollarSign",
        title: "List every debt",
        titleRu: "Перечислите все долги",
        description:
          "Credit cards, student loans, auto loans, medical bills — anything with a balance and a minimum payment.",
        descriptionRu:
          "Кредитные карты, студенческие кредиты, автокредиты, медицинские счета — всё, что имеет остаток и минимальный платёж.",
      },
      {
        _key: "step-pick-strategy",
        _type: "howItWorksStep",
        stepNumber: 2,
        icon: "TrendingDown",
        title: "Pick a strategy",
        titleRu: "Выберите стратегию",
        description:
          "Snowball if you need motivation. Avalanche if you want to pay the least interest.",
        descriptionRu:
          "«Снежный ком» — если нужна мотивация. «Лавина» — если хотите платить меньше процентов.",
      },
      {
        _key: "step-add-extra",
        _type: "howItWorksStep",
        stepNumber: 3,
        icon: "Plus",
        title: "Add an extra payment",
        titleRu: "Добавьте доплату",
        description:
          "Even $50/month dramatically shortens the timeline. Try different amounts to see the impact.",
        descriptionRu:
          "Даже $50 в месяц заметно сокращают срок. Пробуйте разные суммы, чтобы увидеть эффект.",
      },
    ],

    // ── Methodology ─────────────────────────────────────────────────────────
    methodologyHeading: "How the math works",
    methodologyHeadingRu: "Как считается результат",
    methodologyBody: METHODOLOGY_BODY,
    methodologyBodyRu: METHODOLOGY_BODY_RU,
    footnote:
      "This calculator is for educational purposes only and does not constitute financial advice. Compounding assumptions use simple monthly compounding (APR / 12), which approximates most consumer credit products but may differ from your lender's daily-balance method. Consult a qualified financial advisor before making major debt-payoff decisions.",
    footnoteRu:
      "Этот калькулятор предназначен только для образовательных целей и не является финансовой консультацией. Расчёты используют простое ежемесячное начисление процентов (годовая ставка / 12), что близко к большинству потребительских кредитов, но может отличаться от метода ежедневного начисления вашего банка. Перед принятием серьёзных финансовых решений проконсультируйтесь с квалифицированным специалистом.",

    // ── Next steps ──────────────────────────────────────────────────────────
    nextStepsHeading: "What to do next",
    nextStepsHeadingRu: "Что делать дальше",
    nextStepsIntro:
      "A plan only works if you actually start it. Here are the next moves we recommend after you've run the numbers.",
    nextStepsIntroRu:
      "План работает, только если вы реально начнёте его выполнять. Вот следующие шаги, которые мы рекомендуем после того, как вы посчитали свои цифры.",
    nextSteps: [
      {
        _key: "ns-automate-payment",
        _type: "nextStepItem",
        icon: "Calendar",
        label: "Automate your extra payment",
        labelRu: "Автоматизируйте доплату",
        description:
          "Set up an automatic transfer the day after payday — before willpower has time to negotiate.",
        descriptionRu:
          "Настройте автоматический перевод на следующий день после зарплаты — до того, как сила воли начнёт торговаться.",
        ctaLabel: "Read the habits guide",
        ctaLabelRu: "К руководству по привычкам",
        ctaUrl: "/blog/5-financial-habits-first-generation-entrepreneurs",
      },
      {
        _key: "ns-take-course",
        _type: "nextStepItem",
        icon: "TrendingDown",
        label: "Take the free Financial Literacy course",
        labelRu: "Пройдите бесплатный курс финансовой грамотности",
        description:
          "16 lessons covering budgeting, credit, savings, and debt — the full system this calculator slots into.",
        descriptionRu:
          "16 уроков о бюджете, кредите, сбережениях и долге — полная система, частью которой является этот калькулятор.",
        ctaLabel: "Start the course",
        ctaLabelRu: "Начать курс",
        ctaUrl: "/course/financial-literacy",
      },
    ],

    // ── Related resources ───────────────────────────────────────────────────
    relatedResourcesHeading: "Learn More",
    relatedResourcesHeadingRu: "Узнать больше",
    relatedResources: [
      {
        _key: "rel-snowball-vs-avalanche",
        _type: "relatedResourceCard",
        title: "Debt Snowball vs. Avalanche: Which Actually Works?",
        titleRu: "Снежный ком против лавины: что реально работает?",
        summary: "",
        summaryRu: "",
        slug: "/blog/debt-snowball-vs-avalanche-which-actually-works",
      },
      {
        _key: "rel-financial-habits",
        _type: "relatedResourceCard",
        title: "5 Financial Habits for First-Generation Entrepreneurs",
        titleRu: "5 финансовых привычек для предпринимателей в первом поколении",
        summary: "",
        summaryRu: "",
        slug: "/blog/5-financial-habits-first-generation-entrepreneurs",
      },
    ],

    // ── Bottom CTA ──────────────────────────────────────────────────────────
    bottomCtaHeading: "Ready to put a real plan in motion?",
    bottomCtaHeadingRu: "Готовы начать настоящий план?",
    bottomCtaSubheading:
      "Our free Financial Literacy course turns the numbers above into a step-by-step system — budgeting, credit, savings, and debt, all in 16 lessons.",
    bottomCtaSubheadingRu:
      "Наш бесплатный курс финансовой грамотности превращает эти цифры в пошаговую систему — бюджет, кредит, сбережения и долг — за 16 уроков.",
    primaryLabel: "Start the Free Course",
    primaryLabelRu: "Начать бесплатный курс",
    primaryUrl: "/course/financial-literacy",
    secondaryLabel: "Browse the blog",
    secondaryLabelRu: "Перейти в блог",
    secondaryUrl: "/blog",
  });

  console.log(
    "Done. Visit https://bbborders.sanity.studio/structure/debtCalculatorPage to verify.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
