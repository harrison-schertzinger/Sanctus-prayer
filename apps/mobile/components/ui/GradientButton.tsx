/**
 * GradientButton - Premium CTA button with gradient and shadow
 * Cross-platform consistent styling
 */

import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from './PressableScale';
import { colors, radius, spacing } from '@/lib/colors';

interface GradientButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'gold' | 'blue' | 'night';
  size?: 'default' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const VARIANTS = {
  gold: {
    colors: ['#D4A012', '#B8860B', '#9A7209'] as const,
    shadow: '#B8860B',
    text: colors.textInverse,
  },
  blue: {
    colors: ['#2B4A7C', '#1A365D', '#142847'] as const,
    shadow: '#1A365D',
    text: colors.textInverse,
  },
  night: {
    colors: ['#E5C158', '#D4AF37', '#B8973A'] as const,
    shadow: '#D4AF37',
    text: colors.night.background,
  },
};

export function GradientButton({
  children,
  onPress,
  variant = 'gold',
  size = 'default',
  style,
  textStyle,
  icon,
}: GradientButtonProps) {
  const variantStyles = VARIANTS[variant];
  const isLarge = size === 'large';

  return (
    <PressableScale
      onPress={onPress}
      haptic="medium"
      scaleValue={0.97}
      style={[
        styles.shadowContainer,
        {
          shadowColor: variantStyles.shadow,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={[...variantStyles.colors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          isLarge && styles.gradientLarge,
        ]}
      >
        {typeof children === 'string' ? (
          <Text
            style={[
              styles.text,
              isLarge && styles.textLarge,
              { color: variantStyles.text },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
        {icon}
      </LinearGradient>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: radius.md,
    // Cross-platform shadow
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    gap: spacing.sm,
  },
  gradientLarge: {
    paddingVertical: 20,
    paddingHorizontal: spacing.xxl,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  textLarge: {
    fontSize: 18,
  },
});
