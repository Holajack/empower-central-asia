import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-worksheet-6";

interface GoalRow {
  goal: string;
  targetDate: string;
  firstAction: string;
}

interface ProgressReviewData {
  // Where I Started (try auto-load from Week 1)
  startIncome: string;
  startExpenses: string;
  startGap: string;
  startDebt: string;
  startSavings: string;

  // Where I Am Now
  nowIncome: string;
  nowExpenses: string;
  nowGap: string;
  nowDebt: string;
  nowSavings: string;

  // 90-Day Goals
  goals: GoalRow[];

  // Multiplication Plan
  whoToTeach: string;
  whatToShare: string;
  facilitatorInterest: boolean;
}

const defaultData: ProgressReviewData = {
  startIncome: "",
  startExpenses: "",
  startGap: "",
  startDebt: "",
  startSavings: "",
  nowIncome: "",
  nowExpenses: "",
  nowGap: "",
  nowDebt: "",
  nowSavings: "",
  goals: [{ goal: "", targetDate: "", firstAction: "" }],
  whoToTeach: "",
  whatToShare: "",
  facilitatorInterest: false,
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="pl-7 text-right"
        />
      </div>
    </div>
  );
}

export function getWorksheet6Percent(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;
    const data: ProgressReviewData = JSON.parse(saved);
    const fields = [
      data.startIncome,
      data.startExpenses,
      data.startGap,
      data.startDebt,
      data.startSavings,
      data.nowIncome,
      data.nowExpenses,
      data.nowGap,
      data.nowDebt,
      data.nowSavings,
      data.whoToTeach,
      data.whatToShare,
    ];
    const goalFields = data.goals?.flatMap(g => [g.goal, g.targetDate, g.firstAction]) || [];
    const checkboxField = data.facilitatorInterest ? "true" : "";
    const allFields = [...fields, ...goalFields, checkboxField];
    const filled = allFields.filter(f => f && String(f).trim() !== "").length;
    return Math.round((filled / allFields.length) * 100);
  } catch { return 0; }
}

