/**
 * Lesson videos.
 *
 * Add a YouTube or Vimeo id for any lesson day and the video hero on that
 * day switches from the "coming soon" placeholder to an embedded player.
 * Key format: "<course-slug>:<week>:<day>"  (day 0 is the week-1 intro).
 *
 *   "financial-literacy:1:1": { provider: "youtube", id: "dQw4w9WgXcQ" },
 *   "business-creation:3:2":  { provider: "vimeo",   id: "123456789", idRu: "987654321" },
 *
 * `idRu` (optional) is used on /ru pages when present.
 * The recording scripts for every Financial Literacy and Business Creation
 * lesson are in src/data/video-transcripts/.
 */
export interface LessonVideo {
  provider: "youtube" | "vimeo";
  id: string;
  idRu?: string;
}

export const lessonVideos: Record<string, LessonVideo> = {};

export function getLessonVideo(courseSlug: string, weekNum: number, dayNum: number): LessonVideo | undefined {
  return lessonVideos[`${courseSlug}:${weekNum}:${dayNum}`];
}

export function videoEmbedUrl(video: LessonVideo, lang: "en" | "ru"): string {
  const id = lang === "ru" && video.idRu ? video.idRu : video.id;
  return video.provider === "vimeo"
    ? `https://player.vimeo.com/video/${id}?dnt=1`
    : `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
}
