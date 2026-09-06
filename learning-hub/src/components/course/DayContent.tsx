import { Suspense, useState, type ReactNode } from "react";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Quote,
  Target,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import LessonVideoHero from "./LessonVideoHero";
import LessonRenderer from "./LessonRenderer";
import type { LessonSection, StorySection, ReflectionQuestion } from "@/data/course/types";

interface DayContentProps {
  weekNum: number;
  dayNum: number;
  totalDays: number;
  weekTitle: string;
  // Week data sliced per day
  lessonSections: LessonSection[];
  story: StorySection;
  reflectionQuestions: ReflectionQuestion[];
  actionItems: string[];
  objectives: string[];
  keyQuote: string;
  quoteAuthor: string;
  overview: string;
  // Optional sections
  worksheetComponent?: ReactNode;
  fourHatsComponent?: ReactNode;
  realWorldActivity?: { title: string; description: string };
  deeperPerspectiveInLesson?: boolean;
  toolLink?: string;
  toolLabel?: string;
  // Character name for story
  storyCharacter: string;
  storyIntro: string;
  // Regional story variant
  storyCentralAsia?: StorySection;
  // Business course extras
  moduleBadge?: string;
  // Video lookup (src/data/videos.ts) / CMS-provided embed
  courseSlug?: string;
  video?: { provider?: string; videoId?: string } | null;
  // Internal linking
  relatedBlogPosts?: { slug: string; title: string }[];
  // State
  checkedObjectives: number[];
  checkedActions: number[];
  isDayComplete: boolean;
  onToggleObjective: (index: number) => void;
  onToggleAction: (index: number) => void;
  onCompleteDay: () => void;
  onNavigateDay: (day: number) => void;
  // i18n
  isCentralAsia: boolean;
}

/**
 * Distributes story paragraphs across 6 days as evenly as possible.
 * Returns the paragraphs for the given day (1-indexed).
 */
export function getStorySlice(paragraphs: string[], dayNum: number, totalDays: number = 6): string[] {
  const total = paragraphs.length;
  if (total === 0) return [];

  const basePerDay = Math.floor(total / totalDays);
  const remainder = total % totalDays;

  // Build ranges: first `remainder` days get basePerDay+1, rest get basePerDay
  let start = 0;
  for (let d = 1; d <= totalDays; d++) {
    const count = basePerDay + (d <= remainder ? 1 : 0);
    if (d === dayNum) {
      return paragraphs.slice(start, start + count);
    }
    start += count;
  }
  return [];
}

/**
 * Returns the lesson section(s) for a given day.
 * Days 1-3 each get one lesson section. Day 1 also includes overview + objectives.
 */
function getLessonForDay(sections: LessonSection[], dayNum: number): LessonSection[] {
  if (dayNum >= 1 && dayNum <= 3) {
    const idx = dayNum - 1;
    return sections[idx] ? [sections[idx]] : [];
  }
  return [];
}

/**
 * Gets reflection questions for a given day.
 * Each lesson section may have questionsToConsider; also distribute reflectionQuestions.
 */
function getReflectionsForDay(
  reflectionQuestions: ReflectionQuestion[],
  lessonSections: LessonSection[],
  dayNum: number
): ReflectionQuestion[] {
  // Days 1-3: use questionsToConsider from the corresponding lesson section
  if (dayNum >= 1 && dayNum <= 3) {
    const section = lessonSections[dayNum - 1];
    if (section?.questionsToConsider?.length) {
      return section.questionsToConsider.map((q) => ({ question: q }));
    }
    // Fallback: distribute reflectionQuestions evenly across days 1-3
    const perDay = Math.ceil(reflectionQuestions.length / 3);
    const start = (dayNum - 1) * perDay;
    return reflectionQuestions.slice(start, start + perDay);
  }
  // Day 5: remaining reflections
  if (dayNum === 5) {
    return reflectionQuestions.slice(Math.ceil((reflectionQuestions.length / 3) * 3));
  }
  return [];
}

/**
 * Distributes objectives across days based on day type:
 * - Day 1 (Overview): First objective (conceptual intro)
 * - Days 2-3 (Lessons): Knowledge objectives
 * - Day 4 (Worksheet): Hands-on/practical objectives
 * - Day 5 (Practice): Application objectives
 * - Day 6 (Wrap-Up): Reflection/goal-setting objectives
 */
