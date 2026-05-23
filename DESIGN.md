# PORTFOLIO · DESIGN SPECIFICATION

```
OPERATOR     ▸  Adinda Fadhil Patria
CONCEPT      ▸  Control Room Hybrid
LINEAGE      ▸  mrt-station-dashboard v2.18.0  →  portfolio v1.0.0
SURFACE      ▸  Single-page scroll · dark-first · /case/mrt as sub-route
STATUS       ▸  Design spec · ready for /implementation
```

This document is the source of truth for the portfolio surface. Every section below is laid out as: **(1) ASCII mockup**, **(2) spec table**, **(3) implementation notes**. Tailwind v4 utility names are given as hints; raw pixel values are authoritative.

---

## 0 · GLOBAL TOKENS

These are inherited verbatim from the Operations Terminal design system. **Do not redefine** — import `colors_and_type.css` and reference `var(--*)`. The portfolio's claim to a real design system collapses the moment a hex value is hard-coded in a component.

### Color (dark, primary)

| Token                | Value (computed)         | Role in portfolio                                  |
|----------------------|--------------------------|----------------------------------------------------|
| `--surface-0`        | `oklch(0.09 0.022 245)`  | banner strip, footer                               |
| `--surface-1` / `--bg` | `oklch(0.115 0.022 245)` | page background                                  |
| `--surface-2` / `--card` | `oklch(0.152 0.02 243)` | every card                                     |
| `--surface-3`        | `oklch(0.2 0.022 243)`   | row hover, mono chip background                    |
| `--fg-1`             | `oklch(0.92 0.008 240)`  | primary text                                       |
| `--fg-2`             | `oklch(0.6 0.018 245)`   | mono labels, muted prose                           |
| `--fg-3`             | `rgba(148,163,184,.45)`  | footer, timestamps, version chips                  |
| `--border`           | `oklch(0.225 0.022 243)` | every 1px card border                              |
| `--primary-deep`     | `#1d6fe8`                | accent line, buttons, badge fills                  |
| `--primary`          | `#3b82f6`                | accent line top, link, focus ring                  |
| `--primary-tint`     | `rgba(29,111,232,.08)`   | mono chip hover, ghost-button hover                |
| `--status-active`    | `#22c55e`                | banner LED, "DEPLOYED" badge                       |
| `--status-warn`      | `#f59e0b`                | "IN PROGRESS" badge                                |
| `--status-idle`      | `#6b7280`                | "CONFIDENTIAL" / archived states                   |

**Brief deviation from the brief.** The brief proposed a deeper page background (`#060c18`). I'm holding to `--surface-1` (`oklch(0.115 0.022 245)` ≈ `#0a1322`). Reason: the deeper black would visibly mismatch the MRT case-study page when a user clicks through, breaking the continuity claim that justifies Concept C. We *can* push to `--surface-0` (`#070d1a`) for the **banner and footer** only — that gives the brief's intended "more deliberate" feel as a contrast strip, without breaking the body surface. Spec'd that way below.

### Type ramp

| Class                 | Family            | Size           | Tracking | Used for                                        |
|-----------------------|-------------------|----------------|----------|-------------------------------------------------|
| `t-display-xl`        | Bebas Neue        | clamp(64,9vw,120) | 0.04em | hero name `ADINDA FADHIL PATRIA`                |
| `t-display-md`        | Bebas Neue        | 40px           | 0.06em   | MRT card title                                  |
| `t-display-sm`        | Bebas Neue        | 28px           | 0.04em   | stat tile numbers, section card titles          |
| `t-h3`                | Bebas Neue        | 18px           | 0.05em   | row project names where uppercase wanted        |
| `t-body-lg`           | Sora              | 16px           | 0        | hero tagline only                               |
| `t-body`              | Sora              | 14px           | 0        | descriptions, deployment-log rows               |
| `t-body-sm`           | Sora              | 13px           | 0        | secondary copy                                  |
| `t-mono-label`        | JetBrains Mono    | 10.5px         | 0.08em   | button labels, status pills                     |
| `t-mono-xs`           | JetBrains Mono    | 9.5px          | 0.14em   | section labels, banner text, footer             |
| `t-mono-data`         | JetBrains Mono    | 12px           | 0.06em   | data row values, terminal block                 |
| `t-mono-tabular`      | JetBrains Mono    | inherit        | 0.08em   | live clock, stat numbers when in mono           |

### Spacing & radii

- Grid is **4px**. Use spacing scale `--space-1` (4) through `--space-16` (64). Anything above 64px is questioned.
- Section vertical rhythm: **128px** top + **128px** bottom on desktop (`py-32`), **64px** on mobile (`py-16`).
- Card radius standard is `--radius-xl` (12px). Stat tiles are `--radius-lg` (8px). Mono chips are `--radius-sm` (4px). Pills are 20px.
- Page horizontal padding: **32px** desktop, **24px** tablet, **16px** mobile. Content max-width: **1200px** centered.

### Motion grammar (defaults that apply everywhere)

