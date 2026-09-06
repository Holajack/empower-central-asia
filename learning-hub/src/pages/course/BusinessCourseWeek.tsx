import { useState, useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Heart, Star } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CourseLayout from "@/components/course/CourseLayout";
import CourseWeekGate from "@/components/auth/CourseWeekGate";
import { useProgressSync } from "@/hooks/useProgressSync";
import DayContent from "@/components/course/DayContent";
import SectionNav from "@/components/course/SectionNav";
import CohortCTA from "@/components/course/CohortCTA";
import FourHatsCheckpoint from "@/components/business-course/FourHatsCheckpoint";
import ReviewModal from "@/components/course/ReviewModal";
import type { BusinessWeekContent } from "@/data/business-course";
import { getLocalizedWeek, getLocalizedWeeks } from "@/data/ru";
import { businessCreationRelatedPosts } from "@/data/course/relatedBlogPosts";
import { blogPosts } from "@/data/blogPosts";
import { useRegion } from "@/contexts/RegionContext";
import { useCourseWeek } from "@/hooks/useCourse";
// TODO(agent-q follow-up): once Agent P's `useCourseWeekLessons` hook lands on
// main, wire it in here so per-day lesson content is sourced from the
// `courseLesson` Sanity docs created by `scripts/migrate-course-lessons-business.mts`.
// Expected signature: useCourseWeekLessons({ course: "business-creation", weekNumber })
// → { lessons: CourseLessonDoc[] | null, isLoading: boolean }
// Fallback path: when `lessons` is null/empty, keep current `weekData` rendering.

// Lazy-load worksheet components
const AssumptionMapper = lazy(() => import("@/components/business-course/worksheets/AssumptionMapper"));
const ProductivityBlueprint = lazy(() => import("@/components/business-course/worksheets/ProductivityBlueprint"));
const OpportunityCanvas = lazy(() => import("@/components/business-course/worksheets/OpportunityCanvas"));
const BusinessModelCanvas = lazy(() => import("@/components/business-course/worksheets/BusinessModelCanvas"));
const ValuePropositionCanvas = lazy(() => import("@/components/business-course/worksheets/ValuePropositionCanvas"));
const CustomerDiscoveryKit = lazy(() => import("@/components/business-course/worksheets/CustomerDiscoveryKit"));
const FinancialDashboard = lazy(() => import("@/components/business-course/worksheets/FinancialDashboard"));
const PitchBuilder = lazy(() => import("@/components/business-course/worksheets/PitchBuilder"));
const ValidationDesigner = lazy(() => import("@/components/business-course/worksheets/ValidationDesigner"));
const MVPBlueprint = lazy(() => import("@/components/business-course/worksheets/MVPBlueprint"));
const TractionPlanner = lazy(() => import("@/components/business-course/worksheets/TractionPlanner"));
const FinalBusinessPlan = lazy(() => import("@/components/business-course/worksheets/FinalBusinessPlan"));

const worksheetComponents: Record<number, React.LazyExoticComponent<React.ComponentType>> = {
  1: AssumptionMapper,
  2: ProductivityBlueprint,
  3: OpportunityCanvas,
  4: BusinessModelCanvas,
  5: ValuePropositionCanvas,
  6: CustomerDiscoveryKit,
  7: FinancialDashboard,
  8: PitchBuilder,
  9: ValidationDesigner,
  10: MVPBlueprint,
  11: TractionPlanner,
  12: FinalBusinessPlan,
};

import {
  getBusinessWorksheet1Percent,
  getBusinessWorksheet2Percent,
  getBusinessWorksheet3Percent,
  getBusinessWorksheet4Percent,
  getBusinessWorksheet5Percent,
  getBusinessWorksheet6Percent,
  getBusinessWorksheet7Percent,
  getBusinessWorksheet8Percent,
  getBusinessWorksheet9Percent,
  getBusinessWorksheet10Percent,
  getBusinessWorksheet11Percent,
  getBusinessWorksheet12Percent,
} from "@/components/business-course/worksheets/worksheetPercent";
import { siteConfig } from "@/lib/seo";