function getObjectivesForDay(objectives: string[], dayNum: number): { objective: string; globalIndex: number }[] {
  const total = objectives.length;
  if (total === 0) return [];

  // Map day ranges to objective index ranges
  // Day 1: first objective
  // Day 2-3: middle objectives (split between lesson days)
  // Day 4: worksheet objective (practical/hands-on)
  // Day 5-6: final objectives (application + reflection)
  if (total <= 2) {
    // Very few objectives — show all on day 1 and 6
    if (dayNum === 1) return objectives.map((o, i) => ({ objective: o, globalIndex: i }));
    return [];
  }

  // Distribute: roughly 1 for day 1, 1-2 for days 2-3 each, 1 for day 4, rest for 5-6
  const perDay: Record<number, number[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

  if (total >= 4) {
    perDay[1] = [0]; // First objective on intro/overview day
    perDay[2] = [1]; // Second on lesson day 2
    perDay[3] = total > 4 ? [2] : []; // Third on lesson day 3
    perDay[4] = [total > 4 ? 3 : 2]; // Hands-on objective on worksheet day
    const remaining = [];
    for (let i = (total > 4 ? 4 : 3); i < total; i++) remaining.push(i);
    // Split remaining between day 5 and 6
    const mid = Math.ceil(remaining.length / 2);
    perDay[5] = remaining.slice(0, mid);
    perDay[6] = remaining.slice(mid);
  } else {
    // 3 objectives
    perDay[1] = [0];
    perDay[3] = [1];
    perDay[5] = [2];
  }

  return (perDay[dayNum] || []).map(i => ({ objective: objectives[i], globalIndex: i }));
}

/** Day title descriptions */
function getDayTitle(dayNum: number, weekTitle: string, isCentralAsia: boolean): string {
  const titles: Record<number, string> = {
    1: isCentralAsia ? "Обзор и введение" : "Overview & Introduction",
    2: isCentralAsia ? "Глубокое погружение в урок" : "Lesson Deep Dive",
    3: isCentralAsia ? "Глубокое погружение в урок" : "Lesson Deep Dive",
    4: isCentralAsia ? "Рабочий лист" : "Worksheet Walkthrough",
    5: isCentralAsia ? "Применение и практика" : "Application & Practice",
    6: isCentralAsia ? "Итоги недели" : "Week Wrap-Up",
  };
  return titles[dayNum] || weekTitle;
}

export default function DayContent({
  weekNum,
  dayNum,
  totalDays,
  weekTitle,
  lessonSections,
  story,
  reflectionQuestions,
  actionItems,
  objectives,
  keyQuote,
  quoteAuthor,
  overview,
  worksheetComponent,
  fourHatsComponent,
  realWorldActivity,
  toolLink,
  toolLabel,
  storyCharacter,
  storyIntro,
  storyCentralAsia,
  moduleBadge,
  courseSlug,
  video,
  relatedBlogPosts,
  checkedObjectives,
  checkedActions,
  isDayComplete,
  onToggleObjective,
  onToggleAction,
  onCompleteDay,
  onNavigateDay,
  isCentralAsia,
}: DayContentProps) {
  const dayTitle = getDayTitle(dayNum, weekTitle, isCentralAsia);
  const activeStory = (isCentralAsia && storyCentralAsia) ? storyCentralAsia : story;
  const storyParagraphs = getStorySlice(activeStory.paragraphs, dayNum, totalDays);
  const dayLessonSections = getLessonForDay(lessonSections, dayNum);
  const dayReflections = getReflectionsForDay(reflectionQuestions, lessonSections, dayNum);
  const dayObjectives = getObjectivesForDay(objectives, dayNum);
  const [lessonOpen, setLessonOpen] = useState(false);

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Video Placeholder */}
      <LessonVideoHero weekNum={weekNum} dayNum={dayNum} dayTitle={dayTitle} courseSlug={courseSlug} video={video} />

      {/* ======= DAY 1: Overview + Objectives + Lesson 1 + Reflections ======= */}
      {dayNum === 1 && (
        <>
          {/* Module badge for business course */}
          {moduleBadge && (
            <p className="text-xs font-medium text-[#C9922A] uppercase tracking-wide">
              {moduleBadge}
            </p>
          )}

          {/* Key Quote */}
          <Card className="border-l-4 border-l-[#C9922A] bg-[#C9922A]/5">
            <CardContent className="py-5">
              <div className="flex gap-3">
                <Quote className="w-5 h-5 text-[#C9922A] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-base md:text-lg text-gray-800 italic mb-1">
                    &ldquo;{keyQuote}&rdquo;
                  </p>
                  <p className="text-sm text-gray-500">&mdash; {quoteAuthor}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overview */}
          <section>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">{overview}</p>
          </section>

        </>
      )}

      {/* ======= TODAY'S OBJECTIVES (shown on all days with relevant subset) ======= */}
      {dayObjectives.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-[#1B2A4A] mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#C9922A]" />
            {isCentralAsia ? "Цели на сегодня" : "Today's Goal"}
          </h2>
          <div className="space-y-2">
            {dayObjectives.map(({ objective, globalIndex }) => {
              const checked = checkedObjectives.includes(globalIndex);
              return (
                <button
                  key={globalIndex}
                  onClick={() => onToggleObjective(globalIndex)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    checked
                      ? "bg-green-50 border border-green-200"
                      : "bg-white border border-gray-200 hover:border-[#C9922A]/50"
                  }`}
                >
                  {checked ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-sm ${checked ? "text-green-800 line-through" : "text-gray-700"}`}>
                    {objective}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ======= STORY EXCERPT (every day) ======= */}
      {storyParagraphs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-[#C9922A]" />
            <h3 className="text-lg font-bold text-[#1B2A4A]">
              {isCentralAsia ? "Сегодняшняя история" : `${storyCharacter}'s Story`}
            </h3>
          </div>
          {dayNum === 1 && (
            <p className="text-sm text-gray-500 italic mb-3">{storyIntro}</p>
          )}
          <div className="relative bg-[#FFFBF0] border-l-4 border-l-[#C9922A] rounded-r-lg p-5 md:p-6 shadow-sm">
            <div className="space-y-3">
              {storyParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-gray-700 leading-relaxed text-base"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======= LESSON (Days 1-3) — Collapsible ======= */}
      {dayLessonSections.length > 0 && (
        <section>
          <div className="border-t-2 border-[#C9922A] pt-6">
            <Collapsible open={lessonOpen} onOpenChange={setLessonOpen}>
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-1">
                  {isCentralAsia ? "Сегодняшний урок" : "Today's Lesson"}
                </h2>
                {dayLessonSections[0]?.title && (
                  <p className="text-sm font-medium text-[#C9922A]">{dayLessonSections[0].title}</p>
                )}
              </div>

              {/* Preview: show first paragraph when collapsed */}
              {!lessonOpen && dayLessonSections[0]?.content && (
                <div className="relative mb-4">
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {dayLessonSections[0].content[0]}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>
              )}

              <CollapsibleTrigger asChild>
                <Button
                  variant={lessonOpen ? "ghost" : "default"}
                  className={lessonOpen
                    ? "text-[#C9922A] hover:text-[#1B2A4A] px-0"
                    : "bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                  }
                >
                  {lessonOpen
                    ? isCentralAsia ? "Свернуть урок" : "Collapse Lesson"
                    : isCentralAsia ? "Читать полный урок" : "Read Full Lesson"}
                  <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${lessonOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-6">
                <LessonRenderer sections={dayLessonSections} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>
      )}

      {/* ======= DAY 4: Worksheet ======= */}
      {dayNum === 4 && worksheetComponent && (
        <section>
          <div className="border-t-2 border-[#C9922A] pt-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-2">
              {isCentralAsia ? "Интерактивный рабочий лист" : "Interactive Worksheet"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isCentralAsia
                ? "Заполните рабочий лист ниже. Ваши данные автоматически сохраняются на этом устройстве."
                : "Complete the worksheet below. Your data is automatically saved to this device."}
            </p>
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-400">
                    {isCentralAsia ? "Загрузка рабочего листа..." : "Loading worksheet..."}
                  </p>
                </div>
              }
            >
              {worksheetComponent}
            </Suspense>
          </div>
        </section>
      )}

      {/* ======= DAY 5: Real-World Activity + Deeper Perspective + Four Hats ======= */}
      {dayNum === 5 && (
        <>
          {realWorldActivity && (
            <Card className="border-green-200 bg-green-50/30">
              <CardContent className="py-5">
                <h3 className="font-bold text-green-800 mb-1 text-sm uppercase tracking-wide">
                  {isCentralAsia ? "Задание в реальном мире" : "Real-World Activity"}
                </h3>
                <p className="font-medium text-green-900 mb-1">{realWorldActivity.title}</p>
                <p className="text-sm text-green-800/80">{realWorldActivity.description}</p>
              </CardContent>
            </Card>
          )}

          {fourHatsComponent && (
            <div className="border-t-2 border-amber-400 pt-6">
              {fourHatsComponent}
            </div>
          )}
        </>
      )}

      {/* ======= DAY 6: Summary + Action Items + Completion ======= */}
      {dayNum === 6 && (
        <>
          {/* Week Summary */}
          <section>
            <div className="border-t-2 border-[#C9922A] pt-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-4">
                {isCentralAsia ? "Итоги недели" : "Week Summary"}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">{overview}</p>

              {/* Key Takeaways */}
              <Card className="bg-[#1B2A4A]/5 border-[#1B2A4A]/10">
                <CardContent className="py-5">
                  <h3 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wide mb-3">
                    {isCentralAsia ? "Ключевые выводы" : "Key Takeaways"}
                  </h3>
                  <ul className="space-y-2">
                    {lessonSections.map((section, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                        <span>{section.heading}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Action Items */}
          <section>
            <div className="border-t-2 border-[#C9922A] pt-6">
              <h2 className="text-lg font-bold text-[#1B2A4A] mb-3">
                {isCentralAsia ? "Задания этой недели" : "This Week's Action Items"}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {isCentralAsia
                  ? "Выполните хотя бы одно задание, чтобы завершить неделю."
                  : "Check off at least one to complete this week."}
              </p>
              <Card className="border border-[#C9922A]/30">
                <CardContent className="pt-5">
                  <div className="space-y-2">
                    {actionItems.map((item, index) => {
                      const checked = checkedActions.includes(index);
                      return (
                        <button
                          key={index}
                          onClick={() => onToggleAction(index)}
                          className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                            checked
                              ? "bg-green-50 border border-green-200"
                              : "bg-white border border-gray-200 hover:border-[#C9922A]/50"
                          }`}
                        >
                          {checked ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <span className="bg-[#C9922A]/10 text-[#C9922A] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                          )}
                          <span className={`text-sm ${checked ? "text-green-800 line-through" : "text-gray-700"}`}>
                            {item}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {toolLink && (
                <Link
                  to={toolLink}
                  className="mt-4 inline-flex items-center gap-2 text-[#C9922A] hover:text-[#1B2A4A] font-medium text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {isCentralAsia ? `Открыть ${toolLabel}` : `Open the ${toolLabel}`}
                </Link>
              )}
            </div>
          </section>
        </>
      )}

      {/* ======= RELATED READING (Days 1-3, 6) ======= */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (dayNum <= 3 || dayNum === 6) && (
        <section>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wide mb-3">
              {isCentralAsia ? "Рекомендуемое чтение" : "Related Reading"}
            </h3>
            <div className="space-y-2">
              {relatedBlogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-[#C9922A]/50 transition-colors"
                >
                  <p className="text-sm text-[#1B2A4A] font-medium">{post.title}</p>
                  <p className="text-xs text-[#C9922A] mt-0.5">{isCentralAsia ? "Читать статью →" : "Read article →"}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======= HOMEWORK / REFLECTIONS (Days 1-3, 5) ======= */}
      {dayReflections.length > 0 && (
        <section>
          <div className="border-t-2 border-[#C9922A] pt-6">
            <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">
              {isCentralAsia ? "Сегодняшнее домашнее задание" : "Today's Homework"}
            </h2>
            <div className="bg-[#1B2A4A]/5 rounded-xl p-5 md:p-6">
              <h3 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wide mb-3">
                {isCentralAsia ? "Вопросы для размышления" : "Questions to Consider"}
              </h3>
              <div className="space-y-3">
                {dayReflections.map((rq, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#C9922A] mt-1.5 w-1.5 h-1.5 bg-[#C9922A] rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-800">{rq.question}</p>
                      {rq.prompt && <p className="text-xs text-gray-500 italic mt-0.5">{rq.prompt}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======= COMPLETE DAY BUTTON ======= */}
      <div className="pt-4">
        <div className="text-center">
          <Button
            size="lg"
            onClick={onCompleteDay}
            disabled={isDayComplete}
            className={
              isDayComplete
                ? "bg-green-600 text-white font-bold px-8 cursor-default"
                : "bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
            }
          >
            <CheckCircle2 className="mr-2 w-5 h-5" />
            {isDayComplete
              ? isCentralAsia
                ? `День ${dayNum} завершен`
                : `Day ${dayNum} Complete`
              : isCentralAsia
                ? `Завершить день ${dayNum}`
                : `Complete Day ${dayNum}`}
          </Button>
        </div>
      </div>

      {/* ======= DAY NAVIGATION ======= */}
      <div className="flex items-center justify-between pt-2 pb-4 no-print">
        {dayNum > 1 ? (
          <button
            onClick={() => onNavigateDay(dayNum - 1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B2A4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isCentralAsia ? `День ${dayNum - 1}` : `Day ${dayNum - 1}`}
          </button>
        ) : (
          <div />
        )}

        <span className="text-xs text-gray-400">
          {isCentralAsia
            ? `День ${dayNum} из ${totalDays}`
            : `Day ${dayNum} of ${totalDays}`}
        </span>

        {dayNum < totalDays ? (
          <button
            onClick={() => onNavigateDay(dayNum + 1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B2A4A] transition-colors"
          >
            {isCentralAsia ? `День ${dayNum + 1}` : `Day ${dayNum + 1}`}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
