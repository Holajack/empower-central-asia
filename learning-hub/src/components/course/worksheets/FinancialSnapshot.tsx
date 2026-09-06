import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "bbb-worksheet-1";

interface DebtRow {
  creditor: string;
  balance: string;
  payment: string;
}

interface SnapshotData {
  incomePrimary: string;
  incomeSecondary: string;
  incomeOther: string;
  expenseHousing: string;
  expenseUtilities: string;
  expenseFood: string;
  expenseTransport: string;
  expenseInsurance: string;
  expenseDebt: string;
  expenseEntertainment: string;
  expenseSubscriptions: string;
  expenseGiving: string;
  expenseOther: string;
  debts: DebtRow[];
  savingsEmergency: string;
  savingsRetirement: string;
  savingsOther: string;
}

const defaultData: SnapshotData = {
  incomePrimary: "",
  incomeSecondary: "",
  incomeOther: "",
  expenseHousing: "",
  expenseUtilities: "",
  expenseFood: "",
  expenseTransport: "",
  expenseInsurance: "",
  expenseDebt: "",
  expenseEntertainment: "",
  expenseSubscriptions: "",
  expenseGiving: "",
  expenseOther: "",
  debts: [{ creditor: "", balance: "", payment: "" }],
  savingsEmergency: "",
  savingsRetirement: "",
  savingsOther: "",
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

export function getWorksheet1Percent(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;
    const data: SnapshotData = JSON.parse(saved);
    const fields = [
      data.incomePrimary, data.incomeSecondary, data.incomeOther,
      data.expenseHousing, data.expenseUtilities, data.expenseFood,
      data.expenseTransport, data.expenseInsurance, data.expenseDebt,
      data.expenseEntertainment, data.expenseSubscriptions, data.expenseGiving,
      data.expenseOther,
      data.savingsEmergency, data.savingsRetirement, data.savingsOther,
    ];
    const debtFields = data.debts?.flatMap(d => [d.creditor, d.balance, d.payment]) || [];
    const allFields = [...fields, ...debtFields];
    const filled = allFields.filter(f => f && f.trim() !== "").length;
    return Math.round((filled / allFields.length) * 100);
  } catch { return 0; }
}

