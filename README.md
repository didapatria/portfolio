# Adinda Fadhil Patria — Portfolio

Refined Minimal Dark portfolio — hybrid SPA + dedicated `/mrt` case study route, Geist, zinc palette, dark/light toggle.

<p>
  <a href="https://portfolio-didapatrias-projects.vercel.app">
    <img src="https://img.shields.io/badge/Live-portfolio--didapatrias--projects.vercel.app-0a1322?logo=vercel&logoColor=white" alt="Live" />
  </a>
  <img src="https://img.shields.io/badge/version-3.0.0-1d6fe8" />
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white" />
</p>

**Live:** https://portfolio-didapatrias-projects.vercel.app

**MRT Project:** https://mrt-station-dashboard.vercel.app

## Routes

Hybrid — landing scrolls between anchor sections, MRT case study lives on its own route.

| Route | Content |
|---|---|
| `/#home` | Hero — name 80px, bio, CTAs, "Featured Work" MRT card + 3 stat tiles |
| `/#about` | Timeline (work + edu), ranked top-6 skill bars, cert accordion |
| `/#projects` | MRT featured full-width + Ruas / Alturian two-up |
| `/mrt` | Case study — 6 sections, arch diagram, 3 challenges |

## Keyboard shortcuts

Type `g` then one of:

| Keys | Goes to |
|---|---|
| `g h` | `/#home` |
| `g a` | `/#about` |
| `g p` | `/#projects` |
| `g m` | `/mrt` |

## Tech Stack

- Next.js 16 (App Router)
- Tailwind v4
- Framer Motion
- TypeScript strict
- lucide-react
- Google Fonts: Geist · Geist Mono
- Vercel

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run lint
```

## Environment

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BUILD_SHA` | Git commit SHA — set in Vercel project settings as `$VERCEL_GIT_COMMIT_SHA` |
| `NEXT_PUBLIC_BUILD_DATE` | Deploy date YYYY-MM-DD (auto-set by `next.config.ts` at build time) |

## Deploy

Push to `main` — Vercel auto-deploys via GitHub connection.

In Vercel project settings → Environment Variables, add:
```
NEXT_PUBLIC_BUILD_SHA = $VERCEL_GIT_COMMIT_SHA
```

## Changelog

### v3.0.0
- **Hybrid architecture** — `/mrt` extracted to dedicated Next.js route; home now scrolls only Home · About · Projects
- **Hero rebuild** — single-column, name `clamp(56px, 7vw, 80px)`, MRT card full-width below CTAs, 3 stat tiles in a row
- **Nav** — `IntersectionObserver` rootMargin `-40% 0px -55% 0px` + highest-ratio tiebreaker (accurate active state); "Available" dot left of AFP (desktop only)
- **Timeline** — 10px company dots with pulse on current role, 2px sub-stem, Alturian sub-entries indented 24px with 6px sub-dots, labeled "Education" divider
- **Skills** — ranked top-6 bar chart (proficiency % + level label), animated via Framer Motion `useInView`; full category grid hidden behind expand toggle
- **Polish** — `g`-prefix keyboard shortcuts (`g h/a/p/m`), dynamic `opengraph-image.tsx` + `twitter-image.tsx` via `next/og`, updated metadata description
- Bump `package.json` → `3.0.0`, footer version + CLAUDE.md architecture note

### v2.1.1
- UI/UX polish + design system audit — full review delivered, 12 issues fixed
- Fix: `ProjectCard` anchor links (`#mrt`) no longer open in new tab
- Fix: duplicate `<h1>` — MRT section now `<h2>`, subsections `<h3>`
- A11y: skip-to-content link + `:focus-visible` ring globally
- `StatusBadge` differentiation — `Building2` (enterprise) vs `Lock` (confidential) icons
- Text arrows (`↗ → ←`) replaced with lucide icons throughout
- Animation tokens unified — `--dur-fast` 150ms, `--dur-base` 250ms
- Theme-aware `--primary-glow` + `--focus-ring` tokens
- Availability pill with pulse (respects reduced-motion)
- Footer added with build hash commit link, nav, social
- Removed dead `PageTransition` code (no-op in SPA)

### v2.1.0
- SPA — all sections on single page with anchor navigation + IntersectionObserver active nav
- Theme toggle fix — `useSyncExternalStore` + MutationObserver eliminates two-click bug
- Alturian Group nested timeline — parent entry with SE Specialist + Junior SE sub-roles
- lucide-react icons throughout (Menu, X, ChevronDown, Sun, Moon, ExternalLink)
- `:root.light` token scoping, simplified anti-flash script

### v2.0.0
- Refined Minimal Dark redesign — zinc palette, Geist fonts
- Multi-page architecture (/, /about, /projects, /mrt)
- Dark/light toggle, StatTile count-up, Navbar
