import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { Heading, Body, BodySecondary } from '@/components/ui/Typography';

const EFFECTIVE_DATE = 'February 6, 2026';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Privacy Policy</Heading>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BodySecondary style={styles.effectiveDate}>
          Effective Date: {EFFECTIVE_DATE}
        </BodySecondary>

        <Body style={styles.paragraph}>
          Sanctus Health & Performance ("Sanctus," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use the Sanctus mobile application (the "App").
        </Body>

        <Heading style={styles.sectionTitle}>1. Information We Collect</Heading>

        <Body style={styles.subheading}>Account Information</Body>
        <Body style={styles.paragraph}>
          When you create an account, we collect your email address and an encrypted password. We use Supabase for secure authentication and data storage.
        </Body>

        <Body style={styles.subheading}>Practice Data</Body>
        <Body style={styles.paragraph}>
          We store your prayer session history, including practice type, duration, and date completed. This data is used to track your progress and provide personalized insights within the App.
        </Body>

        <Body style={styles.subheading}>Profile Preferences</Body>
        <Body style={styles.paragraph}>
          We store your display name, preferred practice duration, notification preferences, and journey start date to personalize your experience.
        </Body>

        <Body style={styles.subheading}>Device Information</Body>
        <Body style={styles.paragraph}>
          We may collect device type, operating system version, and push notification tokens for the purpose of delivering notifications you have opted into.
        </Body>

        <Heading style={styles.sectionTitle}>2. How We Use Your Information</Heading>
        <Body style={styles.paragraph}>
          We use your information to:{'\n'}
          {'\u2022'} Provide and maintain the App{'\n'}
          {'\u2022'} Track your prayer practice progress{'\n'}
          {'\u2022'} Send optional mindful reminders (with your permission){'\n'}
          {'\u2022'} Improve the App based on usage patterns{'\n'}
          {'\u2022'} Communicate updates about the App
        </Body>

        <Heading style={styles.sectionTitle}>3. Data Storage & Security</Heading>
        <Body style={styles.paragraph}>
          Your data is stored securely using Supabase, which provides encrypted data storage and secure authentication. Practice session data is also stored locally on your device using encrypted storage. We implement industry-standard security measures including Row Level Security (RLS) policies to ensure users can only access their own data.
        </Body>

        <Heading style={styles.sectionTitle}>4. Data Sharing</Heading>
        <Body style={styles.paragraph}>
          We do not sell, trade, or share your personal information with third parties. We do not use your data for advertising. The only third-party services that process your data are:{'\n'}
          {'\u2022'} Supabase (authentication and database hosting){'\n'}
          {'\u2022'} Apple Push Notification Service (optional notifications){'\n'}
          {'\u2022'} Expo Application Services (app delivery)
        </Body>

        <Heading style={styles.sectionTitle}>5. Your Rights</Heading>
        <Body style={styles.paragraph}>
          You have the right to:{'\n'}
          {'\u2022'} Access your personal data{'\n'}
          {'\u2022'} Request deletion of your account and all associated data{'\n'}
          {'\u2022'} Opt out of push notifications at any time{'\n'}
          {'\u2022'} Export your practice data{'\n'}
          {'\u2022'} Reset your journey progress
        </Body>
        <Body style={styles.paragraph}>
          To exercise any of these rights, contact us at privacy@sanctushealth.com.
        </Body>

        <Heading style={styles.sectionTitle}>6. Children's Privacy</Heading>
        <Body style={styles.paragraph}>
          The App is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us.
        </Body>

        <Heading style={styles.sectionTitle}>7. Changes to This Policy</Heading>
        <Body style={styles.paragraph}>
          We may update this Privacy Policy from time to time. We will notify you of changes by posting the new policy within the App and updating the effective date.
        </Body>

        <Heading style={styles.sectionTitle}>8. Contact Us</Heading>
        <Body style={styles.paragraph}>
          If you have questions about this Privacy Policy, contact us at:{'\n'}
          {'\n'}
          Sanctus Health & Performance{'\n'}
          privacy@sanctushealth.com{'\n'}
          sanctushealth.com
        </Body>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  effectiveDate: {
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  subheading: {
    fontWeight: '600',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
