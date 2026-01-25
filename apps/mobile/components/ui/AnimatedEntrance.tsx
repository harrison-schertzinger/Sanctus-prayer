/**
 * AnimatedEntrance - Reusable entrance animation wrapper
 * Provides fade-in and slide-up animation for content
 */

import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedEntranceProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  slideDistance?: number;
  style?: ViewStyle;
}

export function AnimatedEntrance({
  children,
  delay = 0,
  duration = 400,
  slideDistance = 20,
  style,
}: AnimatedEntranceProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(slideDistance)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

/**
 * Staggered list entrance - for lists of items
 */
interface StaggeredListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggeredList({
  children,
  staggerDelay = 80,
  initialDelay = 100,
}: StaggeredListProps) {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <AnimatedEntrance delay={initialDelay + index * staggerDelay}>
          {child}
        </AnimatedEntrance>
      ))}
    </>
  );
}
