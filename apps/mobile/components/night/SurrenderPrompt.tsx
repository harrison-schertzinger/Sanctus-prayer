import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Hand } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { Subheading, BodySecondary } from '@/components/ui/Typography';

interface SurrenderPromptProps {
  delay?: number;
}

export default function SurrenderPrompt({ delay = 0 }: SurrenderPromptProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Hand size={24} color={colors.night.gold} strokeWidth={1.5} />
      </View>

      <Subheading style={styles.title}>
        What do you release to God tonight?
      </Subheading>

      <BodySecondary style={styles.description}>
        Open your hands. What burdens are you carrying that were never yours to hold?
        What anxieties about tomorrow can you lay down tonight?
      </BodySecondary>

      {/* Reflection prompts */}
      <View style={styles.promptsContainer}>
        <View style={styles.promptItem}>
          <View style={styles.promptDot} />
          <BodySecondary style={styles.promptText}>
            Worries about tomorrow
          </BodySecondary>
        </View>
        <View style={styles.promptItem}>
          <View style={styles.promptDot} />
          <BodySecondary style={styles.promptText}>
            Regrets from today
          </BodySecondary>
        </View>
        <View style={styles.promptItem}>
          <View style={styles.promptDot} />
          <BodySecondary style={styles.promptText}>
            What you cannot control
          </BodySecondary>
        </View>
      </View>

      {/* Surrender prayer */}
      <View style={styles.prayerContainer}>
        <BodySecondary style={styles.prayerText}>
          "Lord, I surrender this day to You. Take what was broken and redeem it.
          Take what was good and multiply it. I trust You with the night."
        </BodySecondary>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.night.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.night.goldLight,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.night.gold}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.night.text,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.night.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  promptsContainer: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  promptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  promptDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.night.gold,
    opacity: 0.6,
  },
  promptText: {
    color: colors.night.textSecondary,
    flex: 1,
  },
  prayerContainer: {
    backgroundColor: `${colors.night.gold}10`,
    borderRadius: radius.md,
    padding: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.night.gold,
  },
  prayerText: {
    color: colors.night.text,
    fontStyle: 'italic',
    lineHeight: 24,
  },
});
