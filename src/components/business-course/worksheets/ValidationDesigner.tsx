import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-business-worksheet-9";

interface HypothesisRow {
  hypothesis: string;
  metric: string;
  criteria: string;
}

interface ExperimentRow {
  description: string;
  duration: string;
  result: string;
}

interface ValidationData {
  hypotheses: HypothesisRow[];
  experiments: ExperimentRow[];
  pivotOrPersevere: string;
  whiteValidation: string;
  blackConcerns: string;
  yellowConfidence: string;
  goldPivotIdea: string;
}

const defaultData: ValidationData = {
  hypotheses: [
    { hypothesis: "", metric: "", criteria: "" },
    { hypothesis: "", metric: "", criteria: "" },
  ],
  experiments: [
    { description: "", duration: "", result: "" },
  ],
  pivotOrPersevere: "",
  whiteValidation: "",
  blackConcerns: "",
  yellowConfidence: "",
  goldPivotIdea: "",
};

export default function ValidationDesigner() {
  const [data, setData] = useState<ValidationData>(() => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  // Hypothesis helpers
  function updateHypothesis(index: number, field: keyof HypothesisRow, value: string) {
    setData(prev => {
      const hypotheses = [...prev.hypotheses];
      hypotheses[index] = { ...hypotheses[index], [field]: value };
      return { ...prev, hypotheses };
    });
  }

  function addHypothesis() {
    setData(prev => ({
      ...prev,
      hypotheses: [...prev.hypotheses, { hypothesis: "", metric: "", criteria: "" }],
    }));
  }

  function removeHypothesis(index: number) {
    setData(prev => ({
      ...prev,
      hypotheses:
        prev.hypotheses.length > 1
          ? prev.hypotheses.filter((_, i) => i !== index)
          : prev.hypotheses,
    }));
  }

  // Experiment helpers
  function updateExperiment(index: number, field: keyof ExperimentRow, value: string) {
    setData(prev => {
      const experiments = [...prev.experiments];
      experiments[index] = { ...experiments[index], [field]: value };
      return { ...prev, experiments };
    });
  }

  function addExperiment() {
    setData(prev => ({
      ...prev,
      experiments: [...prev.experiments, { description: "", duration: "", result: "" }],
    }));
  }

  function removeExperiment(index: number) {
    setData(prev => ({
      ...prev,
      experiments:
        prev.experiments.length > 1
          ? prev.experiments.filter((_, i) => i !== index)
          : prev.experiments,
    }));
  }

  // Completion percentage
  const hypothesisFields = data.hypotheses.flatMap(h => [h.hypothesis, h.metric, h.criteria]);
  const experimentFields = data.experiments.flatMap(e => [e.description, e.duration, e.result]);
  const decisionField = [data.pivotOrPersevere];
  const hatFields = [data.whiteValidation, data.blackConcerns, data.yellowConfidence, data.goldPivotIdea];
  const allFields = [...hypothesisFields, ...experimentFields, ...decisionField, ...hatFields];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / Math.max(allFields.length, 12)) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Validation Designer</h3>
          <p className="text-sm text-gray-500">Week 9 — Your data is saved automatically to this device.</p>
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

      {/* Hypotheses */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Validation Hypotheses</h4>
          <p className="text-xs text-gray-500 mb-4">
            Write your core business hypotheses — the beliefs about your customers or market that must be true for your business to work. Define how you will measure and validate each one.
          </p>

          <div className="space-y-4">
            {data.hypotheses.map((row, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-wide">
                    Hypothesis {i + 1}
                  </span>
                  {data.hypotheses.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHypothesis(i)}
                      className="text-red-400 hover:text-red-600 no-print h-7 px-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Hypothesis</label>
                  <Input
                    value={row.hypothesis}
                    onChange={e => updateHypothesis(i, "hypothesis", e.target.value)}
                    placeholder="We believe that..."
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Success Metric</label>
                    <Input
                      value={row.metric}
                      onChange={e => updateHypothesis(i, "metric", e.target.value)}
                      placeholder="We'll measure..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Success Criteria</label>
                    <Input
                      value={row.criteria}
                      onChange={e => updateHypothesis(i, "criteria", e.target.value)}
                      placeholder="We'll know it works if..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addHypothesis} className="mt-4 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Hypothesis
          </Button>
        </CardContent>
      </Card>

      {/* Experiments */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Experiments Run</h4>
          <p className="text-xs text-gray-500 mb-4">
            Document each experiment you designed to test your hypotheses. What did you do, how long did it take, and what did you learn?
          </p>

          <div className="space-y-4">
            {data.experiments.map((row, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-wide">
                    Experiment {i + 1}
                  </span>
                  {data.experiments.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperiment(i)}
                      className="text-red-400 hover:text-red-600 no-print h-7 px-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Experiment Description</label>
                  <Textarea
                    value={row.description}
                    onChange={e => updateExperiment(i, "description", e.target.value)}
                    placeholder="Describe the experiment: what you did, who you tested with, and what you were trying to learn..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Duration</label>
                  <Input
                    value={row.duration}
                    onChange={e => updateExperiment(i, "duration", e.target.value)}
                    placeholder="e.g., 1 week, 3 days, 2 hours of interviews"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Result / What You Learned</label>
                  <Textarea
                    value={row.result}
                    onChange={e => updateExperiment(i, "result", e.target.value)}
                    placeholder="What happened? What data did you collect? Did it confirm or contradict your hypothesis?"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addExperiment} className="mt-4 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Experiment
          </Button>
        </CardContent>
      </Card>

      {/* Pivot or Persevere */}
      <Card className="border-[#C9922A]/30 bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Pivot or Persevere Decision</h4>
          <p className="text-xs text-gray-500 mb-4">
            Based on your validation results, what is your decision? Should you stay on course (persevere), change direction (pivot), or refine your approach? Explain your reasoning.
          </p>
          <Textarea
            value={data.pivotOrPersevere}
            onChange={e => setData(prev => ({ ...prev, pivotOrPersevere: e.target.value }))}
            placeholder="Based on our experiments, we have decided to... because the data showed..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Four Hats Reflection */}
      <Card className="border-[#1B2A4A]/20 bg-[#1B2A4A]/5">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Four Hats Reflection</h4>
          <p className="text-xs text-gray-500 mb-4">
            Analyze your validation results from four perspectives.
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                White Hat — What did the data actually show?
              </label>
              <Textarea
                value={data.whiteValidation}
                onChange={e => setData(prev => ({ ...prev, whiteValidation: e.target.value }))}
                placeholder="Facts and data from your experiments..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Black Hat — What concerns or risks did validation reveal?
              </label>
              <Textarea
                value={data.blackConcerns}
                onChange={e => setData(prev => ({ ...prev, blackConcerns: e.target.value }))}
                placeholder="Problems, risks, or weaknesses uncovered..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Yellow Hat — What positive signals gave you confidence?
              </label>
              <Textarea
                value={data.yellowConfidence}
                onChange={e => setData(prev => ({ ...prev, yellowConfidence: e.target.value }))}
                placeholder="Strong signals, customer interest, or early wins..."
                rows={2}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Gold Hat — If you pivoted, what would you try instead?
              </label>
              <Textarea
                value={data.goldPivotIdea}
                onChange={e => setData(prev => ({ ...prev, goldPivotIdea: e.target.value }))}
                placeholder="Your best alternative idea or direction based on what you learned..."
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