export default function ProgressReview() {
  const [data, setData] = useState<ProgressReviewData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);

      // Try to auto-load Week 1 data
      const week1Data = localStorage.getItem("bbb-worksheet-1");
      if (week1Data) {
        const w1 = JSON.parse(week1Data);
        const totalIncome = parseNum(w1.incomePrimary) + parseNum(w1.incomeSecondary) + parseNum(w1.incomeOther);
        const totalExpenses = [
          w1.expenseHousing, w1.expenseUtilities, w1.expenseFood, w1.expenseTransport,
          w1.expenseInsurance, w1.expenseDebt, w1.expenseEntertainment,
          w1.expenseSubscriptions, w1.expenseGiving, w1.expenseOther,
        ].reduce((sum: number, v: string) => sum + parseNum(v), 0);
        const theGap = totalIncome - totalExpenses;
        const totalDebt = w1.debts?.reduce((sum: number, d: any) => sum + parseNum(d.balance), 0) || 0;
        const totalSavings = parseNum(w1.savingsEmergency) + parseNum(w1.savingsRetirement) + parseNum(w1.savingsOther);

        return {
          ...defaultData,
          startIncome: totalIncome.toFixed(2),
          startExpenses: totalExpenses.toFixed(2),
          startGap: theGap.toFixed(2),
          startDebt: totalDebt.toFixed(2),
          startSavings: totalSavings.toFixed(2),
        };
      }
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

  function update<K extends keyof ProgressReviewData>(field: K, value: ProgressReviewData[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateGoal(index: number, field: keyof GoalRow, value: string) {
    setData(prev => {
      const goals = [...prev.goals];
      goals[index] = { ...goals[index], [field]: value };
      return { ...prev, goals };
    });
  }

  function addGoal() {
    setData(prev => ({ ...prev, goals: [...prev.goals, { goal: "", targetDate: "", firstAction: "" }] }));
  }

  function removeGoal(index: number) {
    setData(prev => ({
      ...prev,
      goals: prev.goals.length > 1 ? prev.goals.filter((_, i) => i !== index) : prev.goals,
    }));
  }

  // Calculations
  const incomeChange = parseNum(data.nowIncome) - parseNum(data.startIncome);
  const expenseChange = parseNum(data.nowExpenses) - parseNum(data.startExpenses);
  const gapChange = parseNum(data.nowGap) - parseNum(data.startGap);
  const debtChange = parseNum(data.nowDebt) - parseNum(data.startDebt);
  const savingsChange = parseNum(data.nowSavings) - parseNum(data.startSavings);

  // Completion percentage
  const allFields = [
    data.startIncome,
    data.startExpenses,
    data.startGap,
    data.startDebt,
    data.startSavings,
    data.nowIncome,
    data.nowExpenses,
    data.nowGap,
    data.nowDebt,
    data.nowSavings,
    data.whoToTeach,
    data.whatToShare,
    ...data.goals.flatMap(g => [g.goal, g.targetDate, g.firstAction]),
  ];
  const checkboxCount = data.facilitatorInterest ? 1 : 0;
  const filledCount = allFields.filter(f => f && f.trim() !== "").length + checkboxCount;
  const completionPercent = Math.round((filledCount / (allFields.length + 1)) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Progress Review & 90-Day Plan</h3>
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

      {/* Where I Started */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Where I Started (Week 1)</h4>
          <p className="text-xs text-gray-500 mb-4">Your financial snapshot from the beginning.</p>
          <div className="space-y-3">
            <CurrencyInput id="start-inc" label="Total income" value={data.startIncome} onChange={v => update("startIncome", v)} />
            <CurrencyInput id="start-exp" label="Total expenses" value={data.startExpenses} onChange={v => update("startExpenses", v)} />
            <CurrencyInput id="start-gap" label="The gap" value={data.startGap} onChange={v => update("startGap", v)} />
            <CurrencyInput id="start-debt" label="Total debt" value={data.startDebt} onChange={v => update("startDebt", v)} />
            <CurrencyInput id="start-sav" label="Total savings" value={data.startSavings} onChange={v => update("startSavings", v)} />
          </div>
        </CardContent>
      </Card>

      {/* Where I Am Now */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Where I Am Now</h4>
          <p className="text-xs text-gray-500 mb-4">Your current financial picture.</p>
          <div className="space-y-3">
            <CurrencyInput id="now-inc" label="Total income" value={data.nowIncome} onChange={v => update("nowIncome", v)} />
            <CurrencyInput id="now-exp" label="Total expenses" value={data.nowExpenses} onChange={v => update("nowExpenses", v)} />
            <CurrencyInput id="now-gap" label="The gap" value={data.nowGap} onChange={v => update("nowGap", v)} />
            <CurrencyInput id="now-debt" label="Total debt" value={data.nowDebt} onChange={v => update("nowDebt", v)} />
            <CurrencyInput id="now-sav" label="Total savings" value={data.nowSavings} onChange={v => update("nowSavings", v)} />
          </div>
        </CardContent>
      </Card>

      {/* The Changes */}
      <Card className="border-blue-300 bg-blue-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">Your Progress</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Income change</span>
              <span className={`font-bold ${incomeChange >= 0 ? "text-green-700" : "text-red-700"}`}>
                {incomeChange >= 0 ? "+" : ""}${incomeChange.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Expense change</span>
              <span className={`font-bold ${expenseChange <= 0 ? "text-green-700" : "text-red-700"}`}>
                {expenseChange >= 0 ? "+" : ""}${expenseChange.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Gap change</span>
              <span className={`font-bold ${gapChange >= 0 ? "text-green-700" : "text-red-700"}`}>
                {gapChange >= 0 ? "+" : ""}${gapChange.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Debt change</span>
              <span className={`font-bold ${debtChange <= 0 ? "text-green-700" : "text-red-700"}`}>
                {debtChange >= 0 ? "+" : ""}${debtChange.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Savings change</span>
              <span className={`font-bold ${savingsChange >= 0 ? "text-green-700" : "text-red-700"}`}>
                {savingsChange >= 0 ? "+" : ""}${savingsChange.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 90-Day Goals */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">My 90-Day Goals</h4>
          <p className="text-xs text-gray-500 mb-4">What will you accomplish in the next 3 months?</p>

          <div className="space-y-4">
            {data.goals.map((goal, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Goal {i + 1}</label>
                  <Input
                    value={goal.goal}
                    onChange={e => updateGoal(i, "goal", e.target.value)}
                    placeholder="e.g., Save $1000 emergency fund, pay off credit card..."
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Target date</label>
                    <Input
                      type="date"
                      value={goal.targetDate}
                      onChange={e => updateGoal(i, "targetDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">First action step</label>
                    <Input
                      value={goal.firstAction}
                      onChange={e => updateGoal(i, "firstAction", e.target.value)}
                      placeholder="What's your first move?"
                    />
                  </div>
                </div>
                {data.goals.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeGoal(i)} className="text-red-400 hover:text-red-600 no-print">
                    <Trash2 className="w-4 h-4 mr-1" /> Remove Goal
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addGoal} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Another Goal
          </Button>
        </CardContent>
      </Card>

      {/* Multiplication Plan */}
      <Card className="border-[#1B2A4A]/30 bg-[#1B2A4A]/5">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">My Multiplication Plan</h4>
          <p className="text-xs text-gray-500 mb-4">Financial freedom multiplies when you teach others.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Who will you teach these principles to?</label>
              <Textarea
                value={data.whoToTeach}
                onChange={e => update("whoToTeach", e.target.value)}
                placeholder="e.g., My family, friends, church group, coworkers..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What will you share first?</label>
              <Textarea
                value={data.whatToShare}
                onChange={e => update("whatToShare", e.target.value)}
                placeholder="e.g., The gap concept, emergency fund importance, zero-based budgeting..."
                rows={2}
              />
            </div>
            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="facilitator"
                checked={data.facilitatorInterest}
                onCheckedChange={(checked) => update("facilitatorInterest", checked as boolean)}
              />
              <label htmlFor="facilitator" className="text-sm text-gray-700 cursor-pointer">
                I'm interested in becoming a facilitator and leading this course for others
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Celebration */}
      <Card className="border-green-300 bg-green-50/30">
        <CardContent className="py-5 text-center">
          <h4 className="font-bold text-[#1B2A4A] mb-2">Celebrate Your Progress!</h4>
          <p className="text-sm text-gray-700">
            You've completed the 6-week Financial Literacy course. Every step forward matters.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Remember: Financial freedom is a journey, not a destination. Keep going!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
