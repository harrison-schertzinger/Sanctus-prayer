import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform, Image, Animated, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius } from '@/lib/colors';
import { useStorage } from '@/hooks/useStorage';
import { useTrackerStats } from '@/hooks/useTrackerStats';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { PressableScale } from '@/components/ui/PressableScale';
import { GoldButton } from '@/components/ui/PremiumButton';
import { KPIBar } from '@/components/ui/KPIBar';
import { ConcentricTimerSelector } from '@/components/ui/ConcentricTimerSelector';
import { TimerStatsBar } from '@/components/ui/TimerStatsBar';

// Practice data
const practice = {
  name: 'Peace in His Presence',
  subtitle: 'Trust & Surrender',
  currentDay: 12,
  totalDays: 40,
  breathIn: 'My Lord and My God',
  breathOut: 'Jesus, I Trust in You',
  description: 'A 40-day journey of surrendering anxiety and cultivating deep trust in God\'s providence through contemplative prayer.',
};

export default function PrayerScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [timerValues, setTimerValues] = useState({
    preparation: 5,  // seconds
    interval: 5,     // minutes
    total: 15,       // minutes
  });

  const chevronRotation = useRef(new Animated.Value(0)).current;

  const { sessions } = useStorage();
  const stats = useTrackerStats(sessions);

  const handleBegin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: '/practice/[id]',
      params: {
        id: 'peace',
        duration: timerValues.total.toString(),
        preparation: timerValues.preparation.toString(),
        interval: timerValues.interval.toString(),
      },
    });
  };

  const toggleExpanded = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Animate chevron rotation
    Animated.spring(chevronRotation, {
      toValue: expanded ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
    }).start();

    // Animate layout change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const chevronStyle = {
    transform: [{
      rotate: chevronRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    }],
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* KPI Stats Bar */}
        <AnimatedEntrance delay={0}>
          <KPIBar
            stats={[
              { label: 'Streak', value: stats.currentStreak, color: '#E67E22' },
              { label: 'Minutes', value: stats.totalMinutes, color: colors.primary },
              { label: 'Sessions', value: stats.totalSessions },
            ]}
          />
        </AnimatedEntrance>

        {/* Expandable Practice Card */}
        <AnimatedEntrance delay={50}>
          <PressableScale scaleValue={0.98} haptic="light" onPress={toggleExpanded}>
            <View style={styles.practiceCard}>
              {/* Cover Image */}
              <Image
                source={require('@/assets/peace-in-his-presence.png')}
                style={styles.practiceImage}
                resizeMode="cover"
              />
              {/* Gradient overlay for text legibility */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.75)']}
                style={styles.imageOverlay}
              >
                <Text style={styles.practiceLabel}>SANCTUS TRAINING</Text>
                <Text style={styles.practiceTitle}>PEACE</Text>
                <Text style={styles.practiceSubtitle}>— in His —</Text>
                <Text style={styles.practiceTitle}>PRESENCE</Text>

                {/* Expand indicator */}
                <View style={styles.expandIndicator}>
                  <Text style={styles.expandText}>
                    {expanded ? 'Tap to collapse' : 'Tap for details'}
                  </Text>
                  <Animated.View style={chevronStyle}>
                    <ChevronDown size={16} color="rgba(255,255,255,0.7)" strokeWidth={2} />
                  </Animated.View>
                </View>
              </LinearGradient>

              {/* Day badge */}
              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>
                  Day {practice.currentDay} of {practice.totalDays}
                </Text>
              </View>
            </View>
          </PressableScale>

          {/* Expanded Sacred Phrases Section */}
          {expanded && (
            <View style={styles.expandedContent}>
              <View style={styles.phrasesSection}>
                <Text style={styles.phrasesLabel}>THE SACRED PHRASES</Text>
                <View style={styles.phraseRow}>
                  <Text style={styles.breathLabel}>Breathe In:</Text>
                  <Text style={styles.phraseText}>{practice.breathIn}</Text>
                </View>
                <View style={styles.phraseRow}>
                  <Text style={styles.breathLabel}>Breathe Out:</Text>
                  <Text style={styles.phraseText}>{practice.breathOut}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>{practice.description}</Text>
                </View>
              </View>
            </View>
          )}
        </AnimatedEntrance>

        {/* Timer Selector */}
        <AnimatedEntrance delay={100}>
          <View style={styles.timerSection}>
            <TimerStatsBar
              preparation={timerValues.preparation}
              interval={timerValues.interval}
              total={timerValues.total}
            />
            <View style={styles.timerContainer}>
              <ConcentricTimerSelector
                values={timerValues}
                onChange={setTimerValues}
              />
            </View>
          </View>
        </AnimatedEntrance>

        {/* Begin Button */}
        <AnimatedEntrance delay={150}>
          <GoldButton onPress={handleBegin}>
            Begin Practice
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

  // Practice Card with Image
  practiceCard: {
    height: 240,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  practiceImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.xl,
  },
  practiceLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.sm,
  },
  practiceTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    fontFamily: 'Georgia',
    letterSpacing: 2,
  },
  practiceSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Georgia',
    marginVertical: -4,
  },
  dayBadge: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  dayBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Expand indicator
  expandIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  expandText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.5,
  },

  // Expanded content
  expandedContent: {
    marginTop: -radius.xl, // Overlap with card
    paddingTop: radius.xl + spacing.md,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  phrasesSection: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  phrasesLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.gold,
    marginBottom: spacing.md,
  },
  phraseRow: {
    marginBottom: spacing.sm,
  },
  breathLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 2,
  },
  phraseText: {
    fontSize: 17,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: colors.text,
  },
  descriptionContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },

  // Timer Section
  timerSection: {
    alignItems: 'center',
    gap: spacing.md,
  },
  timerContainer: {
    // Circles sit below the stats bar
  },

  bottomSpacer: {
    height: spacing.xl,
  },
});
