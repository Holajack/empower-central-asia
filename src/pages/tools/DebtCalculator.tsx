import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Plus,
  Trash2,
  TrendingDown,
  ArrowRight,
  Calculator,
  Info,
  DollarSign,
  Calendar,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useRegion } from "@/contexts/RegionContext";
import { Breadcrumbs } from "@/components/SEO";
import {
  useDebtCalculatorPage,
  getDebtCalcCopy,
  getStepTitle,
  getStepDescription,
  getNextStepLabel,
  getNextStepDescription,
  getNextStepCtaLabel,
  getRelatedResourceTitle,
  getRelatedResourceSummary,
  getLocalizedBody,
} from "@/hooks/useDebtCalculatorPage";

interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface PayoffMonth {
  month: number;
  label: string;
  totalBalance: number;
  totalPaid: number;
  interestPaid: number;
}

interface PayoffResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  timeline: PayoffMonth[];
  milestones: { debtName: string; month: number }[];
}

const STORAGE_KEY = "bbb-debt-calculator";

// Bilingual UI labels that live inline with the calculator widget. These are
// either form-field labels rendered hundreds of times (so they stay in code),
// or terms tied to the React state shape (snowball/avalanche enum values),
// or chart helpers used inside formatter callbacks. Everything else flows
// through the Sanity hook.
const UI = {
  yourDebts: { en: "Your Debts", ru: "Ваши долги" },
  debtN: { en: "Debt", ru: "Долг" },
  fieldName: { en: "Name", ru: "Название" },
  fieldNamePlaceholder: { en: "e.g. Visa Card", ru: "напр. Кредитная карта" },
  fieldBalance: { en: "Balance ($)", ru: "Остаток ($)" },
  fieldRate: { en: "Interest Rate (%)", ru: "Процентная ставка (%)" },
  fieldMinPayment: { en: "Minimum Payment ($)", ru: "Минимальный платёж ($)" },
  addDebt: { en: "Add Another Debt", ru: "Добавить ещё один долг" },
  payoffStrategy: { en: "Payoff Strategy", ru: "Стратегия погашения" },
  snowball: { en: "Snowball", ru: "Снежный ком" },
  avalanche: { en: "Avalanche", ru: "Лавина" },
  debtSnowball: { en: "Debt Snowball", ru: "Снежный ком" },
  debtAvalanche: { en: "Debt Avalanche", ru: "Лавина" },
  snowballExplain: {
    en: "Pay off the smallest balance first while making minimums on everything else. Quick wins build momentum and motivation. Best for people who need psychological victories to stay on track.",
    ru: "Сначала погасите наименьший долг, выплачивая минимум по остальным. Быстрые победы создают импульс и мотивацию. Подходит тем, кому нужны психологические победы для поддержания курса.",
  },
  avalancheExplain: {
    en: "Pay off the highest interest rate first while making minimums on everything else. Saves the most money on interest over time. Best for people motivated by math and long-term savings.",
    ru: "Сначала погасите долг с наибольшей процентной ставкой, выплачивая минимум по остальным. Экономит больше всего на процентах. Подходит тем, кого мотивирует математика и долгосрочная экономия.",
  },
  extraMonthlyPayment: {
    en: "Extra Monthly Payment",
    ru: "Дополнительный ежемесячный платёж",
  },
  extraExplain: {
    en: "How much extra can you put toward debt each month, above your minimum payments?",
    ru: "Сколько дополнительно вы можете вносить на погашение долга каждый месяц сверх минимальных платежей?",
  },
  perMonth: { en: "/month", ru: "/месяц" },
  payoffTimeline: { en: "Payoff Timeline", ru: "График погашения" },
  remainingBalance: { en: "Remaining Balance", ru: "Остаток долга" },
  interestPaid: { en: "Interest Paid", ru: "Выплачено процентов" },
  payoffMilestones: { en: "Payoff Milestones", ru: "Вехи погашения" },
  paidOffAtMonth: {
    en: (name: string, m: number) => `${name} paid off at month ${m}`,
    ru: (name: string, m: number) => `${name} погашен на месяце ${m}`,
  },
  yourResults: { en: "Your Results", ru: "Ваши результаты" },
  addDebtsHint: {
    en: "Add your debts to see results",
    ru: "Добавьте долги, чтобы увидеть результаты",
  },
  debtFreeIn: { en: "Debt-Free In", ru: "Свободен от долгов через" },
  totalInterest: { en: "Total Interest", ru: "Всего процентов" },
  totalPaid: { en: "Total Paid", ru: "Всего выплачено" },
  vsMinimum: {
    en: "vs. minimum payments only:",
    ru: "по сравнению с минимальными платежами:",
  },
  save: { en: "Save ", ru: "Экономия " },
  sooner: {
    en: (s: string) => `and ${s} sooner`,
    ru: (s: string) => `и на ${s} быстрее`,
  },
  quickComparison: { en: "Quick Comparison", ru: "Быстрое сравнение" },
  snowballRow: { en: "Snowball:", ru: "Снежный ком:" },
  avalancheRow: { en: "Avalanche:", ru: "Лавина:" },
  intAbbr: { en: "int.", ru: "проц." },
  avalancheSaves: {
    en: (s: string) => `Avalanche saves ${s} in interest`,
    ru: (s: string) => `Лавина экономит ${s} на процентах`,
  },
  snowballSaves: {
    en: (s: string) => `Snowball saves ${s} in interest`,
    ru: (s: string) => `Снежный ком экономит ${s} на процентах`,
  },
};

