import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Check,
  Lock,
  ArrowRight,
  BookOpen,
  Star,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WeekInfo {
  weekNum: number;
  title: string;
}

interface CourseSidebarProps {
  courseTitle: string;
  coursePath: string; // e.g., "/course/financial-literacy"
  weeks: WeekInfo[];
  currentWeek: number;
  currentDay: number;
  completedWeeks: number[];
  completedDays: Record<number, number[]>;
  totalDaysPerWeek: number;
  onSelectDay: (week: number, day: number) => void;
  isCentralAsia: boolean;
  onLeaveReview?: () => void;
}

function getDayStatus(
  weekNum: number,
  dayNum: number,
  currentWeek: number,
  currentDay: number,
  completedWeeks: number[],
  completedDays: Record<number, number[]>
): "completed" | "active" | "available" | "locked" {
  const weekComplete = completedWeeks.includes(weekNum);
  const dayComplete = completedDays[weekNum]?.includes(dayNum) ?? false;

  if (dayComplete || weekComplete) return "completed";
  if (weekNum === currentWeek && dayNum === currentDay) return "active";

  // Day 1 is always available if the week is unlocked
  if (dayNum === 1) {
    const weekUnlocked = weekNum === 1 || completedWeeks.includes(weekNum - 1);
    return weekUnlocked ? "available" : "locked";
  }

  // Days 2-6: previous day in this week must be complete
  const prevDayComplete = completedDays[weekNum]?.includes(dayNum - 1) ?? false;
  return prevDayComplete ? "available" : "locked";
}

function getWeekStatus(
  weekNum: number,
  completedWeeks: number[],
  completedDays: Record<number, number[]>,
  totalDays: number
): "completed" | "in-progress" | "locked" {
  if (completedWeeks.includes(weekNum)) return "completed";
  const daysComplete = completedDays[weekNum]?.length ?? 0;
  if (daysComplete > 0) return "in-progress";
  if (weekNum === 1) return "in-progress";
  if (completedWeeks.includes(weekNum - 1)) return "in-progress";
  return "locked";
}

export default function CourseSidebar({
  courseTitle,
  coursePath,
  weeks,
  currentWeek,
  currentDay,
  completedWeeks,
  completedDays,
  totalDaysPerWeek,
  onSelectDay,
  isCentralAsia,
  onLeaveReview,
}: CourseSidebarProps) {
  const [expandedWeek, setExpandedWeek] = useState<number>(currentWeek);

  const totalDays = weeks.length * totalDaysPerWeek;
  const completedDayCount = Object.values(completedDays).reduce(
    (sum, days) => sum + days.length,
    0
  ) + completedWeeks.length * totalDaysPerWeek;
  // Avoid double-counting: days already in completedWeeks
  const actualCompleted = Math.min(completedDayCount, totalDays);
  const progressPercent = Math.round((actualCompleted / totalDays) * 100);

  return (
    <div className="flex flex-col h-full">
      {/* Course Title */}
      <div className="p-4 border-b border-gray-200">
        <Link to={coursePath} className="flex items-center gap-2 text-[#1B2A4A] hover:text-[#C9922A] transition-colors">
          <BookOpen className="w-4 h-4 text-[#C9922A]" />
          <span className="font-bold text-sm">{courseTitle}</span>
        </Link>

        {/* Overall Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>
              {isCentralAsia
                ? `${actualCompleted} из ${totalDays} дней`
                : `${actualCompleted} of ${totalDays} days done`}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5 bg-gray-200" />
        </div>
      </div>

      {/* Week Accordion */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {weeks.map((week) => {
            const status = getWeekStatus(week.weekNum, completedWeeks, completedDays, totalDaysPerWeek);
            const isExpanded = expandedWeek === week.weekNum;
            const isCurrentWeek = week.weekNum === currentWeek;

            return (
              <div
                key={week.weekNum}
                className={`rounded-lg overflow-hidden ${
                  isCurrentWeek ? "ring-1 ring-[#C9922A]/30" : ""
                }`}
              >
                {/* Week header */}
                <button
                  onClick={() => setExpandedWeek(isExpanded ? -1 : week.weekNum)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors ${
                    isCurrentWeek
                      ? "bg-[#C9922A]/5 hover:bg-[#C9922A]/10"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {status === "completed" ? (
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : status === "locked" ? (
                    <Lock className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                  ) : (
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${
                      status === "locked" ? "text-gray-400" : "text-[#1B2A4A]"
                    }`}>
                      {isCentralAsia ? `Неделя ${week.weekNum}` : `Week ${week.weekNum}`}
                    </p>
                    <p className={`text-[10px] truncate ${
                      status === "locked" ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {week.title}
                    </p>
                  </div>
                </button>

                {/* Day list */}
                {isExpanded && status !== "locked" && (
                  <div className="pb-1 px-2">
                    {Array.from({ length: totalDaysPerWeek }, (_, i) => i + 1).map((dayNum) => {
                      const dayStatus = getDayStatus(
                        week.weekNum,
                        dayNum,
                        currentWeek,
                        currentDay,
                        completedWeeks,
                        completedDays
                      );

                      return (
                        <button
                          key={dayNum}
                          onClick={() => {
                            if (dayStatus !== "locked") {
                              onSelectDay(week.weekNum, dayNum);
                            }
                          }}
                          disabled={dayStatus === "locked"}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                            dayStatus === "active"
                              ? "bg-[#C9922A]/10 text-[#C9922A] font-medium"
                              : dayStatus === "completed"
                                ? "text-green-700 hover:bg-green-50"
                                : dayStatus === "available"
                                  ? "text-gray-600 hover:bg-gray-50"
                                  : "text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          {dayStatus === "completed" && (
                            <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-green-600" />
                            </span>
                          )}
                          {dayStatus === "active" && (
                            <span className="w-4 h-4 rounded-full bg-[#C9922A] flex items-center justify-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            </span>
                          )}
                          {dayStatus === "available" && (
                            <span className="w-4 h-4 rounded-full border-2 border-gray-300" />
                          )}
                          {dayStatus === "locked" && (
                            <Lock className="w-3 h-3 text-gray-300" />
                          )}
                          <span>
                            {isCentralAsia ? `День ${dayNum}` : `Day ${dayNum}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        {onLeaveReview && (
          <button
            onClick={onLeaveReview}
            className="flex items-center gap-1.5 text-xs text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors"
          >
            <Star className="w-3.5 h-3.5" />
            {isCentralAsia ? "Оставить отзыв" : "Leave a Review"}
          </button>
        )}
        <Link
          to="/cohort"
          className="flex items-center gap-1 text-xs text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors"
        >
          {isCentralAsia ? "Присоединиться к когорте" : "Join a Live Cohort"}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
