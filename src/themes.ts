import type { ThemeTokens, Theme } from './types';

/** Electric blue aligned with [Hermes Agent](https://hermes-agent.nousresearch.com/) marketing */
export const BRAND_COLOR = '#2B8CFF';
export const BRAND_COLOR_HOVER = '#1E7AEB';
export const BRAND_COLOR_ACTIVE = '#186BD4';
/** Comma-separated RGB for `rgba(..., α)` in component styles */
export const BRAND_RGB = '43, 140, 255';

/** Periwinkle secondary (Hermes hero title tone) */
export const ALT_BRAND_COLOR = '#8FA3E8';
export const ALT_BRAND_COLOR_HOVER = '#7B91DC';
export const ALT_BRAND_COLOR_ACTIVE = '#6B82CC';
export const ALT_BRAND_RGB = '143, 163, 232';

export const themes: Record<Exclude<Theme, 'system'>, ThemeTokens> = {
  branded: {
    bg: BRAND_COLOR,
    text: '#FFFFFF',
    border: 'transparent',
    surface: '#FFFFFF',
    surfaceText: '#0F172A',
    muted: '#64748B',
    primary: BRAND_COLOR,
    primaryText: '#FFFFFF',
    codeBg: '#0F172A',
    codeText: '#F1F5F9',
  },
  'branded-alt': {
    bg: ALT_BRAND_COLOR,
    text: '#FFFFFF',
    border: 'transparent',
    surface: '#FFFFFF',
    surfaceText: '#0F172A',
    muted: '#64748B',
    primary: ALT_BRAND_COLOR,
    primaryText: '#FFFFFF',
    codeBg: '#0F172A',
    codeText: '#F1F5F9',
  },
  dark: {
    bg: '#141C2E',
    text: '#F1F5F9',
    border: '#2A3F5C',
    surface: '#1A2740',
    surfaceText: '#F1F5F9',
    muted: '#94A3B8',
    primary: BRAND_COLOR,
    primaryText: '#FFFFFF',
    codeBg: '#0A0E18',
    codeText: '#F1F5F9',
  },
  light: {
    bg: '#FFFFFF',
    text: '#0F172A',
    border: '#CBD5E1',
    surface: '#F8FAFC',
    surfaceText: '#0F172A',
    muted: '#64748B',
    primary: BRAND_COLOR,
    primaryText: '#FFFFFF',
    codeBg: '#0F172A',
    codeText: '#F1F5F9',
  },
};

export function resolveTheme(theme: Theme): ThemeTokens {
  if (theme !== 'system') return themes[theme];
  if (typeof window === 'undefined') return themes.light;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? themes.dark
    : themes.light;
}

export function themeToCSS(tokens: ThemeTokens): string {
  return `
    --hb-bg: ${tokens.bg};
    --hb-text: ${tokens.text};
    --hb-border: ${tokens.border};
    --hb-surface: ${tokens.surface};
    --hb-surface-text: ${tokens.surfaceText};
    --hb-muted: ${tokens.muted};
    --hb-primary: ${tokens.primary};
    --hb-primary-text: ${tokens.primaryText};
    --hb-code-bg: ${tokens.codeBg};
    --hb-code-text: ${tokens.codeText};
  `;
}

export const SHAPE_MAP = {
  rounded: { sm: '0.375rem', md: '0.5rem', lg: '0.625rem' },
  pill:    { sm: '999px',    md: '999px',  lg: '999px' },
  square:  { sm: '0',        md: '0',      lg: '0' },
} as const;

export const SIZE_MAP = {
  sm: { height: '2rem', fontSize: '0.75rem', iconSize: '0.875rem', padding: '0 0.75rem', ccPadding: '0 0.5rem', gap: '0.375rem', radius: '0.375rem' },
  md: { height: '2.5rem', fontSize: '0.875rem', iconSize: '1.125rem', padding: '0 1rem', ccPadding: '0 0.75rem', gap: '0.5rem', radius: '0.5rem' },
  lg: { height: '3rem', fontSize: '1rem', iconSize: '1.375rem', padding: '0 1.25rem', ccPadding: '0 1rem', gap: '0.625rem', radius: '0.625rem' },
};
