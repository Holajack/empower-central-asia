import { useState, useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Heart, Star } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CourseLayout from "@/components/course/CourseLayout";
import DayContent from "@/components/course/DayContent";
import SectionNav from "@/components/course/SectionNav";
import CohortCTA from "@/components/course/CohortCTA";
import ReviewModal from "@/components/course/ReviewModal";
import { getWeekFullContent, weekFullContents } from "@/data/course";
import { financialLiteracyRelatedPosts } from "@/data/course/relatedBlogPosts";
import { blogPosts } from "@/data/blogPosts";
import { useRegion } from "@/contexts/RegionContext";
import { useCourseWeek } from "@/hooks/useCourse";
import { useCourseWeekLessons } from "@/hooks/useCourseLesson";

// Lazy-load worksheet components
const FinancialSnapshot = lazy(() => import("@/components/course/worksheets/FinancialSnapshot"));
const IncomeMap = lazy(() => import("@/components/course/worksheets/IncomeMap"));
const ZeroBasedBudget = lazy(() => import("@/components/course/worksheets/ZeroBasedBudget"));
const DebtInventory = lazy(() => import("@/components/course/worksheets/DebtInventory"));
const EmergencyFundPlan = lazy(() => import("@/components/course/worksheets/EmergencyFundPlan"));
const ProgressReview = lazy(() => import("@/components/course/worksheets/ProgressReview"));

import {
  getWorksheet1Percent,
  getWorksheet2Percent,
  getWorksheet3Percent,
  getWorksheet4Percent,
  getWorksheet5Percent,
  getWorksheet6Percent,
} from "@/components/course/worksheets/worksheetPercent";

const worksheetComponents: Record<number, React.LazyExoticComponent<React.ComponentType>> = {
  1: FinancialSnapshot,
  2: IncomeMap,
  3: ZeroBasedBudget,
  4: DebtInventory,
  5: EmergencyFundPlan,
  6: ProgressReview,
};

const worksheetPercentFns: Record<number, () => number> = {
  1: getWorksheet1Percent,
  2: getWorksheet2Percent,
  3: getWorksheet3Percent,
  4: getWorksheet4Percent,
  5: getWorksheet5Percent,
  6: getWorksheet6Percent,
};

const TOTAL_WEEKS = 6;
const DAYS_PER_WEEK = 6;

interface CourseProgress {
  currentWeek: number;
  completedWeeks: number[];
  completedDays: Record<number, number[]>;
  objectivesChecked: Record<number, number[]>;
  actionItemsChecked: Record<number, number[]>;
  currentDay: Record<number, number>;
  startedAt: string;
  lastVisited: string;
}

const PROGRESS_KEY = "bbb-course-progress";

function loadProgress(): CourseProgress {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        completedDays: parsed.completedDays || {},
        currentDay: parsed.currentDay || {},
        actionItemsChecked: parsed.actionItemsChecked || {},
      };
    }
  } catch {}
  return {
    currentWeek: 1,
    completedWeeks: [],
    completedDays: {},
    objectivesChecked: {},
    actionItemsChecked: {},
    currentDay: {},
    startedAt: new Date().toISOString(),
    lastVisited: new Date().toISOString(),
  };
}

