import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform, Image, Animated, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, Wind, BookOpen, Heart } from 'lucide-react-native';
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

          {/* Expanded Prayer Journey - Seamless dark panel */}
          {expanded && (
            <View style={styles.expandedContent}>
              {/* Phase 1: Recollection */}
              <View style={styles.phaseSection}>
                <View style={styles.phaseHeader}>
                  <View style={[styles.phaseAccent, { backgroundColor: '#1A365D' }]} />
                  <View style={styles.phaseHeaderContent}>
                    <View style={styles.phaseTitleRow}>
                      <Wind size={18} color="#7BA3D4" strokeWidth={2} />
                      <Text style={styles.phaseNumber}>01</Text>
                    </View>
                    <Text style={[styles.phaseTitle, { color: '#7BA3D4' }]}>Recollection</Text>
                    <Text style={styles.phaseSubtitle}>Sacred Breathwork</Text>
                  </View>
                </View>
                <View style={styles.phaseBody}>
                  <Text style={styles.phaseDescription}>
                    Center yourself in God's presence. Let go of distractions through rhythmic breathing paired with sacred phrases.
                  </Text>
                  <View style={styles.breathContainer}>
                    <View style={styles.breathRow}>
                      <Text style={styles.breathDirection}>Inhale</Text>
                      <Text style={styles.breathPhrase}>{practice.breathIn}</Text>
                    </View>
                    <View style={[styles.breathRow, { marginBottom: 0 }]}>
                      <Text style={styles.breathDirection}>Exhale</Text>
                      <Text style={styles.breathPhrase}>{practice.breathOut}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Phase 2: Contemplation */}
              <View style={styles.phaseSection}>
                <View style={styles.phaseHeader}>
                  <View style={[styles.phaseAccent, { backgroundColor: '#B8860B' }]} />
                  <View style={styles.phaseHeaderContent}>
                    <View style={styles.phaseTitleRow}>
                      <BookOpen size={18} color="#D4AF37" strokeWidth={2} />
                      <Text style={styles.phaseNumber}>02</Text>
                    </View>
                    <Text style={[styles.phaseTitle, { color: '#D4AF37' }]}>Contemplation</Text>
                    <Text style={styles.phaseSubtitle}>Scriptural Meditation</Text>
                  </View>
                </View>
                <View style={styles.phaseBody}>
                  <Text style={styles.phaseDescription}>
                    Rest in Scripture. Allow God's Word to wash over you—not analyzing, but receiving. Let truth sink deep into your heart, cultivating trust in His providence.
                  </Text>
                </View>
              </View>

              {/* Phase 3: Praise, Petition, Visualization */}
              <View style={[styles.phaseSection, { borderBottomWidth: 0 }]}>
                <View style={styles.phaseHeader}>
                  <View style={[styles.phaseAccent, { backgroundColor: '#722F37' }]} />
                  <View style={styles.phaseHeaderContent}>
                    <View style={styles.phaseTitleRow}>
                      <Heart size={18} color="#C4737B" strokeWidth={2} />
                      <Text style={styles.phaseNumber}>03</Text>
                    </View>
                    <Text style={[styles.phaseTitle, { color: '#C4737B' }]}>Praise & Petition</Text>
                    <Text style={styles.phaseSubtitle}>Active, Imaginative Prayer</Text>
                  </View>
                </View>
                <View style={styles.phaseBody}>
                  <Text style={styles.phaseDescription}>
                    Engage your heart and imagination in active communion with God:
                  </Text>
                  <View style={styles.actionList}>
                    <View style={styles.actionItem}>
                      <Text style={styles.actionLabel}>Gratitude</Text>
                      <Text style={styles.actionText}>Thank God for specific blessings in your life</Text>
                    </View>
                    <View style={styles.actionItem}>
                      <Text style={styles.actionLabel}>Petition</Text>
                      <Text style={styles.actionText}>Present your needs and desires to Him with trust</Text>
                    </View>
                    <View style={styles.actionItem}>
                      <Text style={styles.actionLabel}>Visualize</Text>
                      <Text style={styles.actionText}>See and emotionally embrace your goals as already fulfilled through His grace</Text>
                    </View>
                  </View>
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

  // Expanded content - Seamless dark panel
  expandedContent: {
    marginTop: -radius.xl - 1,
    backgroundColor: '#141414',
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    overflow: 'hidden',
  },

  // Phase Section - Seamless tile
  phaseSection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  phaseHeader: {
    flexDirection: 'row',
  },
  phaseAccent: {
    width: 4,
  },
  phaseHeaderContent: {
    flex: 1,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  phaseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  phaseNumber: {
    fontSize: 24,
    fontWeight: '200',
    color: 'rgba(255,255,255,0.15)',
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  phaseSubtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.5)',
  },
  phaseBody: {
    paddingLeft: 4 + spacing.lg, // Align with header content
    paddingRight: spacing.lg,
    paddingBottom: spacing.lg,
  },
  phaseDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.7)',
  },

  // Breath Container
  breathContainer: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(26, 54, 93, 0.2)',
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  breathRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  breathDirection: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#7BA3D4',
    textTransform: 'uppercase',
    width: 55,
  },
  breathPhrase: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: '#FFFFFF',
  },

  // Action List for Phase 3
  actionList: {
    marginTop: spacing.md,
  },
  actionItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  actionLabel: {
    width: 80,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#C4737B',
    textTransform: 'uppercase',
  },
  actionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.6)',
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
