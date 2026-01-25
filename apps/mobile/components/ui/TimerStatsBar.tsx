/**
 * TimerStatsBar - Display selected timer values above the circular selector
 * Dark, compact bar with color-coded indicators for visual contrast
 */

import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { RING_COLORS } from './ConcentricTimerSelector';

interface TimerStatsBarProps {
  preparation: number; // seconds
  interval: number;    // minutes
  total: number;       // minutes
}

export function TimerStatsBar({ preparation, interval, total }: TimerStatsBarProps) {
  return (
    <View style={styles.container}>
      {/* Preparation */}
      <View style={styles.statItem}>
        <View style={[styles.dot, { backgroundColor: RING_COLORS.preparation }]} />
        <View style={styles.valueRow}>
          <Text style={styles.statValue}>{preparation}</Text>
          <Text style={styles.statUnit}>s</Text>
        </View>
        <Text style={styles.statLabel}>PREP</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Interval */}
      <View style={styles.statItem}>
        <View style={[styles.dot, { backgroundColor: RING_COLORS.interval }]} />
        <View style={styles.valueRow}>
          <Text style={styles.statValue}>{interval}</Text>
          <Text style={styles.statUnit}>m</Text>
        </View>
        <Text style={styles.statLabel}>INTERVAL</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Total */}
      <View style={styles.statItem}>
        <View style={[styles.dot, { backgroundColor: RING_COLORS.total }]} />
        <View style={styles.valueRow}>
          <Text style={styles.statValue}>{total}</Text>
          <Text style={styles.statUnit}>m</Text>
        </View>
        <Text style={styles.statLabel}>TOTAL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.primary, // Sacred Blue - dark contrast
    borderRadius: radius.sm, // Sharper corners - more tile-like
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textInverse,
  },
  statUnit: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
    marginLeft: 1,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.45)',
    marginLeft: spacing.xs,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
});