function saveProgress(progress: CourseProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

const CourseWeek = () => {
  const { week: weekParam } = useParams<{ week: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const weekNum = parseInt(weekParam || "1", 10);
  const weekData = getWeekFullContent(weekNum);
  const { isCentralAsia, isRegionCentralAsia } = useRegion();

  // Sanity overlay — falls back to hardcoded weekData when null.
  const { week: sanityWeek } = useCourseWeek("financial-literacy", weekNum);
  const { lessons: sanityLessons } = useCourseWeekLessons({
    course: "financial-literacy",
    weekNumber: weekNum,
  });
  const weekTitle = sanityWeek ? sanityWeek.getTitle(isCentralAsia) : (weekData?.title ?? "");
  const weekSubtitle = sanityWeek ? sanityWeek.getSubtitle(isCentralAsia) : (weekData?.subtitle ?? "");
  const weekKeyQuote = sanityWeek ? sanityWeek.getKeyQuote(isCentralAsia) : (weekData?.keyQuote ?? "");
  const weekQuoteAuthor = sanityWeek?.quoteAuthor ?? weekData?.quoteAuthor ?? "";
  const weekOverview = sanityWeek ? sanityWeek.getOverview(isCentralAsia) : (weekData?.overview ?? "");
  const weekObjectives = sanityWeek ? sanityWeek.getObjectives(isCentralAsia) : (weekData?.objectives ?? []);
  const weekActionItems = sanityWeek ? sanityWeek.getActionItems(isCentralAsia) : (weekData?.actionItems ?? []);

  const [progress, setProgress] = useState<CourseProgress>(loadProgress);
  const [showReview, setShowReview] = useState(false);

  // Day state — Day 0 is the intro for Week 1
  const dayFromUrl = parseInt(searchParams.get("day") || "-1", 10);
  const [currentDay, setCurrentDay] = useState(() => {
    if (dayFromUrl >= 0 && dayFromUrl <= DAYS_PER_WEEK) return dayFromUrl;
    return progress.currentDay[weekNum] || (weekNum === 1 ? 0 : 1);
  });

  const [worksheetPercent, setWorksheetPercent] = useState(0);

  useEffect(() => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        currentWeek: weekNum,
        currentDay: { ...prev.currentDay, [weekNum]: currentDay },
        lastVisited: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
    const fn = worksheetPercentFns[weekNum];
    if (fn) setWorksheetPercent(fn());
  }, [weekNum, currentDay]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fn = worksheetPercentFns[weekNum];
      if (fn) setWorksheetPercent(fn());
    }, 2000);
    return () => clearInterval(interval);
  }, [weekNum]);

  // Reset day when week changes
  useEffect(() => {
    const minDay = weekNum === 1 ? 0 : 1;
    const day = dayFromUrl >= minDay && dayFromUrl <= DAYS_PER_WEEK
      ? dayFromUrl
      : progress.currentDay[weekNum] || (weekNum === 1 ? 0 : 1);
    setCurrentDay(day);
  }, [weekNum]);

  if (!weekData || weekNum < 1 || weekNum > TOTAL_WEEKS) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {isCentralAsia ? "Неделя не найдена" : "Week not found"}
          </h1>
          <Link to="/course/financial-literacy">
            <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
              {isCentralAsia ? "Вернуться к курсу" : "Back to Course"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isUnlocked = weekNum === 1 || progress.completedWeeks.includes(weekNum - 1);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {isCentralAsia ? `Неделя ${weekNum} заблокирована` : `Week ${weekNum} is Locked`}
          </h1>
          <p className="text-gray-600 mb-6">
            {isCentralAsia
              ? `Сначала завершите неделю ${weekNum - 1}, чтобы открыть этот контент.`
              : `Complete Week ${weekNum - 1} first to unlock this content.`}
          </p>
          <Link to={`/course/financial-literacy/${weekNum - 1}`}>
            <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
              {isCentralAsia ? `Перейти к неделе ${weekNum - 1}` : `Go to Week ${weekNum - 1}`}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const checkedObjectives = progress.objectivesChecked[weekNum] || [];
  const checkedActions = progress.actionItemsChecked[weekNum] || [];
  const completedDaysForWeek = progress.completedDays[weekNum] || [];
  const isDayComplete = completedDaysForWeek.includes(currentDay);

  function toggleObjective(index: number) {
    setProgress((prev) => {
      const current = prev.objectivesChecked[weekNum] || [];
      const updated = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];
      const newProgress = {
        ...prev,
        objectivesChecked: { ...prev.objectivesChecked, [weekNum]: updated },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }

  function toggleAction(index: number) {
    setProgress((prev) => {
      const current = prev.actionItemsChecked[weekNum] || [];
      const updated = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];
      const newProgress = {
        ...prev,
        actionItemsChecked: { ...prev.actionItemsChecked, [weekNum]: updated },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }

  function completeDay() {
    setProgress((prev) => {
      const currentDays = prev.completedDays[weekNum] || [];
      if (currentDays.includes(currentDay)) return prev;

      const updatedDays = [...currentDays, currentDay].sort((a, b) => a - b);
      const newCompletedDays = { ...prev.completedDays, [weekNum]: updatedDays };

      // If Day 6 is completed, mark the whole week as complete
      const weekComplete = updatedDays.includes(DAYS_PER_WEEK);
      const completedWeeks = weekComplete && !prev.completedWeeks.includes(weekNum)
        ? [...prev.completedWeeks, weekNum].sort((a, b) => a - b)
        : prev.completedWeeks;

      const newProgress = {
        ...prev,
        completedDays: newCompletedDays,
        completedWeeks,
      };
      saveProgress(newProgress);
      return newProgress;
    });

    if (currentDay < DAYS_PER_WEEK) {
      navigateDay(currentDay + 1);
    }
  }

  function navigateDay(day: number) {
    setCurrentDay(day);
    setSearchParams({ day: String(day) }, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectDay(week: number, day: number) {
    if (week !== weekNum) {
      window.location.href = `/course/financial-literacy/${week}?day=${day}`;
      return;
    }
    navigateDay(day);
  }

  // Build week info for sidebar
  const weeks = weekFullContents.map((w) => ({
    weekNum: w.week,
    title: w.title,
  }));

  // Look up the Sanity lesson for the current day, if any. Lessons may
  // override per-day metadata (related blog posts, worksheet, video).
  const currentLesson = sanityLessons.find((l) => l.dayNumber === currentDay);

  // Per-day related blog post slugs come from the Sanity lesson when present,
  // otherwise fall back to the hardcoded week-level mapping.
  const relatedSlugsForDay = currentLesson?.relatedBlogPostSlugs
    ?? financialLiteracyRelatedPosts[weekNum]
    ?? [];

  // Worksheet component for day 4
  const WorksheetComp = worksheetComponents[weekNum];
  const worksheetNode = WorksheetComp ? (
    <Suspense
      fallback={
        <div className="animate-pulse bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-400">
            {isCentralAsia ? "Загрузка рабочего листа..." : "Loading worksheet..."}
          </p>
        </div>
      }
    >
      <WorksheetComp />
    </Suspense>
  ) : null;

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? `Неделя ${weekNum}, День ${currentDay}: ${weekTitle} - Курс финансовой грамотности | Businesses Beyond Borders`
            : `Week ${weekNum}, Day ${currentDay}: ${weekTitle} - Financial Literacy Course | Businesses Beyond Borders`}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? `${weekSubtitle || weekOverview}. Бесплатный онлайн-курс финансовой грамотности от Businesses Beyond Borders.`
              : `${weekSubtitle || weekOverview}. Free online financial literacy course from Businesses Beyond Borders.`
          }
        />
        <link
          rel="canonical"
          href={`https://businessesbeyondborders.com/course/financial-literacy/${weekNum}`}
        />
      </Helmet>

      <CourseLayout
        courseTitle={isCentralAsia ? "Финансовая грамотность" : "Financial Literacy"}
        coursePath="/course/financial-literacy"
        weeks={weeks}
        currentWeek={weekNum}
        currentDay={currentDay}
        totalDaysPerWeek={DAYS_PER_WEEK}
        completedWeeks={progress.completedWeeks}
        completedDays={progress.completedDays}
        onSelectDay={handleSelectDay}
        onLeaveReview={() => setShowReview(true)}
        isCentralAsia={isCentralAsia}
      >
        {/* Day 0: Intro — Week 1 only */}
        {weekNum === 1 && currentDay === 0 ? (
          <div className="space-y-8">
            {/* Intro Video Placeholder */}
            <div className="relative rounded-xl overflow-hidden bg-[#1B2A4A] aspect-video flex items-center justify-center">
              <div className="absolute top-3 right-3 bg-[#C9922A] text-white text-xs font-bold px-3 py-1 rounded-full">
                {isCentralAsia ? "Скоро видео" : "Video Coming Soon"}
              </div>
              <div className="text-center text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-sm text-white/70">{isCentralAsia ? "Введение · Добро пожаловать" : "Introduction · Welcome"}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-4">
                {isCentralAsia ? "Добро пожаловать на курс финансовой грамотности!" : "Welcome to the Financial Literacy Course!"}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  {isCentralAsia
                    ? "Мы рады, что вы здесь — независимо от того, пришли ли вы по рекомендации друга, нашли нас онлайн или просто решили взять свои финансы под контроль. Этот курс создан для вас."
                    : "We're glad you're here — whether a friend told you about us, you found us online, or you just decided it's time to take control of your money. This course was built for you."}
                </p>
                <p>
                  {isCentralAsia
                    ? "В следующие 6 недель вы пройдёте практическое обучение финансовой грамотности, которое действительно работает. Никакого жаргона, никаких скрытых платежей — просто чёткие, понятные уроки, которые помогут вам строить прочный финансовый фундамент."
                    : "Over the next 6 weeks, you'll go through practical financial education that actually works. No jargon, no hidden fees — just clear, actionable lessons that will help you build a stronger financial foundation."}
                </p>
              </div>
            </div>

            {/* What to Expect */}
            <Card className="border-[#C9922A]/30 bg-gradient-to-br from-white to-[#C9922A]/5">
              <CardContent className="py-6">
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">
                  {isCentralAsia ? "Что вас ждёт" : "Here's What to Expect"}
                </h3>
                <div className="space-y-3">
                  {[
                    { week: 1, titleEn: "Your Money, Your Story", titleRu: "Ваши деньги, ваша история", descEn: "Honest self-assessment — see where you really stand.", descRu: "Честная самооценка — узнайте, где вы на самом деле." },
                    { week: 2, titleEn: "Identity & Work", titleRu: "Идентичность и работа", descEn: "Build your worth on something deeper than your bank balance.", descRu: "Постройте свою ценность на чём-то более глубоком, чем баланс." },
                    { week: 3, titleEn: "Building a Budget", titleRu: "Создание бюджета", descEn: "Tell your money where to go instead of wondering where it went.", descRu: "Направляйте деньги, а не гадайте, куда они делись." },
                    { week: 4, titleEn: "Destroying Debt", titleRu: "Уничтожение долгов", descEn: "Break the chains that keep you from financial freedom.", descRu: "Разорвите цепи, мешающие финансовой свободе." },
                    { week: 5, titleEn: "Saving & Giving", titleRu: "Накопления и щедрость", descEn: "Build margin so you can be generous when it matters.", descRu: "Создайте запас, чтобы быть щедрым, когда это важно." },
                    { week: 6, titleEn: "Multiply Your Impact", titleRu: "Умножьте влияние", descEn: "Build a legacy of financial wisdom that ripples outward.", descRu: "Создайте наследие финансовой мудрости." },
                  ].map((w) => (
                    <div key={w.week} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {w.week}
                      </div>
                      <div>
                        <p className="font-medium text-[#1B2A4A] text-sm">{isCentralAsia ? w.titleRu : w.titleEn}</p>
                        <p className="text-xs text-gray-500">{isCentralAsia ? w.descRu : w.descEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How Each Week Works */}
            <div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-3">
                {isCentralAsia ? "Как устроена каждая неделя" : "How Each Week Works"}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { dayEn: "Day 1", dayRu: "День 1", labelEn: "Overview & Introduction", labelRu: "Обзор и введение" },
                  { dayEn: "Days 2-3", dayRu: "Дни 2-3", labelEn: "Lesson Deep Dives", labelRu: "Погружение в урок" },
                  { dayEn: "Day 4", dayRu: "День 4", labelEn: "Worksheet", labelRu: "Рабочий лист" },
                  { dayEn: "Day 5", dayRu: "День 5", labelEn: "Practice & Apply", labelRu: "Практика" },
                  { dayEn: "Day 6", dayRu: "День 6", labelEn: "Week Wrap-Up", labelRu: "Итоги недели" },
                ].map((d, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-[#C9922A]">{isCentralAsia ? d.dayRu : d.dayEn}</p>
                    <p className="text-xs text-gray-600 mt-1">{isCentralAsia ? d.labelRu : d.labelEn}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Encouragement */}
            <Card className="border-l-4 border-l-[#C9922A] bg-[#C9922A]/5">
              <CardContent className="py-5">
                <p className="text-gray-700 leading-relaxed">
                  {isCentralAsia
                    ? "Вам не нужен финансовый опыт. Вам не нужно ничего покупать. Единственное, что вам нужно — это готовность быть честным с собой о том, где вы сейчас, и готовность делать следующий шаг. Давайте начнём."
                    : "You don't need financial experience. You don't need to buy anything. All you need is a willingness to be honest with yourself about where you are and a willingness to take the next step. Let's get started."}
                </p>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button
                onClick={() => {
                  // Mark intro as complete
                  setProgress((prev) => {
                    const currentDays = prev.completedDays[1] || [];
                    if (!currentDays.includes(0)) {
                      const updated = { ...prev, completedDays: { ...prev.completedDays, 1: [...currentDays, 0].sort((a, b) => a - b) } };
                      saveProgress(updated);
                      return updated;
                    }
                    return prev;
                  });
                  navigateDay(1);
                }}
                size="lg"
                className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-10 py-4 text-lg"
              >
                {isCentralAsia ? "Начать День 1" : "Start Day 1"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        ) : (
        <DayContent
          weekNum={weekNum}
          dayNum={currentDay}
          totalDays={DAYS_PER_WEEK}
          weekTitle={weekTitle}
          lessonSections={weekData.lessonSections}
          story={weekData.story}
          storyCentralAsia={weekData.storyCentralAsia}
          reflectionQuestions={weekData.reflectionQuestions}
          actionItems={weekActionItems.length > 0 ? weekActionItems : weekData.actionItems}
          objectives={weekObjectives.length > 0 ? weekObjectives : weekData.objectives}
          keyQuote={
            currentLesson?.getKeyQuote(isCentralAsia) ||
            weekKeyQuote ||
            weekData.keyQuote
          }
          quoteAuthor={weekQuoteAuthor || weekData.quoteAuthor}
          overview={weekOverview || weekData.overview}
          worksheetComponent={worksheetNode}
          toolLink={weekData.toolLink}
          toolLabel={weekData.toolLabel}
          relatedBlogPosts={relatedSlugsForDay.map((slug) => {
            const post = blogPosts.find((p) => p.slug === slug);
            return { slug, title: post?.title || slug };
          })}
          storyCharacter={isCentralAsia && weekData.storyCentralAsia ? "Бакыт и Айнура" : isCentralAsia ? "Генри и Грейс" : "Henry & Grace"}
          storyIntro={
            isCentralAsia && weekData.storyCentralAsia
              ? "Следите за путешествием Бакыта и Айнуры к финансовому преображению — история, которая может показаться знакомой."
              : isCentralAsia
                ? "Следите за путешествием Генри и Грейс к финансовому преображению — история, которая может показаться знакомой."
                : "Follow Henry and Grace's journey through financial transformation -- a story that might feel familiar."
          }
          checkedObjectives={checkedObjectives}
          checkedActions={checkedActions}
          isDayComplete={isDayComplete}
          onToggleObjective={toggleObjective}
          onToggleAction={toggleAction}
          onCompleteDay={completeDay}
          onNavigateDay={navigateDay}
          isCentralAsia={isCentralAsia}
        />
        )}

        {/* Cohort CTA and extras only on Day 6 */}
        {currentDay === DAYS_PER_WEEK && (
          <>
            <div className="mt-8">
              <CohortCTA />
            </div>

            {!isRegionCentralAsia && (
              <Card className="mt-8 bg-gradient-to-br from-[#1B2A4A]/5 to-[#C9922A]/5 border border-[#C9922A]/20 no-print">
                <CardContent className="py-6">
                  <div className="text-center space-y-4">
                    <p className="text-gray-700 font-medium">Is this course helping you?</p>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                      This course is 100% free because of people who believe in financial education for everyone.
                      If it's making a difference for you, here are two small ways to pay it forward:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <DonateButton
                        size="sm"
                        className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Leave a Donation
                      </DonateButton>
                      <a
                        href="https://g.page/r/businessesbeyondborders/review"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#1B2A4A]/30 text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white"
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Leave a Google Review
                        </Button>
                      </a>
                    </div>
                    <p className="text-xs text-gray-400">Every bit helps -- donations start at $3</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Week Navigation */}
            <div className="flex items-center justify-between pt-8 no-print">
              {weekNum > 1 ? (
                <Link to={`/course/financial-literacy/${weekNum - 1}`}>
                  <Button variant="outline" className="border-gray-300 text-gray-600">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    {isCentralAsia ? `Неделя ${weekNum - 1}` : `Week ${weekNum - 1}`}
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {weekNum < TOTAL_WEEKS ? (
                <Link to={`/course/financial-literacy/${weekNum + 1}`}>
                  <Button
                    className={
                      progress.completedWeeks.includes(weekNum)
                        ? "bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                    disabled={!progress.completedWeeks.includes(weekNum)}
                  >
                    {isCentralAsia ? `Неделя ${weekNum + 1}` : `Week ${weekNum + 1}`}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link to="/course/financial-literacy">
                  <Button className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white">
                    {isCentralAsia ? "Вернуться к обзору" : "Back to Overview"}
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </CourseLayout>

      {/* Mobile bottom day nav */}
      <SectionNav
        totalDays={DAYS_PER_WEEK}
        currentDay={currentDay}
        completedDays={completedDaysForWeek}
        onSelectDay={navigateDay}
        isCentralAsia={isCentralAsia}
      />

      {/* Review Modal */}
      {showReview && (
        <ReviewModal
          courseName={isCentralAsia ? "Финансовая грамотность" : "Financial Literacy"}
          userName={undefined}
          onClose={() => setShowReview(false)}
        />
      )}
    </>
  );
};

export default CourseWeek;
