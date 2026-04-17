import { useState, useEffect, type ReactNode } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CourseSidebar from "./CourseSidebar";

interface WeekInfo {
  weekNum: number;
  title: string;
}

interface CourseLayoutProps {
  children: ReactNode;
  courseTitle: string;
  coursePath: string;
  weeks: WeekInfo[];
  currentWeek: number;
  currentDay: number;
  totalDaysPerWeek: number;
  completedWeeks: number[];
  completedDays: Record<number, number[]>;
  onSelectDay: (week: number, day: number) => void;
  isCentralAsia: boolean;
  onLeaveReview?: () => void;
}

export default function CourseLayout({
  children,
  courseTitle,
  coursePath,
  weeks,
  currentWeek,
  currentDay,
  totalDaysPerWeek,
  completedWeeks,
  completedDays,
  onSelectDay,
  isCentralAsia,
  onLeaveReview,
}: CourseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Mobile sticky top bar */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200 md:hidden no-print">
        <div className="flex items-center justify-between px-4 py-2.5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-[#1B2A4A]"
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm font-medium">
              {isCentralAsia
                ? `Нед. ${currentWeek} · День ${currentDay} из ${totalDaysPerWeek}`
                : `Week ${currentWeek} · Day ${currentDay} of ${totalDaysPerWeek}`}
            </span>
          </button>
          <Link
            to={coursePath}
            className="text-gray-400 hover:text-[#1B2A4A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-xl md:hidden overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <span className="text-sm font-bold text-[#1B2A4A]">{courseTitle}</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <CourseSidebar
              courseTitle={courseTitle}
              coursePath={coursePath}
              weeks={weeks}
              currentWeek={currentWeek}
              currentDay={currentDay}
              completedWeeks={completedWeeks}
              completedDays={completedDays}
              totalDaysPerWeek={totalDaysPerWeek}
              onSelectDay={(week, day) => {
                onSelectDay(week, day);
                setSidebarOpen(false);
              }}
              isCentralAsia={isCentralAsia}
              onLeaveReview={onLeaveReview}
            />
          </div>
        </>
      )}

      {/* Desktop layout */}
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-72 flex-shrink-0 no-print relative">
          <div className={`w-72 border-r border-gray-200 bg-white ${
            footerVisible ? "absolute bottom-0" : "fixed top-20 bottom-0"
          }`} style={footerVisible ? { height: 'calc(100vh - 5rem)' } : undefined}>
            <CourseSidebar
              courseTitle={courseTitle}
              coursePath={coursePath}
              weeks={weeks}
              currentWeek={currentWeek}
              currentDay={currentDay}
              completedWeeks={completedWeeks}
              completedDays={completedDays}
              totalDaysPerWeek={totalDaysPerWeek}
              onSelectDay={onSelectDay}
              isCentralAsia={isCentralAsia}
              onLeaveReview={onLeaveReview}
            />
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 min-w-0 pb-20 md:pb-8">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
