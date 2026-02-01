import { useState, useEffect, useCallback, useRef } from 'react';
import {
  PracticePhaseType,
  BreathPhase,
  PraiseSubphase,
  DurationConfig,
  DURATION_CONFIGS,
  BreathPattern,
} from '@/lib/types';
import { practices } from '@/lib/content';
import { sounds } from '@/lib/audio';
import {
  startBreathHaptics,
  stopBreathHaptics,
  hapticEvents,
} from '@/lib/haptics';

interface TimerState {
  // Current phase
  phase: PracticePhaseType;
  phaseProgress: number; // 0-1

  // Breath state
  breathPhase: BreathPhase;
  breathProgress: number; // 0-1

  // Praise subphase (when in praise phase)
  praiseSubphase: PraiseSubphase;
  praiseSubphaseProgress: number; // 0-1

  // Overall progress
  totalProgress: number; // 0-1
  elapsedSeconds: number;
  totalSeconds: number;

  // Status
  isRunning: boolean;
  isComplete: boolean;
  isPaused: boolean;
}

interface UsePracticeTimerOptions {
  practiceId: 'peace' | 'joy';
  duration: 5 | 10 | 15;
  onPhaseChange?: (phase: PracticePhaseType) => void;
  onBreathChange?: (breath: BreathPhase) => void;
  onComplete?: () => void;
  hapticEnabled?: boolean;
}

const PRAISE_SUBPHASES: PraiseSubphase[] = ['gratitude', 'petition', 'visualization', 'surrender'];

