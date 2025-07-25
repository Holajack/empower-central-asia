import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Lucide from 'lucide-react-native';
import { router } from 'expo-router';
import { Moment } from '@/types/moment';
import { MomentStorage } from '@/utils/storage';
import { MOMENT_COLORS, MOMENT_ICONS } from '@/types/moment';
import { useTheme } from '@/contexts/ThemeContext';

const ICON_COMPONENTS: Record<string, React.ComponentType<any>> = {
  heart: Lucide.Heart,
  calendar: Lucide.Calendar,
  target: Lucide.Target,
  trophy: Lucide.Trophy,
  star: Lucide.Star,
  rocket: Lucide.Rocket,
  coffee: Lucide.Coffee,
  book: Lucide.Book,
  dumbbell: Lucide.Dumbbell,
  'graduation-cap': Lucide.GraduationCap,
  home: Lucide.Home,
  briefcase: Lucide.Briefcase,
  plane: Lucide.Plane,
  camera: Lucide.Camera,
  music: Lucide.Music,
};

export default function AddMomentScreen() {
  const { platformFont, fontWeight, backgroundColor, textColor, isPro } = useTheme();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState<'countdown' | 'daysSince'>('countdown');
  const [selectedIcon, setSelectedIcon] = useState('heart');
  const [selectedColor, setSelectedColor] = useState('#0078FF');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your moment.');
      return;
    }

    setSaving(true);
    try {
      if (!isPro) {
        Alert.alert('Premium Feature', 'Upgrade to Pro to unlock unlimited moments!');
        setSaving(false);
        return;
      }

      const newMoment: Moment = {
        id: Date.now().toString(),
        title: title.trim(),
        date,
        type,
        icon: selectedIcon,
        color: selectedColor,
        createdAt: new Date(),
      };

      await MomentStorage.addMoment(newMoment);
      
      // Reset form
      setTitle('');
      setDate(new Date());
      setType('countdown');
      setSelectedIcon('heart');
      setSelectedColor('#0078FF');
      
      Alert.alert('Success', 'Your moment has been created!', [
        { text: 'OK', onPress: () => router.push('/') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save your moment. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderIconSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={[styles.selectorTitle, { fontFamily: platformFont, color: textColor }]}>Choose an Icon</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconScroll}>
        {MOMENT_ICONS.map((iconName) => {
          const IconComponent = ICON_COMPONENTS[iconName] || Lucide.Heart;
          const isSelected = selectedIcon === iconName;
          return (
            <TouchableOpacity
              key={iconName}
              style={[
                styles.iconOption,
                isSelected && { backgroundColor: selectedColor }
              ]}
              onPress={() => setSelectedIcon(iconName)}
            >
              <IconComponent
                size={24}
                color={isSelected ? '#FFFFFF' : '#8E8E93'}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderColorSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={[styles.selectorTitle, { fontFamily: platformFont, color: textColor }]}>Choose a Color</Text>
      <View style={styles.colorGrid}>
        {MOMENT_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
    </View>
  );

  const containerComponent = Array.isArray(backgroundColor) ? (
    <LinearGradient
      colors={backgroundColor.length >= 2 ? backgroundColor as [string, string, ...string[]] : ['#F8F9FA', '#E9ECEF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { fontFamily: platformFont, color: textColor }]}>Create Moment</Text>
              <Text style={[styles.headerSubtitle, { fontFamily: platformFont, color: textColor }]}>Track what matters to you</Text>
            </View>

            <View style={styles.form}>
              {/* Title Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { fontFamily: platformFont, color: textColor }]}>Title</Text>
                <TextInput
                  style={[styles.textInput, { fontFamily: platformFont, fontWeight: fontWeight as any }]}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g., Sober, Anniversary, World Trip"
                  placeholderTextColor="#C7C7CC"
                />
              </View>

              {/* Type Selector */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { fontFamily: platformFont, color: textColor }]}>Type</Text>
                <View style={styles.typeSelector}>
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      type === 'countdown' && styles.selectedType
                    ]}
                    onPress={() => setType('countdown')}
                  >
                    <Text style={[
                      styles.typeText,
                      type === 'countdown' && styles.selectedTypeText,
                      { fontFamily: platformFont, fontWeight: fontWeight as any }
                    ]}>Countdown</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      type === 'daysSince' && styles.selectedType
                    ]}
                    onPress={() => setType('daysSince')}
                  >
                    <Text style={[
                      styles.typeText,
                      type === 'daysSince' && styles.selectedTypeText,
                      { fontFamily: platformFont, fontWeight: fontWeight as any }
                    ]}>Days Since</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Date Selector */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { fontFamily: platformFont, color: textColor }]}>Date</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={[styles.dateText, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              )}

              {/* Icon Selector */}
              {renderIconSelector()}

              {/* Color Selector */}
              {renderColorSelector()}

              {/* Save Button */}
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: selectedColor }]}
                onPress={handleSave}
                disabled={saving}
              >
                <Text style={[styles.saveButtonText, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>
                  {saving ? 'Creating...' : 'Create Moment'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  ) : (
    <View style={[styles.container, { backgroundColor: backgroundColor as string }]}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { fontFamily: platformFont, color: textColor }]}>Create Moment</Text>
              <Text style={[styles.headerSubtitle, { fontFamily: platformFont, color: textColor }]}>Track what matters to you</Text>
            </View>

            <View style={styles.form}>
              {/* Title Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { fontFamily: platformFont, color: textColor }]}>Title</Text>
                <TextInput
                  style={[styles.textInput, { fontFamily: platformFont, fontWeight: fontWeight as any }]}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g., Sober, Anniversary, World Trip"
                  placeholderTextColor="#C7C7CC"
                />
              </View>

              {/* Type Selector */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { fontFamily: platformFont, color: textColor }]}>Type</Text>
                <View style={styles.typeSelector}>
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      type === 'countdown' && styles.selectedType
                    ]}
                    onPress={() => setType('countdown')}
                  >
                    <Text style={[
                      styles.typeText,
                      type === 'countdown' && styles.selectedTypeText,
                      { fontFamily: platformFont, fontWeight: fontWeight as any }
                    ]}>Countdown</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      type === 'daysSince' && styles.selectedType
                    ]}
                    onPress={() => setType('daysSince')}
                  >
                    <Text style={[
                      styles.typeText,
                      type === 'daysSince' && styles.selectedTypeText,
                      { fontFamily: platformFont, fontWeight: fontWeight as any }
                    ]}>Days Since</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Date Selector */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { fontFamily: platformFont, color: textColor }]}>Date</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={[styles.dateText, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              )}

              {/* Icon Selector */}
              {renderIconSelector()}

              {/* Color Selector */}
              {renderColorSelector()}

              {/* Save Button */}
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: selectedColor }]}
                onPress={handleSave}
                disabled={saving}
              >
                <Text style={[styles.saveButtonText, { fontFamily: platformFont, fontWeight: fontWeight as any }]}>
                  {saving ? 'Creating...' : 'Create Moment'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardContainer: {
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
  form: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1D1D1F',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 4,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#0078FF',
  },
  typeText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  dateText: {
    fontSize: 16,
    color: '#1D1D1F',
  },
  selectorContainer: {
    marginBottom: 24,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 12,
  },
  iconScroll: {
    maxHeight: 60,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButton: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  widgetContainer: {
    flex: 1,
  },
});