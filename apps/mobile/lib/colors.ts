/**
 * SANCTUS Color System
 *
 * This file provides backward compatibility with existing code.
 * The canonical design system is in design.ts
 *
 * Migration: Import from '@/lib/design' for the full design system.
 */

import {
  colors as designColors,
  shadows as designShadows,
  spacing as designSpacing,
  radius as designRadius,
  typography as designTypography,
} from './design';

// ============================================
// PRIMARY EXPORTS (New Design System)
// ============================================

export const colors = {
  // Backgrounds - Luminous, warm, sacred
  background: designColors.background,
  surface: designColors.surface,
  surfaceLight: designColors.surfaceSecondary,
  surfaceBorder: designColors.surfaceBorder,
  surfaceElevated: designColors.surface,

  // Primary Accent - Sacred Blue
  primary: designColors.primary,
  primaryLight: designColors.primaryLight,
  primaryMuted: designColors.primaryMuted,
  primaryFaint: designColors.primaryFaint,

  // Gold Accents - Burnished, luminous
  gold: designColors.gold,
  goldMuted: designColors.goldMuted,
  goldLight: designColors.goldLight,
  goldDark: '#9A7209', // Pressed state
  goldFaint: designColors.goldFaint,

  // Wine Accent - Sacred, passion
  wine: designColors.wine,
  wineLight: designColors.wineLight,
  wineFaint: designColors.wineFaint,

  // Text - Warm, readable
  text: designColors.text,
  textPrimary: designColors.text,
  textSecondary: designColors.textSecondary,
  textMuted: designColors.textMuted,
  textInverse: designColors.textInverse,

  // Semantic
  success: designColors.success,
  successLight: designColors.successLight,
  error: designColors.error,
  errorLight: designColors.errorLight,
  warning: designColors.warning,
  warningLight: designColors.warningLight,

  // Borders
  border: designColors.border,
  borderLight: designColors.borderLight,
  borderFocus: designColors.borderFocus,

  // Shadow
  shadowColor: designColors.shadowColor,

  // Night Prayer Mode - Midnight contemplation
  night: designColors.night,

  // Legacy aliases
  nightOverlay: designColors.night.background,
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = designShadows;

// ============================================
// SPACING
// ============================================

export const spacing = designSpacing;

// ============================================
// RADIUS
// ============================================

export const radius = designRadius;

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = designTypography;

// ============================================
// RE-EXPORTS
// ============================================

export {
  components,
  nightComponents,
  animation,
} from './design';
