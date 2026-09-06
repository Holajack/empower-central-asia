/**
 * Course chat — one channel per course (e.g. "financial-literacy").
 *
 * Backed by Convex when VITE_CONVEX_URL is configured; otherwise a harmless
 * local no-op so the UI still renders (empty state + disabled send).
 */
import { useCallback } from "react";
import { useMutation, useQuery } from "convex/react";
import { api, convexEnabled } from "@/lib/convex";
import { useAuthUser } from "@/lib/auth";

export interface ChatMessage {
  _id: string;
  channel: string;
  userId: string;
  senderName: string;
  senderInitial: string;
  senderColor: string;
  content: string;
  createdAt: number;
}

export interface CourseChatState {
  messages: ChatMessage[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  /** Whether the current visitor can post (signed in + backend available). */
  canSend: boolean;
  currentUserId: string;
}

function useCourseChatConvex(channel: string): CourseChatState {
  const { isSignedIn, user } = useAuthUser();
  const messages = useQuery(api.chat.list, { channel, limit: 100 }) as ChatMessage[] | undefined;
  const send = useMutation(api.chat.send);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!isSignedIn) return;
      const trimmed = content.trim();
      if (!trimmed) return;
      await send({ channel, content: trimmed.slice(0, 500) });
    },
    [channel, isSignedIn, send]
  );

  return {
    messages: messages ?? [],
    sendMessage,
    isLoading: messages === undefined,
    canSend: isSignedIn,
    currentUserId: user?.id ?? "",
  };
}

function useCourseChatLocal(_channel: string): CourseChatState {
  const sendMessage = useCallback(async (_content: string) => {}, []);
  return { messages: [], sendMessage, isLoading: false, canSend: false, currentUserId: "" };
}

export const useCourseChat: (channel: string) => CourseChatState = convexEnabled ? useCourseChatConvex : useCourseChatLocal;
