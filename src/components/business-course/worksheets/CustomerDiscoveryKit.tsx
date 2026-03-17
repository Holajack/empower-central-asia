import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "bbb-business-worksheet-6";

interface Interviewee {
  name: string;
  where: string;
  when: string;
}

interface CDKState {
  interviewees: Interviewee[];
  questions: string[];
  says: string;
  thinks: string;
  does: string;
  feels: string;
  bmcUpdates: string;
}

const EMPTY_INTERVIEWEE: Interviewee = { name: "", where: "", when: "" };

const QUESTION_HINTS = [
  "Tell me about the last time you experienced [problem]. What happened?",
  "How are you currently solving this problem? What do you use today?",
  "What's the most frustrating part of your current solution?",
  "How much time or money does this problem cost you per month?",
  "Who else is affected when this problem occurs?",
  "What would an ideal solution look like for you?",
  "Have you tried other solutions? What happened?",
  "How important is solving this compared to other problems you face?",
  "Who else do you know who has this problem? Would they talk to me?",
  "Is there anything I haven't asked that you think is important?",
];

function buildDefaults(): CDKState {
  return {
    interviewees: Array.from({ length: 5 }, () => ({ ...EMPTY_INTERVIEWEE })),
    questions: Array(10).fill(""),
    says: "",
    thinks: "",
    does: "",
    feels: "",
    bmcUpdates: "",
  };
}

function calcProgress(state: CDKState): number {
  let filled = 0;
  const total = 8;

  // Interview plan: at least 1 row partially filled
  if (state.interviewees.some((i) => i.name.trim() || i.where.trim() || i.when.trim())) filled++;

  // Questions: at least 5 filled
  if (state.questions.filter((q) => q.trim()).length >= 5) filled++;

  if (state.says.trim()) filled++;
  if (state.thinks.trim()) filled++;
  if (state.does.trim()) filled++;
  if (state.feels.trim()) filled++;
  if (state.bmcUpdates.trim()) filled++;

  // Bonus: all 10 questions answered
  if (state.questions.filter((q) => q.trim()).length === 10) filled++;

  return Math.round((Math.min(filled, total) / total) * 100);
}

