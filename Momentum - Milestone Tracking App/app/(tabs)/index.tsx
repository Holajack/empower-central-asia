import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Moment } from '@/types/moment';
import { MomentStorage } from '@/utils/storage';
import MomentCard from '@/components/MomentCard';
import EmptyState from '@/components/EmptyState';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen() {
  const { platformFont, fontWeight, backgroundColor, textColor } = useTheme();
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMoments = async () => {
    try {
      const savedMoments = await MomentStorage.getMoments();
      setMoments(savedMoments);
    } catch (error) {
      console.error('Error loading moments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMoments();
    setRefreshing(false);
  };

  const handleDeleteMoment = async (id: string) => {
    try {
      await MomentStorage.deleteMoment(id);
      setMoments(prev => prev.filter(moment => moment.id !== id));
    } catch (error) {
      console.error('Error deleting moment:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMoments();
    }, [])
  );

  const renderMoment = ({ item }: { item: Moment }) => (
    <MomentCard moment={item} onDelete={handleDeleteMoment} />
  );

  const containerComponent = Array.isArray(backgroundColor) ? (
    <LinearGradient 
      colors={backgroundColor.length >= 2 ? backgroundColor as [string, string, ...string[]] : ['#F8F9FA', '#E9ECEF']} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { fontFamily: platformFont, fontWeight: fontWeight as any, color: textColor }]}>Momentum</Text>
          <Text style={[styles.headerSubtitle, { fontFamily: platformFont, fontWeight: fontWeight as any, color: textColor }]}>Track what matters most</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { fontFamily: platformFont, fontWeight: fontWeight as any, color: textColor }]}>Loading your moments...</Text>
          </View>
        ) : moments.length === 0 ? (
          <EmptyState
            title="No moments yet"
            subtitle="Tap the + button to create your first moment and start tracking what matters most to you."
          />
        ) : (
          <FlatList
            data={moments}
            renderItem={renderMoment}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor="#0078FF"
              />
            }
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  ) : (
    <View style={[styles.container, { backgroundColor: backgroundColor as string }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { fontFamily: platformFont, fontWeight: fontWeight as any, color: textColor }]}>Momentum</Text>
          <Text style={[styles.headerSubtitle, { fontFamily: platformFont, fontWeight: fontWeight as any, color: textColor }]}>Track what matters most</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { fontFamily: platformFont, fontWeight: fontWeight as any, color: textColor }]}>Loading your moments...</Text>
          </View>
        ) : moments.length === 0 ? (
          <EmptyState
            title="No moments yet"
            subtitle="Tap the + button to create your first moment and start tracking what matters most to you."
          />
        ) : (
          <FlatList
            data={moments}
            renderItem={renderMoment}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor="#0078FF"
              />
            }
          />
        )}
      </SafeAreaView>
    </View>
  );

  return containerComponent;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 100,
  },
});