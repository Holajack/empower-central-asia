import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "bbb-vpc-data";

type JobType = "functional" | "social" | "emotional";

interface Job {
  text: string;
  type: JobType;
}

interface Pain {
  text: string;
  severity: number;
}

interface Gain {
  text: string;
  relevance: number;
}

interface SimpleItem {
  text: string;
}

interface VPCState {
  jobs: Job[];
  pains: Pain[];
  gains: Gain[];
  products: SimpleItem[];
  painRelievers: SimpleItem[];
  gainCreators: SimpleItem[];
}

const defaults: VPCState = {
  jobs: [{ text: "", type: "functional" }],
  pains: [{ text: "", severity: 5 }],
  gains: [{ text: "", relevance: 5 }],
  products: [{ text: "" }],
  painRelievers: [{ text: "" }],
  gainCreators: [{ text: "" }],
};

function calcProgress(state: VPCState): number {
  const sections: boolean[] = [
    state.jobs.some((j) => j.text.trim() !== ""),
    state.pains.some((p) => p.text.trim() !== ""),
    state.gains.some((g) => g.text.trim() !== ""),
    state.products.some((p) => p.text.trim() !== ""),
    state.painRelievers.some((p) => p.text.trim() !== ""),
    state.gainCreators.some((g) => g.text.trim() !== ""),
  ];
  return Math.round((sections.filter(Boolean).length / 6) * 100);
}

const jobTypeColors: Record<JobType, string> = {
  functional: "bg-blue-100 text-blue-800 border-blue-300",
  social: "bg-purple-100 text-purple-800 border-purple-300",
  emotional: "bg-pink-100 text-pink-800 border-pink-300",
};

const jobTypeLabels: Record<JobType, string> = {
  functional: "Functional",
  social: "Social",
  emotional: "Emotional",
};

