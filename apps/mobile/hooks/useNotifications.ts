/**
 * useNotifications Hook
 * Manages notification state and permissions for the app
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  requestNotificationPermissions,
  scheduleHourlyReminders,
  cancelAllReminders,
  areRemindersEnabled,
  toggleReminders,
} from '@/lib/notifications';
import { getExperienceMode } from '@/lib/experienceMode';

const REMINDERS_ENABLED_KEY = '@sanctus/reminders_enabled';
const ONBOARDING_COMPLETE_KEY = '@sanctus/onboarding_complete';

interface UseNotificationsReturn {
  /** Whether the user has granted notification permissions */
  hasPermission: boolean;
  /** Whether hourly reminders are currently enabled */
  remindersEnabled: boolean;
  /** Whether the notification system is loading */
  isLoading: boolean;
  /** Request notification permissions */
  requestPermissions: () => Promise<boolean>;
  /** Toggle reminders on/off */
  setRemindersEnabled: (enabled: boolean) => Promise<void>;
  /** Initialize reminders for app_only mode users after onboarding */
  initializeAfterOnboarding: () => Promise<void>;
}

/**
 * Hook to manage notification permissions and scheduled reminders
 */
export function useNotifications(): UseNotificationsReturn {
  const [hasPermission, setHasPermission] = useState(false);
  const [remindersEnabled, setRemindersEnabledState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check current notification state on mount
  useEffect(() => {
    const checkNotificationState = async () => {
      try {
        // Check if reminders are currently scheduled
        const enabled = await areRemindersEnabled();
        setRemindersEnabledState(enabled);

        // Check stored preference
        const storedPreference = await AsyncStorage.getItem(REMINDERS_ENABLED_KEY);
        if (storedPreference !== null) {
          const prefEnabled = storedPreference === 'true';
          setRemindersEnabledState(prefEnabled);
        }
      } catch (error) {
        if (__DEV__) {
          console.log('Error checking notification state:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkNotificationState();
  }, []);

  /**
   * Request notification permissions from the user
   */
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    const granted = await requestNotificationPermissions();
    setHasPermission(granted);
    return granted;
  }, []);

  /**
   * Toggle reminders on/off
   */
  const setRemindersEnabled = useCallback(async (enabled: boolean): Promise<void> => {
    try {
      // Store preference
      await AsyncStorage.setItem(REMINDERS_ENABLED_KEY, enabled.toString());

      // Toggle the actual reminders
      await toggleReminders(enabled);

      setRemindersEnabledState(enabled);
    } catch (error) {
      if (__DEV__) {
        console.log('Error toggling reminders:', error);
      }
    }
  }, []);

  /**
   * Initialize notifications after onboarding completes
   * Only schedules reminders for app_only mode users
   */
  const initializeAfterOnboarding = useCallback(async (): Promise<void> => {
    try {
      // Check if user is in app_only mode
      const mode = await getExperienceMode();

      if (mode === 'app_only') {
        // Request permissions
        const granted = await requestNotificationPermissions();
        setHasPermission(granted);

        if (granted) {
          // Schedule hourly reminders
          await scheduleHourlyReminders();
          await AsyncStorage.setItem(REMINDERS_ENABLED_KEY, 'true');
          setRemindersEnabledState(true);

          if (__DEV__) {
            console.log('Initialized hourly reminders for app_only user');
          }
        }
      }

      // Mark onboarding as complete
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    } catch (error) {
      if (__DEV__) {
        console.log('Error initializing notifications after onboarding:', error);
      }
    }
  }, []);

  return {
    hasPermission,
    remindersEnabled,
    isLoading,
    requestPermissions,
    setRemindersEnabled,
    initializeAfterOnboarding,
  };
}

/**
 * Check if onboarding has been completed
 */
export async function isOnboardingComplete(): Promise<boolean> {
  try {
    const complete = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
    return complete === 'true';
  } catch {
    return false;
  }
}
