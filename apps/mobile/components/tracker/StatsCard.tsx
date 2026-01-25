import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Clock, Calendar, Flame, Target } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { Heading, Label, StatNumber } from '@/components/ui/Typography';

interface StatsCardProps {
  totalSessions: number;
  totalMinutes: number;
  longestStreak: number;
  thisWeek: number;
}

export default function StatsCard({
  totalSessions,
  totalMinutes,
  longestStreak,
  thisWeek,
}: StatsCardProps) {
  const stats = [
    {
      icon: Calendar,
      value: totalSessions,
      label: 'Sessions',
    },
    {
      icon: Clock,
      value: totalMinutes,
      label: 'Minutes',
    },
    {
      icon: Flame,
      value: longestStreak,
      label: 'Best Streak',
    },
    {
      icon: Target,
      value: thisWeek,
      label: 'This Week',
    },
  ];

  return (
    <View style={styles.container}>
      <Label style={styles.title}>Your Journey</Label>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <View style={styles.iconContainer}>
              <stat.icon size={16} color={colors.gold} strokeWidth={1.5} />
            </View>
            <Heading style={styles.statValue}>{stat.value}</Heading>
            <Label style={styles.statLabel}>{stat.label}</Label>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  title: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${colors.gold}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  statValue: {
    color: colors.text,
    fontSize: 24,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
});
