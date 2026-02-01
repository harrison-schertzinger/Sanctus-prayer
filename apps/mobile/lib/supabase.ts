import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment configuration
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
const IS_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Database types for type safety
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          display_name: string | null;
          avatar_url: string | null;
          default_duration: 5 | 10 | 15;
          default_practice: 'peace' | 'joy';
          notifications_enabled: boolean;
          haptic_feedback: boolean;
          timezone: string;
          journey_start_date: string | null;
          current_journey_day: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      sessions: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          duration: number;
          practice: 'peace' | 'joy' | 'night';
          completed_at: string;
          local_id: string | null;
          synced_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['sessions']['Row'], 'id' | 'synced_at' | 'created_at'> & {
          id?: string;
          synced_at?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['sessions']['Row']>;
      };
      completed_readings: {
        Row: {
          id: string;
          user_id: string;
          reading_id: string;
          completed_at: string;
        };
        Insert: Omit<Database['public']['Tables']['completed_readings']['Row'], 'id' | 'completed_at'> & {
          id?: string;
          completed_at?: string;
        };
        Update: Partial<Database['public']['Tables']['completed_readings']['Row']>;
      };
      streaks: {
        Row: {
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_active_date: string | null;
          total_sessions: number;
          total_minutes: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['streaks']['Row'], 'updated_at'> & {
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['streaks']['Row']>;
      };
      daily_progress: {
        Row: {
          id: string;
          user_id: string;
          journey_day: number;
          date: string;
          morning_reading: boolean;
          sacred_center: boolean;
          divine_rhythm: boolean;
          night_prayer: boolean;
          completed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['daily_progress']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['daily_progress']['Row']>;
      };
      daily_readings: {
        Row: {
          id: string;
          date: string;
          liturgical_day: string;
          liturgical_color: 'green' | 'white' | 'red' | 'violet' | 'rose' | 'black';
          season: 'advent' | 'christmas' | 'ordinary_time' | 'lent' | 'easter' | 'triduum';
          first_reading_reference: string;
          first_reading_text: string;
          first_reading_introduction: string | null;
          psalm_reference: string;
          psalm_response: string;
          psalm_text: string;
          second_reading_reference: string | null;
          second_reading_text: string | null;
          second_reading_introduction: string | null;
          gospel_reference: string;
          gospel_text: string;
          gospel_introduction: string | null;
          saint_name: string | null;
          saint_title: string | null;
          saint_biography: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_readings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['daily_readings']['Row']>;
      };
      night_prayer: {
        Row: {
          id: string;
          day_of_week: number; // 0=Sunday through 6=Saturday
          examen_opening_prayer: string;
          examen_prompts: string[];
          examen_act_of_contrition: string;
          hymn: string | null;
          psalm_antiphon: string;
          psalm_reference: string;
          psalm_text: string;
          reading_reference: string;
          reading_text: string;
          responsory_versicle: string;
          responsory_response: string;
          canticle_antiphon: string;
          canticle_text: string;
          closing_prayer: string;
          marian_antiphon_name: string;
          marian_antiphon_text: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['night_prayer']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['night_prayer']['Row']>;
      };
    };
  };
}

// Create Supabase client only if configured
let supabaseClient: SupabaseClient<Database> | null = null;

if (IS_CONFIGURED) {
  // Only import polyfill when we actually need Supabase
  require('react-native-url-polyfill/auto');

  supabaseClient = createClient<Database>(
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    }
  );
}

// Export the client (null if not configured)
export const supabase = supabaseClient;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => IS_CONFIGURED && supabase !== null;
