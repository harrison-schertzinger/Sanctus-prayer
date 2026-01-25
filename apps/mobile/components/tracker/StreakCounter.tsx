import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { StatNumber, Label, BodySecondary } from '@/components/ui/Typography';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export default function StreakCounter({ currentStreak, longestStreak }: StreakCounterProps) {
  const getStreakMessage = () => {
    if (currentStreak === 0) return 'Start your streak today';
    if (currentStreak === 1) return 'Great start! Keep it going';
    if (currentStreak < 7) return `${7 - currentStreak} days to your first week`;
    if (currentStreak === 7) return 'One week strong!';
    if (currentStreak < 30) return `${30 - currentStreak} days to one month`;
    if (currentStreak === 30) return 'One month of faithfulness!';
    return 'Steadfast in prayer';
  };

  return (
    <View style={styles.container}>
      <View style={styles.streakDisplay}>
        <View style={styles.iconContainer}>
          <Flame
            size={32}
            color={currentStreak > 0 ? colors.gold : colors.textMuted}
            fill={currentStreak > 0 ? `${colors.gold}40` : 'transparent'}
          />
        </View>

        <View style={styles.numberContainer}>
          <StatNumber style={currentStreak === 0 ? styles.inactiveNumber : undefined}>
            {currentStreak}
          </StatNumber>
          <Label style={styles.daysLabel}>
            {currentStreak === 1 ? 'Day' : 'Days'}
          </Label>
        </View>
      </View>

      <BodySecondary style={styles.message}>
        {getStreakMessage()}
      </BodySecondary>

      {longestStreak > currentStreak && (
        <View style={styles.longestContainer}>
          <Label style={styles.longestLabel}>
            Longest: {longestStreak} days
          </Label>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  streakDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  numberContainer: {
    alignItems: 'center',
  },
  inactiveNumber: {
    color: colors.textMuted,
  },
  daysLabel: {
    color: colors.gold,
    marginTop: -4,
  },
  message: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  longestContainer: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  longestLabel: {
    color: colors.textMuted,
    fontSize: 10,
  },
});
