import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { X, Pause, Play } from 'lucide-react-native';
import { colors, spacing } from '@/lib/colors';
import { Label } from '@/components/ui/Typography';
import { SegmentedProgressBar } from '@/components/ui/ProgressBar';
import BreathAnimation from '@/components/prayer/BreathAnimation';
import PhaseDisplay from '@/components/prayer/PhaseDisplay';
import CompletionScreen from '@/components/prayer/CompletionScreen';
import { usePracticeTimer } from '@/hooks/usePracticeTimer';
import { useStorage } from '@/hooks/useStorage';
import { PracticeId, PracticePhaseType } from '@/lib/types';
import { getRandomCompletionMessage } from '@/lib/content';
import { getLocalDateKey } from '@/lib/dates';

const PHASE_ORDER: PracticePhaseType[] = ['recollection', 'contemplation', 'praise'];

export default function PracticeScreen() {
  const { id, duration: durationParam } = useLocalSearchParams<{
    id: string;
    duration: string;
  }>();

  const practiceId = (id as PracticeId) || 'peace';
  const duration = (parseInt(durationParam || '10') as 5 | 10 | 15) || 10;

  const [hasStarted, setHasStarted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const { saveSession } = useStorage();

  const {
    state,
    actions,
    getCurrentBreathPattern,
    getCurrentPhrases,
    practice,
  } = usePracticeTimer({
    practiceId,
    duration,
    onPhaseChange: (_phase) => {
      // Phase change handled - audio/haptic feedback in timer hook
    },
    onComplete: () => {
      // Generate completion message
      setCompletionMessage(getRandomCompletionMessage(practiceId));

      // Save session
      saveSession({
        date: getLocalDateKey(),
        duration,
        practice: practiceId,
      });
    },
  });

  // Handle back button / exit
  const handleExit = useCallback(() => {
    if (state.isRunning) {
      Alert.alert(
        'Exit Practice?',
        'Your progress will not be saved.',
        [
          { text: 'Continue', style: 'cancel' },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => {
              actions.reset();
              router.back();
            },
          },
        ]
      );
    } else {
      router.back();
    }
  }, [state.isRunning, actions]);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleExit();
      return true;
    });

    return () => backHandler.remove();
  }, [handleExit]);

  // Start practice automatically after a brief delay
  useEffect(() => {
    if (!hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true);
        actions.start();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasStarted, actions]);

  // Handle completion
  const handleDone = () => {
    actions.reset();
    router.back();
  };

  // Get current phase index for progress bar
  const currentPhaseIndex = PHASE_ORDER.indexOf(state.phase);

  // Get phrases for contemplation phase
  const phrases = getCurrentPhrases();

  // Show completion screen
  if (state.isComplete) {
    return (
      <>
        <StatusBar style="dark" />
        <CompletionScreen
          practice={practice}
          completionMessage={completionMessage}
          duration={duration}
          onDone={handleDone}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleExit} style={styles.closeButton}>
            <X size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.progressContainer}>
            <SegmentedProgressBar
              segments={3}
              currentSegment={currentPhaseIndex}
              segmentProgress={state.phaseProgress}
            />
          </View>

          <TouchableOpacity
            onPress={state.isRunning ? actions.pause : actions.resume}
            style={styles.pauseButton}
          >
            {state.isRunning ? (
              <Pause size={24} color={colors.textSecondary} />
            ) : (
              <Play size={24} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Phase display */}
          <View
            key={state.phase}
            style={styles.phaseContainer}
          >
            <PhaseDisplay
              phase={state.phase}
              breathPhase={state.breathPhase}
              praiseSubphase={state.praiseSubphase}
              inhalePhrase={phrases.inhale}
              exhalePhrase={phrases.exhale}
            />
          </View>

          {/* Breath animation (only for recollection and contemplation) */}
          {state.phase !== 'praise' && (
            <View style={styles.breathContainer}>
              <BreathAnimation
                breathPhase={state.breathPhase}
                breathProgress={state.breathProgress}
                breathPattern={getCurrentBreathPattern()}
                isRunning={state.isRunning}
              />
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Label style={styles.timeLabel}>
            {formatTime(state.elapsedSeconds)} / {formatTime(state.totalSeconds)}
          </Label>

          {state.isPaused && (
            <View style={styles.pausedIndicator}>
              <Label style={styles.pausedText}>Paused</Label>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  pauseButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  phaseContainer: {
    marginBottom: spacing.xl,
  },
  breathContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  timeLabel: {
    color: colors.textSecondary,
  },
  pausedIndicator: {
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  pausedText: {
    color: colors.gold,
  },
});
