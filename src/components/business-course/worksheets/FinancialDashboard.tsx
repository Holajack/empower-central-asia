import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "bbb-business-worksheet-7";

type Currency = "som" | "tenge" | "uzs" | "USD";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  som: "с",
  tenge: "₸",
  uzs: "UZS",
  USD: "$",
};

const CURRENCY_LABELS: Record<Currency, string> = {
  som: "Kyrgyz Som (с)",
  tenge: "Kazakh Tenge (₸)",
  uzs: "Uzbek Sum (UZS)",
  USD: "US Dollar ($)",
};

interface FinState {
  currency: Currency;
  // Revenue
  price: string;
  unitsSold: string;
  // Costs
  fixedCosts: string;
  variablePerUnit: string;
  // CAC
  cacCost: string;
  cacCustomers: string;
  // LTV
  avgPurchaseValue: string;
  avgPurchaseFrequency: string;
  avgCustomerLifespan: string;
  // Burn
  monthlyBurn: string;
  currentCash: string;
}

const defaults: FinState = {
  currency: "USD",
  price: "",
  unitsSold: "",
  fixedCosts: "",
  variablePerUnit: "",
  cacCost: "",
  cacCustomers: "",
  avgPurchaseValue: "",
  avgPurchaseFrequency: "",
  avgCustomerLifespan: "",
  monthlyBurn: "",
  currentCash: "",
};

function n(val: string): number {
  const parsed = parseFloat(val.replace(/,/g, ""));
  return isNaN(parsed) ? 0 : parsed;
}

