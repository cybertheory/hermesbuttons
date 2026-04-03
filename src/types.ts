export type Theme = 'branded' | 'branded-alt' | 'dark' | 'light' | 'system';
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'filled' | 'outline' | 'ghost';
export type Shape = 'rounded' | 'pill' | 'square';

export interface HermesButtonOptions {
  /** The command to run in Hermes Agent (e.g. "/research --deep") */
  command: string;
  /** Theme variant. Default: 'branded' */
  theme?: Theme;
  /** Button size. Default: 'md' */
  size?: Size;
  /** Visual variant. Default: 'filled' */
  variant?: Variant;
  /** Border radius shape. Default: 'rounded' */
  shape?: Shape;
  /** Whether to show a popup dialog on click. Default: true */
  popup?: boolean;
  /** Custom prompt flag value (prepended as `hermes -p`). Default: true */
  promptFlag?: boolean;
  /** Callback fired after the command is copied to clipboard */
  onCopy?: (command: string) => void;
  /** Custom popup title */
  popupTitle?: string;
  /** Custom popup description */
  popupDescription?: string;
}

export interface HermesSkillButtonOptions {
  /** The slash command to run in Hermes (e.g. "/research-assistant") */
  command: string;
  /** URL to a downloadable skill package (.zip, SKILL.md, or plugin.json) */
  skillUrl?: string;
  /** Theme variant. Default: 'branded' */
  theme?: Theme;
  /** Button size. Default: 'md' */
  size?: Size;
  /** Visual variant. Default: 'filled' */
  variant?: Variant;
  /** Border radius shape. Default: 'rounded' */
  shape?: Shape;
  /** Whether to show a popup dialog on click. Default: true */
  popup?: boolean;
  /** Callback fired after the command is copied */
  onCopy?: (command: string) => void;
  /** Callback fired when the skill package is downloaded */
  onDownload?: (url: string) => void;
  /** Custom popup title */
  popupTitle?: string;
  /** Custom popup description */
  popupDescription?: string;
}

export interface PopupOptions {
  variant: 'hermes' | 'hermes-skill';
  theme: Theme;
  title: string;
  description?: string;
  command: string;
  fullCommand?: string;
  skillUrl?: string;
  onCopy?: (command: string) => void;
  onClose?: () => void;
}

export interface ThemeTokens {
  bg: string;
  text: string;
  border: string;
  surface: string;
  surfaceText: string;
  muted: string;
  primary: string;
  primaryText: string;
  codeBg: string;
  codeText: string;
}
