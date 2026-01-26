import { useState, useEffect, useCallback } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, Database } from '@/lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isConfigured: boolean;
}

interface AuthActions {
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: ProfileUpdate) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

export function useSupabase(): AuthState & AuthActions {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isConfigured = isSupabaseConfigured();

  // Fetch user profile from database
  const fetchProfile = useCallback(async (userId: string) => {
    if (!isConfigured || !supabase) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (__DEV__) console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      if (__DEV__) console.error('Error fetching profile:', error);
    }
  }, [isConfigured]);

  // Initialize auth state and listen for changes
  useEffect(() => {
    if (!isConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured, fetchProfile]);

  // Sign up with email and password
  const signUp = useCallback(async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<{ error: AuthError | null }> => {
    if (!isConfigured || !supabase) {
      return { error: { message: 'Supabase not configured', name: 'ConfigError' } as AuthError };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) return { error };

      // Update profile with display name if provided
      if (data.user && displayName) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any)
          .from('profiles')
          .update({ display_name: displayName })
          .eq('id', data.user.id);
      }

      return { error: null };
    } catch (error) {
      if (__DEV__) console.error('Sign up error:', error);
      return { error: error as AuthError };
    }
  }, [isConfigured]);

  // Sign in with email and password
  const signIn = useCallback(async (
    email: string,
    password: string
  ): Promise<{ error: AuthError | null }> => {
    if (!isConfigured || !supabase) {
      return { error: { message: 'Supabase not configured', name: 'ConfigError' } as AuthError };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (error) {
      if (__DEV__) console.error('Sign in error:', error);
      return { error: error as AuthError };
    }
  }, [isConfigured]);

  // Sign out
  const signOut = useCallback(async (): Promise<{ error: AuthError | null }> => {
    if (!isConfigured || !supabase) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();

      // Clear local storage on sign out for security
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.multiRemove([
        '@sanctus/sessions',
        '@sanctus/daily_checklist',
      ]).catch(() => {});

      return { error };
    } catch (error) {
      if (__DEV__) console.error('Sign out error:', error);
      return { error: error as AuthError };
    }
  }, [isConfigured]);

  // Reset password
  const resetPassword = useCallback(async (
    email: string
  ): Promise<{ error: AuthError | null }> => {
    if (!isConfigured || !supabase) {
      return { error: { message: 'Supabase not configured', name: 'ConfigError' } as AuthError };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      if (__DEV__) console.error('Reset password error:', error);
      return { error: error as AuthError };
    }
  }, [isConfigured]);

  // Update user profile
  const updateProfile = useCallback(async (
    updates: ProfileUpdate
  ): Promise<{ error: Error | null }> => {
    if (!isConfigured || !supabase || !user) {
      return { error: new Error('Not authenticated') };
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        return { error };
      }

      // Refresh profile after update
      await fetchProfile(user.id);
      return { error: null };
    } catch (error) {
      if (__DEV__) console.error('Update profile error:', error);
      return { error: error as Error };
    }
  }, [isConfigured, user, fetchProfile]);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  return {
    user,
    session,
    profile,
    isLoading,
    isAuthenticated: !!session,
    isConfigured,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile,
  };
}
