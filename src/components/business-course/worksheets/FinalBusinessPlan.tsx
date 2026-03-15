import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-business-worksheet-12";

interface AutoFillSource {
  week: number;
  field: string;
  value: string;
}

interface FinalPlanData {
  // Business Identity
  businessName: string;
  missionStatement: string;
  // The Opportunity
  problemStatement: string;
  solutionStatement: string;
  targetCustomer: string;
  // The Model
  revenueModel: string;
  competitiveAdvantage: string;
  financialSummary: string;
  // The Plan
  launchPlan: string;
  // 90-Day Calendar
  thirtyDay: string;
  sixtyDay: string;
  ninetyDay: string;
  // Self-Assessment
  confidenceBefore: string;
  confidenceAfter: string;
  biggestLesson: string;
  // Facilitator Interest
  interestedInFacilitating: boolean;
  // Four Hats
  whiteReadiness: string;
  blackRisk: string;
  yellowStrength: string;
  goldNext: string;
}

const defaultData: FinalPlanData = {
  businessName: "",
  missionStatement: "",
  problemStatement: "",
  solutionStatement: "",
  targetCustomer: "",
  revenueModel: "",
  competitiveAdvantage: "",
  financialSummary: "",
  launchPlan: "",
  thirtyDay: "",
  sixtyDay: "",
  ninetyDay: "",
  confidenceBefore: "",
  confidenceAfter: "",
  biggestLesson: "",
  interestedInFacilitating: false,
  whiteReadiness: "",
  blackRisk: "",
  yellowStrength: "",
  goldNext: "",
};

// Attempt to pull data from prior worksheets
function loadAutoFills(): AutoFillSource[] {
  const fills: AutoFillSource[] = [];

  // Try loading BMC data (Week 4: bbb-bmc-data)
  try {
    const bmcRaw = localStorage.getItem("bbb-bmc-data");
    if (bmcRaw) {
      const bmc = JSON.parse(bmcRaw);
      const revStreams = Array.isArray(bmc.revenueStreams)
        ? bmc.revenueStreams.filter((s: string) => s && s.trim()).join(", ")
        : "";
      if (revStreams) {
        fills.push({ week: 4, field: "revenueModel", value: revStreams });
      }
      const costStructure = Array.isArray(bmc.costStructure)
        ? bmc.costStructure.filter((s: string) => s && s.trim()).join(", ")
        : "";
      if (costStructure) {
        fills.push({ week: 4, field: "financialSummary", value: `Costs: ${costStructure}` });
      }
      const customerSegments = Array.isArray(bmc.customerSegments)
        ? bmc.customerSegments.filter((s: string) => s && s.trim()).join(", ")
        : "";
      if (customerSegments) {
        fills.push({ week: 4, field: "targetCustomer", value: customerSegments });
      }
    }
  } catch {}

  // Try loading VPC data (Week 5: bbb-vpc-data)
  try {
    const vpcRaw = localStorage.getItem("bbb-vpc-data");
    if (vpcRaw) {
      const vpc = JSON.parse(vpcRaw);
      const pains = Array.isArray(vpc.pains)
        ? vpc.pains
            .filter((p: { text?: string }) => p.text && p.text.trim())
            .map((p: { text?: string }) => p.text)
            .join("; ")
        : "";
      if (pains) {
        fills.push({ week: 5, field: "problemStatement", value: pains });
      }
      const gainCreators = Array.isArray(vpc.gainCreators)
        ? vpc.gainCreators
            .filter((g: { text?: string; name?: string }) => (g.text || g.name || "").trim())
            .map((g: { text?: string; name?: string }) => g.text || g.name)
            .join("; ")
        : "";
      if (gainCreators) {
        fills.push({ week: 5, field: "solutionStatement", value: gainCreators });
      }
    }
  } catch {}

  // Try loading Week 7 financial data (bbb-business-worksheet-7)
  try {
    const fin7Raw = localStorage.getItem("bbb-business-worksheet-7");
    if (fin7Raw) {
      const fin7 = JSON.parse(fin7Raw);
      const parts: string[] = [];
      if (fin7.price) parts.push(`Price per unit: ${fin7.price}`);
      if (fin7.unitsSold) parts.push(`Units sold/month: ${fin7.unitsSold}`);
      if (fin7.fixedCosts) parts.push(`Fixed costs: ${fin7.fixedCosts}`);
      if (fin7.variablePerUnit) parts.push(`Variable cost/unit: ${fin7.variablePerUnit}`);
      if (fin7.monthlyBurn) parts.push(`Monthly burn: ${fin7.monthlyBurn}`);
      if (fin7.currentCash) parts.push(`Current cash: ${fin7.currentCash}`);
      if (parts.length > 0) {
        fills.push({ week: 7, field: "financialSummary", value: parts.join(" | ") });
      }
    }
  } catch {}

  return fills;
}

