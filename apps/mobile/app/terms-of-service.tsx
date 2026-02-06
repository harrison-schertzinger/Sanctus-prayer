import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { Heading, Body, BodySecondary } from '@/components/ui/Typography';

const EFFECTIVE_DATE = 'February 6, 2026';

export default function TermsOfServiceScreen() {
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
        <Heading style={styles.headerTitle}>Terms of Service</Heading>
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
          Welcome to Sanctus. These Terms of Service ("Terms") govern your use of the Sanctus mobile application (the "App") operated by Sanctus Health & Performance ("Sanctus," "we," "us," or "our"). By using the App, you agree to these Terms.
        </Body>

        <Heading style={styles.sectionTitle}>1. Acceptance of Terms</Heading>
        <Body style={styles.paragraph}>
          By downloading, installing, or using the App, you agree to be bound by these Terms. If you do not agree, do not use the App.
        </Body>

        <Heading style={styles.sectionTitle}>2. Description of Service</Heading>
        <Body style={styles.paragraph}>
          Sanctus is a contemplative prayer and wellness application rooted in the Christian tradition. The App provides guided prayer practices, daily scripture readings, night prayer (Compline), and spiritual growth tracking tools. The App is designed as a spiritual aid and does not replace professional medical, psychological, or spiritual counsel.
        </Body>

        <Heading style={styles.sectionTitle}>3. Account Registration</Heading>
        <Body style={styles.paragraph}>
          To use certain features, you must create an account with a valid email address. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.
        </Body>

        <Heading style={styles.sectionTitle}>4. Acceptable Use</Heading>
        <Body style={styles.paragraph}>
          You agree to use the App only for its intended purpose of personal prayer and spiritual growth. You agree not to:{'\n'}
          {'\u2022'} Attempt to access other users' data{'\n'}
          {'\u2022'} Reverse engineer or modify the App{'\n'}
          {'\u2022'} Use the App for any unlawful purpose{'\n'}
          {'\u2022'} Interfere with the App's operation or infrastructure
        </Body>

        <Heading style={styles.sectionTitle}>5. Intellectual Property</Heading>
        <Body style={styles.paragraph}>
          The App, its design, code, content, and branding are the intellectual property of Sanctus Health & Performance. Scripture texts are sourced from publicly available translations. Liturgical content follows the structure of the Liturgy of the Hours in the Catholic tradition.
        </Body>

        <Heading style={styles.sectionTitle}>6. User Data</Heading>
        <Body style={styles.paragraph}>
          Your use of the App is also governed by our Privacy Policy. You retain ownership of your practice session data. We store your data securely and do not sell it to third parties.
        </Body>

        <Heading style={styles.sectionTitle}>7. Disclaimers</Heading>
        <Body style={styles.paragraph}>
          The App is provided "as is" without warranties of any kind. Sanctus is a spiritual wellness tool and is not a substitute for professional medical advice, mental health treatment, or pastoral guidance. We do not guarantee any specific spiritual or health outcomes from using the App.
        </Body>

        <Heading style={styles.sectionTitle}>8. Limitation of Liability</Heading>
        <Body style={styles.paragraph}>
          To the maximum extent permitted by law, Sanctus Health & Performance shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the App.
        </Body>

        <Heading style={styles.sectionTitle}>9. Account Termination</Heading>
        <Body style={styles.paragraph}>
          You may delete your account at any time through the Settings screen. Upon deletion, your personal data will be removed from our servers. We reserve the right to suspend accounts that violate these Terms.
        </Body>

        <Heading style={styles.sectionTitle}>10. Changes to Terms</Heading>
        <Body style={styles.paragraph}>
          We may update these Terms from time to time. Continued use of the App after changes constitutes acceptance of the updated Terms. We will notify you of material changes within the App.
        </Body>

        <Heading style={styles.sectionTitle}>11. Governing Law</Heading>
        <Body style={styles.paragraph}>
          These Terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of the state in which Sanctus Health & Performance is incorporated.
        </Body>

        <Heading style={styles.sectionTitle}>12. Contact Us</Heading>
        <Body style={styles.paragraph}>
          If you have questions about these Terms, contact us at:{'\n'}
          {'\n'}
          Sanctus Health & Performance{'\n'}
          legal@sanctushealth.com{'\n'}
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
