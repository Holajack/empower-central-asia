import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Lucide from 'lucide-react-native';
import { calculateDaysDifference, formatDaysText } from '@/utils/dateUtils';
import type { Moment } from '@/types/moment';

interface MomentWidgetProps {
  moment?: Moment;
  size?: 'small' | 'medium' | 'large';
}

export default function MomentWidget({ moment, size = 'medium' }: MomentWidgetProps) {
  if (!moment) {
    return (
      <View style={[styles.container, styles[size]]}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Lucide.Calendar size={size === 'small' ? 16 : 24} color="#FFFFFF" />
            </View>
            <Text style={[styles.noDataText, styles[`${size}Text`]]}>
              No moments yet
            </Text>
            <Text style={[styles.subtitleText, styles[`${size}Subtitle`]]}>
              Open Momentum to add
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const days = calculateDaysDifference(moment.date, moment.type);
  const daysText = formatDaysText(days, moment.type);
  const IconComponent = (Lucide as any)[moment.icon] || Lucide.Heart;

  return (
    <View style={[styles.container, styles[size]]}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: moment.color }]}>
            <IconComponent 
              size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} 
              color="#FFFFFF" 
            />
          </View>

          {/* Days number */}
          <Text style={[styles.daysNumber, styles[`${size}Number`], { color: '#FFFFFF' }]}>
            {Math.abs(days)}
          </Text>

          {/* Days text */}
          <Text style={[styles.daysText, styles[`${size}Text`]]}>
            {daysText}
          </Text>

          {/* Title */}
          <Text 
            style={[styles.title, styles[`${size}Title`]]}
            numberOfLines={size === 'small' ? 1 : 2}
          >
            {moment.title}
          </Text>

          {/* App name */}
          <Text style={[styles.appName, styles[`${size}AppName`]]}>
            Momentum
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  small: {
    width: 155,
    height: 155,
  },
  medium: {
    width: 329,
    height: 155,
  },
  large: {
    width: 329,
    height: 345,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  daysNumber: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  smallNumber: {
    fontSize: 28,
  },
  mediumNumber: {
    fontSize: 36,
  },
  largeNumber: {
    fontSize: 48,
  },
  daysText: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 4,
  },
  smallText: {
    fontSize: 11,
  },
  mediumText: {
    fontSize: 13,
  },
  largeText: {
    fontSize: 16,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  smallTitle: {
    fontSize: 12,
  },
  mediumTitle: {
    fontSize: 16,
  },
  largeTitle: {
    fontSize: 20,
  },
  appName: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    textAlign: 'center',
  },
  smallAppName: {
    fontSize: 10,
  },
  mediumAppName: {
    fontSize: 12,
  },
  largeAppName: {
    fontSize: 14,
  },
  noDataText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  smallSubtitle: {
    fontSize: 10,
  },
  mediumSubtitle: {
    fontSize: 12,
  },
  largeSubtitle: {
    fontSize: 14,
  },
});