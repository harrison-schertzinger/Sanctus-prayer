/**
 * Liturgy Types
 * Types for Catholic Mass readings and liturgical calendar
 */

export interface LiturgicalReading {
  type: 'first_reading' | 'psalm' | 'second_reading' | 'gospel' | 'alleluia';
  reference: string;      // e.g., "Isaiah 6:1-8"
  text: string;           // Full text of the reading
  introduction?: string;  // "A reading from the Book of Isaiah"
}

export interface PsalmResponse {
  response: string;       // "The Lord is my shepherd; there is nothing I shall want."
  verses: string[];       // Individual verses
}

export interface GospelAcclamation {
  verse: string;          // The alleluia verse
  reference?: string;     // Scripture reference for the verse
}

export interface DailyMassReadings {
  date: string;                           // ISO date string
  liturgicalDay: string;                  // "Friday of the Third Week in Ordinary Time"
  liturgicalColor?: LiturgicalColor;      // green, white, red, violet, rose
  season: LiturgicalSeason;

  firstReading: LiturgicalReading;
  responsorialPsalm: {
    reference: string;
    response: string;
    fullText: string;
  };
  secondReading?: LiturgicalReading;      // Only on Sundays/Solemnities
  gospelAcclamation?: GospelAcclamation;
  gospel: LiturgicalReading;

  // Optional saint/feast information
  saintOfDay?: {
    name: string;
    title?: string;                       // "Doctor of the Church"
    biography?: string;
  };
}

export type LiturgicalColor = 'green' | 'white' | 'red' | 'violet' | 'rose' | 'black';

export type LiturgicalSeason =
  | 'advent'
  | 'christmas'
  | 'ordinary_time'
  | 'lent'
  | 'easter'
  | 'triduum';

export interface LiturgyOfTheHours {
  date: string;
  hour: HourType;
  hymn?: string;
  psalms: {
    antiphon: string;
    reference: string;
    text: string;
  }[];
  reading: {
    reference: string;
    text: string;
  };
  responsory?: string;
  canticle?: {
    name: string;        // "Canticle of Mary" / "Canticle of Simeon"
    antiphon: string;
    text: string;
  };
  intercessions?: string[];
  prayer: string;
}

export type HourType =
  | 'office_of_readings'
  | 'morning_prayer'      // Lauds
  | 'daytime_prayer'      // Terce, Sext, None
  | 'evening_prayer'      // Vespers
  | 'night_prayer';       // Compline

export interface NightPrayerContent {
  date: string;
  examen: {
    openingPrayer: string;
    examinationPrompts: string[];
    actOfContrition: string;
  };
  hymn?: string;
  psalm: {
    antiphon: string;
    reference: string;
    text: string;
  };
  reading: {
    reference: string;
    text: string;
  };
  responsory: {
    versicle: string;
    response: string;
  };
  canticleOfSimeon: {
    antiphon: string;
    text: string;
  };
  closingPrayer: string;
  marianAntiphon: {
    name: string;         // "Salve Regina", "Alma Redemptoris", etc.
    text: string;
  };
}

// API Response types
export interface LiturgyAPIResponse {
  success: boolean;
  data?: DailyMassReadings;
  error?: string;
}

export interface NightPrayerAPIResponse {
  success: boolean;
  data?: NightPrayerContent;
  error?: string;
}
