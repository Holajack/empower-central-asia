/**
 * Renders a Sanity-managed video embed (YouTube or Vimeo) using a
 * lite-youtube-embed–style facade: we show a static thumbnail until the
 * user clicks "Play", and only then mount the iframe. Saves ~500KB of
 * iframe JS on lessons that are never watched and keeps Lighthouse scores
 * happy.
 *
 * Bilingual: caption falls back to the Russian variant when isCentralAsia.
 */
import { useState } from "react";
import { Play } from "lucide-react";

export interface VideoEmbedData {
  provider?: "youtube" | "vimeo";
  videoId?: string;
  caption?: string;
}

interface VideoEmbedProps {
  /** The video data — optional so the component can no-op when blank. */
  video?: VideoEmbedData;
  /** Pre-resolved bilingual caption. Falls back to `video.caption`. */
  caption?: string;
  /** Tailwind class overrides. */
  className?: string;
}

function thumbnailUrl(provider: string | undefined, videoId: string): string {
  if (provider === "vimeo") {
    // Vimeo doesn't expose oEmbed thumbs without a request; render a neutral
    // dark backdrop instead. The iframe loads on click anyway.
    return "";
  }
  // YouTube hqdefault is fast + small. mqdefault works as a fallback.
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function iframeUrl(provider: string | undefined, videoId: string): string {
  if (provider === "vimeo") {
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}

const VideoEmbed = ({ video, caption, className }: VideoEmbedProps) => {
  const [playing, setPlaying] = useState(false);

  if (!video?.videoId) return null;

  const cap = caption ?? video.caption ?? "";
  const provider = video.provider ?? "youtube";
  const thumb = thumbnailUrl(provider, video.videoId);
  const cls = className ?? "rounded-xl overflow-hidden bg-[#1B2A4A]";

  return (
    <figure className={cls}>
      <div className="relative aspect-video w-full bg-[#1B2A4A]">
        {playing ? (
          <iframe
            src={iframeUrl(provider, video.videoId)}
            title={cap || "Lesson video"}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={cap ? `Play video: ${cap}` : "Play lesson video"}
          >
            {thumb ? (
              <img
                src={thumb}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A4A] to-[#0d1a33]" />
            )}
            {/* Dark overlay so the play button stays readable on bright thumbs */}
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-105">
                <Play className="ml-1 h-7 w-7 text-[#1B2A4A]" fill="currentColor" />
              </span>
            </div>
          </button>
        )}
      </div>
      {cap ? (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {cap}
        </figcaption>
      ) : null}
    </figure>
  );
};

export default VideoEmbed;
