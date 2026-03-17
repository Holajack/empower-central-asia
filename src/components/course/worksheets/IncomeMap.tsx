import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const STORAGE_KEY = "bbb-worksheet-2";

interface GrowthPlan {
  step: string;
  timeline: string;
  obstacles: string;
  help: string;
}

interface CreateRow {
  skill: string;
  opportunity: string;
  firstStep: string;
}

interface IncomeMapData {
  currentIncome: string;
  maintainSources: string;
  maintainProtect: string;
  growthPlan: GrowthPlan;
  createRows: CreateRow[];
  goal90Day: string;
  actionThisWeek: string;
  guardCheck1: boolean;
  guardCheck2: boolean;
  guardCheck3: boolean;
  guardCheck4: boolean;
}

const defaultData: IncomeMapData = {
  currentIncome: "",
  maintainSources: "",
  maintainProtect: "",
  growthPlan: { step: "", timeline: "", obstacles: "", help: "" },
  createRows: [{ skill: "", opportunity: "", firstStep: "" }],
  goal90Day: "",
  actionThisWeek: "",
  guardCheck1: false,
  guardCheck2: false,
  guardCheck3: false,
  guardCheck4: false,
};

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function CurrencyInput({ value, onChange, label, id }: { value: string; onChange: (v: string) => void; label: string; id: string }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm text-gray-700 min-w-[140px] sm:min-w-[200px]">{label}</label>
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
        <Input
          id={id}
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="pl-7 text-right"
        />
      </div>
    </div>
  );
}

export function getWorksheet2Percent(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;
    const data: IncomeMapData = JSON.parse(saved);
    const fields = [
      data.currentIncome,
      data.maintainSources,
      data.maintainProtect,
      data.growthPlan.step,
      data.growthPlan.timeline,
      data.growthPlan.obstacles,
      data.growthPlan.help,
      data.goal90Day,
      data.actionThisWeek,
    ];
    const createFields = data.createRows?.flatMap(r => [r.skill, r.opportunity, r.firstStep]) || [];
    const checkboxes = [data.guardCheck1, data.guardCheck2, data.guardCheck3, data.guardCheck4].map(b => b ? "true" : "");
    const allFields = [...fields, ...createFields, ...checkboxes];
    const filled = allFields.filter(f => f && String(f).trim() !== "").length;
    return Math.round((filled / allFields.length) * 100);
  } catch { return 0; }
}

