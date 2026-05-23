# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build (runs type-check)
npm run lint     # ESLint (must pass before commit)
```

No test suite — UI-only portfolio.

## Stack

Next.js 16 · App Router · React 19 · Tailwind v4 · Framer Motion · TypeScript strict

## Architecture

Single-page scroll at `/`, sub-route at `/mrt` (case study).

**Token system** — `src/styles/tokens.css` is the only source of truth for color, type, spacing, and motion. **No hex values in components** — always use `var(--*)`. Tokens imported in `globals.css` and available everywhere. Light mode via `@media (prefers-color-scheme: light)` overrides in the same file.

**Type classes** — `.t-display-xl`, `.t-display-md`, `.t-display-sm`, `.t-body-lg`, `.t-body`, `.t-body-sm`, `.t-mono-label`, `.t-mono-xs`, `.t-mono-data`, `.t-mono-tabular` — all defined in `tokens.css`, used as `className` strings. Never write raw font/size/tracking inline; use these.

**Component rules:**
- Named exports on all components; `default export` only for App Router page files
- Components with event handlers (`onMouseEnter`, `useState`, `useEffect`) must have `'use client'` at top
- `LEDDot pulse` — only ONE animate-pulse LED allowed per viewport (the banner). All other LEDs are static
- No scale transforms on hover — `transition-colors` only (`background-color`, `border-color`, `color`)

**Surface hierarchy** (most important to get right):
| Token | Where |
|---|---|
| `--surface-0` / `var(--surface-0)` | `SystemBanner`, `FooterSection`, `TerminalBlock` background |
| `--bg` | page `<html>` background |
| `--card` | all `OpsCard` instances |
| `--surface-3` | `MonoChip` background, row hover |

**Boot sequence** (`StatTile`) — fires once per session via `sessionStorage.bootDone`. The last tile (`isLast={true}`) sets the flag. If `prefers-reduced-motion` or flag already set, tiles render at final value instantly. Stagger: tile 1 at 100ms, tile 2 at 280ms, tile 3 at 460ms.

**Accent line** — 2px `linear-gradient(90deg, var(--primary) → transparent)`. Used on `OpsCard` (absolute top), stat tiles, and `.accent-line` utility class in `SectionLabel`. Never use status colors for accent lines.

## Key Files

| File | Purpose |
|---|---|
| `src/styles/tokens.css` | All CSS vars, type classes, keyframes, responsive banner classes |
| `src/components/SystemBanner.tsx` | Fixed 32px banner; live clock (`Asia/Jakarta`); colon-blink animation |
| `src/components/StatTile.tsx` | Boot sequence + count-up; `useReducedMotion` hook lives here |
| `src/components/OpsCard.tsx` | Card wrapper — always use this, never raw `div` for cards |
| `src/app/globals.css` | Imports tokens + base reset only; no styles here |
| `src/app/layout.tsx` | Font vars (`--font-display`, `--font-mono`, `--font-body`) set here via `next/font` |

## Conventions

- `padding: '128px 0'` desktop section rhythm; `'64px 0'` mobile
- Content max-width: `1200px`, centered with `padding: '0 32px'`
- Inline `style` for layout/tokens; `className` only for type utility classes
- Responsive overrides via `<style>{...}` JSX blocks inside section components (scoped CSS)
- Commit format: `feat(scope):`, `fix(scope):`, `chore:` — subject ≤72 chars
