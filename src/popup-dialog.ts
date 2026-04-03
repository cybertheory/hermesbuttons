import type { PopupOptions, ThemeTokens } from './types';
import { HERMES_ICON, HERMES_SKILL_ICON, COPY_ICON, CHECK_ICON, CLOSE_ICON } from './icons';
import { resolveTheme, themeToCSS, BRAND_COLOR_HOVER } from './themes';

const POPUP_STYLES = `
  :host {
    position: fixed;
    inset: 0;
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hb-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    animation: hb-fade-in 0.15s ease-out;
  }

  .hb-dialog {
    position: relative;
    width: 90%;
    max-width: 460px;
    background: var(--hb-surface);
    color: var(--hb-surface-text);
    border-radius: 16px;
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--hb-border);
    overflow: hidden;
    animation: hb-scale-in 0.2s ease-out;
  }

  .hb-dialog-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px 16px;
    border-bottom: 1px solid var(--hb-border);
  }

  .hb-dialog-header-icon {
    width: 36px;
    height: 36px;
    color: var(--hb-primary);
    flex-shrink: 0;
  }

  .hb-dialog-header-text {
    flex: 1;
    min-width: 0;
  }

  .hb-dialog-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    color: var(--hb-surface-text);
  }

  .hb-dialog-description {
    font-size: 13px;
    color: var(--hb-muted);
    margin-top: 2px;
    line-height: 1.4;
  }

  .hb-dialog-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--hb-muted);
    cursor: pointer;
    border-radius: 8px;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
  }

  .hb-dialog-close:hover {
    background: var(--hb-border);
    color: var(--hb-surface-text);
  }

  .hb-dialog-close svg { width: 14px; height: 14px; }

  .hb-dialog-body { padding: 20px 24px; }

  .hb-step {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .hb-step:last-child { margin-bottom: 0; }

  .hb-step-num {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--hb-primary);
    color: var(--hb-primary-text);
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .hb-step-content {
    flex: 1;
    min-width: 0;
  }

  .hb-step-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--hb-surface-text);
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .hb-code-block {
    display: flex;
    align-items: center;
    background: var(--hb-code-bg);
    color: var(--hb-code-text);
    border-radius: 10px;
    padding: 2px 2px 2px 14px;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 13px;
    line-height: 1.5;
    gap: 8px;
    overflow: hidden;
  }

  .hb-code-text {
    flex: 1;
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px 0;
    scrollbar-width: none;
  }

  .hb-code-text::-webkit-scrollbar { display: none; }

  .hb-code-prefix {
    color: var(--hb-muted);
    user-select: none;
    margin-right: 6px;
  }

  .hb-copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 36px;
    min-width: 36px;
    padding: 0 12px;
    border: none;
    background: var(--hb-primary);
    color: var(--hb-primary-text);
    cursor: pointer;
    border-radius: 8px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    flex-shrink: 0;
    transition: background 0.15s, transform 0.1s;
    white-space: nowrap;
  }

  .hb-copy-btn:hover { background: ${BRAND_COLOR_HOVER}; }
  .hb-copy-btn:active { transform: scale(0.96); }
  .hb-copy-btn svg { width: 14px; height: 14px; }

  .hb-copy-btn[data-copied="true"] {
    background: #16a34a;
  }

  .hb-dialog-footer {
    padding: 16px 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .hb-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 44px;
    border: none;
    background: var(--hb-primary);
    color: var(--hb-primary-text);
    cursor: pointer;
    border-radius: 10px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    transition: background 0.15s, transform 0.1s;
  }

  .hb-action-btn:hover { background: ${BRAND_COLOR_HOVER}; }
  .hb-action-btn:active { transform: scale(0.98); }
  .hb-action-btn svg { width: 16px; height: 16px; }

  .hb-hint {
    font-size: 12px;
    color: var(--hb-muted);
    text-align: center;
    line-height: 1.4;
  }

  .hb-hint kbd {
    display: inline-block;
    padding: 1px 5px;
    font-family: inherit;
    font-size: 11px;
    background: var(--hb-border);
    border-radius: 4px;
    border: 1px solid var(--hb-border);
  }

  @keyframes hb-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes hb-scale-in {
    from { opacity: 0; transform: scale(0.95) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @media (max-width: 480px) {
    .hb-dialog {
      width: 96%;
      max-width: none;
      border-radius: 14px;
      max-height: 90dvh;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .hb-dialog-header { padding: 16px 16px 12px; gap: 10px; }
    .hb-dialog-header-icon { width: 28px; height: 28px; }
    .hb-dialog-body { padding: 16px; }
    .hb-dialog-footer { padding: 12px 16px 16px; }

    .hb-step { gap: 10px; margin-bottom: 14px; }
    .hb-step-num { width: 22px; height: 22px; font-size: 11px; }
    .hb-step-label { font-size: 12px; margin-bottom: 6px; }

    .hb-code-block { font-size: 12px; padding: 2px 2px 2px 10px; border-radius: 8px; }
    .hb-copy-btn { height: 32px; padding: 0 10px; font-size: 11px; border-radius: 6px; }
    .hb-action-btn { height: 40px; font-size: 13px; border-radius: 8px; }
    .hb-hint { font-size: 11px; }
  }

  @media (max-width: 360px) {
    .hb-dialog { width: 100%; border-radius: 12px 12px 0 0; align-self: flex-end; }
    .hb-copy-btn span { display: none; }
    .hb-copy-btn { min-width: 32px; padding: 0 8px; }
  }

  @supports (padding: env(safe-area-inset-bottom)) {
    .hb-dialog-footer { padding-bottom: calc(20px + env(safe-area-inset-bottom)); }
  }
`;

