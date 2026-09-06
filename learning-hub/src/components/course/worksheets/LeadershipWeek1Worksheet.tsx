import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-1";

interface Week1Data {
  habit1Rating: string;
  habit2Rating: string;
  habit3Rating: string;
  habit4Rating: string;
  habit5Rating: string;
  habit6Rating: string;
  habit7Rating: string;
  biggestStrength: string;
  biggestGrowthArea: string;
  commitmentThisWeek: string;
  whyLeadershipMatters: string;
}

const defaultData: Week1Data = {
  habit1Rating: "",
  habit2Rating: "",
  habit3Rating: "",
  habit4Rating: "",
  habit5Rating: "",
  habit6Rating: "",
  habit7Rating: "",
  biggestStrength: "",
  biggestGrowthArea: "",
  commitmentThisWeek: "",
  whyLeadershipMatters: "",
};

const habits = [
  { key: "habit1Rating", label: "Be Proactive", description: "I take responsibility for my choices and responses." },
  { key: "habit2Rating", label: "Begin with the End in Mind", description: "I lead with a clear personal mission and long-term vision." },
  { key: "habit3Rating", label: "Put First Things First", description: "I prioritize important over urgent tasks consistently." },
  { key: "habit4Rating", label: "Think Win-Win", description: "I seek mutual benefit in relationships and negotiations." },
  { key: "habit5Rating", label: "Seek First to Understand", description: "I listen deeply before offering my perspective." },
  { key: "habit6Rating", label: "Synergize", description: "I leverage differences and build creative collaboration." },
  { key: "habit7Rating", label: "Sharpen the Saw", description: "I invest consistently in my physical, mental, and spiritual renewal." },
];

export default function LeadershipWeek1Worksheet() {
  const [data, setData] = useState<Week1Data>(() => {
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

  function update<K extends keyof Week1Data>(field: K, value: Week1Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.habit1Rating, data.habit2Rating, data.habit3Rating,
    data.habit4Rating, data.habit5Rating, data.habit6Rating,
    data.habit7Rating, data.biggestStrength, data.biggestGrowthArea,
    data.commitmentThisWeek, data.whyLeadershipMatters,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Self-Leadership Assessment</h3>
          <p className="text-sm text-gray-500">Rate yourself on the 7 Habits of Highly Effective People.</p>
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

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">7 Habits Self-Rating</h4>
          <p className="text-xs text-gray-500 mb-4">Rate yourself 1–10 on each habit. Be honest — this is for your growth, not your resume.</p>
          <div className="space-y-5">
            {habits.map((habit) => (
              <div key={habit.key} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <p className="text-sm font-semibold text-[#1B2A4A]">{habit.label}</p>
                    <p className="text-xs text-gray-500">{habit.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <label className="text-xs text-gray-500 whitespace-nowrap">Score (1–10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={data[habit.key as keyof Week1Data]}
                      onChange={e => update(habit.key as keyof Week1Data, e.target.value)}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                      placeholder="—"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-4">Reflection</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 block mb-1">My biggest self-leadership strength right now</label>
              <Textarea
                value={data.biggestStrength}
                onChange={e => update("biggestStrength", e.target.value)}
                placeholder="Which habit scored highest? Why do you think that is?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">My biggest self-leadership growth area</label>
              <Textarea
                value={data.biggestGrowthArea}
                onChange={e => update("biggestGrowthArea", e.target.value)}
                placeholder="Which habit scored lowest? What's getting in the way?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Why does becoming a better leader matter to me?</label>
              <Textarea
                value={data.whyLeadershipMatters}
                onChange={e => update("whyLeadershipMatters", e.target.value)}
                placeholder="Who benefits when you lead well? What's at stake?"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">My Commitment This Week</h4>
          <div>
            <label className="text-sm text-gray-700 block mb-1">One specific action I will take to strengthen my lowest habit</label>
            <Textarea
              value={data.commitmentThisWeek}
              onChange={e => update("commitmentThisWeek", e.target.value)}
              placeholder="Be specific: what will you do, when, and how will you know it worked?"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
