/**
 * Experience Mode Selection Screen
 * Allows users to choose between wearable and app-only experience
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Watch, Smartphone, ArrowLeft } from 'lucide-react-native';
import { PressableScale } from '@/components/ui/PressableScale';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { colors, spacing, radius, shadows } from '@/lib/design';
import { setExperienceMode, ExperienceMode } from '@/lib/experienceMode';

const { width } = Dimensions.get('window');

interface ExperienceCard {
  id: ExperienceMode;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const EXPERIENCE_OPTIONS: ExperienceCard[] = [
  {
    id: 'wearable',
    icon: <Watch size={32} color={colors.gold} strokeWidth={1.5} />,
    title: 'I Have a Sanctus Device',
    subtitle: 'Yes, I am in the prototype wearable group!',
  },
  {
    id: 'app_only',
    icon: <Smartphone size={32} color={colors.gold} strokeWidth={1.5} />,
    title: 'App Experience',
    subtitle: 'Full contemplative training with guided reminders',
  },
];

export default function ExperienceModeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSelectMode = async (mode: ExperienceMode) => {
    await setExperienceMode(mode);
    router.push('/(auth)/signup');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFDFB', '#F8F5F0', '#EDE8E0']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Back Button */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <AnimatedEntrance delay={0}>
          <PressableScale
            onPress={() => router.back()}
            haptic="light"
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={colors.text} />
          </PressableScale>
        </AnimatedEntrance>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title Section */}
        <AnimatedEntrance delay={100}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Choose Your{'\n'}Experience</Text>
            <Text style={styles.subtitle}>
              How will you practice with Sanctus?
            </Text>
          </View>
        </AnimatedEntrance>

        {/* Experience Cards */}
        <View style={styles.cardsContainer}>
          {EXPERIENCE_OPTIONS.map((option, index) => (
            <AnimatedEntrance key={option.id} delay={200 + index * 100}>
              <PressableScale
                onPress={() => handleSelectMode(option.id)}
                haptic="medium"
                style={styles.cardWrapper}
              >
                <View style={styles.card}>
                  {/* Icon Circle */}
                  <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                      {option.icon}
                    </View>
                  </View>

                  {/* Text Content */}
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{option.title}</Text>
                    <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                  </View>

                  {/* Arrow indicator */}
                  <View style={styles.arrowContainer}>
                    <View style={styles.arrowCircle}>
                      <Text style={styles.arrowText}>→</Text>
                    </View>
                  </View>
                </View>
              </PressableScale>
            </AnimatedEntrance>
          ))}
        </View>

        {/* Footer Note */}
        <AnimatedEntrance delay={400}>
          <View style={styles.footerNote}>
            <Text style={styles.footerText}>
              You can change this later in settings
            </Text>
          </View>
        </AnimatedEntrance>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    paddingBottom: spacing.xxxl,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Georgia',
    fontWeight: '300',
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  cardsContainer: {
    gap: spacing.lg,
  },
  cardWrapper: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.lg,
    ...shadows.md,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.goldFaint,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(184, 134, 11, 0.15)',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  arrowContainer: {
    marginLeft: spacing.sm,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.goldFaint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: colors.gold,
    fontWeight: '600',
  },
  footerNote: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  footerText: {
    fontSize: 14,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
