# Adinda Fadhil Patria — Portfolio

Refined Minimal Dark portfolio — SPA, Geist, zinc palette, dark/light toggle.

<p>
  <a href="https://portfolio-didapatrias-projects.vercel.app">
    <img src="https://img.shields.io/badge/Live-portfolio--didapatrias--projects.vercel.app-0a1322?logo=vercel&logoColor=white" alt="Live" />
  </a>
  <img src="https://img.shields.io/badge/version-2.1.1-1d6fe8" />
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white" />
</p>

**Live:** https://portfolio-didapatrias-projects.vercel.app

**MRT Project:** https://mrt-station-dashboard.vercel.app

## Routes

Single page — all content on `/` with anchor sections.

| Anchor | Content |
|---|---|
| `#home` | Hero — bio, MRT featured card, stat tiles |
| `#about` | Timeline (work + edu), skill grid, cert accordion |
| `#projects` | MRT featured full-width + Ruas / Alturian two-up |
| `#mrt` | Case study — 6 sections, arch diagram, 3 challenges |

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
