import { useState, useEffect } from "react";
import { ChevronDown, Printer, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FourHatsCheckpointDef } from "@/data/business-course/types";
import { useRegion } from "@/contexts/RegionContext";

interface FourHatsCheckpointProps {
  weekNum: number;
  checkpoint: FourHatsCheckpointDef;
}

interface HatData {
  white: string;
  black: string;
  yellow: string;
  gold: string;
  pitch: string;
  actionItems: string;
}

const defaultHatData: HatData = {
  white: "",
  black: "",
  yellow: "",
  gold: "",
  pitch: "",
  actionItems: "",
};

const hatConfig = [
  {
    key: "white" as const,
    label: "White Hat",
    labelRu: "Белая шляпа",
    subtitle: "Facts & Clarifying Questions",
    subtitleRu: "Факты и уточняющие вопросы",
    bg: "bg-gray-50",
    border: "border-gray-300",
    headerBg: "bg-gray-100",
    headerText: "text-gray-800",
    icon: "text-gray-600",
  },
  {
    key: "black" as const,
    label: "Black Hat",
    labelRu: "Чёрная шляпа",
    subtitle: "Risks, Dangers & Weaknesses",
    subtitleRu: "Риски, опасности и слабые стороны",
    bg: "bg-gray-900/5",
    border: "border-gray-700",
    headerBg: "bg-gray-800",
    headerText: "text-white",
    icon: "text-gray-300",
  },
  {
    key: "yellow" as const,
    label: "Yellow Hat",
    labelRu: "Жёлтая шляпа",
    subtitle: "Values, Benefits & Positives",
    subtitleRu: "Ценности, преимущества и позитив",
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    headerBg: "bg-yellow-100",
    headerText: "text-yellow-900",
    icon: "text-yellow-600",
  },
  {
    key: "gold" as const,
    label: "Gold Hat",
    labelRu: "Золотая шляпа",
    subtitle: "Ideas, Alternatives & Solutions",
    subtitleRu: "Идеи, альтернативы и решения",
    bg: "bg-amber-50",
    border: "border-amber-400",
    headerBg: "bg-gradient-to-r from-amber-500 to-yellow-500",
    headerText: "text-white",
    icon: "text-amber-200",
  },
];

export default function FourHatsCheckpoint({ weekNum, checkpoint }: FourHatsCheckpointProps) {
  const { isCentralAsia } = useRegion();
  const storageKey = `bbb-business-fourhats-${weekNum}`;

  const [data, setData] = useState<HatData>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultHatData;
  });

  const [openHats, setOpenHats] = useState<Record<string, boolean>>({ white: true, black: false, yellow: false, gold: false });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timer);
  }, [data, storageKey]);

  function toggleHat(key: string) {
    setOpenHats((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function manualSave() {
    localStorage.setItem(storageKey, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  const prompts: Record<string, string> = {
    white: checkpoint.whiteHatPrompt,
    black: checkpoint.blackHatPrompt,
    yellow: checkpoint.yellowHatPrompt,
    gold: checkpoint.goldHatPrompt,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">
            {isCentralAsia
              ? `Контрольная точка «Четыре шляпы» #${checkpoint.checkpointNumber}`
              : `Four Hats Checkpoint #${checkpoint.checkpointNumber}`}
          </h3>
          <p className="text-sm text-gray-500">
            {isCentralAsia
              ? "Структурированная обратная связь от группы. Запишите результаты каждой шляпы."
              : "Structured peer feedback. Record insights from each hat below."}
          </p>
        </div>
        <div className="flex items-center gap-2 no-print">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-1" /> {isCentralAsia ? "Печать" : "Print"}
          </Button>
          <Button variant="outline" size="sm" onClick={manualSave}>
            <Save className="w-4 h-4 mr-1" /> {saved ? (isCentralAsia ? "Сохранено!" : "Saved!") : (isCentralAsia ? "Сохранить" : "Save")}
          </Button>
        </div>
      </div>

      {/* Pitch Prep */}
      <Card className="border-[#C9922A]/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">
            {isCentralAsia ? "Подготовка питча (до 60 секунд)" : "Pitch Prep (Under 60 Seconds)"}
          </h4>
          <p className="text-xs text-gray-500 mb-3">{checkpoint.pitchPrompt}</p>
          <textarea
            value={data.pitch}
            onChange={(e) => setData((prev) => ({ ...prev, pitch: e.target.value }))}
            placeholder={isCentralAsia ? "Запишите ваш питч здесь..." : "Write your pitch here..."}
            className="w-full min-h-[80px] p-3 border border-gray-200 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50"
          />
        </CardContent>
      </Card>

      {/* Evaluation Focus */}
      <div className="text-sm text-gray-600 bg-[#1B2A4A]/5 rounded-lg p-3">
        <span className="font-medium text-[#1B2A4A]">
          {isCentralAsia ? "Фокус оценки: " : "Evaluation Focus: "}
        </span>
        {checkpoint.evaluationPrompt}
      </div>

      {/* Four Hats */}
      {hatConfig.map((hat) => (
        <Card key={hat.key} className={`${hat.border} border overflow-hidden`}>
          <button
            onClick={() => toggleHat(hat.key)}
            className={`w-full flex items-center justify-between p-4 ${hat.headerBg} ${hat.headerText} text-left no-print`}
          >
            <div>
              <span className="font-bold text-sm">{isCentralAsia ? hat.labelRu : hat.label}</span>
              <span className="text-xs opacity-75 ml-2">
                {isCentralAsia ? hat.subtitleRu : hat.subtitle}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openHats[hat.key] ? "rotate-180" : ""}`} />
          </button>

          {/* Print: always show. Screen: toggle */}
          <div className={`${openHats[hat.key] ? "block" : "hidden"} print:block`}>
            <CardContent className={`pt-4 ${hat.bg}`}>
              <p className="text-xs text-gray-500 mb-2 italic">{prompts[hat.key]}</p>
              <textarea
                value={data[hat.key]}
                onChange={(e) => setData((prev) => ({ ...prev, [hat.key]: e.target.value }))}
                placeholder={isCentralAsia ? "Запишите отзывы здесь..." : "Record feedback here..."}
                className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50 bg-white"
              />
            </CardContent>
          </div>
        </Card>
      ))}

      {/* Action Items from Gold Hat */}
      <Card className="border-amber-300">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">
            {isCentralAsia ? "Действия после обратной связи" : "Post-Feedback Action Items"}
          </h4>
          <p className="text-xs text-gray-500 mb-3">
            {isCentralAsia
              ? "На основе полученной обратной связи, что вы измените до следующей контрольной точки?"
              : "Based on feedback received, what will you change before the next checkpoint?"}
          </p>
          <textarea
            value={data.actionItems}
            onChange={(e) => setData((prev) => ({ ...prev, actionItems: e.target.value }))}
            placeholder={isCentralAsia ? "1. \n2. \n3. " : "1. \n2. \n3. "}
            className="w-full min-h-[80px] p-3 border border-gray-200 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50"
          />
        </CardContent>
      </Card>
    </div>
  );
}
