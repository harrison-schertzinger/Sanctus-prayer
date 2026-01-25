import { useMemo } from 'react';
import { PracticeSession } from '@/lib/types';

interface TrackerStats {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalMinutes: number;
  thisWeek: number;
}

export function useTrackerStats(sessions: PracticeSession[]): TrackerStats {
  return useMemo(() => {
    if (sessions.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalSessions: 0,
        totalMinutes: 0,
        thisWeek: 0,
      };
    }

    // Sort sessions by date (newest first)
    const sortedSessions = [...sessions].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Get unique dates
    const uniqueDates = [...new Set(sortedSessions.map(s => s.date))].sort().reverse();

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if practiced today or yesterday to start counting
    const mostRecentDate = uniqueDates[0];
    const mostRecentDateObj = new Date(mostRecentDate);
    mostRecentDateObj.setHours(0, 0, 0, 0);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (mostRecentDate === todayStr || mostRecentDate === yesterdayStr) {
      // Start counting streak
      let expectedDate = mostRecentDate === todayStr ? today : yesterday;

      for (const dateStr of uniqueDates) {
        const date = new Date(dateStr);
        date.setHours(0, 0, 0, 0);

        if (date.getTime() === expectedDate.getTime()) {
          currentStreak++;
          expectedDate = new Date(expectedDate);
          expectedDate.setDate(expectedDate.getDate() - 1);
        } else if (date.getTime() < expectedDate.getTime()) {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const nextDate = new Date(uniqueDates[i + 1]);

      const diffTime = currentDate.getTime() - nextDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate total sessions
    const totalSessions = sessions.length;

    // Calculate total minutes
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);

    // Calculate this week's sessions
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const thisWeek = sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate >= startOfWeek;
    }).length;

    return {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      totalSessions,
      totalMinutes,
      thisWeek,
    };
  }, [sessions]);
}

export function checkForNewMilestone(
  previousStreak: number,
  currentStreak: number
): number | null {
  const milestoneThresholds = [1, 7, 14, 30, 60, 100];

  for (const threshold of milestoneThresholds) {
    if (previousStreak < threshold && currentStreak >= threshold) {
      return threshold;
    }
  }

  return null;
}
