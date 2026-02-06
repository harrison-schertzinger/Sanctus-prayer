#!/usr/bin/env npx tsx
/**
 * Seed Night Prayer into Supabase
 *
 * Reads night prayer content from a JSON file and inserts into the
 * Supabase night_prayer table (7 rows, one per day of week).
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=xxx npx tsx scripts/seed-night-prayer.ts [path-to-json]
 *
 * JSON format: Array of 7 objects matching the night_prayer table schema.
 * See scripts/night-prayer-template.json for the expected structure.
 *
 * Environment variables:
 *   SUPABASE_URL          - Your Supabase project URL
 *   SUPABASE_SERVICE_KEY  - Service role key (bypasses RLS for inserts)
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface NightPrayerRow {
  day_of_week: number;
  examen_opening_prayer: string;
  examen_prompts: string[];
  examen_act_of_contrition: string;
  hymn?: string;
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
}

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log(' Sanctus Night Prayer Seeder');
  console.log('═══════════════════════════════════════════');
  console.log();

  // Validate environment
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing environment variables:');
    console.error('  SUPABASE_URL          - Your Supabase project URL');
    console.error('  SUPABASE_SERVICE_KEY  - Service role key');
    console.error();
    console.error('Usage:');
    console.error('  SUPABASE_URL=xxx SUPABASE_SERVICE_KEY=xxx npx tsx scripts/seed-night-prayer.ts [night-prayer.json]');
    process.exit(1);
  }

  // Read JSON file
  const jsonPath = process.argv[2] || resolve(__dirname, 'night-prayer-data.json');
  console.log(`Reading from: ${jsonPath}`);

  let data: NightPrayerRow[];
  try {
    const raw = readFileSync(jsonPath, 'utf-8');
    data = JSON.parse(raw);
  } catch (error: any) {
    console.error(`Failed to read JSON: ${error.message}`);
    console.error();
    console.error('Expected: Array of 7 NightPrayerRow objects (day_of_week 0-6)');
    process.exit(1);
  }

  if (!Array.isArray(data) || data.length !== 7) {
    console.error(`Expected 7 entries, got ${Array.isArray(data) ? data.length : 'non-array'}`);
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  console.log();
  for (const row of data) {
    const dayName = DAY_NAMES[row.day_of_week] || `Day ${row.day_of_week}`;
    process.stdout.write(`  ${dayName} (day_of_week=${row.day_of_week}) ... `);

    // Upsert (delete existing + insert)
    await supabase.from('night_prayer').delete().eq('day_of_week', row.day_of_week);

    const { error } = await supabase.from('night_prayer').insert(row);

    if (error) {
      console.log(`❌ ${error.message}`);
    } else {
      console.log(`✅ ${row.psalm_reference}`);
    }
  }

  console.log();
  console.log('Done.');
}

main().catch(console.error);
