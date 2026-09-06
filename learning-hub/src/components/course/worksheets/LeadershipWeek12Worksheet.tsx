import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-12";

interface Week12Data {
  legacyStatement: string;
  coreContribution: string;
  successorCandidate1: string;
  successorCandidate2: string;
  criticalKnowledge: string;
  knowledgeTransferPlan: string;
  menteeCommitment: string;
  level5SelfAssessment: string;
  biggestGrowthArea: string;
  ninetyDayPlan: string;
  oneYearGoal: string;
  personalCommitment: string;
}

const defaultData: Week12Data = {
  legacyStatement: "",
  coreContribution: "",
  successorCandidate1: "",
  successorCandidate2: "",
  criticalKnowledge: "",
  knowledgeTransferPlan: "",
  menteeCommitment: "",
  level5SelfAssessment: "",
  biggestGrowthArea: "",
  ninetyDayPlan: "",
  oneYearGoal: "",
  personalCommitment: "",
};

export default function LeadershipWeek12Worksheet() {
  const [data, setData] = useState<Week12Data>(() => {
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

  function update<K extends keyof Week12Data>(field: K, value: Week12Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.legacyStatement, data.coreContribution,
    data.successorCandidate1, data.successorCandidate2,
    data.criticalKnowledge, data.knowledgeTransferPlan, data.menteeCommitment,
    data.level5SelfAssessment, data.biggestGrowthArea,
    data.ninetyDayPlan, data.oneYearGoal, data.personalCommitment,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Legacy & Succession Planner</h3>
          <p className="text-sm text-gray-500">Design your leadership legacy and build for what lasts beyond you.</p>
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
          <h4 className="font-bold text-[#1B2A4A] mb-1">Your Leadership Legacy</h4>
          <p className="text-xs text-gray-500 mb-3">If your team described your leadership 10 years from now, what would you want them to say? Write in their voice.</p>
          <Textarea
            value={data.legacyStatement}
            onChange={e => update("legacyStatement", e.target.value)}
            placeholder="'Working with [your name] taught me...'"
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Core Contribution</h4>
          <p className="text-xs text-gray-500 mb-3">What is the single most important contribution you can make to your organization that no one else is positioned to make right now?</p>
          <Textarea
            value={data.coreContribution}
            onChange={e => update("coreContribution", e.target.value)}
            placeholder="The contribution only I can make is..."
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Succession Readiness</h4>
          <p className="text-xs text-gray-500 mb-3">Collins found that Level 5 leaders set up their successors for even greater success. Who could replace you, and what do they need?</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Successor candidate #1 (and what they need to develop)</label>
              <Input
                value={data.successorCandidate1}
                onChange={e => update("successorCandidate1", e.target.value)}
                placeholder="Name — development needs"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Successor candidate #2</label>
              <Input
                value={data.successorCandidate2}
                onChange={e => update("successorCandidate2", e.target.value)}
                placeholder="Name — development needs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Knowledge Transfer</h4>
          <p className="text-xs text-gray-500 mb-3">What critical knowledge exists only in your head? How will you make it accessible before it is needed?</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Critical knowledge/relationships only you hold</label>
              <Textarea
                value={data.criticalKnowledge}
                onChange={e => update("criticalKnowledge", e.target.value)}
                placeholder="Key relationships, processes, institutional memory..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Transfer plan</label>
              <Textarea
                value={data.knowledgeTransferPlan}
                onChange={e => update("knowledgeTransferPlan", e.target.value)}
                placeholder="How will you document and transfer this knowledge?"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Mentee commitment (who will you invest in this quarter?)</label>
              <Input
                value={data.menteeCommitment}
                onChange={e => update("menteeCommitment", e.target.value)}
                placeholder="Name — what you will teach them"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Level 5 Leadership Self-Assessment</h4>
          <p className="text-xs text-gray-500 mb-3">Collins' Level 5 leaders combine fierce professional will with deep personal humility. Where are you on this spectrum?</p>
          <Textarea
            value={data.level5SelfAssessment}
            onChange={e => update("level5SelfAssessment", e.target.value)}
            placeholder="Where do you demonstrate humility? Where do you demonstrate professional will? Where is the gap?"
            rows={3}
          />
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Your Leadership Growth Plan</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Biggest leadership growth area from this 12-week course</label>
              <Textarea
                value={data.biggestGrowthArea}
                onChange={e => update("biggestGrowthArea", e.target.value)}
                placeholder="The most important thing I learned about my leadership is..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">90-day action plan (3 specific commitments)</label>
              <Textarea
                value={data.ninetyDayPlan}
                onChange={e => update("ninetyDayPlan", e.target.value)}
                placeholder="1. ... 2. ... 3. ..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">One-year leadership goal</label>
              <Input
                value={data.oneYearGoal}
                onChange={e => update("oneYearGoal", e.target.value)}
                placeholder="By this time next year, I will have..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Personal commitment statement</label>
              <Textarea
                value={data.personalCommitment}
                onChange={e => update("personalCommitment", e.target.value)}
                placeholder="I commit to leading with..."
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
