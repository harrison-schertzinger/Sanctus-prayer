#!/usr/bin/env npx tsx
/**
 * Seed Daily Readings into Supabase
 *
 * Fetches daily Mass readings from USCCB for a date range and inserts
 * them into the Supabase daily_readings table as a fallback cache.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=xxx npx tsx scripts/seed-daily-readings.ts
 *
 * Environment variables:
 *   SUPABASE_URL         - Your Supabase project URL
 *   SUPABASE_SERVICE_KEY  - Service role key (bypasses RLS for inserts)
 *
 * Date range: Feb 6, 2026 through Apr 15, 2026 (69 days)
 */

import { createClient } from '@supabase/supabase-js';

// ============================================
// Configuration
// ============================================

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const START_DATE = new Date(2026, 1, 6);  // Feb 6, 2026 (month is 0-indexed)
const END_DATE = new Date(2026, 3, 15);   // Apr 15, 2026

const API_TIMEOUT = 15000;
const DELAY_BETWEEN_REQUESTS = 2000; // Be respectful to USCCB servers

// ============================================
// Types
// ============================================

interface DailyReadingsRow {
  date: string;
  liturgical_day: string;
  liturgical_color: string;
  season: string;
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
}

// ============================================
// USCCB Parser (extracted from apps/mobile/lib/liturgy/api.ts)
// ============================================

function isJunkContent(text: string): boolean {
  const junkPatterns = [
    /LISTEN PODCAST/i, /VIEW REFLECTION/i, /En Español/i,
    /View Calendar/i, /E-mail/i, /Daily Readings E-mails/i,
    /Copyright/i, /rights reserved/i, /Privacy Policy/i,
    /I Agree/i, /USCCB/i, /Confraternity/i, /Lectionary:/i,
    /Get Daily Readings/i, /subscribe/i, /podcasts?\//i,
    /video\//i, /calendar/i, /memorial.*\.cfm/i,
    /readings\/\d+/i, /Every Morning/i, /Every Evening/i,
    /Daily Readings/i, /Sign up/i, /Newsletter/i,
    /NAB[RE]?/i, /New American Bible/i, /Revised Edition/i,
  ];
  return junkPatterns.some(pattern => pattern.test(text));
}

function isScriptureText(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('#')) return false;
  if (trimmed.startsWith('[') && trimmed.includes('](')) return false;
  if (trimmed.startsWith('-') && trimmed.includes('[')) return false;
  if (trimmed.startsWith('---')) return false;
  if (trimmed.startsWith('- ')) return false;
  if (trimmed.startsWith('* ')) return false;
  if (isJunkContent(trimmed)) return false;
  if (trimmed.length < 3) return false;
  return /[a-zA-Z]{3,}/.test(trimmed);
}

function isPsalmVerseText(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('#')) return false;
  if (trimmed.startsWith('[') && trimmed.includes('](')) return false;
  if (trimmed.startsWith('---')) return false;
  if (trimmed.startsWith('- [')) return false;
  if (trimmed.startsWith('* [')) return false;
  if (trimmed.match(/^R[.\s:]/i)) return false;
  if (isJunkContent(trimmed)) return false;
  return /[a-zA-Z]/.test(trimmed);
}

function cleanReadingText(text: string): string {
  const lines = text.split('\n');
  const cleanLines = lines.filter(line => {
    const trimmed = line.trim();
    if (!trimmed) return true;
    if (isJunkContent(trimmed)) return false;
    if (trimmed.startsWith('-') && trimmed.includes('[')) return false;
    if (trimmed.startsWith('[') && trimmed.includes('](')) return false;
    return true;
  });

  let cleaned = cleanLines.join('\n')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s{2,}$/gm, '');

  const paragraphs = cleaned.split(/\n\n+/);
  const flowingParagraphs = paragraphs.map(para => {
    return para.split('\n').map(l => l.trim()).filter(l => l.length > 0).join(' ')
      .replace(/\s+/g, ' ').trim();
  }).filter(para => para.length > 0);

  return flowingParagraphs.join('\n\n');
}

function extractBookName(reference: string): string {
  if (!reference) return 'Scripture';
  const match = reference.match(/^((?:\d\s+)?[A-Za-z]+(?:\s+[A-Za-z]+)?)/);
  if (match) {
    const bookName = match[1].trim();
    const abbrevs: Record<string, string> = {
      mt: 'Matthew', mk: 'Mark', lk: 'Luke', jn: 'John',
      matthew: 'Matthew', mark: 'Mark', luke: 'Luke', john: 'John',
    };
    return abbrevs[bookName.toLowerCase()] || bookName;
  }
  return 'Scripture';
}

interface ReadingResult {
  type: string;
  reference: string;
  text: string;
  introduction: string;
}

