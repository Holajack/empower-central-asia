import { Play } from "lucide-react";

interface LessonVideoHeroProps {
  weekNum: number;
  dayNum: number;
  dayTitle: string;
}

export default function LessonVideoHero({ weekNum, dayNum, dayTitle }: LessonVideoHeroProps) {
  return (
    <div className="relative aspect-video bg-[#1B2A4A] rounded-xl overflow-hidden shadow-lg">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 transition-transform hover:scale-110 cursor-pointer">
          <Play className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <p className="text-[#C9922A] text-xs md:text-sm font-medium uppercase tracking-wide mb-1">
          Week {weekNum} &middot; Day {dayNum}
        </p>
        <h2 className="text-white text-lg md:text-xl font-bold leading-tight">{dayTitle}</h2>
      </div>

      {/* "Coming Soon" badge */}
      <div className="absolute top-3 right-3 bg-[#C9922A]/90 text-white text-[10px] md:text-xs font-medium px-2 py-1 rounded-full">
        Video Coming Soon
      </div>
    </div>
  );
}
