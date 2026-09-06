import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-11";

interface Week11Data {
  changeDescription: string;
  urgencyStatement: string;
  coalitionMember1: string;
  coalitionMember2: string;
  coalitionMember3: string;
  changeVision: string;
  communicationPlan: string;
  quickWin1: string;
  quickWin2: string;
  quickWin3: string;
  biggestResistance: string;
  resistanceMitigation: string;
  anchoringPlan: string;
}

const defaultData: Week11Data = {
  changeDescription: "",
  urgencyStatement: "",
  coalitionMember1: "",
  coalitionMember2: "",
  coalitionMember3: "",
  changeVision: "",
  communicationPlan: "",
  quickWin1: "",
  quickWin2: "",
  quickWin3: "",
  biggestResistance: "",
  resistanceMitigation: "",
  anchoringPlan: "",
};

export default function LeadershipWeek11Worksheet() {
  const [data, setData] = useState<Week11Data>(() => {
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

  function update<K extends keyof Week11Data>(field: K, value: Week11Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.changeDescription, data.urgencyStatement,
    data.coalitionMember1, data.coalitionMember2, data.coalitionMember3,
    data.changeVision, data.communicationPlan,
    data.quickWin1, data.quickWin2, data.quickWin3,
    data.biggestResistance, data.resistanceMitigation, data.anchoringPlan,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Change Leadership Planner</h3>
          <p className="text-sm text-gray-500">Map your change initiative using Kotter's 8-Step framework.</p>
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
          <h4 className="font-bold text-[#1B2A4A] mb-1">Step 1: Define the Change</h4>
          <p className="text-xs text-gray-500 mb-3">What specific change do you need to lead? Be concrete about what will be different.</p>
          <Textarea
            value={data.changeDescription}
            onChange={e => update("changeDescription", e.target.value)}
            placeholder="Describe the change you need to implement..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Step 2: Create Urgency</h4>
          <p className="text-xs text-gray-500 mb-3">Why must this change happen now? What is the cost of not changing? Kotter says 75% of leadership must be convinced of the urgency.</p>
          <Textarea
            value={data.urgencyStatement}
            onChange={e => update("urgencyStatement", e.target.value)}
            placeholder="The reason this change cannot wait is..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Step 3: Build the Guiding Coalition</h4>
          <p className="text-xs text-gray-500 mb-3">Who are the key people you need on board? You need a mix of positional authority, expertise, credibility, and leadership.</p>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Coalition member #1 (and their role/contribution)</label>
              <Input
                value={data.coalitionMember1}
                onChange={e => update("coalitionMember1", e.target.value)}
                placeholder="Name — why they matter to this change"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Coalition member #2</label>
              <Input
                value={data.coalitionMember2}
                onChange={e => update("coalitionMember2", e.target.value)}
                placeholder="Name — why they matter to this change"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Coalition member #3</label>
              <Input
                value={data.coalitionMember3}
                onChange={e => update("coalitionMember3", e.target.value)}
                placeholder="Name — why they matter to this change"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Step 4: Create a Vision for Change</h4>
          <p className="text-xs text-gray-500 mb-3">Describe the future state in one paragraph. If you cannot explain it in 5 minutes and get understanding, it is not clear enough.</p>
          <Textarea
            value={data.changeVision}
            onChange={e => update("changeVision", e.target.value)}
            placeholder="After this change, our team/organization will..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Step 5: Communication Strategy</h4>
          <p className="text-xs text-gray-500 mb-3">How will you communicate the vision? Kotter recommends over-communicating by 10x and using every vehicle possible.</p>
          <Textarea
            value={data.communicationPlan}
            onChange={e => update("communicationPlan", e.target.value)}
            placeholder="How, when, and how often will you communicate? What channels?"
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Step 6: Generate Short-Term Wins</h4>
          <p className="text-xs text-gray-500 mb-3">Identify 3 visible, unambiguous successes achievable within 30-60 days. Nothing silences cynics like visible results.</p>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Quick win #1</label>
              <Input
                value={data.quickWin1}
                onChange={e => update("quickWin1", e.target.value)}
                placeholder="What can you achieve within 30 days?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Quick win #2</label>
              <Input
                value={data.quickWin2}
                onChange={e => update("quickWin2", e.target.value)}
                placeholder="What can you achieve within 45 days?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Quick win #3</label>
              <Input
                value={data.quickWin3}
                onChange={e => update("quickWin3", e.target.value)}
                placeholder="What can you achieve within 60 days?"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Steps 7-8: Sustain and Anchor</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Biggest source of resistance you anticipate</label>
              <Textarea
                value={data.biggestResistance}
                onChange={e => update("biggestResistance", e.target.value)}
                placeholder="Who or what will push back hardest? Why?"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">How will you address that resistance?</label>
              <Textarea
                value={data.resistanceMitigation}
                onChange={e => update("resistanceMitigation", e.target.value)}
                placeholder="What is your strategy for turning resistance into engagement?"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">How will you anchor the change in culture? (so it sticks after your attention moves on)</label>
              <Textarea
                value={data.anchoringPlan}
                onChange={e => update("anchoringPlan", e.target.value)}
                placeholder="What systems, rituals, or norms will make this change permanent?"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