function parseReadingSection(lines: string[], type: string): ReadingResult {
  const contentLines = lines.slice(1);
  let reference = '';
  let foundReference = false;
  const textLines: string[] = [];

  for (const line of contentLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const linkMatch = trimmed.match(/^\s*\[([^\]]+)\]\(<[^>]+>\s*\)/);
    if (linkMatch && !foundReference) {
      const potentialRef = linkMatch[1].trim();
      if (potentialRef.match(/\d+:\d+/) || potentialRef.match(/psalm/i)) {
        reference = potentialRef;
        foundReference = true;
        continue;
      }
    }

    if (trimmed.startsWith('[') || trimmed.includes('](')) continue;
    if (trimmed.startsWith('-')) continue;

    if (foundReference && isScriptureText(trimmed)) {
      textLines.push(trimmed);
    }
  }

  const rawText = textLines.join('\n');
  const cleanedText = cleanReadingText(rawText);

  let introduction = '';
  if (type === 'gospel') {
    introduction = `A reading from the holy Gospel according to ${extractBookName(reference)}`;
  } else {
    introduction = `A reading from ${extractBookName(reference)}`;
  }

  return { type, reference, text: cleanedText, introduction };
}

interface PsalmResult {
  reference: string;
  response: string;
  fullText: string;
}

function parsePsalmSection(lines: string[]): PsalmResult {
  const contentLines = lines.slice(1);
  let reference = '';
  let response = '';
  const verseLines: string[] = [];
  let foundReference = false;
  let foundFirstResponse = false;

  for (const line of contentLines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (verseLines.length > 0 && verseLines[verseLines.length - 1] !== '') {
        verseLines.push('');
      }
      continue;
    }

    if (trimmed.startsWith('#') || trimmed.startsWith('---')) continue;
    if (trimmed.startsWith('- [') || trimmed.startsWith('* [')) continue;
    if (isJunkContent(trimmed)) continue;

    const linkMatch = trimmed.match(/^\s*\[([^\]]+)\]\(/);
    if (linkMatch && !foundReference) {
      const potentialRef = linkMatch[1].trim();
      if (potentialRef.match(/psalm/i) || potentialRef.match(/\d+:\d+/)) {
        reference = potentialRef;
        foundReference = true;
        continue;
      }
    }

    if (trimmed.startsWith('[') && trimmed.includes('](')) continue;
    if (trimmed.match(/^or:?\s*$/i)) continue;

    if (trimmed.match(/^R[.\s:]/i)) {
      if (!foundFirstResponse) {
        let responseText = trimmed.replace(/^R[.\s:]+/i, '').trim();
        responseText = responseText.replace(/^\([^)]+\)\s*/, '').trim();
        responseText = responseText.replace(/\*\*/g, '').trim();
        response = responseText;
        foundFirstResponse = true;
      }
      if (verseLines.length > 0 && verseLines[verseLines.length - 1] !== '') {
        verseLines.push('');
      }
      continue;
    }

    if (foundReference && isPsalmVerseText(trimmed)) {
      verseLines.push(trimmed);
    }
  }

  const cleanedVerses = verseLines.join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\*\*/g, '')
    .trim();

  return { reference: reference || 'Psalm', response, fullText: cleanedVerses };
}

function detectLiturgicalColor(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('martyr') || lower.includes('passion') || lower.includes('pentecost')) return 'red';
  if (lower.includes('advent') || lower.includes('lent')) return 'violet';
  if (lower.includes('christmas') || lower.includes('easter') || lower.includes('solemnity')) return 'white';
  if (lower.includes('gaudete') || lower.includes('laetare')) return 'rose';
  return 'green';
}

function detectLiturgicalSeason(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('advent')) return 'advent';
  if (lower.includes('christmas') || lower.includes('epiphany')) return 'christmas';
  if (lower.includes('lent') || lower.includes('ash wednesday')) return 'lent';
  if (lower.includes('easter') || lower.includes('ascension') || lower.includes('pentecost')) return 'easter';
  return 'ordinary_time';
}