function pickUI<K extends keyof typeof UI>(
  key: K,
  isCA: boolean
): (typeof UI)[K] extends { en: infer T; ru: T } ? T : never {
  // Type tells us en and ru are the same shape on each entry. Runtime is just
  // a property pick.
  return (isCA ? (UI[key] as { ru: unknown }).ru : (UI[key] as { en: unknown }).en) as never;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function createEmptyDebt(): Debt {
  return { id: generateId(), name: "", balance: 0, rate: 0, minPayment: 0 };
}

function calculatePayoff(
  debts: Debt[],
  extraPayment: number,
  strategy: "snowball" | "avalanche"
): PayoffResult {
  if (debts.length === 0 || debts.every((d) => d.balance <= 0)) {
    return { months: 0, totalInterest: 0, totalPaid: 0, timeline: [], milestones: [] };
  }

  const working = debts
    .filter((d) => d.balance > 0)
    .map((d) => ({ ...d, remaining: d.balance }));

  const timeline: PayoffMonth[] = [];
  const milestones: { debtName: string; month: number }[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  const maxMonths = 600; // 50 years cap

  timeline.push({
    month: 0,
    label: "Start",
    totalBalance: working.reduce((s, d) => s + d.remaining, 0),
    totalPaid: 0,
    interestPaid: 0,
  });

  while (working.some((d) => d.remaining > 0) && month < maxMonths) {
    month++;

    // Sort by strategy
    const sorted = [...working].filter((d) => d.remaining > 0);
    if (strategy === "snowball") {
      sorted.sort((a, b) => a.remaining - b.remaining);
    } else {
      sorted.sort((a, b) => b.rate - a.rate);
    }

    let extraAvailable = extraPayment;

    // First pass: apply minimum payments and interest
    for (const debt of working) {
      if (debt.remaining <= 0) continue;
      const monthlyRate = debt.rate / 100 / 12;
      const interest = debt.remaining * monthlyRate;
      totalInterest += interest;
      debt.remaining += interest;

      const payment = Math.min(debt.minPayment, debt.remaining);
      debt.remaining -= payment;
      totalPaid += payment;

      if (debt.remaining <= 0.01) {
        debt.remaining = 0;
        milestones.push({ debtName: debt.name || `Debt`, month });
      }
    }

    // Second pass: apply extra payment to target debt
    for (const target of sorted) {
      if (target.remaining <= 0 || extraAvailable <= 0) continue;
      const wDebt = working.find((d) => d.id === target.id)!;
      const extra = Math.min(extraAvailable, wDebt.remaining);
      wDebt.remaining -= extra;
      totalPaid += extra;
      extraAvailable -= extra;

      if (wDebt.remaining <= 0.01) {
        // Freed-up minimum payment becomes extra for next debt
        extraAvailable += wDebt.minPayment;
        wDebt.remaining = 0;
        if (!milestones.find((m) => m.debtName === wDebt.name && m.month === month)) {
          milestones.push({ debtName: wDebt.name || `Debt`, month });
        }
      }
    }

    const totalBalance = working.reduce((s, d) => s + Math.max(0, d.remaining), 0);

    // Only push every month for short timelines, or sampled for long ones
    const shouldPush =
      month <= 24 || month % 3 === 0 || totalBalance <= 0;
    if (shouldPush) {
      timeline.push({
        month,
        label: `Mo ${month}`,
        totalBalance: Math.round(totalBalance * 100) / 100,
        totalPaid: Math.round(totalPaid * 100) / 100,
        interestPaid: Math.round(totalInterest * 100) / 100,
      });
    }
  }

  return {
    months: month,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    timeline,
    milestones,
  };
}

function calculateMinimumOnly(debts: Debt[]): PayoffResult {
  return calculatePayoff(debts, 0, "snowball");
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function formatMonths(m: number, isCentralAsia: boolean): string {
  const years = Math.floor(m / 12);
  const months = m % 12;
  if (isCentralAsia) {
    if (years === 0) return `${months} мес.`;
    if (months === 0) return `${years} г.`;
    return `${years} г. ${months} мес.`;
  }
  if (years === 0) return `${months} month${months !== 1 ? "s" : ""}`;
  if (months === 0) return `${years} year${years !== 1 ? "s" : ""}`;
  return `${years}y ${months}m`;
}

// ── Portable Text styling for instructions + methodology bodies ──────────────

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed text-gray-700 mb-3">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#1B2A4A]/20 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold text-[#1B2A4A] mt-6 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-[#1B2A4A] mt-4 mb-1">
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-[#1B2A4A]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

const DebtCalculator = () => {
  const { isCentralAsia } = useRegion();
  const { data: pageCopy } = useDebtCalculatorPage();

  const [debts, setDebts] = useState<Debt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [createEmptyDebt()];
  });

  const [extraPayment, setExtraPayment] = useState(100);
  const [strategy, setStrategy] = useState<"snowball" | "avalanche">("snowball");

  // Persist debts to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
  }, [debts]);

  const validDebts = debts.filter(
    (d) => d.balance > 0 && d.rate >= 0 && d.minPayment > 0
  );

  const result = useMemo(
    () => calculatePayoff(validDebts, extraPayment, strategy),
    [validDebts, extraPayment, strategy]
  );

  const minimumResult = useMemo(
    () => calculateMinimumOnly(validDebts),
    [validDebts]
  );

  const interestSaved = minimumResult.totalInterest - result.totalInterest;
  const monthsSaved = minimumResult.months - result.months;

  function addDebt() {
    setDebts([...debts, createEmptyDebt()]);
  }

  function removeDebt(id: string) {
    if (debts.length <= 1) return;
    setDebts(debts.filter((d) => d.id !== id));
  }

  function updateDebt(id: string, field: keyof Debt, value: string | number) {
    setDebts(
      debts.map((d) =>
        d.id === id
          ? {
              ...d,
              [field]:
                field === "name"
                  ? value
                  : Math.max(0, Number(value) || 0),
            }
          : d
      )
    );
  }

  // ── Sanity-driven copy (with English fallback when Russian missing) ───────
  const heroBadge = getDebtCalcCopy(pageCopy, "heroBadge", isCentralAsia);
  const heroHeading = getDebtCalcCopy(pageCopy, "heroHeading", isCentralAsia);
  const heroSubheading = getDebtCalcCopy(
    pageCopy,
    "heroSubheading",
    isCentralAsia
  );
  const instructionsHeading = getDebtCalcCopy(
    pageCopy,
    "instructionsHeading",
    isCentralAsia
  );
  const methodologyHeading = getDebtCalcCopy(
    pageCopy,
    "methodologyHeading",
    isCentralAsia
  );
  const footnote = getDebtCalcCopy(pageCopy, "footnote", isCentralAsia);
  const nextStepsHeading = getDebtCalcCopy(
    pageCopy,
    "nextStepsHeading",
    isCentralAsia
  );
  const nextStepsIntro = getDebtCalcCopy(
    pageCopy,
    "nextStepsIntro",
    isCentralAsia
  );
  const relatedResourcesHeading = getDebtCalcCopy(
    pageCopy,
    "relatedResourcesHeading",
    isCentralAsia
  );
  const bottomCtaHeading = getDebtCalcCopy(
    pageCopy,
    "bottomCtaHeading",
    isCentralAsia
  );
  const bottomCtaSubheading = getDebtCalcCopy(
    pageCopy,
    "bottomCtaSubheading",
    isCentralAsia
  );
  const primaryLabel = getDebtCalcCopy(pageCopy, "primaryLabel", isCentralAsia);
  const secondaryLabel = getDebtCalcCopy(
    pageCopy,
    "secondaryLabel",
    isCentralAsia
  );

  const instructionsBody = getLocalizedBody(
    pageCopy.instructionsBody,
    pageCopy.instructionsBodyRu,
    isCentralAsia
  );
  const methodologyBody = getLocalizedBody(
    pageCopy.methodologyBody,
    pageCopy.methodologyBodyRu,
    isCentralAsia
  );

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? "Бесплатный калькулятор погашения долгов | Businesses Beyond Borders"
            : "Free Debt Payoff Calculator - Snowball vs Avalanche | Businesses Beyond Borders"}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Сравните стратегии снежного кома и лавины с помощью нашего бесплатного калькулятора. Узнайте дату погашения долгов и сэкономленные проценты."
              : "Compare debt snowball vs avalanche strategies with our free calculator. See your debt-free date, total interest saved, and a month-by-month payoff plan."
          }
        />
        <link
          rel="canonical"
          href="https://businessesbeyondborders.com/tools/debt-calculator"
        />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Бесплатный калькулятор погашения долгов"
              : "Free Debt Payoff Calculator - Snowball vs Avalanche"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Сравните стратегии снежного кома и лавины. Узнайте дату погашения долгов и сумму сэкономленных процентов."
              : "Compare debt snowball vs avalanche strategies. See your debt-free date and total interest saved."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://businessesbeyondborders.com/tools/debt-calculator"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Debt Payoff Calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            provider: {
              "@type": "NonprofitOrganization",
              name: "Businesses Beyond Borders",
              url: "https://businessesbeyondborders.com",
            },
            description:
              "Compare debt snowball vs avalanche payoff strategies. See your debt-free date and total interest saved.",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumbs
            items={[
              { name: "Home", url: "https://businessesbeyondborders.com" },
              { name: "Tools", url: "https://businessesbeyondborders.com/resources" },
              { name: "Debt Calculator", url: "https://businessesbeyondborders.com/tools/debt-calculator" },
            ]}
          />
        </div>
        {/* Hero */}
        <div className="bg-[#1B2A4A] text-white py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4 text-[#C9922A]" />
              {heroBadge}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{heroHeading}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {heroSubheading}
            </p>
          </div>
        </div>

        {/* Instructions / How it works */}
        {(instructionsBody.length > 0 ||
          pageCopy.howItWorksSteps.length > 0) && (
          <div className="container mx-auto px-4 pt-8 md:pt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#1B2A4A]">
                  {instructionsHeading}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructionsBody.length > 0 && (
                  <div className="prose prose-sm max-w-none">
                    <PortableText
                      value={instructionsBody}
                      components={portableTextComponents}
                    />
                  </div>
                )}
                {pageCopy.howItWorksSteps.length > 0 && (
                  <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {pageCopy.howItWorksSteps.map((step) => (
                      <li
                        key={step._key ?? step.stepNumber ?? step.title}
                        className="flex gap-3 border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9922A]/10 text-[#C9922A] font-bold flex items-center justify-center">
                          {step.stepNumber ?? ""}
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-[#1B2A4A]">
                            {getStepTitle(step, isCentralAsia)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {getStepDescription(step, isCentralAsia)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Inputs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Debt Entry */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B2A4A] flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#C9922A]" />
                    {pickUI("yourDebts", isCentralAsia)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {debts.map((debt, index) => (
                    <div
                      key={debt.id}
                      className="border border-gray-200 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">
                          {pickUI("debtN", isCentralAsia)} {index + 1}
                        </span>
                        {debts.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDebt(debt.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <Label
                            htmlFor={`name-${debt.id}`}
                            className="text-xs text-gray-500"
                          >
                            {pickUI("fieldName", isCentralAsia)}
                          </Label>
                          <Input
                            id={`name-${debt.id}`}
                            placeholder={pickUI(
                              "fieldNamePlaceholder",
                              isCentralAsia
                            )}
                            value={debt.name}
                            onChange={(e) =>
                              updateDebt(debt.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`balance-${debt.id}`}
                            className="text-xs text-gray-500"
                          >
                            {pickUI("fieldBalance", isCentralAsia)}
                          </Label>
                          <Input
                            id={`balance-${debt.id}`}
                            type="number"
                            min="0"
                            placeholder="5000"
                            value={debt.balance || ""}
                            onChange={(e) =>
                              updateDebt(debt.id, "balance", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`rate-${debt.id}`}
                            className="text-xs text-gray-500"
                          >
                            {pickUI("fieldRate", isCentralAsia)}
                          </Label>
                          <Input
                            id={`rate-${debt.id}`}
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="18.9"
                            value={debt.rate || ""}
                            onChange={(e) =>
                              updateDebt(debt.id, "rate", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`min-${debt.id}`}
                            className="text-xs text-gray-500"
                          >
                            {pickUI("fieldMinPayment", isCentralAsia)}
                          </Label>
                          <Input
                            id={`min-${debt.id}`}
                            type="number"
                            min="0"
                            placeholder="150"
                            value={debt.minPayment || ""}
                            onChange={(e) =>
                              updateDebt(debt.id, "minPayment", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={addDebt}
                    className="w-full border-dashed border-[#C9922A] text-[#C9922A] hover:bg-[#C9922A]/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {pickUI("addDebt", isCentralAsia)}
                  </Button>
                </CardContent>
              </Card>

              {/* Strategy & Extra Payment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B2A4A] flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-[#C9922A]" />
                    {pickUI("payoffStrategy", isCentralAsia)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs
                    value={strategy}
                    onValueChange={(v) =>
                      setStrategy(v as "snowball" | "avalanche")
                    }
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="snowball">
                        {pickUI("snowball", isCentralAsia)}
                      </TabsTrigger>
                      <TabsTrigger value="avalanche">
                        {pickUI("avalanche", isCentralAsia)}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="snowball" className="mt-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex gap-3">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900 mb-1">
                              {pickUI("debtSnowball", isCentralAsia)}
                            </p>
                            <p className="text-sm text-blue-700">
                              {pickUI("snowballExplain", isCentralAsia)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="avalanche" className="mt-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex gap-3">
                          <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-900 mb-1">
                              {pickUI("debtAvalanche", isCentralAsia)}
                            </p>
                            <p className="text-sm text-green-700">
                              {pickUI("avalancheExplain", isCentralAsia)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div>
                    <Label
                      htmlFor="extra"
                      className="text-sm font-medium text-gray-700"
                    >
                      {pickUI("extraMonthlyPayment", isCentralAsia)}
                    </Label>
                    <p className="text-xs text-gray-500 mb-2">
                      {pickUI("extraExplain", isCentralAsia)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-medium">$</span>
                      <Input
                        id="extra"
                        type="number"
                        min="0"
                        value={extraPayment || ""}
                        onChange={(e) =>
                          setExtraPayment(Math.max(0, Number(e.target.value) || 0))
                        }
                        className="max-w-[200px]"
                      />
                      <span className="text-sm text-gray-500">
                        {pickUI("perMonth", isCentralAsia)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              {validDebts.length > 0 && result.timeline.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-[#1B2A4A]">
                      {pickUI("payoffTimeline", isCentralAsia)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] md:h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={result.timeline}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="label"
                            tick={{ fontSize: 12 }}
                            interval="preserveStartEnd"
                          />
                          <YAxis
                            tickFormatter={(v) =>
                              `$${(v / 1000).toFixed(0)}k`
                            }
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip
                            formatter={(value: number, name: string) => [
                              formatCurrency(value),
                              name === "totalBalance"
                                ? pickUI("remainingBalance", isCentralAsia)
                                : name === "interestPaid"
                                ? pickUI("interestPaid", isCentralAsia)
                                : name,
                            ]}
                            labelFormatter={(label) => label}
                          />
                          <Legend
                            formatter={(value) =>
                              value === "totalBalance"
                                ? pickUI("remainingBalance", isCentralAsia)
                                : value === "interestPaid"
                                ? pickUI("interestPaid", isCentralAsia)
                                : value
                            }
                          />
                          <Area
                            type="monotone"
                            dataKey="totalBalance"
                            stroke="#1B2A4A"
                            fill="#1B2A4A"
                            fillOpacity={0.2}
                          />
                          <Area
                            type="monotone"
                            dataKey="interestPaid"
                            stroke="#C9922A"
                            fill="#C9922A"
                            fillOpacity={0.15}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Milestones */}
                    {result.milestones.length > 0 && (
                      <div className="mt-6 border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          {pickUI("payoffMilestones", isCentralAsia)}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.milestones.map((m, i) => (
                            <div
                              key={i}
                              className="bg-green-50 border border-green-200 rounded-full px-3 py-1 text-sm text-green-700"
                            >
                              {pickUI("paidOffAtMonth", isCentralAsia)(
                                m.debtName,
                                m.month
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Methodology / formula explanation */}
              {(methodologyBody.length > 0 || footnote) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-[#1B2A4A]">
                      {methodologyHeading}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {methodologyBody.length > 0 && (
                      <div className="prose prose-sm max-w-none">
                        <PortableText
                          value={methodologyBody}
                          components={portableTextComponents}
                        />
                      </div>
                    )}
                    {footnote && (
                      <p className="text-xs text-gray-500 border-t pt-3 mt-3 leading-relaxed">
                        {footnote}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Next steps */}
              {(nextStepsHeading && pageCopy.nextSteps.length > 0) ||
              nextStepsIntro ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-[#1B2A4A]">
                      {nextStepsHeading}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {nextStepsIntro && (
                      <p className="text-gray-700 leading-relaxed">
                        {nextStepsIntro}
                      </p>
                    )}
                    {pageCopy.nextSteps.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pageCopy.nextSteps.map((item) => {
                          const label = getNextStepLabel(item, isCentralAsia);
                          const desc = getNextStepDescription(
                            item,
                            isCentralAsia
                          );
                          const ctaLabel = getNextStepCtaLabel(
                            item,
                            isCentralAsia
                          );
                          const url = item.ctaUrl || "#";
                          const isExternal = /^https?:\/\//i.test(url);
                          return (
                            <div
                              key={item._key ?? label}
                              className="border border-gray-200 rounded-lg p-4 space-y-2"
                            >
                              {label && (
                                <p className="font-semibold text-[#1B2A4A]">
                                  {label}
                                </p>
                              )}
                              {desc && (
                                <p className="text-sm text-gray-600">{desc}</p>
                              )}
                              {ctaLabel && (
                                isExternal ? (
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-[#C9922A] hover:underline"
                                  >
                                    {ctaLabel}
                                    <ArrowRight className="w-3 h-3" />
                                  </a>
                                ) : (
                                  <Link
                                    to={url}
                                    className="inline-flex items-center gap-1 text-sm text-[#C9922A] hover:underline"
                                  >
                                    {ctaLabel}
                                    <ArrowRight className="w-3 h-3" />
                                  </Link>
                                )
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : null}
            </div>

            {/* Right Column: Results */}
            <div className="space-y-6">
              {/* Results Summary */}
              <Card className="border-2 border-[#C9922A]/30 bg-gradient-to-br from-[#1B2A4A]/5 to-[#C9922A]/5">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B2A4A] text-center">
                    {pickUI("yourResults", isCentralAsia)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {validDebts.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">
                      {pickUI("addDebtsHint", isCentralAsia)}
                    </p>
                  ) : (
                    <>
                      <div className="text-center pb-4 border-b">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-[#C9922A]" />
                          <span className="text-sm text-gray-600">
                            {pickUI("debtFreeIn", isCentralAsia)}
                          </span>
                        </div>
                        <div className="text-3xl font-bold text-[#1B2A4A]">
                          {formatMonths(result.months, isCentralAsia)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">
                            {pickUI("totalInterest", isCentralAsia)}
                          </div>
                          <div className="text-lg font-bold text-red-600">
                            {formatCurrency(result.totalInterest)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">
                            {pickUI("totalPaid", isCentralAsia)}
                          </div>
                          <div className="text-lg font-bold text-[#1B2A4A]">
                            {formatCurrency(result.totalPaid)}
                          </div>
                        </div>
                      </div>

                      {interestSaved > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <p className="text-sm text-green-700 mb-1">
                            {pickUI("vsMinimum", isCentralAsia)}
                          </p>
                          <p className="text-xl font-bold text-green-700">
                            {pickUI("save", isCentralAsia)}
                            {formatCurrency(interestSaved)}
                          </p>
                          <p className="text-sm text-green-600">
                            {pickUI("sooner", isCentralAsia)(
                              formatMonths(monthsSaved, isCentralAsia)
                            )}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Strategy Comparison */}
              {validDebts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-[#1B2A4A] flex items-center gap-2">
                      <Percent className="w-4 h-4 text-[#C9922A]" />
                      {pickUI("quickComparison", isCentralAsia)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const snowball = calculatePayoff(
                        validDebts,
                        extraPayment,
                        "snowball"
                      );
                      const avalanche = calculatePayoff(
                        validDebts,
                        extraPayment,
                        "avalanche"
                      );
                      return (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {pickUI("snowballRow", isCentralAsia)}
                            </span>
                            <span className="font-medium">
                              {formatMonths(snowball.months, isCentralAsia)} /{" "}
                              {formatCurrency(snowball.totalInterest)}{" "}
                              {pickUI("intAbbr", isCentralAsia)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {pickUI("avalancheRow", isCentralAsia)}
                            </span>
                            <span className="font-medium">
                              {formatMonths(avalanche.months, isCentralAsia)} /{" "}
                              {formatCurrency(avalanche.totalInterest)}{" "}
                              {pickUI("intAbbr", isCentralAsia)}
                            </span>
                          </div>
                          {snowball.totalInterest !== avalanche.totalInterest && (
                            <p className="text-xs text-gray-500 mt-2 pt-2 border-t">
                              {avalanche.totalInterest < snowball.totalInterest
                                ? pickUI("avalancheSaves", isCentralAsia)(
                                    formatCurrency(
                                      snowball.totalInterest -
                                        avalanche.totalInterest
                                    )
                                  )
                                : pickUI("snowballSaves", isCentralAsia)(
                                    formatCurrency(
                                      avalanche.totalInterest -
                                        snowball.totalInterest
                                    )
                                  )}
                            </p>
                          )}
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {/* Related Resources */}
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-[#1B2A4A]">
                    {relatedResourcesHeading}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pageCopy.relatedResources.map((card) => {
                    const title = getRelatedResourceTitle(card, isCentralAsia);
                    const summary = getRelatedResourceSummary(
                      card,
                      isCentralAsia
                    );
                    const url = card.slug || "#";
                    const isExternal = /^https?:\/\//i.test(url);
                    return (
                      <div
                        key={card._key ?? title}
                        className="block text-sm text-[#1B2A4A] hover:text-[#C9922A] transition-colors"
                      >
                        {isExternal ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-start gap-2"
                          >
                            <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                            <span>
                              <span className="block">{title}</span>
                              {summary && (
                                <span className="block text-xs text-gray-500 mt-0.5">
                                  {summary}
                                </span>
                              )}
                            </span>
                          </a>
                        ) : (
                          <Link to={url} className="flex items-start gap-2">
                            <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                            <span>
                              <span className="block">{title}</span>
                              {summary && (
                                <span className="block text-xs text-gray-500 mt-0.5">
                                  {summary}
                                </span>
                              )}
                            </span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                  <div className="border-t pt-3 mt-3 space-y-2">
                    {primaryLabel && pageCopy.primaryUrl && (
                      <Link to={pageCopy.primaryUrl}>
                        <Button className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
                          {primaryLabel}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    {secondaryLabel && pageCopy.secondaryUrl && (
                      <Link to={pageCopy.secondaryUrl}>
                        <Button variant="outline" className="w-full">
                          {secondaryLabel}
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {(bottomCtaHeading || bottomCtaSubheading) && (
          <div className="bg-[#1B2A4A] text-white py-12 md:py-16">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              {bottomCtaHeading && (
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {bottomCtaHeading}
                </h2>
              )}
              {bottomCtaSubheading && (
                <p className="text-lg text-white/80 mb-6">
                  {bottomCtaSubheading}
                </p>
              )}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {primaryLabel && pageCopy.primaryUrl && (
                  <Link to={pageCopy.primaryUrl}>
                    <Button className="w-full sm:w-auto bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
                      {primaryLabel}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                )}
                {secondaryLabel && pageCopy.secondaryUrl && (
                  <Link to={pageCopy.secondaryUrl}>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10"
                    >
                      {secondaryLabel}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DebtCalculator;
