import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRegion } from "@/contexts/RegionContext";

interface CompletionGateProps {
  weekNum: number;
  objectivesComplete: boolean;
  objectivesCount: { checked: number; total: number };
  worksheetPercent: number;
  actionItemsChecked: number;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onMarkIncomplete: () => void;
}

export default function CompletionGate({
  weekNum,
  objectivesComplete,
  objectivesCount,
  worksheetPercent,
  actionItemsChecked,
  isCompleted,
  onMarkComplete,
  onMarkIncomplete,
}: CompletionGateProps) {
  const { isCentralAsia } = useRegion();
  const worksheetMet = worksheetPercent >= 50;
  const actionsMet = actionItemsChecked >= 1;
  const allMet = objectivesComplete && worksheetMet && actionsMet;

  const requirements = [
    {
      label: isCentralAsia
        ? `Все цели отмечены (${objectivesCount.checked}/${objectivesCount.total})`
        : `All objectives checked (${objectivesCount.checked}/${objectivesCount.total})`,
      met: objectivesComplete,
    },
    {
      label: isCentralAsia
        ? `Рабочий лист заполнен минимум на 50% (${worksheetPercent}%)`
        : `Worksheet at least 50% complete (${worksheetPercent}%)`,
      met: worksheetMet,
    },
    {
      label: isCentralAsia
        ? `Хотя бы 1 действие выполнено (${actionItemsChecked} готово)`
        : `At least 1 action item checked (${actionItemsChecked} done)`,
      met: actionsMet,
    },
  ];

  if (isCompleted) {
    return (
      <Card className="border-green-300 bg-green-50/50 no-print">
        <CardContent className="py-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">{isCentralAsia ? `Неделя ${weekNum} завершена!` : `Week ${weekNum} Complete!`}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkIncomplete}
            className="text-gray-400 hover:text-gray-600"
          >
            {isCentralAsia ? "Отменить завершение" : "Undo completion"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#1B2A4A]/20 no-print">
      <CardContent className="py-6">
        <h3 className="font-bold text-[#1B2A4A] mb-4 text-center">
          {isCentralAsia ? `Завершить Неделю ${weekNum}` : `Complete Week ${weekNum}`}
        </h3>

        <div className="space-y-3 mb-6">
          {requirements.map((req, i) => (
            <div key={i} className="flex items-center gap-3">
              {req.met ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
              )}
              <span className={`text-sm ${req.met ? "text-green-800" : "text-gray-500"}`}>
                {req.label}
              </span>
            </div>
          ))}
        </div>

        {!allMet && (
          <div className="flex items-center gap-2 text-xs text-gray-400 justify-center mb-4">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{isCentralAsia ? "Выполните все требования выше, чтобы завершить эту неделю" : "Complete all requirements above to finish this week"}</span>
          </div>
        )}

        <div className="text-center">
          <Button
            size="lg"
            onClick={onMarkComplete}
            disabled={!allMet}
            className={
              allMet
                ? "bg-green-600 hover:bg-green-700 text-white font-bold px-8"
                : "bg-gray-200 text-gray-400 cursor-not-allowed px-8"
            }
          >
            <CheckCircle2 className="mr-2 w-5 h-5" />
            {isCentralAsia ? `Отметить Неделю ${weekNum} как завершённую` : `Mark Week ${weekNum} as Complete`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
