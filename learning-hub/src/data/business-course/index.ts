import { week1Content } from './week1Content';
import { week2Content } from './week2Content';
import { week3Content } from './week3Content';
import { week4Content } from './week4Content';
import { week5Content } from './week5Content';
import { week6Content } from './week6Content';
import { week7Content } from './week7Content';
import { week8Content } from './week8Content';
import { week9Content } from './week9Content';
import { week10Content } from './week10Content';
import { week11Content } from './week11Content';
import { week12Content } from './week12Content';
import type { BusinessWeekContent } from './types';

export type { BusinessWeekContent, FourHatsCheckpointDef } from './types';

export const businessWeekContents: BusinessWeekContent[] = [
  week1Content,
  week2Content,
  week3Content,
  week4Content,
  week5Content,
  week6Content,
  week7Content,
  week8Content,
  week9Content,
  week10Content,
  week11Content,
  week12Content,
];

export const businessCourseWeeks = businessWeekContents.map((w) => ({
  week: w.week,
  module: w.module,
  title: w.title,
  subtitle: w.subtitle,
  keyQuote: w.keyQuote,
  quoteAuthor: w.quoteAuthor,
  overview: w.overview,
  objectives: w.objectives,
  keyTopics: w.keyTopics,
  actionItems: w.actionItems,
  realWorldActivity: w.realWorldActivity,
  toolLink: w.toolLink,
  toolLabel: w.toolLabel,
  hasFourHats: !!w.fourHatsCheckpoint,
}));

export const businessModules = [
  { number: 1, title: 'Think Like an Entrepreneur', weeks: [1, 2, 3] },
  { number: 2, title: 'Shape Your Business Model', weeks: [4, 5, 6] },
  { number: 3, title: 'Validate Your Assumptions', weeks: [7, 8, 9] },
  { number: 4, title: 'Build Your Traction', weeks: [10, 11, 12] },
];

export function getBusinessWeekContent(weekNum: number): BusinessWeekContent | undefined {
  return businessWeekContents.find((w) => w.week === weekNum);
}
