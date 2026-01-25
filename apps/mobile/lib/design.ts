/**
 * SANCTUS Design System
 *
 * A sacred visual language inspired by:
 * - Morning light through cathedral windows
 * - Marble and gold in Renaissance chapels
 * - Illuminated manuscripts
 * - The warmth of candlelight on cream parchment
 *
 * "Diamond, marble, the awe-inspiring nature of the highest goods"
 */

// ============================================
// COLOR PALETTE
// ============================================

export const colors = {
  // Primary Backgrounds - Luminous, warm, like aged parchment
  background: '#F8F5F0',           // Ivory/Parchment - primary bg
  backgroundPure: '#FFFDF9',       // Pure warm white - for emphasis
  backgroundMuted: '#F0EDE6',      // Slightly darker - for depth

  // Surfaces - Elevated elements with warmth
  surface: '#FFFFFF',              // Cards, elevated surfaces
  surfaceSecondary: '#FAF8F5',     // Secondary cards, input backgrounds
  surfaceBorder: '#E8E4DD',        // Subtle warm borders
  surfaceHover: '#F5F2ED',         // Hover states

  // Sacred Blue - Primary accent (depth, wisdom, Mary's mantle)
  primary: '#1A365D',              // Deep sacred blue - main accent
  primaryLight: '#2B4A7C',         // Lighter blue for hover
  primaryMuted: '#4A5568',         // Muted for secondary elements
  primaryFaint: '#EBF4FF',         // Very light blue background

  // Burnished Gold - Secondary accent (glory, illumination)
  gold: '#B8860B',                 // Burnished gold - highlights, CTAs
  goldLight: '#D4A012',            // Lighter gold for hover
  goldMuted: '#C4A35A',            // Muted gold for subtle accents
  goldFaint: '#FDF8E8',            // Very light gold background

  // Deep Wine - Tertiary accent (sacred, passion)
  wine: '#722F37',                 // Deep burgundy/wine
  wineLight: '#8B3A44',            // Lighter wine
  wineFaint: '#FDF2F3',            // Very light wine background

  // Text Colors - Warm, readable
  text: '#2D3748',                 // Primary text - warm charcoal
  textSecondary: '#4A5568',        // Secondary text
  textMuted: '#718096',            // Muted/hint text
  textInverse: '#FFFFFF',          // Text on dark backgrounds

  // Semantic Colors
  success: '#276749',              // Deep green - completions
  successLight: '#F0FFF4',         // Light green background
  error: '#C53030',                // Deep red - errors
  errorLight: '#FFF5F5',           // Light red background
  warning: '#B7791F',              // Warm amber - warnings
  warningLight: '#FFFBEB',         // Light amber background

  // Borders
  border: '#E2DFD8',               // Default border
  borderLight: '#EBE8E3',          // Light border
  borderFocus: '#1A365D',          // Focus state border (sacred blue)

  // Shadows (as color values)
  shadowColor: '#1A365D',          // Blue-tinted shadows for warmth

  // Night Prayer - Special contemplative palette
  night: {
    background: '#0F172A',         // Midnight blue - not pure black
    backgroundLight: '#1E293B',    // Lighter midnight
    surface: '#1E293B',            // Card surfaces
    surfaceBorder: '#334155',      // Borders in night mode
    text: '#F1F5F9',               // Warm white text
    textSecondary: '#94A3B8',      // Muted text
    textMuted: '#64748B',          // Very muted
    gold: '#D4AF37',               // Candlelight gold - warmer
    goldLight: '#E5C158',          // Lighter gold for hover/pressed
    goldMuted: '#B8973A',          // Muted gold
    goldFaint: 'rgba(212, 175, 55, 0.1)', // Faint gold overlay
    accent: '#7C9CC9',             // Soft blue accent
  },
} as const;

// ============================================
// SHADOW SYSTEM
// ============================================

