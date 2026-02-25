import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Crown, Star, Smartphone, Info, ExternalLink, Palette, Type } from 'lucide-react-native';
import { MomentStorage } from '@/utils/storage';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SYSTEM_FONTS, getPlatformFont } from '@/utils/fontUtils';

const FONTS = SYSTEM_FONTS;

const GRADIENTS = [
  { 
    label: 'Classic Light', 
    value: ['#F8F9FA', '#E9ECEF'], 
    textColor: '#1D1D1F' 
  },
  { 
    label: 'Ocean Blue', 
    value: ['#0078FF', '#005CE6'], 
    textColor: '#FFFFFF' 
  },
  { 
    label: 'Sunset', 
    value: ['#FF6B6B', '#FF8E53'], 
    textColor: '#FFFFFF' 
  },
  { 
    label: 'Purple Dream', 
    value: ['#A18CD1', '#FBC2EB'], 
    textColor: '#1D1D1F' 
  },
  { 
    label: 'Forest Green', 
    value: ['#11998E', '#38EF7D'], 
    textColor: '#FFFFFF' 
  },
  { 
    label: 'Rose Gold', 
    value: ['#F093FB', '#F5576C'], 
    textColor: '#FFFFFF' 
  },
  { 
    label: 'Midnight', 
    value: ['#232526', '#414345'], 
    textColor: '#FFFFFF' 
  },
  { 
    label: 'Arctic', 
    value: ['#E0EAFC', '#CFDEF3'], 
    textColor: '#1D1D1F' 
  },
  { 
    label: 'Lavender', 
    value: ['#FFECD2', '#FCB69F'], 
    textColor: '#1D1D1F' 
  },
  { 
    label: 'Cosmic', 
    value: ['#667eea', '#764ba2'], 
    textColor: '#FFFFFF' 
  },
];

