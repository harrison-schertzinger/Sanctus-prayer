/**
 * Journey Start Screen - Shown after signup for new users
 * Welcomes them to Day 1 of their 40-day journey
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sun, BookOpen, Heart, Moon } from 'lucide-react-native';
import { GradientButton } from '@/components/ui/GradientButton';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { colors, spacing, radius } from '@/lib/design';

const { width } = Dimensions.get('window');

interface DailyRhythmItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DAILY_RHYTHM: DailyRhythmItem[] = [
  {
    icon: <Sun size={20} color={colors.gold} strokeWidth={1.5} />,
    title: 'Morning Reading',
    description: 'Start with Scripture',
  },
  {
    icon: <Heart size={20} color={colors.gold} strokeWidth={1.5} />,
    title: 'Sacred Center',
    description: 'Contemplative prayer',
  },
  {
    icon: <BookOpen size={20} color={colors.gold} strokeWidth={1.5} />,
    title: 'Divine Rhythm',
    description: 'Breath & presence',
  },
  {
    icon: <Moon size={20} color={colors.gold} strokeWidth={1.5} />,
    title: 'Night Prayer',
    description: 'Compline at day\'s end',
  },
];

export default function JourneyStartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, updateProfile } = useAuth();

  // Set journey start date when this screen mounts
  useEffect(() => {
    const initializeJourney = async () => {
      if (user && isSupabaseConfigured()) {
        const today = new Date().toISOString().split('T')[0];
        await updateProfile({
          journey_start_date: today,
          current_journey_day: 1,
        });
      }
    };
    initializeJourney();
  }, [user]);

  const handleEnterSanctus = () => {
    router.replace('/(tabs)/readings');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F5F0', '#EDE8E0', '#E5DFD5']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.content, { paddingTop: insets.top + 40 }]}>
        {/* Day Badge */}
        <AnimatedEntrance delay={100}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>DAY 1</Text>
          </View>
        </AnimatedEntrance>

        {/* Title */}
        <AnimatedEntrance delay={200}>
          <Text style={styles.title}>Your Journey{'\n'}Begins Today</Text>
        </AnimatedEntrance>

        {/* Scripture */}
        <AnimatedEntrance delay={300}>
          <View style={styles.scriptureContainer}>
            <Text style={styles.scripture}>
              "The Lord your God is with you wherever you go"
            </Text>
            <Text style={styles.scriptureRef}>— Joshua 1:9</Text>
          </View>
        </AnimatedEntrance>

        {/* Daily Rhythm Section */}
        <AnimatedEntrance delay={400}>
          <View style={styles.rhythmSection}>
            <Text style={styles.rhythmTitle}>Your Daily Rhythm</Text>
            <Text style={styles.rhythmSubtitle}>
              Four sacred moments each day
            </Text>

            <View style={styles.rhythmList}>
              {DAILY_RHYTHM.map((item, index) => (
                <View key={item.title} style={styles.rhythmItem}>
                  <View style={styles.rhythmIcon}>{item.icon}</View>
                  <View style={styles.rhythmText}>
                    <Text style={styles.rhythmItemTitle}>{item.title}</Text>
                    <Text style={styles.rhythmItemDesc}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </AnimatedEntrance>

        {/* 40 Days Note */}
        <AnimatedEntrance delay={500}>
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              40 days of intentional prayer will transform your relationship with God.
              Each day builds upon the last.
            </Text>
          </View>
        </AnimatedEntrance>
      </View>

      {/* Enter Button */}
      <View style={[styles.actions, { paddingBottom: insets.bottom + 24 }]}>
        <AnimatedEntrance delay={600}>
          <GradientButton
            onPress={handleEnterSanctus}
            size="large"
            style={styles.enterButton}
          >
            Enter Sanctus
          </GradientButton>
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  dayBadge: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    marginBottom: spacing.lg,
  },
  dayBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.textInverse,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Georgia',
    fontWeight: '300',
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 46,
    marginBottom: spacing.lg,
  },
  scriptureContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  scripture: {
    fontSize: 18,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: spacing.xs,
  },
  scriptureRef: {
    fontSize: 14,
    color: colors.gold,
    fontWeight: '500',
  },
  rhythmSection: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  rhythmTitle: {
    fontSize: 18,
    fontFamily: 'Georgia',
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  rhythmSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  rhythmList: {
    gap: spacing.md,
  },
  rhythmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rhythmIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.goldFaint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rhythmText: {
    flex: 1,
  },
  rhythmItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  rhythmItemDesc: {
    fontSize: 13,
    color: colors.textMuted,
  },
  noteContainer: {
    paddingHorizontal: spacing.md,
  },
  noteText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  actions: {
    paddingHorizontal: spacing.xl,
  },
  enterButton: {
    width: '100%',
  },
});
