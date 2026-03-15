import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/hooks/useCourseChat";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface CourseChatProps {
  messages: ChatMessageType[];
  onSend: (content: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isCentralAsia: boolean;
  isMobile: boolean;
}

function ChatPanel({
  messages,
  onSend,
  onClose,
  isCentralAsia,
  currentUserId,
}: {
  messages: ChatMessageType[];
  onSend: (content: string) => void;
  onClose: () => void;
  isCentralAsia: boolean;
  currentUserId: string;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="text-sm font-bold text-[#1B2A4A]">
          {isCentralAsia ? "Чат курса" : "Course Chat"}
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-8">
            {isCentralAsia
              ? "Пока нет сообщений. Начните разговор!"
              : "No messages yet. Start the conversation!"}
          </p>
        )}
        {messages.map((msg) => (
          <ChatMessage
            key={msg._id}
            senderName={msg.senderName}
            senderInitial={msg.senderInitial}
            senderColor={msg.senderColor}
            content={msg.content}
            createdAt={msg.createdAt}
            isOwn={msg.userId === currentUserId}
          />
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder={
            isCentralAsia ? "Написать сообщение..." : "Type a message..."
          }
          className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#C9922A]"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2 rounded-lg bg-[#C9922A] text-white disabled:opacity-40 hover:bg-[#C9922A]/90 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

export default function CourseChat({
  messages,
  onSend,
  isOpen,
  onClose,
  isCentralAsia,
  isMobile,
}: CourseChatProps) {
  const currentUserId = "";

  if (!isOpen) return null;

  // Mobile: vaul Drawer from bottom
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>
              {isCentralAsia ? "Чат курса" : "Course Chat"}
            </DrawerTitle>
          </DrawerHeader>
          <ChatPanel
            messages={messages}
            onSend={onSend}
            onClose={onClose}
            isCentralAsia={isCentralAsia}
            currentUserId={currentUserId}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: 320px side panel
  return (
    <aside className="w-80 border-l border-gray-200 bg-white flex-shrink-0 hidden md:flex flex-col fixed top-20 bottom-0 right-0 z-30">
      <ChatPanel
        messages={messages}
        onSend={onSend}
        onClose={onClose}
        isCentralAsia={isCentralAsia}
        currentUserId={currentUserId}
      />
    </aside>
  );
}
