export type { Theme, Size, Variant, Shape, HermesButtonOptions, HermesSkillButtonOptions, PopupOptions, ThemeTokens } from './types';

export { HermesButton, createHermesButton, registerHermesButton } from './hermes-button';
export { HermesSkillButton, createHermesSkillButton, registerHermesSkillButton } from './hermes-skill-button';
export { HermesPopupDialog, showPopup } from './popup-dialog';

export { HERMES_ICON, HERMES_SKILL_ICON } from './icons';
export { themes, resolveTheme, BRAND_COLOR, ALT_BRAND_COLOR } from './themes';

export type { ButtonMetadata } from './structured-data';
export { discoverButtons, generateStructuredData, injectStructuredData } from './structured-data';

import { registerHermesButton } from './hermes-button';
import { registerHermesSkillButton } from './hermes-skill-button';

/**
 * Manually register all custom elements.
 * Called automatically on import, but exposed for frameworks
 * that need explicit registration timing (Angular, micro-frontends).
 */
export function register() {
  registerHermesButton();
  registerHermesSkillButton();
}

export type {} from './jsx.d';
