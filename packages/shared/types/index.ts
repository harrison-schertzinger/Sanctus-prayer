/**
 * Shared TypeScript types for Sanctus apps
 */

// Practice types
export type PracticeId = 'peace' | 'trust' | 'presence' | 'surrender';

export interface Practice {
  id: PracticeId;
  name: string;
  subtitle: string;
  description: string;
  totalDays: number;
  breathIn: string;
  breathOut: string;
  coverImage?: string;
}

// Session tracking
export interface PracticeSession {
  id: string;
  date: string;
  duration: number;
  practice: PracticeId | 'night';
  completedAt: string;
}

// Daily reading types
export interface Scripture {
  text: string;
  reference: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface DailyReading {
  id: string;
  date: string;
  scripture: Scripture;
  reflection: string;
  quote?: Quote;
}

// User types (for future Supabase integration)
export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
  currentPractice?: PracticeId;
  currentDay?: number;
}

// Timer configuration
export interface TimerConfig {
  preparation: number;  // seconds
  interval: number;     // minutes
  total: number;        // minutes
}
