import { BookOpen } from "lucide-react";
import type { StorySection } from "@/data/course/types";

interface StoryCardProps {
  story: StorySection;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="relative bg-[#FFFBF0] border-l-4 border-l-[#C9922A] rounded-r-lg p-6 md:p-8 my-8 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-[#C9922A]" />
        <h3 className="text-lg font-bold text-[#1B2A4A]">{story.title}</h3>
      </div>
      <div className="space-y-4">
        {story.paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-gray-700 leading-relaxed text-base"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
