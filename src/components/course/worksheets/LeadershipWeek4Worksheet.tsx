import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-leadership-ws-4";

interface Week4Data {
  listeningScore: string;
  listeningBarrier: string;
  feedbackGivingScore: string;
  lastFeedbackExample: string;
  feedbackReceivingScore: string;
  feedbackReceivingReaction: string;
  crucialConvAvoiding: string;
  crucialConvOutcome: string;
  communicationStyle: string;
  developmentAction: string;
}

const defaultData: Week4Data = {
  listeningScore: "",
  listeningBarrier: "",
  feedbackGivingScore: "",
  lastFeedbackExample: "",
  feedbackReceivingScore: "",
  feedbackReceivingReaction: "",
  crucialConvAvoiding: "",
  crucialConvOutcome: "",
  communicationStyle: "",
  developmentAction: "",
};

export default function LeadershipWeek4Worksheet() {
  const [data, setData] = useState<Week4Data>(() => {
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

  function update<K extends keyof Week4Data>(field: K, value: Week4Data[K]) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  const allFields = [
    data.listeningScore, data.listeningBarrier,
    data.feedbackGivingScore, data.lastFeedbackExample,
    data.feedbackReceivingScore, data.feedbackReceivingReaction,
    data.crucialConvAvoiding, data.crucialConvOutcome,
    data.communicationStyle, data.developmentAction,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / allFields.length) * 100);

  return (
    <div className="worksheet-container space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Communication Style Assessment</h3>
          <p className="text-sm text-gray-500">Evaluate your listening, feedback, and crucial conversation skills.</p>
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

      <div className="no-print">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Worksheet Progress</span>
          <span>{completionPercent}%</span>
        </div>
        <Progress value={completionPercent} className="h-2" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Listening</h4>
          <p className="text-xs text-gray-500 mb-4">Great leadership starts with genuinely hearing people.</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700 min-w-[180px]">Listening effectiveness (1–10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={data.listeningScore}
                onChange={e => update("listeningScore", e.target.value)}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                placeholder="—"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What is your biggest barrier to listening well?</label>
              <Textarea
                value={data.listeningBarrier}
                onChange={e => update("listeningBarrier", e.target.value)}
                placeholder="e.g., Formulating my response while they're still talking; checking my phone; assuming I know what they'll say..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Giving Feedback</h4>
          <p className="text-xs text-gray-500 mb-4">Leaders who give honest, caring feedback accelerate growth.</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700 min-w-[180px]">Feedback giving effectiveness (1–10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={data.feedbackGivingScore}
                onChange={e => update("feedbackGivingScore", e.target.value)}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                placeholder="—"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Describe the last time you gave meaningful feedback to someone. What happened?</label>
              <Textarea
                value={data.lastFeedbackExample}
                onChange={e => update("lastFeedbackExample", e.target.value)}
                placeholder="Be specific. What did you say? How did they respond? What would you do differently?"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Receiving Feedback</h4>
          <p className="text-xs text-gray-500 mb-4">How you receive feedback tells your team whether to be honest with you.</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700 min-w-[180px]">Feedback receiving openness (1–10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={data.feedbackReceivingScore}
                onChange={e => update("feedbackReceivingScore", e.target.value)}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                placeholder="—"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What is your default reaction when someone gives you critical feedback?</label>
              <Textarea
                value={data.feedbackReceivingReaction}
                onChange={e => update("feedbackReceivingReaction", e.target.value)}
                placeholder="e.g., I get defensive; I shut down; I dismiss it; I say thanks but don't change..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Crucial Conversations</h4>
          <p className="text-xs text-gray-500 mb-4">The conversations you avoid become the ceilings on your team's growth.</p>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">What crucial conversation are you currently avoiding?</label>
              <Textarea
                value={data.crucialConvAvoiding}
                onChange={e => update("crucialConvAvoiding", e.target.value)}
                placeholder="Be specific. With whom? About what? How long have you been avoiding it?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">What outcome do you want from that conversation?</label>
              <Textarea
                value={data.crucialConvOutcome}
                onChange={e => update("crucialConvOutcome", e.target.value)}
                placeholder="What does a good outcome look like for both you and the other person?"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C9A84C] bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-3">My Communication Style & Development Action</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700 block mb-1">How would your team describe your communication style in 3 words?</label>
              <Input
                value={data.communicationStyle}
                onChange={e => update("communicationStyle", e.target.value)}
                placeholder="e.g., Direct, rushed, encouraging... (be honest, not aspirational)"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">One communication practice I will start this week</label>
              <Textarea
                value={data.developmentAction}
                onChange={e => update("developmentAction", e.target.value)}
                placeholder="e.g., Have the conversation I've been avoiding. Ask for feedback from two team members. Put my phone away in every meeting this week."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
