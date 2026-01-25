import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, BookOpen, Heart, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius } from '@/lib/colors';
import { useStorage } from '@/hooks/useStorage';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { NightButton } from '@/components/ui/PremiumButton';
import { getFallbackNightPrayer } from '@/lib/liturgy/fallback';

export default function NightScreen() {
  const { saveSession } = useStorage();
  const [completed, setCompleted] = useState(false);

  // Get tonight's Liturgy of the Hours content
  const nightPrayer = getFallbackNightPrayer(new Date());

  const handleComplete = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await saveSession({
      practice: 'night',
      duration: 10,
      date: new Date().toISOString().split('T')[0],
    });
    setCompleted(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView
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

        {/* Complete Button */}
        <AnimatedEntrance delay={200}>
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
