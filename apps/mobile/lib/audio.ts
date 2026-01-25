/**
 * Audio module for Sanctus
 *
 * Currently implements placeholder functions.
 * When audio files are added, update the `sounds` object with require() paths.
 *
 * Usage:
 *   import { playSound, stopAllSounds } from '@/lib/audio';
 *   await playSound('gong');
 */

import { Audio } from 'expo-av';

// Sound file references (null = placeholder, will be replaced with actual files)
const soundFiles = {
  gong: null, // require('../assets/audio/gong.mp3'),
  transitionChime: null, // require('../assets/audio/transition.mp3'),
  completionBells: null, // require('../assets/audio/completion.mp3'),
  breathIn: null, // require('../assets/audio/breath-in.mp3'),
  breathOut: null, // require('../assets/audio/breath-out.mp3'),
} as const;

type SoundName = keyof typeof soundFiles;

// Cache for loaded sounds
const loadedSounds: Partial<Record<SoundName, Audio.Sound>> = {};

/**
 * Initialize audio settings
 * Call this once when the app starts
 */
export async function initializeAudio(): Promise<void> {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
    console.log('🔊 Audio initialized');
  } catch (error) {
    console.warn('Failed to initialize audio:', error);
  }
}

/**
 * Play a sound by name
 * @param soundName - The name of the sound to play
 * @param volume - Volume level (0-1), defaults to 0.8
 */
export async function playSound(soundName: SoundName, volume: number = 0.8): Promise<void> {
  const soundFile = soundFiles[soundName];

  // Placeholder mode - just log
  if (soundFile === null) {
    console.log(`🔔 [Audio Placeholder] Playing: ${soundName}`);
    return;
  }

  try {
    // Check if sound is already loaded
    let sound = loadedSounds[soundName];

    if (!sound) {
      // Load the sound
      const { sound: newSound } = await Audio.Sound.createAsync(soundFile, {
        volume,
        shouldPlay: false,
      });
      sound = newSound;
      loadedSounds[soundName] = sound;
    }

    // Reset and play
    await sound.setPositionAsync(0);
    await sound.setVolumeAsync(volume);
    await sound.playAsync();
  } catch (error) {
    console.warn(`Failed to play sound "${soundName}":`, error);
  }
}

/**
 * Stop all currently playing sounds
 */
export async function stopAllSounds(): Promise<void> {
  console.log('🔇 [Audio] Stopping all sounds');

  for (const soundName of Object.keys(loadedSounds) as SoundName[]) {
    const sound = loadedSounds[soundName];
    if (sound) {
      try {
        await sound.stopAsync();
      } catch (error) {
        // Ignore errors when stopping
      }
    }
  }
}

/**
 * Unload all sounds from memory
 * Call this when leaving practice screens
 */
export async function unloadAllSounds(): Promise<void> {
  console.log('🔇 [Audio] Unloading all sounds');

  for (const soundName of Object.keys(loadedSounds) as SoundName[]) {
    const sound = loadedSounds[soundName];
    if (sound) {
      try {
        await sound.unloadAsync();
        delete loadedSounds[soundName];
      } catch (error) {
        // Ignore errors when unloading
      }
    }
  }
}

/**
 * Convenience functions for specific sounds
 */
export const sounds = {
  /** Play gong sound (practice start/end) */
  gong: () => playSound('gong'),

  /** Play transition chime (between phases) */
  transition: () => playSound('transitionChime', 0.6),

  /** Play completion bells */
  completion: () => playSound('completionBells'),

  /** Play breath in cue */
  breathIn: () => playSound('breathIn', 0.4),

  /** Play breath out cue */
  breathOut: () => playSound('breathOut', 0.4),
};
