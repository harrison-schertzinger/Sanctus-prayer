import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Platform, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Music, BookMarked } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { PressableScale } from '@/components/ui/PressableScale';
import { SettingsGear } from '@/components/ui/SettingsGear';
import { fetchDailyReadings } from '@/lib/liturgy/api';
import { DailyMassReadings } from '@/lib/liturgy/types';

// Today's index in the date range (14 days back means today is at index 14)
const TODAY_INDEX = 14;

// Item width for date chips (width + horizontal margins)
const DATE_ITEM_WIDTH = 64;

// Generate array of dates for picker (14 days back, 60 days forward)
function generateDateRange(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 14 days back
  for (let i = 14; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }

  // Today + 60 days forward
  for (let i = 0; i <= 60; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  return dates;
}

function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }).toUpperCase();
}

function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export default function ReadingsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readings, setReadings] = useState<DailyMassReadings | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange] = useState(generateDateRange);
  const dateListRef = useRef<FlatList>(null);

  const loadReadings = useCallback(async (date: Date) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDailyReadings(date);
      setReadings(data);
    } catch (err) {
      setError('Unable to load readings. Please try again.');
      if (__DEV__) {
        console.log('Error loading readings:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReadings(selectedDate);
  }, [selectedDate, loadReadings]);

  // Scroll to today on mount (backup for initialScrollIndex)
  useEffect(() => {
    // Small delay to ensure FlatList is mounted
    const timer = setTimeout(() => {
      try {
        dateListRef.current?.scrollToIndex({
          index: TODAY_INDEX,
          animated: false,
          viewPosition: 0.3, // Position today at ~30% from left (visible but not edge)
        });
      } catch (e) {
        // Fallback: scroll to pixel offset
        dateListRef.current?.scrollToOffset({
          offset: TODAY_INDEX * DATE_ITEM_WIDTH,
          animated: false,
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading the Word of God...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !readings) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{error || 'Unable to load readings'}</Text>
          <PressableScale
            onPress={() => loadReadings(selectedDate)}
            style={styles.retryButton}
            haptic="light"
          >
            <Text style={styles.retryText}>Try Again</Text>
          </PressableScale>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <SettingsGear />
      </View>

      {/* Horizontal Date Strip - Always Visible */}
      <View style={styles.dateStripContainer}>
        <FlatList
          ref={dateListRef}
          data={dateRange}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toISOString()}
          contentContainerStyle={styles.dateStripContent}
          renderItem={({ item }) => {
            const selected = isSameDay(item, selectedDate);
            const today = isToday(item);
            return (
              <TouchableOpacity
                style={[
                  styles.dateChip,
                  selected && styles.dateChipSelected,
                  today && !selected && styles.dateChipToday,
                ]}
                onPress={() => handleDateSelect(item)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.dateChipDay,
                  selected && styles.dateChipTextSelected,
                ]}>
                  {item.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                </Text>
                <Text style={[
                  styles.dateChipDate,
                  selected && styles.dateChipTextSelected,
                ]}>
                  {item.getDate()}
                </Text>
                {today && (
                  <View style={[styles.todayDot, selected && styles.todayDotSelected]} />
                )}
              </TouchableOpacity>
            );
          }}
          getItemLayout={(data, index) => ({
            length: DATE_ITEM_WIDTH,
            offset: DATE_ITEM_WIDTH * index,
            index,
          })}
          initialScrollIndex={TODAY_INDEX}
          onScrollToIndexFailed={(info) => {
            // Fallback: scroll to approximate position
            setTimeout(() => {
              dateListRef.current?.scrollToOffset({
                offset: info.index * DATE_ITEM_WIDTH,
                animated: false,
              });
            }, 100);
          }}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card with Image */}
        <AnimatedEntrance delay={0}>
          <View style={styles.headerCard}>
            <Image
              source={require('@/assets/peace-in-his-presence.png')}
              style={styles.headerImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.75)']}
              style={styles.headerOverlay}
            >
              <Text style={styles.headerDateDisplay}>{formatDateDisplay(selectedDate)}</Text>
              <Text style={styles.headerLabel}>DAILY MASS</Text>
              <Text style={styles.headerTitle}>READINGS</Text>
              <Text style={styles.liturgicalDay}>{readings.liturgicalDay}</Text>
            </LinearGradient>
          </View>
        </AnimatedEntrance>

        {/* Readings Panel - Seamless below image */}
        <AnimatedEntrance delay={50}>
          <View style={styles.readingsPanel}>
            {/* First Reading */}
            <View style={styles.readingSection}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#1A365D' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <BookOpen size={16} color="#1A365D" strokeWidth={2} />
                    <Text style={styles.sectionNumber}>01</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: '#1A365D' }]}>First Reading</Text>
                  <Text style={styles.sectionSubtitle}>{readings.firstReading.reference}</Text>
                </View>
              </View>
              <View style={styles.sectionBody}>
                {readings.firstReading.introduction && (
                  <Text style={styles.introduction}>{readings.firstReading.introduction}</Text>
                )}
                <Text style={styles.readingText}>{readings.firstReading.text}</Text>
              </View>
            </View>

            {/* Responsorial Psalm */}
            <View style={styles.readingSection}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#B8860B' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <Music size={16} color="#B8860B" strokeWidth={2} />
                    <Text style={styles.sectionNumber}>02</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: '#B8860B' }]}>Responsorial Psalm</Text>
                  <Text style={styles.sectionSubtitle}>{readings.responsorialPsalm.reference}</Text>
                </View>
              </View>
              <View style={styles.sectionBody}>
                <Text style={styles.psalmResponse}>{readings.responsorialPsalm.response}</Text>
                <Text style={styles.psalmText}>{readings.responsorialPsalm.fullText}</Text>
              </View>
            </View>

            {/* Second Reading - Sundays and Solemnities only */}
            {readings.secondReading && (
              <View style={styles.readingSection}>
                <View style={styles.sectionHeader}>
                  <View style={[styles.sectionAccent, { backgroundColor: '#2D5A3D' }]} />
                  <View style={styles.sectionHeaderContent}>
                    <View style={styles.sectionTitleRow}>
                      <BookOpen size={16} color="#2D5A3D" strokeWidth={2} />
                      <Text style={styles.sectionNumber}>03</Text>
                    </View>
                    <Text style={[styles.sectionTitle, { color: '#2D5A3D' }]}>Second Reading</Text>
                    <Text style={styles.sectionSubtitle}>{readings.secondReading.reference}</Text>
                  </View>
                </View>
                <View style={styles.sectionBody}>
                  {readings.secondReading.introduction && (
                    <Text style={styles.introduction}>{readings.secondReading.introduction}</Text>
                  )}
                  <Text style={styles.readingText}>{readings.secondReading.text}</Text>
                </View>
              </View>
            )}

            {/* Gospel */}
            <View style={[styles.readingSection, { borderBottomWidth: 0 }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#722F37' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <BookMarked size={16} color="#722F37" strokeWidth={2} />
                    <Text style={styles.sectionNumber}>{readings.secondReading ? '04' : '03'}</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: '#722F37' }]}>Gospel</Text>
                  <Text style={styles.sectionSubtitle}>{readings.gospel.reference}</Text>
                </View>
              </View>
              <View style={styles.sectionBody}>
                {readings.gospel.introduction && (
                  <Text style={styles.introduction}>{readings.gospel.introduction}</Text>
                )}
                <Text style={styles.readingText}>{readings.gospel.text}</Text>
              </View>
            </View>
          </View>
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
    paddingTop: spacing.md,
    gap: spacing.lg,
  },

  // Loading & Error
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },

  // Horizontal Date Strip
  dateStripContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
  },
  dateStripContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  dateChip: {
    width: 56,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    marginHorizontal: spacing.xs,
    backgroundColor: 'transparent',
  },
  dateChipSelected: {
    backgroundColor: colors.primary,
  },
  dateChipToday: {
    backgroundColor: colors.goldFaint,
  },
  dateChipDay: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  dateChipDate: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  dateChipTextSelected: {
    color: '#fff',
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gold,
    marginTop: 4,
  },
  todayDotSelected: {
    backgroundColor: '#fff',
  },

  // Header date display
  headerDateDisplay: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.sm,
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
        shadowOpacity: 0.15,
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
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    fontFamily: 'Georgia',
    letterSpacing: 2,
  },
  liturgicalDay: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xs,
  },

  // Readings Panel - Light theme seamless panel
  readingsPanel: {
    marginTop: -radius.xl - 1,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // Reading Section
  readingSection: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    color: colors.border,
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
    color: colors.textMuted,
  },
  sectionBody: {
    paddingLeft: 4 + spacing.lg,
    paddingRight: spacing.lg,
    paddingBottom: spacing.lg,
  },

  // Reading Text Styles
  introduction: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  readingText: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    fontFamily: 'Georgia',
  },
  psalmResponse: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#B8860B',
    marginBottom: spacing.md,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  psalmText: {
    fontSize: 15,
    lineHeight: 26,
    color: colors.text,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
  },

  bottomSpacer: {
    height: spacing.xl,
  },
});
