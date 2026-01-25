import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '@/lib/colors';
import { Body, Quote, Label } from '@/components/ui/Typography';

interface ReflectionCardProps {
  reflection: string;
  quote?: {
    text: string;
    author: string;
  };
  delay?: number;
}

export default function ReflectionCard({ reflection, quote, delay = 0 }: ReflectionCardProps) {
  return (
    <View style={styles.container}>
      {/* Reflection section */}
      <View style={styles.section}>
        <Label style={styles.label}>Today's Reflection</Label>
        <Body style={styles.reflection}>{reflection}</Body>
      </View>

      {/* Quote section (if provided) */}
      {quote && (
        <View style={styles.quoteSection}>
          <View style={styles.quoteLine} />
          <Quote style={styles.quoteText}>"{quote.text}"</Quote>
          <Label style={styles.quoteAuthor}>— {quote.author}</Label>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.small,
  },
  section: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.gold,
    marginBottom: spacing.sm,
  },
  reflection: {
    color: colors.text,
    lineHeight: 28,
  },
  quoteSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  quoteLine: {
    position: 'absolute',
    left: 0,
    top: spacing.lg,
    bottom: 0,
    width: 2,
    backgroundColor: colors.goldLight,
    borderRadius: 1,
  },
  quoteText: {
    paddingLeft: spacing.md,
    marginBottom: spacing.sm,
  },
  quoteAuthor: {
    paddingLeft: spacing.md,
    color: colors.gold,
  },
});
