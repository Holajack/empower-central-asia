import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPlatformFont } from '@/utils/fontUtils';

interface ThemeContextType {
  font: string;
  fontWeight: string;
  platformFont: string;
  backgroundColor: string | string[];
  textColor: string;
  isPro: boolean;
  isLoading: boolean;
  setFont: (font: string, weight?: string) => Promise<void>;
  setBackgroundColor: (color: string | string[], textColor: string) => Promise<void>;
  setProStatus: (status: boolean) => Promise<void>;
  loadTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const getContrastColor = (backgroundColor: string | string[]): string => {
  if (Array.isArray(backgroundColor)) {
    const firstColor = backgroundColor[0];
    return getTextColorForBackground(firstColor);
  }
  return getTextColorForBackground(backgroundColor);
};

const getTextColorForBackground = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#1D1D1F' : '#FFFFFF';
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [font, setFontState] = useState('System');
  const [fontWeight, setFontWeightState] = useState('normal');
  const [backgroundColor, setBackgroundColorState] = useState<string | string[]>('#F8F9FA');
  const [textColor, setTextColorState] = useState('#1D1D1F');
  const [isPro, setIsProState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate platform-specific font with fallback
  const platformFont = font ? getPlatformFont(font) : 'System';

  const loadTheme = async () => {
    try {
      const [savedFont, savedFontWeight, savedBg, savedTextColor, proStatus] = await Promise.all([
        AsyncStorage.getItem('userFont'),
        AsyncStorage.getItem('userFontWeight'),
        AsyncStorage.getItem('userBg'),
        AsyncStorage.getItem('userTextColor'),
        AsyncStorage.getItem('isPro')
      ]);

      if (savedFont && typeof savedFont === 'string') {
        setFontState(savedFont);
      }
      if (savedFontWeight && typeof savedFontWeight === 'string') {
        setFontWeightState(savedFontWeight);
      }
      if (savedBg) {
        try {
          const parsedBg = JSON.parse(savedBg);
          // Validate that it's either a string or array of strings
          if (Array.isArray(parsedBg) && parsedBg.length >= 2 && parsedBg.every(color => typeof color === 'string')) {
            setBackgroundColorState(parsedBg);
          } else if (typeof parsedBg === 'string') {
            setBackgroundColorState(parsedBg);
          } else {
            throw new Error('Invalid background color format');
          }
        } catch {
          // If parsing fails, treat as a solid color string
          if (typeof savedBg === 'string' && savedBg.startsWith('#')) {
            setBackgroundColorState(savedBg);
          } else {
            // Fallback to default
            setBackgroundColorState('#F8F9FA');
          }
        }
      }
      if (savedTextColor) {
        setTextColorState(savedTextColor);
      } else if (savedBg) {
        try {
          const parsedBg = JSON.parse(savedBg);
          if (Array.isArray(parsedBg) && parsedBg.length >= 2) {
            const autoTextColor = getContrastColor(parsedBg);
            setTextColorState(autoTextColor);
          } else if (typeof parsedBg === 'string') {
            const autoTextColor = getContrastColor(parsedBg);
            setTextColorState(autoTextColor);
          }
        } catch {
          if (typeof savedBg === 'string' && savedBg.startsWith('#')) {
            const autoTextColor = getContrastColor(savedBg);
            setTextColorState(autoTextColor);
          }
        }
      }
      setIsProState(proStatus === 'true');
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setFont = async (newFont: string, weight: string = 'normal') => {
    if (!isPro) {
      throw new Error('Premium feature: Font customization requires Momentum+');
    }
    setFontState(newFont);
    setFontWeightState(weight);
    await AsyncStorage.setItem('userFont', newFont);
    await AsyncStorage.setItem('userFontWeight', weight);
    
    // Update widgets with new font
    const WidgetService = require('@/services/WidgetService').WidgetService;
    if (WidgetService && typeof WidgetService.updateWidgetData === 'function') {
      try {
        await WidgetService.updateWidgetData();
      } catch (error) {
        console.warn('Failed to update widgets after font change:', error);
      }
    }
  };

  const setBackgroundColor = async (color: string | string[], newTextColor: string) => {
    if (!isPro) {
      throw new Error('Premium feature: Background customization requires Momentum+');
    }
    setBackgroundColorState(color);
    setTextColorState(newTextColor);
    await AsyncStorage.setItem('userBg', JSON.stringify(color));
    await AsyncStorage.setItem('userTextColor', newTextColor);
    
    // Update widgets with new background/text colors
    const WidgetService = require('@/services/WidgetService').WidgetService;
    if (WidgetService && typeof WidgetService.updateWidgetData === 'function') {
      try {
        await WidgetService.updateWidgetData();
      } catch (error) {
        console.warn('Failed to update widgets after color change:', error);
      }
    }
  };

  const setProStatus = async (status: boolean) => {
    setIsProState(status);
    await AsyncStorage.setItem('isPro', status.toString());
    if (!status) {
      // Reset to defaults when downgrading from Pro
      setFontState('System');
      setFontWeightState('normal');
      setBackgroundColorState('#F8F9FA');
      setTextColorState('#1D1D1F');
      await AsyncStorage.multiRemove(['userFont', 'userFontWeight', 'userBg', 'userTextColor']);
    } else {
      // When upgrading to Pro, ensure we have valid defaults if no customization exists
      try {
        const savedBg = await AsyncStorage.getItem('userBg');
        if (!savedBg) {
          // Set a nice default gradient for new Pro users
          const defaultGradient = ['#667eea', '#764ba2'];
          setBackgroundColorState(defaultGradient);
          setTextColorState('#FFFFFF');
          await AsyncStorage.setItem('userBg', JSON.stringify(defaultGradient));
          await AsyncStorage.setItem('userTextColor', '#FFFFFF');
        }
      } catch (error) {
        console.error('Error setting Pro defaults:', error);
      }
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const value: ThemeContextType = {
    font: font || 'System',
    fontWeight: fontWeight || 'normal',
    platformFont: platformFont || 'System',
    backgroundColor: backgroundColor || '#F8F9FA',
    textColor: textColor || '#1D1D1F',
    isPro: isPro || false,
    isLoading,
    setFont,
    setBackgroundColor,
    setProStatus,
    loadTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};