export default function IncomeMap() {
  const [data, setData] = useState<IncomeMapData>(() => {
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

  // Auto-save debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  function update<K extends keyof IncomeMapData>(field: K, value: IncomeMapData[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateGrowth(field: keyof GrowthPlan, value: string) {
    setData(prev => ({ ...prev, growthPlan: { ...prev.growthPlan, [field]: value } }));
  }

  function updateCreate(index: number, field: keyof CreateRow, value: string) {
    setData(prev => {
      const createRows = [...prev.createRows];
      createRows[index] = { ...createRows[index], [field]: value };
      return { ...prev, createRows };
    });
  }

  function addCreate() {
    setData(prev => ({ ...prev, createRows: [...prev.createRows, { skill: "", opportunity: "", firstStep: "" }] }));
  }

  function removeCreate(index: number) {
    setData(prev => ({
      ...prev,
      createRows: prev.createRows.length > 1 ? prev.createRows.filter((_, i) => i !== index) : prev.createRows,
    }));
  }

  // Completion percentage
  const allFields = [
    data.currentIncome,
    data.maintainSources,
    data.maintainProtect,
    data.growthPlan.step,
    data.growthPlan.timeline,
    data.growthPlan.obstacles,
    data.growthPlan.help,
    data.goal90Day,
    data.actionThisWeek,
    ...data.createRows.flatMap(r => [r.skill, r.opportunity, r.firstStep]),
  ];
  const checkboxes = [data.guardCheck1, data.guardCheck2, data.guardCheck3, data.guardCheck4];
  const checkboxCount = checkboxes.filter(Boolean).length;
  const filledCount = allFields.filter(f => f && f.trim() !== "").length + checkboxCount;
  const completionPercent = Math.round((filledCount / (allFields.length + checkboxes.length)) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">90-Day Income Map</h3>
          <p className="text-sm text-gray-500">Your data is saved automatically to this device.</p>
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

      {/* Progress */}
      <div className="no-print">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Worksheet Progress</span>
          <span>{completionPercent}%</span>
        </div>
        <Progress value={completionPercent} className="h-2" />
      </div>

      {/* Current Income */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Current Monthly Income</h4>
          <p className="text-xs text-gray-500 mb-4">Where are you starting from?</p>
          <CurrencyInput id="current-income" label="Monthly income" value={data.currentIncome} onChange={v => update("currentIncome", v)} />
        </CardContent>
      </Card>

      {/* Maintain Section */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Maintain: Protect What You Have</h4>
          <p className="text-xs text-gray-500 mb-4">List your current income sources and how you'll protect them.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Current income sources</label>
              <Textarea
                value={data.maintainSources}
                onChange={e => update("maintainSources", e.target.value)}
                placeholder="e.g., Main job, side work, rental income..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What will you do to protect these sources?</label>
              <Textarea
                value={data.maintainProtect}
                onChange={e => update("maintainProtect", e.target.value)}
                placeholder="e.g., Show up on time, improve skills, maintain equipment..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grow Section */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Grow: Increase Current Income</h4>
          <p className="text-xs text-gray-500 mb-4">Pick ONE specific way to grow your current income.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Specific step to grow income</label>
              <Input
                value={data.growthPlan.step}
                onChange={e => updateGrowth("step", e.target.value)}
                placeholder="e.g., Ask for raise, take on more hours, learn new skill..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Timeline</label>
              <Input
                value={data.growthPlan.timeline}
                onChange={e => updateGrowth("timeline", e.target.value)}
                placeholder="e.g., Within 30 days, by end of quarter..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What obstacles might stop you?</label>
              <Textarea
                value={data.growthPlan.obstacles}
                onChange={e => updateGrowth("obstacles", e.target.value)}
                placeholder="e.g., Fear of asking, don't know what to say, timing..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Who can help you?</label>
              <Input
                value={data.growthPlan.help}
                onChange={e => updateGrowth("help", e.target.value)}
                placeholder="e.g., Mentor, manager, friend who did this..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Section */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Create: New Income Sources</h4>
          <p className="text-xs text-gray-500 mb-4">What skills or talents could become income?</p>

          <div className="space-y-4">
            {data.createRows.map((row, i) => (
              <div key={i} className="grid grid-cols-1 gap-3 p-3 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Skill or talent</label>
                  <Input
                    value={row.skill}
                    onChange={e => updateCreate(i, "skill", e.target.value)}
                    placeholder="e.g., Cooking, repairs, childcare, crafts..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Potential opportunity</label>
                  <Input
                    value={row.opportunity}
                    onChange={e => updateCreate(i, "opportunity", e.target.value)}
                    placeholder="e.g., Weekend catering, side repairs, babysitting..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">First step to test it</label>
                  <Input
                    value={row.firstStep}
                    onChange={e => updateCreate(i, "firstStep", e.target.value)}
                    placeholder="e.g., Tell 3 friends, post on social media, make sample..."
                  />
                </div>
                {data.createRows.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeCreate(i)} className="text-red-400 hover:text-red-600 no-print w-fit">
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addCreate} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Another Idea
          </Button>
        </CardContent>
      </Card>

      {/* 90-Day Goals */}
      <Card className="border-blue-300 bg-blue-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">My 90-Day Income Goal</h4>
          <div className="space-y-3">
            <CurrencyInput id="goal-90" label="Income goal in 90 days" value={data.goal90Day} onChange={v => update("goal90Day", v)} />
            <div>
              <label className="text-sm text-gray-700 block mb-1">ONE action I will take this week</label>
              <Input
                value={data.actionThisWeek}
                onChange={e => update("actionThisWeek", e.target.value)}
                placeholder="What's your first step?"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guardrails Checklist */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Guardrails: Check Your Heart</h4>
          <p className="text-xs text-gray-500 mb-4">Income growth must be wise and sustainable.</p>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox
                id="guard1"
                checked={data.guardCheck1}
                onCheckedChange={(checked) => update("guardCheck1", checked as boolean)}
              />
              <label htmlFor="guard1" className="text-sm text-gray-700 cursor-pointer">
                Does not sacrifice family time or relationships
              </label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="guard2"
                checked={data.guardCheck2}
                onCheckedChange={(checked) => update("guardCheck2", checked as boolean)}
              />
              <label htmlFor="guard2" className="text-sm text-gray-700 cursor-pointer">
                Does not replace rest or harm my health
              </label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="guard3"
                checked={data.guardCheck3}
                onCheckedChange={(checked) => update("guardCheck3", checked as boolean)}
              />
              <label htmlFor="guard3" className="text-sm text-gray-700 cursor-pointer">
                Rooted in stewardship, not greed or comparison
              </label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="guard4"
                checked={data.guardCheck4}
                onCheckedChange={(checked) => update("guardCheck4", checked as boolean)}
              />
              <label htmlFor="guard4" className="text-sm text-gray-700 cursor-pointer">
                I have prayed and considered this carefully
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
