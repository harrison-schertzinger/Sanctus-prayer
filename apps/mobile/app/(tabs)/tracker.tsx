import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Platform, LayoutAnimation, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, ChevronDown, Target, Compass, Heart, Hand } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius } from '@/lib/colors';
import { getLocalDateKey } from '@/lib/dates';
import { useStorage } from '@/hooks/useStorage';
import { useTrackerStats } from '@/hooks/useTrackerStats';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { PressableScale } from '@/components/ui/PressableScale';
import { KPIBar } from '@/components/ui/KPIBar';
import { SettingsGear } from '@/components/ui/SettingsGear';
import { useAuth } from '@/contexts/AuthContext';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Divine Rhythm - The 4 R's
const DIVINE_RHYTHM_STEPS = [
  {
    step: 1,
    name: 'Recenter',
    duration: '2-3 breaths',
    instruction: 'Stop. Breathe. Come back to peace in the present moment.',
    question: 'Where am I? What am I feeling?',
    color: '#1B3A57',
    Icon: Target,
  },
  {
    step: 2,
    name: 'Realign',
    duration: '1 breath',
    instruction: 'Turn your attention to God. Come back to Him.',
    prayer: 'You are here. I am Yours.',
    color: '#B8860B',
    Icon: Compass,
  },
  {
    step: 3,
    name: 'Recommit',
    duration: '1 breath',
    instruction: 'Renew your intention. Release what pulls you away.',
    prayer: 'I choose You again.',
    color: '#2D5A3D',
    Icon: Heart,
  },
  {
    step: 4,
    name: 'Re-surrender',
    duration: '1 breath',
    instruction: 'Let go of control. Trust His plan.',
    prayer: 'Into Your hands.',
    color: '#8B4513',
    Icon: Hand,
  },
];

const CHECKLIST_STORAGE_KEY = '@sanctus/daily_checklist';

// 40-day journey configuration
const TOTAL_DAYS = 40;

function getJourneyDay(journeyStartDate: string | null | undefined): number {
  if (!journeyStartDate) return 1;
  const start = new Date(journeyStartDate);
  start.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(diffDays + 1, TOTAL_DAYS));
}

// Daily checklist items
const CHECKLIST_ITEMS = [
  { id: 'morning-reading', label: 'Morning Reading' },
  { id: 'sacred-center', label: 'Sacred Center' },
  { id: 'divine-rhythm', label: 'Divine Rhythm' },
  { id: 'night-prayer', label: 'Night Prayer' },
];

interface DailyChecklist {
  date: string;
  items: Record<string, boolean>;
}

