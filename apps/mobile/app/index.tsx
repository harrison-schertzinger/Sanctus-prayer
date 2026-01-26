/**
 * App Entry Point - Handles auth-based routing
 *
 * Navigation Logic:
 * - Not authenticated → Welcome screen
 * - Authenticated, new user (no journey) → Journey Start screen
 * - Authenticated with journey → Main tabs
 */

import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/lib/colors';

export default function Index() {
  const { isAuthenticated, isLoading, profile, isConfigured } = useAuth();
  const [isReady, setIsReady] = useState(false);

  // Small delay to ensure auth state is fully loaded
  useEffect(() => {
    if (!isLoading) {
      // Give a brief moment for profile to load after auth
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Show loading while checking auth
  if (isLoading || !isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  // If Supabase isn't configured, go straight to app (dev mode)
  if (!isConfigured) {
    return <Redirect href="/(tabs)/readings" />;
  }

  // Not authenticated → Welcome/onboarding
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // Authenticated but no journey started → Journey start screen
  if (!profile?.journey_start_date) {
    return <Redirect href="/(auth)/journey-start" />;
  }

  // Authenticated with active journey → Main app
  return <Redirect href="/(tabs)/readings" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
