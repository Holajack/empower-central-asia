import { useState, useEffect, useCallback, useMemo } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "bbb-worksheet-4";

interface DebtRow {
  creditor: string;
  type: string;
  balance: string;
  interestRate: string;
  minimumPayment: string;
}

interface DebtInventoryData {
  debts: DebtRow[];
  extraPayment: string;
}

const defaultData: DebtInventoryData = {
  debts: [{ creditor: "", type: "", balance: "", interestRate: "", minimumPayment: "" }],
  extraPayment: "",
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

export function getWorksheet4Percent(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;
    const data: DebtInventoryData = JSON.parse(saved);
    const fields = [
      data.extraPayment,
      ...data.debts.flatMap(d => [d.creditor, d.type, d.balance, d.interestRate, d.minimumPayment]),
    ];
    const filled = fields.filter(f => f && f.trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  } catch { return 0; }
}

export default function DebtInventory() {
  const [data, setData] = useState<DebtInventoryData>(() => {
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

  function updateDebt(index: number, field: keyof DebtRow, value: string) {
    setData(prev => {
      const debts = [...prev.debts];
      debts[index] = { ...debts[index], [field]: value };
      return { ...prev, debts };
    });
  }

  function addDebt() {
    setData(prev => ({ ...prev, debts: [...prev.debts, { creditor: "", type: "", balance: "", interestRate: "", minimumPayment: "" }] }));
  }

  function removeDebt(index: number) {
    setData(prev => ({
      ...prev,
      debts: prev.debts.length > 1 ? prev.debts.filter((_, i) => i !== index) : prev.debts,
    }));
  }

  // Calculations
  const totalDebt = data.debts.reduce((sum, d) => sum + parseNum(d.balance), 0);
  const totalMinimum = data.debts.reduce((sum, d) => sum + parseNum(d.minimumPayment), 0);
  const extraPayment = parseNum(data.extraPayment);

  // Snowball: smallest balance first
  const snowballOrder = useMemo(() => {
    return [...data.debts]
      .filter(d => parseNum(d.balance) > 0)
      .sort((a, b) => parseNum(a.balance) - parseNum(b.balance));
  }, [data.debts]);

  // Avalanche: highest interest first
  const avalancheOrder = useMemo(() => {
    return [...data.debts]
      .filter(d => parseNum(d.balance) > 0)
      .sort((a, b) => parseNum(b.interestRate) - parseNum(a.interestRate));
  }, [data.debts]);

  // Simple payoff estimate (snowball method)
  const estimatePayoff = () => {
    if (snowballOrder.length === 0 || extraPayment <= 0) return null;

    let months = 0;
    let remainingDebts = snowballOrder.map(d => ({
      balance: parseNum(d.balance),
      rate: parseNum(d.interestRate) / 100 / 12,
      payment: parseNum(d.minimumPayment),
    }));

    let extraAvailable = extraPayment;

    // Simplified calculation (up to 120 months)
    while (remainingDebts.length > 0 && months < 120) {
      months++;

      // Apply interest and payments
      remainingDebts = remainingDebts.map(d => ({
        ...d,
        balance: d.balance * (1 + d.rate) - d.payment,
      }));

      // Apply extra payment to smallest debt
      if (remainingDebts.length > 0) {
        remainingDebts[0].balance -= extraAvailable;
      }

      // Remove paid off debts and add their payment to extra
      remainingDebts = remainingDebts.filter(d => {
        if (d.balance <= 0) {
          extraAvailable += d.payment;
          return false;
        }
        return true;
      });
    }

    return months < 120 ? months : null;
  };

  const payoffMonths = estimatePayoff();

  // Completion percentage
  const allFields = [
    data.extraPayment,
    ...data.debts.flatMap(d => [d.creditor, d.type, d.balance, d.interestRate, d.minimumPayment]),
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Debt Inventory</h3>
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

      {/* Debt List */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">List All Debts</h4>
          <p className="text-xs text-gray-500 mb-4">Include credit cards, loans, medical bills—everything you owe.</p>

          <div className="space-y-4">
            {data.debts.map((debt, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Creditor</label>
                    <Input
                      value={debt.creditor}
                      onChange={e => updateDebt(i, "creditor", e.target.value)}
                      placeholder="e.g., Chase Visa, Honda Finance"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Type</label>
                    <Select value={debt.type} onValueChange={v => updateDebt(i, "type", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="student_loan">Student Loan</SelectItem>
                        <SelectItem value="car_loan">Car Loan</SelectItem>
                        <SelectItem value="personal_loan">Personal Loan</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Balance</label>
                    <CurrencyInput id={`balance-${i}`} value={debt.balance} onChange={v => updateDebt(i, "balance", v)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Interest Rate (%)</label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={debt.interestRate}
                      onChange={e => updateDebt(i, "interestRate", e.target.value)}
                      placeholder="0.00"
                      className="text-right"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Minimum Payment</label>
                    <CurrencyInput id={`min-${i}`} value={debt.minimumPayment} onChange={v => updateDebt(i, "minimumPayment", v)} />
                  </div>
                </div>
                {data.debts.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeDebt(i)} className="text-red-400 hover:text-red-600 no-print">
                    <Trash2 className="w-4 h-4 mr-1" /> Remove Debt
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addDebt} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Another Debt
          </Button>

          <div className="mt-5 pt-4 border-t space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Total Debt</span>
              <span className="text-lg font-bold text-red-700">${totalDebt.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Total Minimum Payments</span>
              <span className="text-lg font-bold text-[#C9922A]">${totalMinimum.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extra Payment */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Extra Monthly Payment</h4>
          <p className="text-xs text-gray-500 mb-4">How much extra can you put toward debt each month?</p>
          <div className="flex items-center gap-2 max-w-sm">
            <label htmlFor="extra" className="text-sm text-gray-700 min-w-[120px]">Extra payment</label>
            <CurrencyInput id="extra" value={data.extraPayment} onChange={v => setData(prev => ({ ...prev, extraPayment: v }))} />
          </div>
          {payoffMonths && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Estimated debt-free date:</strong> {payoffMonths} months ({Math.floor(payoffMonths / 12)} years {payoffMonths % 12} months)
              </p>
              <p className="text-xs text-green-600 mt-1">Using snowball method (smallest balance first)</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payoff Strategies */}
      {snowballOrder.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Snowball */}
          <Card>
            <CardContent className="pt-5">
              <h4 className="font-bold text-[#1B2A4A] mb-1">Snowball Method</h4>
              <p className="text-xs text-gray-500 mb-4">Smallest balance first (quick wins, momentum)</p>
              <div className="space-y-2">
                {snowballOrder.map((debt, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                    <span className="font-semibold text-gray-700">{i + 1}. {debt.creditor}</span>
                    <span className="text-gray-600">${parseNum(debt.balance).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Avalanche */}
          <Card>
            <CardContent className="pt-5">
              <h4 className="font-bold text-[#1B2A4A] mb-1">Avalanche Method</h4>
              <p className="text-xs text-gray-500 mb-4">Highest interest first (saves most money)</p>
              <div className="space-y-2">
                {avalancheOrder.map((debt, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                    <span className="font-semibold text-gray-700">{i + 1}. {debt.creditor}</span>
                    <span className="text-gray-600">{parseNum(debt.interestRate).toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Link to Debt Calculator */}
      <Card className="border-blue-300 bg-blue-50/30">
        <CardContent className="py-4 text-center">
          <p className="text-sm text-gray-700">
            Want a detailed payoff plan? Use the <strong>Debt Calculator Tool</strong> for exact projections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
