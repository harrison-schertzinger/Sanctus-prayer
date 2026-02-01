/**
 * Liturgy API Service
 * Fetches daily Mass readings and Night Prayer from Supabase,
 * with fallbacks to USCCB and local content
 */

import { DailyMassReadings, NightPrayerContent } from './types';
import { getFallbackReadings, getFallbackNightPrayer } from './fallback';
import { supabase, isSupabaseConfigured } from '../supabase';

const API_TIMEOUT = 15000; // 15 seconds for USCCB

/**
 * Fetch daily Mass readings
 * Attempts to fetch from Supabase, then USCCB, then fallback
 */
export async function fetchDailyReadings(date: Date = new Date()): Promise<DailyMassReadings> {
  const dateStr = formatDateForAPI(date);

  // 1. Try Supabase first (admin-uploaded content)
  if (isSupabaseConfigured() && supabase) {
    try {
      const readings = await fetchReadingsFromSupabase(dateStr);
      if (readings) {
        return readings;
      }
    } catch (error) {
      if (__DEV__) console.log('Supabase fetch failed:', error);
    }
  }

  // 2. Try USCCB (official US Catholic Conference readings)
  try {
    const readings = await fetchFromUSCCB(date);
    if (readings) {
      return readings;
    }
  } catch (error) {
    if (__DEV__) console.log('USCCB fetch failed:', error);
  }

  // 3. Fallback to local content
  return getFallbackReadings(date);
}

// Type for daily readings from Supabase (untyped database)
interface DailyReadingsRow {
  date: string;
  liturgical_day: string;
  liturgical_color: DailyMassReadings['liturgicalColor'];
  season: DailyMassReadings['season'];
  first_reading_reference: string;
  first_reading_text: string;
  first_reading_introduction?: string;
  psalm_reference: string;
  psalm_response: string;
  psalm_text: string;
  second_reading_reference?: string;
  second_reading_text?: string;
  second_reading_introduction?: string;
  gospel_reference: string;
  gospel_text: string;
  gospel_introduction?: string;
  saint_name?: string;
  saint_title?: string;
  saint_biography?: string;
}

/**
 * Fetch readings from Supabase
 */
async function fetchReadingsFromSupabase(dateStr: string): Promise<DailyMassReadings | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('daily_readings')
    .select('*')
    .eq('date', dateStr)
    .single();

  if (error || !data) return null;

  // Cast to expected shape (Supabase types not generated)
  const row = data as unknown as DailyReadingsRow;

  return {
    date: row.date,
    liturgicalDay: row.liturgical_day,
    liturgicalColor: row.liturgical_color,
    season: row.season,
    firstReading: {
      type: 'first_reading',
      reference: row.first_reading_reference,
      text: row.first_reading_text,
      introduction: row.first_reading_introduction || undefined,
    },
    responsorialPsalm: {
      reference: row.psalm_reference,
      response: row.psalm_response,
      fullText: row.psalm_text,
    },
    secondReading: row.second_reading_reference ? {
      type: 'second_reading',
      reference: row.second_reading_reference,
      text: row.second_reading_text || '',
      introduction: row.second_reading_introduction || undefined,
    } : undefined,
    gospel: {
      type: 'gospel',
      reference: row.gospel_reference,
      text: row.gospel_text,
      introduction: row.gospel_introduction || undefined,
    },
    saintOfDay: row.saint_name ? {
      name: row.saint_name,
      title: row.saint_title || undefined,
      biography: row.saint_biography || undefined,
    } : undefined,
  };
}

/**
 * Fetch Night Prayer (Compline) content
 * Fetches from Supabase by day of week (Monday content is always the same)
 */
export async function fetchNightPrayer(date: Date = new Date()): Promise<NightPrayerContent> {
  // Try Supabase first - night prayer is stored by day of week
  if (isSupabaseConfigured() && supabase) {
    try {
      const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, etc.
      const prayer = await fetchNightPrayerFromSupabase(dayOfWeek, date);
      if (prayer) {
        return prayer;
      }
    } catch (error) {
      if (__DEV__) console.log('Supabase night prayer fetch failed:', error);
    }
  }

  // Fallback to local content
  return getFallbackNightPrayer(date);
}

// Type for night prayer from Supabase (untyped database)
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

/**
 * Fetch night prayer from Supabase by day of week
 */
