import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-5";

interface StakeholderRow {
  name: string;
  role: string;
  influence: string;
  relationship: string;
  nextStep: string;
}

interface Week5Data {
  stakeholders: StakeholderRow[];
  biggestAlly: string;
  biggestChallenger: string;
  neglectedRelationship: string;
  trustBuilderAction: string;
  influenceStyle: string;
  thirtyDayGoal: string;
}

const defaultStakeholder: StakeholderRow = { name: "", role: "", influence: "", relationship: "", nextStep: "" };

const defaultData: Week5Data = {
  stakeholders: [{ ...defaultStakeholder }, { ...defaultStakeholder }, { ...defaultStakeholder }],
  biggestAlly: "",
  biggestChallenger: "",
  neglectedRelationship: "",
  trustBuilderAction: "",
  influenceStyle: "",
  thirtyDayGoal: "",
};

export default function LeadershipWeek5Worksheet() {
  const [data, setData] = useState<Week5Data>(() => {
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

  function update<K extends keyof Omit<Week5Data, "stakeholders">>(field: K, value: Week5Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateStakeholder(index: number, field: keyof StakeholderRow, value: string) {
    setData(prev => {
      const stakeholders = [...prev.stakeholders];
      stakeholders[index] = { ...stakeholders[index], [field]: value };
      return { ...prev, stakeholders };
    });
  }

  function addStakeholder() {
    setData(prev => ({ ...prev, stakeholders: [...prev.stakeholders, { ...defaultStakeholder }] }));
  }

  const allFields = [
    ...data.stakeholders.flatMap(s => [s.name, s.role, s.influence, s.relationship, s.nextStep]),
    data.biggestAlly, data.biggestChallenger, data.neglectedRelationship,
    data.trustBuilderAction, data.influenceStyle, data.thirtyDayGoal,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Influence Mapping</h3>
          <p className="text-sm text-gray-500">Map your key stakeholders and build a relationship strategy.</p>
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
          <h4 className="font-bold text-[#1B2A4A] mb-1">Stakeholder Map</h4>
          <p className="text-xs text-gray-500 mb-4">List the people who most affect your leadership effectiveness. Include upward, lateral, and downward stakeholders.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs text-gray-500 font-medium pb-2 pr-2">Name</th>
                  <th className="text-left text-xs text-gray-500 font-medium pb-2 pr-2">Role</th>
                  <th className="text-left text-xs text-gray-500 font-medium pb-2 pr-2">Influence (H/M/L)</th>
                  <th className="text-left text-xs text-gray-500 font-medium pb-2 pr-2">Relationship Quality (1–10)</th>
                  <th className="text-left text-xs text-gray-500 font-medium pb-2">Next Step</th>
                </tr>
              </thead>
              <tbody>
                {data.stakeholders.map((s, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 pr-2">
                      <Input
                        value={s.name}
                        onChange={e => updateStakeholder(i, "name", e.target.value)}
                        placeholder="Name"
                        className="text-xs"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <Input
                        value={s.role}
                        onChange={e => updateStakeholder(i, "role", e.target.value)}
                        placeholder="Title / role"
                        className="text-xs"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <select
                        value={s.influence}
                        onChange={e => updateStakeholder(i, "influence", e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
                      >
                        <option value="">—</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={s.relationship}
                        onChange={e => updateStakeholder(i, "relationship", e.target.value)}
                        className="w-16 border border-gray-300 rounded px-2 py-1.5 text-xs text-center focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                        placeholder="—"
                      />
                    </td>
                    <td className="py-2">
                      <Input
                        value={s.nextStep}
                        onChange={e => updateStakeholder(i, "nextStep", e.target.value)}
                        placeholder="Coffee, feedback, update..."
                        className="text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button variant="outline" size="sm" onClick={addStakeholder} className="no-print">
            + Add Stakeholder
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-4">Relationship Analysis</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Who is your biggest advocate or ally right now?</label>
              <Input
                value={data.biggestAlly}
                onChange={e => update("biggestAlly", e.target.value)}
                placeholder="Name and why they are your ally..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Who challenges your leadership most (constructively or not)?</label>
              <Input
                value={data.biggestChallenger}
                onChange={e => update("biggestChallenger", e.target.value)}
                placeholder="Name and how you currently handle that dynamic..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Which important relationship have you been neglecting?</label>
              <Input
                value={data.neglectedRelationship}
                onChange={e => update("neglectedRelationship", e.target.value)}
                placeholder="Be honest. Who deserves more investment from you?"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Influence Strategy</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">How would you describe your natural influence style?</label>
              <select
                value={data.influenceStyle}
                onChange={e => update("influenceStyle", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
              >
                <option value="">Select a style...</option>
                <option value="Logical/Data-driven">Logical / Data-driven</option>
                <option value="Relational/Trust-based">Relational / Trust-based</option>
                <option value="Vision/Inspiration">Vision / Inspiration</option>
                <option value="Authority/Position">Authority / Position</option>
                <option value="Collaborative/Consensus">Collaborative / Consensus</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">One trust-building action I will take this week</label>
              <Textarea
                value={data.trustBuilderAction}
                onChange={e => update("trustBuilderAction", e.target.value)}
                placeholder="Who will you reach out to? What will you do specifically?"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">My 30-day relationship-building goal</label>
              <Textarea
                value={data.thirtyDayGoal}
                onChange={e => update("thirtyDayGoal", e.target.value)}
                placeholder="Which relationships will be measurably stronger 30 days from now? What will that look like?"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
