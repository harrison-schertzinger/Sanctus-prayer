/**
 * Local date utilities for Sanctus
 * NEVER use toISOString().split('T')[0] — it produces UTC dates.
 */

/**
 * Get today's date as YYYY-MM-DD in local timezone
 */
export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
