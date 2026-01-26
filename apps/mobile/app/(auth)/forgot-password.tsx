/**
 * Forgot Password Screen - Reset password flow
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Mail } from 'lucide-react-native';
import { GradientButton } from '@/components/ui/GradientButton';
import { PressableScale } from '@/components/ui/PressableScale';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { useAuth } from '@/contexts/AuthContext';
import { colors, spacing, radius, components } from '@/lib/design';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { resetPassword, isConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!isConfigured) {
      setIsSuccess(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: resetError } = await resetPassword(email);

      if (resetError) {
        setError(resetError.message);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <View style={[styles.container, styles.successContainer]}>
        <View style={[styles.content, { paddingTop: insets.top + 60 }]}>
          <AnimatedEntrance delay={100}>
            <View style={styles.successIcon}>
              <Mail size={48} color={colors.gold} strokeWidth={1.5} />
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={200}>
            <Text style={styles.successTitle}>Check Your Email</Text>
          </AnimatedEntrance>

          <AnimatedEntrance delay={300}>
            <Text style={styles.successMessage}>
              We've sent a password reset link to{'\n'}
              <Text style={styles.emailHighlight}>{email}</Text>
            </Text>
          </AnimatedEntrance>

          <AnimatedEntrance delay={400}>
            <Text style={styles.successHint}>
              Click the link in the email to reset your password. If you don't see it, check your spam folder.
            </Text>
          </AnimatedEntrance>

          <AnimatedEntrance delay={500}>
            <GradientButton
              onPress={() => router.replace('/(auth)/signin')}
              style={styles.backToSignIn}
            >
              Back to Sign In
            </GradientButton>
          </AnimatedEntrance>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <AnimatedEntrance delay={0}>
          <PressableScale
            onPress={() => router.back()}
            haptic="light"
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={colors.text} />
          </PressableScale>
        </AnimatedEntrance>

        {/* Header */}
        <AnimatedEntrance delay={100}>
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we'll send you a link to reset your password
            </Text>
          </View>
        </AnimatedEntrance>

        {/* Form */}
        <View style={styles.form}>
          <AnimatedEntrance delay={200}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="your@email.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError(null);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          </AnimatedEntrance>
        </View>

        {/* Submit Button */}
        <AnimatedEntrance delay={300}>
          <GradientButton
            onPress={handleResetPassword}
            size="large"
            style={styles.submitButton}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.textInverse} />
            ) : (
              'Send Reset Link'
            )}
          </GradientButton>
        </AnimatedEntrance>

        {/* Back to Sign In */}
        <AnimatedEntrance delay={400}>
          <PressableScale
            onPress={() => router.back()}
            haptic="light"
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Back to Sign In</Text>
          </PressableScale>
        </AnimatedEntrance>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Georgia',
    fontWeight: '300',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  form: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  input: {
    ...components.input,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: spacing.xs,
  },
  submitButton: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  cancelText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  // Success state
  successContainer: {
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.goldFaint,
    borderWidth: 2,
    borderColor: colors.goldMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: 28,
    fontFamily: 'Georgia',
    fontWeight: '300',
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.md,
  },
  emailHighlight: {
    color: colors.primary,
    fontWeight: '600',
  },
  successHint: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xxl,
  },
  backToSignIn: {
    width: '100%',
  },
});
