import type { HermesSkillButtonOptions, Theme, Size, Variant, Shape } from './types';
import { HERMES_SKILL_ICON } from './icons';
import {
  resolveTheme,
  themeToCSS,
  SIZE_MAP,
  SHAPE_MAP,
  BRAND_COLOR,
  BRAND_COLOR_HOVER,
  BRAND_COLOR_ACTIVE,
  BRAND_RGB,
  ALT_BRAND_COLOR,
  ALT_BRAND_COLOR_HOVER,
  ALT_BRAND_COLOR_ACTIVE,
  ALT_BRAND_RGB,
} from './themes';
import { showPopup } from './popup-dialog';

const BUTTON_STYLES = `
  :host {
    display: inline-block;
    vertical-align: middle;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hb-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--hb-gap);
    height: var(--hb-height);
    min-height: 44px;
    padding: var(--hb-padding);
    border: 1.5px solid var(--hb-border);
    background: var(--hb-bg);
    color: var(--hb-text);
    font-family: inherit;
    font-size: var(--hb-font-size);
    font-weight: 600;
    line-height: 1;
    border-radius: var(--hb-radius);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    touch-action: manipulation;
    transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease, color 0.15s ease;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;
  }

  @media (pointer: fine) {
    .hb-btn { min-height: unset; }
  }

  /* ─── FILLED ─── */

  :host([data-variant="filled"][data-theme="branded"]) .hb-btn,
  :host([data-variant="filled"][data-theme="branded-alt"]) .hb-btn {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  :host([data-variant="filled"][data-theme="branded"]) .hb-btn:hover {
    background: ${BRAND_COLOR_HOVER};
    box-shadow: 0 2px 8px rgba(${BRAND_RGB}, 0.35);
  }
  :host([data-variant="filled"][data-theme="branded"]) .hb-btn:active {
    background: ${BRAND_COLOR_ACTIVE};
    transform: scale(0.98);
  }
  :host([data-variant="filled"][data-theme="branded-alt"]) .hb-btn:hover {
    background: ${ALT_BRAND_COLOR_HOVER};
    box-shadow: 0 2px 8px rgba(${ALT_BRAND_RGB}, 0.35);
  }
  :host([data-variant="filled"][data-theme="branded-alt"]) .hb-btn:active {
    background: ${ALT_BRAND_COLOR_ACTIVE};
    transform: scale(0.98);
  }

  :host([data-variant="filled"][data-theme="dark"]) .hb-btn {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  :host([data-variant="filled"][data-theme="dark"]) .hb-btn:hover {
    background: #1E2A42;
    border-color: #475569;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  :host([data-variant="filled"][data-theme="dark"]) .hb-btn:active {
    background: #141C2E;
    transform: scale(0.98);
  }

  :host([data-variant="filled"][data-theme="light"]) .hb-btn {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
  }
  :host([data-variant="filled"][data-theme="light"]) .hb-btn:hover {
    border-color: #94A3B8;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  :host([data-variant="filled"][data-theme="light"]) .hb-btn:active {
    background: #F8FAFC;
    transform: scale(0.98);
  }

  /* ─── OUTLINE ─── */

  :host([data-variant="outline"][data-theme="branded"]) .hb-btn {
    background: transparent;
    border-color: ${BRAND_COLOR};
    color: ${BRAND_COLOR};
  }
  :host([data-variant="outline"][data-theme="branded"]) .hb-btn:hover {
    background: rgba(${BRAND_RGB}, 0.08);
    box-shadow: 0 2px 8px rgba(${BRAND_RGB}, 0.15);
  }
  :host([data-variant="outline"][data-theme="branded"]) .hb-btn:active {
    background: rgba(${BRAND_RGB}, 0.14);
    transform: scale(0.98);
  }

  :host([data-variant="outline"][data-theme="branded-alt"]) .hb-btn {
    background: transparent;
    border-color: ${ALT_BRAND_COLOR};
    color: ${ALT_BRAND_COLOR};
  }
  :host([data-variant="outline"][data-theme="branded-alt"]) .hb-btn:hover {
    background: rgba(${ALT_BRAND_RGB}, 0.08);
    box-shadow: 0 2px 8px rgba(${ALT_BRAND_RGB}, 0.15);
  }
  :host([data-variant="outline"][data-theme="branded-alt"]) .hb-btn:active {
    background: rgba(${ALT_BRAND_RGB}, 0.14);
    transform: scale(0.98);
  }

  :host([data-variant="outline"][data-theme="dark"]) .hb-btn {
    background: transparent;
    border-color: #475569;
    color: #F1F5F9;
  }
  :host([data-variant="outline"][data-theme="dark"]) .hb-btn:hover {
    border-color: ${BRAND_COLOR};
    background: rgba(${BRAND_RGB}, 0.08);
  }
  :host([data-variant="outline"][data-theme="dark"]) .hb-btn:active {
    background: rgba(${BRAND_RGB}, 0.14);
    transform: scale(0.98);
  }

  :host([data-variant="outline"][data-theme="light"]) .hb-btn {
    background: transparent;
    border-color: #CBD5E1;
    color: #0F172A;
  }
  :host([data-variant="outline"][data-theme="light"]) .hb-btn:hover {
    border-color: ${BRAND_COLOR};
    background: rgba(${BRAND_RGB}, 0.05);
  }
  :host([data-variant="outline"][data-theme="light"]) .hb-btn:active {
    background: rgba(${BRAND_RGB}, 0.1);
    transform: scale(0.98);
  }

  /* ─── GHOST ─── */

  :host([data-variant="ghost"]) .hb-btn {
    background: transparent;
    border-color: transparent;
  }

  :host([data-variant="ghost"][data-theme="branded"]) .hb-btn {
    color: ${BRAND_COLOR};
  }
  :host([data-variant="ghost"][data-theme="branded"]) .hb-btn:hover {
    background: rgba(${BRAND_RGB}, 0.1);
  }
  :host([data-variant="ghost"][data-theme="branded"]) .hb-btn:active {
    background: rgba(${BRAND_RGB}, 0.16);
    transform: scale(0.98);
  }

  :host([data-variant="ghost"][data-theme="branded-alt"]) .hb-btn {
    color: ${ALT_BRAND_COLOR};
  }
  :host([data-variant="ghost"][data-theme="branded-alt"]) .hb-btn:hover {
    background: rgba(${ALT_BRAND_RGB}, 0.1);
  }
  :host([data-variant="ghost"][data-theme="branded-alt"]) .hb-btn:active {
    background: rgba(${ALT_BRAND_RGB}, 0.16);
    transform: scale(0.98);
  }

  :host([data-variant="ghost"][data-theme="dark"]) .hb-btn {
    color: #F1F5F9;
  }
  :host([data-variant="ghost"][data-theme="dark"]) .hb-btn:hover {
    background: rgba(255, 255, 255, 0.06);
  }
  :host([data-variant="ghost"][data-theme="dark"]) .hb-btn:active {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(0.98);
  }

  :host([data-variant="ghost"][data-theme="light"]) .hb-btn {
    color: #0F172A;
  }
  :host([data-variant="ghost"][data-theme="light"]) .hb-btn:hover {
    background: rgba(0, 0, 0, 0.04);
  }
  :host([data-variant="ghost"][data-theme="light"]) .hb-btn:active {
    background: rgba(0, 0, 0, 0.08);
    transform: scale(0.98);
  }

  /* ─── FOCUS ─── */

  .hb-btn:focus-visible {
    outline: 2px solid var(--hb-focus-color, ${BRAND_COLOR});
    outline-offset: 2px;
  }

  /* ─── ICON ─── */

  .hb-btn-icon {
    width: var(--hb-icon-size);
    height: var(--hb-icon-size);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hb-btn-icon svg { width: 100%; height: 100%; }

  :host([data-variant="filled"][data-theme="branded"]) .hb-btn-icon,
  :host([data-variant="filled"][data-theme="branded-alt"]) .hb-btn-icon {
    color: #FFFFFF;
    --hb-icon-accent: rgba(255,255,255,0.2);
  }
  :host([data-variant="filled"][data-theme="dark"]) .hb-btn-icon {
    color: var(--hb-accent-color, ${BRAND_COLOR});
  }
  :host([data-variant="filled"][data-theme="light"]) .hb-btn-icon {
    color: var(--hb-accent-color, ${BRAND_COLOR});
  }

  :host([data-variant="outline"]) .hb-btn-icon,
  :host([data-variant="ghost"]) .hb-btn-icon {
    color: var(--hb-accent-color, ${BRAND_COLOR});
  }

  /* ─── LABEL ─── */

  .hb-btn-label {
    letter-spacing: -0.01em;
  }
`;

