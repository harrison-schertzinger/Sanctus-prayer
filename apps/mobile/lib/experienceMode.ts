/**
 * Experience Mode Storage
 * Handles storing and retrieving the user's chosen experience mode
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export type ExperienceMode = 'wearable' | 'app_only';

const STORAGE_KEY = '@sanctus/experience_mode';

export async function getExperienceMode(): Promise<ExperienceMode | null> {
  try {
    const mode = await AsyncStorage.getItem(STORAGE_KEY);
    return mode as ExperienceMode | null;
  } catch {
    if (__DEV__) {
      console.log('Failed to get experience mode');
    }
    return null;
  }
}

export async function setExperienceMode(mode: ExperienceMode): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, mode);
  } catch {
    if (__DEV__) {
      console.log('Failed to save experience mode');
    }
  }
}
