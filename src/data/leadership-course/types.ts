import type { LessonSection, StorySection, WorksheetDef, ReflectionQuestion } from '../course/types';

export type { LessonSection, StorySection, WorksheetDef, ReflectionQuestion };

export interface CaseStudyCheckpointDef {
  checkpointNumber: number; // 1-4
  scenarioPrompt: string;
  analysisQuestions: string[];
  leadershipStyleApplication: string;
}

export interface LeadershipWeekContent {
  week: number;
  module: string;
  title: string;
  subtitle: string;
  keyQuote: string;
  quoteAuthor: string;
  leadershipFramework: string;
  overview: string;
  objectives: string[];
  keyTopics: { title: string; description: string }[];
  actionItems: string[];
  lessonSections: LessonSection[];
  story: StorySection;
  storyCentralAsia?: StorySection;
  worksheetDef: WorksheetDef;
  reflectionQuestions: ReflectionQuestion[];
  caseStudyCheckpoint?: CaseStudyCheckpointDef;
  toolLink?: string;
  toolLabel?: string;
}
