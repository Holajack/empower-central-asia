import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-3";

interface Week3Data {
  coreValue1: string;
  coreValue1Why: string;
  coreValue2: string;
  coreValue2Why: string;
  coreValue3: string;
  coreValue3Why: string;
  valuesConflict: string;
  decisionQuestion1: string;
  decisionQuestion2: string;
  decisionQuestion3: string;
  valueLivingGap: string;
  alignmentCommitment: string;
}

const defaultData: Week3Data = {
  coreValue1: "",
  coreValue1Why: "",
  coreValue2: "",
  coreValue2Why: "",
  coreValue3: "",
  coreValue3Why: "",
  valuesConflict: "",
  decisionQuestion1: "",
  decisionQuestion2: "",
  decisionQuestion3: "",
  valueLivingGap: "",
  alignmentCommitment: "",
};

export default function LeadershipWeek3Worksheet() {
  const [data, setData] = useState<Week3Data>(() => {
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

  function update<K extends keyof Week3Data>(field: K, value: Week3Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.coreValue1, data.coreValue1Why,
    data.coreValue2, data.coreValue2Why,
    data.coreValue3, data.coreValue3Why,
    data.valuesConflict,
    data.decisionQuestion1, data.decisionQuestion2, data.decisionQuestion3,
    data.valueLivingGap, data.alignmentCommitment,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Values Clarification</h3>
          <p className="text-sm text-gray-500">Define the core values that drive your leadership decisions.</p>
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
          <h4 className="font-bold text-[#1B2A4A] mb-1">My Top 3 Core Values</h4>
          <p className="text-xs text-gray-500 mb-4">Not aspirational values — the values that actually guide your choices today. Think about when you've felt most alive and aligned.</p>
          <div className="space-y-5">
            {[
              { nameKey: "coreValue1", whyKey: "coreValue1Why", num: 1 },
              { nameKey: "coreValue2", whyKey: "coreValue2Why", num: 2 },
              { nameKey: "coreValue3", whyKey: "coreValue3Why", num: 3 },
            ].map(({ nameKey, whyKey, num }) => (
              <div key={nameKey} className="p-3 bg-gray-50 rounded-lg space-y-2">
                <div>
                  <label className="text-sm text-gray-700 block mb-1">Value #{num}</label>
                  <Input
                    value={data[nameKey as keyof Week3Data]}
                    onChange={e => update(nameKey as keyof Week3Data, e.target.value)}
                    placeholder="e.g., Integrity, Growth, Service, Courage..."
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 block mb-1">Why this value matters to me</label>
                  <Textarea
                    value={data[whyKey as keyof Week3Data]}
                    onChange={e => update(whyKey as keyof Week3Data, e.target.value)}
                    placeholder="What does this look like in practice? Give a specific example."
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Values Under Pressure</h4>
          <p className="text-xs text-gray-500 mb-3">Values are revealed when things get hard, not when they're easy.</p>
          <div>
            <label className="text-sm text-gray-700 block mb-1">Describe a recent situation where two of your values conflicted. How did you decide?</label>
            <Textarea
              value={data.valuesConflict}
              onChange={e => update("valuesConflict", e.target.value)}
              placeholder="e.g., My value of loyalty conflicted with my value of honesty when..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">My Decision Framework</h4>
          <p className="text-xs text-gray-500 mb-4">Build 3 questions you will ask yourself before any significant decision. Root each question in one of your core values.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Decision question #1</label>
              <Input
                value={data.decisionQuestion1}
                onChange={e => update("decisionQuestion1", e.target.value)}
                placeholder="e.g., Does this choice align with my commitment to integrity?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Decision question #2</label>
              <Input
                value={data.decisionQuestion2}
                onChange={e => update("decisionQuestion2", e.target.value)}
                placeholder="e.g., Am I making this decision out of fear or out of faith?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Decision question #3</label>
              <Input
                value={data.decisionQuestion3}
                onChange={e => update("decisionQuestion3", e.target.value)}
                placeholder="e.g., Will I be proud of this decision in five years?"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Alignment Gap & Commitment</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Where is there a gap between my stated values and how I actually lead?</label>
              <Textarea
                value={data.valueLivingGap}
                onChange={e => update("valueLivingGap", e.target.value)}
                placeholder="Be honest. What would your team say if asked how well you live your values?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">One commitment to close that gap this week</label>
              <Input
                value={data.alignmentCommitment}
                onChange={e => update("alignmentCommitment", e.target.value)}
                placeholder="Specific, observable action..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
