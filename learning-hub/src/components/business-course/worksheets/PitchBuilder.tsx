import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "bbb-business-worksheet-8";

interface ChecklistItem {
  id: string;
  label: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: "clearProblem", label: "Clear problem statement" },
  { id: "specificCustomer", label: "Specific target customer" },
  { id: "uniqueSolution", label: "Unique solution" },
  { id: "revenueModel", label: "Revenue model explained" },
  { id: "specificAsk", label: "Specific ask" },
  { id: "under60", label: "Under 60 seconds (for elevator)" },
  { id: "practiced5", label: "Practiced 5+ times" },
];

interface PitchState {
  hook: string;
  problem: string;
  solution: string;
  market: string;
  model: string;
  ask: string;
  sixtySecondPitch: string;
  fiveMinutePitch: string;
  checklist: Record<string, boolean>;
}

const defaults: PitchState = {
  hook: "",
  problem: "",
  solution: "",
  market: "",
  model: "",
  ask: "",
  sixtySecondPitch: "",
  fiveMinutePitch: "",
  checklist: Object.fromEntries(CHECKLIST_ITEMS.map((i) => [i.id, false])),
};

function calcProgress(state: PitchState): number {
  const textFields = [
    state.hook,
    state.problem,
    state.solution,
    state.market,
    state.model,
    state.ask,
    state.sixtySecondPitch,
    state.fiveMinutePitch,
  ];
  const filledText = textFields.filter((f) => f.trim() !== "").length;
  const checkedItems = Object.values(state.checklist).filter(Boolean).length;

  // 8 text fields (70%) + 7 checklist items (30%)
  const textScore = (filledText / 8) * 70;
  const checkScore = (checkedItems / 7) * 30;
  return Math.round(textScore + checkScore);
}

interface TextareaFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  rows?: number;
  badge?: string;
  badgeColor?: string;
}

function TextareaField({
  label,
  placeholder,
  value,
  onChange,
  hint,
  rows = 3,
  badge,
  badgeColor = "bg-[#1B2A4A] text-white",
}: TextareaFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-[#1B2A4A]">{label}</label>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-3 text-sm border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50"
      />
    </div>
  );
}

