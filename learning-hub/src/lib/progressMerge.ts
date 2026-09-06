/**
 * Conflict-free merge of two progress objects (local vs cloud copy).
 * Arrays of numbers → union; numeric "current" fields → max; nested
 * objects → recursive; strings → keep local unless empty.
 */
export type Json = Record<string, unknown>;

export function mergeProgress<T extends object>(local: T, remote: Partial<T> | null | undefined): T {
  if (!remote) return local;
  const out: Json = { ...(local as Json) };
  for (const key of Object.keys(remote)) {
    const r = (remote as Json)[key];
    const l = out[key];
    if (Array.isArray(r) && (Array.isArray(l) || l === undefined)) {
      const set = new Set<unknown>([...(Array.isArray(l) ? l : []), ...r]);
      out[key] = Array.from(set).sort((a, b) => (typeof a === "number" && typeof b === "number" ? a - b : 0));
    } else if (typeof r === "number" && (typeof l === "number" || l === undefined)) {
      out[key] = Math.max(typeof l === "number" ? l : 0, r);
    } else if (r && typeof r === "object" && !Array.isArray(r)) {
      out[key] = mergeProgress((l && typeof l === "object" && !Array.isArray(l) ? (l as Json) : {}) as Json, r as Json);
    } else if (l === undefined || l === null || l === "") {
      out[key] = r;
    }
  }
  return out as T;
}
