import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '@/lib/colors';
import { Heading, BodySecondary, PrayerPhrase, Label } from '@/components/ui/Typography';
import { PracticePhaseType, BreathPhase, PraiseSubphase } from '@/lib/types';
import { breathInstructions, praisePrompts } from '@/lib/content';

interface PhaseDisplayProps {
  phase: PracticePhaseType;
  breathPhase: BreathPhase;
  praiseSubphase: PraiseSubphase;
  inhalePhrase: string | null;
  exhalePhrase: string | null;
}

export default function PhaseDisplay({
  phase,
  breathPhase,
  praiseSubphase,
  inhalePhrase,
  exhalePhrase,
}: PhaseDisplayProps) {
  const getPhaseTitle = () => {
    switch (phase) {
      case 'recollection':
        return 'Recollection';
      case 'contemplation':
        return 'Contemplation';
      case 'praise':
        return 'Praise & Surrender';
    }
  };

  const getPhaseSubtitle = () => {
    switch (phase) {
      case 'recollection':
        return 'Collect yourself before God';
      case 'contemplation':
        return 'Smooth breath with contemplation';
      case 'praise':
        return 'Gratitude, petition, and surrender';
    }
  };

  const renderPhaseContent = () => {
    switch (phase) {
      case 'recollection':
        return (
          <View style={styles.breathInstructionContainer}>
            <PrayerPhrase style={styles.breathInstruction}>
              {breathInstructions[breathPhase]}
            </PrayerPhrase>
          </View>
        );

      case 'contemplation':
        const currentPhrase =
          breathPhase === 'inhale' ? inhalePhrase : exhalePhrase;
        return (
          <View style={styles.phraseContainer}>
            <Label style={styles.breathLabel}>
              {breathPhase === 'inhale' ? 'Breathe in' : breathPhase === 'exhale' ? 'Breathe out' : 'Hold'}
            </Label>
            {currentPhrase && (
              <PrayerPhrase style={styles.prayerPhrase}>
                {currentPhrase}
              </PrayerPhrase>
            )}
          </View>
        );

      case 'praise':
        const prompt = praisePrompts[praiseSubphase];
        return (
          <View style={styles.praiseContainer}>
            <Label style={styles.praiseLabel}>{prompt.title}</Label>
            <PrayerPhrase style={styles.praiseInstruction}>
              {prompt.instruction}
            </PrayerPhrase>
            <BodySecondary style={styles.praiseDescription}>
              {prompt.description}
            </BodySecondary>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Phase header */}
      <View style={styles.header}>
        <Heading style={styles.title}>{getPhaseTitle()}</Heading>
        <BodySecondary style={styles.subtitle}>{getPhaseSubtitle()}</BodySecondary>
      </View>

      {/* Phase-specific content */}
      <View style={styles.content}>{renderPhaseContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  content: {
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  breathInstructionContainer: {
    alignItems: 'center',
  },
  breathInstruction: {
    color: colors.gold,
  },
  phraseContainer: {
    alignItems: 'center',
  },
  breathLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  prayerPhrase: {
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  praiseContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  praiseLabel: {
    color: colors.gold,
    marginBottom: spacing.sm,
  },
  praiseInstruction: {
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  praiseDescription: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
