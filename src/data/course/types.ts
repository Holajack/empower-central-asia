export interface DeeperPerspective {
  title: string;
  content: string[];
  insightStory?: string;
  questions: string[];
}

export interface LessonSection {
  id: string;
  heading: string;
  content: string[];
  callout?: { type: 'tip' | 'warning' | 'example'; content: string };
  questionsToConsider?: string[];
  deeperPerspective?: DeeperPerspective;
}

export interface StorySection {
  title: string;
  paragraphs: string[];
}

export interface WorksheetFieldDef {
  id: string;
  label: string;
  type: 'text' | 'number' | 'currency' | 'textarea' | 'checkbox';
  placeholder?: string;
  helpText?: string;
}

export interface WorksheetSectionDef {
  title: string;
  description?: string;
  fields: WorksheetFieldDef[];
  allowDynamicRows?: boolean;
  calculation?: { type: 'sum' | 'subtract'; fieldIds: string[]; resultLabel: string };
}

export interface WorksheetDef {
  id: string;
  title: string;
  description: string;
  sections: WorksheetSectionDef[];
}

export interface ReflectionQuestion {
  question: string;
  prompt?: string;
}

export interface WeekFullContent {
  week: number;
  title: string;
  subtitle: string;
  keyQuote: string;
  quoteAuthor: string;
  overview: string;
  objectives: string[];
  keyTopics: { title: string; description: string }[];
  activities: { title: string; description: string; type: string }[];
  actionItems: string[];
  toolLink?: string;
  toolLabel?: string;
  lessonSections: LessonSection[];
  story: StorySection;
  storyCentralAsia?: StorySection;
  worksheetDef: WorksheetDef;
  reflectionQuestions: ReflectionQuestion[];
}
