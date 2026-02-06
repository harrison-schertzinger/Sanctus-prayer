#!/usr/bin/env npx tsx
/**
 * Seed Night Prayer (Compline) into Supabase
 *
 * Reads the night_prayer_content.json and transforms combined liturgical
 * fields into the separate columns expected by the night_prayer table.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=xxx npx tsx scripts/seed-night-prayer.ts [path-to-json]
 *
 * Default JSON path: ../night_prayer_content.json (one level above project root)
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Shape of the input JSON (combined liturgical fields)
interface NightPrayerJSON {
  day_of_week: number;
  day_name: string;
  opening_verse: string;
  hymn: string;
  psalmody: string;
  reading: string;
  responsory: string;
  nunc_dimittis: string;
  closing_prayer: string;
  marian_antiphon: string;
  our_father: string;
  glory_be: string;
}

// Shape of the DB row (separate columns)
interface NightPrayerDBRow {
  day_of_week: number;
  examen_opening_prayer: string;
  examen_prompts: string[];
  examen_act_of_contrition: string;
  hymn: string;
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

// ─── Parsers ────────────────────────────────────────────────────

/**
 * Parse psalmody field into antiphon, reference(s), and text.
 * Handles days with multiple psalms (Wed: Ps 31 + Ps 130, Sat: Ps 4 + Ps 134).
 */
function parsePsalmody(psalmody: string): { antiphon: string; reference: string; text: string } {
  const lines = psalmody.split('\n');

  // Extract first antiphon (after "Antiphon: ")
  const firstAntiphonMatch = psalmody.match(/^Antiphon:\s*(.+)$/m);
  const antiphon = firstAntiphonMatch ? firstAntiphonMatch[1].trim() : '';

  // Find all psalm references (e.g., "Psalm 91 — The protection of the Most High")
  const psalmRefs: string[] = [];
  const psalmRefRegex = /^(Psalm \d+(?::[\d,-]+)?)\s*(?:—\s*(.+))?$/gm;
  let match;
  while ((match = psalmRefRegex.exec(psalmody)) !== null) {
    psalmRefs.push(match[1].trim());
  }
  const reference = psalmRefs.join('; ');

  // Extract text: everything between first psalm reference and final antiphon repetition.
  // Skip opening antiphon line, include psalm text, skip trailing Glory Be + closing antiphon.
  let startIdx = -1;
  let endIdx = lines.length;

  for (let i = 0; i < lines.length; i++) {
    // Find first Psalm reference line
    if (startIdx === -1 && lines[i].match(/^Psalm \d+/)) {
      startIdx = i; // Include the reference line as a header
      continue;
    }
  }

  // Find the LAST "Antiphon:" line (closing repetition) and trim from there
  for (let i = lines.length - 1; i > startIdx; i--) {
    if (lines[i].startsWith('Antiphon:')) {
      endIdx = i;
      break;
    }
  }

  // Also trim trailing Glory Be before last antiphon
  while (endIdx > 0 && lines[endIdx - 1].trim() === '') endIdx--;
  if (endIdx > 0 && lines[endIdx - 1].startsWith('Glory be')) endIdx--;
  while (endIdx > 0 && lines[endIdx - 1].trim() === '') endIdx--;

  const text = lines.slice(startIdx, endIdx).join('\n').trim();

  return { antiphon, reference, text };
}

/**
 * Parse reading field into reference and text.
 * Format: "Book Chapter:Verses\n\nText..."
 */
function parseReading(reading: string): { reference: string; text: string } {
  const lines = reading.split('\n').filter(l => l.trim());
  if (lines.length === 0) return { reference: '', text: '' };

  // First non-empty line is the reference
  const reference = lines[0].trim();
  // Remaining lines are the text
  const text = lines.slice(1).join('\n').trim();

  return { reference, text };
}

/**
 * Parse responsory into versicle and response.
 * Standard Compline responsory uses " — " to separate V/R parts:
 *   V. Into your hands... — R. Into your hands... V. You have redeemed us... — R. I commend my spirit...
 */
function parseResponsory(responsory: string): { versicle: string; response: string } {
  const parts = responsory.split(' — ');
  if (parts.length < 2) {
    return { versicle: responsory, response: '' };
  }

  // First part is the versicle
  const versicle = parts[0].trim();
  // Second part contains the echo + the continuation
  const response = parts.slice(1).join(' — ').trim();

  return { versicle, response };
}

/**
 * Parse Nunc Dimittis (Canticle of Simeon) into antiphon and text.
 * Format: "Antiphon: ...\n\nCanticle text...\n\nGlory be...\n\nAntiphon: ..."
 */
