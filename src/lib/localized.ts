/**
 * Generic helper for the inline-bilingual content pattern used across
 * Sanity-backed pages. Each schema has `field` (English) and `fieldRu`
 * (Russian) — call `getLocalized(field, fieldRu, isCentralAsia)` and you
 * get the right one with English fallback when Russian is missing.
 *
 * Examples:
 *   getLocalized(post.title, post.titleRu, isCentralAsia)
 *   getLocalized(settings.tagline, settings.taglineRu, isCentralAsia)
 */

export function getLocalized<T extends string | undefined | null>(
  english: T,
  russian: T,
  isCentralAsia: boolean
): string {
  if (isCentralAsia && russian) return russian;
  return english ?? "";
}

/**
 * Same idea but for arrays (tags, requirements, objectives).
 * Falls back to English array when Russian is missing/empty.
 */
export function getLocalizedArray<T>(
  english: T[] | undefined | null,
  russian: T[] | undefined | null,
  isCentralAsia: boolean
): T[] {
  if (isCentralAsia && russian && russian.length > 0) return russian;
  return english ?? [];
}
