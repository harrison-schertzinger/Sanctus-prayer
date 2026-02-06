import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { getLocalDateKey } from '@/lib/dates';
import { Label, BodySecondary } from '@/components/ui/Typography';
import { PracticeSession } from '@/lib/types';

interface CalendarGridProps {
  sessions: PracticeSession[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function CalendarGrid({
  sessions,
  selectedMonth,
  onMonthChange
}: CalendarGridProps) {
  // Create a set of practice dates for quick lookup
  const practiceDates = useMemo(() => {
    return new Set(sessions.map(s => s.date));
  }, [sessions]);

  // Get calendar data for the month
  const calendarData = useMemo(() => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [selectedMonth]);

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    // Don't go past current month
    if (newDate <= new Date()) {
      onMonthChange(newDate);
    }
  };

  const isCurrentMonth = () => {
    const now = new Date();
    return selectedMonth.getMonth() === now.getMonth() &&
           selectedMonth.getFullYear() === now.getFullYear();
  };

  const getDayStatus = (day: number | null) => {
    if (day === null) return 'empty';

    const dateStr = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const today = getLocalDateKey();

    if (dateStr === today) return 'today';
    if (practiceDates.has(dateStr)) return 'practiced';
    if (dateStr < today) return 'missed';
    return 'future';
  };

  return (
    <View style={styles.container}>
      {/* Month navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <ChevronLeft size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <BodySecondary style={styles.monthLabel}>
          {formatMonth(selectedMonth)}
        </BodySecondary>

        <TouchableOpacity
          onPress={goToNextMonth}
          style={[styles.navButton, isCurrentMonth() && styles.navButtonDisabled]}
          disabled={isCurrentMonth()}
        >
          <ChevronRight
            size={20}
            color={isCurrentMonth() ? colors.textMuted : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Day labels */}
      <View style={styles.dayLabels}>
        {DAYS.map((day, index) => (
          <View key={index} style={styles.dayLabelContainer}>
            <Label style={styles.dayLabel}>{day}</Label>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {calendarData.map((day, index) => {
          const status = getDayStatus(day);

          return (
            <View key={index} style={styles.dayContainer}>
              {day !== null && (
                <View style={[
                  styles.day,
                  status === 'practiced' && styles.dayPracticed,
                  status === 'today' && styles.dayToday,
                ]}>
                  <Label style={[
                    styles.dayText,
                    status === 'practiced' && styles.dayTextPracticed,
                    status === 'today' && styles.dayTextToday,
                    status === 'missed' && styles.dayTextMissed,
                    status === 'future' && styles.dayTextFuture,
                  ]}>
                    {day}
                  </Label>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendDotPracticed]} />
          <Label style={styles.legendLabel}>Practiced</Label>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendDotToday]} />
          <Label style={styles.legendLabel}>Today</Label>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  navButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  monthLabel: {
    color: colors.text,
    fontWeight: '600',
  },
  dayLabels: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  dayLabelContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dayLabel: {
    color: colors.textMuted,
    fontSize: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  dayPracticed: {
    backgroundColor: colors.gold,
  },
  dayToday: {
    borderWidth: 2,
    borderColor: colors.gold,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  dayTextPracticed: {
    color: colors.textInverse,
  },
  dayTextToday: {
    color: colors.gold,
  },
  dayTextMissed: {
    color: colors.textMuted,
  },
  dayTextFuture: {
    color: colors.textMuted,
    opacity: 0.5,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendDotPracticed: {
    backgroundColor: colors.gold,
  },
  legendDotToday: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.gold,
  },
  legendLabel: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
