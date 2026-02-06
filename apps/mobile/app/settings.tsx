import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  User,
  Bell,
  Info,
  Shield,
  FileText,
  LogOut,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react-native';
import { colors, spacing, radius } from '@/lib/colors';
import { Heading, Body, BodySecondary, Label } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/hooks/useNotifications';

const APP_VERSION = '1.0.0';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, profile, signOut, updateProfile } = useAuth();
  const { remindersEnabled, setRemindersEnabled } = useNotifications();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            setSigningOut(true);
            await signOut();
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleResetJourney = () => {
    Alert.alert(
      'Reset Journey',
      'This will reset your 40-day journey progress. Your practice sessions and stats will be preserved. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Journey',
          style: 'destructive',
          onPress: async () => {
            await updateProfile({ journey_start_date: null });
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    await setRemindersEnabled(enabled);
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
        <Heading style={styles.headerTitle}>Settings</Heading>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Label style={styles.sectionLabel}>Account</Label>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <User size={20} color={colors.primary} strokeWidth={1.5} />
                <View style={styles.rowText}>
                  <Body style={styles.rowTitle}>Email</Body>
                  <BodySecondary style={styles.rowValue}>
                    {user?.email || 'Not signed in'}
                  </BodySecondary>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Label style={styles.sectionLabel}>Notifications</Label>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Bell size={20} color={colors.primary} strokeWidth={1.5} />
                <View style={styles.rowText}>
                  <Body style={styles.rowTitle}>Mindful Reminders</Body>
                  <BodySecondary style={styles.rowSubtitle}>
                    Hourly reminders during waking hours
                  </BodySecondary>
                </View>
              </View>
              <Switch
                value={remindersEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: colors.border, true: colors.goldMuted }}
                thumbColor={remindersEnabled ? colors.gold : colors.textMuted}
                ios_backgroundColor={colors.border}
              />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Label style={styles.sectionLabel}>About</Label>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Info size={20} color={colors.primary} strokeWidth={1.5} />
                <View style={styles.rowText}>
                  <Body style={styles.rowTitle}>Sanctus Health & Performance</Body>
                  <BodySecondary style={styles.rowSubtitle}>
                    Version {APP_VERSION}
                  </BodySecondary>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push('/privacy-policy')}
            >
              <View style={styles.rowLeft}>
                <Shield size={20} color={colors.primary} strokeWidth={1.5} />
                <Body style={styles.rowTitle}>Privacy Policy</Body>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push('/terms-of-service')}
            >
              <View style={styles.rowLeft}>
                <FileText size={20} color={colors.primary} strokeWidth={1.5} />
                <Body style={styles.rowTitle}>Terms of Service</Body>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            disabled={signingOut}
          >
            <LogOut size={20} color={colors.wine} strokeWidth={1.5} />
            <Body style={styles.signOutText}>
              {signingOut ? 'Signing out...' : 'Sign Out'}
            </Body>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, styles.dangerSection]}>
          <Label style={styles.dangerLabel}>Danger Zone</Label>
          <View style={styles.dangerCard}>
            <TouchableOpacity
              style={styles.row}
              onPress={handleResetJourney}
            >
              <View style={styles.rowLeft}>
                <RotateCcw size={20} color={colors.error} strokeWidth={1.5} />
                <View style={styles.rowText}>
                  <Body style={styles.dangerTitle}>Reset Journey</Body>
                  <BodySecondary style={styles.dangerSubtitle}>
                    Restart your 40-day journey from Day 1
                  </BodySecondary>
                </View>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

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
  },

  // Sections
  section: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    color: colors.textMuted,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },

  // Cards
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    overflow: 'hidden',
  },

  // Rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
  },
  rowValue: {
    fontSize: 14,
    marginTop: 2,
  },
  rowSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
    marginLeft: spacing.md + 20 + spacing.md, // icon + gap alignment
  },

  // Sign Out
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    paddingVertical: spacing.md,
  },
  signOutText: {
    color: colors.wine,
    fontWeight: '600',
    fontSize: 16,
  },

  // Danger Zone
  dangerSection: {
    marginTop: spacing.lg,
  },
  dangerLabel: {
    color: colors.error,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  dangerCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.errorLight,
    overflow: 'hidden',
  },
  dangerTitle: {
    color: colors.error,
    fontSize: 16,
  },
  dangerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },

  bottomSpacer: {
    height: spacing.xxl,
  },
});
