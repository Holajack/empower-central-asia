import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trash2 } from 'lucide-react-native';
import * as Lucide from 'lucide-react-native';
import { Moment } from '@/types/moment';
import { calculateDaysDifference, formatDaysText, isMilestone } from '@/utils/dateUtils';
import { useTheme } from '@/contexts/ThemeContext';
import MilestoneCelebration from './MilestoneCelebration';

interface MomentCardProps {
  moment: Moment;
  onDelete: (id: string) => void;
}

export default function MomentCard({ moment, onDelete }: MomentCardProps) {
  const { platformFont, fontWeight } = useTheme();
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastCheckedDays, setLastCheckedDays] = useState<number | null>(null);
  
  const days = calculateDaysDifference(moment.date, moment.type);
  const daysText = formatDaysText(days, moment.type);
  const isSpecial = isMilestone(Math.abs(days));

  const IconComponent = (Lucide as any)[moment.icon] || Lucide.Heart;

  // Check for milestone achievement
  useEffect(() => {
    const currentDays = Math.abs(days);
    if (lastCheckedDays !== null && lastCheckedDays !== currentDays) {
      if (isMilestone(currentDays) && currentDays !== lastCheckedDays) {
        setShowCelebration(true);
      }
    }
    setLastCheckedDays(currentDays);
  }, [days, lastCheckedDays]);

  // Show celebration for special milestones on first render
  useEffect(() => {
    const currentDays = Math.abs(days);
    // Show celebration for major milestones
    if (isMilestone(currentDays) && (
      currentDays === 1 || currentDays === 7 || currentDays === 30 || 
      currentDays === 100 || currentDays === 365 || 
      currentDays % 100 === 0 || currentDays % 365 === 0
    )) {
      // Add a small delay to show celebration after component mounts
      setTimeout(() => {
        if (Math.random() < 0.3) { // 30% chance to show celebration for demo
          setShowCelebration(true);
        }
      }, 1000);
    }
  }, []);

  const handleCardPress = () => {
    if (isSpecial) {
      setShowCelebration(true);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Moment',
      `Are you sure you want to delete "${moment.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(moment.id) },
      ]
    );
  };

  return (
    <>
      <TouchableOpacity 
        style={[styles.container, isSpecial && styles.milestoneContainer]}
        onPress={handleCardPress}
        activeOpacity={isSpecial ? 0.8 : 1}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={[styles.iconContainer, { backgroundColor: moment.color }]}>
                <IconComponent size={24} color="#FFFFFF" />
              </View>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Trash2 size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.body}>
              <Text style={[styles.daysNumber, { color: moment.color, fontFamily: platformFont, fontWeight: fontWeight as any }]}>{Math.abs(days)}</Text>
              <Text style={[styles.daysText, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>{daysText}</Text>
              <Text style={[styles.title, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>{moment.title}</Text>
            </View>
            
            {isSpecial && (
              <TouchableOpacity 
                style={styles.milestoneIndicator}
                onPress={() => setShowCelebration(true)}
              >
                <Text style={[styles.milestoneText, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>🎉 Tap to Celebrate!</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <MilestoneCelebration
        visible={showCelebration}
        milestone={days}
        title={moment.title}
        type={moment.type}
        onClose={() => setShowCelebration(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  milestoneContainer: {
    shadowColor: '#FFD700',
    shadowOpacity: 0.3,
  },
  gradient: {
    padding: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
  },
  body: {
    alignItems: 'center',
  },
  daysNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    letterSpacing: -2,
  },
  daysText: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1D1D1F',
    textAlign: 'center',
  },
  milestoneIndicator: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 12,
    alignSelf: 'center',
  },
  milestoneText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF8C00',
  },
});