export default function PitchBuilder() {
  const [state, setState] = useState<PitchState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure checklist has all keys
        const checklist = {
          ...Object.fromEntries(CHECKLIST_ITEMS.map((i) => [i.id, false])),
          ...(parsed.checklist || {}),
        };
        return { ...defaults, ...parsed, checklist };
      }
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

  function setField(field: keyof Omit<PitchState, "checklist">) {
    return (value: string) => setState((prev) => ({ ...prev, [field]: value }));
  }

  function toggleCheck(id: string) {
    setState((prev) => ({
      ...prev,
      checklist: { ...prev.checklist, [id]: !prev.checklist[id] },
    }));
  }

  const progress = calcProgress(state);
  const checkedCount = Object.values(state.checklist).filter(Boolean).length;

  // Estimate word count of 60-second pitch (avg speaking rate ~130 wpm, 60 sec = ~130 words)
  const pitchWordCount = state.sixtySecondPitch.trim()
    ? state.sixtySecondPitch.trim().split(/\s+/).length
    : 0;
  const pitchWordColor =
    pitchWordCount === 0
      ? "text-gray-400"
      : pitchWordCount <= 130
      ? "text-green-600"
      : pitchWordCount <= 160
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#1B2A4A]">Pitch Builder</h2>
          <p className="text-sm text-gray-500 mt-1">Week 8 — Communicate your idea with clarity and confidence</p>
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
          <span>Pitch completion</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Section 1: 60-Second Pitch Template */}
      <Card className="border-[#1B2A4A]/20">
        <CardContent className="pt-5 space-y-5">
          <div>
            <h3 className="font-bold text-[#1B2A4A] mb-0.5">60-Second Pitch Template</h3>
            <p className="text-xs text-gray-500">
              Build your pitch block by block. Each piece has a job. Don't skip any.
            </p>
          </div>

          <TextareaField
            label="Hook"
            badge="5 sec"
            badgeColor="bg-[#C9922A] text-white"
            placeholder="What grabs attention in the first 5 seconds?"
            hint="Start with a surprising stat, bold claim, or relatable story. Make them lean in."
            value={state.hook}
            onChange={setField("hook")}
            rows={2}
          />

          <TextareaField
            label="Problem"
            badge="10 sec"
            badgeColor="bg-red-100 text-red-700"
            placeholder="What specific problem does your customer have?"
            hint="State the pain clearly. Use the customer's own language from your discovery interviews."
            value={state.problem}
            onChange={setField("problem")}
            rows={2}
          />

          <TextareaField
            label="Solution"
            badge="15 sec"
            badgeColor="bg-green-100 text-green-700"
            placeholder="What is your product/service and how does it solve the problem?"
            hint="One clear sentence. Focus on the outcome for the customer, not the features."
            value={state.solution}
            onChange={setField("solution")}
            rows={2}
          />

          <TextareaField
            label="Market"
            badge="10 sec"
            badgeColor="bg-blue-100 text-blue-700"
            placeholder="Who needs this and how many?"
            hint="Define your specific customer segment. Give a real number — even a small one is credible."
            value={state.market}
            onChange={setField("market")}
            rows={2}
          />

          <TextareaField
            label="Business Model"
            badge="10 sec"
            badgeColor="bg-purple-100 text-purple-700"
            placeholder="How do you make money?"
            hint="Keep it simple: price per unit, subscription fee, commission, etc."
            value={state.model}
            onChange={setField("model")}
            rows={2}
          />

          <TextareaField
            label="Ask"
            badge="10 sec"
            badgeColor="bg-amber-100 text-amber-700"
            placeholder="What do you need? Investment? Customers? Partnership?"
            hint="End with a specific, actionable ask. Vague asks get ignored. Specific asks get answered."
            value={state.ask}
            onChange={setField("ask")}
            rows={2}
          />
        </CardContent>
      </Card>

      {/* Section 2: Combined 60-Second Pitch */}
      <Card className="border-[#C9922A]/40 bg-[#C9922A]/5">
        <CardContent className="pt-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-[#1B2A4A] mb-0.5">Combined 60-Second Pitch</h3>
              <p className="text-xs text-gray-500">
                Write your full pitch as one cohesive paragraph. Read it aloud — it should feel natural, not scripted.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className={`text-xs font-semibold ${pitchWordColor}`}>
                {pitchWordCount} words
              </span>
              <p className="text-xs text-gray-400">Target: ≤130</p>
            </div>
          </div>
          <textarea
            value={state.sixtySecondPitch}
            onChange={(e) => setState((prev) => ({ ...prev, sixtySecondPitch: e.target.value }))}
            placeholder="Hi, I'm [name]. Did you know that [hook]? [customer] struggles with [problem]. That's why I created [solution] — a [product] that [outcome]. There are [number] [customers] in [market] facing this problem. We make money by [model]. Right now, I'm looking for [specific ask]. Can we connect?"
            rows={6}
            className="w-full p-3 text-sm border border-[#C9922A]/30 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50 bg-white"
          />
        </CardContent>
      </Card>

      {/* Section 3: 5-Minute Pitch Expanded */}
      <Card className="border-[#1B2A4A]/20">
        <CardContent className="pt-5 space-y-3">
          <div>
            <h3 className="font-bold text-[#1B2A4A] mb-0.5">5-Minute Pitch Expanded</h3>
            <p className="text-xs text-gray-500">
              Expand your elevator pitch into a full 5-minute version. Include traction, competition, team, and financials
              if you have them. Use this for investor meetings, competitions, and demo days.
            </p>
          </div>
          <textarea
            value={state.fiveMinutePitch}
            onChange={(e) =>
              setState((prev) => ({ ...prev, fiveMinutePitch: e.target.value }))
            }
            placeholder="Start with your 60-second pitch, then expand each section...&#10;&#10;Problem (deeper): ...&#10;Solution (with demo/example): ...&#10;Market size (TAM/SAM/SOM): ...&#10;Traction (what have you proven so far?): ...&#10;Competition (how are you different?): ...&#10;Team (why you?): ...&#10;Financials (revenue model, projections): ...&#10;Ask (specific amount/resource/partnership): ..."
            rows={12}
            className="w-full p-3 text-sm border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50"
          />
        </CardContent>
      </Card>

      {/* Section 4: Pitch Checklist */}
      <Card className="border-[#1B2A4A]/20">
        <CardContent className="pt-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#1B2A4A] mb-0.5">Pitch Checklist</h3>
              <p className="text-xs text-gray-500">
                Check each item only when it's genuinely true. Be honest with yourself.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span
                className={`text-lg font-bold ${
                  checkedCount === CHECKLIST_ITEMS.length
                    ? "text-green-600"
                    : checkedCount >= 5
                    ? "text-[#C9922A]"
                    : "text-[#1B2A4A]"
                }`}
              >
                {checkedCount}/{CHECKLIST_ITEMS.length}
              </span>
              <p className="text-xs text-gray-400">complete</p>
            </div>
          </div>

          <div className="space-y-2">
            {CHECKLIST_ITEMS.map((item) => {
              const checked = state.checklist[item.id] ?? false;
              return (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    checked
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheck(item.id)}
                    className="w-4 h-4 rounded accent-green-600 shrink-0"
                  />
                  <span
                    className={`text-sm ${
                      checked ? "text-green-800 line-through" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>

          {checkedCount === CHECKLIST_ITEMS.length && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
              Your pitch is ready. Go pitch it to 3 real people today and collect feedback.
            </div>
          )}

          {checkedCount < CHECKLIST_ITEMS.length && checkedCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              {CHECKLIST_ITEMS.length - checkedCount} item{CHECKLIST_ITEMS.length - checkedCount !== 1 ? "s" : ""} remaining.
              Address these before your next pitch opportunity.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
