import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Calendar, 
  Target, 
  Palette, 
  Clock, 
  Trophy, 
  ArrowRight,
  Heart,
  Star
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: 'Track Life\'s Milestones',
    subtitle: 'Count down to exciting events or track days since important moments',
    icon: Calendar,
    color: '#FF6B6B',
    gradient: ['#FF6B6B', '#FF8E53'],
    description: 'Whether it\'s your wedding day, sobriety milestone, or dream vacation - never lose sight of what matters most to you.',
  },
  {
    id: 2,
    title: 'Beautiful & Personal',
    subtitle: 'Customize with gorgeous themes and fonts that match your style',
    icon: Palette,
    color: '#A18CD1',
    gradient: ['#A18CD1', '#FBC2EB'],
    description: 'Choose from stunning gradient backgrounds and premium fonts to make your moments truly yours.',
  },
  {
    id: 3,
    title: 'Stay Motivated',
    subtitle: 'Celebrate milestones and track your progress with pride',
    icon: Trophy,
    color: '#00D4AA',
    gradient: ['#11998E', '#38EF7D'],
    description: 'Get motivated by seeing your progress and celebrating important milestones along the way.',
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { platformFont } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        scrollViewRef.current?.scrollTo({ x: (currentStep + 1) * width, animated: true });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <LinearGradient
      colors={currentStepData.gradient as [string, string, ...string[]]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={[styles.skipText, { fontFamily: platformFont }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        {/* Content */}
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={[styles.iconWrapper, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <currentStepData.icon size={64} color="#FFFFFF" strokeWidth={1.5} />
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textContent}>
            <Text style={[styles.title, { fontFamily: platformFont }]}>{currentStepData.title}</Text>
            <Text style={[styles.subtitle, { fontFamily: platformFont }]}>{currentStepData.subtitle}</Text>
            <Text style={[styles.description, { fontFamily: platformFont }]}>{currentStepData.description}</Text>
          </View>

          {/* Feature Preview */}
          <View style={styles.previewContainer}>
            {currentStep === 0 && <CountdownPreview platformFont={platformFont} />}
            {currentStep === 1 && <CustomizationPreview platformFont={platformFont} />}
            {currentStep === 2 && <MilestonePreview platformFont={platformFont} />}
          </View>
        </Animated.View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={[styles.nextButtonText, { fontFamily: platformFont }]}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ArrowRight size={20} color="#FFFFFF" style={styles.nextIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// Preview Components
const CountdownPreview = ({ platformFont }: { platformFont: string }) => (
  <View style={styles.previewCard}>
    <View style={styles.miniIcon}>
      <Heart size={16} color="#FF6B6B" />
    </View>
    <Text style={[styles.previewNumber, { fontFamily: platformFont }]}>127</Text>
    <Text style={[styles.previewLabel, { fontFamily: platformFont }]}>days until</Text>
    <Text style={[styles.previewTitle, { fontFamily: platformFont }]}>Wedding Day</Text>
  </View>
);

const CustomizationPreview = ({ platformFont }: { platformFont: string }) => (
  <View style={styles.customizationPreview}>
    <View style={styles.colorRow}>
      {['#FF6B6B', '#A18CD1', '#00D4AA', '#0078FF'].map((color, index) => (
        <View key={index} style={[styles.colorSample, { backgroundColor: color }]} />
      ))}
    </View>
    <Text style={[styles.previewCustomText, { fontFamily: platformFont }]}>Your Style, Your Way</Text>
  </View>
);

const MilestonePreview = ({ platformFont }: { platformFont: string }) => (
  <View style={styles.milestonePreview}>
    <View style={styles.trophyContainer}>
      <Trophy size={32} color="#FFD700" />
    </View>
    <Text style={[styles.milestoneText, { fontFamily: platformFont }]}>🎉 Milestone Reached!</Text>
    <Text style={[styles.milestoneSubtext, { fontFamily: platformFont }]}>100 days sober</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginVertical: 40,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80, // Add padding to prevent overlap with button
  },
  previewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minWidth: 180,
    maxWidth: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  miniIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  previewLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 2,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  customizationPreview: {
    alignItems: 'center',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  colorSample: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  previewCustomText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  milestonePreview: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
  },
  trophyContainer: {
    marginBottom: 16,
  },
  milestoneText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  milestoneSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  nextIcon: {
    marginLeft: 4,
  },
});