export default function FinancialSnapshot() {
  const [data, setData] = useState<SnapshotData>(() => {
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

  function update(field: keyof Omit<SnapshotData, 'debts'>, value: string) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateDebt(index: number, field: keyof DebtRow, value: string) {
    setData(prev => {
      const debts = [...prev.debts];
      debts[index] = { ...debts[index], [field]: value };
      return { ...prev, debts };
    });
  }

  function addDebt() {
    setData(prev => ({ ...prev, debts: [...prev.debts, { creditor: "", balance: "", payment: "" }] }));
  }

  function removeDebt(index: number) {
    setData(prev => ({
      ...prev,
      debts: prev.debts.length > 1 ? prev.debts.filter((_, i) => i !== index) : prev.debts,
    }));
  }

  // Calculations
  const totalIncome = parseNum(data.incomePrimary) + parseNum(data.incomeSecondary) + parseNum(data.incomeOther);
  const totalExpenses = [
    data.expenseHousing, data.expenseUtilities, data.expenseFood, data.expenseTransport,
    data.expenseInsurance, data.expenseDebt, data.expenseEntertainment,
    data.expenseSubscriptions, data.expenseGiving, data.expenseOther,
  ].reduce((sum, v) => sum + parseNum(v), 0);
  const theGap = totalIncome - totalExpenses;
  const totalDebt = data.debts.reduce((sum, d) => sum + parseNum(d.balance), 0);
  const totalSavings = parseNum(data.savingsEmergency) + parseNum(data.savingsRetirement) + parseNum(data.savingsOther);

  // Completion percentage
  const allFields = [
    data.incomePrimary, data.incomeSecondary, data.incomeOther,
    data.expenseHousing, data.expenseUtilities, data.expenseFood,
    data.expenseTransport, data.expenseInsurance, data.expenseDebt,
    data.expenseEntertainment, data.expenseSubscriptions, data.expenseGiving,
    data.expenseOther,
    data.savingsEmergency, data.savingsRetirement, data.savingsOther,
    ...data.debts.flatMap(d => [d.creditor, d.balance, d.payment]),
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Personal Financial Snapshot</h3>
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

      {/* Income Section */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Monthly Income (after taxes)</h4>
          <p className="text-xs text-gray-500 mb-4">List all sources of income you receive each month.</p>
          <div className="space-y-3">
            <CurrencyInput id="inc-primary" label="Primary job" value={data.incomePrimary} onChange={v => update("incomePrimary", v)} />
            <CurrencyInput id="inc-secondary" label="Secondary / side income" value={data.incomeSecondary} onChange={v => update("incomeSecondary", v)} />
            <CurrencyInput id="inc-other" label="Other income" value={data.incomeOther} onChange={v => update("incomeOther", v)} />
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-sm font-bold text-[#1B2A4A] min-w-[140px] sm:min-w-[200px]">Total Monthly Income</span>
              <span className="text-lg font-bold text-green-700">${totalIncome.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Section */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Monthly Expenses</h4>
          <p className="text-xs text-gray-500 mb-4">Include everything you spend money on. Round numbers are fine.</p>
          <div className="space-y-3">
            <CurrencyInput id="exp-housing" label="Housing (rent/mortgage)" value={data.expenseHousing} onChange={v => update("expenseHousing", v)} />
            <CurrencyInput id="exp-utilities" label="Utilities" value={data.expenseUtilities} onChange={v => update("expenseUtilities", v)} />
            <CurrencyInput id="exp-food" label="Food / Groceries" value={data.expenseFood} onChange={v => update("expenseFood", v)} />
            <CurrencyInput id="exp-transport" label="Transportation" value={data.expenseTransport} onChange={v => update("expenseTransport", v)} />
            <CurrencyInput id="exp-insurance" label="Insurance" value={data.expenseInsurance} onChange={v => update("expenseInsurance", v)} />
            <CurrencyInput id="exp-debt" label="Debt payments" value={data.expenseDebt} onChange={v => update("expenseDebt", v)} />
            <CurrencyInput id="exp-entertainment" label="Entertainment / Dining" value={data.expenseEntertainment} onChange={v => update("expenseEntertainment", v)} />
            <CurrencyInput id="exp-subscriptions" label="Subscriptions" value={data.expenseSubscriptions} onChange={v => update("expenseSubscriptions", v)} />
            <CurrencyInput id="exp-giving" label="Giving / Charity" value={data.expenseGiving} onChange={v => update("expenseGiving", v)} />
            <CurrencyInput id="exp-other" label="Other" value={data.expenseOther} onChange={v => update("expenseOther", v)} />
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-sm font-bold text-[#1B2A4A] min-w-[140px] sm:min-w-[200px]">Total Monthly Expenses</span>
              <span className="text-lg font-bold text-red-700">${totalExpenses.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The Gap */}
      <Card className={theGap >= 0 ? "border-green-300 bg-green-50/30" : "border-red-300 bg-red-50/30"}>
        <CardContent className="py-5 text-center">
          <h4 className="font-bold text-[#1B2A4A] mb-2">The Gap</h4>
          <p className="text-sm text-gray-600 mb-3">Income minus Expenses</p>
          <p className={`text-3xl font-bold ${theGap >= 0 ? "text-green-700" : "text-red-700"}`}>
            ${theGap.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {theGap > 0 ? "You have margin -- great foundation to build on." :
             theGap === 0 ? "You're breaking even -- time to find some breathing room." :
             "You're spending more than you earn -- this is fixable."}
          </p>
        </CardContent>
      </Card>

      {/* Debts Section */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Current Debts</h4>
          <p className="text-xs text-gray-500 mb-4">List every debt. Include credit cards, loans, medical bills -- everything.</p>

          <div className="space-y-4">
            {data.debts.map((debt, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-2 items-end p-3 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Creditor</label>
                  <Input
                    value={debt.creditor}
                    onChange={e => updateDebt(i, "creditor", e.target.value)}
                    placeholder="e.g., Visa, Sallie Mae"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Balance</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={debt.balance}
                      onChange={e => updateDebt(i, "balance", e.target.value)}
                      placeholder="0.00"
                      className="pl-7 text-right w-28"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Monthly</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={debt.payment}
                      onChange={e => updateDebt(i, "payment", e.target.value)}
                      placeholder="0.00"
                      className="pl-7 text-right w-28"
                    />
                  </div>
                </div>
                {data.debts.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeDebt(i)} className="text-red-400 hover:text-red-600 no-print">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addDebt} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Another Debt
          </Button>

          <div className="flex items-center gap-2 pt-3 mt-3 border-t">
            <span className="text-sm font-bold text-[#1B2A4A]">Total Debt</span>
            <span className="text-lg font-bold text-red-700">${totalDebt.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Savings Section */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Current Savings</h4>
          <p className="text-xs text-gray-500 mb-4">What do you have saved? Include all accounts.</p>
          <div className="space-y-3">
            <CurrencyInput id="sav-emergency" label="Emergency fund" value={data.savingsEmergency} onChange={v => update("savingsEmergency", v)} />
            <CurrencyInput id="sav-retirement" label="Retirement accounts" value={data.savingsRetirement} onChange={v => update("savingsRetirement", v)} />
            <CurrencyInput id="sav-other" label="Other savings" value={data.savingsOther} onChange={v => update("savingsOther", v)} />
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-sm font-bold text-[#1B2A4A] min-w-[140px] sm:min-w-[200px]">Total Savings</span>
              <span className="text-lg font-bold text-green-700">${totalSavings.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
