import React from 'react';
import { View, StyleSheet, ScrollView, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Check, Flame } from 'lucide-react-native';
import { colors, spacing, radius, shadows } from '@/lib/colors';
import { useStorage } from '@/hooks/useStorage';
import { useTrackerStats } from '@/hooks/useTrackerStats';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { AnimatedProgressBar } from '@/components/ui/AnimatedProgressBar';

// 40-day journey configuration
const TOTAL_DAYS = 40;

// Daily checklist items
const CHECKLIST_ITEMS = [
  { id: 'morning-reading', label: 'Morning Reading', practice: 'reading' },
  { id: 'sacred-center', label: 'Sacred Center', practice: 'peace' },
  { id: 'divine-rhythm', label: 'Divine Rhythm', practice: 'breath' },
  { id: 'night-prayer', label: 'Night Prayer', practice: 'night' },
];

export default function TrackerScreen() {
  const { sessions, completedReadings } = useStorage();
  const stats = useTrackerStats(sessions);

  // Calculate current day in the 40-day journey
  const currentDay = Math.min(stats.totalSessions + 1, TOTAL_DAYS);

  // Get today's date string
  const today = new Date().toISOString().split('T')[0];

  // Check which items are completed today
  const getTodayCompletions = () => {
    const todaySessions = sessions.filter(s => s.date === today);
    const completions: Record<string, boolean> = {};

    // Check readings
    completions['morning-reading'] = completedReadings.some(r => r.includes(today));

    // Check practices
    CHECKLIST_ITEMS.forEach(item => {
      if (item.practice !== 'reading') {
        completions[item.id] = todaySessions.some(s =>
          s.practice === item.practice ||
          (item.practice === 'night' && s.practice === 'night')
        );
      }
    });

    return completions;
  };

  const todayCompletions = getTodayCompletions();
  const completedToday = Object.values(todayCompletions).filter(Boolean).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 40-Day Progress Section */}
        <AnimatedEntrance delay={0}>
        <View style={styles.progressSection}>
          <Text style={styles.sectionLabel}>40-DAY JOURNEY</Text>
          <View style={styles.progressHeader}>
            <Text style={styles.dayCounter}>Day {currentDay}</Text>
            <Text style={styles.dayTotal}>of {TOTAL_DAYS}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <AnimatedProgressBar
              progress={currentDay / TOTAL_DAYS}
              height={8}
              delay={200}
            />
          </View>

          {/* Day Markers */}
          <View style={styles.dayMarkers}>
            {[1, 10, 20, 30, 40].map(day => (
              <View key={day} style={styles.dayMarker}>
                <View style={[
                  styles.markerDot,
                  currentDay >= day && styles.markerDotActive
                ]} />
                <Text style={[
                  styles.markerText,
                  currentDay >= day && styles.markerTextActive
                ]}>
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>
        </AnimatedEntrance>

        {/* Daily Checklist */}
        <AnimatedEntrance delay={100}>
        <View style={styles.checklistSection}>
          <View style={styles.checklistHeader}>
            <Text style={styles.sectionLabel}>TODAY'S RHYTHM</Text>
            <Text style={styles.completionCount}>{completedToday}/4</Text>
          </View>

          <View style={styles.checklistCard}>
            {CHECKLIST_ITEMS.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.checklistItem,
                  index < CHECKLIST_ITEMS.length - 1 && styles.checklistItemBorder
                ]}
              >
                <View style={[
                  styles.checkbox,
                  todayCompletions[item.id] && styles.checkboxChecked
                ]}>
                  {todayCompletions[item.id] && (
                    <Check size={14} color={colors.textInverse} strokeWidth={3} />
                  )}
                </View>
                <Text style={[
                  styles.checklistLabel,
                  todayCompletions[item.id] && styles.checklistLabelChecked
                ]}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
        </AnimatedEntrance>

        {/* Streak Callout */}
        <AnimatedEntrance delay={200}>
        <View style={styles.streakSection}>
          <View style={styles.streakCard}>
            <View style={styles.streakIcon}>
              <Flame size={28} color={colors.gold} fill={colors.goldFaint} />
            </View>
            <View style={styles.streakContent}>
              <Text style={styles.streakValue}>{stats.currentStreak}</Text>
              <Text style={styles.streakLabel}>day streak</Text>
            </View>
            {stats.longestStreak > stats.currentStreak && (
              <View style={styles.streakBest}>
                <Text style={styles.streakBestLabel}>Best</Text>
                <Text style={styles.streakBestValue}>{stats.longestStreak}</Text>
              </View>
            )}
          </View>
        </View>
        </AnimatedEntrance>

        {/* Stats Row */}
        <AnimatedEntrance delay={300}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalSessions}</Text>
            <Text style={styles.statLabel}>sessions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatMinutes(stats.totalMinutes)}</Text>
            <Text style={styles.statLabel}>total time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.thisWeek}</Text>
            <Text style={styles.statLabel}>this week</Text>
          </View>
        </View>
        </AnimatedEntrance>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
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
    paddingTop: spacing.xl,
  },

  // Progress Section
  progressSection: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  dayCounter: {
    fontSize: 36,
    fontWeight: '200',
    color: colors.text,
  },
  dayTotal: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  progressBarContainer: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.gold,
    borderRadius: 4,
  },
  dayMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  dayMarker: {
    alignItems: 'center',
    gap: 4,
  },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
  },
  markerDotActive: {
    backgroundColor: colors.gold,
  },
  markerText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  markerTextActive: {
    color: colors.gold,
    fontWeight: '600',
  },

  // Checklist Section
  checklistSection: {
    marginBottom: spacing.xl,
  },
  checklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  completionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  checklistCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingVertical: 18,
  },
  checklistItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checklistLabel: {
    fontSize: 16,
    color: colors.text,
  },
  checklistLabelChecked: {
    color: colors.textMuted,
  },

  // Streak Section
  streakSection: {
    marginBottom: spacing.lg,
  },
  streakCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.md,
  },
  streakIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.goldFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  streakContent: {
    flex: 1,
  },
  streakValue: {
    fontSize: 40,
    fontWeight: '200',
    color: colors.text,
    lineHeight: 44,
  },
  streakLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: -2,
  },
  streakBest: {
    alignItems: 'center',
    paddingLeft: spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  streakBestLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.textMuted,
    marginBottom: 2,
  },
  streakBestValue: {
    fontSize: 22,
    fontWeight: '300',
    color: colors.gold,
  },

  // Stats Row
  statsRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    ...shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },

  bottomSpacer: {
    height: spacing.xl,
  },
});
