import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Types for content tables
export interface DailyReadingRow {
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
}

export interface NightPrayerRow {
  id: string;
  day_of_week: number; // 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
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
}
