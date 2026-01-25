import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle, Platform, StyleProp } from 'react-native';
import { colors } from '@/lib/colors';

// System serif font
const serifFont = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia',
});

interface TypographyProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

// Large display heading (Hero titles)
export function DisplayText({ children, style, color, align = 'left' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.display,
        { color: color || colors.text, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Section headings
export function Heading({ children, style, color, align = 'left' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.heading,
        { color: color || colors.text, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Subheadings
export function Subheading({ children, style, color, align = 'left' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.subheading,
        { color: color || colors.textSecondary, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Body text
export function Body({ children, style, color, align = 'left' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.body,
        { color: color || colors.text, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Secondary/muted body text
export function BodySecondary({ children, style, color, align = 'left' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.bodySecondary,
        { color: color || colors.textSecondary, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Scripture text (serif, larger, for readings)
export function ScriptureText({ children, style, color, align = 'center' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.scripture,
        { color: color || colors.text, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Scripture reference
export function ScriptureReference({ children, style, color, align = 'center' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.reference,
        { color: color || colors.gold, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Prayer phrase (large, centered, for practice)
export function PrayerPhrase({ children, style, color, align = 'center' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.prayerPhrase,
        { color: color || colors.text, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Label text (small, uppercase)
export function Label({ children, style, color, align = 'left' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.label,
        { color: color || colors.textSecondary, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Quote text (italic serif)
export function Quote({ children, style, color, align = 'left' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.quote,
        { color: color || colors.textSecondary, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Large stat number
export function StatNumber({ children, style, color, align = 'center' }: TypographyProps) {
  return (
    <Text
      style={[
        styles.statNumber,
        { color: color || colors.gold, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  display: {
    fontFamily: serifFont,
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  heading: {
    fontFamily: serifFont,
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  subheading: {
    fontFamily: serifFont,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 26,
  },
  bodySecondary: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  scripture: {
    fontFamily: serifFont,
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 32,
    fontStyle: 'italic',
  },
  reference: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  prayerPhrase: {
    fontFamily: serifFont,
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 38,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  quote: {
    fontFamily: serifFont,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  statNumber: {
    fontFamily: serifFont,
    fontSize: 48,
    fontWeight: '500',
    lineHeight: 56,
  },
});
