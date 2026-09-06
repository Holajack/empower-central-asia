import { useState } from "react";
import { Play } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { getLessonVideo, videoEmbedUrl, type LessonVideo } from "@/data/videos";

interface LessonVideoHeroProps {
  weekNum: number;
  dayNum: number;
  dayTitle: string;
  /** Course slug, used to look up a configured video in src/data/videos.ts. */
  courseSlug?: string;
  /** Explicit video (e.g. from the CMS); takes precedence over the lookup. */
  video?: LessonVideo | { provider?: string; videoId?: string } | null;
}

export default function LessonVideoHero({ weekNum, dayNum, dayTitle, courseSlug, video }: LessonVideoHeroProps) {
  const { isCentralAsia, language } = useRegion();
  const [playing, setPlaying] = useState(false);

  const resolved: LessonVideo | undefined =
    video && "id" in video && video.id
      ? (video as LessonVideo)
      : video && "videoId" in video && video.videoId
        ? { provider: video.provider === "vimeo" ? "vimeo" : "youtube", id: video.videoId }
        : courseSlug
          ? getLessonVideo(courseSlug, weekNum, dayNum)
          : undefined;

  const label = isCentralAsia ? `Неделя ${weekNum} · День ${dayNum}` : `Week ${weekNum} · Day ${dayNum}`;

  if (resolved && playing) {
    return (
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={`${videoEmbedUrl(resolved, language)}&autoplay=1`}
          title={dayTitle}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video bg-[#1B2A4A] rounded-xl overflow-hidden shadow-lg ${resolved ? "cursor-pointer" : ""}`}
      onClick={() => resolved && setPlaying(true)}
      role={resolved ? "button" : undefined}
      aria-label={resolved ? (isCentralAsia ? "Смотреть видео" : "Play video") : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 transition-transform hover:scale-110">
          <Play className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <p className="text-[#C9922A] text-xs md:text-sm font-medium uppercase tracking-wide mb-1">{label}</p>
        <h2 className="text-white text-lg md:text-xl font-bold leading-tight">{dayTitle}</h2>
      </div>
      {!resolved && (
        <div className="absolute top-3 right-3 bg-[#C9922A]/90 text-white text-[10px] md:text-xs font-medium px-2 py-1 rounded-full">
          {isCentralAsia ? "Видео скоро появится" : "Video coming soon"}
        </div>
      )}
    </div>
  );
}
