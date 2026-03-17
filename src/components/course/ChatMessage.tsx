function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface ChatMessageProps {
  senderName: string;
  senderInitial: string;
  senderColor: string;
  content: string;
  createdAt: number;
  isOwn: boolean;
}

export default function ChatMessage({
  senderName,
  senderInitial,
  senderColor,
  content,
  createdAt,
  isOwn,
}: ChatMessageProps) {
  return (
    <div className={`flex gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-7 h-7 rounded-full ${senderColor} flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white`}
      >
        {senderInitial}
      </div>
      <div className={`max-w-[75%] ${isOwn ? "text-right" : ""}`}>
        <div className="flex items-baseline gap-1.5 mb-0.5">
          <span
            className={`text-[10px] font-medium ${
              isOwn ? "text-[#C9922A]" : "text-gray-600"
            }`}
          >
            {senderName}
          </span>
          <span className="text-[9px] text-gray-400">
            {formatRelativeTime(createdAt)}
          </span>
        </div>
        <div
          className={`text-xs px-3 py-1.5 rounded-xl inline-block text-left ${
            isOwn
              ? "bg-[#C9922A]/10 text-[#1B2A4A]"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
