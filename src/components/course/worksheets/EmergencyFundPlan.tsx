import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "bbb-worksheet-5";

interface SellItem {
  item: string;
  value: string;
}

interface EmergencyFundData {
  housing: string;
  utilities: string;
  food: string;
  transport: string;
  insurance: string;
  minDebt: string;
  currentSavings: string;
  monthlySavings: string;
  sellItems: SellItem[];
}

const defaultData: EmergencyFundData = {
  housing: "",
  utilities: "",
  food: "",
  transport: "",
  insurance: "",
  minDebt: "",
  currentSavings: "",
  monthlySavings: "",
  sellItems: [{ item: "", value: "" }],
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

export function getWorksheet5Percent(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;
    const data: EmergencyFundData = JSON.parse(saved);
    const fields = [
      data.housing,
      data.utilities,
      data.food,
      data.transport,
      data.insurance,
      data.minDebt,
      data.currentSavings,
      data.monthlySavings,
    ];
    const sellFields = data.sellItems?.flatMap(s => [s.item, s.value]) || [];
    const allFields = [...fields, ...sellFields];
    const filled = allFields.filter(f => f && f.trim() !== "").length;
    return Math.round((filled / allFields.length) * 100);
  } catch { return 0; }
}

export default function EmergencyFundPlan() {
  const [data, setData] = useState<EmergencyFundData>(() => {
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

  function update<K extends keyof EmergencyFundData>(field: K, value: EmergencyFundData[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateSellItem(index: number, field: keyof SellItem, value: string) {
    setData(prev => {
      const sellItems = [...prev.sellItems];
      sellItems[index] = { ...sellItems[index], [field]: value };
      return { ...prev, sellItems };
    });
  }

  function addSellItem() {
    setData(prev => ({ ...prev, sellItems: [...prev.sellItems, { item: "", value: "" }] }));
  }

  function removeSellItem(index: number) {
    setData(prev => ({
      ...prev,
      sellItems: prev.sellItems.length > 1 ? prev.sellItems.filter((_, i) => i !== index) : prev.sellItems,
    }));
  }

  // Calculations
  const essentialMonthly = [
    data.housing,
    data.utilities,
    data.food,
    data.transport,
    data.insurance,
    data.minDebt,
  ].reduce((sum, v) => sum + parseNum(v), 0);

  const level1 = 1000; // Fixed starter amount
  const level2 = essentialMonthly;
  const level3 = essentialMonthly * 3;
  const level4 = essentialMonthly * 6;

  const currentSavings = parseNum(data.currentSavings);
  const gapToLevel1 = Math.max(0, level1 - currentSavings);
  const monthlySavings = parseNum(data.monthlySavings);
  const monthsToLevel1 = monthlySavings > 0 ? Math.ceil(gapToLevel1 / monthlySavings) : null;

  const totalSellValue = data.sellItems.reduce((sum, item) => sum + parseNum(item.value), 0);

  // Completion percentage
  const allFields = [
    data.housing,
    data.utilities,
    data.food,
    data.transport,
    data.insurance,
    data.minDebt,
    data.currentSavings,
    data.monthlySavings,
    ...data.sellItems.flatMap(s => [s.item, s.value]),
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Emergency Fund Blueprint</h3>
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

      {/* Essential Monthly Expenses */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Essential Monthly Expenses</h4>
          <p className="text-xs text-gray-500 mb-4">What would you need to survive in an emergency?</p>
          <div className="space-y-3">
            <CurrencyInput id="ef-housing" label="Housing" value={data.housing} onChange={v => update("housing", v)} />
            <CurrencyInput id="ef-utilities" label="Utilities" value={data.utilities} onChange={v => update("utilities", v)} />
            <CurrencyInput id="ef-food" label="Food" value={data.food} onChange={v => update("food", v)} />
            <CurrencyInput id="ef-transport" label="Transportation" value={data.transport} onChange={v => update("transport", v)} />
            <CurrencyInput id="ef-insurance" label="Insurance" value={data.insurance} onChange={v => update("insurance", v)} />
            <CurrencyInput id="ef-debt" label="Minimum debt payments" value={data.minDebt} onChange={v => update("minDebt", v)} />
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-sm font-bold text-[#1B2A4A] min-w-[140px] sm:min-w-[200px]">Total Essential</span>
              <span className="text-lg font-bold text-blue-700">${essentialMonthly.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Fund Levels */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Emergency Fund Levels</h4>
          <p className="text-xs text-gray-500 mb-4">Build your fund in stages.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-700">Level 1: Starter Fund</div>
                <div className="text-xs text-gray-500">Get this first, before paying off debt</div>
              </div>
              <div className="text-lg font-bold text-yellow-700">${level1.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-700">Level 2: One Month</div>
                <div className="text-xs text-gray-500">After debt is gone</div>
              </div>
              <div className="text-lg font-bold text-green-700">${level2.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-700">Level 3: Three Months</div>
                <div className="text-xs text-gray-500">Strong security</div>
              </div>
              <div className="text-lg font-bold text-blue-700">${level3.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1B2A4A]/5 rounded-lg">
              <div>
                <div className="font-semibold text-gray-700">Level 4: Six Months</div>
                <div className="text-xs text-gray-500">Full protection</div>
              </div>
              <div className="text-lg font-bold text-[#1B2A4A]">${level4.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Plan */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">My Savings Plan</h4>
          <p className="text-xs text-gray-500 mb-4">Focus on Level 1 first.</p>
          <div className="space-y-3">
            <CurrencyInput id="current-sav" label="Current savings" value={data.currentSavings} onChange={v => update("currentSavings", v)} />
            <div className="flex items-center gap-2 py-2 border-y">
              <span className="text-sm text-gray-700 min-w-[140px] sm:min-w-[200px]">Gap to Level 1</span>
              <span className="text-lg font-bold text-[#C9922A]">${gapToLevel1.toFixed(2)}</span>
            </div>
            <CurrencyInput id="monthly-sav" label="Monthly savings amount" value={data.monthlySavings} onChange={v => update("monthlySavings", v)} />
            {monthsToLevel1 !== null && (
              <div className="flex items-center gap-2 py-2 border-t">
                <span className="text-sm text-gray-700 min-w-[140px] sm:min-w-[200px]">Months to Level 1</span>
                <span className="text-lg font-bold text-green-700">{monthsToLevel1} months</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Items to Sell */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Items I Could Sell</h4>
          <p className="text-xs text-gray-500 mb-4">Quick cash to jumpstart your fund.</p>

          <div className="space-y-4">
            {data.sellItems.map((item, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 items-end p-3 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Item</label>
                  <Input
                    value={item.item}
                    onChange={e => updateSellItem(i, "item", e.target.value)}
                    placeholder="e.g., Old phone, furniture, tools..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Est. Value</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.value}
                      onChange={e => updateSellItem(i, "value", e.target.value)}
                      placeholder="0.00"
                      className="pl-7 text-right w-32"
                    />
                  </div>
                </div>
                {data.sellItems.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeSellItem(i)} className="text-red-400 hover:text-red-600 no-print">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addSellItem} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Another Item
          </Button>

          {totalSellValue > 0 && (
            <div className="flex items-center gap-2 pt-3 mt-3 border-t">
              <span className="text-sm font-bold text-[#1B2A4A]">Total Potential</span>
              <span className="text-lg font-bold text-green-700">${totalSellValue.toFixed(2)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Motivation */}
      <Card className="border-[#1B2A4A]/30 bg-[#1B2A4A]/5">
        <CardContent className="py-5 text-center">
          <h4 className="font-bold text-[#1B2A4A] mb-2">The Power of Consistency</h4>
          <p className="text-sm text-gray-700">
            <strong>$200/month</strong> from age 25 at <strong>7% return</strong> becomes approximately <strong>$1 million</strong> by age 65.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Start small. Stay consistent. Let time do the work.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