function parseUSCCBMarkdown(markdown: string, dateStr: string): DailyReadingsRow | null {
  try {
    if (!markdown || markdown.length < 100) return null;

    const liturgicalDayMatch = markdown.match(/^##\s+([^#\n]+)/m);
    let liturgicalDay = liturgicalDayMatch ? liturgicalDayMatch[1].trim() : 'Weekday';
    if (liturgicalDay.toLowerCase().includes('get the daily')) liturgicalDay = 'Weekday';

    const sections = markdown.split(/^###\s+/m).filter(s => s.trim());

    let firstReading: ReadingResult | null = null;
    let psalm: PsalmResult | null = null;
    let secondReading: ReadingResult | null = null;
    let gospel: ReadingResult | null = null;

    for (const section of sections) {
      const lines = section.split('\n');
      const sectionTitle = lines[0].toLowerCase().trim();

      const isFirst = (sectionTitle.includes('reading i') || sectionTitle.includes('reading 1')) &&
        !sectionTitle.includes('reading ii') && !sectionTitle.includes('reading 2');
      const isSecond = sectionTitle.includes('reading ii') || sectionTitle.includes('reading 2');

      if (isFirst) {
        firstReading = parseReadingSection(lines, 'first_reading');
      } else if (sectionTitle.includes('responsorial psalm')) {
        psalm = parsePsalmSection(lines);
      } else if (isSecond) {
        secondReading = parseReadingSection(lines, 'second_reading');
      } else if (sectionTitle.includes('gospel') && !sectionTitle.includes('alleluia')) {
        gospel = parseReadingSection(lines, 'gospel');
      }
    }

    if (!firstReading || !gospel) return null;

    if (!psalm) {
      psalm = { reference: 'Psalm', response: '', fullText: '' };
    }

    return {
      date: dateStr,
      liturgical_day: liturgicalDay,
      liturgical_color: detectLiturgicalColor(liturgicalDay),
      season: detectLiturgicalSeason(liturgicalDay),
      first_reading_reference: firstReading.reference,
      first_reading_text: firstReading.text,
      first_reading_introduction: firstReading.introduction,
      psalm_reference: psalm.reference,
      psalm_response: psalm.response,
      psalm_text: psalm.fullText,
      second_reading_reference: secondReading?.reference || null,
      second_reading_text: secondReading?.text || null,
      second_reading_introduction: secondReading?.introduction || null,
      gospel_reference: gospel.reference,
      gospel_text: gospel.text,
      gospel_introduction: gospel.introduction,
    };
  } catch (error) {
    return null;
  }
}

// ============================================
// USCCB Fetcher
// ============================================

async function fetchFromUSCCB(date: Date): Promise<DailyReadingsRow | null> {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const usccbDate = `${month}${day}${year}`;
  const dateStr = `${date.getFullYear()}-${month}-${day}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(
      `https://bible.usccb.org/bible/readings/${usccbDate}.cfm.md`,
      {
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
          'User-Agent': 'Sanctus Prayer App/1.0',
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log(`  ❌ USCCB returned ${response.status} for ${dateStr}`);
      return null;
    }

    const markdown = await response.text();
    return parseUSCCBMarkdown(markdown, dateStr);
  } catch (error: any) {
    console.log(`  ❌ Fetch error for ${dateStr}: ${error.message}`);
    return null;
  }
}

// ============================================
// Date Utilities
// ============================================

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// Main
// ============================================

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log(' Sanctus Daily Readings Seeder');
  console.log('═══════════════════════════════════════════');
  console.log();

  // Validate environment
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing environment variables:');
    console.error('  SUPABASE_URL         - Your Supabase project URL');
    console.error('  SUPABASE_SERVICE_KEY  - Service role key (from Supabase dashboard > Settings > API)');
    console.error();
    console.error('Usage:');
    console.error('  SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=xxx npx tsx scripts/seed-daily-readings.ts');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const dates = getDateRange(START_DATE, END_DATE);
  console.log(`Date range: ${formatDate(START_DATE)} to ${formatDate(END_DATE)}`);
  console.log(`Total dates: ${dates.length}`);
  console.log();

  let success = 0;
  let failed = 0;
  let skipped = 0;
  const failedDates: string[] = [];

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const dateStr = formatDate(date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    process.stdout.write(`[${i + 1}/${dates.length}] ${dateStr} (${dayName}) ... `);

    // Check if already exists
    const { data: existing } = await supabase
      .from('daily_readings')
      .select('date')
      .eq('date', dateStr)
      .single();

    if (existing) {
      console.log('already exists, skipping');
      skipped++;
      continue;
    }

    // Fetch from USCCB
    const readings = await fetchFromUSCCB(date);

    if (!readings) {
      console.log('FAILED - no data from USCCB');
      failed++;
      failedDates.push(dateStr);
      await sleep(DELAY_BETWEEN_REQUESTS);
      continue;
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('daily_readings')
      .insert(readings);

    if (error) {
      console.log(`FAILED - Supabase error: ${error.message}`);
      failed++;
      failedDates.push(dateStr);
    } else {
      console.log(`✅ ${readings.liturgical_day}`);
      success++;
    }

    // Rate limit
    await sleep(DELAY_BETWEEN_REQUESTS);
  }

  // Summary
  console.log();
  console.log('═══════════════════════════════════════════');
  console.log(' Summary');
  console.log('═══════════════════════════════════════════');
  console.log(`  ✅ Inserted:  ${success}`);
  console.log(`  ⏭️  Skipped:   ${skipped}`);
  console.log(`  ❌ Failed:    ${failed}`);
  console.log();

  if (failedDates.length > 0) {
    console.log('Failed dates (may need manual entry via admin panel):');
    failedDates.forEach(d => console.log(`  - ${d}`));
    console.log();
  }

  console.log('Done.');
}

main().catch(console.error);
