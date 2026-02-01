/**
 * Notification Service for Sanctus
 * Handles push notification permissions and scheduled reminders
 */

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Mindfulness reminder messages that rotate
const REMINDER_MESSAGES = [
  'Take a breath. Be still.',
  "Pause. Remember God's presence.",
  'One moment of stillness changes everything.',
  'Be still, and know.',
  'Return to your center.',
  'The present moment is sacred.',
  'Breathe. God is near.',
  'A moment of peace awaits.',
  'Step into stillness.',
  'Rest in the quiet.',
];

// Waking hours for reminders (7am - 10pm)
const WAKING_HOURS_START = 7;
const WAKING_HOURS_END = 22;

/**
 * Request notification permissions from the user
 * @returns Promise<boolean> - true if permission granted
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  // Check if we're on a physical device
  if (!Device.isDevice) {
    if (__DEV__) {
      console.log('Push notifications require a physical device');
    }
    // Return true in development to allow testing the flow
    return __DEV__;
  }

  // Check existing permission status
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request permission if not already granted
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    if (__DEV__) {
      console.log('Notification permission not granted');
    }
    return false;
  }

  // Configure Android channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', {
      name: 'Mindfulness Reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 100],
      lightColor: '#B8860B',
    });
  }

  return true;
}

/**
 * Get a random reminder message
 */
function getRandomReminderMessage(): string {
  const index = Math.floor(Math.random() * REMINDER_MESSAGES.length);
  return REMINDER_MESSAGES[index];
}

/**
 * Schedule hourly reminders during waking hours (7am - 10pm)
 * Creates notifications for the next 7 days to ensure persistence
 */
export async function scheduleHourlyReminders(): Promise<void> {
  // First cancel any existing reminders
  await cancelAllReminders();

  // Check if we have permission
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    if (__DEV__) {
      console.log('Cannot schedule reminders: no permission');
    }
    return;
  }

  const now = new Date();
  const scheduledNotifications: Promise<string>[] = [];

  // Schedule for the next 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() + dayOffset);

    // Schedule for each waking hour
    for (let hour = WAKING_HOURS_START; hour <= WAKING_HOURS_END; hour++) {
      const notificationTime = new Date(targetDate);
      notificationTime.setHours(hour, 0, 0, 0);

      // Skip if the time has already passed today
      if (notificationTime <= now) {
        continue;
      }

      // Schedule the notification
      const scheduledPromise = Notifications.scheduleNotificationAsync({
        content: {
          title: 'Sanctus',
          body: getRandomReminderMessage(),
          sound: true,
          priority: Notifications.AndroidNotificationPriority.DEFAULT,
          data: { type: 'hourly_reminder' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: notificationTime,
        },
      });

      scheduledNotifications.push(scheduledPromise);
    }
  }

  try {
    await Promise.all(scheduledNotifications);
    if (__DEV__) {
      console.log(`Scheduled ${scheduledNotifications.length} reminder notifications`);
    }
  } catch (error) {
    if (__DEV__) {
      console.log('Error scheduling notifications:', error);
    }
  }
}

/**
 * Cancel all scheduled reminder notifications
 */
export async function cancelAllReminders(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (__DEV__) {
      console.log('Cancelled all scheduled notifications');
    }
  } catch (error) {
    if (__DEV__) {
      console.log('Error cancelling notifications:', error);
    }
  }
}

/**
 * Check if reminders are currently enabled
 * @returns Promise<boolean> - true if reminders are scheduled
 */
export async function areRemindersEnabled(): Promise<boolean> {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    return scheduled.length > 0;
  } catch {
    return false;
  }
}

/**
 * Toggle reminders on or off
 * @param enabled - true to enable, false to disable
 */
export async function toggleReminders(enabled: boolean): Promise<void> {
  if (enabled) {
    await scheduleHourlyReminders();
  } else {
    await cancelAllReminders();
  }
}

/**
 * Get the count of scheduled notifications
 */
export async function getScheduledNotificationCount(): Promise<number> {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    return scheduled.length;
  } catch {
    return 0;
  }
}