async function fetchNightPrayerFromSupabase(dayOfWeek: number, date: Date): Promise<NightPrayerContent | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('night_prayer')
    .select('*')
    .eq('day_of_week', dayOfWeek)
    .single();

  if (error || !data) return null;

  // Cast to expected shape (Supabase types not generated)
  const row = data as unknown as NightPrayerRow;

  return {
    date: formatDateForAPI(date),
    examen: {
      openingPrayer: row.examen_opening_prayer,
      examinationPrompts: row.examen_prompts,
      actOfContrition: row.examen_act_of_contrition,
    },
    hymn: row.hymn || undefined,
    psalm: {
      antiphon: row.psalm_antiphon,
      reference: row.psalm_reference,
      text: row.psalm_text,
    },
    reading: {
      reference: row.reading_reference,
      text: row.reading_text,
    },
    responsory: {
      versicle: row.responsory_versicle,
      response: row.responsory_response,
    },
    canticleOfSimeon: {
      antiphon: row.canticle_antiphon,
      text: row.canticle_text,
    },
    closingPrayer: row.closing_prayer,
    marianAntiphon: {
      name: row.marian_antiphon_name,
      text: row.marian_antiphon_text,
    },
  };
}

/**
 * Fetch from USCCB (United States Conference of Catholic Bishops)
 * Official source for Catholic lectionary readings in the US
 * Uses their markdown endpoint for complete readings
 */
async function fetchFromUSCCB(date: Date): Promise<DailyMassReadings | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    // USCCB date format: MMDDYY
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const usccbDate = `${month}${day}${year}`;

    const response = await fetch(
      `https://bible.usccb.org/bible/readings/${usccbDate}.cfm.md`,
      {
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
          'User-Agent': 'Sanctus Prayer App',
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (__DEV__) console.log('USCCB response not ok:', response.status);
      return null;
    }

    const markdown = await response.text();
    return parseUSCCBMarkdown(markdown, formatDateForAPI(date));
  } catch (error) {
    if (__DEV__) console.log('USCCB API error:', error);
    return null;
  }
}

/**
 * Parse USCCB markdown response into our format
 * The USCCB markdown format:
 * # Daily Readings
 * ## Liturgical Day Title (e.g., "Memorial of Saint John Bosco, Priest")
 * ### Reading I
 * [Book Chapter:Verses](link)
 * ...text...
 * ### Responsorial Psalm
 * [Psalm Reference](link)
 * R. response
 * ...verses...
 * ### Reading II (on Sundays)
 * ### Alleluia
 * ### Gospel
 */