const baseShadows = {
  // Subtle lift - for interactive elements
  sm: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  // Standard card elevation
  md: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  // Prominent elevation - modals, popovers
  lg: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  // Maximum elevation - floating elements
  xl: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 6,
  },
  // Gold glow - for premium CTAs
  glow: {
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  // Inner shadow effect (simulated with border)
  inner: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
};

export const shadows = {
  ...baseShadows,
  // Aliases for backward compatibility
  small: baseShadows.sm,
  medium: baseShadows.md,
  large: baseShadows.lg,
} as const;

// ============================================
// SPACING SCALE
// ============================================

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  // Display - Large headlines, hero text
  display: {
    fontSize: 36,
    fontWeight: '300' as const,
    fontFamily: 'Georgia',
    letterSpacing: -0.5,
    lineHeight: 44,
  },

  // Headlines
  h1: {
    fontSize: 28,
    fontWeight: '600' as const,
    fontFamily: 'Georgia',
    letterSpacing: -0.3,
    lineHeight: 36,
    color: colors.text,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
    fontFamily: 'Georgia',
    letterSpacing: -0.2,
    lineHeight: 28,
    color: colors.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    fontFamily: 'Georgia',
    lineHeight: 24,
    color: colors.text,
  },

  // Body text
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 26,
    color: colors.text,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
    color: colors.text,
  },

  // Scripture - Larger, more prominent, sacred
  scripture: {
    fontSize: 22,
    fontStyle: 'italic' as const,
    fontFamily: 'Georgia',
    lineHeight: 34,
    color: colors.text,
  },
  scriptureSmall: {
    fontSize: 18,
    fontStyle: 'italic' as const,
    fontFamily: 'Georgia',
    lineHeight: 28,
    color: colors.text,
  },
  scriptureReference: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.primary,
    letterSpacing: 0.3,
  },

  // Labels - Section headers, categories
  label: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    color: colors.primary,
  },
  labelGold: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    color: colors.gold,
  },
  labelMuted: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    color: colors.textMuted,
  },

  // Button text
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
  buttonLarge: {
    fontSize: 18,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },

  // Caption/meta text
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: colors.textMuted,
  },

  // Numbers - Stats, counters
  stat: {
    fontSize: 32,
    fontWeight: '300' as const,
    letterSpacing: -0.5,
    color: colors.text,
  },
  statSmall: {
    fontSize: 24,
    fontWeight: '300' as const,
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
} as const;

// ============================================
// ANIMATION TIMINGS
// ============================================

export const animation = {
  fast: 150,
  normal: 250,
  slow: 400,
  // Easing functions for native driver
  easeOut: 'ease-out',
  easeIn: 'ease-in',
  easeInOut: 'ease-in-out',
} as const;

// ============================================
// COMPONENT PRESETS
// ============================================

export const components = {
  // Card styles
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.md,
  },
  cardFlat: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  cardElevated: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.lg,
  },

  // Button presets
  buttonPrimary: {
    backgroundColor: colors.gold,
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
    ...shadows.glow,
  },
  buttonSecondary: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
    ...shadows.md,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
  },

  // Input styles
  input: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.borderFocus,
    borderWidth: 2,
  },

  // Scripture box - special treatment
  scriptureBox: {
    backgroundColor: colors.goldFaint,
    borderRadius: radius.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold,
    padding: spacing.lg,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  dividerGold: {
    height: 1,
    backgroundColor: colors.goldMuted,
    opacity: 0.3,
  },
} as const;

// ============================================
// NIGHT MODE COMPONENTS
// ============================================

export const nightComponents = {
  card: {
    backgroundColor: colors.night.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.night.surfaceBorder,
  },
  scriptureBox: {
    backgroundColor: colors.night.goldFaint,
    borderRadius: radius.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.night.gold,
    padding: spacing.lg,
  },
} as const;

// ============================================
// BACKWARD COMPATIBILITY
// Re-export as 'colors' from design for existing imports
// ============================================

// Legacy exports for gradual migration
export { colors as theme };
