/**
 * Liturgy API Service
 * Fetches daily Mass readings from Catholic liturgical sources
 */

import { DailyMassReadings, NightPrayerContent, LiturgyAPIResponse } from './types';
import { getFallbackReadings, getFallbackNightPrayer } from './fallback';

const API_TIMEOUT = 10000; // 10 seconds

/**
 * Fetch daily Mass readings
 * Attempts to fetch from API, falls back to local content
 */
export async function fetchDailyReadings(date: Date = new Date()): Promise<DailyMassReadings> {
  const dateStr = formatDateForAPI(date);

  try {
    // Try fetching from Evangelizo API (free Catholic readings API)
    const readings = await fetchFromEvangelizo(dateStr);
    if (readings) {
      return readings;
    }
  } catch (error) {
    console.log('API fetch failed, using fallback:', error);
  }

  // Fallback to local content
  return getFallbackReadings(date);
}

/**
 * Fetch Night Prayer (Compline) content
 */
export async function fetchNightPrayer(date: Date = new Date()): Promise<NightPrayerContent> {
  // For now, use comprehensive fallback content
  // API integration can be added later
  return getFallbackNightPrayer(date);
}

/**
 * Fetch from Evangelizo API
 * https://publication.evangelizo.ws/
 */
async function fetchFromEvangelizo(dateStr: string): Promise<DailyMassReadings | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    // Evangelizo API endpoint for daily readings
    const response = await fetch(
      `https://publication.evangelizo.ws/EN/days/${dateStr}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return parseEvangelizoResponse(data, dateStr);
  } catch (error) {
    console.log('Evangelizo API error:', error);
    return null;
  }
}

/**
 * Parse Evangelizo API response into our format
 */
function parseEvangelizoResponse(data: any, dateStr: string): DailyMassReadings | null {
  try {
    if (!data || !data.data) return null;

    const dayData = data.data;
    const readings = dayData.readings || [];

    // Find each reading type
    const firstReading = readings.find((r: any) => r.reading_code === 'L1');
    const psalm = readings.find((r: any) => r.reading_code === 'PS');
    const secondReading = readings.find((r: any) => r.reading_code === 'L2');
    const gospel = readings.find((r: any) => r.reading_code === 'GSP');

    if (!firstReading || !gospel) return null;

    return {
      date: dateStr,
      liturgicalDay: dayData.liturgic_title || 'Weekday',
      liturgicalColor: mapLiturgicalColor(dayData.liturgic_color),
      season: 'ordinary_time',

      firstReading: {
        type: 'first_reading',
        reference: firstReading.ref || '',
        text: firstReading.text || '',
        introduction: `A reading from ${firstReading.book_name || 'Scripture'}`,
      },

      responsorialPsalm: {
        reference: psalm?.ref || 'Psalm',
        response: psalm?.chorus || '',
        fullText: psalm?.text || '',
      },

      secondReading: secondReading ? {
        type: 'second_reading',
        reference: secondReading.ref || '',
        text: secondReading.text || '',
        introduction: `A reading from ${secondReading.book_name || 'Scripture'}`,
      } : undefined,

      gospel: {
        type: 'gospel',
        reference: gospel.ref || '',
        text: gospel.text || '',
        introduction: `A reading from the holy Gospel according to ${gospel.book_name || 'the Evangelist'}`,
      },

      saintOfDay: dayData.saint ? {
        name: dayData.saint.name || '',
        title: dayData.saint.title,
        biography: dayData.saint.biography,
      } : undefined,
    };
  } catch (error) {
    console.log('Error parsing Evangelizo response:', error);
    return null;
  }
}

function mapLiturgicalColor(color: string | undefined): DailyMassReadings['liturgicalColor'] {
  if (!color) return 'green';
  const colorMap: Record<string, DailyMassReadings['liturgicalColor']> = {
    'green': 'green',
    'white': 'white',
    'red': 'red',
    'violet': 'violet',
    'purple': 'violet',
    'rose': 'rose',
    'pink': 'rose',
    'black': 'black',
  };
  return colorMap[color.toLowerCase()] || 'green';
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