const worksheetPercentFns: Record<number, () => number> = {
  1: getBusinessWorksheet1Percent,
  2: getBusinessWorksheet2Percent,
  3: getBusinessWorksheet3Percent,
  4: getBusinessWorksheet4Percent,
  5: getBusinessWorksheet5Percent,
  6: getBusinessWorksheet6Percent,
  7: getBusinessWorksheet7Percent,
  8: getBusinessWorksheet8Percent,
  9: getBusinessWorksheet9Percent,
  10: getBusinessWorksheet10Percent,
  11: getBusinessWorksheet11Percent,
  12: getBusinessWorksheet12Percent,
};

const TOTAL_WEEKS = 12;
const DAYS_PER_WEEK = 6;

interface BusinessProgress {
  currentWeek: number;
  completedWeeks: number[];
  completedDays: Record<number, number[]>;
  objectivesChecked: Record<number, number[]>;
  actionItemsChecked: Record<number, number[]>;
  currentDay: Record<number, number>;
  startedAt: string;
  lastVisited: string;
}

const PROGRESS_KEY = "bbb-business-progress";

function loadProgress(): BusinessProgress {
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

function saveProgress(progress: BusinessProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

const BusinessCourseWeek = () => {
  const { week: weekParam } = useParams<{ week: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const weekNum = parseInt((weekParam || "1").replace(/^week-/, ""), 10);
  const { isCentralAsia, isRegionCentralAsia, language } = useRegion();
  const weekData = getLocalizedWeek<BusinessWeekContent>("business-creation", weekNum, language);

  // Sanity overlay — falls back to hardcoded weekData when null.
  const { week: sanityWeek } = useCourseWeek("business-creation", weekNum);
  const weekTitle = sanityWeek ? sanityWeek.getTitle(isCentralAsia) : (weekData?.title ?? "");
  const weekSubtitle = sanityWeek ? sanityWeek.getSubtitle(isCentralAsia) : (weekData?.subtitle ?? "");
  const weekKeyQuote = sanityWeek ? sanityWeek.getKeyQuote(isCentralAsia) : (weekData?.keyQuote ?? "");
  const weekQuoteAuthor = sanityWeek?.quoteAuthor ?? weekData?.quoteAuthor ?? "";
  const weekOverview = sanityWeek ? sanityWeek.getOverview(isCentralAsia) : (weekData?.overview ?? "");
  const weekObjectives = sanityWeek ? sanityWeek.getObjectives(isCentralAsia) : (weekData?.objectives ?? []);
  const weekActionItems = sanityWeek ? sanityWeek.getActionItems(isCentralAsia) : (weekData?.actionItems ?? []);
  const weekModuleTitle = sanityWeek ? sanityWeek.getModuleTitle(isCentralAsia) : "";

  const [progress, setProgress] = useState<BusinessProgress>(loadProgress);
  useProgressSync("business-creation", progress, (merged) => {
    setProgress(merged);
    saveProgress(merged);
  });
  const [showReview, setShowReview] = useState(false);

  // Day state: read from URL param or progress, default to 1
  const dayFromUrl = parseInt(searchParams.get("day") || "0", 10);
  const [currentDay, setCurrentDay] = useState(() => {
    if (dayFromUrl >= 1 && dayFromUrl <= DAYS_PER_WEEK) return dayFromUrl;
    return progress.currentDay[weekNum] || 1;
  });

  // Worksheet percent (for completion gate on day 6)
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

  // Poll worksheet percent
  useEffect(() => {
    const interval = setInterval(() => {
      const fn = worksheetPercentFns[weekNum];
      if (fn) setWorksheetPercent(fn());
    }, 2000);
    return () => clearInterval(interval);
  }, [weekNum]);

  // Reset day when week changes
  useEffect(() => {
    const day = dayFromUrl >= 1 && dayFromUrl <= DAYS_PER_WEEK
      ? dayFromUrl
      : progress.currentDay[weekNum] || 1;
    setCurrentDay(day);
  }, [weekNum]);

  if (!weekData || weekNum < 1 || weekNum > TOTAL_WEEKS) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {isCentralAsia ? "Неделя не найдена" : "Week not found"}
          </h1>
          <Link to="/course/business-creation">
            <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
              {isCentralAsia ? "Вернуться к курсу" : "Back to Course"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Week gating
  const isUnlocked = weekNum === 1 || progress.completedWeeks.includes(weekNum - 1);

  if (!isUnlocked) {
    return (
      <CourseWeekGate
        courseTitle={isCentralAsia ? "Создание бизнеса" : "Business Creation"}
        coursePath="/course/business-creation"
        weekNum={weekNum}
        weekTitle={weekTitle}
        weekSubtitle={weekSubtitle}
        overview={weekOverview}
        objectives={weekObjectives}
        pageTitle={isCentralAsia ? `Неделя ${weekNum}, День ${currentDay}: ${weekTitle} - Курс создания бизнеса | ${siteConfig.name}` : `Week ${weekNum}, Day ${currentDay}: ${weekTitle} - Business Creation Course | ${siteConfig.name}`}
        pageDescription={isCentralAsia ? `${weekSubtitle || weekOverview}. Бесплатный онлайн-курс создания бизнеса от ${siteConfig.name}.` : `${weekSubtitle || weekOverview}. Free online business creation course from ${siteConfig.name}.`}
      >
      <Helmet>
        <title>{isCentralAsia ? `Неделя ${weekNum}, День ${currentDay}: ${weekTitle} - Курс создания бизнеса | ${siteConfig.name}` : `Week ${weekNum}, Day ${currentDay}: ${weekTitle} - Business Creation Course | ${siteConfig.name}`}</title>
        <meta name="description" content={isCentralAsia ? `${weekSubtitle || weekOverview}. Бесплатный онлайн-курс создания бизнеса от ${siteConfig.name}.` : `${weekSubtitle || weekOverview}. Free online business creation course from ${siteConfig.name}.`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {isCentralAsia ? `Неделя ${weekNum} заблокирована` : `Week ${weekNum} is Locked`}
          </h1>
          <p className="text-gray-600 mb-6">
            {isCentralAsia
              ? `Сначала завершите неделю ${weekNum - 1}, чтобы открыть этот контент.`
              : `Complete Week ${weekNum - 1} first to unlock this content.`}
          </p>
          <Link to={`/course/business-creation/week-${weekNum - 1}`}>
            <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
              {isCentralAsia ? `Перейти к неделе ${weekNum - 1}` : `Go to Week ${weekNum - 1}`}
            </Button>
          </Link>
        </div>
      </div>
      </CourseWeekGate>
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

    // Auto-advance to next day if not on day 6
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
      window.location.href = `${isCentralAsia ? "/ru" : ""}/course/business-creation/week-${week}?day=${day}`;
      return;
    }
    navigateDay(day);
  }

  // Build week info for sidebar
  const weeks = getLocalizedWeeks<BusinessWeekContent>("business-creation", language).map((w) => ({
    weekNum: w.week,
    title: w.title,
  }));

  // Get worksheet component for day 4
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

  // Four Hats component for day 5 (weeks 3, 6, 9, 12)
  const fourHatsNode = weekData.fourHatsCheckpoint ? (
    <FourHatsCheckpoint weekNum={weekNum} checkpoint={weekData.fourHatsCheckpoint} />
  ) : null;

  const moduleBadge = weekModuleTitle
    ? weekModuleTitle
    : isCentralAsia
      ? `Модуль ${weekData.module.number}: ${weekData.module.title}`
      : `Module ${weekData.module.number}: ${weekData.module.title}`;

  return (
    <CourseWeekGate
      courseTitle={isCentralAsia ? "Создание бизнеса" : "Business Creation"}
      coursePath="/course/business-creation"
      weekNum={weekNum}
      weekTitle={weekTitle}
      weekSubtitle={weekSubtitle}
      overview={weekOverview}
      objectives={weekObjectives}
      pageTitle={isCentralAsia ? `Неделя ${weekNum}, День ${currentDay}: ${weekTitle} - Курс создания бизнеса | ${siteConfig.name}` : `Week ${weekNum}, Day ${currentDay}: ${weekTitle} - Business Creation Course | ${siteConfig.name}`}
      pageDescription={isCentralAsia ? `${weekSubtitle || weekOverview}. Бесплатный онлайн-курс создания бизнеса от ${siteConfig.name}.` : `${weekSubtitle || weekOverview}. Free online business creation course from ${siteConfig.name}.`}
    >
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? `Неделя ${weekNum}, День ${currentDay}: ${weekTitle} - Курс создания бизнеса | ${siteConfig.name}`
            : `Week ${weekNum}, Day ${currentDay}: ${weekTitle} - Business Creation Course | ${siteConfig.name}`}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? `${weekSubtitle || weekOverview}. Бесплатный онлайн-курс создания бизнеса от ${siteConfig.name}.`
              : `${weekSubtitle || weekOverview}. Free online business creation course from ${siteConfig.name}.`
          }
        />
      </Helmet>

      <CourseLayout
        courseTitle={isCentralAsia ? "Создание бизнеса" : "Business Creation"}
        coursePath="/course/business-creation"
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
        <DayContent
          courseSlug="business-creation"
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
          keyQuote={weekKeyQuote || weekData.keyQuote}
          quoteAuthor={weekQuoteAuthor || weekData.quoteAuthor}
          overview={weekOverview || weekData.overview}
          worksheetComponent={worksheetNode}
          fourHatsComponent={fourHatsNode}
          realWorldActivity={weekData.realWorldActivity}
          toolLink={weekData.toolLink}
          toolLabel={weekData.toolLabel}
          relatedBlogPosts={(businessCreationRelatedPosts[weekNum] || []).map(slug => {
            const post = blogPosts.find(p => p.slug === slug);
            return { slug, title: post?.title || slug };
          })}
          storyCharacter={isCentralAsia ? "Айжан" : "Aijan"}
          storyIntro={
            isCentralAsia
              ? "Следите за путешествием Айжан от бухгалтера к предпринимателю — история, которая может показаться знакомой."
              : "Follow Aijan's journey from accountant to entrepreneur -- a story that might feel familiar."
          }
          moduleBadge={moduleBadge}
          checkedObjectives={checkedObjectives}
          checkedActions={checkedActions}
          isDayComplete={isDayComplete}
          onToggleObjective={toggleObjective}
          onToggleAction={toggleAction}
          onCompleteDay={completeDay}
          onNavigateDay={navigateDay}
          isCentralAsia={isCentralAsia}
        />

        {/* Cohort CTA (after day 6 content) */}
        {currentDay === DAYS_PER_WEEK && (
          <>
            <div className="mt-8">
              <CohortCTA />
            </div>

            {/* Soft Ask */}
            {!isRegionCentralAsia && (
              <Card className="mt-8 bg-gradient-to-br from-[#1B2A4A]/5 to-[#C9922A]/5 border border-[#C9922A]/20 no-print">
                <CardContent className="py-6">
                  <div className="text-center space-y-4">
                    <p className="text-gray-700 font-medium">Is this course helping you?</p>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                      This course is 100% free because of people who believe in entrepreneurship education for everyone.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <DonateButton
                        size="sm"
                        className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Leave a Donation
                      </DonateButton>
                      {siteConfig.reviewUrl && (

                      <a

                        href={siteConfig.reviewUrl}

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

                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Week Navigation */}
            <div className="flex items-center justify-between pt-8 no-print">
              {weekNum > 1 ? (
                <Link to={`/course/business-creation/week-${weekNum - 1}`}>
                  <Button variant="outline" className="border-gray-300 text-gray-600">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    {isCentralAsia ? `Неделя ${weekNum - 1}` : `Week ${weekNum - 1}`}
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {weekNum < TOTAL_WEEKS ? (
                <Link to={`/course/business-creation/week-${weekNum + 1}`}>
                  <Button
                    className={
                      progress.completedWeeks.includes(weekNum)
                        ? "bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                    disabled={!progress.completedWeeks.includes(weekNum)}
                  >
                    {isCentralAsia ? `Неделя ${weekNum + 1}` : `Week ${weekNum + 1}`}
                  </Button>
                </Link>
              ) : (
                <Link to="/course/business-creation">
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
          courseName={isCentralAsia ? "Создание бизнеса" : "Business Creation"}
          userName={undefined}
          onClose={() => setShowReview(false)}
        />
      )}
    </>
    </CourseWeekGate>
  );
};

export default BusinessCourseWeek;
