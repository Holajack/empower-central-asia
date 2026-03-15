import { Link } from "react-router-dom";
import { Users, ArrowRight, MessageCircle } from "lucide-react";
import type { OnlineUser } from "@/hooks/usePresence";

interface PresenceBarProps {
  onlineUsers: OnlineUser[];
  onOpenChat: () => void;
  isCentralAsia: boolean;
  unreadCount: number;
}

export default function PresenceBar({
  onlineUsers,
  onOpenChat,
  isCentralAsia,
  unreadCount,
}: PresenceBarProps) {
  const count = onlineUsers.length;
  const shown = onlineUsers.slice(0, 6);
  const overflow = count - shown.length;

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-xs text-gray-500">
          {count === 0
            ? isCentralAsia
              ? "Никого нет в сети"
              : "No one online"
            : isCentralAsia
            ? `${count} в сети`
            : `${count} online`}
        </span>
      </div>

      {count > 0 && (
        <div className="flex -space-x-1.5 mb-3">
          {shown.map((u) => (
            <div
              key={u.userId}
              title={u.firstName}
              className={`w-6 h-6 rounded-full ${u.color} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}
            >
              {u.initial}
            </div>
          ))}
          {overflow > 0 && (
            <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[9px] font-bold text-gray-600">
              +{overflow}
            </div>
          )}
        </div>
      )}

      <button
        onClick={onOpenChat}
        className="flex items-center gap-1.5 text-xs text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors mb-2 relative"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        {isCentralAsia ? "Чат курса" : "Course Chat"}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-4 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <Link
        to="/cohort"
        className="flex items-center gap-1 text-xs text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors"
      >
        {isCentralAsia
          ? "Присоединиться к когорте"
          : "Join a Live Cohort"}
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
