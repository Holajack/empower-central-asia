import { week1Content } from './week1Content';
import { week2Content } from './week2Content';
import { week3Content } from './week3Content';
import { week4Content } from './week4Content';
import { week5Content } from './week5Content';
import { week6Content } from './week6Content';
import type { WeekFullContent } from './types';

export type { WeekFullContent } from './types';
export type {
  LessonSection,
  StorySection,
  WorksheetFieldDef,
  WorksheetSectionDef,
  WorksheetDef,
  ReflectionQuestion,
  DeeperPerspective,
} from './types';

export const weekFullContents: WeekFullContent[] = [
  week1Content,
  week2Content,
  week3Content,
  week4Content,
  week5Content,
  week6Content,
];

// Backward-compatible exports matching original courseContent.ts shape
export const courseWeeks = weekFullContents.map((w) => ({
  week: w.week,
  title: w.title,
  subtitle: w.subtitle,
  keyQuote: w.keyQuote,
  quoteAuthor: w.quoteAuthor,
  overview: w.overview,
  objectives: w.objectives,
  keyTopics: w.keyTopics,
  activities: w.activities,
  actionItems: w.actionItems,
  toolLink: w.toolLink,
  toolLabel: w.toolLabel,
}));

export { tenWeekOverview } from '../courseContent';

export function getWeekFullContent(weekNum: number): WeekFullContent | undefined {
  return weekFullContents.find((w) => w.week === weekNum);
}
