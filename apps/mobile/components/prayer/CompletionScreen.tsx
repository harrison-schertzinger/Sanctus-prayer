import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { DisplayText, ScriptureText, ScriptureReference, Label } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import ParticleEffect from './ParticleEffect';
import { Practice } from '@/lib/types';

interface CompletionScreenProps {
  practice: Practice;
  completionMessage: string;
  duration: number;
  onDone: () => void;
}

export default function CompletionScreen({
  practice,
  completionMessage,
  duration,
  onDone,
}: CompletionScreenProps) {
  return (
    <View style={styles.container}>
      {/* Particle effect - golden particles rising like incense */}
      <ParticleEffect isActive={true} />

      <View style={styles.content}>
        {/* Completion icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <Check size={32} color={colors.textInverse} strokeWidth={2.5} />
            </View>
          </View>
        </View>

        {/* Completion message */}
        <View style={styles.messageContainer}>
          <ScriptureText style={styles.message}>
            {completionMessage}
          </ScriptureText>
        </View>

        {/* Practice info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Label style={styles.infoLabel}>Practice</Label>
            <Label style={styles.infoValue}>{practice.name}</Label>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Label style={styles.infoLabel}>Duration</Label>
            <Label style={styles.infoValue}>{duration} minutes</Label>
          </View>
        </View>

        {/* Scripture */}
        <View style={styles.scriptureContainer}>
          <ScriptureText style={styles.scripture}>
            "{practice.scripture.text}"
          </ScriptureText>
          <ScriptureReference>— {practice.scripture.reference}</ScriptureReference>
        </View>

        {/* Done button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Done"
            onPress={onDone}
            size="large"
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  iconOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.gold}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  message: {
    textAlign: 'center',
    color: colors.text,
  },
  infoContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    width: '100%',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: colors.textSecondary,
  },
  infoValue: {
    color: colors.gold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
  scriptureContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  scripture: {
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacing.md,
  },
});