export class HermesSkillButton extends HTMLElement {
  static observedAttributes = ['command', 'skill-url', 'theme', 'size', 'variant', 'shape', 'popup', 'popup-title', 'popup-description'];

  private _options: HermesSkillButtonOptions = {
    command: '',
    theme: 'branded',
    size: 'md',
    variant: 'filled',
    popup: true,
  };

  private _mqCleanup: (() => void) | null = null;
  private _rendered = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.syncFromAttributes();
    this.render();
    this.updateLightDOM();
  }

  disconnectedCallback() {
    this._mqCleanup?.();
    this._mqCleanup = null;
  }

  attributeChangedCallback() {
    if (!this._rendered) return;
    this.syncFromAttributes();
    this.render();
    this.updateLightDOM();
  }

  set options(opts: Partial<HermesSkillButtonOptions>) {
    this._options = { ...this._options, ...opts };
    this.render();
    this.updateLightDOM();
  }

  get options() {
    return this._options;
  }

  private syncFromAttributes() {
    const command = this.getAttribute('command');
    const skillUrl = this.getAttribute('skill-url');
    const theme = this.getAttribute('theme') as Theme | null;
    const size = this.getAttribute('size') as Size | null;
    const variant = this.getAttribute('variant') as Variant | null;
    const shape = this.getAttribute('shape') as Shape | null;
    const popup = this.getAttribute('popup');
    const popupTitle = this.getAttribute('popup-title');
    const popupDescription = this.getAttribute('popup-description');

    if (command !== null) this._options.command = command;
    if (skillUrl !== null) this._options.skillUrl = skillUrl;
    if (theme) this._options.theme = theme;
    if (size) this._options.size = size;
    if (variant) this._options.variant = variant;
    if (shape) this._options.shape = shape;
    if (popup !== null) this._options.popup = popup !== 'false';
    if (popupTitle !== null) this._options.popupTitle = popupTitle;
    if (popupDescription !== null) this._options.popupDescription = popupDescription;
  }

  private updateLightDOM() {
    const { command, skillUrl } = this._options;

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', `Run on Hermes Skills: ${command}`);
    if (this._options.popup !== false) {
      this.setAttribute('aria-haspopup', 'dialog');
    } else {
      this.removeAttribute('aria-haspopup');
    }

    let link = this.querySelector('a[data-hb-crawl]') as HTMLAnchorElement | null;
    if (!link) {
      link = document.createElement('a');
      link.setAttribute('data-hb-crawl', '');
      link.setAttribute('aria-hidden', 'true');
      link.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;';
      this.appendChild(link);
    }
    link.textContent = `Run on Hermes Skills: ${command}`;
    link.setAttribute('data-platform', 'hermes-skill');
    link.setAttribute('data-command', command);
    if (skillUrl) {
      link.href = skillUrl;
      link.setAttribute('data-skill-url', skillUrl);
    } else {
      link.href = `https://hermes.ai/skills?command=${encodeURIComponent(command)}`;
      link.removeAttribute('data-skill-url');
    }
  }

  private getResolvedTheme(): Theme {
    return this._options.theme || 'branded';
  }

  private render() {
    if (!this.shadowRoot) return;

    const theme = this.getResolvedTheme();
    const resolvedTheme = theme === 'system' ? (
      typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    ) : theme;
    const variant = this._options.variant || 'filled';

    const tokens = resolveTheme(theme);
    const size = this._options.size || 'md';
    const shape = this._options.shape || 'rounded';
    const sizeTokens = SIZE_MAP[size];
    const radius = SHAPE_MAP[shape][size];

    this.setAttribute('data-theme', resolvedTheme);
    this.setAttribute('data-variant', variant);

    const bgOverride = variant !== 'filled' ? 'transparent' : tokens.bg;
    const borderOverride = variant === 'ghost' ? 'transparent' :
      variant === 'outline' ? tokens.primary : tokens.border;
    const textOverride = variant !== 'filled' ? tokens.primary : tokens.text;

    this.shadowRoot.innerHTML = `
      <style>${BUTTON_STYLES}</style>
      <button
        class="hb-btn"
        type="button"
        style="
          ${themeToCSS(tokens)}
          --hb-bg: ${bgOverride};
          --hb-border: ${borderOverride};
          --hb-text: ${textOverride};
          --hb-accent-color: ${tokens.primary};
          --hb-focus-color: ${tokens.primary};
          --hb-height: ${sizeTokens.height};
          --hb-font-size: ${sizeTokens.fontSize};
          --hb-icon-size: ${sizeTokens.iconSize};
          --hb-padding: ${sizeTokens.padding};
          --hb-gap: ${sizeTokens.gap};
          --hb-radius: ${radius};
        "
        aria-label="Run on Hermes Skills: ${this._options.command.replace(/"/g, '&quot;')}"
      >
        <span class="hb-btn-icon" aria-hidden="true">${HERMES_SKILL_ICON}</span>
        <span class="hb-btn-label">Run on Hermes Skills</span>
      </button>
    `;

    const btn = this.shadowRoot.querySelector('.hb-btn')!;
    btn.addEventListener('click', () => this.handleClick());
    btn.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
        e.preventDefault();
        this.handleClick();
      }
    });
    this._rendered = true;
    this.setupSystemThemeWatch();
  }

  private handleClick() {
    const { popup, command, skillUrl, popupTitle, popupDescription } = this._options;

    this.dispatchEvent(new CustomEvent('hb-open', {
      bubbles: true,
      composed: true,
      detail: { command },
    }));

    if (popup === false) {
      navigator.clipboard.writeText(command).then(() => {
        this._options.onCopy?.(command);
        this.dispatchEvent(new CustomEvent('hb-copy', {
          bubbles: true,
          composed: true,
          detail: { command },
        }));
      });
      return;
    }

    showPopup({
      variant: 'hermes-skill',
      theme: this.getResolvedTheme(),
      title: popupTitle || 'Run on Hermes Skills',
      description: popupDescription || 'Copy and paste into a Hermes session to get started.',
      command,
      skillUrl,
      onCopy: (cmd) => {
        this._options.onCopy?.(cmd);
        this.dispatchEvent(new CustomEvent('hb-copy', {
          bubbles: true,
          composed: true,
          detail: { command: cmd },
        }));
      },
      onClose: () => {
        this.dispatchEvent(new CustomEvent('hb-close', {
          bubbles: true,
          composed: true,
        }));
      },
    });
  }

  private setupSystemThemeWatch() {
    this._mqCleanup?.();
    this._mqCleanup = null;

    if (this.getResolvedTheme() !== 'system' || typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => this.render();
    mq.addEventListener('change', handler);
    this._mqCleanup = () => mq.removeEventListener('change', handler);
  }
}

export function registerHermesSkillButton(tagName = 'hermes-skill-button') {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get(tagName)) {
    customElements.define(tagName, HermesSkillButton);
  }
}

registerHermesSkillButton();

export function createHermesSkillButton(options: HermesSkillButtonOptions): HermesSkillButton {
  const el = document.createElement('hermes-skill-button') as HermesSkillButton;
  el.options = options;
  return el;
}
