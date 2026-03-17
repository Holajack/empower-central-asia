import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-10";

interface Week10Data {
  missionStatement: string;
  visionStatement: string;
  bhag: string;
  bhagTimeHorizon: string;
  strategicPriority1: string;
  strategicPriority2: string;
  strategicPriority3: string;
  keyMetric1: string;
  keyMetric2: string;
  keyMetric3: string;
  biggestStrategicRisk: string;
  nextQuarterFocus: string;
  visionCommunicationPlan: string;
}

const defaultData: Week10Data = {
  missionStatement: "",
  visionStatement: "",
  bhag: "",
  bhagTimeHorizon: "",
  strategicPriority1: "",
  strategicPriority2: "",
  strategicPriority3: "",
  keyMetric1: "",
  keyMetric2: "",
  keyMetric3: "",
  biggestStrategicRisk: "",
  nextQuarterFocus: "",
  visionCommunicationPlan: "",
};

export default function LeadershipWeek10Worksheet() {
  const [data, setData] = useState<Week10Data>(() => {
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

  function update<K extends keyof Week10Data>(field: K, value: Week10Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.missionStatement, data.visionStatement, data.bhag, data.bhagTimeHorizon,
    data.strategicPriority1, data.strategicPriority2, data.strategicPriority3,
    data.keyMetric1, data.keyMetric2, data.keyMetric3,
    data.biggestStrategicRisk, data.nextQuarterFocus, data.visionCommunicationPlan,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Strategic Vision Canvas</h3>
          <p className="text-sm text-gray-500">Build your mission, vision, BHAG, and strategy map.</p>
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
          <h4 className="font-bold text-[#1B2A4A] mb-1">Mission Statement</h4>
          <p className="text-xs text-gray-500 mb-3">Why does your team/organization exist? Present tense. Under 25 words. Should answer: Who do we serve and what do we do for them?</p>
          <Textarea
            value={data.missionStatement}
            onChange={e => update("missionStatement", e.target.value)}
            placeholder="We exist to..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Vision Statement</h4>
          <p className="text-xs text-gray-500 mb-3">What will the world look like if you succeed? Future tense. 3–5 year horizon. Should be inspiring and concrete enough to guide decisions.</p>
          <Textarea
            value={data.visionStatement}
            onChange={e => update("visionStatement", e.target.value)}
            placeholder="In five years, we will have..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">BHAG (Big Hairy Audacious Goal)</h4>
          <p className="text-xs text-gray-500 mb-3">A 10–25 year goal so bold it seems almost unreasonable. Introduced by Jim Collins. Should create alignment and require radical growth to achieve.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Our BHAG</label>
              <Textarea
                value={data.bhag}
                onChange={e => update("bhag", e.target.value)}
                placeholder="e.g., Be the most trusted training organization in Central Asia..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Time horizon</label>
              <Input
                value={data.bhagTimeHorizon}
                onChange={e => update("bhagTimeHorizon", e.target.value)}
                placeholder="e.g., By 2040..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Strategic Priorities</h4>
          <p className="text-xs text-gray-500 mb-3">The 3 things that, if done well, will most advance the mission this year. If everything is a priority, nothing is.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Strategic priority #1</label>
              <Input
                value={data.strategicPriority1}
                onChange={e => update("strategicPriority1", e.target.value)}
                placeholder="What is the first most important priority?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Strategic priority #2</label>
              <Input
                value={data.strategicPriority2}
                onChange={e => update("strategicPriority2", e.target.value)}
                placeholder="What is the second most important priority?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Strategic priority #3</label>
              <Input
                value={data.strategicPriority3}
                onChange={e => update("strategicPriority3", e.target.value)}
                placeholder="What is the third most important priority?"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Key Metrics (Lead Indicators)</h4>
          <p className="text-xs text-gray-500 mb-3">What will you measure to know if your strategy is working? Choose metrics you can influence, not just observe.</p>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Key metric #1</label>
              <Input
                value={data.keyMetric1}
                onChange={e => update("keyMetric1", e.target.value)}
                placeholder="What will you track and what is your target?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Key metric #2</label>
              <Input
                value={data.keyMetric2}
                onChange={e => update("keyMetric2", e.target.value)}
                placeholder="What will you track and what is your target?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Key metric #3</label>
              <Input
                value={data.keyMetric3}
                onChange={e => update("keyMetric3", e.target.value)}
                placeholder="What will you track and what is your target?"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Strategic Risk & Next Steps</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Biggest risk to achieving the vision</label>
              <Textarea
                value={data.biggestStrategicRisk}
                onChange={e => update("biggestStrategicRisk", e.target.value)}
                placeholder="What is most likely to derail you? How will you mitigate it?"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Next quarter's focused execution priority</label>
              <Input
                value={data.nextQuarterFocus}
                onChange={e => update("nextQuarterFocus", e.target.value)}
                placeholder="What single priority will drive the most progress this quarter?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">How will you communicate this vision to your team?</label>
              <Textarea
                value={data.visionCommunicationPlan}
                onChange={e => update("visionCommunicationPlan", e.target.value)}
                placeholder="When, how, and how often? Strategy dies in silence."
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
