import { useCallback } from "react";

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

export function useCourseChat(_channel: string) {
  const sendMessage = useCallback(async (_content: string) => {}, []);

  return {
    messages: [] as ChatMessage[],
    sendMessage,
    isLoading: false,
  };
}
