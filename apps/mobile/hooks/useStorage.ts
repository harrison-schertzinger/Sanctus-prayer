import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PracticeSession, PracticeId } from '@/lib/types';

const STORAGE_KEYS = {
  SESSIONS: '@sanctus/sessions',
  READINGS: '@sanctus/readings',
  SETTINGS: '@sanctus/settings',
};

// Simplified input for saving sessions - id and completedAt are auto-generated
interface SessionInput {
  date: string;
  duration: number;
  practice: PracticeId | 'night';
}

interface UseStorageReturn {
  sessions: PracticeSession[];
  isLoading: boolean;
  saveSession: (session: SessionInput) => Promise<void>;
  getSessions: () => Promise<PracticeSession[]>;
  markReadingComplete: (readingId: string) => Promise<void>;
  isReadingComplete: (readingId: string) => boolean;
  completedReadings: string[];
  refresh: () => Promise<void>;
}

export function useStorage(): UseStorageReturn {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [completedReadings, setCompletedReadings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [sessionsData, readingsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.SESSIONS),
        AsyncStorage.getItem(STORAGE_KEYS.READINGS),
      ]);

      if (sessionsData) {
        setSessions(JSON.parse(sessionsData));
      }
      if (readingsData) {
        setCompletedReadings(JSON.parse(readingsData));
      }
    } catch (error) {
      console.error('Error loading storage data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = useCallback(async () => {
    await loadData();
  }, []);

  const saveSession = useCallback(async (input: SessionInput) => {
    try {
      const session: PracticeSession = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: input.date,
        duration: input.duration,
        practice: input.practice,
        completedAt: new Date().toISOString(),
      };
      const updatedSessions = [...sessions, session];
      await AsyncStorage.setItem(
        STORAGE_KEYS.SESSIONS,
        JSON.stringify(updatedSessions)
      );
      setSessions(updatedSessions);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }, [sessions]);

  const getSessions = useCallback(async (): Promise<PracticeSession[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting sessions:', error);
      return [];
    }
  }, []);

  const markReadingComplete = useCallback(async (readingId: string) => {
    try {
      const updated = [...completedReadings, readingId];
      await AsyncStorage.setItem(
        STORAGE_KEYS.READINGS,
        JSON.stringify(updated)
      );
      setCompletedReadings(updated);
    } catch (error) {
      console.error('Error marking reading complete:', error);
    }
  }, [completedReadings]);

  const isReadingComplete = useCallback((readingId: string): boolean => {
    return completedReadings.includes(readingId);
  }, [completedReadings]);

  return {
    sessions,
    isLoading,
    saveSession,
    getSessions,
    markReadingComplete,
    isReadingComplete,
    completedReadings,
    refresh,
  };
}
