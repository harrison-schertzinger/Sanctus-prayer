import { useMemo } from 'react';
import { PracticeSession, Milestone, MILESTONES } from '@/lib/types';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  isActiveToday: boolean;
  lastPracticeDate: string | null;
  daysUntilStreakLost: number;
  milestone: Milestone | null;
  nextMilestone: Milestone | null;
  daysToNextMilestone: number;
}

/**
 * Hook for calculating streak data from sessions
 */
export function useStreak(sessions: PracticeSession[]): StreakData {
  return useMemo(() => {
    if (sessions.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        isActiveToday: false,
        lastPracticeDate: null,
        daysUntilStreakLost: 0,
        milestone: null,
        nextMilestone: MILESTONES[0],
        daysToNextMilestone: MILESTONES[0].days,
      };
    }

    // Get unique dates sorted descending
    const uniqueDates = [...new Set(sessions.map((s) => s.date))].sort().reverse();

    const today = getDateString(new Date());
    const yesterday = getDateString(new Date(Date.now() - 86400000));

    // Check if practiced today
    const isActiveToday = uniqueDates[0] === today;

    // Check if streak is still valid (practiced today or yesterday)
    const streakValid = uniqueDates[0] === today || uniqueDates[0] === yesterday;

    if (!streakValid) {
      return {
        currentStreak: 0,
        longestStreak: calculateLongestStreak(uniqueDates),
        isActiveToday: false,
        lastPracticeDate: uniqueDates[0] || null,
        daysUntilStreakLost: 0,
        milestone: null,
        nextMilestone: MILESTONES[0],
        daysToNextMilestone: MILESTONES[0].days,
      };
    }

    // Calculate current streak
    let currentStreak = 0;
    let checkDate = uniqueDates[0] === today ? today : yesterday;

    for (const date of uniqueDates) {
      if (date === checkDate) {
        currentStreak++;
        checkDate = getDateString(new Date(new Date(checkDate).getTime() - 86400000));
      } else if (date < checkDate) {
        break;
      }
    }

    const longestStreak = Math.max(currentStreak, calculateLongestStreak(uniqueDates));

    // Calculate days until streak is lost
    const daysUntilStreakLost = isActiveToday ? 2 : 1;

    // Find current milestone
    const milestone = findCurrentMilestone(currentStreak);
    const nextMilestone = findNextMilestone(currentStreak);
    const daysToNextMilestone = nextMilestone ? nextMilestone.days - currentStreak : 0;

    return {
      currentStreak,
      longestStreak,
      isActiveToday,
      lastPracticeDate: uniqueDates[0],
      daysUntilStreakLost,
      milestone,
      nextMilestone,
      daysToNextMilestone,
    };
  }, [sessions]);
}

/**
 * Get date string in YYYY-MM-DD format
 */
function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculate longest streak from sorted dates
 */
function calculateLongestStreak(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    const diffDays = Math.round((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

/**
 * Find the highest milestone achieved
 */
function findCurrentMilestone(streak: number): Milestone | null {
  const achieved = MILESTONES.filter((m) => streak >= m.days);
  return achieved.length > 0 ? achieved[achieved.length - 1] : null;
}

/**
 * Find the next milestone to achieve
 */
function findNextMilestone(streak: number): Milestone | null {
  return MILESTONES.find((m) => m.days > streak) || null;
}

/**
 * Check if a milestone was just achieved
 */
export function checkNewMilestone(
  previousStreak: number,
  currentStreak: number
): Milestone | null {
  for (const milestone of MILESTONES) {
    if (previousStreak < milestone.days && currentStreak >= milestone.days) {
      return milestone;
    }
  }
  return null;
}

/**
 * Get week completion data for display
 */
export function getWeekCompletion(sessions: PracticeSession[]): {
  completed: number;
  total: number;
  days: { date: string; dayName: string; completed: boolean }[];
} {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday

  // Get start of week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days: { date: string; dayName: string; completed: boolean }[] = [];

  // Get unique session dates
  const sessionDates = new Set(sessions.map((s) => s.date));

  let completed = 0;

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const dateStr = getDateString(date);
    const isCompleted = sessionDates.has(dateStr);

    if (isCompleted) completed++;

    days.push({
      date: dateStr,
      dayName: dayNames[i],
      completed: isCompleted,
    });
  }

  return { completed, total: 7, days };
}
