/**
 * "Who is studying right now" presence for a course channel.
 * Convex-backed when configured; otherwise returns an empty list.
 */
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api, convexEnabled } from "@/lib/convex";
import { useAuthUser } from "@/lib/auth";

export interface OnlineUser {
  userId: string;
  firstName: string;
  initial: string;
  color: string;
  weekNum: number;
  dayNum: number;
}

const HEARTBEAT_MS = 30_000;

function usePresenceConvex(channel: string, weekNum: number, dayNum: number): OnlineUser[] {
  const { isSignedIn } = useAuthUser();
  const heartbeat = useMutation(api.presence.heartbeat);
  const online = useQuery(api.presence.list, { channel }) as OnlineUser[] | undefined;

  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;
    const beat = () => {
      if (cancelled) return;
      heartbeat({ channel, weekNum, dayNum }).catch(() => {});
    };
    beat();
    const id = window.setInterval(beat, HEARTBEAT_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [channel, weekNum, dayNum, isSignedIn, heartbeat]);

  return online ?? [];
}

function usePresenceLocal(_channel: string, _weekNum: number, _dayNum: number): OnlineUser[] {
  return [];
}

export const usePresence: (channel: string, weekNum: number, dayNum: number) => OnlineUser[] = convexEnabled
  ? usePresenceConvex
  : usePresenceLocal;