| Pattern              | Spec                                                                          | Where it lives                            |
|----------------------|-------------------------------------------------------------------------------|-------------------------------------------|
| LED status pulse     | `opacity 1 → 0.4`, glow `4 → 8px`, `2.4s ease-in-out infinite`                | banner ACTIVE dot only; "DEPLOYED" badge static |
| Colon blink          | `opacity 1 → 0`, `1s steps(2)`                                                | banner clock                              |
| Stat boot resolve    | 180ms stagger between tiles, each: 400ms count-up + 12px translateY fade-in   | hero, one-shot                            |
| Route fade-up        | translateY(12px) → 0, opacity 0 → 1, 700ms ease                               | once on initial mount                     |
| Hover (row/button)   | `border-color` and `background-color` only, **120–200ms ease**                | everywhere                                |
| Reduced motion       | All durations collapse to 0.01ms                                              | global media query                        |

**No animate-ping**, no scale transforms on cards, no blur, no glass, no gradient borders. The pulse is enough.

---

## SECTION 0 · SYSTEM BANNER

A 32px-tall fixed strip at the top of the viewport. Never grows, never shrinks. Sits **above** any in-page navigation.

### Mockup

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ ● ACTIVE · AVAILABLE FOR ENGAGEMENT       ID-JKT · UTC+7 · 14:32:08         PORTFOLIO v1.0.0│
└─────────────────────────────────────────────────────────────────────────────────────────────┘
  ↑ green LED, 6px, pulse 2.4s                  ↑ colon blinks every 1s             ↑ static
  ─── 32px height ───────────────────────────────────────────────────────────────────────────
  Background: --surface-0 (#070d1a equiv).  Bottom border: 1px var(--border).
```

### Spec

| Property              | Value                                                            |
|-----------------------|------------------------------------------------------------------|
| Position              | `position: fixed; top: 0; inset-inline: 0; z-index: 50`          |
| Height                | `32px` exact (`h-8`)                                             |
| Background            | `var(--surface-0)`                                               |
| Bottom border         | `1px solid var(--border)`                                        |
| Inner padding         | `0 24px` desktop, `0 16px` mobile (`px-6 md:px-4`)               |
| Layout                | `grid grid-cols-3 items-center` (left / center / right zones)    |
| Text style            | `.t-mono-xs` — 9.5px, tracking 0.14em, uppercase, `var(--fg-2)`  |
| LED dot (left)        | 6px circle, `bg: var(--status-active)`, `box-shadow: 0 0 6px var(--status-active-glow)` |
| LED → label gap       | 8px                                                              |
| Center zone alignment | `justify-self: center`                                           |
| Clock                 | `.t-mono-tabular` 9.5px; `<span class="colon">:</span>` animates |

### Implementation notes

- **Grid, not flex with justify-between.** Three 1fr columns keeps the clock perfectly centered regardless of left/right text width. Critical, since the left text is longer than the right.
- **Clock format:** `HH:MM:SS` (24h, Asia/Jakarta). Use `Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' })`. Update every 1000ms via `setInterval`. The colon between MM and SS is its own `<span>` with a CSS animation: `@keyframes colon { 50% { opacity: 0 } }` at `1s step-end infinite`. *Note: blink the **center** colon only, not both — blinking both reads as broken.*
- **LED pulse:** see global motion grammar. Element is a `<span aria-hidden="true">` so screen readers skip it; the word "ACTIVE" carries the meaning.
- **Reserve the space below.** Hero `padding-top` must be `32px + 128px` so the hero never sits under the banner.
- **Mobile <375px:** drop the center clock (`hidden xs:block`). Left zone collapses to `● ACTIVE` only. Right zone hides — version moves to footer.

---

## SECTION 1 · OPERATOR PROFILE (hero)

The hero is the page's first impression and the one decision that, if wrong, kills the whole portfolio. **It must feel inhabited, not performed.** Restraint is the difference between Bloomberg and a Discord bot.

### Mockup

```
┌─ ─                                                                              ─ ─┐
                                                                                       ← corner brackets, 1px,
                                                                                          16px arms, primary @ 20%

         OPERATOR · FULLSTACK ENGINEER · SOUTH JAKARTA, ID                                ← .t-mono-xs, fg-2

         ADINDA FADHIL PATRIA                                                             ← Bebas Neue clamp(64,9vw,120)
                                                                                            tracking 0.06em, fg-1

         I ship complete systems end-to-end — design tokens to E2E tests                 ← Sora 16px, fg-1
         to Fly.io. Two years operating. Currently on shift at MRT Jakarta.                max-width 560px

         ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
         │  2+              │  │  127             │  │  3              │             ← stat tiles
         │  ─               │  │  ─               │  │  ─              │
         │  YRS SHIPPING    │  │  E2E PASSING     │  │  LIVE DEPLOY.   │
         └─────────────────┘  └─────────────────┘  └─────────────────┘

         ▌ VIEW MRT PROJECT  →    GITHUB  →    LINKEDIN  →                            ← 1 filled + 2 ghost

                                                                              ─ ─┘
└─ ─
```

### Spec

| Element             | Value                                                                                                  |
|---------------------|--------------------------------------------------------------------------------------------------------|
| Section height      | `min-height: calc(100vh - 32px)` — exactly one viewport minus the banner                               |
| Padding             | `padding: 128px 32px` desktop; `padding: 80px 16px` mobile                                             |
| Background          | `var(--bg)` + dot-grid overlay (see below)                                                             |
| Corner brackets     | 4 × `1px solid var(--primary-deep)` at 20% opacity, 16px arms, inset 24px from corners                 |
| Content alignment   | `display: grid; place-items: center start;` — vertically centered, left-aligned content               |
| Content max-width   | `680px` for the text column; stat tiles row may extend to `760px`                                      |
| Vertical gaps       | label → name: 16px · name → tagline: 24px · tagline → tiles: 48px · tiles → CTAs: 32px                 |

### Components

**Dot-grid overlay**
```css
background-image: radial-gradient(circle, var(--primary-tint) 1px, transparent 1px);
background-size: 20px 20px;
background-position: 0 0;
opacity: 0.6; /* yielding ~0.045 effective alpha */
```
Applied as a `::before` pseudo on the section, `position: absolute; inset: 0; pointer-events: none;`.

**Operator label** — `.t-mono-xs`, color `var(--fg-2)`. Literal copy: `OPERATOR · FULLSTACK ENGINEER · SOUTH JAKARTA, ID`. The `·` is U+00B7 (middle dot), not a hyphen.

**Name** — Bebas Neue, `clamp(64px, 9vw, 120px)`, `letter-spacing: 0.06em`, `line-height: 0.9`, color `var(--fg-1)`. Single line; if viewport forces a wrap, drop to `clamp(48px, 8vw, 96px)` instead of letting it stack.

**Tagline** — Sora 16px (`.t-body-lg`), color `var(--fg-1)`, `max-width: 560px`, `text-wrap: pretty`. Final copy:
> "I ship complete systems end-to-end — design tokens to E2E tests to Fly.io. Two years operating. Currently on shift at MRT Jakarta."

**Stat tiles** — 3-up flex row, `gap: 16px`, each tile:

```
┌───────────────────────┐
│                       │   container:
│  127                  │     background: var(--card)
│                       │     border: 1px solid var(--border)
│  ──                   │     border-radius: 8px
│  E2E PASSING          │     padding: 20px 24px
│                       │     min-width: 180px
└───────────────────────┘     accent-line top: 2px gradient
```

- Number: Bebas Neue 40px (`.t-display-md`), `var(--fg-1)`, `font-variant-numeric: tabular-nums`. The `+` in `2+` is the same size.
- Divider: 1px × 24px rule, `var(--border)`, `margin: 8px 0`.
- Label: `.t-mono-xs`, `var(--fg-2)`.
- Top accent line: 2px tall absolute element, `linear-gradient(90deg, var(--primary) 0%, transparent 100%)`, sits at the very top of the tile (overlaps the border).

**CTAs** — 3-up flex row, `gap: 12px`:

| Variant  | Background       | Border                     | Label color   | Glow                                                  |
|----------|------------------|----------------------------|---------------|-------------------------------------------------------|
| Primary  | `--primary-deep` | none                       | `#fff`        | `0 0 24px rgba(29,111,232,0.25)`                      |
| Ghost    | transparent      | `1px solid var(--border)`  | `--fg-1`      | none; hover → border `rgba(59,130,246,0.3)`           |

Both: height `40px`, padding `0 20px`, border-radius `4px`, label `.t-mono-label`, gap `8px` between label and `→`. Hover transition `150ms ease` on `background-color` and `border-color` only.

### Boot sequence (one-shot, ~1s total)

On first mount, only the **three stat tiles** animate. Everything else is already painted (no flash). Spec:

| t (ms)   | Event                                                                                      |
|----------|--------------------------------------------------------------------------------------------|
| 0        | Hero is painted: label, name, tagline, CTAs visible at full opacity. Tiles invisible.       |
| 100      | Tile 1: opacity 0 → 1, translateY(12px) → 0 over 250ms. Number begins count-up: 0 → 2. 400ms duration. |
| 280      | Tile 2 starts (same shape). Count-up: 0 → 127.                                              |
| 460      | Tile 3 starts (same shape). Count-up: 0 → 3.                                                |
| ~960     | Sequence complete. **Never replays** — store `sessionStorage.bootDone = '1'`.               |

If `sessionStorage.bootDone` is set on mount, render tiles at final state instantly. If `prefers-reduced-motion: reduce`, render tiles at final state instantly regardless.

### Implementation notes

- **Corner brackets.** Use four absolutely-positioned `<span>`s, each `16px × 16px`, with `border-top + border-left` (or the appropriate two sides) `1px solid rgba(29,111,232,0.2)`. *Don't* attempt to draw with a single SVG — directly editable HTML elements are easier for the user to nudge.
- **Tabular numerals are mandatory** on stat tile numbers (`font-variant-numeric: tabular-nums`). Without them, the count-up animation visibly jitters.
- **Count-up implementation.** A simple `requestAnimationFrame` loop with easing `easeOutQuad`. Don't import a library for this.
- **Resist the urge to add a typing-cursor effect to the name.** Bebas Neue typewriter is theater. The brief is restraint.

---

## SECTION 2 · CURRENT DEPLOYMENT (MRT Jakarta)

The center of gravity of the entire page. Everything else exists to support this card. Treat it as such with vertical space and a slightly more elaborate internal layout than the rest of the page.

### Mockup

```
  CURRENT DEPLOYMENT                                                                  ← .t-mono-xs section label
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ← 2px accent line (240px wide)

  ┌──────────────────────────────────────────────────────────────────────────────────────┐
  │ ▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱│ ← 2px accent line
  │                                                                                      │
  │  MRT JAKARTA                                                         ● DEPLOYED      │ ← Bebas 40 + status chip
  │  Station Management Dashboard                                                        │ ← Sora 14 muted
  │                                                                                      │
  │  ─────────────────────────────────────────────────────────────────────────────       │ ← 1px hairline
  │                                                                                      │
  │  [ 15 PAGES ]  [ 127 E2E TESTS ]  [ 290+ COMMITS ]  [ v2.18.0 ]                      │ ← mono chips, row 1
  │  [ REACT 19 ]  [ NODE.JS ]  [ POSTGRESQL ]  [ DOCKER ]  [ PLAYWRIGHT ]               │ ← mono chips, row 2
  │                                                                                      │
  │  A full-stack operations dashboard for Jakarta's MRT — 15 pages, real-time SSE,      │ ← Sora 14, 2 sentences
  │  incident management, interactive Leaflet map, JWT + Google OAuth, RBAC, PWA,        │   max-width 720px
  │  PDF export, EN/ID i18n. Designed and built top-to-bottom in 6 weeks.                │
  │                                                                                      │
  │  ┌──────────────────────────┐  ┌──────────────────────────┐                          │
  │  │ LIVE DASHBOARD       →   │  │ API DOCS             →   │                          │ ← 2×2 entry buttons
  │  └──────────────────────────┘  └──────────────────────────┘                          │
  │  ┌──────────────────────────┐  ┌──────────────────────────┐                          │
  │  │ E2E REPORT           →   │  │ SOURCE CODE          →   │                          │
  │  └──────────────────────────┘  └──────────────────────────┘                          │
  │                                                                                      │
  │                                                       Read full case study  →        │ ← right-aligned link
  └──────────────────────────────────────────────────────────────────────────────────────┘
```

### Spec — section frame

| Property              | Value                                                            |
|-----------------------|------------------------------------------------------------------|
| Vertical padding      | `128px 0` desktop, `64px 0` mobile                               |
| Container             | `max-width: 1200px; margin: 0 auto; padding: 0 32px;`            |
| Section label         | `.t-mono-xs` `var(--fg-2)` "CURRENT DEPLOYMENT"                  |
| Accent line below     | `width: 240px; height: 2px; margin-top: 12px; margin-bottom: 32px; background: linear-gradient(90deg, var(--primary) 0%, transparent 100%);` |

### Spec — the card

| Property              | Value                                                            |
|-----------------------|------------------------------------------------------------------|
| Background            | `var(--card)`                                                    |
| Border                | `1px solid var(--border)`                                        |
| Radius                | `12px`                                                           |
| Padding               | `40px 48px` desktop, `32px 24px` tablet, `24px 20px` mobile      |
| Top accent line       | 2px tall, `linear-gradient(90deg, var(--primary) 0%, transparent 100%)`, sits at the top edge inside the border (use `::before` with `border-radius: 12px 12px 0 0`) |
| Inner gap rhythm      | header → divider: 24px · divider → chips: 24px · chips → description: 24px · description → buttons: 32px · buttons → footer link: 24px |

### Sub-components

**Header row** — `display: flex; justify-content: space-between; align-items: start; gap: 24px; flex-wrap: wrap;`
- Left column:
  - Title: `MRT JAKARTA` — Bebas Neue 40px (`.t-display-md`), `var(--fg-1)`. **Use uppercase** in markup, not `text-transform`, so the user can edit it directly.
  - Subtitle: `Station Management Dashboard` — Sora 14px, `var(--fg-2)`, `margin-top: 4px`.
- Right column: status chip (see below).

**Status chip "● DEPLOYED"**
- 20px pill (`border-radius: 20px`), height `24px`, padding `0 12px`, `display: inline-flex; align-items: center; gap: 8px;`
- Background `rgba(34,197,94,0.08)`, border `1px solid rgba(34,197,94,0.2)`
- LED: 6px circle `var(--status-active)`, `box-shadow: 0 0 6px var(--status-active-glow)`. **Static** — no pulse here. Only the banner LED pulses.
- Label: `.t-mono-label`, `color: var(--status-active)`.

**Hairline divider** — 1px tall, full width of card content area, `background: var(--border)`.

**Mono chip** (used across this section, deployment log, and capability matrix — define once):

```
inline-flex items-center
height: 24px
padding: 0 10px
background: var(--surface-3)
border: 1px solid var(--border)
border-radius: 4px
font: var(--font-mono) 10.5px / 1
letter-spacing: 0.08em
text-transform: uppercase
color: var(--fg-1)

hover (when interactive): border-color → rgba(59,130,246,0.3); transition 150ms
```

Chips row: `display: flex; flex-wrap: wrap; gap: 8px;`. Two rows shown in mockup are visual only — let them wrap naturally on `flex-wrap`.

**Description** — Sora 14px, `var(--fg-1)`, `max-width: 720px`, `line-height: 1.55`, `text-wrap: pretty`.

**Entry buttons (2×2 grid)**
- Container: `display: grid; grid-template-columns: repeat(2, minmax(0, 320px)); gap: 12px;` — fixed-width columns so the grid feels deliberate, not stretched.
- Each button:

```
display: flex; justify-content: space-between; align-items: center;
height: 48px
padding: 0 20px
background: transparent
border: 1px solid var(--border)
border-radius: 4px
color: var(--fg-1)
font: var(--font-mono) 10.5px / 1
letter-spacing: 0.14em
text-transform: uppercase
transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease

hover:
  background: var(--primary-tint)
  border-color: rgba(59, 130, 246, 0.3)
  color: var(--primary)

focus-visible:
  outline: 2px solid var(--primary-ring)
  outline-offset: 2px
```

- The label sits on the left, the `→` glyph on the right. Use `&rarr;` (or `→` literal), Sora character allowed here; if it looks light, switch to JetBrains Mono `→` and bump to 12px.

**Footer link** — `Read full case study →` — right-aligned, `.t-mono-data` 11px, `var(--fg-2)`, hover → `var(--primary)`.

### Implementation notes

- **The four entry buttons are the single most important interaction on the page.** Visitors arrive, scroll once, and either click one of these four or leave. Make them obviously interactive: the hover state has to land in under 100ms, the cursor has to feel clickable across the full 48×320 rectangle (not just the text), and they must open in a **new tab** (`target="_blank" rel="noopener"`).
- **Don't put icons on the buttons** beyond the `→`. A play-icon next to "LIVE DASHBOARD", a doc-icon next to "API DOCS", etc. would be the obvious move and would cheapen the row. The labels carry their own meaning.
- **The mono chips row is purely informational.** Don't make the chips clickable. If a visitor wants to dig into "REACT 19", they go to the case study, not a tag-filtered project list.
- **At <768px**, the 2×2 grid collapses to 1 column. Buttons go full-width.

---

## SECTION 3 · DEPLOYMENT LOG (secondary projects)

A compact tabular surface. Each row is one project. The goal here is **density without noise** — visitors should be able to read the whole log in 5 seconds.

### Mockup

```
  DEPLOYMENT LOG
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌──────────────────────────────────────────────────────────────────────────────────────┐
  │ 2023    Ruas — Online Exam Monitoring                                                │
  │         Thesis · ML proctoring                          [ REACT ] [ FLASK ] [ TF ]   │
  │         Real-time face and gaze tracking with TensorFlow. B.Tech thesis.             │
  │                                                                             GITHUB ↗ │
  ├──────────────────────────────────────────────────────────────────────────────────────┤
  │ 2024–   Alturian Group — Enterprise Systems                                          │
  │ 2026    Software Engineer Specialist     [ LARAVEL ] [ VUE ] [ REACT ] [ ANGULAR ]   │
  │         e-commerce · ERP · POS · loyalty · SaaS — production systems        ▾        │
  │                                                                       [CONFIDENTIAL] │
  ├──────────────────────────────────────────────────────────────────────────────────────┤
  │ 202?    ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─        │
  │         [ NEXT DEPLOYMENT ]                                                          │
  │         Currently provisioning.                                                      │
  └──────────────────────────────────────────────────────────────────────────────────────┘
```

### Spec — log container

| Property              | Value                                                            |
|-----------------------|------------------------------------------------------------------|
| Background            | `var(--card)`                                                    |
| Border                | `1px solid var(--border)`                                        |
| Radius                | `12px`                                                           |
| Row dividers          | 1px `var(--border)`, internal only                               |
| Top accent line       | Same 2px gradient as MRT card                                    |
| Row padding           | `24px 32px` desktop, `20px 20px` mobile                          |

### Row anatomy

```
┌── 80px ──┬──────────────────────── flex 1 ──────────────────────────┬── auto ──┐
│ YEAR     │  PROJECT NAME (Sora 15 medium)                            │ STATUS  │
│ 2023     │  Subtitle/role (Sora 13 muted)  + STACK CHIPS (right-end) │ BADGE   │
│ (mono 11)│  Description (Sora 13, max-width 520, fg-2)               │ /LINK   │
└──────────┴──────────────────────────────────────────────────────────┴─────────┘
```

| Element        | Spec                                                                                |
|----------------|-------------------------------------------------------------------------------------|
| Year column    | `width: 80px; flex: 0 0 80px;` — `.t-mono-data` 11px tabular, `var(--fg-3)`         |
| Name           | Sora 15px, weight 500, `var(--fg-1)`                                                |
| Subtitle       | Sora 13px, `var(--fg-2)`, margin-top 4px                                            |
| Description    | Sora 13px, `var(--fg-2)`, margin-top 8px, max-width 560px                           |
| Stack chips    | mono chip component (see §2), inline at end of subtitle row, `gap: 6px`             |
| Right column   | `flex: 0 0 auto`, vertical stack of status badge then link, right-aligned          |

### Status badges

| Variant            | Background                  | Border                          | Color                  | Example            |
|--------------------|-----------------------------|---------------------------------|------------------------|--------------------|
| Archived (Ruas)    | transparent                 | `1px solid var(--border)`       | `var(--fg-2)`          | `GITHUB ↗` link    |
| Confidential       | `rgba(107,114,128,0.08)`    | `1px solid rgba(107,114,128,.25)`| `var(--status-idle)`  | `[CONFIDENTIAL]`   |
| Placeholder        | none — dashed border row    |                                 |                        | `[ NEXT DEPLOYMENT ]` |

### Alturian expand-on-click

A `▾` chevron at the right edge of the subtitle row indicates expandability. Clicking the row expands a panel **inside** the row (below the description) showing the system list as mono chips, no links:

```
   ▸ E-COMMERCE   ▸ ERP   ▸ POS   ▸ LOYALTY   ▸ SAAS PLATFORMS

   No live demos available — production systems serving live customers.
```

- Expand animation: 200ms height transition with `grid-template-rows: 0fr → 1fr` trick (the only reliable smooth height anim). Chevron rotates 180° in 200ms.
- Default state: collapsed.

### Placeholder row

- Year cell: `202?` in `var(--fg-3)`
- Row uses `1px dashed var(--border)` instead of a solid divider above it
- Inside: a single mono chip `[ NEXT DEPLOYMENT ]` (4px radius, muted styling), followed by Sora 13 italic muted "Currently provisioning."
- This row is **not interactive** — `cursor: default`, no hover.
- Why it's here: it visually signals an active operator, not a closed log. Without it, three rows reads as "this is all I've done." With it, three rows reads as "this is the current state."

### Implementation notes

- **Hover state** on Ruas and Alturian rows: reveal a 2px primary accent on the **left edge** (`box-shadow: inset 2px 0 0 var(--primary)` transitioning from opacity 0 to 0.6 over 150ms). This is the table-row hover pattern from MRT — matches.
- **Row height is not fixed.** Let it grow with content. Use vertical padding (24px top/bottom on the row) rather than a min-height.
- **Chips on Alturian are stack tools, not system types** — the system types live inside the expand panel. Keep them separate; don't mix.

---

## SECTION 4 · CAPABILITY MATRIX

The differentiator vs the typical Indonesian developer portfolio. **Not a logo grid.** A four-row mono data table that signals density + restraint in one screen.

### Mockup

```
  CAPABILITY MATRIX
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌──────────────────────────────────────────────────────────────────────────────────────┐
  │ FRONTEND   ●●●●○  [ REACT 19 ] [ NEXT.JS ] [ TYPESCRIPT ] [ TAILWIND ]                │
  │                   [ FRAMER MOTION ] [ ANGULAR ] [ VUE ] [ REDUX ]                    │
  ├──────────────────────────────────────────────────────────────────────────────────────┤
  │ BACKEND    ●●●○○  [ NODE.JS ] [ EXPRESS ] [ LARAVEL ] [ PHP ] [ REST API ]           │
  │                   [ PRISMA ORM ]                                                     │
  ├──────────────────────────────────────────────────────────────────────────────────────┤
  │ INFRA      ●●●○○  [ DOCKER ] [ GITHUB ACTIONS ] [ FLY.IO ] [ VERCEL ]                │
  │                   [ SUPABASE ] [ POSTGRESQL ] [ MYSQL ]                              │
  ├──────────────────────────────────────────────────────────────────────────────────────┤
  │ TESTING    ●●●●○  [ PLAYWRIGHT ] [ VITEST ] [ RTL ] [ SUPERTEST ]                    │
  └──────────────────────────────────────────────────────────────────────────────────────┘
```

### Spec

| Property              | Value                                                            |
|-----------------------|------------------------------------------------------------------|
| Container             | Same card as Deployment Log (12px radius, accent line top)       |
| Row padding           | `24px 32px` desktop                                              |
| Row layout            | `grid; grid-template-columns: 120px 80px 1fr; align-items: start; gap: 24px;` |
| Row divider           | 1px `var(--border)` between rows                                 |

### Sub-components

**Category label** (column 1)
- `.t-mono-xs` 10px, tracking 0.16em, uppercase, `var(--fg-1)` (slightly brighter than row labels because these *are* the headings).
- `padding-top: 4px` to align optically with the first chip.

**Proficiency LED bar** (column 2)
- 5 dots, 6px each, gap 4px. Filled dots `var(--primary)`. Empty dots `1px solid var(--border)`, transparent fill.
- Levels:
  - Frontend: `●●●●○` (4/5)
  - Backend: `●●●○○` (3/5)
  - Infra: `●●●○○` (3/5)
  - Testing: `●●●●○` (4/5)
- `padding-top: 6px` to align with category label.

**Chips zone** (column 3)
- `display: flex; flex-wrap: wrap; gap: 8px;`
- Uses the same mono chip component from §2 and §3. **Not interactive** — `cursor: default`. Hover does nothing.

### Implementation notes

- **The LED levels are an editorial decision, not a self-assessment.** Frontend and Testing get 4/5 because those are the things you can demonstrate at length in the MRT case study (the React 19 surface, the 127 E2E tests). Backend and Infra are 3/5 because while you've shipped them, you don't have a public artifact that proves senior depth. Tune as you ship.
- **Do not add a "5/5" row.** Self-rated 5/5 reads as bluster regardless of accuracy. Leave headroom.
- **Mobile <640px**: layout collapses. Category label sits above the chips on its own line. LED bar sits to the right of the category label, inline. Chips take full width below.

```
FRONTEND    ●●●●○
[ REACT 19 ] [ NEXT.JS ] [ TYPESCRIPT ] [ TAILWIND ] [ FRAMER MOTION ]
[ ANGULAR ] [ VUE ] [ REDUX ]
```

---

## SECTION 5 · TRANSMISSION CHANNEL (contact)

A terminal block. No form, no marketing copy. Four lines and a cursor.

### Mockup

```
  TRANSMISSION CHANNEL
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌──────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                      │
  │  > LINKEDIN     ▸  /didapatria                                                       │
  │  > GITHUB       ▸  /didapatria                                                       │
  │  > INSTAGRAM    ▸  @didapatria                                                       │
  │  > EMAIL        ▸  didapatria3@gmail.com                                             │
  │  > _                                                                                 │
  │                                                                                      │
  └──────────────────────────────────────────────────────────────────────────────────────┘
```

### Spec

| Property              | Value                                                            |
|-----------------------|------------------------------------------------------------------|
| Container             | Same card pattern (12px radius, accent line top, 1px border)     |
| Padding               | `48px 56px` desktop, `32px 24px` mobile                          |
| Background            | `var(--surface-0)` — **deeper than other cards**. The terminal block is the page's only inversion. |
| Internal layout       | `display: grid; gap: 12px;`                                      |

### Each line

- `display: grid; grid-template-columns: 16px 100px 16px 1fr; align-items: baseline; gap: 12px;`
- Prompt `>` — `var(--primary)`, mono 12px
- Label `LINKEDIN` — `.t-mono-data` 12px, `var(--fg-2)`, uppercase
- Glyph `▸` — `var(--fg-3)`, mono 12px
- Handle `/didapatria` — `.t-mono-data` 12px, `var(--fg-1)`. **Underline on hover, color → `var(--link)`.**

### Cursor line

- Prompt `>` + a 9px × 14px solid block: `<span class="cursor"></span>` with `display: inline-block; width: 9px; height: 14px; background: var(--primary); margin-left: 8px; vertical-align: -2px;`
- Animation: `@keyframes blink { 50% { opacity: 0 } }` at `1s steps(2) infinite`.

### Implementation notes

- **Every line is a real anchor.** Use `<a href>` with appropriate scheme (`mailto:`, `https://`), `target="_blank" rel="noopener"`. The handle is the clickable text; the prompt, label, and glyph are decorative.
- **Don't add a `> SEND MESSAGE` row with a form.** Don't add a copy-to-clipboard button on the email. The block is finished.
- **Padding is intentional.** Cards in §2–4 have `40–48px` of vertical padding to convey density. This block has `48px` to convey calm. It's the breathing room before the footer.

---

## SECTION 6 · FOOTER

A thin two-zone strip. Mirrors the banner's restraint.

### Mockup

```
  ────────────────────────────────────────────────────────────────────────────────────────
  BUILD #a4f1c20 · LAST DEPLOY 2026-05-23 · PORTFOLIO v1.0.0    Built with Next.js 15 · Tailwind v4 · Framer Motion · Vercel
  © 2026 ADINDA FADHIL PATRIA · ALL SYSTEMS OPERATIONAL
```

### Spec

| Property              | Value                                                            |
|-----------------------|------------------------------------------------------------------|
| Background            | `var(--surface-0)`                                               |
| Top border            | `1px solid var(--border)`                                        |
| Padding               | `32px 32px 40px` desktop, `24px 16px 32px` mobile                |
| Layout                | Two-row grid                                                     |
| Row 1                 | `display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px;` |
| Row 2                 | `margin-top: 24px; text-align: center;`                          |

### Text

- Row 1 left: `.t-mono-xs` 9.5px, `var(--fg-3)`. The build hash is the actual short git SHA — wire it in via build-time env (`process.env.NEXT_PUBLIC_BUILD_SHA?.slice(0, 7) ?? 'dev'`).
- Row 1 right: `.t-mono-xs` 9.5px, `var(--fg-3)`.
- Row 2 (copyright): `.t-mono-xs` 8.5px, `var(--fg-3)`, `letter-spacing: 0.2em`.

### Implementation notes

- The footer's `ALL SYSTEMS OPERATIONAL` line is the page's quiet exit signal. Don't add an "ALL SYSTEMS OPERATIONAL ●" LED here — the banner already owns that beat. A second LED at the bottom is overkill.
- Last deploy date should auto-update via build env (`new Date().toISOString().split('T')[0]` at build time).

---

## LIGHT MODE NOTES

The site ships **dark-default**. Light mode exists for accessibility and to support the "Archive" pattern if/when a sub-route needs it. Toggle is **not exposed in v1 UI** — respect `prefers-color-scheme: light` only.

### Tokens that flip

| Token                | Dark                       | Light                       |
|----------------------|----------------------------|-----------------------------|
| `--bg`               | `oklch(0.115 0.022 245)`   | `oklch(0.974 0.007 248)`    |
| `--card`             | `oklch(0.152 0.02 243)`    | `oklch(1 0 0)` (pure white) |
| `--surface-0`        | `oklch(0.09 0.022 245)`    | `oklch(0.968 0.009 248)`    |
| `--surface-3`        | `oklch(0.2 0.022 243)`     | `oklch(0.96 0.008 248)`     |
| `--fg-1`             | `oklch(0.92 0.008 240)`    | `oklch(0.13 0.02 248)`      |
| `--fg-2`             | `oklch(0.6 0.018 245)`     | `oklch(0.52 0.012 248)`     |
| `--border`           | `oklch(0.225 0.022 243)`   | `oklch(0.9 0.01 248)`       |
| `--primary`          | `#3b82f6`                  | `#1d6fe8` (the deeper one — preserves contrast on white) |

### Tokens that stay the same

- All status colors (`--status-active` `#22c55e`, `--status-warn` `#f59e0b`, etc.) — they are LED-pure and must read identically across modes.
- Type ramp — every class, every size, every tracking value.
- Spacing, radii, motion.
- The 2px accent gradient on cards stays `#1d6fe8 → transparent`.

### Component-level adjustments in light mode

- **Dot-grid on hero** — opacity bumps from 0.6 to 0.8 to maintain visibility on white. The dot color stays `var(--primary-tint)` (token does its own job).
- **Mono chips** — background flips from `var(--surface-3)` (a darker neutral in dark, a lighter neutral in light) to maintain ~6% contrast against the card.
- **Stat tile accent line** — stays `var(--primary)` but reads as a saturated MRT blue on white, which is exactly right.
- **Transmission block** — its inversion to `var(--surface-0)` no longer reads as deeper, since `--surface-0` in light is *lighter* than `--card`. In light mode, swap to a hairline-only treatment: same `var(--card)` background, but with a thicker `border: 1px solid var(--border-strong)`.

### One thing that breaks in light mode

The status chip "● DEPLOYED" with green LED on a white card reads as a Slack notification. Mitigation: in light mode, the chip background flips from `rgba(34,197,94,0.08)` to `rgba(34,197,94,0.12)` and the label color darkens to `#15803d` (a green-700). The LED dot stays pure `#22c55e`.

---

## MOBILE BREAKPOINT NOTES

Breakpoints (Tailwind v4 defaults retained):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Section 0 · Banner
- `<375px`: Left zone collapses to `● ACTIVE` only. Center zone (clock) hidden. Right zone (version) hidden.
- `375–640px`: Left zone shows `● ACTIVE · AVAILABLE`. Center clock visible. Right version hidden.
- `≥640px`: Full three-zone layout.

### Section 1 · Hero
- `<640px`: Name drops to `clamp(48px, 11vw, 72px)`. Stat tiles stack vertically (3 rows × 1 column), each tile full-width minus padding. CTAs stack vertically, full-width.
- `640–1023px`: Stat tiles in 3-up row but narrower (140px min). CTAs in row.
- `≥1024px`: Spec as written.

### Section 2 · MRT card
- `<768px`: Header row flexes column. Status chip sits below subtitle. 2×2 button grid collapses to 1×4 (full-width stack). Mono chips wrap as needed (no scroll).
- Description max-width drops to 100%.

### Section 3 · Deployment Log
- `<768px`: Year column moves above the project name (no longer a column). Stack chips wrap to a new line under the description. Status badge stays right-aligned on its own row.
- Row padding drops to `20px`.

### Section 4 · Capability Matrix
- `<640px`: See Section 4 mobile spec above — category label + LED inline on row 1, chips on row 2.

### Section 5 · Transmission
- `<640px`: Each line's `100px` label column collapses to `auto`. The grid becomes `[> 12px] [LABEL auto] [▸ 12px] [HANDLE 1fr]`. Mono shrinks from 12px to 11px.

### Section 6 · Footer
- `<768px`: Row 1 wraps. Build info on its own line, "Built with…" line below.

---

## THE ONE COMPONENT MOST LIKELY TO BE IMPLEMENTED WRONG

### **The stat tile boot sequence.**

It looks like a small flourish. It will be implemented as one of these failure modes:

| Failure                                          | What goes wrong                                                                          |
|--------------------------------------------------|------------------------------------------------------------------------------------------|
| Implemented with CSS-only `animation: fadeIn`    | No count-up. Numbers appear at final value. The character of the section is gone.       |
| Implemented with a count-up library              | 30KB on a 5-element page. Embarrassing.                                                  |
| Replays on every route change                    | Visitor scrolls back up from §2, hero replays, feels broken.                             |
| Replays on every viewport intersection           | Visitor scrolls past hero and back, replays, feels broken AND theatrical.               |
| No `prefers-reduced-motion` fallback             | Vestibular users see numbers spasming.                                                   |
| Tabular numerals not set                         | Numbers visibly shift width as they count.                                               |
| Animates the entire hero on load                 | The brief said "one cinematic moment." Animating name + tagline + tiles is six moments. |

### How to avoid it

```jsx
// pseudo-implementation
function StatTile({ value, label, delay }) {
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();
  const booted = useRef(sessionStorage.getItem('bootDone') === '1');

  useEffect(() => {
    if (reduce || booted.current) {
      setDisplay(value);
      return;
    }
    const start = performance.now() + delay;
    let raf;
    const tick = (now) => {
      const t = Math.max(0, Math.min(1, (now - start) / 400));
      const eased = 1 - Math.pow(1 - t, 2); // easeOutQuad
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else if (delay === 460) sessionStorage.setItem('bootDone', '1');
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, delay, reduce]);

  return (
    <div className="stat-tile" style={{ animationDelay: `${delay}ms` }}>
      <span className="number tabular-nums">{display}{value === 2 ? '+' : ''}</span>
      <span className="divider" />
      <span className="label">{label}</span>
    </div>
  );
}
```

The session-storage gate is the most important part. **Visitors should see the boot sequence exactly once per session. Never twice. Never zero times.**

---

## OUT OF SCOPE FOR V1

Explicitly **not** designed and explicitly **not** to be added without a follow-up brief:

- Blog / writing section
- Photo or avatar of the operator
- Logo grid of clients or technologies
- "Let's work together" CTA / contact form
- Dark/light mode toggle in UI (respect system only)
- Tech logo SVGs anywhere
- Loading screen / splash
- Cookie banner
- Analytics opt-in dialog (analytics, if needed, runs cookieless via Plausible or similar)

---

```
DESIGN SPEC      ▸  Complete
NEXT             ▸  /implementation  ·  Next.js 15 + Tailwind v4 + Framer Motion
TOKEN SOURCE     ▸  /projects/91375dd2-…/colors_and_type.css  — import verbatim
LIVE TARGET      ▸  didapatria.dev (or similar) on Vercel
```
