import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  const { platformFont, fontWeight, textColor } = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Calendar size={64} color="#C7C7CC" />
      </View>
      <Text style={[styles.title, { fontFamily: platformFont, fontWeight: fontWeight as any, color: textColor }]}>{title}</Text>
      <Text style={[styles.subtitle, { fontFamily: platformFont, fontWeight: fontWeight as any, color: textColor }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});