import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Sparkles, Star, Heart } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

interface MilestoneCelebrationProps {
  visible: boolean;
  milestone: number;
  title: string;
  type: 'countdown' | 'daysSince';
  onClose: () => void;
}

export default function MilestoneCelebration({
  visible,
  milestone,
  title,
  type,
  onClose,
}: MilestoneCelebrationProps) {
  const { platformFont } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    if (visible) {
      // Main celebration animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      // Sparkle animations with stagger
      sparkleAnims.forEach((anim, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 200),
            Animated.timing(anim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    } else {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      sparkleAnims.forEach(anim => anim.setValue(0));
    }
  }, [visible]);

  const getMilestoneMessage = () => {
    if (type === 'countdown') {
      if (milestone === 0) return `🎉 Today is the day!`;
      if (milestone <= 7) return `🔥 Less than a week to go!`;
      if (milestone <= 30) return `⚡ One month milestone!`;
      if (milestone <= 100) return `🎯 100 day milestone!`;
      return `🌟 Major milestone reached!`;
    } else {
      if (milestone === 1) return `🎊 First day milestone!`;
      if (milestone === 7) return `🌟 One week strong!`;
      if (milestone === 30) return `🔥 30 days achieved!`;
      if (milestone === 100) return `💪 100 days milestone!`;
      if (milestone === 365) return `🏆 One year anniversary!`;
      if (milestone % 365 === 0) return `🏆 ${milestone / 365} year milestone!`;
      if (milestone % 100 === 0) return `🎯 ${milestone} days milestone!`;
      return `⭐ ${milestone} days and counting!`;
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none">
      <BlurView intensity={50} style={styles.backdrop}>
        <View style={styles.container}>
          {/* Animated sparkles */}
          {sparkleAnims.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.sparkle,
                {
                  opacity: anim,
                  transform: [
                    {
                      scale: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1.5],
                      }),
                    },
                  ],
                  left: `${20 + index * 15}%`,
                  top: `${15 + (index % 2) * 10}%`,
                },
              ]}
            >
              <Sparkles size={24} color="#FFD700" />
            </Animated.View>
          ))}

          {/* Main celebration card */}
          <Animated.View
            style={[
              styles.celebrationCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53', '#FFD700']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Trophy icon */}
              <View style={styles.trophyContainer}>
                <Trophy size={64} color="#FFFFFF" strokeWidth={2} />
                <View style={styles.heartOverlay}>
                  <Heart size={24} color="#FF6B6B" fill="#FF6B6B" />
                </View>
              </View>

              {/* Milestone text */}
              <Text style={[styles.milestoneTitle, { fontFamily: platformFont }]}>Milestone Reached!</Text>
              <Text style={[styles.milestoneMessage, { fontFamily: platformFont }]}>{getMilestoneMessage()}</Text>
              
              {/* Main milestone number */}
              <View style={styles.milestoneNumberContainer}>
                <Text style={[styles.milestoneNumber, { fontFamily: platformFont }]}>{Math.abs(milestone)}</Text>
                <Text style={[styles.milestoneUnit, { fontFamily: platformFont }]}>
                  {type === 'countdown' ? 'days left' : 'days strong'}
                </Text>
              </View>

              {/* Event title */}
              <Text style={[styles.eventTitle, { fontFamily: platformFont }]}>{title}</Text>

              {/* Action buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.shareButton}>
                  <Star size={20} color="#FFFFFF" />
                  <Text style={[styles.shareButtonText, { fontFamily: platformFont }]}>Share</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.continueButton} onPress={onClose}>
                  <Text style={[styles.continueButtonText, { fontFamily: platformFont }]}>Continue</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Background decorative elements */}
          <View style={[styles.decorativeCircle, styles.circle1]} />
          <View style={[styles.decorativeCircle, styles.circle2]} />
          <View style={[styles.decorativeCircle, styles.circle3]} />
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sparkle: {
    position: 'absolute',
  },
  celebrationCard: {
    width: width * 0.9,
    maxWidth: 350,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 25,
  },
  cardGradient: {
    padding: 32,
    alignItems: 'center',
  },
  trophyContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  heartOverlay: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  milestoneTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  milestoneMessage: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  milestoneNumberContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  milestoneNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  milestoneUnit: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  continueButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 100,
  },
  circle1: {
    width: 200,
    height: 200,
    top: '10%',
    left: '-10%',
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: '15%',
    right: '-5%',
  },
  circle3: {
    width: 100,
    height: 100,
    top: '20%',
    right: '10%',
  },
});