function fmt(val: number, sym: string, decimals = 0): string {
  if (!isFinite(val) || isNaN(val)) return `${sym}—`;
  return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

function calcProgress(s: FinState): number {
  const fields = [
    s.price, s.unitsSold, s.fixedCosts, s.variablePerUnit,
    s.cacCost, s.cacCustomers, s.avgPurchaseValue,
    s.avgPurchaseFrequency, s.avgCustomerLifespan,
    s.monthlyBurn, s.currentCash,
  ];
  const filled = fields.filter((f) => f.trim() !== "").length;
  return Math.round((filled / fields.length) * 100);
}

function MetricRow({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: "none" | "green" | "yellow" | "red";
}) {
  const highlightClasses: Record<string, string> = {
    none: "",
    green: "text-green-700 font-bold",
    yellow: "text-yellow-700 font-bold",
    red: "text-red-600 font-bold",
  };
  return (
    <div className="flex items-baseline justify-between py-2 border-b border-gray-100 last:border-0">
      <div>
        <span className="text-sm text-gray-700">{label}</span>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
      <span className={`text-sm ml-4 shrink-0 ${highlight ? highlightClasses[highlight] : ""}`}>
        {value}
      </span>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="flex items-center gap-1">
        {prefix && (
          <span className="text-sm text-gray-500 bg-gray-100 border border-r-0 border-gray-200 px-2 h-9 flex items-center rounded-l-md shrink-0">
            {prefix}
          </span>
        )}
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "0"}
          className={`h-9 text-sm ${prefix ? "rounded-l-none" : ""} ${suffix ? "rounded-r-none" : ""}`}
        />
        {suffix && (
          <span className="text-sm text-gray-500 bg-gray-100 border border-l-0 border-gray-200 px-2 h-9 flex items-center rounded-r-md shrink-0">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default function FinancialDashboard() {
  const [state, setState] = useState<FinState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaults;
  });

  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 500);
    return () => clearTimeout(timer);
  }, [state]);

  const manualSave = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 1500);
  }, [state]);

  function set(field: keyof FinState) {
    return (value: string) => setState((prev) => ({ ...prev, [field]: value }));
  }

  const sym = CURRENCY_SYMBOLS[state.currency];
  const progress = calcProgress(state);

  // Calculated values
  const price = n(state.price);
  const unitsSold = n(state.unitsSold);
  const fixedCosts = n(state.fixedCosts);
  const variablePerUnit = n(state.variablePerUnit);

  const monthlyRevenue = price * unitsSold;
  const totalVariableCosts = variablePerUnit * unitsSold;
  const totalMonthlyCosts = fixedCosts + totalVariableCosts;
  const grossProfit = monthlyRevenue - totalMonthlyCosts;

  const contributionMargin = price - variablePerUnit;
  const breakEven =
    contributionMargin > 0
      ? Math.ceil(fixedCosts / contributionMargin)
      : NaN;

  const cacCost = n(state.cacCost);
  const cacCustomers = n(state.cacCustomers);
  const cac = cacCustomers > 0 ? cacCost / cacCustomers : NaN;

  const avgPurchaseValue = n(state.avgPurchaseValue);
  const avgPurchaseFrequency = n(state.avgPurchaseFrequency);
  const avgCustomerLifespan = n(state.avgCustomerLifespan);
  const ltv = avgPurchaseValue * avgPurchaseFrequency * avgCustomerLifespan;
  const ltvCacRatio = cac > 0 && isFinite(ltv) ? ltv / cac : NaN;

  const ltvCacColor =
    isNaN(ltvCacRatio)
      ? "none"
      : ltvCacRatio >= 3
      ? "green"
      : ltvCacRatio >= 1
      ? "yellow"
      : "red";

  const monthlyBurn = n(state.monthlyBurn);
  const currentCash = n(state.currentCash);
  const runwayMonths = monthlyBurn > 0 ? currentCash / monthlyBurn : NaN;

  const runwayColor =
    isNaN(runwayMonths)
      ? "none"
      : runwayMonths >= 6
      ? "green"
      : runwayMonths >= 3
      ? "yellow"
      : "red";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#1B2A4A]">Financial Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Week 7 — Know your numbers before you launch</p>
        </div>
        <div className="flex items-center gap-2 no-print">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
          <Button
            size="sm"
            className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white"
            onClick={manualSave}
          >
            <Save className="w-4 h-4 mr-1" />
            {savedMsg ? "Saved!" : "Save"}
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Dashboard completion</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Currency Selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700 shrink-0">Currency:</label>
        <select
          value={state.currency}
          onChange={(e) => setState((prev) => ({ ...prev, currency: e.target.value as Currency }))}
          className="h-9 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50 bg-white"
        >
          {(Object.keys(CURRENCY_LABELS) as Currency[]).map((c) => (
            <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
          ))}
        </select>
      </div>

      {/* Two-column grid on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Calculator */}
        <Card className="border-[#1B2A4A]/20">
          <CardContent className="pt-5 space-y-4">
            <h3 className="font-bold text-[#1B2A4A]">Revenue Calculator</h3>
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Price per unit"
                value={state.price}
                onChange={set("price")}
                prefix={sym}
              />
              <NumberInput
                label="Units sold per month"
                value={state.unitsSold}
                onChange={set("unitsSold")}
                suffix="units"
              />
            </div>
            <div className="space-y-1 bg-[#1B2A4A]/5 rounded-lg p-3">
              <MetricRow
                label="Monthly Revenue"
                value={fmt(monthlyRevenue, sym)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cost Calculator */}
        <Card className="border-[#1B2A4A]/20">
          <CardContent className="pt-5 space-y-4">
            <h3 className="font-bold text-[#1B2A4A]">Cost Calculator</h3>
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Fixed monthly costs"
                value={state.fixedCosts}
                onChange={set("fixedCosts")}
                prefix={sym}
              />
              <NumberInput
                label="Variable cost per unit"
                value={state.variablePerUnit}
                onChange={set("variablePerUnit")}
                prefix={sym}
              />
            </div>
            <div className="space-y-1 bg-[#1B2A4A]/5 rounded-lg p-3">
              <MetricRow
                label="Total Variable Costs"
                value={fmt(totalVariableCosts, sym)}
                sub={`${sym}${n(state.variablePerUnit).toLocaleString()} × ${unitsSold} units`}
              />
              <MetricRow
                label="Total Monthly Costs"
                value={fmt(totalMonthlyCosts, sym)}
              />
              <MetricRow
                label="Gross Profit"
                value={fmt(grossProfit, sym)}
                highlight={grossProfit > 0 ? "green" : grossProfit < 0 ? "red" : "none"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Break-Even */}
        <Card className="border-[#C9922A]/30">
          <CardContent className="pt-5 space-y-3">
            <h3 className="font-bold text-[#1B2A4A]">Break-Even Analysis</h3>
            <div className="space-y-1 bg-[#C9922A]/5 rounded-lg p-3">
              <MetricRow
                label="Contribution Margin"
                value={fmt(contributionMargin, sym)}
                sub="Price − Variable Cost per Unit"
              />
              <MetricRow
                label="Break-Even Point"
                value={isNaN(breakEven) || !isFinite(breakEven) ? `${sym}—` : `${breakEven.toLocaleString()} units/mo`}
                sub="Fixed Costs ÷ Contribution Margin"
                highlight={
                  isNaN(breakEven) || !isFinite(breakEven)
                    ? "none"
                    : breakEven <= unitsSold
                    ? "green"
                    : "yellow"
                }
              />
            </div>
            {!isNaN(breakEven) && isFinite(breakEven) && (
              <p className="text-xs text-gray-500">
                {breakEven <= unitsSold
                  ? `You're selling ${unitsSold} units — above break-even. You're profitable.`
                  : `You need ${breakEven - unitsSold} more units per month to break even.`}
              </p>
            )}
          </CardContent>
        </Card>

        {/* CAC & LTV */}
        <Card className="border-[#1B2A4A]/20">
          <CardContent className="pt-5 space-y-4">
            <h3 className="font-bold text-[#1B2A4A]">Customer Metrics</h3>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer Acquisition Cost (CAC)</p>
              <div className="grid grid-cols-2 gap-3">
                <NumberInput
                  label="Total marketing spend"
                  value={state.cacCost}
                  onChange={set("cacCost")}
                  prefix={sym}
                />
                <NumberInput
                  label="New customers acquired"
                  value={state.cacCustomers}
                  onChange={set("cacCustomers")}
                  suffix="customers"
                />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Lifetime Value (LTV)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <NumberInput
                  label="Avg purchase value"
                  value={state.avgPurchaseValue}
                  onChange={set("avgPurchaseValue")}
                  prefix={sym}
                />
                <NumberInput
                  label="Purchases per year"
                  value={state.avgPurchaseFrequency}
                  onChange={set("avgPurchaseFrequency")}
                  suffix="×/yr"
                />
                <NumberInput
                  label="Customer lifespan"
                  value={state.avgCustomerLifespan}
                  onChange={set("avgCustomerLifespan")}
                  suffix="years"
                />
              </div>
            </div>

            <div className="space-y-1 bg-[#1B2A4A]/5 rounded-lg p-3">
              <MetricRow label="CAC" value={fmt(cac, sym, 2)} />
              <MetricRow label="LTV" value={fmt(ltv, sym)} sub="Avg Purchase × Frequency × Lifespan" />
              <MetricRow
                label="LTV:CAC Ratio"
                value={isNaN(ltvCacRatio) || !isFinite(ltvCacRatio) ? "—" : ltvCacRatio.toFixed(2) + "x"}
                highlight={ltvCacColor}
                sub={
                  isNaN(ltvCacRatio) || !isFinite(ltvCacRatio)
                    ? undefined
                    : ltvCacRatio >= 3
                    ? "Excellent — strong unit economics"
                    : ltvCacRatio >= 1
                    ? "Acceptable — watch closely"
                    : "Warning — acquiring customers costs more than they return"
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Burn Rate & Runway */}
        <Card className="border-[#1B2A4A]/20 lg:col-span-2">
          <CardContent className="pt-5 space-y-4">
            <h3 className="font-bold text-[#1B2A4A]">Burn Rate & Runway</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              <NumberInput
                label="Monthly burn rate"
                value={state.monthlyBurn}
                onChange={set("monthlyBurn")}
                prefix={sym}
              />
              <NumberInput
                label="Current cash on hand"
                value={state.currentCash}
                onChange={set("currentCash")}
                prefix={sym}
              />
            </div>

            <div className="bg-[#1B2A4A]/5 rounded-lg p-3 max-w-md space-y-1">
              <MetricRow
                label="Runway"
                value={
                  isNaN(runwayMonths) || !isFinite(runwayMonths)
                    ? "—"
                    : `${runwayMonths.toFixed(1)} months`
                }
                sub="Cash ÷ Monthly Burn"
                highlight={runwayColor}
              />
            </div>

            {!isNaN(runwayMonths) && isFinite(runwayMonths) && (
              <div
                className={`text-sm p-3 rounded-lg border max-w-md ${
                  runwayColor === "green"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : runwayColor === "yellow"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {runwayColor === "green" && "Good runway. Focus on growth and reaching the next milestone."}
                {runwayColor === "yellow" && "Moderate runway. Start fundraising or reducing burn now."}
                {runwayColor === "red" && "Critical: less than 3 months of runway. Take immediate action."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
