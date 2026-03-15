import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

export default function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const { isCentralAsia } = useRegion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);

  if (!audioUrl) return null;

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    audio.currentTime = fraction * audio.duration;
  }

  function cycleSpeed() {
    const speeds = [1, 1.25, 1.5, 0.75];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  }

  function formatTime(seconds: number): string {
    if (!seconds || !isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); setProgress(0); setCurrentTime(0); }}
        aria-label={title}
      />

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center hover:bg-[#1B2A4A]/90 transition-colors"
          aria-label={isPlaying ? (isCentralAsia ? "Пауза" : "Pause") : (isCentralAsia ? "Воспроизвести" : "Play")}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 truncate">
              {isCentralAsia ? "Прослушать статью" : "Listen to this article"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-10 text-right tabular-nums">
              {formatTime(currentTime)}
            </span>

            <div
              className="flex-1 h-1.5 bg-gray-200 rounded-full cursor-pointer group"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-[#C9922A] rounded-full transition-[width] duration-150 group-hover:bg-[#C9922A]/80"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs text-gray-400 w-10 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <button
          onClick={cycleSpeed}
          className="flex-shrink-0 text-xs font-mono bg-white border border-gray-200 rounded px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
          title={isCentralAsia ? "Скорость воспроизведения" : "Playback speed"}
        >
          {speed}x
        </button>
      </div>
    </div>
  );
}
