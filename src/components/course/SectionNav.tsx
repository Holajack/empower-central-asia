import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";

interface DayNavProps {
  totalDays: number;
  currentDay: number;
  completedDays: number[];
  onSelectDay: (day: number) => void;
  isCentralAsia?: boolean;
}

export default function SectionNav({
  totalDays,
  currentDay,
  completedDays,
  onSelectDay,
  isCentralAsia = false,
}: DayNavProps) {
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

  function getDayStatus(dayNum: number): "completed" | "active" | "available" | "locked" {
    if (completedDays.includes(dayNum)) return "completed";
    if (dayNum === currentDay) return "active";
    if (dayNum === 1) return "available";
    if (completedDays.includes(dayNum - 1)) return "available";
    return "locked";
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden no-print transition-all duration-300 ${
        footerVisible ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex justify-around py-2 px-1">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((dayNum) => {
          const status = getDayStatus(dayNum);
          return (
            <button
              key={dayNum}
              onClick={() => {
                if (status !== "locked") onSelectDay(dayNum);
              }}
              disabled={status === "locked"}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors min-w-0 ${
                status === "active"
                  ? "text-[#C9922A]"
                  : status === "completed"
                    ? "text-green-600"
                    : status === "available"
                      ? "text-gray-500"
                      : "text-gray-300"
              }`}
            >
              {/* Status icon */}
              {status === "completed" ? (
                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
              ) : status === "active" ? (
                <span className="w-6 h-6 rounded-full bg-[#C9922A] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{dayNum}</span>
                </span>
              ) : status === "available" ? (
                <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-[10px] font-medium">{dayNum}</span>
                </span>
              ) : (
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Lock className="w-2.5 h-2.5" />
                </span>
              )}

              <span className="text-[9px] font-medium">
                {isCentralAsia ? `Д${dayNum}` : `D${dayNum}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
