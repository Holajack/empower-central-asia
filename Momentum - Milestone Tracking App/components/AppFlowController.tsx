import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import SplashScreen from './SplashScreen';
import OnboardingScreen from './OnboardingScreen';

interface AppFlowControllerProps {
  children: React.ReactNode;
}

type AppState = 'splash' | 'onboarding' | 'main';

const ONBOARDING_COMPLETED_KEY = '@onboarding_completed';

export default function AppFlowController({ children }: AppFlowControllerProps) {
  const [appState, setAppState] = useState<AppState>('splash');
  const router = useRouter();

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    // We'll check onboarding status in handleSplashFinish instead
    // This ensures the splash screen always shows first
  };

  const handleSplashFinish = () => {
    AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY)
      .then(hasCompletedOnboarding => {
        if (hasCompletedOnboarding === 'true') {
          setAppState('main');
        } else {
          setAppState('onboarding');
        }
      })
      .catch(error => {
        console.error('Error checking onboarding:', error);
        setAppState('onboarding'); // Default to onboarding on error
      });
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      setAppState('main');
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
      setAppState('main'); // Continue anyway
    }
  };

  if (appState === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (appState === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (appState === 'main') {
    // Return the children (Stack with tabs) instead of navigating
    return <>{children}</>;
  }

  // Fallback
  return null;
}