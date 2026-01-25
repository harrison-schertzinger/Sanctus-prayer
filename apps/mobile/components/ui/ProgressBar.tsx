import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { colors } from '@/lib/colors';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  animated?: boolean;
  style?: ViewStyle;
}

export default function ProgressBar({
  progress,
  height = 4,
  backgroundColor = colors.goldLight,
  fillColor = colors.gold,
  animated = true,
  style,
}: ProgressBarProps) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedProgress, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedProgress.setValue(progress);
    }
  }, [progress, animated]);

  const widthInterpolation = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor, borderRadius: height / 2 },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          { backgroundColor: fillColor, borderRadius: height / 2, width: widthInterpolation },
        ]}
      />
    </View>
  );
}

// Segmented progress bar for phases
interface SegmentedProgressBarProps {
  segments: number;
  currentSegment: number;
  segmentProgress: number; // 0 to 1 within current segment
  height?: number;
  style?: ViewStyle;
}

export function SegmentedProgressBar({
  segments,
  currentSegment,
  segmentProgress,
  height = 4,
  style,
}: SegmentedProgressBarProps) {
  return (
    <View style={[styles.segmentedContainer, style]}>
      {Array.from({ length: segments }).map((_, index) => {
        let progress = 0;
        if (index < currentSegment) {
          progress = 1;
        } else if (index === currentSegment) {
          progress = segmentProgress;
        }

        return (
          <View key={index} style={styles.segmentWrapper}>
            <ProgressBar
              progress={progress}
              height={height}
              backgroundColor={colors.goldLight}
              fillColor={colors.gold}
            />
          </View>
        );
      })}
    </View>
  );
}

// Circular progress placeholder
interface CircularProgressProps {
  progress: number; // 0 to 1
  size: number;
  strokeWidth?: number;
  backgroundColor?: string;
  fillColor?: string;
}

export function CircularProgress({
  size,
  strokeWidth = 4,
  backgroundColor = colors.goldLight,
}: CircularProgressProps) {
  return (
    <View style={{ width: size, height: size }}>
      <View style={StyleSheet.absoluteFill}>
        <View
          style={[
            styles.circleBackground,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: backgroundColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  segmentedContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  segmentWrapper: {
    flex: 1,
  },
  circleBackground: {
    backgroundColor: 'transparent',
  },
});
