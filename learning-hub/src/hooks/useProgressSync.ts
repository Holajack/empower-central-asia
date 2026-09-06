/**
 * Keeps a course's localStorage progress object in sync with the learner's
 * cloud copy (Convex) so progress follows them across devices.
 *
 * Usage inside a course page that already does:
 *   const [progress, setProgress] = useState(loadProgress);
 *   ...saveProgress(updated)
 *
 *   useProgressSync("financial-literacy", progress, (merged) => {
 *     setProgress(merged); saveProgress(merged);
 *   });
 *
 * Merge rules (conflict-free): arrays of numbers → union; numeric "current"
 * fields → max; nested objects → recursive; strings → prefer local value.
 * No-op when Convex is not configured or the visitor is signed out.
 */
import { useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api, convexEnabled } from "@/lib/convex";
import { useAuthUser } from "@/lib/auth";

import { mergeProgress, type Json } from "@/lib/progressMerge";
export { mergeProgress };

function useProgressSyncConvex<T extends object>(course: string, progress: T, apply: (merged: T) => void) {
  const { isSignedIn } = useAuthUser();
  const remote = useQuery(api.progress.get, isSignedIn ? { course } : "skip") as { data?: string } | null | undefined;
  const save = useMutation(api.progress.set);
  const mergedOnce = useRef(false);
  const lastPushed = useRef<string>("");

  // Pull + merge once when the remote copy arrives.
  useEffect(() => {
    if (!isSignedIn || remote === undefined || mergedOnce.current) return;
    mergedOnce.current = true;
    if (!remote?.data) return;
    try {
      const parsed = JSON.parse(remote.data) as Partial<T>;
      const merged = mergeProgress(progress, parsed);
      if (JSON.stringify(merged) !== JSON.stringify(progress)) apply(merged);
    } catch {
      /* ignore corrupt remote data */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote, isSignedIn]);

  // Push (debounced) whenever local progress changes.
  useEffect(() => {
    if (!isSignedIn || !mergedOnce.current) return;
    const serialized = JSON.stringify(progress);
    if (serialized === lastPushed.current) return;
    const id = window.setTimeout(() => {
      lastPushed.current = serialized;
      save({ course, data: serialized }).catch(() => {});
    }, 1500);
    return () => window.clearTimeout(id);
  }, [progress, isSignedIn, course, save]);
}

function useProgressSyncLocal<T extends object>(_course: string, _progress: T, _apply: (merged: T) => void) {}

export const useProgressSync: <T extends object>(course: string, progress: T, apply: (merged: T) => void) => void = convexEnabled
  ? useProgressSyncConvex
  : useProgressSyncLocal;
