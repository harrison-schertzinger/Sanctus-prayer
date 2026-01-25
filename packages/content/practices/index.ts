/**
 * Practice definitions for Sanctus Training
 */

import type { Practice } from '@sanctus/shared';

export const PRACTICES: Record<string, Practice> = {
  peace: {
    id: 'peace',
    name: 'Peace in His Presence',
    subtitle: 'Trust & Surrender',
    description: 'A 40-day journey of surrendering anxiety and cultivating deep trust in God\'s providence through contemplative prayer.',
    totalDays: 40,
    breathIn: 'My Lord and My God',
    breathOut: 'Jesus, I Trust in You',
  },
  // Future practices can be added here
};

export function getPractice(id: string): Practice | undefined {
  return PRACTICES[id];
}

export function getAllPractices(): Practice[] {
  return Object.values(PRACTICES);
}
