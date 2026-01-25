import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { Subheading, BodySecondary } from '@/components/ui/Typography';

interface GratitudePromptProps {
  delay?: number;
}

export default function GratitudePrompt({ delay = 0 }: GratitudePromptProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Heart size={24} color={colors.night.gold} strokeWidth={1.5} />
      </View>

      <Subheading style={styles.title}>
        What are you grateful for today?
      </Subheading>

      <BodySecondary style={styles.description}>
        Pause and reflect on three blessings from this day. They need not be grand—
        often the smallest gifts carry the deepest grace.
      </BodySecondary>

      {/* Reflection prompts */}
      <View style={styles.promptsContainer}>
        <View style={styles.promptItem}>
          <View style={styles.promptDot} />
          <BodySecondary style={styles.promptText}>
            A moment of peace or connection
          </BodySecondary>
        </View>
        <View style={styles.promptItem}>
          <View style={styles.promptDot} />
          <BodySecondary style={styles.promptText}>
            Something that brought you joy
          </BodySecondary>
        </View>
        <View style={styles.promptItem}>
          <View style={styles.promptDot} />
          <BodySecondary style={styles.promptText}>
            A grace you may have overlooked
          </BodySecondary>
        </View>
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
});
