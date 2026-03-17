import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-business-worksheet-1";

interface AssumptionRow {
  text: string;
  risk: string;
  evidence: string;
}

interface AssumptionData {
  businessIdea: string;
  assumptions: AssumptionRow[];
  topAssumptions: [string, string, string];
}

const defaultData: AssumptionData = {
  businessIdea: "",
  assumptions: [
    { text: "", risk: "", evidence: "" },
    { text: "", risk: "", evidence: "" },
    { text: "", risk: "", evidence: "" },
  ],
  topAssumptions: ["", "", ""],
};

function riskColor(risk: number, evidence: number): string {
  const danger = risk - evidence;
  if (danger >= 3) return "bg-red-50 border-red-200";
  if (danger >= 1) return "bg-yellow-50 border-yellow-200";
  return "bg-green-50 border-green-200";
}

function riskLabel(risk: number, evidence: number): string {
  const danger = risk - evidence;
  if (danger >= 3) return "Test first";
  if (danger >= 1) return "Test soon";
  return "Low priority";
}

export default function AssumptionMapper() {
  const [data, setData] = useState<AssumptionData>(() => {
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

  function updateIdea(value: string) {
    setData(prev => ({ ...prev, businessIdea: value }));
  }

  function updateAssumption(index: number, field: keyof AssumptionRow, value: string) {
    setData(prev => {
      const assumptions = [...prev.assumptions];
      assumptions[index] = { ...assumptions[index], [field]: value };
      return { ...prev, assumptions };
    });
  }

  function addAssumption() {
    setData(prev => ({
      ...prev,
      assumptions: [...prev.assumptions, { text: "", risk: "", evidence: "" }],
    }));
  }

  function removeAssumption(index: number) {
    setData(prev => ({
      ...prev,
      assumptions:
        prev.assumptions.length > 1
          ? prev.assumptions.filter((_, i) => i !== index)
          : prev.assumptions,
    }));
  }

  function updateTop(index: 0 | 1 | 2, value: string) {
    setData(prev => {
      const top: [string, string, string] = [...prev.topAssumptions] as [string, string, string];
      top[index] = value;
      return { ...prev, topAssumptions: top };
    });
  }

  // Sort assumptions by danger score (risk - evidence), highest first
  const sortedAssumptions = [...data.assumptions]
    .map((a, originalIndex) => ({ ...a, originalIndex }))
    .filter(a => a.text.trim() !== "")
    .sort((a, b) => {
      const dangerA = (parseInt(a.risk) || 0) - (parseInt(a.evidence) || 0);
      const dangerB = (parseInt(b.risk) || 0) - (parseInt(b.evidence) || 0);
      return dangerB - dangerA;
    });

  // Completion percentage
  const allFields = [
    data.businessIdea,
    ...data.assumptions.flatMap(a => [a.text, a.risk, a.evidence]),
    ...data.topAssumptions,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / Math.max(allFields.length, 10)) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Assumption Mapper</h3>
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

      {/* Business Idea */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Your Business Idea</h4>
          <p className="text-xs text-gray-500 mb-4">
            State your idea in one sentence. Be specific about who it helps and how.
          </p>
          <Textarea
            value={data.businessIdea}
            onChange={e => updateIdea(e.target.value)}
            placeholder="e.g., I will sell homemade bread to busy families in my neighborhood who want fresh food but don't have time to bake."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Assumptions List */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Business Assumptions</h4>
          <p className="text-xs text-gray-500 mb-1">
            List every assumption your idea depends on being true. Then rate each one.
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Risk: 1 = low risk if wrong, 5 = business-ending if wrong. Evidence: 1 = no evidence yet, 5 = very confident.
          </p>

          <div className="space-y-3">
            {data.assumptions.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_80px_80px_auto] gap-2 items-end p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Assumption</label>
                  <Input
                    value={row.text}
                    onChange={e => updateAssumption(i, "text", e.target.value)}
                    placeholder="e.g., Customers will pay $5 per loaf..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Risk (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={row.risk}
                    onChange={e => updateAssumption(i, "risk", e.target.value)}
                    placeholder="1-5"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Evidence (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={row.evidence}
                    onChange={e => updateAssumption(i, "evidence", e.target.value)}
                    placeholder="1-5"
                  />
                </div>
                {data.assumptions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAssumption(i)}
                    className="text-red-400 hover:text-red-600 no-print"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addAssumption} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Assumption
          </Button>
        </CardContent>
      </Card>

      {/* Priority View */}
      {sortedAssumptions.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/30">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h4 className="font-bold text-[#1B2A4A]">Assumptions by Priority</h4>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              High risk + low evidence = test these first. Sorted automatically from most to least urgent.
            </p>
            <div className="space-y-2">
              {sortedAssumptions.map((a, i) => {
                const risk = parseInt(a.risk) || 0;
                const evidence = parseInt(a.evidence) || 0;
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg border ${riskColor(risk, evidence)}`}
                  >
                    <span className="text-sm text-gray-800 flex-1">{a.text}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-500">
                        R:{a.risk || "?"} / E:{a.evidence || "?"}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          riskLabel(risk, evidence) === "Test first"
                            ? "bg-red-100 text-red-700"
                            : riskLabel(risk, evidence) === "Test soon"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {riskLabel(risk, evidence)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top 3 to Test */}
      <Card className="border-blue-300 bg-blue-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Top 3 Assumptions to Test First</h4>
          <p className="text-xs text-gray-500 mb-4">
            Based on the priority view above, which 3 assumptions will you test this week?
          </p>
          <div className="space-y-3">
            {([0, 1, 2] as (0 | 1 | 2)[]).map(i => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center shrink-0 font-bold">
                  {i + 1}
                </span>
                <Input
                  value={data.topAssumptions[i]}
                  onChange={e => updateTop(i, e.target.value)}
                  placeholder={`Assumption #${i + 1} to test...`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
