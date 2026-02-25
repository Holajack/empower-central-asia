import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Moment } from '@/types/moment';

// Safe imports with error handling
let MomentStorage: any = null;
let calculateDaysDifference: any = null;

try {
  const storageModule = require('@/utils/storage');
  MomentStorage = storageModule.MomentStorage;
} catch (error) {
  console.warn('Failed to load MomentStorage:', error);
}

try {
  const dateUtilsModule = require('@/utils/dateUtils');
  calculateDaysDifference = dateUtilsModule.calculateDaysDifference;
} catch (error) {
  console.warn('Failed to load calculateDaysDifference:', error);
}

export interface WidgetData {
  moments: Array<{
    id: string;
    title: string;
    days: number;
    daysText: string;
    type: 'countdown' | 'daysSince';
    color: string;
    icon: string;
  }>;
  theme: {
    font: string;
    backgroundColor: string | string[];
    textColor: string;
  };
  lastUpdated: number;
}

export class WidgetService {
  private static readonly WIDGET_DATA_KEY = '@widget_data';
  private static readonly UPDATE_INTERVAL = 1000 * 60 * 60; // 1 hour
  private static isInitialized = false;

  /**
   * Update widget data with current moments
   */
  static async updateWidgetData(): Promise<void> {
    try {
      // Check if dependencies are available
      if (!MomentStorage || typeof MomentStorage.getMoments !== 'function') {
        console.warn('MomentStorage not available, skipping widget update');
        return;
      }
      
      if (!calculateDaysDifference) {
        console.warn('calculateDaysDifference not available, skipping widget update');
        return;
      }
      
      // Load theme data from AsyncStorage
      const [moments, savedFont, savedBg, savedTextColor] = await Promise.all([
        MomentStorage.getMoments(),
        AsyncStorage.getItem('userFont'),
        AsyncStorage.getItem('userBg'),
        AsyncStorage.getItem('userTextColor')
      ]);

      const widgetMoments = moments.slice(0, 3).map((moment: Moment) => {
        const days = calculateDaysDifference(moment.date, moment.type);
        const daysText = this.formatDaysForWidget(days, moment.type);
        
        return {
          id: moment.id,
          title: moment.title,
          days: Math.abs(days),
          daysText,
          type: moment.type,
          color: moment.color,
          icon: moment.icon,
        };
      });

      // Parse background color
      let backgroundColor: string | string[] = '#F8F9FA';
      try {
        if (savedBg) {
          const parsed = JSON.parse(savedBg);
          backgroundColor = parsed;
        }
      } catch {
        backgroundColor = savedBg || '#F8F9FA';
      }

      const widgetData: WidgetData = {
        moments: widgetMoments,
        theme: {
          font: savedFont || 'SF Pro',
          backgroundColor,
          textColor: savedTextColor || '#1D1D1F',
        },
        lastUpdated: Date.now(),
      };

      await AsyncStorage.setItem(this.WIDGET_DATA_KEY, JSON.stringify(widgetData));
      
      // Update the actual widgets on the device
      if (typeof window !== 'undefined' && (window as any).ExpoWidgets) {
        (window as any).ExpoWidgets.reloadAll();
      }
    } catch (error) {
      console.error('Failed to update widget data:', error);
    }
  }

  /**
   * Get current widget data
   */
  static async getWidgetData(): Promise<WidgetData | null> {
    try {
      const data = await AsyncStorage.getItem(this.WIDGET_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get widget data:', error);
      return null;
    }
  }

  /**
   * Check if widget data needs updating
   */
  static async shouldUpdateWidgetData(): Promise<boolean> {
    try {
      const data = await this.getWidgetData();
      if (!data) return true;
      
      const timeSinceUpdate = Date.now() - data.lastUpdated;
      return timeSinceUpdate > this.UPDATE_INTERVAL;
    } catch (error) {
      return true;
    }
  }

  /**
   * Schedule automatic widget updates
   */
  static startAutoUpdates(): void {
    if (this.isInitialized) {
      return; // Already started
    }
    
    this.isInitialized = true;
    
    // Update immediately (with delay to ensure modules are loaded)
    setTimeout(() => {
      this.updateWidgetData().catch(error => {
        console.warn('Initial widget update failed:', error);
      });
    }, 2000);

    // Set up periodic updates
    setInterval(async () => {
      try {
        if (await this.shouldUpdateWidgetData()) {
          await this.updateWidgetData();
        }
      } catch (error) {
        console.warn('Periodic widget update failed:', error);
      }
    }, this.UPDATE_INTERVAL);
  }

  /**
   * Format days text for widget display
   */
  private static formatDaysForWidget(days: number, type: 'countdown' | 'daysSince'): string {
    const absDays = Math.abs(days);
    
    if (type === 'countdown') {
      if (days === 0) return 'Today!';
      if (days < 0) return 'Past';
      if (absDays === 1) return '1 day left';
      return `${absDays} days left`;
    } else {
      if (absDays === 0) return 'Today';
      if (absDays === 1) return '1 day ago';
      return `${absDays} days ago`;
    }
  }

  /**
   * Get widget configuration for native widget
   */
  static getWidgetConfig() {
    return {
      widgetName: 'MomentumWidget',
      widgetDisplayName: 'Momentum Tracker',
      widgetDescription: 'Track your important milestones',
      supportedSizes: ['small', 'medium', 'large'],
      updateInterval: 3600, // 1 hour in seconds
    };
  }
}

// Auto-start widget updates when the service is imported (only in React Native environment)
if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
  // Delay startup to ensure all modules are loaded
  setTimeout(() => {
    try {
      WidgetService.startAutoUpdates();
    } catch (error) {
      console.warn('Failed to start widget auto-updates:', error);
    }
  }, 1000);
}