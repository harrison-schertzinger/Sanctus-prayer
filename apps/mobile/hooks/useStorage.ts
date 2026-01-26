import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PracticeSession, PracticeId } from '@/lib/types';
import { supabase, isSupabaseConfigured, Database } from '@/lib/supabase';

// Type aliases for database rows
type SessionRow = Database['public']['Tables']['sessions']['Row'];
type CompletedReadingRow = Database['public']['Tables']['completed_readings']['Row'];

const STORAGE_KEYS = {
  SESSIONS: '@sanctus/sessions',
  READINGS: '@sanctus/readings',
  SETTINGS: '@sanctus/settings',
  PENDING_SYNC: '@sanctus/pending_sync',
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
  isSyncing: boolean;
  saveSession: (session: SessionInput) => Promise<void>;
  getSessions: () => Promise<PracticeSession[]>;
  markReadingComplete: (readingId: string) => Promise<void>;
  isReadingComplete: (readingId: string) => boolean;
  completedReadings: string[];
  refresh: () => Promise<void>;
  syncToCloud: () => Promise<void>;
}

export function useStorage(): UseStorageReturn {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [completedReadings, setCompletedReadings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const userIdRef = useRef<string | null>(null);

  // Check for authenticated user
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      userIdRef.current = session?.user?.id ?? null;
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      userIdRef.current = session?.user?.id ?? null;
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Always load from local storage first (offline-first)
      const [sessionsData, readingsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.SESSIONS),
        AsyncStorage.getItem(STORAGE_KEYS.READINGS),
      ]);

      const localSessions = sessionsData ? JSON.parse(sessionsData) : [];
      const localReadings = readingsData ? JSON.parse(readingsData) : [];

      setSessions(localSessions);
      setCompletedReadings(localReadings);

      // If authenticated, merge with cloud data
      if (userIdRef.current && isSupabaseConfigured()) {
        await mergeWithCloud(localSessions, localReadings);
      }
    } catch (error) {
      __DEV__ && console.error('Error loading storage data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Merge local data with cloud data
  const mergeWithCloud = async (
    localSessions: PracticeSession[],
    localReadings: string[]
  ) => {
    if (!userIdRef.current || !supabase) return;

    try {
      // Fetch cloud sessions
      const { data: cloudSessions, error: sessionsError } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', userIdRef.current);

      if (sessionsError) {
        __DEV__ && console.error('Error fetching cloud sessions:', sessionsError);
        return;
      }

      // Fetch cloud readings
      const { data: cloudReadings, error: readingsError } = await supabase
        .from('completed_readings')
        .select('reading_id')
        .eq('user_id', userIdRef.current);

      if (readingsError) {
        __DEV__ && console.error('Error fetching cloud readings:', readingsError);
        return;
      }

      // Convert cloud sessions to local format
      const cloudSessionsFormatted: PracticeSession[] = ((cloudSessions || []) as SessionRow[]).map(s => ({
        id: s.local_id || s.id,
        date: s.date,
        duration: s.duration,
        practice: s.practice as PracticeId | 'night',
        completedAt: s.completed_at,
      }));

      // Merge sessions (prefer cloud data for duplicates, combine unique)
      const localIds = new Set(localSessions.map(s => s.id));
      const cloudIds = new Set(cloudSessionsFormatted.map(s => s.id));

      // Sessions only in local (need to sync up)
      const localOnly = localSessions.filter(s => !cloudIds.has(s.id));

      // Combined: all cloud + local-only
      const mergedSessions = [...cloudSessionsFormatted, ...localOnly];

      // Sort by completedAt descending
      mergedSessions.sort((a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );

      // Merge readings
      const cloudReadingIds = ((cloudReadings || []) as Pick<CompletedReadingRow, 'reading_id'>[]).map(r => r.reading_id);
      const mergedReadings = [...new Set([...localReadings, ...cloudReadingIds])];

      // Update local state
      setSessions(mergedSessions);
      setCompletedReadings(mergedReadings);

      // Persist merged data locally
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(mergedSessions)),
        AsyncStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(mergedReadings)),
      ]);

      // Sync local-only items to cloud
      if (localOnly.length > 0) {
        await syncSessionsToCloud(localOnly);
      }

      // Sync local-only readings to cloud
      const localOnlyReadings = localReadings.filter(r => !cloudReadingIds.includes(r));
      if (localOnlyReadings.length > 0) {
        await syncReadingsToCloud(localOnlyReadings);
      }
    } catch (error) {
      __DEV__ && console.error('Error merging with cloud:', error);
    }
  };

  // Sync sessions to cloud
  const syncSessionsToCloud = async (sessionsToSync: PracticeSession[]) => {
    if (!userIdRef.current || !isSupabaseConfigured() || !supabase) return;

    try {
      const cloudSessions = sessionsToSync.map(s => ({
        user_id: userIdRef.current!,
        date: s.date,
        duration: s.duration,
        practice: s.practice,
        completed_at: s.completedAt,
        local_id: s.id,
      }));

      // Insert each session, ignoring duplicates
      for (const session of cloudSessions) {
        const { error } = await supabase
          .from('sessions')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .insert(session as any);

        // Ignore duplicate key errors (session already synced)
        if (error && !error.message.includes('duplicate')) {
          __DEV__ && console.error('Error syncing session to cloud:', error);
        }
      }
    } catch (error) {
      __DEV__ && console.error('Error syncing sessions:', error);
    }
  };

  // Sync readings to cloud
  const syncReadingsToCloud = async (readingsToSync: string[]) => {
    if (!userIdRef.current || !isSupabaseConfigured() || !supabase) return;

    try {
      // Insert each reading, ignoring duplicates
      for (const readingId of readingsToSync) {
        const { error } = await supabase
          .from('completed_readings')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .insert({ user_id: userIdRef.current!, reading_id: readingId } as any);

        // Ignore duplicate key errors (reading already synced)
        if (error && !error.message.includes('duplicate')) {
          __DEV__ && console.error('Error syncing reading to cloud:', error);
        }
      }
    } catch (error) {
      __DEV__ && console.error('Error syncing readings:', error);
    }
  };

  const refresh = useCallback(async () => {
    await loadData();
  }, []);

  // Manual sync trigger
  const syncToCloud = useCallback(async () => {
    if (!userIdRef.current || !isSupabaseConfigured()) return;

    setIsSyncing(true);
    try {
      await mergeWithCloud(sessions, completedReadings);
    } finally {
      setIsSyncing(false);
    }
  }, [sessions, completedReadings]);

  const saveSession = useCallback(async (input: SessionInput) => {
    try {
      const session: PracticeSession = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: input.date,
        duration: input.duration,
        practice: input.practice,
        completedAt: new Date().toISOString(),
      };

      // Update local state immediately
      const updatedSessions = [session, ...sessions];
      setSessions(updatedSessions);

      // Save to AsyncStorage (offline-first)
      await AsyncStorage.setItem(
        STORAGE_KEYS.SESSIONS,
        JSON.stringify(updatedSessions)
      );

      // If authenticated, also save to cloud
      if (userIdRef.current && isSupabaseConfigured() && supabase) {
        const { error } = await supabase
          .from('sessions')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .insert({
            user_id: userIdRef.current,
            date: session.date,
            duration: session.duration,
            practice: session.practice,
            completed_at: session.completedAt,
            local_id: session.id,
          } as any);

        if (error) {
          __DEV__ && console.error('Error saving session to cloud:', error);
          // Session is still saved locally, will sync later
        }
      }
    } catch (error) {
      __DEV__ && console.error('Error saving session:', error);
    }
  }, [sessions]);

  const getSessions = useCallback(async (): Promise<PracticeSession[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      __DEV__ && console.error('Error getting sessions:', error);
      return [];
    }
  }, []);

  const markReadingComplete = useCallback(async (readingId: string) => {
    try {
      // Check if already completed
      if (completedReadings.includes(readingId)) return;

      // Update local state
      const updated = [...completedReadings, readingId];
      setCompletedReadings(updated);

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        STORAGE_KEYS.READINGS,
        JSON.stringify(updated)
      );

      // If authenticated, also save to cloud
      if (userIdRef.current && isSupabaseConfigured() && supabase) {
        const { error } = await supabase
          .from('completed_readings')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .insert({ user_id: userIdRef.current, reading_id: readingId } as any);

        if (error && !error.message.includes('duplicate')) {
          __DEV__ && console.error('Error saving reading to cloud:', error);
        }
      }
    } catch (error) {
      __DEV__ && console.error('Error marking reading complete:', error);
    }
  }, [completedReadings]);

  const isReadingComplete = useCallback((readingId: string): boolean => {
    return completedReadings.includes(readingId);
  }, [completedReadings]);

  return {
    sessions,
    isLoading,
    isSyncing,
    saveSession,
    getSessions,
    markReadingComplete,
    isReadingComplete,
    completedReadings,
    refresh,
    syncToCloud,
  };
}