function parseUSCCBMarkdown(markdown: string, dateStr: string): DailyMassReadings | null {
  try {
    if (!markdown || markdown.length < 100) return null;

    // Extract liturgical day from ## heading (not the # Daily Readings title)
    const liturgicalDayMatch = markdown.match(/^##\s+([^#\n]+)/m);
    let liturgicalDay = liturgicalDayMatch ? liturgicalDayMatch[1].trim() : 'Weekday';

    // Clean up liturgical day - remove any trailing navigation
    if (liturgicalDay.toLowerCase().includes('get the daily')) {
      liturgicalDay = 'Weekday';
    }

    // Split into sections by ### headings (USCCB uses ### for readings)
    const sections = markdown.split(/^###\s+/m).filter(s => s.trim());

    // Parse each section
    let firstReading: DailyMassReadings['firstReading'] | null = null;
    let responsorialPsalm: DailyMassReadings['responsorialPsalm'] | null = null;
    let secondReading: DailyMassReadings['secondReading'] | undefined;
    let gospel: DailyMassReadings['gospel'] | null = null;

    for (const section of sections) {
      const lines = section.split('\n');
      const sectionTitle = lines[0].toLowerCase().trim();

      // Handle both "Reading I" (weekdays) and "Reading 1" (Sundays) formats
      const isFirstReading = (sectionTitle.includes('reading i') || sectionTitle.includes('reading 1')) &&
        !sectionTitle.includes('reading ii') && !sectionTitle.includes('reading 2');
      const isSecondReading = sectionTitle.includes('reading ii') || sectionTitle.includes('reading 2');

      if (isFirstReading) {
        firstReading = parseReadingSection(lines, 'first_reading');
      } else if (sectionTitle.includes('responsorial psalm')) {
        responsorialPsalm = parsePsalmSection(lines);
      } else if (isSecondReading) {
        secondReading = parseReadingSection(lines, 'second_reading');
      } else if (sectionTitle.includes('gospel') && !sectionTitle.includes('alleluia')) {
        gospel = parseReadingSection(lines, 'gospel');
      }
    }

    // Validate we have required readings
    if (!firstReading || !gospel) {
      if (__DEV__) console.log('USCCB parse: Missing required readings', { firstReading: !!firstReading, gospel: !!gospel });
      return null;
    }

    // Default psalm if not found
    if (!responsorialPsalm) {
      responsorialPsalm = {
        reference: 'Psalm',
        response: '',
        fullText: '',
      };
    }

    return {
      date: dateStr,
      liturgicalDay,
      liturgicalColor: detectLiturgicalColor(liturgicalDay),
      season: detectLiturgicalSeason(liturgicalDay),
      firstReading,
      responsorialPsalm,
      secondReading,
      gospel,
    };
  } catch (error) {
    if (__DEV__) console.log('Error parsing USCCB markdown:', error);
    return null;
  }
}

/**
 * Check if a line contains junk/navigation content that should be excluded
 */
function isJunkContent(text: string): boolean {
  const junkPatterns = [
    /LISTEN PODCAST/i,
    /VIEW REFLECTION/i,
    /En Español/i,
    /View Calendar/i,
    /E-mail/i,
    /Daily Readings E-mails/i,
    /Copyright/i,
    /rights reserved/i,
    /Privacy Policy/i,
    /I Agree/i,
    /USCCB/i,
    /Confraternity/i,
    /Lectionary:/i,
    /Get Daily Readings/i,
    /subscribe/i,
    /podcasts?\//i,
    /video\//i,
    /calendar/i,
    /memorial.*\.cfm/i,
    /readings\/\d+/i,
    /Every Morning/i,
    /Every Evening/i,
    /Daily Readings/i,
    /Sign up/i,
    /Newsletter/i,
    /NAB[RE]?/i,
    /New American Bible/i,
    /Revised Edition/i,
  ];
  return junkPatterns.some(pattern => pattern.test(text));
}

/**
 * Check if a line looks like Scripture text (not navigation/metadata)
 */
function isScriptureText(line: string): boolean {
  const trimmed = line.trim();

  // Empty lines are not scripture
  if (!trimmed) return false;

  // Markdown formatting elements
  if (trimmed.startsWith('#')) return false;
  if (trimmed.startsWith('[') && trimmed.includes('](')) return false;
  if (trimmed.startsWith('-') && trimmed.includes('[')) return false;
  if (trimmed.startsWith('---')) return false;

  // Navigation/list items
  if (trimmed.startsWith('- ')) return false;
  if (trimmed.startsWith('* ')) return false;

  // Junk content
  if (isJunkContent(trimmed)) return false;

  // Very short lines that are likely navigation
  if (trimmed.length < 3) return false;

  // Looks like Scripture - has letters and reasonable length
  return /[a-zA-Z]{3,}/.test(trimmed);
}

/**
 * Parse a reading section (First Reading, Second Reading, or Gospel)
 * USCCB format has reference as markdown link: [Book Chapter:Verses](url)
 */
function parseReadingSection(
  lines: string[],
  type: 'first_reading' | 'second_reading' | 'gospel'
): DailyMassReadings['firstReading'] {
  // Skip the section title line
  const contentLines = lines.slice(1);

  let reference = '';
  let foundReference = false;
  const textLines: string[] = [];

  for (const line of contentLines) {
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) continue;

    // USCCB format: reference is markdown link [Book Chapter:Verses](url)
    // Only accept the FIRST link as the reference (scripture reference)
    const linkMatch = trimmed.match(/^\s*\[([^\]]+)\]\(<[^>]+>\s*\)/);
    if (linkMatch && !foundReference) {
      // Verify this looks like a scripture reference (has chapter:verse pattern)
      const potentialRef = linkMatch[1].trim();
      if (potentialRef.match(/\d+:\d+/) || potentialRef.match(/psalm/i)) {
        reference = potentialRef;
        foundReference = true;
        continue;
      }
    }

    // Skip all other links and navigation
    if (trimmed.startsWith('[') || trimmed.includes('](')) continue;
    if (trimmed.startsWith('-')) continue;

    // Only collect text after we've found the reference
    if (foundReference && isScriptureText(trimmed)) {
      textLines.push(trimmed);
    }
  }

  // Join text with proper paragraph spacing
  const rawText = textLines.join('\n');

  // Clean up the text
  const cleanedText = cleanReadingText(rawText);

  // Generate introduction based on type
  let introduction = '';
  if (type === 'gospel') {
    const bookName = extractBookName(reference);
    introduction = `A reading from the holy Gospel according to ${bookName}`;
  } else {
    const bookName = extractBookName(reference);
    introduction = `A reading from ${bookName}`;
  }

  return {
    type,
    reference,
    text: cleanedText,
    introduction,
  };
}

