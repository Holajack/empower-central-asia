export interface Moment {
  id: string;
  title: string;
  date: Date;
  type: 'countdown' | 'daysSince';
  icon: string;
  color: string;
  createdAt: Date;
}

export const MOMENT_COLORS = [
  '#4A5568', // Slate
  '#718096', // Gray
  '#A0AEC0', // Light Gray
  '#2C5282', // Muted Blue
  '#6B46C1', // Muted Purple
  '#319795', // Teal
  '#38B2AC', // Soft Mint
  '#ECC94B', // Gold
  '#ED8936', // Soft Orange
  '#E53E3E', // Soft Red
];

export const MOMENT_ICONS = [
  'heart',
  'calendar',
  'target',
  'trophy',
  'star',
  'rocket',
  'coffee',
  'book',
  'dumbbell',
  'graduation-cap',
  'home',
  'briefcase',
  'plane',
  'camera',
  'music',
];