export default function ValuePropositionCanvas() {
  const [state, setState] = useState<VPCState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaults;
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 500);
    return () => clearTimeout(timer);
  }, [state]);

  const manualSave = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [state]);

  const progress = calcProgress(state);

  // --- Jobs ---
  function addJob() {
    setState((prev) => ({ ...prev, jobs: [...prev.jobs, { text: "", type: "functional" }] }));
  }
  function removeJob(i: number) {
    setState((prev) => ({ ...prev, jobs: prev.jobs.filter((_, idx) => idx !== i) }));
  }
  function updateJob(i: number, field: keyof Job, value: string) {
    setState((prev) => {
      const jobs = prev.jobs.map((j, idx) => idx === i ? { ...j, [field]: value } : j);
      return { ...prev, jobs };
    });
  }

  // --- Pains ---
  function addPain() {
    setState((prev) => ({ ...prev, pains: [...prev.pains, { text: "", severity: 5 }] }));
  }
  function removePain(i: number) {
    setState((prev) => ({ ...prev, pains: prev.pains.filter((_, idx) => idx !== i) }));
  }
  function updatePain(i: number, field: keyof Pain, value: string | number) {
    setState((prev) => {
      const pains = prev.pains.map((p, idx) => idx === i ? { ...p, [field]: value } : p);
      return { ...prev, pains };
    });
  }

  // --- Gains ---
  function addGain() {
    setState((prev) => ({ ...prev, gains: [...prev.gains, { text: "", relevance: 5 }] }));
  }
  function removeGain(i: number) {
    setState((prev) => ({ ...prev, gains: prev.gains.filter((_, idx) => idx !== i) }));
  }
  function updateGain(i: number, field: keyof Gain, value: string | number) {
    setState((prev) => {
      const gains = prev.gains.map((g, idx) => idx === i ? { ...g, [field]: value } : g);
      return { ...prev, gains };
    });
  }

  // --- Simple list helpers ---
  function addSimple(section: "products" | "painRelievers" | "gainCreators") {
    setState((prev) => ({ ...prev, [section]: [...prev[section], { text: "" }] }));
  }
  function removeSimple(section: "products" | "painRelievers" | "gainCreators", i: number) {
    setState((prev) => ({ ...prev, [section]: prev[section].filter((_, idx) => idx !== i) }));
  }
  function updateSimple(section: "products" | "painRelievers" | "gainCreators", i: number, value: string) {
    setState((prev) => {
      const arr = prev[section].map((item, idx) => idx === i ? { text: value } : item);
      return { ...prev, [section]: arr };
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#1B2A4A]">Value Proposition Canvas</h2>
          <p className="text-sm text-gray-500 mt-1">Week 5 — Map your value to your customer's needs</p>
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
            {saved ? "Saved!" : "Save"}
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Canvas completion</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Canvas — two-panel grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT: Customer Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C9922A]" />
            <h3 className="text-lg font-bold text-[#1B2A4A]">Customer Profile</h3>
          </div>
          <p className="text-xs text-gray-500 -mt-2">Who is your customer and what do they need?</p>

          {/* Jobs */}
          <Card className="border-[#1B2A4A]/20">
            <CardContent className="pt-5 space-y-3">
              <div>
                <h4 className="font-semibold text-[#1B2A4A] text-sm mb-0.5">Customer Jobs</h4>
                <p className="text-xs text-gray-400">What tasks, goals, or problems are they trying to complete?</p>
              </div>
              {state.jobs.map((job, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={job.text}
                    onChange={(e) => updateJob(i, "text", e.target.value)}
                    placeholder="e.g. Run a profitable small business"
                    className="flex-1 text-sm h-9"
                  />
                  <select
                    value={job.type}
                    onChange={(e) => updateJob(i, "type", e.target.value)}
                    className={`text-xs px-2 py-1.5 rounded border font-medium h-9 ${jobTypeColors[job.type]}`}
                  >
                    {(["functional", "social", "emotional"] as JobType[]).map((t) => (
                      <option key={t} value={t}>{jobTypeLabels[t]}</option>
                    ))}
                  </select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0"
                    onClick={() => removeJob(i)}
                    disabled={state.jobs.length === 1}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed text-[#1B2A4A] border-[#1B2A4A]/30 hover:bg-[#1B2A4A]/5"
                onClick={addJob}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Job
              </Button>
            </CardContent>
          </Card>

          {/* Pains */}
          <Card className="border-red-200">
            <CardContent className="pt-5 space-y-3">
              <div>
                <h4 className="font-semibold text-[#1B2A4A] text-sm mb-0.5">Customer Pains</h4>
                <p className="text-xs text-gray-400">What frustrates, risks, or blocks them? Rate severity 1–10.</p>
              </div>
              {state.pains.map((pain, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={pain.text}
                    onChange={(e) => updatePain(i, "text", e.target.value)}
                    placeholder="e.g. Can't access affordable credit"
                    className="flex-1 text-sm h-9"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={pain.severity}
                      onChange={(e) => updatePain(i, "severity", parseInt(e.target.value))}
                      className="w-16 accent-red-500"
                    />
                    <span className="text-xs font-bold text-red-600 w-4 text-right">{pain.severity}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0"
                    onClick={() => removePain(i)}
                    disabled={state.pains.length === 1}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed text-red-600 border-red-300 hover:bg-red-50"
                onClick={addPain}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Pain
              </Button>
            </CardContent>
          </Card>

          {/* Gains */}
          <Card className="border-green-200">
            <CardContent className="pt-5 space-y-3">
              <div>
                <h4 className="font-semibold text-[#1B2A4A] text-sm mb-0.5">Customer Gains</h4>
                <p className="text-xs text-gray-400">What outcomes or benefits do they want? Rate relevance 1–10.</p>
              </div>
              {state.gains.map((gain, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={gain.text}
                    onChange={(e) => updateGain(i, "text", e.target.value)}
                    placeholder="e.g. Increase monthly income by 30%"
                    className="flex-1 text-sm h-9"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={gain.relevance}
                      onChange={(e) => updateGain(i, "relevance", parseInt(e.target.value))}
                      className="w-16 accent-green-600"
                    />
                    <span className="text-xs font-bold text-green-700 w-4 text-right">{gain.relevance}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0"
                    onClick={() => removeGain(i)}
                    disabled={state.gains.length === 1}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed text-green-700 border-green-300 hover:bg-green-50"
                onClick={addGain}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Gain
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Value Map */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1B2A4A]" />
            <h3 className="text-lg font-bold text-[#1B2A4A]">Value Map</h3>
          </div>
          <p className="text-xs text-gray-500 -mt-2">How does your offer create value for that customer?</p>

          {/* Products & Services */}
          <Card className="border-[#1B2A4A]/20">
            <CardContent className="pt-5 space-y-3">
              <div>
                <h4 className="font-semibold text-[#1B2A4A] text-sm mb-0.5">Products & Services</h4>
                <p className="text-xs text-gray-400">What are you offering? List each product or service.</p>
              </div>
              {state.products.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={item.text}
                    onChange={(e) => updateSimple("products", i, e.target.value)}
                    placeholder="e.g. Online bookkeeping course"
                    className="flex-1 text-sm h-9"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0"
                    onClick={() => removeSimple("products", i)}
                    disabled={state.products.length === 1}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed text-[#1B2A4A] border-[#1B2A4A]/30 hover:bg-[#1B2A4A]/5"
                onClick={() => addSimple("products")}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Product/Service
              </Button>
            </CardContent>
          </Card>

          {/* Pain Relievers */}
          <Card className="border-red-200">
            <CardContent className="pt-5 space-y-3">
              <div>
                <h4 className="font-semibold text-[#1B2A4A] text-sm mb-0.5">Pain Relievers</h4>
                <p className="text-xs text-gray-400">How does your offer reduce or eliminate customer pains?</p>
              </div>
              {state.painRelievers.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={item.text}
                    onChange={(e) => updateSimple("painRelievers", i, e.target.value)}
                    placeholder="e.g. Step-by-step credit guidance"
                    className="flex-1 text-sm h-9"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0"
                    onClick={() => removeSimple("painRelievers", i)}
                    disabled={state.painRelievers.length === 1}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => addSimple("painRelievers")}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Pain Reliever
              </Button>
            </CardContent>
          </Card>

          {/* Gain Creators */}
          <Card className="border-green-200">
            <CardContent className="pt-5 space-y-3">
              <div>
                <h4 className="font-semibold text-[#1B2A4A] text-sm mb-0.5">Gain Creators</h4>
                <p className="text-xs text-gray-400">How does your offer produce outcomes or benefits customers want?</p>
              </div>
              {state.gainCreators.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={item.text}
                    onChange={(e) => updateSimple("gainCreators", i, e.target.value)}
                    placeholder="e.g. Structured 90-day profit roadmap"
                    className="flex-1 text-sm h-9"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0"
                    onClick={() => removeSimple("gainCreators", i)}
                    disabled={state.gainCreators.length === 1}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed text-green-700 border-green-300 hover:bg-green-50"
                onClick={() => addSimple("gainCreators")}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Gain Creator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fit indicator */}
      <Card className="border-[#C9922A]/40 bg-[#C9922A]/5">
        <CardContent className="pt-5">
          <h4 className="font-semibold text-[#1B2A4A] text-sm mb-1">Fit Check</h4>
          <p className="text-xs text-gray-600">
            A strong Value Proposition Canvas has clear connections between each pain and a pain reliever, and each gain and a gain creator.
            Review your canvas: does every customer pain have a matching pain reliever? Does every gain have a gain creator?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
