import type { ThemeTokens, Theme } from './types';

export const BRAND_COLOR = '#7C3AED';
export const BRAND_COLOR_HOVER = '#6D28D9';
export const BRAND_COLOR_ACTIVE = '#5B21B6';

export const ALT_BRAND_COLOR = '#14B8A6';

export const themes: Record<Exclude<Theme, 'system'>, ThemeTokens> = {
  branded: {
    bg: BRAND_COLOR,
    text: '#FFFFFF',
    border: 'transparent',
    surface: '#FFFFFF',
    surfaceText: '#1A1025',
    muted: '#7C7589',
    primary: BRAND_COLOR,
    primaryText: '#FFFFFF',
    codeBg: '#1A1025',
    codeText: '#F3EEFF',
  },
  'branded-alt': {
    bg: ALT_BRAND_COLOR,
    text: '#FFFFFF',
    border: 'transparent',
    surface: '#FFFFFF',
    surfaceText: '#1A1025',
    muted: '#7C7589',
    primary: ALT_BRAND_COLOR,
    primaryText: '#FFFFFF',
    codeBg: '#1A1025',
    codeText: '#F3EEFF',
  },
  dark: {
    bg: '#1A1025',
    text: '#F3EEFF',
    border: '#2D2440',
    surface: '#231A35',
    surfaceText: '#F3EEFF',
    muted: '#9F95B0',
    primary: BRAND_COLOR,
    primaryText: '#FFFFFF',
    codeBg: '#0F0A18',
    codeText: '#F3EEFF',
  },
  light: {
    bg: '#FFFFFF',
    text: '#1A1025',
    border: '#E8E0F0',
    surface: '#FAF8FF',
    surfaceText: '#1A1025',
    muted: '#7C7589',
    primary: BRAND_COLOR,
    primaryText: '#FFFFFF',
    codeBg: '#1A1025',
    codeText: '#F3EEFF',
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