export default function CustomerDiscoveryKit() {
  const [state, setState] = useState<CDKState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return buildDefaults();
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

  const progress = calcProgress(state);

  // --- Interviewees ---
  function updateInterviewee(i: number, field: keyof Interviewee, value: string) {
    setState((prev) => {
      const interviewees = prev.interviewees.map((row, idx) =>
        idx === i ? { ...row, [field]: value } : row
      );
      return { ...prev, interviewees };
    });
  }
  function addInterviewee() {
    setState((prev) => ({
      ...prev,
      interviewees: [...prev.interviewees, { ...EMPTY_INTERVIEWEE }],
    }));
  }
  function removeInterviewee(i: number) {
    if (state.interviewees.length <= 1) return;
    setState((prev) => ({
      ...prev,
      interviewees: prev.interviewees.filter((_, idx) => idx !== i),
    }));
  }

  // --- Questions ---
  function updateQuestion(i: number, value: string) {
    setState((prev) => {
      const questions = prev.questions.map((q, idx) => (idx === i ? value : q));
      return { ...prev, questions };
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#1B2A4A]">Customer Discovery Kit</h2>
          <p className="text-sm text-gray-500 mt-1">Week 6 — Get out of the building and talk to real customers</p>
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
          <span>Kit completion</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Section 1: Interview Planning */}
      <Card className="border-[#1B2A4A]/20">
        <CardContent className="pt-5 space-y-4">
          <div>
            <h3 className="font-bold text-[#1B2A4A] mb-0.5">Interview Planning</h3>
            <p className="text-xs text-gray-500">
              Identify 5+ people who represent your target customer. Plan where and when you'll talk to them.
            </p>
          </div>

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_auto] gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">
            <span>Name / Contact</span>
            <span>Where to meet</span>
            <span>When</span>
            <span className="w-8" />
          </div>

          {state.interviewees.map((row, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
              <Input
                value={row.name}
                onChange={(e) => updateInterviewee(i, "name", e.target.value)}
                placeholder={`Interviewee ${i + 1} name`}
                className="text-sm h-9"
              />
              <Input
                value={row.where}
                onChange={(e) => updateInterviewee(i, "where", e.target.value)}
                placeholder="Market, cafe, phone..."
                className="text-sm h-9"
              />
              <Input
                value={row.when}
                onChange={(e) => updateInterviewee(i, "when", e.target.value)}
                placeholder="Day / time"
                className="text-sm h-9"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0 mx-auto sm:mx-0"
                onClick={() => removeInterviewee(i)}
                disabled={state.interviewees.length === 1}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="border-dashed text-[#1B2A4A] border-[#1B2A4A]/30 hover:bg-[#1B2A4A]/5"
            onClick={addInterviewee}
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Row
          </Button>
        </CardContent>
      </Card>

      {/* Section 2: Interview Script */}
      <Card className="border-[#C9922A]/30">
        <CardContent className="pt-5 space-y-4">
          <div>
            <h3 className="font-bold text-[#1B2A4A] mb-0.5">Interview Script</h3>
            <p className="text-xs text-gray-500">
              Write your 10 interview questions. Focus on understanding their current behavior — not validating your idea.
              Use the hint below each field as a starting point.
            </p>
          </div>

          {state.questions.map((q, i) => (
            <div key={i} className="space-y-1">
              <label className="text-xs font-semibold text-[#1B2A4A]">Question {i + 1}</label>
              <textarea
                value={q}
                onChange={(e) => updateQuestion(i, e.target.value)}
                placeholder={`Write your question here...`}
                rows={2}
                className="w-full p-3 text-sm border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50"
              />
              <p className="text-xs text-gray-400 italic pl-1">
                Hint: {QUESTION_HINTS[i]}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Section 3: Empathy Map */}
      <Card className="border-[#1B2A4A]/20">
        <CardContent className="pt-5 space-y-4">
          <div>
            <h3 className="font-bold text-[#1B2A4A] mb-0.5">Empathy Map</h3>
            <p className="text-xs text-gray-500">
              After your interviews, summarize what you learned about your customer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                {
                  key: "says" as const,
                  label: "Says",
                  color: "border-blue-300",
                  labelColor: "text-blue-700",
                  placeholder: "Direct quotes from interviews. What exact words did they use?",
                },
                {
                  key: "thinks" as const,
                  label: "Thinks",
                  color: "border-purple-300",
                  labelColor: "text-purple-700",
                  placeholder: "What's on their mind that they might not say out loud?",
                },
                {
                  key: "does" as const,
                  label: "Does",
                  color: "border-green-300",
                  labelColor: "text-green-700",
                  placeholder: "What actions do they take? What behaviors did you observe?",
                },
                {
                  key: "feels" as const,
                  label: "Feels",
                  color: "border-red-300",
                  labelColor: "text-red-700",
                  placeholder: "What emotions drive their decisions? What frustrates or excites them?",
                },
              ] as const
            ).map(({ key, label, color, labelColor, placeholder }) => (
              <div key={key} className="space-y-1.5">
                <label className={`text-sm font-bold ${labelColor}`}>{label}</label>
                <textarea
                  value={state[key]}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  placeholder={placeholder}
                  rows={4}
                  className={`w-full p-3 text-sm border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50 ${color}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: BMC Update Log */}
      <Card className="border-[#C9922A]/40 bg-[#C9922A]/5">
        <CardContent className="pt-5 space-y-3">
          <div>
            <h3 className="font-bold text-[#1B2A4A] mb-0.5">BMC Update Log</h3>
            <p className="text-xs text-gray-500">
              What changed on your Business Model Canvas based on your customer interviews?
              Be specific — which blocks changed and why?
            </p>
          </div>
          <textarea
            value={state.bmcUpdates}
            onChange={(e) =>
              setState((prev) => ({ ...prev, bmcUpdates: e.target.value }))
            }
            placeholder="Example: Changed Customer Segments — realized our primary customer is small market vendors, not office workers. Updated Revenue Streams — they prefer weekly payments, not monthly subscriptions..."
            rows={5}
            className="w-full p-3 text-sm border border-[#C9922A]/30 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50 bg-white"
          />
        </CardContent>
      </Card>
    </div>
  );
}
