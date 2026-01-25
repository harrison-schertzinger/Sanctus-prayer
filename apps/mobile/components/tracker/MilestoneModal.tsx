import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Award, X } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { DisplayText, BodySecondary, ScriptureText, ScriptureReference } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import ParticleEffect from '@/components/prayer/ParticleEffect';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  scripture: {
    text: string;
    reference: string;
  };
}

interface MilestoneModalProps {
  visible: boolean;
  milestone: Milestone | null;
  onClose: () => void;
}

export const MILESTONES: Record<number, Milestone> = {
  1: {
    id: 'first-practice',
    title: 'First Step',
    description: 'You have begun the journey of contemplative prayer.',
    scripture: {
      text: 'The journey of a thousand miles begins with a single step.',
      reference: 'Lao Tzu',
    },
  },
  7: {
    id: 'one-week',
    title: 'One Week',
    description: 'Seven days of faithfulness. A holy rhythm is forming.',
    scripture: {
      text: 'Be faithful in small things because it is in them that your strength lies.',
      reference: 'St. Teresa of Calcutta',
    },
  },
  14: {
    id: 'two-weeks',
    title: 'Two Weeks',
    description: 'Consistency is becoming second nature.',
    scripture: {
      text: 'Pray without ceasing.',
      reference: '1 Thessalonians 5:17',
    },
  },
  30: {
    id: 'one-month',
    title: 'One Month',
    description: 'Thirty days of sacred practice. This is no longer a habit—it is who you are.',
    scripture: {
      text: 'Draw near to God, and he will draw near to you.',
      reference: 'James 4:8',
    },
  },
  60: {
    id: 'two-months',
    title: 'Two Months',
    description: 'Your commitment to prayer is bearing fruit.',
    scripture: {
      text: 'I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit.',
      reference: 'John 15:5',
    },
  },
  100: {
    id: 'century',
    title: 'Century',
    description: 'One hundred days of sacred practice. You are becoming a person of prayer.',
    scripture: {
      text: 'But they who wait for the Lord shall renew their strength.',
      reference: 'Isaiah 40:31',
    },
  },
};

export default function MilestoneModal({ visible, milestone, onClose }: MilestoneModalProps) {
  if (!milestone) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ParticleEffect isActive={visible} />

        <View style={styles.content}>
          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconOuter}>
              <View style={styles.iconInner}>
                <Award size={32} color={colors.textInverse} strokeWidth={1.5} />
              </View>
            </View>
          </View>

          {/* Title */}
          <DisplayText style={styles.title}>{milestone.title}</DisplayText>

          {/* Description */}
          <BodySecondary style={styles.description}>
            {milestone.description}
          </BodySecondary>

          {/* Scripture */}
          <View style={styles.scriptureContainer}>
            <ScriptureText style={styles.scripture}>
              "{milestone.scripture.text}"
            </ScriptureText>
            <ScriptureReference>
              — {milestone.scripture.reference}
            </ScriptureReference>
          </View>

          {/* Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Continue"
              onPress={onClose}
              size="large"
              fullWidth
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  content: {
    backgroundColor: colors.background,
    borderRadius: radius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: spacing.lg,
    marginTop: spacing.md,
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
  title: {
    textAlign: 'center',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  scriptureContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.goldLight,
  },
  scripture: {
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
  },
});