/**
 * Check if a line is valid psalm verse text (more permissive than regular scripture)
 * Psalms are poetry - they have short lines, that's intentional
 */
function isPsalmVerseText(text: string): boolean {
  const trimmed = text.trim();

  // Empty lines - skip
  if (!trimmed) return false;

  // Markdown elements - skip
  if (trimmed.startsWith('#')) return false;
  if (trimmed.startsWith('[') && trimmed.includes('](')) return false;
  if (trimmed.startsWith('---')) return false;

  // Navigation list items - skip
  if (trimmed.startsWith('- [')) return false;
  if (trimmed.startsWith('* [')) return false;

  // Response markers - skip (handled separately)
  if (trimmed.match(/^R[.\s:]/i)) return false;

  // Obvious junk - skip
  if (isJunkContent(trimmed)) return false;

  // Allow even short lines - Psalms are poetry!
  // Just needs to have at least one letter
  return /[a-zA-Z]/.test(trimmed);
}

/**
 * Parse responsorial psalm section
 * USCCB format:
 * [Psalm Reference](url)
 * R. (verse) **Response text**
 * Verse line 1
 * Verse line 2
 * R. **Response text** (repeated between stanzas)
 * More verses...
 */
function parsePsalmSection(lines: string[]): DailyMassReadings['responsorialPsalm'] {
  const contentLines = lines.slice(1);

  let reference = '';
  let response = '';
  const verseLines: string[] = [];
  let foundReference = false;
  let foundFirstResponse = false;

  for (const line of contentLines) {
    const trimmed = line.trim();

    // Skip completely empty lines but preserve structure
    if (!trimmed) {
      // Add blank line for stanza separation if we have verses
      if (verseLines.length > 0 && verseLines[verseLines.length - 1] !== '') {
        verseLines.push('');
      }
      continue;
    }

    // Skip headers and horizontal rules
    if (trimmed.startsWith('#') || trimmed.startsWith('---')) continue;

    // Skip navigation list items
    if (trimmed.startsWith('- [') || trimmed.startsWith('* [')) continue;

    // Skip junk content
    if (isJunkContent(trimmed)) continue;

    // USCCB format: reference is markdown link [Psalm X:Y](url)
    const linkMatch = trimmed.match(/^\s*\[([^\]]+)\]\(/);
    if (linkMatch && !foundReference) {
      const potentialRef = linkMatch[1].trim();
      if (potentialRef.match(/psalm/i) || potentialRef.match(/\d+:\d+/)) {
        reference = potentialRef;
        foundReference = true;
        continue;
      }
    }

    // Skip other links
    if (trimmed.startsWith('[') && trimmed.includes('](')) continue;

    // Skip "or:" lines (alternate responses on Sundays)
    if (trimmed.match(/^or:?\s*$/i)) continue;

    // Handle response lines (R. markers)
    if (trimmed.match(/^R[.\s:]/i)) {
      if (!foundFirstResponse) {
        // First R. line - extract the response text
        let responseText = trimmed.replace(/^R[.\s:]+/i, '').trim();
        // Remove parenthetical verse numbers like "(12a)" or "(Mt 5:3)"
        responseText = responseText.replace(/^\([^)]+\)\s*/, '').trim();
        // Remove markdown bold
        responseText = responseText.replace(/\*\*/g, '').trim();
        response = responseText;
        foundFirstResponse = true;
      }
      // All R. lines (including repeats) mark stanza breaks
      if (verseLines.length > 0 && verseLines[verseLines.length - 1] !== '') {
        verseLines.push(''); // Add stanza break
      }
      continue;
    }

    // Collect verse lines after we've found the reference
    if (foundReference && isPsalmVerseText(trimmed)) {
      verseLines.push(trimmed);
    }
  }

  // Clean up the verse text
  // Remove trailing empty lines and consecutive empty lines
  const cleanedVerses = verseLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')  // Max 2 newlines (1 blank line)
    .replace(/\*\*/g, '')  // Remove any remaining bold markers
    .trim();

  return {
    reference: reference || 'Psalm',
    response,
    fullText: cleanedVerses,
  };
}

