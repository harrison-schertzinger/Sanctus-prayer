import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Music, BookMarked } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { formatDate } from '@/lib/content';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { getFallbackReadings } from '@/lib/liturgy/fallback';
import { DailyMassReadings } from '@/lib/liturgy/types';

export default function ReadingsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [readings, setReadings] = useState<DailyMassReadings | null>(null);
  const today = formatDate().toUpperCase();

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadings(getFallbackReadings(new Date()));
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !readings) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading readings...</Text>
        </View>
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
              <Text style={styles.headerDate}>{today}</Text>
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
                <Text style={styles.readingText}>{readings.responsorialPsalm.fullText}</Text>
              </View>
            </View>

            {/* Gospel */}
            <View style={[styles.readingSection, { borderBottomWidth: 0 }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionAccent, { backgroundColor: '#722F37' }]} />
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <BookMarked size={16} color="#722F37" strokeWidth={2} />
                    <Text style={styles.sectionNumber}>03</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: colors.textMuted,
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
  headerDate: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: spacing.xs,
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
    marginBottom: spacing.sm,
    lineHeight: 22,
  },

  bottomSpacer: {
    height: spacing.xl,
  },
});
