/**
 * PremiumButton - iOS-quality CTA button
 * Solid color with color-matched floating shadow
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Platform } from 'react-native';
import { PressableScale } from './PressableScale';
import { colors, radius } from '@/lib/colors';

interface PremiumButtonProps {
  children: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

export function PremiumButton({
  children,
  onPress,
  color = '#3B7DD8', // Sacred blue, slightly brighter
  textColor = '#FFFFFF',
  style,
}: PremiumButtonProps) {
  return (
    <PressableScale
      onPress={onPress}
      haptic="medium"
      scaleValue={0.98}
      style={[styles.container, style]}
    >
      {/* Shadow layer - color matched */}
      <View
        style={[
          styles.shadowLayer,
          {
            backgroundColor: color,
            shadowColor: color,
          },
        ]}
      />
      {/* Button face */}
      <View style={[styles.button, { backgroundColor: color }]}>
        <Text style={[styles.text, { color: textColor }]}>{children}</Text>
      </View>
    </PressableScale>
  );
}

/**
 * Gold variant for Sanctus
 */
export function GoldButton({
  children,
  onPress,
  style,
}: Omit<PremiumButtonProps, 'color' | 'textColor'>) {
  return (
    <PremiumButton
      onPress={onPress}
      color="#C4922A"
      textColor="#FFFFFF"
      style={style}
    >
      {children}
    </PremiumButton>
  );
}

/**
 * Night mode variant - warm gold on dark
 */
export function NightButton({
  children,
  onPress,
  style,
}: Omit<PremiumButtonProps, 'color' | 'textColor'>) {
  return (
    <PremiumButton
      onPress={onPress}
      color="#D4AF37"
      textColor="#0F172A"
      style={style}
    >
      {children}
    </PremiumButton>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 56,
  },
  shadowLayer: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: -2,
    borderRadius: radius.md,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  button: {
    flex: 1,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
