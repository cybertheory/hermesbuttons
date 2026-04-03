# hermesbuttons

Drop-in **"Run on Hermes"** and **"Run on Hermes Skills"** buttons for any website or framework. Built as framework-agnostic Web Components with zero dependencies.

**Hermes button** (`<hermes-button>`) copies a full CLI invocation using `hermes -p "..."` so users can paste into a terminal. **Hermes skill button** (`<hermes-skill-button>`) guides skill installation and ties into Hermes Agent workflows with persistent memory.

<p align="center">
  <img src="https://img.shields.io/npm/v/hermesbuttons?color=%232B8CFF&label=npm" alt="npm version">
  <img src="https://img.shields.io/bundlephobia/minzip/hermesbuttons?color=%232B8CFF" alt="bundle size">
  <img src="https://img.shields.io/npm/l/hermesbuttons?color=%232B8CFF" alt="license">
</p>

---

## Install

```bash
npm install hermesbuttons
```

**Or use the CDN** (no build step):

```html
<script src="https://unpkg.com/hermesbuttons"></script>
```

---

## Quick Start

```html
<hermes-button command="/research deep-dive on React Server Components" theme="branded"></hermes-button>
<hermes-skill-button
  command="/competitive-analysis"
  skill-url="https://example.com/skills/competitive-analysis.zip"
></hermes-skill-button>
```

---

## Framework Integration

### Vanilla HTML / CDN

```html
<script src="https://unpkg.com/hermesbuttons"></script>

<hermes-button command="/weekly-standup" theme="branded"></hermes-button>
<hermes-skill-button command="/draft-blog-post" theme="dark"></hermes-skill-button>

<script>
  document.querySelector('hermes-button')
    .addEventListener('hb-copy', (e) => console.log('Copied:', e.detail.command));
</script>
```

### React / Next.js

Use the dedicated React wrappers (handles SSR, hydration, and prop forwarding):

```tsx
import { HermesButton, HermesSkillButton } from 'hermesbuttons/react';

function App() {
  return (
    <>
      <HermesButton
        command="/research deep-dive on React Server Components"
        theme="branded"
        onCopy={(cmd) => console.log('Copied:', cmd)}
        onHbCopy={(e) => console.log('Event:', e.detail.command)}
      />
      <HermesSkillButton
        command="/competitive-analysis"
        skillUrl="https://example.com/skills/competitive-analysis.zip"
        theme="dark"
      />
    </>
  );
}
```

The React wrapper:

- Includes `'use client'` for Next.js App Router
- Handles SSR/hydration with `suppressHydrationWarning`
- Lazy-loads the Web Components to avoid SSR crashes
- Forwards both property callbacks (`onCopy`, `onDownload`) and CustomEvent listeners (`onHbCopy`, `onHbDownload`, etc.)

### Vue / Nuxt

**Option A: Vue Plugin (recommended)**

```ts
// main.ts
import { createApp } from 'vue';
import { HermesButtonsPlugin } from 'hermesbuttons/vue';
import App from './App.vue';

const app = createApp(App);
app.use(HermesButtonsPlugin); // auto-configures isCustomElement
app.mount('#app');
```

```vue
<template>
  <hermes-button
    command="/weekly-standup"
    theme="branded"
    @hb-copy="onCopy"
  />
  <hermes-skill-button
    command="/draft-blog-post"
    theme="dark"
    @hb-download="onDownload"
  />
</template>

<script setup>
function onCopy(e) {
  console.log('Copied:', e.detail.command);
}
function onDownload(e) {
  console.log('Downloaded:', e.detail.url);
}
</script>
```

**Option B: Manual setup**

```ts
// vite.config.ts
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            ['hermes-button', 'hermes-skill-button', 'hermes-popup-dialog'].includes(tag),
        },
      },
    }),
  ],
};
```

```vue
<script setup>
import 'hermesbuttons';
</script>

<template>
  <hermes-button command="/weekly-standup" theme="branded" @hb-copy="onCopy" />
</template>
```

### Svelte / SvelteKit

```svelte
<script>
  import 'hermesbuttons';

  function handleCopy(e) {
    console.log('Copied:', e.detail.command);
  }
</script>

<hermes-button
  command="/research deep-dive on React Server Components"
  theme="branded"
  on:hb-copy={handleCopy}
/>
<hermes-skill-button command="/competitive-analysis" theme="dark" />
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import 'hermesbuttons';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule {}
```

```html
<!-- component.html -->
<hermes-button
  command="/weekly-standup"
  theme="branded"
  (hb-copy)="onCopy($event)"
></hermes-button>

<hermes-skill-button
  command="/draft-blog-post"
  skill-url="https://example.com/skills/draft-blog.zip"
  theme="dark"
  (hb-download)="onDownload($event)"
></hermes-skill-button>
```

### Solid

```tsx
import 'hermesbuttons';

function App() {
  return (
    <>
      <hermes-button
        command="/research deep-dive on React Server Components"
        theme="branded"
        on:hb-copy={(e) => console.log(e.detail.command)}
      />
      <hermes-skill-button command="/competitive-analysis" theme="dark" />
    </>
  );
}
```

### Astro

