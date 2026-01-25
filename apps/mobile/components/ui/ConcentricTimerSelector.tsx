/**
 * ConcentricTimerSelector - Three nested circular sliders for meditation timing
 * Inner: Preparation time (seconds)
 * Middle: Interval time (minutes)
 * Outer: Total meditation time (minutes)
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CircularSlider } from './CircularSlider';
import { colors, spacing } from '@/lib/colors';

interface TimerValues {
  preparation: number; // seconds (0-60)
  interval: number;    // minutes (1-15)
  total: number;       // minutes (5-60)
}

interface ConcentricTimerSelectorProps {
  values: TimerValues;
  onChange: (values: TimerValues) => void;
}

// Ring colors - Regal Sanctus palette
const RING_COLORS = {
  preparation: '#D4AF37', // Burnished Gold - glory, illumination
  interval: '#722F37',    // Deep Wine - sacred, passion
  total: '#1A365D',       // Sacred Blue - depth, wisdom, Mary's mantle
};

// Ring dimensions - Large with generous spacing for easy independent control
const OUTER_RADIUS = 155;
const MIDDLE_RADIUS = 100;
const INNER_RADIUS = 50;
const STROKE_WIDTH = 10;

export function ConcentricTimerSelector({
  values,
  onChange,
}: ConcentricTimerSelectorProps) {
  const containerSize = (OUTER_RADIUS + STROKE_WIDTH) * 2 + 20;

  const handlePreparationChange = (val: number) => {
    onChange({ ...values, preparation: val });
  };

  const handleIntervalChange = (val: number) => {
    onChange({ ...values, interval: val });
  };

  const handleTotalChange = (val: number) => {
    // Ensure total is always >= interval
    const newTotal = Math.max(val, values.interval);
    onChange({ ...values, total: newTotal });
  };

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      {/* Outer ring - Total time */}
      <View style={styles.ringContainer}>
        <CircularSlider
          value={values.total}
          min={5}
          max={60}
          step={1}
          onChange={handleTotalChange}
          color={RING_COLORS.total}
          radius={OUTER_RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
      </View>

      {/* Middle ring - Interval time */}
      <View style={[styles.ringContainer, styles.centered]}>
        <CircularSlider
          value={values.interval}
          min={1}
          max={15}
          step={1}
          onChange={handleIntervalChange}
          color={RING_COLORS.interval}
          radius={MIDDLE_RADIUS}
          strokeWidth={STROKE_WIDTH - 1}
        />
      </View>

      {/* Inner ring - Preparation time */}
      <View style={[styles.ringContainer, styles.centered]}>
        <CircularSlider
          value={values.preparation}
          min={0}
          max={60}
          step={5}
          onChange={handlePreparationChange}
          color={RING_COLORS.preparation}
          radius={INNER_RADIUS}
          strokeWidth={STROKE_WIDTH - 2}
        />
      </View>

      {/* Center content */}
      <View style={[styles.centerContent, styles.centered]}>
        <Text style={styles.centerLabel}>SANCTUS</Text>
        <Text style={styles.centerValue}>{values.total}</Text>
        <Text style={styles.centerUnit}>min</Text>
      </View>
    </View>
  );
}

// Export colors for use in stats bar
export { RING_COLORS };

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringContainer: {
    position: 'absolute',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: INNER_RADIUS * 1.6,
    height: INNER_RADIUS * 1.6,
  },
  centerLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.textMuted,
    marginBottom: 4,
  },
  centerValue: {
    fontSize: 42,
    fontWeight: '300',
    color: colors.text,
    fontFamily: 'Georgia',
  },
  centerUnit: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: -2,
  },
});
