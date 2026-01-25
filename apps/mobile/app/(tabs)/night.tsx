import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Moon, Sun, Cloud, Sunrise, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius, shadows } from '@/lib/colors';
import { getTodayNightScripture } from '@/lib/content';
import { useStorage } from '@/hooks/useStorage';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { NightButton } from '@/components/ui/PremiumButton';

// Examen sections
const EXAMEN_SECTIONS = [
  {
    id: 'consolation',
    title: 'Consolation',
    subtitle: 'Where did you feel God today?',
    icon: Sun,
    prompts: [
      'What moment brought you peace?',
      'When did you feel most alive?',
      'What are you grateful for?',
    ],
  },
  {
    id: 'desolation',
    title: 'Desolation',
    subtitle: 'What weighed on you?',
    icon: Cloud,
    prompts: [
      'What caused anxiety or stress?',
      'Where did you feel distant from God?',
      'What do you need to release?',
    ],
  },
  {
    id: 'tomorrow',
    title: 'Tomorrow',
    subtitle: 'What will you carry forward?',
    icon: Sunrise,
    prompts: [
      'What grace do you need?',
      'Who needs your prayers?',
      'What intention will you hold?',
    ],
  },
];

export default function NightScreen() {
  const nightScripture = getTodayNightScripture();
  const { saveSession } = useStorage();
  const [completed, setCompleted] = useState(false);

  const handleComplete = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await saveSession({
      practice: 'night',
      duration: 5,
      date: new Date().toISOString().split('T')[0],
    });
    setCompleted(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Light status bar for dark background */}
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <AnimatedEntrance delay={0}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Moon size={24} color={colors.night.gold} strokeWidth={1.5} />
          </View>
          <Text style={styles.label}>THE EXAMEN</Text>
          <Text style={styles.title}>Evening Reflection</Text>
        </View>
        </AnimatedEntrance>

        {/* Opening Scripture */}
        <AnimatedEntrance delay={100}>
        <View style={styles.scriptureCard}>
          <View style={styles.goldAccent} />
          <View style={styles.scriptureContent}>
            <Text style={styles.scriptureText}>"{nightScripture.text}"</Text>
            <Text style={styles.scriptureRef}>— {nightScripture.reference}</Text>
          </View>
        </View>
        </AnimatedEntrance>

        {/* Examen Sections */}
        {EXAMEN_SECTIONS.map((section, index) => {
          const Icon = section.icon;
          return (
            <AnimatedEntrance key={section.id} delay={200 + index * 100}>
            <View style={styles.examSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Icon size={20} color={colors.night.gold} strokeWidth={1.5} />
                </View>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
                </View>
                <Text style={styles.sectionNumber}>{index + 1}</Text>
              </View>

              <View style={styles.promptsContainer}>
                {section.prompts.map((prompt, promptIndex) => (
                  <View key={promptIndex} style={styles.promptItem}>
                    <View style={styles.promptDot} />
                    <Text style={styles.promptText}>{prompt}</Text>
                  </View>
                ))}
              </View>

              {/* Pause indicator */}
              <View style={styles.pauseContainer}>
                <View style={styles.pauseLine} />
                <Text style={styles.pauseText}>pause • reflect • release</Text>
                <View style={styles.pauseLine} />
              </View>
            </View>
            </AnimatedEntrance>
          );
        })}

        {/* Closing */}
        <AnimatedEntrance delay={500}>
        <View style={styles.closingSection}>
          <Text style={styles.closingLabel}>CLOSING PRAYER</Text>
          <Text style={styles.closingText}>
            Lord, I surrender this day to You.{'\n'}
            Take what was broken and make it whole.{'\n'}
            Take what was good and multiply it.{'\n'}
            Grant me peaceful rest,{'\n'}
            that I may rise to serve You again.{'\n'}
            Amen.
          </Text>
        </View>
        </AnimatedEntrance>

        {/* Rest Message */}
        <AnimatedEntrance delay={600}>
        <View style={styles.restMessage}>
          <Moon size={18} color={colors.night.gold} strokeWidth={1.5} />
          <Text style={styles.restText}>Rest well. God holds your tomorrow.</Text>
        </View>
        </AnimatedEntrance>

        {/* Complete Night Prayer Button */}
        <AnimatedEntrance delay={700}>
        {!completed ? (
          <NightButton onPress={handleComplete}>
            Complete Night Prayer
          </NightButton>
        ) : (
          <View style={styles.completedState}>
            <View style={styles.completedIcon}>
              <Check size={24} color={colors.night.background} strokeWidth={3} />
            </View>
            <Text style={styles.completedText}>Night Prayer Complete</Text>
            <Text style={styles.completedSubtext}>May your rest be peaceful</Text>
          </View>
        )}
        </AnimatedEntrance>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.night.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.night.goldFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: colors.night.gold,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    color: colors.night.text,
    fontFamily: 'Georgia',
  },

  // Scripture Card
  scriptureCard: {
    backgroundColor: colors.night.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    flexDirection: 'row',
  },
  goldAccent: {
    width: 4,
    backgroundColor: colors.night.gold,
  },
  scriptureContent: {
    flex: 1,
    padding: spacing.lg,
  },
  scriptureText: {
    fontFamily: 'Georgia',
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 28,
    color: colors.night.text,
    marginBottom: spacing.sm,
  },
  scriptureRef: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.night.gold,
    textAlign: 'right',
  },

  // Examen Sections
  examSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.night.goldFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.night.text,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.night.textSecondary,
    marginTop: 2,
  },
  sectionNumber: {
    fontSize: 28,
    fontWeight: '200',
    color: colors.night.gold,
    opacity: 0.4,
  },
  promptsContainer: {
    backgroundColor: colors.night.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    paddingVertical: spacing.sm,
  },
  promptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  promptDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.night.gold,
    opacity: 0.5,
    marginRight: spacing.md,
  },
  promptText: {
    fontSize: 15,
    color: colors.night.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  pauseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  pauseLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.night.surfaceBorder,
  },
  pauseText: {
    fontSize: 10,
    color: colors.night.gold,
    opacity: 0.5,
    letterSpacing: 1.5,
    marginHorizontal: spacing.md,
    textTransform: 'uppercase',
  },

  // Closing Section
  closingSection: {
    backgroundColor: colors.night.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.night.surfaceBorder,
  },
  closingLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: colors.night.gold,
    marginBottom: spacing.md,
  },
  closingText: {
    fontFamily: 'Georgia',
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 26,
    color: colors.night.text,
    textAlign: 'center',
  },

  // Rest Message
  restMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  restText: {
    fontSize: 14,
    color: colors.night.textSecondary,
    fontStyle: 'italic',
  },

  // Complete Button - Soft gold glow on dark
  completeButton: {
    backgroundColor: colors.night.gold,
    borderRadius: radius.md,
    paddingVertical: 18,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    // Soft glow effect
    shadowColor: colors.night.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.night.background,
    letterSpacing: 0.3,
  },

  // Completed State
  completedState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  completedIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.night.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.night.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  completedText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.night.text,
    marginBottom: spacing.xs,
  },
  completedSubtext: {
    fontSize: 14,
    color: colors.night.textSecondary,
    fontStyle: 'italic',
  },

  bottomSpacer: {
    height: spacing.xl,
  },
});
