import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-6";

interface Week6Data {
  coacheeName: string;
  growthGoal: string;
  goalCurrentReality: string;
  goalObstacles: string;
  growthOptions1: string;
  growthOptions2: string;
  growthOptions3: string;
  wayForwardAction: string;
  wayForwardTimeline: string;
  wayForwardAccountability: string;
  coachingApproachReflection: string;
  nextSessionDate: string;
}

const defaultData: Week6Data = {
  coacheeName: "",
  growthGoal: "",
  goalCurrentReality: "",
  goalObstacles: "",
  growthOptions1: "",
  growthOptions2: "",
  growthOptions3: "",
  wayForwardAction: "",
  wayForwardTimeline: "",
  wayForwardAccountability: "",
  coachingApproachReflection: "",
  nextSessionDate: "",
};

export default function LeadershipWeek6Worksheet() {
  const [data, setData] = useState<Week6Data>(() => {
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

  function update<K extends keyof Week6Data>(field: K, value: Week6Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.coacheeName, data.growthGoal, data.goalCurrentReality,
    data.goalObstacles, data.growthOptions1, data.growthOptions2,
    data.growthOptions3, data.wayForwardAction, data.wayForwardTimeline,
    data.wayForwardAccountability, data.coachingApproachReflection, data.nextSessionDate,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Coaching Plan — GROW Model</h3>
          <p className="text-sm text-gray-500">Use this template to coach someone through a growth challenge.</p>
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
          <p className="text-xs text-[#1B2A4A] font-medium">GROW Model: Goal → Reality → Options → Way Forward</p>
          <p className="text-xs text-gray-500 mt-1">Use this framework to guide a coaching conversation. Your job is to ask great questions, not provide answers.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-4">Session Setup</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Person I am coaching</label>
              <Input
                value={data.coacheeName}
                onChange={e => update("coacheeName", e.target.value)}
                placeholder="Name and role..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block bg-[#1B2A4A] text-white text-xs font-bold px-2 py-0.5 rounded">G</span>
            <h4 className="font-bold text-[#1B2A4A]">Goal</h4>
          </div>
          <p className="text-xs text-gray-500 mb-3">What does success look like? Make the goal specific and measurable.</p>
          <div>
            <label className="text-sm text-gray-700 block mb-1">What is the growth goal for this coaching engagement?</label>
            <Textarea
              value={data.growthGoal}
              onChange={e => update("growthGoal", e.target.value)}
              placeholder="e.g., Become confident leading team meetings without over-preparing; complete project X by Q2..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block bg-[#1B2A4A] text-white text-xs font-bold px-2 py-0.5 rounded">R</span>
            <h4 className="font-bold text-[#1B2A4A]">Reality</h4>
          </div>
          <p className="text-xs text-gray-500 mb-3">What is actually happening right now? Be honest and specific.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Where are they right now relative to the goal?</label>
              <Textarea
                value={data.goalCurrentReality}
                onChange={e => update("goalCurrentReality", e.target.value)}
                placeholder="Describe their current performance, behaviors, or situation..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What obstacles are in the way?</label>
              <Textarea
                value={data.goalObstacles}
                onChange={e => update("goalObstacles", e.target.value)}
                placeholder="Internal (mindset, skills, habits) and external (environment, resources, people)..."
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block bg-[#1B2A4A] text-white text-xs font-bold px-2 py-0.5 rounded">O</span>
            <h4 className="font-bold text-[#1B2A4A]">Options</h4>
          </div>
          <p className="text-xs text-gray-500 mb-3">What are the possible paths? Generate options before evaluating them.</p>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Option 1</label>
              <Input
                value={data.growthOptions1}
                onChange={e => update("growthOptions1", e.target.value)}
                placeholder="Possible approach or action..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Option 2</label>
              <Input
                value={data.growthOptions2}
                onChange={e => update("growthOptions2", e.target.value)}
                placeholder="Possible approach or action..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Option 3</label>
              <Input
                value={data.growthOptions3}
                onChange={e => update("growthOptions3", e.target.value)}
                placeholder="Possible approach or action..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block bg-[#C9A84C] text-white text-xs font-bold px-2 py-0.5 rounded">W</span>
            <h4 className="font-bold text-[#1B2A4A]">Way Forward</h4>
          </div>
          <p className="text-xs text-gray-500 mb-3">What will they commit to? Specific, owned by them, not you.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Committed action step</label>
              <Textarea
                value={data.wayForwardAction}
                onChange={e => update("wayForwardAction", e.target.value)}
                placeholder="What will they do? (Their words, not yours)"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Timeline</label>
              <Input
                value={data.wayForwardTimeline}
                onChange={e => update("wayForwardTimeline", e.target.value)}
                placeholder="By when? Be specific..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Accountability check-in</label>
              <Input
                value={data.wayForwardAccountability}
                onChange={e => update("wayForwardAccountability", e.target.value)}
                placeholder="How and when will you follow up?"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Coaching Reflection</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">How did you do as a coach? What would you do differently next time?</label>
              <Textarea
                value={data.coachingApproachReflection}
                onChange={e => update("coachingApproachReflection", e.target.value)}
                placeholder="Did you ask questions or give answers? Did you listen more than you talked?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Next coaching session date</label>
              <Input
                type="date"
                value={data.nextSessionDate}
                onChange={e => update("nextSessionDate", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