export class HermesPopupDialog extends HTMLElement {
  private _options!: PopupOptions;
  private _mqCleanup: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set options(opts: PopupOptions) {
    this._options = opts;
    this.render();
  }

  get options() {
    return this._options;
  }

  disconnectedCallback() {
    this._mqCleanup?.();
    this._mqCleanup = null;
  }

  private resolvePopupTokens(): ThemeTokens {
    const { theme } = this._options;

    if (theme === 'dark' || theme === 'light') return resolveTheme(theme);

    const prefersDark = typeof window !== 'undefined'
      && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'system') {
      return prefersDark ? resolveTheme('dark') : resolveTheme('light');
    }

    const base = prefersDark ? resolveTheme('dark') : resolveTheme('light');
    const brand = resolveTheme(theme);
    return {
      ...base,
      primary: brand.primary,
      primaryText: brand.primaryText,
    };
  }

  private render() {
    if (!this.shadowRoot || !this._options) return;

    const { variant, title, description, command, fullCommand, skillUrl } = this._options;
    const tokens = this.resolvePopupTokens();
    const icon = variant === 'hermes' ? HERMES_ICON : HERMES_SKILL_ICON;

    const isHermesTerminal = variant === 'hermes';
    const displayCommand = fullCommand || command;

    this.shadowRoot.innerHTML = `
      <style>${POPUP_STYLES}</style>
      <div style="${themeToCSS(tokens)}">
        <div class="hb-backdrop" data-action="close"></div>
        <div class="hb-dialog" role="dialog" aria-modal="true" aria-labelledby="hb-dialog-title">
          <div class="hb-dialog-header">
            <div class="hb-dialog-header-icon">${icon}</div>
            <div class="hb-dialog-header-text">
              <div class="hb-dialog-title" id="hb-dialog-title">${title}</div>
              ${description ? `<div class="hb-dialog-description">${description}</div>` : ''}
            </div>
            <button class="hb-dialog-close" data-action="close" aria-label="Close">${CLOSE_ICON}</button>
          </div>
          <div class="hb-dialog-body">
            ${isHermesTerminal ? this.renderHermesTerminalBody(displayCommand) : this.renderHermesSkillBody(command, skillUrl)}
          </div>
          <div class="hb-dialog-footer">
            ${isHermesTerminal ? `
              <div class="hb-hint">Press <kbd>⌘</kbd>+<kbd>V</kbd> or <kbd>Ctrl</kbd>+<kbd>V</kbd> in your terminal to run</div>
            ` : `
              <div class="hb-hint">Press <kbd>⌘</kbd>+<kbd>V</kbd> or <kbd>Ctrl</kbd>+<kbd>V</kbd> in your Hermes session to run</div>
            `}
          </div>
        </div>
      </div>
    `;

    this.setupListeners();
    this.setupSystemThemeWatch();
  }

  private renderHermesTerminalBody(command: string): string {
    return `
      <div class="hb-step">
        <div class="hb-step-num">1</div>
        <div class="hb-step-content">
          <div class="hb-step-label">Copy this command to your clipboard</div>
          <div class="hb-code-block">
            <div class="hb-code-text"><span class="hb-code-prefix">$</span>${this.escapeHtml(command)}</div>
            <button class="hb-copy-btn" data-action="copy" data-command="${this.escapeAttr(command)}">${COPY_ICON}<span>Copy</span></button>
          </div>
        </div>
      </div>
      <div class="hb-step">
        <div class="hb-step-num">2</div>
        <div class="hb-step-content">
          <div class="hb-step-label">Paste and run in your terminal</div>
        </div>
      </div>
    `;
  }

  private renderHermesSkillBody(command: string, skillUrl?: string): string {
    let steps = '';

    if (skillUrl) {
      const fullPrompt = `Install the skill from ${skillUrl} and run ${command}`;
      steps += `
        <div class="hb-step">
          <div class="hb-step-num">1</div>
          <div class="hb-step-content">
            <div class="hb-step-label">Copy this prompt to your clipboard</div>
            <div class="hb-code-block">
              <div class="hb-code-text">${this.escapeHtml(fullPrompt)}</div>
              <button class="hb-copy-btn" data-action="copy" data-command="${this.escapeAttr(fullPrompt)}">${COPY_ICON}<span>Copy</span></button>
            </div>
          </div>
        </div>
        <div class="hb-step">
          <div class="hb-step-num">2</div>
          <div class="hb-step-content">
            <div class="hb-step-label">Paste into a Hermes session — the agent will fetch the skill and set it up for you</div>
          </div>
        </div>
      `;
    } else {
      steps += `
        <div class="hb-step">
          <div class="hb-step-num">1</div>
          <div class="hb-step-content">
            <div class="hb-step-label">Copy this command to your clipboard</div>
            <div class="hb-code-block">
              <div class="hb-code-text">${this.escapeHtml(command)}</div>
              <button class="hb-copy-btn" data-action="copy" data-command="${this.escapeAttr(command)}">${COPY_ICON}<span>Copy</span></button>
            </div>
          </div>
        </div>
        <div class="hb-step">
          <div class="hb-step-num">2</div>
          <div class="hb-step-content">
            <div class="hb-step-label">Paste and send in your Hermes session</div>
          </div>
        </div>
      `;
    }

    return steps;
  }

  private setupListeners() {
    if (!this.shadowRoot) return;

    this.shadowRoot.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('[data-action]') as HTMLElement | null;
      if (!target) return;

      const action = target.dataset.action;

      if (action === 'close') {
        this.close();
      } else if (action === 'copy') {
        const cmd = target.dataset.command || '';
        this.copyToClipboard(cmd, target);
      }
    });

    this.shadowRoot.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Escape') this.close();
    });
  }

  private setupSystemThemeWatch() {
    this._mqCleanup?.();
    this._mqCleanup = null;

    const theme = this._options.theme;
    const needsWatch = theme === 'system' || theme === 'branded' || theme === 'branded-alt';
    if (!needsWatch || typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => this.render();
    mq.addEventListener('change', handler);
    this._mqCleanup = () => mq.removeEventListener('change', handler);
  }

  private async copyToClipboard(command: string, button: HTMLElement) {
    try {
      await navigator.clipboard.writeText(command);
      const label = button.querySelector('span');
      const iconContainer = button;

      button.setAttribute('data-copied', 'true');
      if (label) label.textContent = 'Copied!';
      iconContainer.innerHTML = `${CHECK_ICON}<span>Copied!</span>`;

      this._options.onCopy?.(command);

      setTimeout(() => {
        button.setAttribute('data-copied', 'false');
        iconContainer.innerHTML = `${COPY_ICON}<span>Copy</span>`;
      }, 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = command;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      this._options.onCopy?.(command);
    }
  }

  close() {
    const dialog = this.shadowRoot?.querySelector('.hb-dialog') as HTMLElement;
    const backdrop = this.shadowRoot?.querySelector('.hb-backdrop') as HTMLElement;

    if (dialog) {
      dialog.style.animation = 'hb-scale-in 0.15s ease-in reverse';
    }
    if (backdrop) {
      backdrop.style.animation = 'hb-fade-in 0.15s ease-in reverse';
    }

    setTimeout(() => {
      this._options.onClose?.();
      this.remove();
    }, 140);
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  private escapeAttr(str: string): string {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('hermes-popup-dialog')) {
  customElements.define('hermes-popup-dialog', HermesPopupDialog);
}

export function showPopup(options: PopupOptions): HermesPopupDialog {
  const popup = document.createElement('hermes-popup-dialog') as HermesPopupDialog;
  popup.options = options;
  document.body.appendChild(popup);
  return popup;
}
