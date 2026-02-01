import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Platform, TouchableOpacity, LayoutAnimation, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, BookOpen, Heart, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius } from '@/lib/colors';
import { useStorage } from '@/hooks/useStorage';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { NightButton } from '@/components/ui/PremiumButton';
import { fetchNightPrayer } from '@/lib/liturgy/api';
import { NightPrayerContent } from '@/lib/liturgy/types';
import { getFallbackNightPrayer } from '@/lib/liturgy/fallback';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Days of the week for Compline
const DAYS = [
  { key: 0, label: 'Sun', full: 'Sunday' },
  { key: 1, label: 'Mon', full: 'Monday' },
  { key: 2, label: 'Tue', full: 'Tuesday' },
  { key: 3, label: 'Wed', full: 'Wednesday' },
  { key: 4, label: 'Thu', full: 'Thursday' },
  { key: 5, label: 'Fri', full: 'Friday' },
  { key: 6, label: 'Sat', full: 'Saturday' },
];

export default function NightScreen() {
  const { saveSession } = useStorage();
  const [completed, setCompleted] = useState(false);
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDay());
  const [nightPrayer, setNightPrayer] = useState<NightPrayerContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  // Today's day of week (0-6)
  const today = new Date().getDay();

  // Load night prayer when day changes
  useEffect(() => {
    loadNightPrayer(selectedDay);
  }, [selectedDay]);

  const loadNightPrayer = async (dayOfWeek: number) => {
    setIsLoading(true);
    try {
      // Create a date for the selected day of week
      const targetDate = new Date();
      const currentDay = targetDate.getDay();
      const diff = dayOfWeek - currentDay;
      targetDate.setDate(targetDate.getDate() + diff);

      const prayer = await fetchNightPrayer(targetDate);
      setNightPrayer(prayer);
    } catch (error) {
      // Fallback to default content
      setNightPrayer(getFallbackNightPrayer(new Date()));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDayChange = (dayKey: number) => {
    if (dayKey !== selectedDay) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSelectedDay(dayKey);
      // Scroll content to top when changing days
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleComplete = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await saveSession({
      practice: 'night',
      duration: 10,
      date: new Date().toISOString().split('T')[0],
    });
    setCompleted(true);
  };

  // Show loading or fallback if no content
  if (!nightPrayer) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Preparing Night Prayer...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      {/* Day of Week Tabs */}
      <View style={styles.dayTabsContainer}>
        {DAYS.map((day) => {
          const isSelected = day.key === selectedDay;
          const isToday = day.key === today;
          return (
            <TouchableOpacity
              key={day.key}
              style={[
                styles.dayTab,
                isSelected && styles.dayTabSelected,
              ]}
              onPress={() => handleDayChange(day.key)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.dayTabText,
                isSelected && styles.dayTabTextSelected,
              ]}>
                {day.label}
              </Text>
              {isToday && (
                <View style={[
                  styles.todayDot,
                  isSelected && styles.todayDotSelected,
                ]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Night Prayer Header Card */}
        <AnimatedEntrance delay={0}>
          <View style={styles.headerCard}>
            <Image
              source={require('@/assets/peace-in-his-presence.png')}
              style={styles.headerImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(20,20,30,0.3)', 'rgba(20,20,30,0.9)']}
              style={styles.headerOverlay}
            >
              <Text style={styles.headerLabel}>LITURGY OF THE HOURS</Text>
              <Text style={styles.headerTitle}>NIGHT</Text>
              <Text style={styles.headerSubtitle}>— Prayer —</Text>
              <Text style={styles.headerTitle}>COMPLINE</Text>
              <Text style={styles.dayLabel}>{DAYS[selectedDay].full}</Text>
            </LinearGradient>
          </View>
        </AnimatedEntrance>

        {/* Liturgy Content - Seamless dark panel */}
        <AnimatedEntrance delay={100}>
          <View style={styles.liturgyPanel}>
            {/* Psalm */}
            <View style={styles.liturgySection}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#1A365D' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <BookOpen size={16} color="#7BA3D4" strokeWidth={2} />
                    <Text style={styles.sectionNumber}>01</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: '#7BA3D4' }]}>Psalmody</Text>
                  <Text style={styles.sectionSubtitle}>{nightPrayer.psalm.reference}</Text>
                </View>
              </View>
              <View style={styles.sectionBody}>
                <Text style={styles.antiphon}>{nightPrayer.psalm.antiphon}</Text>
                <Text style={styles.liturgyText}>{nightPrayer.psalm.text}</Text>
              </View>
            </View>

            {/* Reading */}
            <View style={styles.liturgySection}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#B8860B' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <BookOpen size={16} color="#D4AF37" strokeWidth={2} />
                    <Text style={styles.sectionNumber}>02</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: '#D4AF37' }]}>Reading</Text>
                  <Text style={styles.sectionSubtitle}>{nightPrayer.reading.reference}</Text>
                </View>
              </View>
              <View style={styles.sectionBody}>
                <Text style={styles.liturgyText}>{nightPrayer.reading.text}</Text>
              </View>
            </View>

            {/* Responsory */}
            <View style={styles.liturgySection}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#4A5568' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <Moon size={16} color="#A0AEC0" strokeWidth={2} />
                    <Text style={styles.sectionNumber}>03</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: '#A0AEC0' }]}>Responsory</Text>
                </View>
              </View>
              <View style={styles.sectionBody}>
                <View style={styles.responsoryRow}>
                  <Text style={styles.responsoryLabel}>V.</Text>
                  <Text style={styles.responsoryText}>{nightPrayer.responsory.versicle}</Text>
                </View>
                <View style={styles.responsoryRow}>
                  <Text style={styles.responsoryLabel}>R.</Text>
                  <Text style={styles.responsoryText}>{nightPrayer.responsory.response}</Text>
                </View>
              </View>
            </View>

            {/* Canticle of Simeon */}
            <View style={styles.liturgySection}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#553C9A' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <Heart size={16} color="#B794F4" strokeWidth={2} />
                    <Text style={styles.sectionNumber}>04</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: '#B794F4' }]}>Nunc Dimittis</Text>
                  <Text style={styles.sectionSubtitle}>Canticle of Simeon</Text>
                </View>
              </View>
              <View style={styles.sectionBody}>
                <Text style={styles.antiphon}>{nightPrayer.canticleOfSimeon.antiphon}</Text>
                <Text style={styles.liturgyText}>{nightPrayer.canticleOfSimeon.text}</Text>
              </View>
            </View>

            {/* Closing Prayer */}
            <View style={[styles.liturgySection, { borderBottomWidth: 0 }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#744210' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <Moon size={16} color={colors.night.gold} strokeWidth={2} />
                    <Text style={styles.sectionNumber}>05</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: colors.night.gold }]}>Closing Prayer</Text>
                </View>
              </View>
              <View style={styles.sectionBody}>
                <Text style={styles.liturgyText}>{nightPrayer.closingPrayer}</Text>
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        {/* Marian Antiphon */}
        <AnimatedEntrance delay={150}>
          <View style={styles.marianCard}>
            <Text style={styles.marianLabel}>{nightPrayer.marianAntiphon.name.toUpperCase()}</Text>
            <Text style={styles.marianText}>{nightPrayer.marianAntiphon.text}</Text>
          </View>
        </AnimatedEntrance>

        {/* Classic Prayers */}
        <AnimatedEntrance delay={200}>
          <View style={styles.classicPrayersCard}>
            {/* Our Father */}
            <View style={styles.classicPrayer}>
              <Text style={styles.classicPrayerLabel}>PATER NOSTER</Text>
              <Text style={styles.classicPrayerText}>
                Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.prayerDivider} />

            {/* Glory Be */}
            <View style={styles.classicPrayer}>
              <Text style={styles.classicPrayerLabel}>GLORIA PATRI</Text>
              <Text style={styles.classicPrayerText}>
                Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.
              </Text>
            </View>
          </View>
        </AnimatedEntrance>

        {/* Complete Button */}
        <AnimatedEntrance delay={250}>
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
    paddingTop: spacing.md,
    gap: spacing.lg,
  },

  // Loading State
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: colors.night.textSecondary,
    fontStyle: 'italic',
  },

  // Day Tabs
  dayTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.night.surface,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  dayTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    marginHorizontal: 3,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  dayTabSelected: {
    backgroundColor: colors.night.gold,
  },
  dayTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.3,
  },
  dayTabTextSelected: {
    color: colors.night.background,
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.night.gold,
    marginTop: 3,
  },
  todayDotSelected: {
    backgroundColor: colors.night.background,
  },

  // Header Card with Image
  headerCard: {
    height: 200,
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.xl,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#FFFFFF',
    fontFamily: 'Georgia',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Georgia',
    marginVertical: -2,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.night.gold,
    marginTop: spacing.sm,
    letterSpacing: 1,
  },

  // Liturgy Panel - Seamless dark
  liturgyPanel: {
    marginTop: -radius.xl - 1,
    backgroundColor: colors.night.surface,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    overflow: 'hidden',
  },

  // Liturgy Section
  liturgySection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  sectionHeader: {
    flexDirection: 'row',
  },
  sectionAccent: {
    width: 4,
  },
  sectionHeaderContent: {
    flex: 1,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionNumber: {
    fontSize: 20,
    fontWeight: '200',
    color: 'rgba(255,255,255,0.15)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.5)',
  },
  sectionBody: {
    paddingLeft: 4 + spacing.lg,
    paddingRight: spacing.lg,
    paddingBottom: spacing.lg,
  },

  // Liturgy Text Styles
  antiphon: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.night.gold,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  liturgyText: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Georgia',
  },

  // Responsory
  responsoryRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  responsoryLabel: {
    width: 24,
    fontSize: 14,
    fontWeight: '600',
    color: colors.night.gold,
  },
  responsoryText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },

  // Classic Prayers Card
  classicPrayersCard: {
    backgroundColor: colors.night.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  classicPrayer: {
    paddingVertical: spacing.md,
  },
  classicPrayerLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: spacing.sm,
  },
  classicPrayerText: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Georgia',
  },
  prayerDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: spacing.sm,
  },

  // Marian Antiphon Card
  marianCard: {
    backgroundColor: colors.night.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.night.goldFaint,
  },
  marianLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.night.gold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  marianText: {
    fontSize: 14,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // Completed State
  completedState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
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
