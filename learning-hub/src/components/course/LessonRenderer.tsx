import { useState } from "react";
import { ChevronDown, Lightbulb, MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { LessonSection } from "@/data/course/types";

interface LessonRendererProps {
  sections: LessonSection[];
}

function CalloutCard({ type, content }: { type: 'tip' | 'warning' | 'example'; content: string }) {
  const styles = {
    tip: { bg: "bg-blue-50 border-blue-200", icon: "text-blue-600", label: "Tip" },
    warning: { bg: "bg-amber-50 border-amber-200", icon: "text-amber-600", label: "Watch Out" },
    example: { bg: "bg-green-50 border-green-200", icon: "text-green-600", label: "Example" },
  };
  const s = styles[type];
  return (
    <div className={`${s.bg} border rounded-lg p-4 my-6`}>
      <div className={`text-xs font-bold uppercase tracking-wide ${s.icon} mb-1`}>{s.label}</div>
      <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}

function QuestionsToConsider({ questions }: { questions: string[] }) {
  return (
    <div className="bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 rounded-lg p-5 my-8">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4 text-[#C9922A]" />
        <h4 className="text-sm font-bold text-[#1B2A4A] uppercase tracking-wide">Questions to Consider</h4>
      </div>
      <ul className="space-y-2">
        {questions.map((q, i) => (
          <li key={i} className="text-sm text-gray-700 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#C9922A] before:rounded-full">
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeeperPerspectiveSection({ perspective }: { perspective: NonNullable<LessonSection['deeperPerspective']> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-8 border border-[#C9922A]/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-[#C9922A]/5 hover:bg-[#C9922A]/10 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#C9922A]" />
          <span className="font-semibold text-[#1B2A4A] text-sm">{perspective.title}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#C9922A] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-5 space-y-4 border-t border-[#C9922A]/10">
          {perspective.content.map((para, i) => (
            <p key={i} className="text-sm text-gray-700 leading-relaxed">{para}</p>
          ))}

          {perspective.insightStory && (
            <div className="bg-[#C9922A]/5 rounded-lg p-4 border-l-3 border-l-[#C9922A] my-4">
              <p className="text-sm text-gray-700 leading-relaxed italic">{perspective.insightStory}</p>
            </div>
          )}

          {perspective.questions.length > 0 && (
            <div className="mt-4 space-y-2">
              <h5 className="text-xs font-bold text-[#C9922A] uppercase tracking-wide">Reflect on This</h5>
              {perspective.questions.map((q, i) => (
                <p key={i} className="text-sm text-gray-600 italic leading-relaxed">{q}</p>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-[#C9922A]/10">
            <Link to="/community" className="text-xs text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors">
              Have questions about what you just read? We'd love to talk. →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LessonRenderer({ sections }: LessonRendererProps) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.id} id={`lesson-${section.id}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-[#C9922A] flex-shrink-0" />
            {section.heading}
          </h2>

          <div className="space-y-4">
            {section.content.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-base md:text-lg">
                {para}
              </p>
            ))}
          </div>

          {section.callout && (
            <CalloutCard type={section.callout.type} content={section.callout.content} />
          )}

          {section.questionsToConsider && section.questionsToConsider.length > 0 && (
            <QuestionsToConsider questions={section.questionsToConsider} />
          )}

          {section.deeperPerspective && (
            <DeeperPerspectiveSection perspective={section.deeperPerspective} />
          )}
        </section>
      ))}
    </div>
  );
}
