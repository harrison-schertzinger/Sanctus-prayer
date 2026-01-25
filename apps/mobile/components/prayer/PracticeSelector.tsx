import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Heart, Sun } from 'lucide-react-native';
import { colors, spacing, radius, shadows } from '@/lib/colors';
import { Body, BodySecondary, Label } from '@/components/ui/Typography';
import { PracticeId } from '@/lib/types';
import { practices } from '@/lib/content';

interface PracticeSelectorProps {
  value: PracticeId;
  onChange: (practice: PracticeId) => void;
}

const PRACTICE_ICONS = {
  peace: Heart,
  joy: Sun,
};

export default function PracticeSelector({ value, onChange }: PracticeSelectorProps) {
  return (
    <View style={styles.container}>
      <Label style={styles.label}>Practice</Label>
      <View style={styles.optionsContainer}>
        {(Object.keys(practices) as PracticeId[]).map((practiceId) => (
          <PracticeOption
            key={practiceId}
            practiceId={practiceId}
            isSelected={value === practiceId}
            onSelect={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onChange(practiceId);
            }}
          />
        ))}
      </View>
    </View>
  );
}

interface PracticeOptionProps {
  practiceId: PracticeId;
  isSelected: boolean;
  onSelect: () => void;
}

function PracticeOption({ practiceId, isSelected, onSelect }: PracticeOptionProps) {
  const practice = practices[practiceId];
  const Icon = PRACTICE_ICONS[practiceId];

  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.8}>
      <View style={[styles.option, isSelected && styles.optionSelected]}>
        <View
          style={[
            styles.iconContainer,
            isSelected && styles.iconContainerSelected,
          ]}
        >
          <Icon
            size={20}
            color={isSelected ? colors.textInverse : colors.gold}
            strokeWidth={1.5}
          />
        </View>
        <View style={styles.textContainer}>
          <Body
            style={isSelected ? [styles.optionTitle, styles.optionTitleSelected] : styles.optionTitle}
          >
            {practice.name}
          </Body>
          <BodySecondary
            style={isSelected ? [styles.optionTagline, styles.optionTaglineSelected] : styles.optionTagline}
          >
            {practice.tagline}
          </BodySecondary>
        </View>
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
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.small,
  },
  optionSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.gold}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  optionTitleSelected: {
    color: colors.textInverse,
  },
  optionTagline: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  optionTaglineSelected: {
    color: colors.textInverse,
    opacity: 0.8,
  },
});
