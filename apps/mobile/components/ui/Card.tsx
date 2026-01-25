import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors, radius, shadows, spacing } from '@/lib/colors';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gold';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  pressable?: boolean;
  onPress?: () => void;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'medium',
  style,
  pressable = false,
  onPress,
}: CardProps) {
  const getCardStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.base];

    // Padding
    if (padding !== 'none') {
      baseStyles.push(styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}` as keyof typeof styles] as ViewStyle);
    }

    // Variant
    if (variant === 'default') {
      baseStyles.push(styles.default);
    } else if (variant === 'elevated') {
      baseStyles.push(styles.elevated);
    } else if (variant === 'outlined') {
      baseStyles.push(styles.outlined);
    } else if (variant === 'gold') {
      baseStyles.push(styles.gold);
    }

    return baseStyles;
  };

  if (pressable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[...getCardStyle(), style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[...getCardStyle(), style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },

  // Padding variants
  paddingSmall: {
    padding: spacing.sm,
  },
  paddingMedium: {
    padding: spacing.md,
  },
  paddingLarge: {
    padding: spacing.lg,
  },

  // Style variants
  default: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.small,
  },
  elevated: {
    backgroundColor: colors.surfaceElevated,
    ...shadows.medium,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  gold: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.goldLight,
    ...shadows.small,
  },
});
