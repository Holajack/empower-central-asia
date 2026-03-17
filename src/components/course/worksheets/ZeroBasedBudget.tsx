import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "bbb-worksheet-3";

interface BudgetCategory {
  name: string;
  recommended: string;
  planned: string;
  actual: string;
}

interface ZeroBasedBudgetData {
  income: string;
  categories: BudgetCategory[];
}

const defaultCategories: BudgetCategory[] = [
  { name: "Giving", recommended: "5-15%", planned: "", actual: "" },
  { name: "Saving", recommended: "10-15%", planned: "", actual: "" },
  { name: "Housing (rent/mortgage)", recommended: "25-30%", planned: "", actual: "" },
  { name: "Utilities", recommended: "5-10%", planned: "", actual: "" },
  { name: "Food", recommended: "10-15%", planned: "", actual: "" },
  { name: "Transportation", recommended: "10-15%", planned: "", actual: "" },
  { name: "Health/Medical", recommended: "5-10%", planned: "", actual: "" },
  { name: "Insurance", recommended: "3-8%", planned: "", actual: "" },
  { name: "Personal", recommended: "5-10%", planned: "", actual: "" },
  { name: "Entertainment", recommended: "5-10%", planned: "", actual: "" },
  { name: "Clothing", recommended: "2-5%", planned: "", actual: "" },
  { name: "Debt Payments", recommended: "varies", planned: "", actual: "" },
  { name: "Education", recommended: "varies", planned: "", actual: "" },
  { name: "Gifts", recommended: "varies", planned: "", actual: "" },
  { name: "Miscellaneous", recommended: "varies", planned: "", actual: "" },
];

const defaultData: ZeroBasedBudgetData = {
  income: "",
  categories: defaultCategories,
};

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function CurrencyInput({ value, onChange, id }: { value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div className="relative">
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
  );
}

export function getWorksheet3Percent(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;
    const data: ZeroBasedBudgetData = JSON.parse(saved);
    const fields = [
      data.income,
      ...data.categories.flatMap(c => [c.planned, c.actual]),
    ];
    const filled = fields.filter(f => f && f.trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  } catch { return 0; }
}

export default function ZeroBasedBudget() {
  const [data, setData] = useState<ZeroBasedBudgetData>(() => {
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

  function updateIncome(value: string) {
    setData(prev => ({ ...prev, income: value }));
  }

  function updateCategory(index: number, field: 'planned' | 'actual', value: string) {
    setData(prev => {
      const categories = [...prev.categories];
      categories[index] = { ...categories[index], [field]: value };
      return { ...prev, categories };
    });
  }

  // Calculations
  const income = parseNum(data.income);
  const totalPlanned = data.categories.reduce((sum, c) => sum + parseNum(c.planned), 0);
  const totalActual = data.categories.reduce((sum, c) => sum + parseNum(c.actual), 0);
  const zeroBasedTest = income - totalPlanned;

  // Completion percentage
  const allFields = [
    data.income,
    ...data.categories.flatMap(c => [c.planned, c.actual]),
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Zero-Based Budget</h3>
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

      {/* Income */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Monthly Income</h4>
          <p className="text-xs text-gray-500 mb-4">Your total monthly income (after taxes).</p>
          <div className="flex items-center gap-2 max-w-sm">
            <label htmlFor="income" className="text-sm text-gray-700 min-w-[120px]">Income</label>
            <CurrencyInput id="income" value={data.income} onChange={updateIncome} />
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Budget Categories</h4>
          <p className="text-xs text-gray-500 mb-4">Assign every dollar. Track planned vs. actual spending.</p>

          {/* Desktop view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Recommended</th>
                  <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Planned ($)</th>
                  <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Actual ($)</th>
                  <th className="text-right py-2 pl-2 text-sm font-semibold text-gray-700">Difference</th>
                </tr>
              </thead>
              <tbody>
                {data.categories.map((cat, i) => {
                  const diff = parseNum(cat.planned) - parseNum(cat.actual);
                  const diffColor = diff >= 0 ? "text-green-700" : "text-red-700";
                  return (
                    <tr key={i} className="border-b">
                      <td className="py-2 pr-4 text-sm text-gray-700">{cat.name}</td>
                      <td className="py-2 px-2 text-xs text-gray-500">{cat.recommended}</td>
                      <td className="py-2 px-2">
                        <CurrencyInput id={`planned-${i}`} value={cat.planned} onChange={v => updateCategory(i, 'planned', v)} />
                      </td>
                      <td className="py-2 px-2">
                        <CurrencyInput id={`actual-${i}`} value={cat.actual} onChange={v => updateCategory(i, 'actual', v)} />
                      </td>
                      <td className={`py-2 pl-2 text-right text-sm font-semibold ${diffColor}`}>
                        {diff !== 0 ? `$${Math.abs(diff).toFixed(2)}` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {data.categories.map((cat, i) => {
              const diff = parseNum(cat.planned) - parseNum(cat.actual);
              const diffColor = diff >= 0 ? "text-green-700" : "text-red-700";
              return (
                <div key={i} className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="font-semibold text-sm text-gray-700">{cat.name}</div>
                  <div className="text-xs text-gray-500">Recommended: {cat.recommended}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Planned</label>
                      <CurrencyInput id={`planned-mob-${i}`} value={cat.planned} onChange={v => updateCategory(i, 'planned', v)} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Actual</label>
                      <CurrencyInput id={`actual-mob-${i}`} value={cat.actual} onChange={v => updateCategory(i, 'actual', v)} />
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${diffColor}`}>
                    Difference: {diff !== 0 ? `$${Math.abs(diff).toFixed(2)} ${diff >= 0 ? "under" : "over"}` : "—"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="mt-5 pt-4 border-t space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Total Planned</span>
              <span className="text-lg font-bold text-blue-700">${totalPlanned.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Total Actual</span>
              <span className="text-lg font-bold text-[#1B2A4A]">${totalActual.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zero-Based Test */}
      <Card className={zeroBasedTest === 0 ? "border-green-300 bg-green-50/30" : "border-yellow-300 bg-yellow-50/30"}>
        <CardContent className="py-5 text-center">
          <h4 className="font-bold text-[#1B2A4A] mb-2">Zero-Based Test</h4>
          <p className="text-sm text-gray-600 mb-3">Income - Total Planned should equal $0</p>
          <div className="flex items-center justify-center gap-3 text-lg font-semibold">
            <span>${income.toFixed(2)}</span>
            <span>-</span>
            <span>${totalPlanned.toFixed(2)}</span>
            <span>=</span>
            <span className={zeroBasedTest === 0 ? "text-green-700" : "text-yellow-700"}>
              ${zeroBasedTest.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {zeroBasedTest === 0
              ? "Perfect! Every dollar has a job."
              : zeroBasedTest > 0
              ? `You have $${zeroBasedTest.toFixed(2)} unassigned. Give it a job!`
              : `You've over-planned by $${Math.abs(zeroBasedTest).toFixed(2)}. Adjust your budget.`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
