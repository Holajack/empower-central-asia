import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-2";

interface Week2Data {
  selfAwarenessScore: string;
  selfAwarenessExample: string;
  selfRegulationScore: string;
  selfRegulationTrigger: string;
  motivationScore: string;
  motivationDrives: string;
  empathyScore: string;
  empathySituation: string;
  socialSkillsScore: string;
  socialSkillsGrowth: string;
  overallEqReflection: string;
  developmentPlan: string;
}

const defaultData: Week2Data = {
  selfAwarenessScore: "",
  selfAwarenessExample: "",
  selfRegulationScore: "",
  selfRegulationTrigger: "",
  motivationScore: "",
  motivationDrives: "",
  empathyScore: "",
  empathySituation: "",
  socialSkillsScore: "",
  socialSkillsGrowth: "",
  overallEqReflection: "",
  developmentPlan: "",
};

const eqDimensions = [
  {
    scoreKey: "selfAwarenessScore",
    textKey: "selfAwarenessExample",
    label: "Self-Awareness",
    definition: "Recognizing your own emotions and their effect on others.",
    textPrompt: "Describe a recent moment when you noticed your emotions affecting your behavior.",
    textPlaceholder: "e.g., I noticed I got defensive in a meeting and it shut down the conversation...",
  },
  {
    scoreKey: "selfRegulationScore",
    textKey: "selfRegulationTrigger",
    label: "Self-Regulation",
    definition: "Managing your emotions and impulses in difficult situations.",
    textPrompt: "What is your biggest emotional trigger at work or in leadership?",
    textPlaceholder: "e.g., When someone questions my decisions in front of others...",
  },
  {
    scoreKey: "motivationScore",
    textKey: "motivationDrives",
    label: "Motivation",
    definition: "Intrinsic drive to pursue goals with energy and persistence.",
    textPrompt: "What intrinsically motivates you as a leader (beyond pay or status)?",
    textPlaceholder: "e.g., Watching someone grow and succeed because I invested in them...",
  },
  {
    scoreKey: "empathyScore",
    textKey: "empathySituation",
    label: "Empathy",
    definition: "Understanding and sharing the feelings of others.",
    textPrompt: "Describe a time you successfully understood someone's perspective before responding.",
    textPlaceholder: "e.g., A team member seemed withdrawn; instead of pushing, I asked if they were okay...",
  },
  {
    scoreKey: "socialSkillsScore",
    textKey: "socialSkillsGrowth",
    label: "Social Skills",
    definition: "Managing relationships and building networks effectively.",
    textPrompt: "What social/relational skill do you most want to develop this quarter?",
    textPlaceholder: "e.g., Having hard conversations without becoming avoidant or aggressive...",
  },
];

export default function LeadershipWeek2Worksheet() {
  const [data, setData] = useState<Week2Data>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultData;
  });
  const [saved, setSaved] = useState(false);

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  function update<K extends keyof Week2Data>(field: K, value: Week2Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.selfAwarenessScore, data.selfAwarenessExample,
    data.selfRegulationScore, data.selfRegulationTrigger,
    data.motivationScore, data.motivationDrives,
    data.empathyScore, data.empathySituation,
    data.socialSkillsScore, data.socialSkillsGrowth,
    data.overallEqReflection, data.developmentPlan,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Emotional Intelligence Audit</h3>
          <p className="text-sm text-gray-500">Assess yourself across the five dimensions of EQ.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="no-print">
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
          <Button variant="outline" size="sm" onClick={save} className="no-print">
            <Save className="w-4 h-4 mr-1" /> {saved ? "Saved!" : "Save"}
          </Button>
        </div>
      </div>

      <div className="no-print">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Worksheet Progress</span>
          <span>{completionPercent}%</span>
        </div>
        <Progress value={completionPercent} className="h-2" />
      </div>

      {eqDimensions.map((dim) => (
        <Card key={dim.scoreKey}>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h4 className="font-bold text-[#1B2A4A]">{dim.label}</h4>
                <p className="text-xs text-gray-500">{dim.definition}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <label className="text-xs text-gray-500 whitespace-nowrap">Score (1–10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={data[dim.scoreKey as keyof Week2Data]}
                  onChange={e => update(dim.scoreKey as keyof Week2Data, e.target.value)}
                  className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                  placeholder="—"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">{dim.textPrompt}</label>
              <Textarea
                value={data[dim.textKey as keyof Week2Data]}
                onChange={e => update(dim.textKey as keyof Week2Data, e.target.value)}
                placeholder={dim.textPlaceholder}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-4">Overall Reflection</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 block mb-1">What pattern do you notice across your EQ scores?</label>
              <Textarea
                value={data.overallEqReflection}
                onChange={e => update("overallEqReflection", e.target.value)}
                placeholder="What does the overall pattern tell you about your leadership style?"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">EQ Development Plan</h4>
          <div>
            <label className="text-sm text-gray-700 block mb-1">One EQ area I will intentionally develop over the next 30 days</label>
            <Textarea
              value={data.developmentPlan}
              onChange={e => update("developmentPlan", e.target.value)}
              placeholder="Which dimension? What specific practice will you use? How will you measure growth?"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
