# hermesbuttons — Integration Skill

Add **Run on Hermes** (CLI via `hermes -p "..."`) and **Run on Hermes Skills** (installable skills with memory-aware workflows) buttons to any web project targeting [Hermes Agent](https://github.com/cybertheory/hermesbuttons).

## When to Use

Use this skill when you need to:

- Embed a one-click path from docs, landing pages, or internal tools into Hermes Agent
- Offer both a **direct CLI prompt** and a **skill package URL** (zip / manifest) on the same page
- Mirror patterns from `claudebuttons` but for Hermes Agent marketing palette (electric blue `#2B8CFF`, periwinkle alt) and event names (`hb-*`)
- Improve discoverability for crawlers and other agents (hidden crawl links + optional `injectStructuredData()`)

## How to Add Buttons

### Step 1: Install

```bash
npm install hermesbuttons
```

Or add via CDN:

```html
<script src="https://unpkg.com/hermesbuttons"></script>
```

### Step 2: Use the Web Components

```html
<!-- CLI: copies `hermes -p "..."` (when prompt-flag is true) -->
<hermes-button
  command="/research deep-dive on React Server Components"
  theme="branded"
  size="md"
></hermes-button>

<!-- Skills: command + downloadable skill for persistent / memory workflows -->
<hermes-skill-button
  command="/competitive-analysis"
  skill-url="https://your-cdn.com/skills/competitive-analysis.zip"
  theme="branded"
  size="md"
></hermes-skill-button>
```

### Step 3: Customize

**Themes:** `branded` (blue `#2B8CFF`, default), `branded-alt` (periwinkle `#8FA3E8`), `dark`, `light`, `system`

**Sizes:** `sm`, `md` (default), `lg`

**Variants:** `filled`, `outline`, `ghost` — **Shapes:** `rounded`, `pill`, `square`

**Popup:** Set `popup="false"` to copy immediately without the dialog.

## Framework Integration

The buttons are Web Components and work in any framework:

- **React:** `import { HermesButton, HermesSkillButton } from 'hermesbuttons/react'`
- **Vue:** `import { HermesButtonsPlugin } from 'hermesbuttons/vue'` then `app.use(HermesButtonsPlugin)`
- **Svelte / Angular / Solid / Astro:** `import 'hermesbuttons'` and use `hermes-button` / `hermes-skill-button` in templates

Listen for `hb-copy`, `hb-open`, `hb-close`, and on skill buttons `hb-download` for analytics or UX hooks.

## Button Behavior (Summary)

| Control | User flow |
|--------|-----------|
| `hermes-button` | Opens dialog (or copies) with the full terminal command using `hermes -p` when `prompt-flag` is enabled |
| `hermes-skill-button` | Opens dialog with setup steps, optional skill download URL, and the slash command to run in Hermes |

## Useful Exports

```ts
import 'hermesbuttons';
import {
  createHermesButton,
  createHermesSkillButton,
  injectStructuredData,
  register,
} from 'hermesbuttons';
```

For a full interactive reference, open `examples/index.html` in the package repo after building (`npm run build`).
