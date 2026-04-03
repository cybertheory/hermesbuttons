import { registerHermesButton } from './hermes-button';
import { registerHermesSkillButton } from './hermes-skill-button';

export type { HermesButtonOptions, HermesSkillButtonOptions, Theme, Size } from './types';

/**
 * Vue plugin — registers both custom elements and configures
 * the Vue compiler to treat them as custom elements.
 *
 * Usage:
 *   import { HermesButtonsPlugin } from 'hermesbuttons/vue'
 *   app.use(HermesButtonsPlugin)
 */
export const HermesButtonsPlugin = {
  install(app: any) {
    registerHermesButton();
    registerHermesSkillButton();

    if (app.config?.compilerOptions) {
      const original = app.config.compilerOptions.isCustomElement;
      app.config.compilerOptions.isCustomElement = (tag: string) => {
        if (tag === 'hermes-button' || tag === 'hermes-skill-button' || tag === 'hermes-popup-dialog') {
          return true;
        }
        return original?.(tag) ?? false;
      };
    }
  },
};

export default HermesButtonsPlugin;
