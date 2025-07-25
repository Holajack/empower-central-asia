import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moment } from '@/types/moment';

const MOMENTS_STORAGE_KEY = '@moments';
const PRO_STATUS_KEY = '@pro_status';

export const MomentStorage = {
  async getMoments(): Promise<Moment[]> {
    try {
      const data = await AsyncStorage.getItem(MOMENTS_STORAGE_KEY);
      if (data) {
        const moments = JSON.parse(data);
        return moments.map((moment: any) => ({
          ...moment,
          date: new Date(moment.date),
          createdAt: new Date(moment.createdAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading moments:', error);
      return [];
    }
  },

  async saveMoments(moments: Moment[]): Promise<void> {
    try {
      await AsyncStorage.setItem(MOMENTS_STORAGE_KEY, JSON.stringify(moments));
      // Update widgets whenever moments change (use require to avoid circular dependency)
      try {
        const WidgetService = require('@/services/WidgetService').WidgetService;
        if (WidgetService && typeof WidgetService.updateWidgetData === 'function') {
          await WidgetService.updateWidgetData();
        }
      } catch (widgetError) {
        console.warn('Failed to update widget data:', widgetError);
      }
    } catch (error) {
      console.error('Error saving moments:', error);
    }
  },

  async addMoment(moment: Moment): Promise<void> {
    const moments = await this.getMoments();
    moments.push(moment);
    await this.saveMoments(moments);
  },

  async deleteMoment(id: string): Promise<void> {
    const moments = await this.getMoments();
    const filteredMoments = moments.filter(moment => moment.id !== id);
    await this.saveMoments(filteredMoments);
  },

  async getProStatus(): Promise<boolean> {
    try {
      const status = await AsyncStorage.getItem(PRO_STATUS_KEY);
      return status === 'true';
    } catch (error) {
      return false;
    }
  },

  async setProStatus(isPro: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(PRO_STATUS_KEY, isPro.toString());
    } catch (error) {
      console.error('Error saving pro status:', error);
    }
  },
};