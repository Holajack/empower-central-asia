import type { LessonSection, StorySection, WorksheetDef, ReflectionQuestion } from '../course/types';

export type { LessonSection, StorySection, WorksheetDef, ReflectionQuestion };

export interface FourHatsCheckpointDef {
  checkpointNumber: number; // 1-4
  pitchPrompt: string;
  evaluationPrompt: string;
  whiteHatPrompt: string;
  blackHatPrompt: string;
  yellowHatPrompt: string;
  goldHatPrompt: string;
}

export interface BusinessWeekContent {
  week: number;
  module: { number: number; title: string };
  title: string;
  subtitle: string;
  keyQuote: string;
  quoteAuthor: string;
  overview: string;
  objectives: string[];
  keyTopics: { title: string; description: string }[];
  actionItems: string[];
  realWorldActivity: { title: string; description: string };
  lessonSections: LessonSection[];
  story: StorySection;
  storyCentralAsia?: StorySection;
  worksheetDef: WorksheetDef;
  reflectionQuestions: ReflectionQuestion[];
  fourHatsCheckpoint?: FourHatsCheckpointDef;
  toolLink?: string;
  toolLabel?: string;
}
