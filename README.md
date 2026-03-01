# OverlayBox

**A floating, natural-language DOM manipulation panel for any webpage.**

OverlayBox is a Manifest V3 Chrome extension that injects a sleek, draggable overlay panel into any website. It lets you type plain-English commands — `make headings red`, `cyberpunk mode`, `make headings bounce` — and applies them as live CSS changes directly to the page. All changes are fully reversible, 100% local, and zero-network.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Feature Reference](#feature-reference)
  - [Panel UI](#panel-ui)
  - [Colour & Style](#colour--style)
  - [Visibility Control](#visibility-control)
  - [Background & Dark Mode](#background--dark-mode)
  - [Font Size](#font-size)
  - [Text Formatting](#text-formatting)
  - [Text Targeting](#text-targeting)
  - [Theme Presets](#theme-presets)
  - [Animations](#animations)
  - [Focus Mode](#focus-mode)
  - [Macros](#macros)
  - [Site Rules](#site-rules)
  - [Rollback / Reset](#rollback--reset)
- [Command Syntax Reference](#command-syntax-reference)
- [File Structure](#file-structure)
- [Installation (Developer / Unpacked)](#installation-developer--unpacked)
- [Known Limitations](#known-limitations)
- [Privacy & Safety](#privacy--safety)

---

## Overview

OverlayBox turns any browser tab into a live CSS editor — without opening DevTools. The user types a short English phrase, the built-in NLP parser converts it to a structured action, and the executor applies the change immediately to the page DOM. Every change is tracked in an undo registry, so a single "Reset" click reverts everything.

Key design principles:
- **No AI / cloud calls** — all parsing is rule-based and runs entirely in the browser.
- **Shadow DOM isolation** — the panel itself is injected inside a Shadow DOM root, so it can never be styled by or clash with the host page.
- **Graceful degradation** — CSP-blocked sites get inline-style fallbacks; SPAs get MutationObserver + retry timers.
- **Privacy-first** — `chrome.storage.local` only; no network requests ever leave the device.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Extension Platform | Chrome Extension — **Manifest V3** |
| Background | **Service Worker** (`background.js`) |
| Content Scripts | Vanilla **JavaScript** (ES6+, IIFEs, strict mode) |
| Panel UI | **Shadow DOM** + inline CSS-in-JS (no external framework) |
| Styling (panel) | **Vanilla CSS** with CSS custom properties (`--ob-*`) |
| Styling (themes) | CSS `<style>` tag injection, scoped via `data-ob-theme` HTML attribute |
| Animations | CSS **`@keyframes`** injected at runtime |
| Persistence | `chrome.storage.local` (macros, site rules, panel position/size/state) |
| Permissions | `storage`, `activeTab`, `scripting`, `<all_urls>` host permission |
| NLP / Parsing | Custom **regex rule-chain parser** (no external library) |
| DOM traversal | Native `TreeWalker` + `MutationObserver` |

---

## Architecture

```
chrome extension
├── background.js          Service Worker — lifecycle & message relay
│
├── manifest.json          MV3 manifest, permissions, content_script declarations
│
└── content/               All scripts injected into every tab
    ├── rollback.js        ① Rollback registry — must load first
    ├── executor.js        ② DOM execution engine
    ├── themes.js          ③ Theme preset definitions + injector
    ├── animations.js      ④ CSS keyframe animation injector
    ├── macros.js          ⑤ Macro save / run / delete / list
    ├── siterules.js       ⑥ Per-site persistent command runner
    ├── parser.js          ⑦ NLP command parser (last utility script)
    └── overlay.js         ⑧ Panel UI — top frame only
```

**Script load order matters.** The manifest declares utility scripts (`rollback` → `executor` → `themes` → `animations` → `macros` → `siterules` → `parser`) with `all_frames: true` so they run in iframes too, giving the executor access to nested frame content. `overlay.js` is loaded separately with `all_frames: false` — it contains an `if (window !== window.top) return` guard and mounts the panel only in the top-level frame.

**Panel injection strategy** — `overlay.js` uses a multi-stage fallback to handle all page timing situations:

1. If `document.body` exists → inject immediately.
2. If `readyState === 'loading'` → wait for `DOMContentLoaded`.
3. Otherwise → `MutationObserver` on `document.documentElement` + `setTimeout` retries at 500 ms, 1500 ms, and 4000 ms (covers SPA hydration).

---

## Feature Reference

### Panel UI

The panel is a fixed, floating card rendered inside a **Shadow DOM**. It is completely isolated from the host page's CSS.

| Control | Behaviour |
|---|---|
| **Drag** | Grab the header and drag anywhere on screen; position is persisted to `chrome.storage.local`. |
| **Resize** | Native CSS `resize: both` — drag the bottom-right corner. Size is persisted (debounced 400 ms). |
| **Collapse ▲/▼** | Hides the panel body, leaving only the header bar. State is persisted. |
| **Lock 🔓/🔒** | Prevents accidental dragging. State is persisted. |
| **Close ✕** | Removes the host element from the DOM (panel disappears until extension icon is clicked / tab reloads). |
| **? Help** | Switches to the built-in help tab, which lists all supported commands with clickable chips that fill the textarea. |
| **Run tab** | Default view with textarea, Run & Reset buttons, status bar, and command history. |
| **History** | Last 50 commands shown in a scrollable list with an accent border. |
| **Autocomplete** | Shows up to 6 suggestions (from a built-in list + saved macro names) as you type — keyboard-navigable. |
| **Status bar** | Shows success (green) or error (red) feedback, auto-clears after 5 seconds. |
| **Keyboard shortcut** | `Ctrl+Enter` or `Shift+Enter` submits the command from the textarea. |

**Visual design tokens (CSS custom properties):**

```css
--ob-bg:         rgba(15, 17, 25, 0.93)   /* dark glass background */
--ob-accent:     #6c63ff                   /* purple accent */
--ob-green:      #22c55e                   /* success colour */
--ob-red:        #ef4444                   /* error / reset colour */
--ob-font:       'Segoe UI', system-ui     /* UI font */
--ob-mono:       'Consolas', 'Fira Mono'   /* command textarea font */
--ob-radius:     14px                      /* panel corner radius */
```

The panel uses `backdrop-filter: blur(18px) saturate(160%)` for a frosted-glass look and sits at `z-index: 2147483647` (the maximum possible) to stay above all page content.

---

### Colour & Style

Change the colour of any supported element type by typing a plain-English command.

```
make headings red
make links blue
make paragraphs background yellow
set buttons crimson
turn images background transparent
```

**Supported element targets:**

| Keyword(s) | CSS Selector |
|---|---|
| `heading`, `headings` | `h1, h2, h3, h4, h5, h6` |
| `h1`, `h2`, `h3` | individual heading levels |
| `title`, `titles` | `h1, h2` |
| `paragraph`, `paragraphs` | `p` |
| `text` | `p, li, span, td` |
| `link`, `links` | `a` |
| `image`, `images` | `img` |
| `button`, `buttons` | `button, input[type="button"], input[type="submit"]` |
| `nav`, `navigation` | `nav, header` |
| `footer` | `footer` |
| `sidebar` | `aside, [class*="sidebar"], [id*="sidebar"]` |

**Supported action verbs:** `make`, `set`, `turn`, `color`, `colour`

**Named colours:** red, crimson, orange, amber, yellow, lime, green, teal, cyan, blue, indigo, violet, purple, pink, rose, white, black, gray/grey, silver, gold, transparent

**Direct hex / RGB values also work:**
```
make headings #ff6600
change background to #1a1a2e
```

---

### Visibility Control

Hide or show any supported element type.

```
hide images
show images
hide nav
hide footer
hide sidebar
```

**Supported hide verbs:** `hide`, `remove`, `invisible`, `disappear`  
**Supported show verbs:** `show`, `reveal`, `display`, `visible`, `unhide`

---

### Background & Dark Mode

```
dark mode
light mode
change background to teal
change background to #1a1a2e
```

`dark mode` sets `background: #111827` and `color: #f9fafb` on both `<body>` and `<html>`.  
`light mode` sets `background: #ffffff` and `color: #111827`.  
Custom colour sets only the background.

---

### Font Size

Adjust heading (or any other element's) font size in 2 px steps.

```
increase heading size
decrease heading size
increase paragraph size
decrease link size
```

**Supported increase verbs:** `increase`, `enlarge`, `bigger`, `larger`, `grow`, `boost`  
**Supported decrease verbs:** `decrease`, `shrink`, `smaller`, `reduce`, `lower`

Font size cannot drop below 6 px.

---

### Text Formatting

Apply standard typographic styles to any supported element.

```
bold headings
italic paragraphs
underline links
```

---

### Text Targeting

Style specific text content using `TreeWalker`-based DOM traversal.

**Colour all numbers on the page:**
```
make numbers orange
make numbers red
```
A `TreeWalker` walks every visible text node and wraps digit sequences (`\d+(\.\d+)?`) in `<span>` elements with the target colour. Double-processing is prevented via a `data-ob-processed` guard attribute.

**Colour text containing a specific word:**
```
make text containing "error" red
make text containing 'warning' orange
make text containing bug yellow
```
Supports double quotes, single quotes, and no quotes. Case-insensitive matching.

**Highlight a word or phrase:**
```
highlight important words
highlight "success"
```
Wraps all matching text in yellow (`#facc15`) highlighted `<span>` tags.

For pages with >1 000 text nodes, processing is automatically batched into chunks of 200 nodes via `setTimeout` to avoid blocking the main thread.

---

### Theme Presets

Apply a full-page visual theme with a single command.

```
cyberpunk mode
minimal mode
retro mode
neon mode
newspaper mode
reset theme
```

Themes are injected as a `<style>` tag scoped to a `data-ob-theme` attribute on `<html>`. If the site's CSP blocks the style tag, a simplified inline-style fallback is applied automatically.

| Theme | Description |
|---|---|
| **cyberpunk** | `#0a0014` background, `#00ffff` text, magenta headings with neon glow, monospace font, hue-rotated images |
| **minimal** | Clean `#fafafa` background, Georgia serif, 720 px max-width, hides nav/sidebar/footer/ads |
| **retro** | Parchment background (`#f5e6c8`), monospace font, dark-red uppercase headings, scanline overlay |
| **neon** | Deep dark background (`#05001a`), neon-green and neon-pink headings with text-shadow glow |
| **newspaper** | Two-column layout, Times New Roman, sepia filter, grayscale images |

`reset theme` / `remove theme` / `clear theme` removes the theme and restores the page.

---

### Animations

Apply CSS `@keyframes` animations to any supported element type.

```
make headings bounce
make links glow
make images float
make buttons pulse
add bounce effect
add fade effect
```

**Available animations:**

| Keyword | Effect |
|---|---|
| `bounce` | Vertical bounce loop |
| `shake` / `wobble` / `wiggle` | Horizontal shake loop |
| `pulse` / `blink` / `flicker` | Opacity + scale pulse |
| `fade` | One-shot fade-in from below |
| `spin` | Continuous 360° rotation |
| `glow` | Text-shadow pulse |
| `float` | Gentle vertical float |
| `rainbow` | Continuous hue-rotate |

Keyframes are injected as a single shared `<style>` tag (`__ob_anim_style__`). If CSP blocks it, a degraded inline opacity flicker is applied as a fallback. All animation classes are tracked in the rollback registry and are removed on Reset.

---

### Focus Mode

Reduce visual noise and improve reading focus.

**Full focus mode:**
```
focus mode
```
Dims `nav`, `header`, `footer`, `aside`, and common ad/sidebar elements to 15% opacity and makes them non-interactive. The main `article` / `main` content area is set to a comfortable reading width (72ch), centred, with increased font-size and line-height.

**Selective blur:**
```
blur everything except headings
blur everything except paragraphs
blur everything except main
```
Applies `filter: blur(3px)` to all top-level body children except the specified elements, which remain sharp.

---

### Macros

Save multi-step command sequences under a name and replay them with a single command.

**Save a macro:**
```
save macro dark: dark mode; make headings glow; make links cyan
save macro readmode: minimal mode; increase heading size
```
Commands in a macro are separated by `;`. The macro name may contain letters, numbers, and hyphens.

**Run a macro:**
```
run macro dark
macro readmode
```

**Manage macros:**
```
list macros
delete macro dark
```

Macros are persisted in `chrome.storage.local` under the key `overlaybox_macros` as JSON. They are profile-wide (not per-site) and survive browser restarts. Macro names appear in the autocomplete dropdown.

---

### Site Rules

Persist commands that run automatically every time you visit a specific site.

**Save a rule for the current site:**
```
save rule dark mode
save rule make headings #6c63ff
persist rule hide nav
```

The current `location.origin` (e.g., `https://example.com`) is used as the key. Multiple rules can be saved for the same site. On each page load, saved rules are re-executed after `DOMContentLoaded` (or after a 300 ms delay if the DOM is already ready).

**Manage rules:**
```
list rules
clear rules
```

Rules are stored in `chrome.storage.local` under `overlaybox_site_rules` as a JSON object mapping `origin → string[]`.

---

### Rollback / Reset

Every DOM change made by OverlayBox is tracked in a global modification registry (`window.__overlaybox_modRegistry`). Each entry stores:

- The modified `HTMLElement`
- Its `style.cssText` **before** modification
- Modification type: `style`, `visibility`, or `textSpan`
- Any `<span>` elements injected into text nodes

Clicking **⟲ Reset** calls `window.overlaybox_resetAll()`, which:
1. Restores `style.cssText` for all style/visibility changes.
2. Unwraps all injected `<span>` elements, replacing them with the original text nodes.
3. Calls `document.body.normalize()` to merge adjacent text nodes.
4. Clears and re-chains the registry (including theme and focus-mode `<style>` tags).

This mechanism is completely surgical — it restores the exact pre-modification state without doing a page reload.

---

## Command Syntax Reference

```
# Colour & Style
make <target> <colour>
make <target> background <colour>
set / turn / color / colour <target> <colour>

# Visibility
hide / remove / invisible / disappear <target>
show / reveal / display / visible / unhide <target>

# Background
dark mode  |  light mode
change background to <colour|hex>

# Font size
increase / enlarge / bigger / grow / boost <target> size
decrease / shrink / smaller / reduce / lower <target> size

# Typography
bold <target>
italic <target>
underline <target>

# Text content targeting
make numbers <colour>
make text containing "<word>" <colour>
highlight <word>
highlight important words

# Themes
<name> mode            (cyberpunk | minimal | retro | neon | newspaper)
apply theme <name>
reset theme

# Animations
make <target> <animation>
add <animation> effect

# Focus
focus mode
blur everything except <target>

# Macros
save macro <name>: <cmd1>; <cmd2>; ...
run macro <name>
macro <name>
list macros
delete macro <name>

# Site rules
save rule <command>
persist rule <command>
list rules
clear rules
```

---

## File Structure

```
overlaybox/
├── manifest.json          MV3 extension manifest
├── background.js          Service Worker (lifecycle + message relay)
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── styles/
│   └── overlay.css        Reference stylesheet (panel styles are also inlined in overlay.js)
└── content/
    ├── rollback.js        Modification registry & resetAll()
    ├── executor.js        DOM execution engine (routes parsed actions to DOM ops)
    ├── themes.js          5 theme presets + applyTheme() / removeTheme()
    ├── animations.js      8 CSS keyframe animations + overlaybox_animate()
    ├── macros.js          Macro CRUD + storage persistence
    ├── siterules.js       Per-origin rule persistence + auto-run on load
    ├── parser.js          NLP regex rule-chain parser → structured action objects
    └── overlay.js         Shadow DOM panel UI, drag, resize, tabs, autocomplete
```

---

## Installation (Developer / Unpacked)

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the `overlaybox/` folder.
5. The extension icon appears in the toolbar. Navigate to any website and the panel will appear automatically in the bottom-right corner.

> **Tip:** To use on `file://` URLs, go to the extension's detail page and enable **"Allow access to file URLs"**.

---

## Known Limitations

| Scenario | Reason | Workaround |
|---|---|---|
| `chrome://` and `edge://` pages | Chrome blocks all extensions on internal pages | None (by design) |
| Chrome Web Store / extension pages | Blocked by Chrome | None |
| PDF viewer tabs | No HTML DOM to inject into | None |
| Strict CSP sites | Some enterprise sites block `<style>` injection | Themes/animations use inline fallbacks automatically |
| `file://` URLs | Requires manual permission | Enable "Allow access to file URLs" in extension settings |
| SPA navigation (React, Vue, etc.) | Page content changes without a real navigation | Use **Site Rules** to auto-reapply; MutationObserver handles new DOM nodes |
| Canvas-rendered pages | No real DOM text (some games, PDFs) | Not supported |
| Page reload | Reloads clear all cosmetic changes | Use Site Rules to persist and auto-reapply |

---

## Privacy & Safety

| Property | Detail |
|---|---|
| ✅ **100% local** | Runs entirely in your browser; zero network requests, ever |
| ✅ **No data collection** | Nothing is logged, tracked, or sent anywhere |
| ✅ **No keylogging** | Only reads input typed into the OverlayBox panel itself |
| ✅ **No form access** | Cannot read passwords, form inputs, or private page data |
| ✅ **Cosmetic only** | Only modifies CSS/visual presentation; never touches page JS logic |
| ✅ **Fully reversible** | Reset undoes every single change without a page reload |
| ✅ **Open source** | All code is readable in the extension folder |
| ✅ **Storage scope** | `chrome.storage.local` stores only: macros, site rules, panel position, panel size, collapse/lock state — all on-device only |
