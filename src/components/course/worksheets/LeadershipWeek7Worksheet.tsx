import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-7";

interface Week7Data {
  trustScore: string;
  trustEvidence: string;
  trustWeakness: string;
  conflictScore: string;
  conflictPattern: string;
  commitmentScore: string;
  commitmentGap: string;
  accountabilityScore: string;
  accountabilityAction: string;
  resultsScore: string;
  resultsBottleneck: string;
  teamOverallHealth: string;
  priorityFix: string;
}

const defaultData: Week7Data = {
  trustScore: "",
  trustEvidence: "",
  trustWeakness: "",
  conflictScore: "",
  conflictPattern: "",
  commitmentScore: "",
  commitmentGap: "",
  accountabilityScore: "",
  accountabilityAction: "",
  resultsScore: "",
  resultsBottleneck: "",
  teamOverallHealth: "",
  priorityFix: "",
};

export default function LeadershipWeek7Worksheet() {
  const [data, setData] = useState<Week7Data>(() => {
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

  function update<K extends keyof Week7Data>(field: K, value: Week7Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.trustScore, data.trustEvidence, data.trustWeakness,
    data.conflictScore, data.conflictPattern,
    data.commitmentScore, data.commitmentGap,
    data.accountabilityScore, data.accountabilityAction,
    data.resultsScore, data.resultsBottleneck,
    data.teamOverallHealth, data.priorityFix,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  const dimensions = [
    {
      label: "Trust",
      scoreKey: "trustScore",
      description: "Do team members genuinely trust each other — vulnerability and honesty, not just politeness?",
      fields: [
        { key: "trustEvidence", prompt: "What evidence do you have that trust is (or isn't) present?" },
        { key: "trustWeakness", prompt: "What is the weakest trust link on your team right now?" },
      ],
    },
    {
      label: "Productive Conflict",
      scoreKey: "conflictScore",
      description: "Does the team engage in healthy debate and challenge ideas, or do people hold back?",
      fields: [
        { key: "conflictPattern", prompt: "Describe the conflict pattern on your team. Do people avoid it, fight personally, or engage constructively?" },
      ],
    },
    {
      label: "Commitment",
      scoreKey: "commitmentScore",
      description: "Do team members leave meetings with clear buy-in to decisions, even ones they disagreed with?",
      fields: [
        { key: "commitmentGap", prompt: "Where do you see ambiguity or low commitment affecting team performance?" },
      ],
    },
    {
      label: "Accountability",
      scoreKey: "accountabilityScore",
      description: "Do team members hold each other accountable without needing the leader to do it?",
      fields: [
        { key: "accountabilityAction", prompt: "What accountability gap on your team needs to be addressed?" },
      ],
    },
    {
      label: "Results",
      scoreKey: "resultsScore",
      description: "Is the team focused on collective results, or do individuals prioritize personal agendas?",
      fields: [
        { key: "resultsBottleneck", prompt: "What is the biggest bottleneck preventing your team from achieving its collective goal?" },
      ],
    },
  ];

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Team Health Check</h3>
          <p className="text-sm text-gray-500">Assess your team across the five dysfunctions framework.</p>
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

      <Card className="border-[#1B2A4A]/20 bg-[#1B2A4A]/5">
        <CardContent className="pt-4 pb-3">
          <p className="text-xs text-[#1B2A4A] font-medium">Based on Patrick Lencioni's Five Dysfunctions of a Team</p>
          <p className="text-xs text-gray-500 mt-1">Rate your team 1–10 on each dimension. Be honest — the purpose is diagnosis, not performance review.</p>
        </CardContent>
      </Card>

      {dimensions.map((dim) => (
        <Card key={dim.scoreKey}>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h4 className="font-bold text-[#1B2A4A]">{dim.label}</h4>
                <p className="text-xs text-gray-500">{dim.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <label className="text-xs text-gray-500 whitespace-nowrap">Score (1–10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={data[dim.scoreKey as keyof Week7Data]}
                  onChange={e => update(dim.scoreKey as keyof Week7Data, e.target.value)}
                  className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                  placeholder="—"
                />
              </div>
            </div>
            <div className="space-y-3">
              {dim.fields.map(f => (
                <div key={f.key}>
                  <label className="text-sm text-gray-700 block mb-1">{f.prompt}</label>
                  <Textarea
                    value={data[f.key as keyof Week7Data]}
                    onChange={e => update(f.key as keyof Week7Data, e.target.value)}
                    placeholder="Be specific about what you observe..."
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Team Health Summary & Action Plan</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Overall team health assessment</label>
              <Textarea
                value={data.teamOverallHealth}
                onChange={e => update("teamOverallHealth", e.target.value)}
                placeholder="What is the overall picture? What is the team's greatest strength and biggest risk?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Priority fix: the one thing I will address first</label>
              <Textarea
                value={data.priorityFix}
                onChange={e => update("priorityFix", e.target.value)}
                placeholder="What will you do specifically? When? How will you measure improvement?"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