export function usePracticeTimer({
  practiceId,
  duration,
  onPhaseChange,
  onBreathChange,
  onComplete,
  hapticEnabled = true,
}: UsePracticeTimerOptions) {
  const practice = practices[practiceId];
  const durationConfig = DURATION_CONFIGS[duration];

  // Calculate phase durations in seconds
  const phaseDurations = {
    recollection: durationConfig.recollection * 60,
    contemplation: durationConfig.contemplation * 60,
    praise: durationConfig.praise * 60,
  };

  const totalSeconds = Object.values(phaseDurations).reduce((a, b) => a + b, 0);

  // State
  const [state, setState] = useState<TimerState>({
    phase: 'recollection',
    phaseProgress: 0,
    breathPhase: 'inhale',
    breathProgress: 0,
    praiseSubphase: 'gratitude',
    praiseSubphaseProgress: 0,
    totalProgress: 0,
    elapsedSeconds: 0,
    totalSeconds,
    isRunning: false,
    isComplete: false,
    isPaused: false,
  });

  // Refs for timer
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Get current breath pattern based on phase
  const getCurrentBreathPattern = useCallback((): BreathPattern => {
    if (state.phase === 'recollection') {
      return practice.phases.recollection.breathPattern;
    } else if (state.phase === 'contemplation') {
      return practice.phases.contemplation.breathPattern;
    }
    // Praise phase uses contemplation pattern
    return practice.phases.contemplation.breathPattern;
  }, [state.phase, practice]);

  // Calculate breath cycle duration
  const getBreathCycleDuration = useCallback((): number => {
    const pattern = getCurrentBreathPattern();
    return pattern.inhale + pattern.hold + pattern.exhale;
  }, [getCurrentBreathPattern]);

  // Trigger breath haptic pattern for current phase
  const triggerBreathHaptics = useCallback(
    (breathPhase: BreathPhase, breathPattern: BreathPattern) => {
      if (!hapticEnabled) return;

      // Get duration in milliseconds for this breath phase
      let durationMs: number;
      switch (breathPhase) {
        case 'inhale':
          durationMs = breathPattern.inhale * 1000;
          break;
        case 'hold':
          durationMs = breathPattern.hold * 1000;
          break;
        case 'exhale':
          durationMs = breathPattern.exhale * 1000;
          break;
      }

      // Start the rhythmic haptic pattern
      startBreathHaptics(breathPhase, durationMs);
    },
    [hapticEnabled]
  );

  // Update timer state
  const updateTimer = useCallback(() => {
    const now = Date.now();
    const elapsed = (now - startTimeRef.current) / 1000;

    if (elapsed >= totalSeconds) {
      // Practice complete
      setState((prev) => ({
        ...prev,
        isRunning: false,
        isComplete: true,
        totalProgress: 1,
        elapsedSeconds: totalSeconds,
      }));

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      stopBreathHaptics();
      if (hapticEnabled) hapticEvents.completion();
      sounds.completion();
      onComplete?.();
      return;
    }

    // Determine current phase
    let phase: PracticePhaseType;
    let phaseElapsed: number;
    let phaseDuration: number;

    if (elapsed < phaseDurations.recollection) {
      phase = 'recollection';
      phaseElapsed = elapsed;
      phaseDuration = phaseDurations.recollection;
    } else if (elapsed < phaseDurations.recollection + phaseDurations.contemplation) {
      phase = 'contemplation';
      phaseElapsed = elapsed - phaseDurations.recollection;
      phaseDuration = phaseDurations.contemplation;
    } else {
      phase = 'praise';
      phaseElapsed = elapsed - phaseDurations.recollection - phaseDurations.contemplation;
      phaseDuration = phaseDurations.praise;
    }

    // Calculate breath phase
    const breathPattern =
      phase === 'recollection'
        ? practice.phases.recollection.breathPattern
        : practice.phases.contemplation.breathPattern;

    const breathCycle = breathPattern.inhale + breathPattern.hold + breathPattern.exhale;
    const breathPosition = phaseElapsed % breathCycle;

    let breathPhase: BreathPhase;
    let breathProgress: number;

    if (breathPosition < breathPattern.inhale) {
      breathPhase = 'inhale';
      breathProgress = breathPosition / breathPattern.inhale;
    } else if (breathPosition < breathPattern.inhale + breathPattern.hold) {
      breathPhase = 'hold';
      breathProgress = (breathPosition - breathPattern.inhale) / Math.max(breathPattern.hold, 0.1);
    } else {
      breathPhase = 'exhale';
      breathProgress =
        (breathPosition - breathPattern.inhale - breathPattern.hold) / breathPattern.exhale;
    }

    // Calculate praise subphase
    let praiseSubphase: PraiseSubphase = 'gratitude';
    let praiseSubphaseProgress = 0;

    if (phase === 'praise') {
      const subphaseDuration = phaseDuration / 4;
      const subphaseIndex = Math.min(3, Math.floor(phaseElapsed / subphaseDuration));
      praiseSubphase = PRAISE_SUBPHASES[subphaseIndex];
      praiseSubphaseProgress = (phaseElapsed % subphaseDuration) / subphaseDuration;
    }

    setState((prev) => {
      // Check for phase change
      if (prev.phase !== phase) {
        if (hapticEnabled) hapticEvents.transition();
        sounds.transition();
        onPhaseChange?.(phase);
      }

      // Check for breath phase change - trigger rhythmic haptic pattern
      if (prev.breathPhase !== breathPhase) {
        triggerBreathHaptics(breathPhase, breathPattern);
        onBreathChange?.(breathPhase);
      }

      return {
        ...prev,
        phase,
        phaseProgress: phaseElapsed / phaseDuration,
        breathPhase,
        breathProgress,
        praiseSubphase,
        praiseSubphaseProgress,
        totalProgress: elapsed / totalSeconds,
        elapsedSeconds: elapsed,
      };
    });
  }, [
    totalSeconds,
    phaseDurations,
    practice,
    hapticEnabled,
    triggerBreathHaptics,
    onPhaseChange,
    onBreathChange,
    onComplete,
  ]);

  // Start the timer
  const start = useCallback(() => {
    if (state.isRunning) return;

    startTimeRef.current = Date.now() - pausedTimeRef.current * 1000;

    setState((prev) => ({ ...prev, isRunning: true, isPaused: false }));

    if (hapticEnabled) hapticEvents.transition();
    sounds.gong();

    // Start initial breath haptics (inhale)
    const initialPattern = practice.phases.recollection.breathPattern;
    triggerBreathHaptics('inhale', initialPattern);

    intervalRef.current = setInterval(updateTimer, 50); // 20fps for smooth animations
  }, [state.isRunning, updateTimer, hapticEnabled, practice, triggerBreathHaptics]);

  // Pause the timer
  const pause = useCallback(() => {
    if (!state.isRunning) return;

    pausedTimeRef.current = state.elapsedSeconds;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    stopBreathHaptics();
    setState((prev) => ({ ...prev, isRunning: false, isPaused: true }));
    if (hapticEnabled) hapticEvents.tap();
  }, [state.isRunning, state.elapsedSeconds, hapticEnabled]);

  // Resume the timer
  const resume = useCallback(() => {
    if (state.isRunning || !state.isPaused) return;
    start();
  }, [state.isRunning, state.isPaused, start]);

  // Reset the timer
  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    stopBreathHaptics();
    pausedTimeRef.current = 0;
    startTimeRef.current = 0;

    setState({
      phase: 'recollection',
      phaseProgress: 0,
      breathPhase: 'inhale',
      breathProgress: 0,
      praiseSubphase: 'gratitude',
      praiseSubphaseProgress: 0,
      totalProgress: 0,
      elapsedSeconds: 0,
      totalSeconds,
      isRunning: false,
      isComplete: false,
      isPaused: false,
    });
  }, [totalSeconds]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      stopBreathHaptics();
    };
  }, []);

  // Get current phrases
  const getCurrentPhrases = useCallback(() => {
    if (state.phase === 'contemplation' || state.phase === 'praise') {
      return {
        inhale: practice.phases.contemplation.inhalePhrase,
        exhale: practice.phases.contemplation.exhalePhrase,
      };
    }
    return { inhale: null, exhale: null };
  }, [state.phase, practice]);

  return {
    state,
    actions: {
      start,
      pause,
      resume,
      reset,
    },
    getCurrentBreathPattern,
    getCurrentPhrases,
    practice,
    durationConfig,
  };
}
