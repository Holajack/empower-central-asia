import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-9";

interface DelegationRow {
  task: string;
  currentOwner: string;
  delegateTo: string;
  readinessLevel: string;
  supportNeeded: string;
  targetDate: string;
}

interface Week9Data {
  delegationBarrier: string;
  tasksOnlyIMustDo: string;
  rows: DelegationRow[];
  followUpSystem: string;
  timeSavedGoal: string;
  biggestDelegationFear: string;
}

const defaultRow: DelegationRow = {
  task: "",
  currentOwner: "",
  delegateTo: "",
  readinessLevel: "",
  supportNeeded: "",
  targetDate: "",
};

const defaultData: Week9Data = {
  delegationBarrier: "",
  tasksOnlyIMustDo: "",
  rows: [{ ...defaultRow }, { ...defaultRow }, { ...defaultRow }],
  followUpSystem: "",
  timeSavedGoal: "",
  biggestDelegationFear: "",
};

export default function LeadershipWeek9Worksheet() {
  const [data, setData] = useState<Week9Data>(() => {
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

  function update<K extends keyof Omit<Week9Data, "rows">>(field: K, value: Week9Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateRow(index: number, field: keyof DelegationRow, value: string) {
    setData(prev => {
      const rows = [...prev.rows];
      rows[index] = { ...rows[index], [field]: value };
      return { ...prev, rows };
    });
  }

  function addRow() {
    setData(prev => ({ ...prev, rows: [...prev.rows, { ...defaultRow }] }));
  }

  function removeRow(index: number) {
    setData(prev => ({
      ...prev,
      rows: prev.rows.length > 1 ? prev.rows.filter((_, i) => i !== index) : prev.rows,
    }));
  }

  const allFields = [
    data.delegationBarrier, data.tasksOnlyIMustDo,
    ...data.rows.flatMap(r => [r.task, r.currentOwner, r.delegateTo, r.readinessLevel, r.supportNeeded, r.targetDate]),
    data.followUpSystem, data.timeSavedGoal, data.biggestDelegationFear,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Delegation Matrix</h3>
          <p className="text-sm text-gray-500">Identify what to delegate, to whom, and how to set them up for success.</p>
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
          <h4 className="font-bold text-[#1B2A4A] mb-4">Delegation Audit</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">What is your biggest barrier to delegating effectively?</label>
              <select
                value={data.delegationBarrier}
                onChange={e => update("delegationBarrier", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
              >
                <option value="">Select your primary barrier...</option>
                <option value="No one can do it as well as me">No one can do it as well as me</option>
                <option value="Faster to do it myself">Faster to do it myself</option>
                <option value="Fear of losing control">Fear of losing control</option>
                <option value="My team isn't ready">My team isn't ready</option>
                <option value="I don't trust the follow-through">I don't trust the follow-through</option>
                <option value="I enjoy doing this work">I enjoy doing this work</option>
                <option value="It feels unfair to add to their load">It feels unfair to add to their load</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Tasks that only I can or should do (truly non-delegatable)</label>
              <Textarea
                value={data.tasksOnlyIMustDo}
                onChange={e => update("tasksOnlyIMustDo", e.target.value)}
                placeholder="Be ruthlessly honest. Most leaders have far fewer truly non-delegatable tasks than they think."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Delegation Opportunities</h4>
          <p className="text-xs text-gray-500 mb-4">List tasks you currently own that could be handed off. Readiness: 1 = needs heavy training, 5 = ready to run with it.</p>

          <div className="space-y-4">
            {data.rows.map((row, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1B2A4A]">Task #{i + 1}</span>
                  {data.rows.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeRow(i)} className="text-red-400 hover:text-red-600 no-print h-6 px-2">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Task / responsibility</label>
                  <Input
                    value={row.task}
                    onChange={e => updateRow(i, "task", e.target.value)}
                    placeholder="What is the task?"
                    className="text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Currently owned by</label>
                    <Input
                      value={row.currentOwner}
                      onChange={e => updateRow(i, "currentOwner", e.target.value)}
                      placeholder="You or someone else?"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Delegate to</label>
                    <Input
                      value={row.delegateTo}
                      onChange={e => updateRow(i, "delegateTo", e.target.value)}
                      placeholder="Name or role"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Readiness (1–5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={row.readinessLevel}
                      onChange={e => updateRow(i, "readinessLevel", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                      placeholder="—"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Support needed</label>
                    <Input
                      value={row.supportNeeded}
                      onChange={e => updateRow(i, "supportNeeded", e.target.value)}
                      placeholder="Training, tools, check-ins..."
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Target handoff date</label>
                    <Input
                      type="date"
                      value={row.targetDate}
                      onChange={e => updateRow(i, "targetDate", e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addRow} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Task
          </Button>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Delegation Follow-Through Plan</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">How will you follow up without micromanaging? (Your check-in system)</label>
              <Textarea
                value={data.followUpSystem}
                onChange={e => update("followUpSystem", e.target.value)}
                placeholder="e.g., Weekly 15-min check-in; progress update at team meeting; one-time review before handoff is complete..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">How many hours per week could you free up by completing this delegation?</label>
              <Input
                value={data.timeSavedGoal}
                onChange={e => update("timeSavedGoal", e.target.value)}
                placeholder="Estimate in hours..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What is your deepest fear about delegating? How will you address it?</label>
              <Textarea
                value={data.biggestDelegationFear}
                onChange={e => update("biggestDelegationFear", e.target.value)}
                placeholder="Name the fear directly and then challenge it..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
