/**
 * KPIBar - iOS-style stats bar with dividers
 * Horizontal layout with colored values
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '@/lib/colors';

interface KPIStat {
  label: string;
  value: string | number;
  color?: string;
}

interface KPIBarProps {
  stats: KPIStat[];
}

export function KPIBar({ stats }: KPIBarProps) {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <View style={styles.statItem}>
            <Text style={[styles.value, stat.color && { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.label}>{stat.label.toUpperCase()}</Text>
          </View>
          {index < stats.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
});
