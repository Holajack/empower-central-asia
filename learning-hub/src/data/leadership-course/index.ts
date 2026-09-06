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
import type { LeadershipWeekContent } from './types';

export type { LeadershipWeekContent, CaseStudyCheckpointDef } from './types';

export const leadershipWeekContents: LeadershipWeekContent[] = [
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

export const leadershipCourseWeeks = leadershipWeekContents.map((w) => ({
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
  leadershipFramework: w.leadershipFramework,
  hasCaseStudy: !!w.caseStudyCheckpoint,
}));

export const leadershipModules = [
  { title: 'Leading Yourself', weeks: [1, 2, 3] },
  { title: 'Leading Others', weeks: [4, 5, 6] },
  { title: 'Leading Teams', weeks: [7, 8, 9] },
  { title: 'Leading Organizations', weeks: [10, 11, 12] },
];

export function getLeadershipWeekContent(weekNum: number): LeadershipWeekContent | undefined {
  return leadershipWeekContents.find((w) => w.week === weekNum);
}
