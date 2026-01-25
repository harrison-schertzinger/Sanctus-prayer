/**
 * FloatingCard - iOS-style card with soft diffused shadow
 * The premium "floating" effect seen in top-tier apps
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors, radius, spacing } from '@/lib/colors';

interface FloatingCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Elevation level: 'subtle' | 'default' | 'elevated' */
  elevation?: 'subtle' | 'default' | 'elevated';
  /** Optional accent bar on left edge */
  accent?: string;
}

export function FloatingCard({
  children,
  style,
  elevation = 'default',
  accent,
}: FloatingCardProps) {
  const shadowStyle = ELEVATIONS[elevation];

  return (
    <View style={[styles.card, shadowStyle, style]}>
      {accent && <View style={[styles.accent, { backgroundColor: accent }]} />}
      <View style={[styles.content, accent && styles.contentWithAccent]}>
        {children}
      </View>
    </View>
  );
}

const ELEVATIONS = {
  subtle: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
    },
    android: {
      elevation: 1,
    },
  }),
  default: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
    },
    android: {
      elevation: 3,
    },
  }),
  elevated: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
    },
    android: {
      elevation: 6,
    },
  }),
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  accent: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  contentWithAccent: {
    paddingLeft: spacing.md,
  },
});
