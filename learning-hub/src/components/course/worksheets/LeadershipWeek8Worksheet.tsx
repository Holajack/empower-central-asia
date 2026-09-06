import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-8";

interface Week8Data {
  conflictDescription: string;
  partiesInvolved: string;
  conflictType: string;
  myPosition: string;
  otherPosition: string;
  myUnderlyingInterest: string;
  otherUnderlyingInterest: string;
  sharedInterests: string;
  optionA: string;
  optionB: string;
  optionC: string;
  selectedApproach: string;
  firstConversationPlan: string;
  successDefinition: string;
}

const defaultData: Week8Data = {
  conflictDescription: "",
  partiesInvolved: "",
  conflictType: "",
  myPosition: "",
  otherPosition: "",
  myUnderlyingInterest: "",
  otherUnderlyingInterest: "",
  sharedInterests: "",
  optionA: "",
  optionB: "",
  optionC: "",
  selectedApproach: "",
  firstConversationPlan: "",
  successDefinition: "",
};

export default function LeadershipWeek8Worksheet() {
  const [data, setData] = useState<Week8Data>(() => {
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

  function update<K extends keyof Week8Data>(field: K, value: Week8Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.conflictDescription, data.partiesInvolved, data.conflictType,
    data.myPosition, data.otherPosition,
    data.myUnderlyingInterest, data.otherUnderlyingInterest, data.sharedInterests,
    data.optionA, data.optionB, data.optionC,
    data.selectedApproach, data.firstConversationPlan, data.successDefinition,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Conflict Resolution Planner</h3>
          <p className="text-sm text-gray-500">Analyze a current conflict and plan your resolution approach.</p>
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
          <h4 className="font-bold text-[#1B2A4A] mb-4">Identify the Conflict</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Describe the conflict situation</label>
              <Textarea
                value={data.conflictDescription}
                onChange={e => update("conflictDescription", e.target.value)}
                placeholder="What is happening? When did it start? What triggered it?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Who are the parties involved?</label>
              <Input
                value={data.partiesInvolved}
                onChange={e => update("partiesInvolved", e.target.value)}
                placeholder="Names and their roles in the conflict..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Type of conflict</label>
              <select
                value={data.conflictType}
                onChange={e => update("conflictType", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
              >
                <option value="">Select conflict type...</option>
                <option value="Task/Work">Task / Work (disagreement about what to do)</option>
                <option value="Process">Process (disagreement about how to do it)</option>
                <option value="Relationship">Relationship (interpersonal tension)</option>
                <option value="Values">Values (differing deeply held beliefs)</option>
                <option value="Resources">Resources (competition for limited resources)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Analyze Interests vs. Positions</h4>
          <p className="text-xs text-gray-500 mb-4">Positions are what people say they want. Interests are the underlying needs driving them. Resolve at the interest level, not the position level.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-[#1B2A4A] block mb-1">My position (what I say I want)</label>
                <Textarea
                  value={data.myPosition}
                  onChange={e => update("myPosition", e.target.value)}
                  placeholder="What do you say you want?"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#1B2A4A] block mb-1">My underlying interest (why I want it)</label>
                <Textarea
                  value={data.myUnderlyingInterest}
                  onChange={e => update("myUnderlyingInterest", e.target.value)}
                  placeholder="What do you actually need or fear?"
                  rows={2}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-[#1B2A4A] block mb-1">Their position (what they say they want)</label>
                <Textarea
                  value={data.otherPosition}
                  onChange={e => update("otherPosition", e.target.value)}
                  placeholder="What do they say they want?"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#1B2A4A] block mb-1">Their underlying interest (your best guess)</label>
                <Textarea
                  value={data.otherUnderlyingInterest}
                  onChange={e => update("otherUnderlyingInterest", e.target.value)}
                  placeholder="What might they actually need or fear?"
                  rows={2}
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-sm text-gray-700 block mb-1">Shared interests (where your needs align)</label>
            <Textarea
              value={data.sharedInterests}
              onChange={e => update("sharedInterests", e.target.value)}
              placeholder="What do both parties actually want in common? (e.g., project success, team trust, clear expectations)"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-4">Resolution Options</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Option A</label>
              <Input
                value={data.optionA}
                onChange={e => update("optionA", e.target.value)}
                placeholder="Possible resolution approach..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Option B</label>
              <Input
                value={data.optionB}
                onChange={e => update("optionB", e.target.value)}
                placeholder="Possible resolution approach..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Option C</label>
              <Input
                value={data.optionC}
                onChange={e => update("optionC", e.target.value)}
                placeholder="Possible resolution approach..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Resolution Plan</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Chosen approach and why</label>
              <Textarea
                value={data.selectedApproach}
                onChange={e => update("selectedApproach", e.target.value)}
                placeholder="Which option and why? What makes this the right approach for this conflict?"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">How I will open the first conversation</label>
              <Textarea
                value={data.firstConversationPlan}
                onChange={e => update("firstConversationPlan", e.target.value)}
                placeholder="What will your opening words be? How will you create safety for honest conversation?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What does successful resolution look like?</label>
              <Textarea
                value={data.successDefinition}
                onChange={e => update("successDefinition", e.target.value)}
                placeholder="How will you know the conflict has been genuinely resolved (not just suppressed)?"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
