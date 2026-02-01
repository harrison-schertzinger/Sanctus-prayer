/**
 * Sanctus Haptic Breathing System
 *
 * MAXIMUM INTENSITY rhythmic haptic patterns.
 * Designed to feel through clothing on your leg.
 *
 * Combines:
 * - React Native Vibration API (sustained buzz)
 * - expo-haptics Heavy impacts (sharp taps)
 * - High frequency bursts (100ms intervals)
 * - Triple-tap patterns for presence
 */

import * as Haptics from 'expo-haptics';
import { Vibration, Platform } from 'react-native';

interface HapticPulse {
  delay: number;
  burstCount: 1 | 2 | 3; // How many rapid taps
  vibrateDuration?: number; // Optional sustained vibration
}

/**
 * Fire intense haptic burst
 * Multiple rapid Heavy impacts + optional sustained vibration
 */
function fireBurst(count: 1 | 2 | 3, vibrateDuration?: number): void {
  // Sustained vibration first (if specified)
  if (vibrateDuration && Platform.OS === 'android') {
    Vibration.vibrate(vibrateDuration);
  }

  // Rapid-fire Heavy impacts
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

  if (count >= 2) {
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 50);
  }

  if (count >= 3) {
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 100);
  }
}

/**
 * Generate INHALE pattern - Rising Ocean Wave
 *
 * High frequency, accelerating:
 * - Starts: 300ms intervals, single taps
 * - Builds: 150ms intervals, double taps
 * - Peaks: 100ms intervals, triple taps
 */
function generateInhalePattern(durationMs: number): HapticPulse[] {
  const pulses: HapticPulse[] = [];

  const startInterval = 300;
  const peakInterval = 100;

  let currentTime = 0;
  let index = 0;

  while (currentTime < durationMs - 50) {
    const progress = currentTime / durationMs;

    // Smooth acceleration curve
    const t = Math.pow(progress, 0.6);
    const interval = startInterval - (startInterval - peakInterval) * t;

    // Burst intensity increases with progress
    let burstCount: 1 | 2 | 3 = 1;
    if (progress > 0.6) burstCount = 3;
    else if (progress > 0.3) burstCount = 2;

    pulses.push({
      delay: currentTime,
      burstCount,
      vibrateDuration: progress > 0.8 ? 30 : undefined, // Vibrate at peak
    });

    currentTime += interval;
    index++;
    if (index > 60) break;
  }

  return pulses;
}

/**
 * Generate HOLD pattern - Powerful Heartbeat
 *
 * Steady, strong, grounding presence.
 * Triple-tap bursts at consistent rhythm.
 */
function generateHoldPattern(durationMs: number): HapticPulse[] {
  const pulses: HapticPulse[] = [];
  const interval = 350; // Heartbeat pace

  let currentTime = 0;
  while (currentTime < durationMs - 50) {
    pulses.push({
      delay: currentTime,
      burstCount: 3, // Always triple for presence
      vibrateDuration: 20,
    });
    currentTime += interval;
  }

  return pulses;
}

/**
 * Generate EXHALE pattern - Receding Wave
 *
 * Decelerating, softening:
 * - Starts: 120ms intervals, triple taps
 * - Slows: 200ms intervals, double taps
 * - Fades: 350ms intervals, single taps
 * - Silence in final 25%
 */
function generateExhalePattern(durationMs: number): HapticPulse[] {
  const pulses: HapticPulse[] = [];

  const startInterval = 120;
  const endInterval = 350;

  let currentTime = 0;
  let index = 0;

  const activeZone = durationMs * 0.75; // Leave 25% silence

  while (currentTime < activeZone) {
    const progress = currentTime / activeZone;

    // Deceleration curve
    const t = Math.pow(progress, 1.2);
    const interval = startInterval + (endInterval - startInterval) * t;

    // Burst intensity decreases with progress
    let burstCount: 1 | 2 | 3 = 3;
    if (progress > 0.6) burstCount = 1;
    else if (progress > 0.3) burstCount = 2;

    pulses.push({
      delay: currentTime,
      burstCount,
      vibrateDuration: progress < 0.2 ? 25 : undefined,
    });

    currentTime += interval;
    index++;
    if (index > 50) break;
  }

  return pulses;
}

/**
 * Active haptic session manager
 */
class HapticBreathingSession {
  private timeouts: ReturnType<typeof setTimeout>[] = [];
  private isActive = false;

  /**
   * Fire a haptic burst
   */
  private burst(count: 1 | 2 | 3, vibrateDuration?: number): void {
    if (!this.isActive) return;
    fireBurst(count, vibrateDuration);
  }

  /**
   * Schedule a pattern of pulses
   */
  private schedulePattern(pulses: HapticPulse[]): void {
    pulses.forEach((pulse) => {
      const timeout = setTimeout(() => {
        this.burst(pulse.burstCount, pulse.vibrateDuration);
      }, pulse.delay);
      this.timeouts.push(timeout);
    });
  }

  /**
   * Clear all scheduled pulses
   */
  clear(): void {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }

  /**
   * Start haptic guidance for inhale phase
   */
  startInhale(durationMs: number): void {
    this.clear();
    this.isActive = true;
    const pattern = generateInhalePattern(durationMs);
    this.schedulePattern(pattern);
  }

  /**
   * Start haptic guidance for hold phase
   */
  startHold(durationMs: number): void {
    this.clear();
    this.isActive = true;
    const pattern = generateHoldPattern(durationMs);
    this.schedulePattern(pattern);
  }

  /**
   * Start haptic guidance for exhale phase
   */
  startExhale(durationMs: number): void {
    this.clear();
    this.isActive = true;
    const pattern = generateExhalePattern(durationMs);
    this.schedulePattern(pattern);
  }

  /**
   * Stop all haptic feedback
   */
  stop(): void {
    this.isActive = false;
    this.clear();
  }

  /**
   * Pause haptic feedback (can resume)
   */
  pause(): void {
    this.isActive = false;
    this.clear();
  }

  /**
   * Resume haptic feedback
   */
  resume(): void {
    this.isActive = true;
  }
}

// Singleton session for the app
let currentSession: HapticBreathingSession | null = null;

/**
 * Get or create the haptic breathing session
 */
export function getHapticSession(): HapticBreathingSession {
  if (!currentSession) {
    currentSession = new HapticBreathingSession();
  }
  return currentSession;
}

/**
 * Convenience: Start haptic pattern for a breath phase
 */
export function startBreathHaptics(
  phase: 'inhale' | 'hold' | 'exhale',
  durationMs: number
): void {
  const session = getHapticSession();

  switch (phase) {
    case 'inhale':
      session.startInhale(durationMs);
      break;
    case 'hold':
      session.startHold(durationMs);
      break;
    case 'exhale':
      session.startExhale(durationMs);
      break;
  }
}

/**
 * Stop all breath haptics
 */
export function stopBreathHaptics(): void {
  if (currentSession) {
    currentSession.stop();
  }
}

/**
 * Single haptic pulses for events (not breathing rhythm)
 */
export const hapticEvents = {
  /** Gentle tap - UI feedback */
  tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

  /** Medium impact - phase transitions */
  transition: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),

  /** Strong impact - completion, important moments */
  completion: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),

  /** Success notification */
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),

  /** Warning notification */
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
};
