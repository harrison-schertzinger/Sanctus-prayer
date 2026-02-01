/**
 * Audio module for Sanctus
 *
 * Premium audio with fade-in/fade-out effects for a meditative experience.
 *
 * Usage:
 *   import { playSound, playSoundWithFade, stopAllSounds } from '@/lib/audio';
 *   await playSound('gong');
 *   await playSoundWithFade('gong', { fadeInMs: 500, fadeOutMs: 1000 });
 */

import { Audio, AVPlaybackStatus } from 'expo-av';

// Sound file references
const soundFiles = {
  gong: require('../assets/audio/gong.mp3'),
  transitionChime: require('../assets/audio/transition.mp3'),
  completionBells: require('../assets/audio/completion.mp3'),
  breathIn: null, // Future: require('../assets/audio/breath-in.mp3'),
  breathOut: null, // Future: require('../assets/audio/breath-out.mp3'),
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
    if (__DEV__) console.log('🔊 Audio initialized');
  } catch (error) {
    if (__DEV__) console.warn('Failed to initialize audio:', error);
  }
}

/**
 * Utility to wait for a specified duration
 */
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Animate volume from start to end over duration
 */
async function animateVolume(
  sound: Audio.Sound,
  startVolume: number,
  endVolume: number,
  durationMs: number,
  steps: number = 20
): Promise<void> {
  const stepDuration = durationMs / steps;
  const volumeStep = (endVolume - startVolume) / steps;

  for (let i = 0; i <= steps; i++) {
    const volume = startVolume + volumeStep * i;
    try {
      await sound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
    } catch {
      // Sound might have stopped, ignore
      break;
    }
    if (i < steps) await wait(stepDuration);
  }
}

/**
 * Play a sound by name (instant, no fade)
 * @param soundName - The name of the sound to play
 * @param volume - Volume level (0-1), defaults to 0.8
 */
export async function playSound(soundName: SoundName, volume: number = 0.8): Promise<void> {
  const soundFile = soundFiles[soundName];

  // Placeholder mode - just log in dev
  if (soundFile === null) {
    if (__DEV__) console.log(`🔔 [Audio Placeholder] Playing: ${soundName}`);
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
    if (__DEV__) console.warn(`Failed to play sound "${soundName}":`, error);
  }
}

interface FadeOptions {
  fadeInMs?: number;   // Duration of fade-in (default: 800ms)
  fadeOutMs?: number;  // Duration of fade-out (default: 3000ms) - long, natural
  peakVolume?: number; // Max volume at peak (default: 0.8)
}

/**
 * Play a sound with fade-in and natural fade-out
 * Lets the full track play - fade in at start, fade out at end
 * @param soundName - The name of the sound to play
 * @param options - Fade configuration options
 */
export async function playSoundWithFade(
  soundName: SoundName,
  options: FadeOptions = {}
): Promise<void> {
  const {
    fadeInMs = 800,
    fadeOutMs = 3000,
    peakVolume = 0.8,
  } = options;

  const soundFile = soundFiles[soundName];

  // Placeholder mode - just log in dev
  if (soundFile === null) {
    if (__DEV__) console.log(`🔔 [Audio Placeholder] Playing with fade: ${soundName}`);
    return;
  }

  try {
    // Always create fresh sound for fade effect to avoid conflicts
    const { sound } = await Audio.Sound.createAsync(soundFile, {
      volume: 0, // Start silent for fade-in
      shouldPlay: false,
    });

    // Get duration of the sound
    const status = await sound.getStatusAsync();
    if (!status.isLoaded) {
      if (__DEV__) console.warn(`Sound "${soundName}" failed to load`);
      return;
    }

    const durationMs = status.durationMillis || 10000;

    // Start playback
    await sound.playAsync();

    // Fade in (quick, gentle rise)
    await animateVolume(sound, 0, peakVolume, fadeInMs, 15);

    // Calculate when to start fade out (let most of the track play)
    // Reserve fadeOutMs at the end for the fade out
    const peakDuration = Math.max(0, durationMs - fadeInMs - fadeOutMs);

    if (peakDuration > 0) {
      await wait(peakDuration);
    }

    // Long, natural fade out - let it breathe
    await animateVolume(sound, peakVolume, 0, fadeOutMs, 30);

    // Cleanup
    await sound.stopAsync();
    await sound.unloadAsync();
  } catch (error) {
    if (__DEV__) console.warn(`Failed to play sound with fade "${soundName}":`, error);
  }
}

/**
 * Stop all currently playing sounds
 */
export async function stopAllSounds(): Promise<void> {
  if (__DEV__) console.log('🔇 [Audio] Stopping all sounds');

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
  if (__DEV__) console.log('🔇 [Audio] Unloading all sounds');

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
 * All meditation sounds use fade-in/fade-out for a premium, gentle experience
 * Let full tracks play with natural, extended fade outs
 */
export const sounds = {
  /** Play gong sound with fade (practice start) - gentle awakening */
  gong: () => playSoundWithFade('gong', {
    fadeInMs: 500,
    fadeOutMs: 4000,  // Long, natural fade out
    peakVolume: 0.7,
  }),

  /** Play transition chime with fade (between phases) - soft transition */
  transition: () => playSoundWithFade('transitionChime', {
    fadeInMs: 300,
    fadeOutMs: 3000,  // Let it breathe out naturally
    peakVolume: 0.5,
  }),

  /** Play completion bells with fade (practice end) - satisfying finish */
  completion: () => playSoundWithFade('completionBells', {
    fadeInMs: 400,
    fadeOutMs: 5000,  // Extra long fade for completion - savor the moment
    peakVolume: 0.65,
  }),

  /** Play breath in cue */
  breathIn: () => playSound('breathIn', 0.4),

  /** Play breath out cue */
  breathOut: () => playSound('breathOut', 0.4),
};