export default function TrackerScreen() {
  const { sessions } = useStorage();
  const stats = useTrackerStats(sessions);
  const { profile } = useAuth();
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [rhythmExpanded, setRhythmExpanded] = useState(false);
  const [isWearableUser, setIsWearableUser] = useState(false);

  // Get today's date string (local timezone)
  const today = getLocalDateKey();

  // Check experience mode on mount
  useEffect(() => {
    const checkExperienceMode = async () => {
      try {
        const mode = await AsyncStorage.getItem('@sanctus/experience_mode');
        setIsWearableUser(mode === 'wearable');
      } catch (error) {
        // Default to app-only if error
      }
    };
    checkExperienceMode();
  }, []);

  const toggleRhythmExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRhythmExpanded(!rhythmExpanded);
  };

  // Calculate current day in the 40-day journey from journey_start_date
  const currentDay = getJourneyDay(profile?.journey_start_date);

  // Load checklist from storage on mount
  useEffect(() => {
    loadChecklist();
  }, []);

  const loadChecklist = async () => {
    try {
      const stored = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (stored) {
        const data: DailyChecklist = JSON.parse(stored);
        // Only use stored data if it's from today
        if (data.date === today) {
          setChecklist(data.items);
        } else {
          // New day, reset checklist
          setChecklist({});
        }
      }
    } catch (error) {
      __DEV__ && console.error('Error loading checklist:', error);
    }
  };

  const saveChecklist = async (items: Record<string, boolean>) => {
    try {
      const data: DailyChecklist = { date: today, items };
      await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      __DEV__ && console.error('Error saving checklist:', error);
    }
  };

  const toggleItem = (itemId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = { ...checklist, [itemId]: !checklist[itemId] };
    setChecklist(updated);
    saveChecklist(updated);
  };

  const completedToday = Object.values(checklist).filter(Boolean).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <SettingsGear />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* KPI Stats Bar */}
        <AnimatedEntrance delay={0}>
          <KPIBar
            stats={[
              { label: 'Day', value: currentDay, color: colors.primary },
              { label: 'Today', value: `${completedToday}/4` },
              { label: 'Streak', value: stats.currentStreak, color: '#E67E22' },
            ]}
          />
        </AnimatedEntrance>

        {/* Divine Rhythm Education Card */}
        <AnimatedEntrance delay={50}>
          <View style={styles.rhythmCard}>
            {/* Header - Always Visible */}
            <PressableScale
              onPress={toggleRhythmExpanded}
              haptic="none"
              scaleValue={0.99}
            >
              <View style={styles.rhythmHeader}>
                <View style={styles.rhythmHeaderLeft}>
                  <View style={styles.rhythmIconCircle}>
                    <Target size={18} color={colors.gold} strokeWidth={1.5} />
                  </View>
                  <View>
                    <Text style={styles.rhythmTitle}>The Divine Rhythm</Text>
                    <Text style={styles.rhythmSubtitle}>
                      {rhythmExpanded ? 'Your practice of presence' : 'Tap to learn the 4 R\'s'}
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.chevronContainer,
                  rhythmExpanded && styles.chevronExpanded
                ]}>
                  <ChevronDown size={20} color={colors.textMuted} />
                </View>
              </View>
            </PressableScale>

            {/* Expanded Content */}
            {rhythmExpanded && (
              <View style={styles.rhythmContent}>
                {/* Context Message */}
                <View style={styles.rhythmContext}>
                  <Text style={styles.rhythmContextText}>
                    {isWearableUser
                      ? 'When your Sanctus device pulses, return to God through this simple pattern:'
                      : 'When you receive a reminder, return to God through this simple pattern:'}
                  </Text>
                </View>

                {/* The 4 R's */}
                {DIVINE_RHYTHM_STEPS.map((step, index) => (
                  <View
                    key={step.name}
                    style={[
                      styles.rhythmStep,
                      index < DIVINE_RHYTHM_STEPS.length - 1 && styles.rhythmStepBorder
                    ]}
                  >
                    <View style={[styles.stepIconCircle, { backgroundColor: `${step.color}15` }]}>
                      <step.Icon size={20} color={step.color} strokeWidth={1.5} />
                    </View>
                    <View style={styles.stepContent}>
                      <View style={styles.stepHeader}>
                        <Text style={[styles.stepName, { color: step.color }]}>
                          {step.name}
                        </Text>
                        <Text style={styles.stepDuration}>{step.duration}</Text>
                      </View>
                      <Text style={styles.stepInstruction}>{step.instruction}</Text>
                      {step.prayer && (
                        <Text style={styles.stepPrayer}>"{step.prayer}"</Text>
                      )}
                      {step.question && (
                        <Text style={styles.stepQuestion}>"{step.question}"</Text>
                      )}
                    </View>
                  </View>
                ))}

                {/* Footer Inspiration */}
                <View style={styles.rhythmFooter}>
                  <Text style={styles.rhythmFooterText}>
                    30 seconds to 2 minutes{'\n'}
                    Come back to peace in the present moment. Come back to Him.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </AnimatedEntrance>

        {/* 40-Day Journey Card */}
        <AnimatedEntrance delay={100}>
          <View style={styles.journeyCard}>
            {/* Cover Image */}
            <Image
              source={require('@/assets/peace-in-his-presence.png')}
              style={styles.journeyImage}
              resizeMode="cover"
            />
            {/* Gradient overlay */}
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.85)']}
              style={styles.imageOverlay}
            >
              <Text style={styles.journeyLabel}>40-DAY JOURNEY</Text>
              <View style={styles.progressHeader}>
                <Text style={styles.dayCounter}>Day {currentDay}</Text>
                <Text style={styles.dayTotal}>of {TOTAL_DAYS}</Text>
              </View>

              {/* 40-Day Grid */}
              <View style={styles.dayGrid}>
                {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(day => {
                  const isCompleted = day < currentDay;
                  const isCurrent = day === currentDay;

                  if (isCompleted) {
                    return (
                      <LinearGradient
                        key={day}
                        colors={['#F5D998', '#D4AF37', '#C9A227']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.dayTileCompleted}
                      >
                        <Check size={12} color="#5C4A1F" strokeWidth={3} />
                      </LinearGradient>
                    );
                  }

                  return (
                    <View
                      key={day}
                      style={[
                        styles.dayTile,
                        isCurrent && styles.dayTileCurrent,
                      ]}
                    >
                      {isCurrent && (
                        <Text style={styles.currentDayText}>{day}</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </LinearGradient>
          </View>

          {/* Daily Checklist - Seamless dark panel below image */}
          <View style={styles.checklistPanel}>
            <Text style={styles.checklistTitle}>TODAY'S RHYTHM</Text>
            {CHECKLIST_ITEMS.map((item, index) => (
              <PressableScale
                key={item.id}
                onPress={() => toggleItem(item.id)}
                haptic="none"
                scaleValue={0.98}
              >
                <View
                  style={[
                    styles.checklistItem,
                    index < CHECKLIST_ITEMS.length - 1 && styles.checklistItemBorder
                  ]}
                >
                  <View style={[
                    styles.checkbox,
                    checklist[item.id] && styles.checkboxChecked
                  ]}>
                    {checklist[item.id] && (
                      <Check size={14} color="#FFFFFF" strokeWidth={3} />
                    )}
                  </View>
                  <Text style={[
                    styles.checklistLabel,
                    checklist[item.id] && styles.checklistLabelChecked
                  ]}>
                    {item.label}
                  </Text>
                </View>
              </PressableScale>
            ))}
          </View>
        </AnimatedEntrance>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },

  // Journey Card with Image
  journeyCard: {
    height: 340,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  journeyImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.xl,
  },
  journeyLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.xs,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  dayCounter: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    fontFamily: 'Georgia',
  },
  dayTotal: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: spacing.sm,
  },

  // 40-Day Grid
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
  },
  dayTile: {
    width: 30,
    height: 38,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTileCompleted: {
    width: 30,
    height: 38,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTileCurrent: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.gold,
  },
  currentDayText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gold,
  },

  // Checklist Panel - Seamless dark
  checklistPanel: {
    marginTop: -radius.xl - 1,
    backgroundColor: '#141414',
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  checklistTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.5)',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  checklistItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checklistLabel: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  checklistLabelChecked: {
    color: 'rgba(255,255,255,0.4)',
    textDecorationLine: 'line-through',
  },

  bottomSpacer: {
    height: spacing.xl,
  },

  // Divine Rhythm Card
  rhythmCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  rhythmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  rhythmHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rhythmIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.goldFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  rhythmTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 2,
  },
  rhythmSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },

  // Expanded Content
  rhythmContent: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
  },
  rhythmContext: {
    padding: spacing.lg,
    backgroundColor: colors.goldFaint,
  },
  rhythmContextText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Individual Steps
  rhythmStep: {
    flexDirection: 'row',
    padding: spacing.lg,
  },
  rhythmStepBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  stepIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepName: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  stepDuration: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  stepInstruction: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  stepPrayer: {
    fontSize: 14,
    color: colors.gold,
    fontStyle: 'italic',
    fontFamily: 'Georgia',
  },
  stepQuestion: {
    fontSize: 14,
    color: colors.textMuted,
    fontStyle: 'italic',
    fontFamily: 'Georgia',
  },

  // Footer
  rhythmFooter: {
    padding: spacing.lg,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
  },
  rhythmFooterText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