export default function SettingsScreen() {
  const { font, platformFont, fontWeight, backgroundColor, textColor, isPro, setFont, setBackgroundColor, setProStatus } = useTheme();
  const [momentCount, setMomentCount] = useState(0);
  const [fontModalVisible, setFontModalVisible] = useState(false);
  const [bgModalVisible, setBgModalVisible] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const moments = await MomentStorage.getMoments();
    setMomentCount(moments.length);
  };

  const handleUpgradeToPro = () => {
    Alert.alert(
      'Momentum+',
      'Upgrade to unlock:\n\n• Unlimited moments\n• Advanced customization\n• Custom fonts & backgrounds\n• Beautiful gradient themes\n• Multiple moments per widget\n• iCloud sync\n\nNote: This is a demo app. In production, this would integrate with app store billing.',
      [
        { text: 'Maybe Later', style: 'cancel' },
        { 
          text: 'Upgrade Now', 
          onPress: async () => {
            await MomentStorage.setProStatus(true);
            await setProStatus(true);
            Alert.alert('Welcome to Momentum+!', 'You now have access to all premium features including custom fonts and beautiful gradient backgrounds.');
          }
        },
      ]
    );
  };

  const handleAddToHomeScreen = () => {
    Alert.alert(
      'Add Widget to Home Screen',
      'To add your Momentum widget:\n\n1. Long press on your home screen\n2. Tap the + button\n3. Search for "Momentum"\n4. Select your widget size\n5. Tap "Add Widget"\n\nNote: Widgets require native development and are not available in this demo version.',
      [{ text: 'Got it!' }]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Momentum',
      'Version 1.0.0\n\nA beautiful and minimalist tool for tracking life\'s most important milestones.\n\nPhilosophy: Progress, personalized.\n\nBuilt with React Native & Expo',
      [
        { text: 'Close' },
        { 
          text: 'Reset Onboarding', 
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('@onboarding_completed');
            Alert.alert('Reset Complete', 'Restart the app to see onboarding again.');
          }
        }
      ]
    );
  };

  const handleFontSelect = async (fontName: string, weight: string) => {
    if (!isPro) {
      Alert.alert('Premium Feature', 'Font customization is available with Momentum+. Upgrade to unlock this feature!');
      return;
    }
    try {
      await setFont(fontName, weight);
      setFontModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save font selection.');
    }
  };

  const handleBgSelect = async (gradient: string[], newTextColor: string) => {
    if (!isPro) {
      Alert.alert('Premium Feature', 'Background customization is available with Momentum+. Upgrade to unlock this feature!');
      return;
    }
    try {
      await setBackgroundColor(gradient, newTextColor);
      setBgModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save background selection.');
    }
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement,
    isPremium = false 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    rightElement?: React.ReactNode;
    isPremium?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <View style={styles.settingTitleRow}>
          <Text style={[styles.settingTitle, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>{title}</Text>
          {isPremium && !isPro && (
            <Crown size={16} color="#FFD700" />
          )}
        </View>
        {subtitle && <Text style={[styles.settingSubtitle, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>{subtitle}</Text>}
      </View>
      {rightElement && <View style={styles.settingRight}>{rightElement}</View>}
    </TouchableOpacity>
  );

  return Array.isArray(backgroundColor) ? (
    <LinearGradient 
      colors={backgroundColor.length >= 2 ? backgroundColor as [string, string, ...string[]] : ['#F8F9FA', '#E9ECEF']} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { fontFamily: platformFont, color: textColor }]}>Settings</Text>
            <Text style={[styles.headerSubtitle, { fontFamily: platformFont, color: textColor }]}>Customize your experience</Text>
          </View>

          {/* Pro Status Card */}
          <View style={styles.proCard}>
            <LinearGradient
              colors={isPro ? ['#0078FF', '#005CE6'] : ['#FFFFFF', '#F8F9FA']}
              style={styles.proGradient}
            >
              <View style={styles.proContent}>
                <Crown size={32} color={isPro ? '#FFFFFF' : '#FFD700'} />
                <Text style={[styles.proTitle, { fontFamily: platformFont, color: isPro ? '#FFFFFF' : '#1D1D1F' }]}>
                  {isPro ? 'Momentum+' : 'Free Version'}
                </Text>
                <Text style={[styles.proSubtitle, { fontFamily: platformFont, color: isPro ? 'rgba(255,255,255,0.8)' : '#8E8E93' }]}>
                  {isPro 
                    ? `Unlimited moments • Premium features`
                    : `${momentCount}/2 moments used`
                  }
                </Text>
                {!isPro && (
                  <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradeToPro}>
                    <Text style={[styles.upgradeButtonText, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>Upgrade to Pro</Text>
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>
          </View>

          {/* Settings Sections */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: platformFont, color: textColor }]}>Widget</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Smartphone size={24} color="#0078FF" />}
                title="Add to Home Screen"
                subtitle="Learn how to add your widget"
                onPress={handleAddToHomeScreen}
                rightElement={<ExternalLink size={20} color="#C7C7CC" />}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: platformFont, color: textColor }]}>Premium Features</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Star size={24} color="#FFD700" />}
                title="Advanced Customization"
                subtitle="Custom fonts, backgrounds & more"
                onPress={handleUpgradeToPro}
                isPremium={true}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: platformFont, color: textColor }]}>Appearance</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Type size={24} color="#0078FF" />}
                title="Font"
                subtitle={isPro ? font : 'Upgrade to customize'}
                onPress={() => setFontModalVisible(true)}
                isPremium={true}
              />
              <SettingItem
                icon={<Palette size={24} color="#0078FF" />}
                title="Background"
                subtitle={isPro ? 'Custom gradient' : 'Upgrade to customize'}
                onPress={() => setBgModalVisible(true)}
                isPremium={true}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: platformFont, color: textColor }]}>About</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Info size={24} color="#8E8E93" />}
                title="About Momentum"
                subtitle="Version & app information"
                onPress={handleAbout}
                rightElement={<ExternalLink size={20} color="#C7C7CC" />}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { fontFamily: platformFont, color: textColor }]}>
              Made with ❤️ for tracking what matters most
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Font Picker Modal */}
      <Modal visible={fontModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Font {!isPro && '(Premium)'}</Text>
            <FlatList
              data={FONTS}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    font === item.value && styles.selectedModalItem,
                    !isPro && styles.disabledModalItem
                  ]}
                  onPress={() => handleFontSelect(item.value, item.weight)}
                  disabled={!isPro}
                >
                  <View style={styles.fontItemContent}>
                    <View style={styles.fontTextContainer}>
                      <Text style={{ 
                        fontFamily: getPlatformFont(item.value), 
                        fontSize: 20, 
                        fontWeight: item.weight as any,
                        color: !isPro ? '#C7C7CC' : font === item.value ? '#0078FF' : '#1D1D1F'
                      }}>
                        {item.label}
                      </Text>
                      <Text style={[styles.fontDescription, {
                        fontFamily: getPlatformFont(item.value),
                        fontWeight: item.weight as any,
                        fontSize: 14,
                        color: !isPro ? '#E5E5E7' : font === item.value ? '#0078FF' : '#8E8E93'
                      }]}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.fontIndicators}>
                      {font === item.value && isPro && (
                        <Text style={styles.selectedIndicator}>✓</Text>
                      )}
                      {!isPro && (
                        <Crown size={16} color="#FFD700" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setFontModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Background Picker Modal */}
      <Modal visible={bgModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Background {!isPro && '(Premium)'}</Text>
            <FlatList
              data={GRADIENTS}
              keyExtractor={item => item.label}
              renderItem={({ item }) => {
                const isSelected = Array.isArray(backgroundColor) && 
                  JSON.stringify(backgroundColor) === JSON.stringify(item.value);
                return (
                  <TouchableOpacity
                    style={[
                      styles.gradientModalItem,
                      isSelected && styles.selectedModalItem,
                      !isPro && styles.disabledModalItem
                    ]}
                    onPress={() => handleBgSelect(item.value, item.textColor)}
                    disabled={!isPro}
                  >
                    <LinearGradient
                      colors={item.value as [string, string, ...string[]]}
                      style={styles.gradientPreview}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.gradientContent}>
                        <Text style={{ 
                          color: !isPro ? '#C7C7CC' : item.textColor, 
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                          {item.label}
                        </Text>
                        {isSelected && isPro && (
                          <Text style={[styles.selectedIndicator, { color: item.textColor }]}>✓</Text>
                        )}
                        {!isPro && (
                          <Crown size={16} color="#FFD700" />
                        )}
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity onPress={() => setBgModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  ) : (
    <View style={[styles.container, { backgroundColor: backgroundColor as string }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { fontFamily: platformFont, color: textColor }]}>Settings</Text>
            <Text style={[styles.headerSubtitle, { fontFamily: platformFont, color: textColor }]}>Customize your experience</Text>
          </View>

          {/* Pro Status Card */}
          <View style={styles.proCard}>
            <LinearGradient
              colors={isPro ? ['#0078FF', '#005CE6'] : ['#FFFFFF', '#F8F9FA']}
              style={styles.proGradient}
            >
              <View style={styles.proContent}>
                <Crown size={32} color={isPro ? '#FFFFFF' : '#FFD700'} />
                <Text style={[styles.proTitle, { fontFamily: platformFont, color: isPro ? '#FFFFFF' : '#1D1D1F' }]}>
                  {isPro ? 'Momentum+' : 'Free Version'}
                </Text>
                <Text style={[styles.proSubtitle, { fontFamily: platformFont, color: isPro ? 'rgba(255,255,255,0.8)' : '#8E8E93' }]}>
                  {isPro 
                    ? `Unlimited moments • Premium features`
                    : `${momentCount}/2 moments used`
                  }
                </Text>
                {!isPro && (
                  <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradeToPro}>
                    <Text style={[styles.upgradeButtonText, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>Upgrade to Pro</Text>
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>
          </View>

          {/* Settings Sections */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: platformFont, color: textColor }]}>Widget</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Smartphone size={24} color="#0078FF" />}
                title="Add to Home Screen"
                subtitle="Learn how to add your widget"
                onPress={handleAddToHomeScreen}
                rightElement={<ExternalLink size={20} color="#C7C7CC" />}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: platformFont, color: textColor }]}>Premium Features</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Star size={24} color="#FFD700" />}
                title="Advanced Customization"
                subtitle="Custom fonts, backgrounds & more"
                onPress={handleUpgradeToPro}
                isPremium={true}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: platformFont, color: textColor }]}>Appearance</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Type size={24} color="#0078FF" />}
                title="Font"
                subtitle={isPro ? font : 'Upgrade to customize'}
                onPress={() => setFontModalVisible(true)}
                isPremium={true}
              />
              <SettingItem
                icon={<Palette size={24} color="#0078FF" />}
                title="Background"
                subtitle={isPro ? 'Custom gradient' : 'Upgrade to customize'}
                onPress={() => setBgModalVisible(true)}
                isPremium={true}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: platformFont, color: textColor }]}>About</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Info size={24} color="#8E8E93" />}
                title="About Momentum"
                subtitle="Version & app information"
                onPress={handleAbout}
                rightElement={<ExternalLink size={20} color="#C7C7CC" />}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { fontFamily: platformFont, color: textColor }]}>
              Made with ❤️ for tracking what matters most
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Font Picker Modal */}
      <Modal visible={fontModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Font {!isPro && '(Premium)'}</Text>
            <FlatList
              data={FONTS}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    font === item.value && styles.selectedModalItem,
                    !isPro && styles.disabledModalItem
                  ]}
                  onPress={() => handleFontSelect(item.value, item.weight)}
                  disabled={!isPro}
                >
                  <View style={styles.fontItemContent}>
                    <View style={styles.fontTextContainer}>
                      <Text style={{ 
                        fontFamily: getPlatformFont(item.value), 
                        fontSize: 20, 
                        fontWeight: item.weight as any,
                        color: !isPro ? '#C7C7CC' : font === item.value ? '#0078FF' : '#1D1D1F'
                      }}>
                        {item.label}
                      </Text>
                      <Text style={[styles.fontDescription, {
                        fontFamily: getPlatformFont(item.value),
                        fontWeight: item.weight as any,
                        fontSize: 14,
                        color: !isPro ? '#E5E5E7' : font === item.value ? '#0078FF' : '#8E8E93'
                      }]}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.fontIndicators}>
                      {font === item.value && isPro && (
                        <Text style={styles.selectedIndicator}>✓</Text>
                      )}
                      {!isPro && (
                        <Crown size={16} color="#FFD700" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setFontModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Background Picker Modal */}
      <Modal visible={bgModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Background {!isPro && '(Premium)'}</Text>
            <FlatList
              data={GRADIENTS}
              keyExtractor={item => item.label}
              renderItem={({ item }) => {
                const isSelected = Array.isArray(backgroundColor) && 
                  JSON.stringify(backgroundColor) === JSON.stringify(item.value);
                return (
                  <TouchableOpacity
                    style={[
                      styles.gradientModalItem,
                      isSelected && styles.selectedModalItem,
                      !isPro && styles.disabledModalItem
                    ]}
                    onPress={() => handleBgSelect(item.value, item.textColor)}
                    disabled={!isPro}
                  >
                    <LinearGradient
                      colors={item.value as [string, string, ...string[]]}
                      style={styles.gradientPreview}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.gradientContent}>
                        <Text style={{ 
                          color: !isPro ? '#C7C7CC' : item.textColor, 
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                          {item.label}
                        </Text>
                        {isSelected && isPro && (
                          <Text style={[styles.selectedIndicator, { color: item.textColor }]}>✓</Text>
                        )}
                        {!isPro && (
                          <Crown size={16} color="#FFD700" />
                        )}
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity onPress={() => setBgModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
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
    color: '#1D1D1F',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  proCard: {
    marginHorizontal: 20,
    marginBottom: 32,
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
  proGradient: {
    padding: 24,
  },
  proContent: {
    alignItems: 'center',
  },
  proTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  proSubtitle: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  upgradeButton: {
    marginTop: 16,
    backgroundColor: '#0078FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  settingsGroup: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 120, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#C7C7CC',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 300,
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedModalItem: {
    backgroundColor: 'rgba(0, 120, 255, 0.1)',
  },
  disabledModalItem: {
    opacity: 0.5,
  },
  selectedIndicator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0078FF',
  },
  gradientModalItem: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientPreview: {
    padding: 12,
    minHeight: 50,
    justifyContent: 'center',
  },
  gradientContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalCancel: {
    color: '#0078FF',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  fontItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  fontTextContainer: {
    flex: 1,
  },
  fontDescription: {
    fontSize: 12,
    marginTop: 2,
    fontStyle: 'italic',
  },
  fontIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});