function parseNuncDimittis(nuncDimittis: string): { antiphon: string; text: string } {
  const lines = nuncDimittis.split('\n');

  // Extract antiphon
  const antiphonMatch = nuncDimittis.match(/^Antiphon:\s*(.+)$/m);
  const antiphon = antiphonMatch ? antiphonMatch[1].trim() : '';

  // Find canticle text: starts after the first Antiphon line,
  // ends before "Glory be" or last "Antiphon:" line
  let startIdx = -1;
  let endIdx = lines.length;

  for (let i = 0; i < lines.length; i++) {
    if (startIdx === -1 && lines[i].startsWith('Antiphon:')) {
      startIdx = i + 1;
      continue;
    }
  }

  // Find last antiphon repetition
  for (let i = lines.length - 1; i > startIdx; i--) {
    if (lines[i].startsWith('Antiphon:')) {
      endIdx = i;
      break;
    }
  }

  // Trim trailing Glory Be
  while (endIdx > 0 && lines[endIdx - 1].trim() === '') endIdx--;
  if (endIdx > 0 && lines[endIdx - 1].startsWith('Glory be')) endIdx--;
  while (endIdx > 0 && lines[endIdx - 1].trim() === '') endIdx--;

  const text = lines.slice(startIdx, endIdx).join('\n').trim();

  return { antiphon, text };
}

/**
 * Detect Marian antiphon name from its text.
 */
function detectMarianAntiphonName(text: string): string {
  if (text.includes('Hail, holy Queen')) return 'Salve Regina';
  if (text.includes('Alma Redemptoris')) return 'Alma Redemptoris Mater';
  if (text.includes('Ave Regina')) return 'Ave Regina Caelorum';
  if (text.includes('Regina Caeli')) return 'Regina Caeli';
  return 'Marian Antiphon';
}

// ─── Transform ──────────────────────────────────────────────────

function transformToDBRow(json: NightPrayerJSON): NightPrayerDBRow {
  const psalm = parsePsalmody(json.psalmody);
  const reading = parseReading(json.reading);
  const responsory = parseResponsory(json.responsory);
  const canticle = parseNuncDimittis(json.nunc_dimittis);

  return {
    day_of_week: json.day_of_week,
    examen_opening_prayer: json.opening_verse,
    examen_prompts: [],
    examen_act_of_contrition: '',
    hymn: json.hymn,
    psalm_antiphon: psalm.antiphon,
    psalm_reference: psalm.reference,
    psalm_text: psalm.text,
    reading_reference: reading.reference,
    reading_text: reading.text,
    responsory_versicle: responsory.versicle,
    responsory_response: responsory.response,
    canticle_antiphon: canticle.antiphon,
    canticle_text: canticle.text,
    closing_prayer: json.closing_prayer,
    marian_antiphon_name: detectMarianAntiphonName(json.marian_antiphon),
    marian_antiphon_text: json.marian_antiphon,
  };
}

// ─── Main ───────────────────────────────────────────────────────

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
  const jsonPath = process.argv[2] || resolve(__dirname, '..', 'night_prayer_content.json');
  console.log(`Reading from: ${jsonPath}`);

  let data: NightPrayerJSON[];
  try {
    const raw = readFileSync(jsonPath, 'utf-8');
    data = JSON.parse(raw);
  } catch (error: any) {
    console.error(`Failed to read JSON: ${error.message}`);
    process.exit(1);
  }

  if (!Array.isArray(data) || data.length !== 7) {
    console.error(`Expected 7 entries, got ${Array.isArray(data) ? data.length : 'non-array'}`);
    process.exit(1);
  }

  // Transform and preview
  console.log();
  console.log('Parsing liturgical content...');
  const rows: NightPrayerDBRow[] = [];

  for (const entry of data) {
    const row = transformToDBRow(entry);
    rows.push(row);

    const dayName = DAY_NAMES[row.day_of_week] || `Day ${row.day_of_week}`;
    console.log(`  ${dayName}: ${row.psalm_reference} | ${row.reading_reference} | ${row.marian_antiphon_name}`);
  }

  // Seed to Supabase
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  console.log();
  console.log('Seeding to Supabase...');

  for (const row of rows) {
    const dayName = DAY_NAMES[row.day_of_week] || `Day ${row.day_of_week}`;
    process.stdout.write(`  ${dayName} (day_of_week=${row.day_of_week}) ... `);

    // Upsert: delete existing then insert
    await supabase.from('night_prayer').delete().eq('day_of_week', row.day_of_week);
    const { error } = await supabase.from('night_prayer').insert(row);

    if (error) {
      console.log(`FAIL: ${error.message}`);
    } else {
      console.log(`OK (${row.psalm_reference})`);
    }
  }

  console.log();
  console.log('Done. All 7 days seeded.');
}

main().catch(console.error);
