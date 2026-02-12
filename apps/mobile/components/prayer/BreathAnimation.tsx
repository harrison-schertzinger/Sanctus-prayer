import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { colors } from '@/lib/colors';
import { BreathPattern, BreathPhase } from '@/lib/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_SIZE = Math.min(SCREEN_WIDTH * 0.5, 200);

interface BreathAnimationProps {
  breathPhase: BreathPhase;
  breathProgress: number;
  breathPattern: BreathPattern;
  isRunning: boolean;
}

export default function BreathAnimation({
  breathPhase,
  breathProgress,
  breathPattern,
  isRunning,
}: BreathAnimationProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;
  const innerScale = useRef(new Animated.Value(0.6)).current;
  const middleScaleFactor = useRef(new Animated.Value(0.85)).current;
  const middleOpacityFactor = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    let targetScale = 1;
    let targetOpacity = 0.4;
    let targetInnerScale = 0.6;
    let duration = 0;

    switch (breathPhase) {
      case 'inhale':
        targetScale = 1.4;
        targetOpacity = 0.7;
        targetInnerScale = 0.85;
        duration = breathPattern.inhale * 1000;
        break;
      case 'hold':
        targetScale = 1.4;
        targetOpacity = 0.7;
        targetInnerScale = 0.85;
        duration = breathPattern.hold * 1000;
        break;
      case 'exhale':
        targetScale = 1;
        targetOpacity = 0.4;
        targetInnerScale = 0.6;
        duration = breathPattern.exhale * 1000;
        break;
    }

    const remainingDuration = duration * (1 - breathProgress);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: targetScale,
        duration: Math.max(remainingDuration, 100),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: targetOpacity,
        duration: Math.max(remainingDuration, 100),
        useNativeDriver: true,
      }),
      Animated.timing(innerScale, {
        toValue: targetInnerScale,
        duration: Math.max(remainingDuration, 100),
        useNativeDriver: true,
      }),
    ]).start();
  }, [breathPhase, isRunning, breathPattern]);

  return (
    <View style={styles.container}>
      {/* Outer glow ring */}
      <Animated.View
        style={[
          styles.outerRing,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      />

      {/* Middle ring */}
      <Animated.View
        style={[
          styles.middleRing,
          {
            transform: [
              {
                scale: Animated.multiply(scale, middleScaleFactor),
              },
            ],
            opacity: Animated.multiply(opacity, middleOpacityFactor),
          },
        ]}
      />

      {/* Inner circle */}
      <Animated.View
        style={[
          styles.innerCircle,
          {
            transform: [{ scale: innerScale }],
          },
        ]}
      />

      {/* Center dot */}
      <View style={styles.centerDot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: BASE_SIZE * 1.6,
    height: BASE_SIZE * 1.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    position: 'absolute',
    width: BASE_SIZE * 1.4,
    height: BASE_SIZE * 1.4,
    borderRadius: BASE_SIZE * 0.7,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.goldLight,
  },
  middleRing: {
    position: 'absolute',
    width: BASE_SIZE * 1.1,
    height: BASE_SIZE * 1.1,
    borderRadius: BASE_SIZE * 0.55,
    backgroundColor: `${colors.gold}10`,
    borderWidth: 1,
    borderColor: `${colors.gold}30`,
  },
  innerCircle: {
    position: 'absolute',
    width: BASE_SIZE,
    height: BASE_SIZE,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: `${colors.gold}20`,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  centerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.gold,
  },
});