```astro
---
---
<script>
  import 'hermesbuttons';
</script>

<hermes-button command="/weekly-standup" theme="branded" />
<hermes-skill-button command="/draft-blog-post" theme="dark" />

<script>
  document.querySelector('hermes-button')
    ?.addEventListener('hb-copy', (e) => console.log(e.detail.command));
</script>
```

### Programmatic JavaScript API

```js
import { createHermesButton, createHermesSkillButton } from 'hermesbuttons';

const btn = createHermesButton({
  command: '/competitive-analysis',
  theme: 'branded',
  onCopy: (cmd) => console.log('Copied:', cmd),
});

document.getElementById('container').appendChild(btn);
```

When using the global build:

```js
const btn = HermesButtons.createHermesButton({ command: '/weekly-standup', theme: 'branded' });
document.body.appendChild(btn);
```

---

## Themes

| Theme | Description |
|-------|-------------|
| `branded` | Electric blue primary (`#2B8CFF`), white text **(default)** — [Hermes Agent](https://hermes-agent.nousresearch.com/) marketing palette |
| `branded-alt` | Periwinkle (`#8FA3E8`), white text — pairs with `branded` |
| `dark` | Navy-wash dark surface, light text, blue accents |
| `light` | White / slate surfaces, blue accents |
| `system` | Auto-switches between `light`/`dark` based on `prefers-color-scheme` |

## Sizes

| Size | Height |
|------|--------|
| `sm` | 2rem (32px at default font size) |
| `md` | 2.5rem (40px) **(default)** |
| `lg` | 3rem (48px) |

Sizes use `rem` units and scale with the user's browser font preferences.

---

## Events

All buttons dispatch native `CustomEvent`s with `bubbles: true` and `composed: true` (crosses Shadow DOM).

| Event | Detail | Fired when |
|-------|--------|------------|
| `hb-copy` | `{ command: string }` | Command copied to clipboard |
| `hb-open` | `{ command: string }` | Button clicked / popup opens |
| `hb-close` | — | Popup closed |
| `hb-download` | `{ url: string }` | Skill package downloaded (Hermes skill button only) |

```js
el.addEventListener('hb-copy', (e) => {
  console.log('Copied:', e.detail.command);
});
```

---

## API Reference

### `<hermes-button>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `command` | `string` | — | The prompt/command to run |
| `theme` | `'branded' \| 'branded-alt' \| 'dark' \| 'light' \| 'system'` | `'branded'` | Theme variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `variant` | `'filled' \| 'outline' \| 'ghost'` | `'filled'` | Visual style |
| `shape` | `'rounded' \| 'pill' \| 'square'` | `'rounded'` | Border radius |
| `popup` | `'true' \| 'false'` | `'true'` | Show popup dialog on click |
| `prompt-flag` | `'true' \| 'false'` | `'true'` | Prepend `hermes -p` to the command |
| `popup-title` | `string` | `'Run on Hermes'` | Custom popup title |
| `popup-description` | `string` | — | Custom popup description |

### `<hermes-skill-button>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `command` | `string` | — | The slash command to run |
| `skill-url` | `string` | — | URL to downloadable skill package |
| `theme` | `'branded' \| 'branded-alt' \| 'dark' \| 'light' \| 'system'` | `'branded'` | Theme variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `variant` | `'filled' \| 'outline' \| 'ghost'` | `'filled'` | Visual style |
| `shape` | `'rounded' \| 'pill' \| 'square'` | `'rounded'` | Border radius |
| `popup` | `'true' \| 'false'` | `'true'` | Show popup dialog on click |
| `popup-title` | `string` | `'Run on Hermes Skills'` | Custom popup title |
| `popup-description` | `string` | — | Custom popup description |

### JavaScript Exports

```ts
// Web Components + factories
import {
  HermesButton,           // Web Component class
  HermesSkillButton,      // Web Component class
  createHermesButton,     // Factory function
  createHermesSkillButton,// Factory function
  showPopup,              // Show popup programmatically
  register,               // Manually register all custom elements
  registerHermesButton,   // Register only hermes-button
  registerHermesSkillButton, // Register only hermes-skill-button
} from 'hermesbuttons';

// React wrappers (SSR-safe, includes 'use client')
import { HermesButton, HermesSkillButton } from 'hermesbuttons/react';

// Vue plugin
import { HermesButtonsPlugin } from 'hermesbuttons/vue';

// Raw SVG icons + theme tokens
import { HERMES_ICON, HERMES_SKILL_ICON, BRAND_COLOR, ALT_BRAND_COLOR } from 'hermesbuttons';
```

### Explicit Registration

Registration happens automatically on import. For frameworks that need timing control:

```ts
import { register } from 'hermesbuttons';

// Call when you're ready to register the custom elements
register();
```

Or register individually with custom tag names:

```ts
import { registerHermesButton, registerHermesSkillButton } from 'hermesbuttons';

registerHermesButton('my-hermes-btn');
registerHermesSkillButton('my-hermes-skill-btn');
```

---

## Browser Support

Works in all browsers that support [Custom Elements v1](https://caniuse.com/custom-elementsv1):

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## License

MIT
