import { Platform } from 'react-native';

export interface FontConfig {
  label: string;
  value: string;
  description: string;
  weight: string;
  ios: string;
  android: string;
}

/**
 * Get the appropriate font family for the current platform
 */
export const getPlatformFont = (fontValue?: string, fontConfig?: FontConfig): string => {
  // Ensure we have a valid fontValue
  if (!fontValue || typeof fontValue !== 'string') {
    return 'System';
  }
  
  // Handle new unique font values
  if (fontValue.startsWith('system-')) {
    return 'System';
  }
  if (fontValue.startsWith('serif-')) {
    return Platform.OS === 'ios' ? 'Times New Roman' : 'serif';
  }
  if (fontValue.startsWith('sans-serif-')) {
    return Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif';
  }
  if (fontValue.startsWith('monospace-')) {
    return Platform.OS === 'ios' ? 'Courier' : 'monospace';
  }
  if (fontValue.startsWith('cursive-')) {
    return Platform.OS === 'ios' ? 'Apple Chancery' : 'cursive';
  }
  if (fontValue.startsWith('fantasy-')) {
    return Platform.OS === 'ios' ? 'Papyrus' : 'fantasy';
  }
  
  // Handle legacy values for backward compatibility
  switch (fontValue) {
    case 'System':
      return 'System';
    case 'serif':
      return Platform.OS === 'ios' ? 'Times New Roman' : 'serif';
    case 'sans-serif':
      return Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif';
    case 'monospace':
      return Platform.OS === 'ios' ? 'Courier' : 'monospace';
    case 'cursive':
      return Platform.OS === 'ios' ? 'Apple Chancery' : 'cursive';
    case 'fantasy':
      return Platform.OS === 'ios' ? 'Papyrus' : 'fantasy';
    case 'sans-serif-condensed':
      return Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed';
    default:
      // Fallback to system font
      return 'System';
  }
};

/**
 * Get font style object with platform-appropriate font and weight
 */
export const getFontStyle = (fontFamily: string, fontWeight: string = 'normal') => {
  const platformFont = getPlatformFont(fontFamily);
  
  return {
    fontFamily: platformFont,
    fontWeight: fontWeight as any,
  };
};

/**
 * Get numeric font weight for React Native
 */
export const getNumericFontWeight = (weight: string): string => {
  switch (weight) {
    case 'ultralight':
    case '100':
      return '100';
    case 'thin':
    case '200':
      return '200';
    case 'light':
    case '300':
      return '300';
    case 'normal':
    case 'regular':
    case '400':
      return '400';
    case 'medium':
    case '500':
      return '500';
    case 'semibold':
    case '600':
      return '600';
    case 'bold':
    case '700':
      return '700';
    case 'heavy':
    case '800':
      return '800';
    case 'black':
    case '900':
      return '900';
    default:
      return '400';
  }
};

/**
 * Predefined font configurations that work across platforms
 */
export const SYSTEM_FONTS: FontConfig[] = [
  { label: 'System Default', value: 'system-normal', description: 'Native System Font', weight: 'normal', ios: 'SF Pro', android: 'Roboto' },
  { label: 'Ultra Bold', value: 'system-ultra-bold', description: 'HEAVY WEIGHT', weight: '900', ios: 'SF Pro', android: 'Roboto' },
  { label: 'Ultra Light', value: 'system-ultra-light', description: 'Thin & Minimal', weight: '100', ios: 'SF Pro', android: 'Roboto' },
  { label: 'Serif Classic', value: 'serif-normal', description: 'Traditional Reading', weight: 'normal', ios: 'Times New Roman', android: 'serif' },
  { label: 'Serif Bold', value: 'serif-bold', description: 'Bold Traditional', weight: 'bold', ios: 'Times New Roman', android: 'serif' },
  { label: 'Mono Code', value: 'monospace-normal', description: 'C-O-D-E  S-T-Y-L-E', weight: 'normal', ios: 'Courier', android: 'monospace' },
  { label: 'Mono Bold', value: 'monospace-bold', description: 'BOLD CODE STYLE', weight: 'bold', ios: 'Courier', android: 'monospace' },
  { label: 'Sans Light', value: 'sans-serif-light', description: 'Clean & Light', weight: '300', ios: 'Helvetica', android: 'sans-serif' },
  { label: 'Sans Medium', value: 'sans-serif-medium', description: 'Balanced Weight', weight: '500', ios: 'Helvetica', android: 'sans-serif' },
  { label: 'Sans Bold', value: 'sans-serif-bold', description: 'Strong & Bold', weight: 'bold', ios: 'Helvetica', android: 'sans-serif' },
  { label: 'Sans Heavy', value: 'sans-serif-heavy', description: 'MAXIMUM IMPACT', weight: '800', ios: 'Helvetica', android: 'sans-serif' },
  { label: 'Cursive Style', value: 'cursive-normal', description: '✍️ Handwritten', weight: 'normal', ios: 'Apple Chancery', android: 'cursive' },
  { label: 'Fantasy Bold', value: 'fantasy-bold', description: '🎨 Decorative', weight: 'bold', ios: 'Papyrus', android: 'fantasy' },
  { label: 'Rounded Normal', value: 'system-rounded-normal', description: 'Friendly Rounded', weight: '400', ios: 'SF Rounded', android: 'Roboto' },
  { label: 'Rounded Bold', value: 'system-rounded-bold', description: 'Bold Rounded', weight: '700', ios: 'SF Rounded', android: 'Roboto' },
  { label: 'Condensed', value: 'sans-serif-condensed', description: 'Narrow & Tall', weight: 'normal', ios: 'Helvetica Neue', android: 'sans-serif-condensed' },
];