import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-business-worksheet-11";

interface ChannelBrainstormRow {
  channel: string;
  effectiveness: string;
}

interface TopChannelPlan {
  channel: string;
  plan: string;
  cost: string;
  timeline: string;
}

interface MilestoneRow {
  milestone: string;
  target: string;
  date: string;
}

interface TractionData {
  brainstormChannels: ChannelBrainstormRow[];
  topChannels: [TopChannelPlan, TopChannelPlan, TopChannelPlan];
  awareness: string;
  interest: string;
  decision: string;
  action: string;
  milestones: MilestoneRow[];
}

const emptyTopChannel = (): TopChannelPlan => ({ channel: "", plan: "", cost: "", timeline: "" });

const defaultData: TractionData = {
  brainstormChannels: [
    { channel: "", effectiveness: "" },
    { channel: "", effectiveness: "" },
    { channel: "", effectiveness: "" },
    { channel: "", effectiveness: "" },
    { channel: "", effectiveness: "" },
  ],
  topChannels: [emptyTopChannel(), emptyTopChannel(), emptyTopChannel()],
  awareness: "",
  interest: "",
  decision: "",
  action: "",
  milestones: [
    { milestone: "", target: "", date: "" },
    { milestone: "", target: "", date: "" },
    { milestone: "", target: "", date: "" },
  ],
};

function effectivenessColor(score: number): string {
  if (score >= 4) return "text-green-700 bg-green-100";
  if (score >= 3) return "text-amber-700 bg-amber-100";
  return "text-red-700 bg-red-100";
}

