/**
 * Intro Screens - Premium swipeable onboarding
 * Elegant, spacious, iOS-quality
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flame, Target, Calendar } from 'lucide-react-native';
import { GradientButton } from '@/components/ui/GradientButton';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, radius } from '@/lib/design';

const { width } = Dimensions.get('window');

interface IntroSlide {
  id: string;
  icon: React.ReactNode;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

const SLIDES: IntroSlide[] = [
  {
    id: 'mission',
    icon: <Flame size={32} color={colors.gold} strokeWidth={1.5} />,
    number: '01',
    title: 'Awaken the Fire',
    subtitle: 'Training for Life with the Spirit',
    description:
      'Sanctus is a 40-day formation in contemplative prayer. Ancient practice. Modern guidance. Real transformation.',
    features: ['Daily Practice', 'Sacred Rhythm', 'Lasting Change'],
  },
  {
    id: 'practice',
    icon: <Target size={32} color={colors.gold} strokeWidth={1.5} />,
    number: '02',
    title: 'The Sacred Center',
    subtitle: 'Three Movements of Prayer',
    description:
      'Each session guides you through Recollection, Contemplation, and Praise—a proven method refined over centuries.',
    features: ['Recollection', 'Contemplation', 'Praise'],
  },
  {
    id: 'journey',
    icon: <Calendar size={32} color={colors.gold} strokeWidth={1.5} />,
    number: '03',
    title: '40 Days',
    subtitle: 'Build the Habit That Changes Everything',
    description:
      'Track your progress. Complete daily readings. Watch consistency compound into communion with God.',
    features: ['Progress Tracking', 'Daily Readings', 'Streaks'],
  },
];

export default function IntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animated values for each slide's icon
  const pulseAnims = useRef(SLIDES.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    // Pulse animation for current slide icon
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnims[currentIndex], {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnims[currentIndex], {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [currentIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      router.push('/(auth)/signup');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/signup');
  };

  const isLastSlide = currentIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFDFB', '#F8F5F0', '#EDE8E0']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Skip Button */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <PressableScale onPress={handleSkip} haptic="light">
          <Text style={styles.skipText}>Skip</Text>
        </PressableScale>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.slideContent}>
              {/* Step number */}
              <Text style={styles.stepNumber}>{slide.number}</Text>

              {/* Icon with animated ring */}
              <View style={styles.iconContainer}>
                <Animated.View
                  style={[
                    styles.iconRing,
                    { transform: [{ scale: pulseAnims[index] }] }
                  ]}
                />
                <View style={styles.iconInner}>
                  {slide.icon}
                </View>
              </View>

              {/* Title */}
              <Text style={styles.slideTitle}>{slide.title}</Text>

              {/* Subtitle - elegant, not screaming */}
              <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>

              {/* Decorative line */}
              <View style={styles.miniDivider} />

              {/* Description */}
              <Text style={styles.slideDescription}>{slide.description}</Text>

              {/* Features as elegant inline list */}
              <View style={styles.featuresRow}>
                {slide.features.map((feature, i) => (
                  <View key={feature} style={styles.featureItem}>
                    {i > 0 && <View style={styles.featureDot} />}
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={[styles.bottom, { paddingBottom: insets.bottom + 32 }]}>
        {/* Progress Indicator - elegant line style */}
        <View style={styles.progressContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressLine,
                index === currentIndex && styles.progressLineActive,
              ]}
            />
          ))}
        </View>

        {/* Next Button */}
        <GradientButton
          onPress={handleNext}
          size="large"
          style={styles.nextButton}
        >
          {isLastSlide ? 'Create Account' : 'Continue'}
        </GradientButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: spacing.xl,
  },
  skipText: {
    fontSize: 15,
    color: colors.textMuted,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  slideContent: {
    alignItems: 'center',
    paddingBottom: 80,
  },

  // Step number
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    color: colors.gold,
    marginBottom: spacing.lg,
  },

  // Icon with ring
  iconContainer: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  iconRing: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    borderColor: 'rgba(184, 134, 11, 0.25)',
  },
  iconInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.goldFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Title
  slideTitle: {
    fontSize: 34,
    fontFamily: 'Georgia',
    fontWeight: '300',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  // Subtitle - elegant, proper case
  slideSubtitle: {
    fontSize: 15,
    color: colors.gold,
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  // Mini divider
  miniDivider: {
    width: 40,
    height: 2,
    backgroundColor: colors.gold,
    opacity: 0.3,
    borderRadius: 1,
    marginBottom: spacing.lg,
  },

  // Description
  slideDescription: {
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },

  // Features as inline row
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gold,
    marginHorizontal: 12,
  },
  featureText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },

  // Bottom
  bottom: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },

  // Progress - elegant lines
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  progressLine: {
    width: 32,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.border,
  },
  progressLineActive: {
    width: 48,
    backgroundColor: colors.gold,
  },

  nextButton: {
    width: '100%',
  },
});
