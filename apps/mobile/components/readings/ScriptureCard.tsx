import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '@/lib/colors';
import { ScriptureText, ScriptureReference } from '@/components/ui/Typography';
import { Scripture } from '@/lib/types';

interface ScriptureCardProps {
  scripture: Scripture;
  delay?: number;
}

export default function ScriptureCard({ scripture, delay = 0 }: ScriptureCardProps) {
  return (
    <View style={styles.container}>
      {/* Decorative gold line */}
      <View style={styles.goldLine} />

      {/* Scripture text */}
      <View style={styles.content}>
        <ScriptureText style={styles.text}>"{scripture.text}"</ScriptureText>
        <ScriptureReference style={styles.reference}>
          — {scripture.reference}
        </ScriptureReference>
      </View>

      {/* Decorative gold line */}
      <View style={styles.goldLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.goldLight,
    ...shadows.small,
  },
  goldLine: {
    height: 1,
    backgroundColor: colors.goldLight,
    marginVertical: spacing.md,
  },
  content: {
    paddingVertical: spacing.md,
  },
  text: {
    marginBottom: spacing.lg,
  },
  reference: {
    textAlign: 'center',
  },
});
