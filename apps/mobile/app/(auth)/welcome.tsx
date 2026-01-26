/**
 * Welcome Screen - Premium iOS-style onboarding
 * Elegant, breathing, alive
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientButton } from '@/components/ui/GradientButton';
import { PressableScale } from '@/components/ui/PressableScale';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { colors, spacing } from '@/lib/design';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Breathing animation for the orb
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Gentle breathing scale
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.08,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Subtle glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background gradient - richer, more depth */}
      <LinearGradient
        colors={['#FFFDFB', '#F8F5F0', '#EDE8E0']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Content */}
      <View style={[styles.content, { paddingTop: insets.top + 80 }]}>

        {/* Logo with breathing orb */}
        <AnimatedEntrance delay={0}>
          <View style={styles.logoSection}>
            {/* Animated gradient orb behind logo */}
            <Animated.View
              style={[
                styles.glowOrb,
                {
                  transform: [{ scale: breatheAnim }],
                  opacity: glowAnim,
                }
              ]}
            >
              <LinearGradient
                colors={['#D4AF37', '#B8860B', '#8B6914']}
                style={styles.glowOrbGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Animated.View>

            {/* Logo - clean, no shadow */}
            <Image
              source={require('@/assets/Spark-logo-transparent.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </AnimatedEntrance>

        {/* Brand name with generous spacing */}
        <AnimatedEntrance delay={200}>
          <Text style={styles.brandName}>SANCTUS</Text>
        </AnimatedEntrance>

        {/* Founding Member Badge - elegant pill */}
        <AnimatedEntrance delay={300}>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>FOUNDING MEMBER</Text>
            </View>
          </View>
        </AnimatedEntrance>

        {/* Decorative divider */}
        <AnimatedEntrance delay={400}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerDiamond} />
            <View style={styles.dividerLine} />
          </View>
        </AnimatedEntrance>

        {/* Tagline */}
        <AnimatedEntrance delay={500}>
          <Text style={styles.tagline}>Train for Life with the Spirit</Text>
        </AnimatedEntrance>

        {/* Scripture with elegant treatment */}
        <AnimatedEntrance delay={600}>
          <View style={styles.scriptureContainer}>
            <Text style={styles.quoteMarkLeft}>"</Text>
            <Text style={styles.scripture}>
              Be still, and know{'\n'}that I am God
            </Text>
            <Text style={styles.quoteMarkRight}>"</Text>
          </View>
          <Text style={styles.scriptureRef}>Psalm 46:10</Text>
        </AnimatedEntrance>
      </View>

      {/* Bottom Actions */}
      <View style={[styles.actions, { paddingBottom: insets.bottom + 32 }]}>
        <AnimatedEntrance delay={700}>
          <GradientButton
            onPress={() => router.push('/(auth)/intro')}
            size="large"
            style={styles.primaryButton}
          >
            Begin Your Journey
          </GradientButton>
        </AnimatedEntrance>

        <AnimatedEntrance delay={800}>
          <PressableScale
            onPress={() => router.push('/(auth)/signin')}
            haptic="light"
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              I Already Have an Account
            </Text>
          </PressableScale>
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

  // Logo section with breathing orb
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    width: 140,
    height: 140,
  },
  glowOrb: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
  },
  glowOrbGradient: {
    flex: 1,
    borderRadius: 80,
  },
  logo: {
    width: 110,
    height: 110,
  },

  // Brand name
  brandName: {
    fontSize: 46,
    fontFamily: 'Georgia',
    fontWeight: '300',
    letterSpacing: 14,
    color: colors.primary,
    marginBottom: spacing.lg,
  },

  // Founding member badge
  badgeContainer: {
    marginBottom: spacing.xl,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(184, 134, 11, 0.08)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(184, 134, 11, 0.2)',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B8860B',
    marginRight: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: '#9A7B0A',
  },

  // Decorative divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    width: 120,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(184, 134, 11, 0.3)',
  },
  dividerDiamond: {
    width: 6,
    height: 6,
    backgroundColor: '#B8860B',
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 12,
  },

  // Tagline
  tagline: {
    fontSize: 20,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },

  // Scripture
  scriptureContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    position: 'relative',
  },
  quoteMarkLeft: {
    position: 'absolute',
    top: -20,
    left: 0,
    fontSize: 60,
    fontFamily: 'Georgia',
    color: 'rgba(184, 134, 11, 0.15)',
    lineHeight: 60,
  },
  quoteMarkRight: {
    position: 'absolute',
    bottom: -40,
    right: 0,
    fontSize: 60,
    fontFamily: 'Georgia',
    color: 'rgba(184, 134, 11, 0.15)',
    lineHeight: 60,
  },
  scripture: {
    fontSize: 22,
    fontFamily: 'Georgia',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 34,
  },
  scriptureRef: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
    color: colors.gold,
    marginTop: spacing.md,
  },

  // Actions
  actions: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '500',
  },
});