export default function FinalBusinessPlan() {
  const [autoFills] = useState<AutoFillSource[]>(() => loadAutoFills());

  const [data, setData] = useState<FinalPlanData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}

    // Seed from auto-fills on first load
    const fills = loadAutoFills();
    const seeded = { ...defaultData };
    for (const fill of fills) {
      const key = fill.field as keyof FinalPlanData;
      if (typeof seeded[key] === "string" && !(seeded[key] as string).trim()) {
        (seeded as Record<string, unknown>)[key] = fill.value;
      }
    }
    return seeded;
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

  function field(key: keyof FinalPlanData) {
    return data[key] as string;
  }

  function set(key: keyof FinalPlanData, value: string | boolean) {
    setData(prev => ({ ...prev, [key]: value }));
  }

  // Which fields were auto-populated
  const autoFilledKeys = new Set(autoFills.map(f => f.field));

  function AutoFillBadge({ fieldKey }: { fieldKey: string }) {
    const source = autoFills.find(f => f.field === fieldKey);
    if (!source) return null;
    return (
      <span className="inline-flex items-center gap-1 text-xs text-[#C9922A] font-medium ml-2">
        <Info className="w-3 h-3" />
        Auto-filled from Week {source.week} worksheet
      </span>
    );
  }

  // Confidence delta display
  const beforeNum = parseInt(data.confidenceBefore) || 0;
  const afterNum = parseInt(data.confidenceAfter) || 0;
  const delta = afterNum - beforeNum;

  // Completion percentage
  const coreFields = [
    data.businessName, data.missionStatement, data.problemStatement,
    data.solutionStatement, data.targetCustomer, data.revenueModel,
    data.competitiveAdvantage, data.financialSummary, data.launchPlan,
    data.thirtyDay, data.sixtyDay, data.ninetyDay,
  ];
  const hatFields = [data.whiteReadiness, data.blackRisk, data.yellowStrength, data.goldNext];
  const selfAssessFields = [data.confidenceBefore, data.confidenceAfter, data.biggestLesson];
  const allFields = [...coreFields, ...hatFields, ...selfAssessFields];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Final Business Plan</h3>
          <p className="text-sm text-gray-500">Week 12 — Your one-page business plan. Saved automatically to this device.</p>
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
          <span>Business Plan Completion</span>
          <span>{completionPercent}%</span>
        </div>
        <Progress value={completionPercent} className="h-2" />
      </div>

      {/* Auto-fill notice */}
      {autoFills.length > 0 && (
        <div className="no-print flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-[#C9922A]/30 text-xs text-[#1B2A4A]">
          <Info className="w-4 h-4 text-[#C9922A] shrink-0 mt-0.5" />
          <span>
            Some fields have been pre-filled from your previous worksheets (Weeks 4, 5, and 7).
            Review these and edit them to reflect your final thinking.
          </span>
        </div>
      )}

      {/* Section 1: Business Identity */}
      <Card className="border-[#1B2A4A]/30">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center font-bold shrink-0">1</div>
            <h4 className="font-bold text-[#1B2A4A]">Business Identity</h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Business Name</label>
              <Input
                value={field("businessName")}
                onChange={e => set("businessName", e.target.value)}
                placeholder="What is your business called?"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Mission Statement</label>
              <Textarea
                value={field("missionStatement")}
                onChange={e => set("missionStatement", e.target.value)}
                placeholder="In one or two sentences: who do you serve, what do you provide, and why does it matter?"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: The Opportunity */}
      <Card className="border-[#1B2A4A]/30">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center font-bold shrink-0">2</div>
            <h4 className="font-bold text-[#1B2A4A]">The Opportunity</h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Problem Statement
                {autoFilledKeys.has("problemStatement") && (
                  <AutoFillBadge fieldKey="problemStatement" />
                )}
              </label>
              <Textarea
                value={field("problemStatement")}
                onChange={e => set("problemStatement", e.target.value)}
                placeholder="What specific problem exists? Who suffers from it? How significant is it?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Solution Statement
                {autoFilledKeys.has("solutionStatement") && (
                  <AutoFillBadge fieldKey="solutionStatement" />
                )}
              </label>
              <Textarea
                value={field("solutionStatement")}
                onChange={e => set("solutionStatement", e.target.value)}
                placeholder="How does your product or service solve this problem? What makes your solution unique?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Target Customer
                {autoFilledKeys.has("targetCustomer") && (
                  <AutoFillBadge fieldKey="targetCustomer" />
                )}
              </label>
              <Textarea
                value={field("targetCustomer")}
                onChange={e => set("targetCustomer", e.target.value)}
                placeholder="Who is your ideal customer? Describe them specifically: demographics, needs, behaviors, where they live, what they do..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: The Model */}
      <Card className="border-[#1B2A4A]/30">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center font-bold shrink-0">3</div>
            <h4 className="font-bold text-[#1B2A4A]">The Model</h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Revenue Model
                {autoFilledKeys.has("revenueModel") && (
                  <AutoFillBadge fieldKey="revenueModel" />
                )}
              </label>
              <Textarea
                value={field("revenueModel")}
                onChange={e => set("revenueModel", e.target.value)}
                placeholder="How do you make money? What do you sell, at what price, and to whom? Is it one-time, subscription, commission-based?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Competitive Advantage</label>
              <Textarea
                value={field("competitiveAdvantage")}
                onChange={e => set("competitiveAdvantage", e.target.value)}
                placeholder="Why will customers choose you over alternatives? What can competitors not easily copy?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Financial Summary
                {autoFilledKeys.has("financialSummary") && (
                  <AutoFillBadge fieldKey="financialSummary" />
                )}
              </label>
              <Textarea
                value={field("financialSummary")}
                onChange={e => set("financialSummary", e.target.value)}
                placeholder="Break-even point, pricing, revenue projections for months 1–3, key costs, and how long your savings will last..."
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: The Plan */}
      <Card className="border-[#1B2A4A]/30">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center font-bold shrink-0">4</div>
            <h4 className="font-bold text-[#1B2A4A]">The Plan</h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Launch Plan</label>
              <Textarea
                value={field("launchPlan")}
                onChange={e => set("launchPlan", e.target.value)}
                placeholder="How will you launch? What channels will you use? Who will your first 10 customers be and how will you find them?"
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: 90-Day Calendar */}
      <Card className="border-[#C9922A]/30 bg-amber-50/30">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#C9922A] text-white text-xs flex items-center justify-center font-bold shrink-0">5</div>
            <h4 className="font-bold text-[#1B2A4A]">90-Day Calendar</h4>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Break your first 90 days into three phases. The more specific you are, the more likely you are to execute.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#C9922A] uppercase tracking-wide">Days 1–30 / Foundation Phase</span>
              </div>
              <Textarea
                value={field("thirtyDay")}
                onChange={e => set("thirtyDay", e.target.value)}
                placeholder="What will you set up, register, build, or launch in the first month? List your key tasks and milestones..."
                rows={3}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#C9922A] uppercase tracking-wide">Days 31–60 / Traction Phase</span>
              </div>
              <Textarea
                value={field("sixtyDay")}
                onChange={e => set("sixtyDay", e.target.value)}
                placeholder="How will you acquire your first paying customers? What traction metrics will you hit? What experiments will you run?"
                rows={3}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#C9922A] uppercase tracking-wide">Days 61–90 / Optimization Phase</span>
              </div>
              <Textarea
                value={field("ninetyDay")}
                onChange={e => set("ninetyDay", e.target.value)}
                placeholder="What will you improve based on early learnings? What systems will you put in place? What is your goal by day 90?"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Self-Assessment */}
      <Card className="border-[#1B2A4A]/30">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center font-bold shrink-0">6</div>
            <h4 className="font-bold text-[#1B2A4A]">Before/After Self-Assessment</h4>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Reflect honestly on your growth. This helps you recognize how far you have come and what you still want to develop.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Confidence before the course (1-10)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={field("confidenceBefore")}
                  onChange={e => set("confidenceBefore", e.target.value)}
                  placeholder="1-10"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Confidence after the course (1-10)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={field("confidenceAfter")}
                  onChange={e => set("confidenceAfter", e.target.value)}
                  placeholder="1-10"
                />
              </div>
            </div>

            {beforeNum > 0 && afterNum > 0 && (
              <div
                className={`p-3 rounded-lg border text-sm font-medium ${
                  delta > 0
                    ? "bg-green-50 border-green-200 text-green-800"
                    : delta < 0
                    ? "bg-amber-50 border-amber-200 text-amber-800"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
              >
                {delta > 0
                  ? `Your confidence grew by ${delta} point${delta !== 1 ? "s" : ""}. That growth is real — you earned it.`
                  : delta < 0
                  ? `Your confidence went down by ${Math.abs(delta)} point${Math.abs(delta) !== 1 ? "s" : ""}. That's actually a good sign — the more you know, the more complex business feels. Keep going.`
                  : "Your confidence stayed the same. Reflect on what you now understand that you didn't before."}
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Biggest lesson learned</label>
              <Textarea
                value={field("biggestLesson")}
                onChange={e => set("biggestLesson", e.target.value)}
                placeholder="What is the single most valuable thing you learned in this course? How has it changed the way you think about business?"
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 7: Facilitator Interest */}
      <Card className="border-[#C9922A]/30 bg-amber-50/30">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#C9922A] text-white text-xs flex items-center justify-center font-bold shrink-0">7</div>
            <h4 className="font-bold text-[#1B2A4A]">Become a Facilitator</h4>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Graduates of this course often become our strongest facilitators — people who have walked the journey and can guide others through it.
          </p>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.interestedInFacilitating}
              onChange={e => set("interestedInFacilitating", e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#C9922A] shrink-0"
            />
            <span className="text-sm text-gray-700">
              I'm interested in becoming a facilitator for future Businesses Beyond Borders groups
            </span>
          </label>

          {data.interestedInFacilitating && (
            <div className="mt-3 p-3 rounded-lg bg-[#C9922A]/10 border border-[#C9922A]/30 text-sm text-[#1B2A4A]">
              Thank you for your interest. Your program coordinator will follow up with information about the facilitator training program.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Four Hats Reflection */}
      <Card className="border-[#1B2A4A]/20 bg-[#1B2A4A]/5">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Four Hats Final Reflection</h4>
          <p className="text-xs text-gray-500 mb-4">
            One final time, look at your completed business plan through four lenses.
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                White Hat — What does the evidence say about your business readiness?
              </label>
              <Textarea
                value={field("whiteReadiness")}
                onChange={e => set("whiteReadiness", e.target.value)}
                placeholder="Facts, data, and validation results that support your plan..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Black Hat — What is the biggest risk or weakness in your plan?
              </label>
              <Textarea
                value={field("blackRisk")}
                onChange={e => set("blackRisk", e.target.value)}
                placeholder="Honest assessment of threats, gaps, or things that could go wrong..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Yellow Hat — What is your greatest strength or advantage?
              </label>
              <Textarea
                value={field("yellowStrength")}
                onChange={e => set("yellowStrength", e.target.value)}
                placeholder="The thing that makes you most confident this business can succeed..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Gold Hat — What is your single most important next action?
              </label>
              <Textarea
                value={field("goldNext")}
                onChange={e => set("goldNext", e.target.value)}
                placeholder="The one concrete thing you will do in the next 48 hours to move your business forward..."
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Summary */}
      <Card className="border-[#1B2A4A]/30 print-only hidden print:block">
        <CardContent className="pt-5">
          <p className="text-xs text-gray-400 text-center">
            Generated by Businesses Beyond Borders — BBB Business Creation Course, Week 12
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
