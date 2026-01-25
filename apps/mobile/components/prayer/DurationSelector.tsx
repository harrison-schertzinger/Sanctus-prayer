import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius } from '@/lib/colors';
import { Body, Label } from '@/components/ui/Typography';

type Duration = 5 | 10 | 15;

interface DurationSelectorProps {
  value: Duration;
  onChange: (duration: Duration) => void;
}

const DURATIONS: { value: Duration; label: string; description: string }[] = [
  { value: 5, label: '5 min', description: 'Quick practice' },
  { value: 10, label: '10 min', description: 'Recommended' },
  { value: 15, label: '15 min', description: 'Deep practice' },
];

export default function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <View style={styles.container}>
      <Label style={styles.label}>Duration</Label>
      <View style={styles.optionsContainer}>
        {DURATIONS.map((duration) => (
          <DurationOption
            key={duration.value}
            duration={duration}
            isSelected={value === duration.value}
            onSelect={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onChange(duration.value);
            }}
          />
        ))}
      </View>
    </View>
  );
}

interface DurationOptionProps {
  duration: { value: Duration; label: string; description: string };
  isSelected: boolean;
  onSelect: () => void;
}

function DurationOption({ duration, isSelected, onSelect }: DurationOptionProps) {
  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.8} style={styles.optionTouchable}>
      <View style={[styles.option, isSelected && styles.optionSelected]}>
        <Body
          style={isSelected ? [styles.optionLabel, styles.optionLabelSelected] : styles.optionLabel}
        >
          {duration.label}
        </Body>
        <Label
          style={isSelected ? [styles.optionDescription, styles.optionDescriptionSelected] : styles.optionDescription}
        >
          {duration.description}
        </Label>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionTouchable: {
    flex: 1,
  },
  option: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  optionSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  optionLabel: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: colors.textInverse,
  },
  optionDescription: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  optionDescriptionSelected: {
    color: colors.textInverse,
    opacity: 0.8,
  },
});
