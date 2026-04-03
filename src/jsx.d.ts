import type { Theme, Size, Variant, Shape } from './types';

interface HermesButtonAttributes {
  command?: string;
  theme?: Theme;
  size?: Size;
  variant?: Variant;
  shape?: Shape;
  popup?: string | boolean;
  'prompt-flag'?: string | boolean;
  'popup-title'?: string;
  'popup-description'?: string;
  class?: string;
  style?: string | Record<string, string>;
}

interface HermesSkillButtonAttributes {
  command?: string;
  theme?: Theme;
  size?: Size;
  variant?: Variant;
  shape?: Shape;
  popup?: string | boolean;
  'popup-title'?: string;
  'popup-description'?: string;
  class?: string;
  style?: string | Record<string, string>;
}

interface HermesButtonEvents {
  'hb-copy'?: (e: CustomEvent<{ command: string }>) => void;
  'hb-download'?: (e: CustomEvent<{ url: string }>) => void;
  'hb-open'?: (e: CustomEvent<{ command: string }>) => void;
  'hb-close'?: (e: CustomEvent) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hermes-button': HermesButtonAttributes &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'hermes-skill-button': HermesSkillButtonAttributes &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'hermes-popup-dialog': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }

  interface HTMLElementTagNameMap {
    'hermes-button': HTMLElement;
    'hermes-skill-button': HTMLElement;
    'hermes-popup-dialog': HTMLElement;
  }
}

declare module 'vue' {
  interface GlobalComponents {
    'hermes-button': HermesButtonAttributes;
    'hermes-skill-button': HermesSkillButtonAttributes;
  }
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'hermes-button': HermesButtonAttributes;
      'hermes-skill-button': HermesSkillButtonAttributes;
    }
  }
}

declare module 'svelte/elements' {
  interface SvelteHTMLElements {
    'hermes-button': HermesButtonAttributes & { [key: `on:${string}`]: (e: CustomEvent) => void };
    'hermes-skill-button': HermesSkillButtonAttributes & { [key: `on:${string}`]: (e: CustomEvent) => void };
  }
}

export {};
