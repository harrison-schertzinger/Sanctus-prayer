import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform, Image, Animated, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, Wind, BookOpen, Heart } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius } from '@/lib/colors';
import { practices } from '@/lib/content';
import { useStorage } from '@/hooks/useStorage';
import { useTrackerStats } from '@/hooks/useTrackerStats';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { PressableScale } from '@/components/ui/PressableScale';
import { GoldButton } from '@/components/ui/PremiumButton';
import { KPIBar } from '@/components/ui/KPIBar';
import { ConcentricTimerSelector } from '@/components/ui/ConcentricTimerSelector';
import { TimerStatsBar } from '@/components/ui/TimerStatsBar';
import { SettingsGear } from '@/components/ui/SettingsGear';
import { useAuth } from '@/contexts/AuthContext';

// 40-day journey configuration
const TOTAL_DAYS = 40;

function getJourneyDay(journeyStartDate: string | null | undefined): number {
  if (!journeyStartDate) return 1;
  const start = new Date(journeyStartDate);
  start.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(diffDays + 1, TOTAL_DAYS));
}

export default function PrayerScreen() {
  const router = useRouter();
  const [peaceExpanded, setPeaceExpanded] = useState(false);
  const [timerValues, setTimerValues] = useState({
    preparation: 5,  // seconds
    interval: 5,     // minutes
    total: 15,       // minutes
  });

  const peaceChevronRotation = useRef(new Animated.Value(0)).current;

  const { profile } = useAuth();
  const { sessions } = useStorage();
  const stats = useTrackerStats(sessions);
  const journeyDay = getJourneyDay(profile?.journey_start_date);

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

  const togglePeaceExpanded = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Animated.spring(peaceChevronRotation, {
      toValue: peaceExpanded ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
    }).start();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPeaceExpanded(!peaceExpanded);
  };

  const peaceChevronStyle = {
    transform: [{
      rotate: peaceChevronRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    }],
  };

  const peace = practices.peace;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <SettingsGear />
      </View>

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

        {/* ===== PEACE PRACTICE CARD ===== */}
        <AnimatedEntrance delay={50}>
          <PressableScale scaleValue={0.98} haptic="light" onPress={togglePeaceExpanded}>
            <View style={styles.practiceCard}>
              {/* Cover Image */}
              <Image
                source={require('@/assets/peace-in-his-presence.png')}
                style={styles.practiceImage}
                resizeMode="cover"
              />

              {/* Top row: Label + Day Badge */}
              <View style={styles.topRow}>
                <Text style={styles.practiceLabel}>SANCTUS TRAINING</Text>
                <View style={styles.dayBadge}>
                  <Text style={styles.dayBadgeText}>
                    Day {journeyDay} of {TOTAL_DAYS}
                  </Text>
                </View>
              </View>

              {/* Gradient overlay */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.imageOverlay}
              >
                <Text style={styles.practiceTitle}>PEACE</Text>
                <Text style={styles.practiceSubtitle}>— in His —</Text>
                <Text style={styles.practiceTitle}>PRESENCE</Text>

                <View style={styles.expandIndicator}>
                  <Text style={styles.expandText}>
                    {peaceExpanded ? 'Tap to collapse' : 'Tap for details'}
                  </Text>
                  <Animated.View style={peaceChevronStyle}>
                    <ChevronDown size={14} color="rgba(255,255,255,0.6)" strokeWidth={2} />
                  </Animated.View>
                </View>
              </LinearGradient>
            </View>
          </PressableScale>

          {/* Expanded Peace Details */}
          {peaceExpanded && (
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
                    <Text style={styles.phaseSubtitle}>Sacred Stillness</Text>
                  </View>
                </View>
                <View style={styles.phaseBody}>
                  <Text style={styles.phaseDescription}>
                    Collect yourself in God's presence. Release distractions through rhythmic breathing. The breath is your only anchor—no words, only presence.
                  </Text>
                  <View style={styles.breathPatternContainer}>
                    <Text style={styles.breathPatternLabel}>4-7-8 BREATH</Text>
                    <View style={styles.breathPatternRow}>
                      <Text style={styles.breathPatternPhase}>Inhale</Text>
                      <Text style={styles.breathPatternTiming}>4 seconds</Text>
                    </View>
                    <View style={styles.breathPatternRow}>
                      <Text style={styles.breathPatternPhase}>Hold</Text>
                      <Text style={styles.breathPatternTiming}>7 seconds</Text>
                    </View>
                    <View style={styles.breathPatternRow}>
                      <Text style={styles.breathPatternPhase}>Exhale</Text>
                      <Text style={styles.breathPatternTiming}>8 seconds</Text>
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
                    <Text style={styles.phaseSubtitle}>Breath Prayer</Text>
                  </View>
                </View>
                <View style={styles.phaseBody}>
                  <Text style={styles.phaseDescription}>
                    Rest in God's presence with ancient words. Not analyzing—receiving. Let each breath draw you deeper into trust.
                  </Text>
                  <View style={styles.breathContainer}>
                    <View style={styles.breathRow}>
                      <Text style={styles.breathDirection}>Inhale</Text>
                      <Text style={styles.breathPhrase}>{peace.phases.contemplation.inhalePhrase}</Text>
                    </View>
                    <View style={[styles.breathRow, { marginBottom: 0 }]}>
                      <Text style={styles.breathDirection}>Exhale</Text>
                      <Text style={styles.breathPhrase}>{peace.phases.contemplation.exhalePhrase}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Phase 3: Praise & Petition */}
              <View style={[styles.phaseSection, { borderBottomWidth: 0 }]}>
                <View style={styles.phaseHeader}>
                  <View style={[styles.phaseAccent, { backgroundColor: '#722F37' }]} />
                  <View style={styles.phaseHeaderContent}>
                    <View style={styles.phaseTitleRow}>
                      <Heart size={18} color="#C4737B" strokeWidth={2} />
                      <Text style={styles.phaseNumber}>03</Text>
                    </View>
                    <Text style={[styles.phaseTitle, { color: '#C4737B' }]}>Praise & Petition</Text>
                    <Text style={styles.phaseSubtitle}>Active Prayer</Text>
                  </View>
                </View>
                <View style={styles.phaseBody}>
                  <Text style={styles.phaseDescription}>
                    Engage your heart in active communion with God:
                  </Text>
                  <View style={styles.actionList}>
                    <View style={styles.actionItem}>
                      <Text style={styles.actionLabel}>Gratitude</Text>
                      <Text style={styles.actionText}>Thank God for specific blessings in your life</Text>
                    </View>
                    <View style={styles.actionItem}>
                      <Text style={styles.actionLabel}>Petition</Text>
                      <Text style={styles.actionText}>Bring your needs, hopes, and intercessions to Him with trust</Text>
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
Begin Peace Practice
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },

  // Practice Card with Image - Compact height
  practiceCard: {
    height: 156,
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
    height: '150%', // Oversized to allow cropping
    top: '-25%',    // Shift up to show hands, crop sky
  },
  topRow: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  practiceLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.8)',
  },
  practiceTitle: {
    fontSize: 26,
    fontWeight: '300',
    color: '#FFFFFF',
    fontFamily: 'Georgia',
    letterSpacing: 1.5,
  },
  practiceSubtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Georgia',
    marginVertical: -2,
  },
  dayBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  dayBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Expand indicator
  expandIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  expandText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
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

  // Breath Pattern Container (Phase 1 - Recollection)
  breathPatternContainer: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(26, 54, 93, 0.15)',
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  breathPatternLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#7BA3D4',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  breathPatternRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  breathPatternPhase: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  breathPatternTiming: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7BA3D4',
  },

  // Breath Prayer Container (Phase 2 - Contemplation)
  breathContainer: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(184, 134, 11, 0.15)',
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
    color: '#D4AF37',
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
    gap: spacing.sm,
  },
  timerContainer: {
    // Circles sit below the stats bar
  },

  bottomSpacer: {
    height: spacing.xl,
  },
});