export default function TractionPlanner() {
  const [data, setData] = useState<TractionData>(() => {
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

  // Channel brainstorm helpers
  function updateBrainstorm(index: number, field: keyof ChannelBrainstormRow, value: string) {
    setData(prev => {
      const brainstormChannels = [...prev.brainstormChannels];
      brainstormChannels[index] = { ...brainstormChannels[index], [field]: value };
      return { ...prev, brainstormChannels };
    });
  }

  function addBrainstorm() {
    setData(prev => ({
      ...prev,
      brainstormChannels: [...prev.brainstormChannels, { channel: "", effectiveness: "" }],
    }));
  }

  function removeBrainstorm(index: number) {
    setData(prev => ({
      ...prev,
      brainstormChannels:
        prev.brainstormChannels.length > 1
          ? prev.brainstormChannels.filter((_, i) => i !== index)
          : prev.brainstormChannels,
    }));
  }

  // Top channel helpers
  function updateTopChannel(channelIndex: 0 | 1 | 2, field: keyof TopChannelPlan, value: string) {
    setData(prev => {
      const topChannels: [TopChannelPlan, TopChannelPlan, TopChannelPlan] = [
        ...prev.topChannels,
      ] as [TopChannelPlan, TopChannelPlan, TopChannelPlan];
      topChannels[channelIndex] = { ...topChannels[channelIndex], [field]: value };
      return { ...prev, topChannels };
    });
  }

  // Milestone helpers
  function updateMilestone(index: number, field: keyof MilestoneRow, value: string) {
    setData(prev => {
      const milestones = [...prev.milestones];
      milestones[index] = { ...milestones[index], [field]: value };
      return { ...prev, milestones };
    });
  }

  function addMilestone() {
    setData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { milestone: "", target: "", date: "" }],
    }));
  }

  function removeMilestone(index: number) {
    setData(prev => ({
      ...prev,
      milestones:
        prev.milestones.length > 1
          ? prev.milestones.filter((_, i) => i !== index)
          : prev.milestones,
    }));
  }

  // Compute funnel conversion (simple display)
  const awarenessNum = parseInt(data.awareness) || 0;
  const actionNum = parseInt(data.action) || 0;
  const conversionRate =
    awarenessNum > 0 ? `${((actionNum / awarenessNum) * 100).toFixed(1)}%` : "—";

  // Completion percentage
  const brainstormFields = data.brainstormChannels.flatMap(c => [c.channel, c.effectiveness]);
  const topChannelFields = data.topChannels.flatMap(c => [c.channel, c.plan, c.cost, c.timeline]);
  const funnelFields = [data.awareness, data.interest, data.decision, data.action];
  const milestoneFields = data.milestones.flatMap(m => [m.milestone, m.target, m.date]);
  const allFields = [...brainstormFields, ...topChannelFields, ...funnelFields, ...milestoneFields];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / Math.max(allFields.length, 12)) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Traction Planner</h3>
          <p className="text-sm text-gray-500">Week 11 — Your data is saved automatically to this device.</p>
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

      {/* Channel Brainstorm */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Channel Brainstorm</h4>
          <p className="text-xs text-gray-500 mb-4">
            List every possible channel you could use to reach your first customers. Rate how effective you expect each one to be (1 = low, 5 = high).
          </p>

          <div className="space-y-2">
            {data.brainstormChannels.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_100px_auto] gap-2 items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  {i === 0 && <label className="text-xs text-gray-500 block mb-1">Channel Name</label>}
                  <Input
                    value={row.channel}
                    onChange={e => updateBrainstorm(i, "channel", e.target.value)}
                    placeholder="e.g., Telegram Groups, Instagram, Word of Mouth..."
                  />
                </div>
                <div>
                  {i === 0 && (
                    <label className="text-xs text-gray-500 block mb-1">Effectiveness (1-5)</label>
                  )}
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={row.effectiveness}
                      onChange={e => updateBrainstorm(i, "effectiveness", e.target.value)}
                      placeholder="1-5"
                    />
                    {row.effectiveness && (
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${effectivenessColor(
                          parseInt(row.effectiveness)
                        )}`}
                      >
                        {row.effectiveness}/5
                      </span>
                    )}
                  </div>
                </div>
                {data.brainstormChannels.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBrainstorm(i)}
                    className="text-red-400 hover:text-red-600 no-print"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addBrainstorm} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Channel
          </Button>
        </CardContent>
      </Card>

      {/* Top 3 Channel Plans */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Top 3 Channel Action Plans</h4>
          <p className="text-xs text-gray-500 mb-4">
            Pick your three most promising channels and create a specific action plan for each. Being specific here is the difference between a strategy and a wish.
          </p>

          <div className="space-y-5">
            {([0, 1, 2] as (0 | 1 | 2)[]).map(i => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center shrink-0 font-bold">
                    {i + 1}
                  </span>
                  <label className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-wide">
                    Channel {i + 1}
                  </label>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Channel Name</label>
                  <Input
                    value={data.topChannels[i].channel}
                    onChange={e => updateTopChannel(i, "channel", e.target.value)}
                    placeholder="e.g., Instagram Reels, local market stall, WhatsApp broadcast..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Detailed Action Plan</label>
                  <Textarea
                    value={data.topChannels[i].plan}
                    onChange={e => updateTopChannel(i, "plan", e.target.value)}
                    placeholder="Exactly what will you do? How often? What content or messages? Who will you target? Be specific."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Estimated Cost</label>
                    <Input
                      value={data.topChannels[i].cost}
                      onChange={e => updateTopChannel(i, "cost", e.target.value)}
                      placeholder="e.g., Free, $20/month, 5 hours/week..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Timeline</label>
                    <Input
                      value={data.topChannels[i].timeline}
                      onChange={e => updateTopChannel(i, "timeline", e.target.value)}
                      placeholder="e.g., Start Week 1, daily for 30 days..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acquisition Funnel */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Acquisition Funnel Estimates</h4>
          <p className="text-xs text-gray-500 mb-4">
            Estimate the number of people at each stage of your customer acquisition funnel. Even rough estimates help you understand conversion rates and identify bottlenecks.
          </p>

          <div className="space-y-3">
            {[
              { key: "awareness", label: "Awareness", description: "How many people know about you or your product?", placeholder: "e.g., 500 people per month" },
              { key: "interest", label: "Interest", description: "How many of those want to learn more?", placeholder: "e.g., 100 people click or ask questions" },
              { key: "decision", label: "Decision", description: "How many are seriously considering buying?", placeholder: "e.g., 30 people ask for pricing" },
              { key: "action", label: "Action", description: "How many actually buy?", placeholder: "e.g., 10 customers per month" },
            ].map(({ key, label, description, placeholder }) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="sm:w-32 shrink-0">
                  <span className="text-sm font-semibold text-[#1B2A4A]">{label}</span>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
                <div className="flex-1">
                  <Input
                    value={data[key as keyof Pick<TractionData, "awareness" | "interest" | "decision" | "action">]}
                    onChange={e =>
                      setData(prev => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}
          </div>

          {awarenessNum > 0 && actionNum > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-[#1B2A4A]/5 border border-[#1B2A4A]/20 text-sm text-[#1B2A4A]">
              Overall conversion rate (Awareness to Action): <strong>{conversionRate}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Revenue Milestones */}
      <Card className="border-[#C9922A]/30 bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Revenue Milestones</h4>
          <p className="text-xs text-gray-500 mb-4">
            Set clear, time-bound milestones for your business growth. Milestones give you targets to aim for and allow you to measure whether your traction strategy is working.
          </p>

          <div className="space-y-2">
            {data.milestones.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_140px_auto] gap-2 items-end p-3 bg-white rounded-lg border border-amber-100"
              >
                <div>
                  {i === 0 && <label className="text-xs text-gray-500 block mb-1">Milestone</label>}
                  <Input
                    value={row.milestone}
                    onChange={e => updateMilestone(i, "milestone", e.target.value)}
                    placeholder="e.g., First paying customer"
                  />
                </div>
                <div>
                  {i === 0 && <label className="text-xs text-gray-500 block mb-1">Target</label>}
                  <Input
                    value={row.target}
                    onChange={e => updateMilestone(i, "target", e.target.value)}
                    placeholder="e.g., 10 customers, $500 revenue"
                  />
                </div>
                <div>
                  {i === 0 && <label className="text-xs text-gray-500 block mb-1">Target Date</label>}
                  <Input
                    value={row.date}
                    onChange={e => updateMilestone(i, "date", e.target.value)}
                    placeholder="e.g., End of Month 1"
                  />
                </div>
                {data.milestones.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMilestone(i)}
                    className="text-red-400 hover:text-red-600 no-print"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addMilestone} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Milestone
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
