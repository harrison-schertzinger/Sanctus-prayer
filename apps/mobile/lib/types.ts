// Practice Types
export type PracticeId = 'peace' | 'joy';
export type PracticeType = 'sacred_center' | 'night';

export interface BreathPattern {
  inhale: number;  // seconds
  hold: number;    // seconds
  exhale: number;  // seconds
}

export interface PracticePhase {
  inhalePhrase: string | null;
  exhalePhrase: string | null;
  breathPattern: BreathPattern;
}

export interface Practice {
  id: string;
  name: string;
  tagline: string;
  focus: string;
  scripture: Scripture;
  phases: {
    recollection: PracticePhase;
    contemplation: PracticePhase;
  };
  completionMessages: string[];
}

// Content Types
export interface Scripture {
  text: string;
  reference: string;
}

export interface DailyReading {
  scripture: Scripture;
  reflection: string;
  quote?: {
    text: string;
    author: string;
  };
}

// Session & Stats Types
export interface PracticeSession {
  id: string;
  date: string;           // ISO date string (YYYY-MM-DD)
  duration: number;       // minutes
  practice: PracticeId | 'night';
  completedAt: string;    // ISO timestamp
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalMinutes: number;
  lastPracticeDate: string | null;
}

export interface StorageData {
  sessions: PracticeSession[];
  stats: UserStats;
  preferences: UserPreferences;
}

export interface UserPreferences {
  defaultDuration: 5 | 10 | 15;
  defaultPractice: PracticeId;
  notificationsEnabled: boolean;
  hapticFeedback: boolean;
}

// Timer Types
export type PracticePhaseType = 'recollection' | 'contemplation' | 'praise';
export type BreathPhase = 'inhale' | 'hold' | 'exhale';

export interface TimerState {
  phase: PracticePhaseType;
  breathPhase: BreathPhase;
  elapsed: number;        // seconds elapsed in current phase
  total: number;          // total seconds for current phase
  isRunning: boolean;
  isComplete: boolean;
}

// Praise & Petition subphases
export type PraiseSubphase = 'gratitude' | 'petition' | 'visualization' | 'surrender';

export interface PraiseState {
  subphase: PraiseSubphase;
  elapsed: number;
  total: number;
}

// Duration scaling
export interface DurationConfig {
  recollection: number;   // minutes
  contemplation: number;  // minutes
  praise: number;         // minutes
}

export const DURATION_CONFIGS: Record<number, DurationConfig> = {
  5: { recollection: 2, contemplation: 2, praise: 1 },
  10: { recollection: 3, contemplation: 4, praise: 3 },
  15: { recollection: 5, contemplation: 5, praise: 5 },
};

/**
 * Get duration config for any total duration in minutes.
 * Uses preset configs for 5/10/15, and proportional scaling for all other values.
 * This supports the ConcentricTimerSelector which allows 5-60 minute durations.
 */
export function getDurationConfig(totalMinutes: number): DurationConfig {
  // Use preset if available
  if (DURATION_CONFIGS[totalMinutes]) {
    return DURATION_CONFIGS[totalMinutes];
  }

  // Proportional split: ~33% recollection, ~40% contemplation, ~27% praise
  const recollection = Math.round(totalMinutes * 0.33);
  const contemplation = Math.round(totalMinutes * 0.40);
  const praise = totalMinutes - recollection - contemplation;

  return { recollection, contemplation, praise };
}

// Milestone Types
export interface Milestone {
  days: number;
  title: string;
  message: string;
}

export const MILESTONES: Milestone[] = [
  { days: 7, title: 'One Week Strong', message: 'You have practiced for 7 days. The habit is forming.' },
  { days: 21, title: 'Habit Forming', message: '21 days of practice. You are building something lasting.' },
  { days: 40, title: 'Desert Journey Complete', message: '40 days, like Christ in the wilderness. You have been refined.' },
  { days: 90, title: 'Transformed Mind', message: '90 days of renewal. Your mind is being transformed.' },
];