/**
 * Extract book name from reference like "2 Samuel 12:1-7a"
 */
function extractBookName(reference: string): string {
  if (!reference) return 'Scripture';

  // Match book name before chapter:verse
  const match = reference.match(/^((?:\d\s+)?[A-Za-z]+(?:\s+[A-Za-z]+)?)/);
  if (match) {
    const bookName = match[1].trim();
    // Handle special cases
    if (bookName.toLowerCase() === 'mt' || bookName.toLowerCase() === 'matthew') return 'Matthew';
    if (bookName.toLowerCase() === 'mk' || bookName.toLowerCase() === 'mark') return 'Mark';
    if (bookName.toLowerCase() === 'lk' || bookName.toLowerCase() === 'luke') return 'Luke';
    if (bookName.toLowerCase() === 'jn' || bookName.toLowerCase() === 'john') return 'John';
    return bookName;
  }
  return 'Scripture';
}

/**
 * Clean up reading text from markdown and convert to flowing prose
 * USCCB uses line breaks for liturgical proclamation, but we want readable prose
 */
function cleanReadingText(text: string): string {
  // Split into lines for filtering
  const lines = text.split('\n');

  // Filter out any remaining junk lines
  const cleanLines = lines.filter(line => {
    const trimmed = line.trim();
    if (!trimmed) return true; // Keep empty lines for paragraph spacing
    if (isJunkContent(trimmed)) return false;
    if (trimmed.startsWith('-') && trimmed.includes('[')) return false;
    if (trimmed.startsWith('[') && trimmed.includes('](')) return false;
    return true;
  });

  // Remove markdown formatting first
  let cleaned = cleanLines.join('\n')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s{2,}$/gm, '');

  // Convert to flowing prose:
  // Split by paragraph breaks (2+ newlines), then join lines within paragraphs
  const paragraphs = cleaned.split(/\n\n+/);

  const flowingParagraphs = paragraphs.map(para => {
    // Join lines within a paragraph into continuous prose
    return para
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join(' ')
      // Clean up any double spaces
      .replace(/\s+/g, ' ')
      .trim();
  }).filter(para => para.length > 0);

  return flowingParagraphs.join('\n\n');
}

/**
 * Detect liturgical color from day title
 */
function detectLiturgicalColor(title: string): DailyMassReadings['liturgicalColor'] {
  const lower = title.toLowerCase();
  if (lower.includes('martyr') || lower.includes('passion') || lower.includes('pentecost')) return 'red';
  if (lower.includes('advent') || lower.includes('lent')) return 'violet';
  if (lower.includes('christmas') || lower.includes('easter') || lower.includes('solemnity')) return 'white';
  if (lower.includes('gaudete') || lower.includes('laetare')) return 'rose';
  return 'green';
}

/**
 * Detect liturgical season from day title
 */
function detectLiturgicalSeason(title: string): DailyMassReadings['season'] {
  const lower = title.toLowerCase();
  if (lower.includes('advent')) return 'advent';
  if (lower.includes('christmas') || lower.includes('epiphany')) return 'christmas';
  if (lower.includes('lent') || lower.includes('ash wednesday')) return 'lent';
  if (lower.includes('easter') || lower.includes('ascension') || lower.includes('pentecost')) return 'easter';
  return 'ordinary_time';
}

function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get liturgical season for a date
 */
export function getLiturgicalSeason(date: Date): DailyMassReadings['season'] {
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  // Approximate dates (actual dates vary by year)
  // Advent: ~Nov 27 - Dec 24
  if ((month === 10 && day >= 27) || (month === 11 && day <= 24)) {
    return 'advent';
  }
  // Christmas: Dec 25 - ~Jan 12
  if ((month === 11 && day >= 25) || (month === 0 && day <= 12)) {
    return 'christmas';
  }
  // Lent: ~Feb/Mar for 40 days before Easter
  // Easter: ~Mar/Apr for 50 days after
  // This is simplified - real calculation requires Easter date

  return 'ordinary_time';
}

/**
 * Format date for display
 */
export function formatLiturgicalDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
