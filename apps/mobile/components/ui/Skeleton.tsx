/**
 * Skeleton - Loading placeholder components
 * Provides shimmer effect for loading states
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '@/lib/colors';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width,
  height = 20,
  borderRadius = radius.sm,
  style,
}: SkeletonProps) {
  const resolvedWidth = width ?? '100%' as const;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: resolvedWidth,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

/**
 * Scripture Card Skeleton
 */
export function ScriptureCardSkeleton() {
  return (
    <View style={styles.scriptureCard}>
      <View style={styles.goldAccent} />
      <View style={styles.scriptureContent}>
        <Skeleton height={24} style={{ marginBottom: spacing.sm }} />
        <Skeleton height={24} width="90%" style={{ marginBottom: spacing.sm }} />
        <Skeleton height={24} width="75%" style={{ marginBottom: spacing.md }} />
        <Skeleton height={16} width={120} style={{ alignSelf: 'flex-end' }} />
      </View>
    </View>
  );
}

/**
 * Reflection Card Skeleton
 */
export function ReflectionCardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton height={12} width={140} style={{ marginBottom: spacing.md }} />
      <Skeleton height={18} style={{ marginBottom: spacing.sm }} />
      <Skeleton height={18} style={{ marginBottom: spacing.sm }} />
      <Skeleton height={18} width="80%" />
    </View>
  );
}

/**
 * Practice Tile Skeleton
 */
export function PracticeTileSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Skeleton width={48} height={48} borderRadius={24} />
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Skeleton height={18} width="60%" style={{ marginBottom: spacing.xs }} />
          <Skeleton height={14} width="40%" />
        </View>
      </View>
    </View>
  );
}

/**
 * Stats Bar Skeleton
 */
export function StatsBarSkeleton() {
  return (
    <View style={[styles.card, styles.row]}>
      {[1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <View style={styles.statItem}>
            <Skeleton width={32} height={32} borderRadius={16} style={{ marginBottom: spacing.xs }} />
            <Skeleton width={40} height={20} style={{ marginBottom: spacing.xs }} />
            <Skeleton width={50} height={12} />
          </View>
          {i < 3 && <View style={styles.statDivider} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.border,
  },
  scriptureCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  goldAccent: {
    width: 4,
    backgroundColor: colors.goldMuted,
    opacity: 0.5,
  },
  scriptureContent: {
    flex: 1,
    padding: spacing.lg,
    paddingVertical: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
});
