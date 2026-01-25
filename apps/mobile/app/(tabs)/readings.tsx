import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { colors, spacing, radius } from '@/lib/colors';
import { getTodayReading, formatDate } from '@/lib/content';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { GoldButton } from '@/components/ui/PremiumButton';
import { FloatingCard } from '@/components/ui/FloatingCard';
import { ScriptureCardSkeleton, ReflectionCardSkeleton } from '@/components/ui/Skeleton';

export default function ReadingsScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [todayReading, setTodayReading] = useState<ReturnType<typeof getTodayReading> | null>(null);
  const today = formatDate().toUpperCase();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTodayReading(getTodayReading());
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleBeginPrayer = () => {
    router.push('/(tabs)/prayer');
  };

  // Loading state
  if (isLoading || !todayReading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.dateLabel}>{today}</Text>
          <View style={{ marginBottom: spacing.lg }}>
            <ScriptureCardSkeleton />
          </View>
          <ReflectionCardSkeleton />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Label */}
        <AnimatedEntrance delay={0}>
          <Text style={styles.dateLabel}>{today}</Text>
        </AnimatedEntrance>

        {/* Scripture Card */}
        <AnimatedEntrance delay={50}>
          <FloatingCard accent={colors.gold} elevation="default">
            <Text style={styles.scriptureText}>"{todayReading.scripture.text}"</Text>
            <Text style={styles.scriptureReference}>— {todayReading.scripture.reference}</Text>
          </FloatingCard>
        </AnimatedEntrance>

        {/* Reflection Card */}
        <AnimatedEntrance delay={100}>
          <FloatingCard elevation="subtle" style={styles.reflectionCard}>
            <Text style={styles.sectionLabel}>TODAY'S REFLECTION</Text>
            <Text style={styles.reflectionText}>{todayReading.reflection}</Text>

            {todayReading.quote && (
              <View style={styles.quoteContainer}>
                <Text style={styles.quoteText}>"{todayReading.quote.text}"</Text>
                <Text style={styles.quoteAuthor}>— {todayReading.quote.author}</Text>
              </View>
            )}
          </FloatingCard>
        </AnimatedEntrance>

        {/* CTA Button - Premium iOS style */}
        <AnimatedEntrance delay={150}>
          <GoldButton onPress={handleBeginPrayer}>
            Begin Prayer
          </GoldButton>
        </AnimatedEntrance>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },

  // Date Label
  dateLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },

  // Scripture
  scriptureText: {
    fontFamily: 'Georgia',
    fontSize: 21,
    fontStyle: 'italic',
    lineHeight: 32,
    color: colors.text,
    marginBottom: spacing.md,
  },
  scriptureReference: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'right',
    letterSpacing: 0.3,
  },

  // Reflection Card
  reflectionCard: {
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.gold,
    marginBottom: spacing.md,
  },
  reflectionText: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.text,
  },
  quoteContainer: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  quoteText: {
    fontFamily: 'Georgia',
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  quoteAuthor: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },

  bottomSpacer: {
    height: spacing.xl,
  },
});
