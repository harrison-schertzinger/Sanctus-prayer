import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius } from '@/lib/colors';
import { useStorage } from '@/hooks/useStorage';
import { useTrackerStats } from '@/hooks/useTrackerStats';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { PressableScale } from '@/components/ui/PressableScale';
import { KPIBar } from '@/components/ui/KPIBar';

const CHECKLIST_STORAGE_KEY = '@sanctus/daily_checklist';

// 40-day journey configuration
const TOTAL_DAYS = 40;

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
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // Get today's date string
  const today = new Date().toISOString().split('T')[0];

  // Calculate current day in the 40-day journey
  const currentDay = Math.min(stats.totalSessions + 1, TOTAL_DAYS);

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

        {/* 40-Day Journey Card */}
        <AnimatedEntrance delay={50}>
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
});
