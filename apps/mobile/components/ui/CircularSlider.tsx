/**
 * CircularSlider - iOS-quality arc slider with draggable handle
 * Used for meditation timer configuration
 */

import React, { useRef, useMemo } from 'react';
import { View, StyleSheet, PanResponder, Animated, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

interface CircularSliderProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Arc color */
  color: string;
  /** Track background color */
  trackColor?: string;
  /** Radius of the arc center line */
  radius: number;
  /** Width of the stroke */
  strokeWidth?: number;
  /** Start angle in degrees (0 = top) */
  startAngle?: number;
  /** End angle in degrees */
  endAngle?: number;
  /** Step size for snapping */
  step?: number;
}

export function CircularSlider({
  value,
  min,
  max,
  onChange,
  color,
  trackColor = 'rgba(0,0,0,0.08)',
  radius,
  strokeWidth = 14,
  startAngle = -140,
  endAngle = 140,
  step = 1,
}: CircularSliderProps) {
  const handleScale = useRef(new Animated.Value(1)).current;
  const lastHapticValue = useRef(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Calculate SVG dimensions - larger touch area
  const handleRadius = strokeWidth * 1.1;
  const size = (radius + strokeWidth + handleRadius) * 2 + 10;
  const center = size / 2;

  const totalAngle = endAngle - startAngle;

  // Calculate current angle based on value
  const valuePercent = (value - min) / (max - min);
  const currentAngle = startAngle + valuePercent * totalAngle;
  const currentRad = (currentAngle - 90) * (Math.PI / 180);

  // Handle position
  const handleX = center + radius * Math.cos(currentRad);
  const handleY = center + radius * Math.sin(currentRad);

  // Create arc path
  const createArc = (startA: number, endA: number) => {
    const startR = (startA - 90) * (Math.PI / 180);
    const endR = (endA - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startR);
    const y1 = center + radius * Math.sin(startR);
    const x2 = center + radius * Math.cos(endR);
    const y2 = center + radius * Math.sin(endR);

    const largeArc = Math.abs(endA - startA) > 180 ? 1 : 0;
    const sweep = endA > startA ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
  };

  // Background track path
  const trackPath = createArc(startAngle, endAngle);

  // Active arc path
  const activePath = valuePercent > 0.001 ? createArc(startAngle, currentAngle) : '';

  // Convert touch position to value - memoized with stable reference
  const touchToValue = useMemo(() => {
    return (x: number, y: number) => {
      const dx = x - center;
      const dy = y - center;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

      // Normalize angle to -180 to 180 range first
      while (angle > 180) angle -= 360;
      while (angle < -180) angle += 360;

      // Clamp to valid range
      if (angle < startAngle) {
        angle = startAngle;
      } else if (angle > endAngle) {
        angle = endAngle;
      }

      // Convert angle to value
      const percent = (angle - startAngle) / totalAngle;
      let newValue = min + percent * (max - min);

      // Snap to step
      newValue = Math.round(newValue / step) * step;
      newValue = Math.max(min, Math.min(max, newValue));

      return newValue;
    };
  }, [center, startAngle, endAngle, totalAngle, min, max, step]);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: (evt) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Animated.spring(handleScale, {
          toValue: 1.25,
          useNativeDriver: true,
          friction: 6,
          tension: 200,
        }).start();

        const { locationX, locationY } = evt.nativeEvent;
        const newValue = touchToValue(locationX, locationY);
        onChangeRef.current(newValue);
        lastHapticValue.current = newValue;
      },

      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const newValue = touchToValue(locationX, locationY);

        // Haptic feedback on value change
        if (newValue !== lastHapticValue.current) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          lastHapticValue.current = newValue;
        }

        onChangeRef.current(newValue);
      },

      onPanResponderRelease: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Animated.spring(handleScale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
          tension: 200,
        }).start();
      },

      onPanResponderTerminate: () => {
        Animated.spring(handleScale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
        }).start();
      },
    });
  }, [touchToValue, handleScale]);

  return (
    <View style={[styles.container, { width: size, height: size }]} {...panResponder.panHandlers}>
      <Svg width={size} height={size}>
        {/* Background track */}
        <Path
          d={trackPath}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />

        {/* Active arc */}
        {activePath && (
          <Path
            d={activePath}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Handle glow */}
        <Circle
          cx={handleX}
          cy={handleY}
          r={handleRadius + 4}
          fill={color}
          opacity={0.25}
        />

        {/* Handle */}
        <Circle
          cx={handleX}
          cy={handleY}
          r={handleRadius}
          fill="#FFFFFF"
          stroke={color}
          strokeWidth={3}
        />
      </Svg>

      {/* Animated handle overlay for scale effect */}
      <Animated.View
        style={[
          styles.handleOverlay,
          {
            left: handleX - handleRadius,
            top: handleY - handleRadius,
            width: handleRadius * 2,
            height: handleRadius * 2,
            borderRadius: handleRadius,
            transform: [{ scale: handleScale }],
            ...Platform.select({
              ios: {
                shadowColor: color,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
              },
              android: {
                elevation: 6,
              },
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  handleOverlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
