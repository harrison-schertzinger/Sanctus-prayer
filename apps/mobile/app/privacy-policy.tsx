import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, ExternalLink } from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { Heading, Body, BodySecondary } from '@/components/ui/Typography';

const PRIVACY_URL = 'https://sanctushealth.com/privacy';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const openPrivacyUrl = () => {
    Linking.openURL(PRIVACY_URL);
  };

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
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Heading style={styles.title}>Privacy Policy</Heading>

        <BodySecondary style={styles.description}>
          Sanctus Health & Performance is committed to protecting your privacy and personal data.
        </BodySecondary>

        <View style={styles.card}>
          <Body style={styles.cardText}>
            Our full privacy policy is available at:
          </Body>

          <TouchableOpacity onPress={openPrivacyUrl} style={styles.linkRow}>
            <Body style={styles.linkText}>sanctushealth.com/privacy</Body>
            <ExternalLink size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  description: {
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  cardText: {
    marginBottom: spacing.md,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
