# Portfolio Redesign — Design Spec

**Date:** 2026-05-24
**Status:** Approved
**Scope:** Full redesign of didapatria.dev — scrapping Operations Terminal aesthetic, replacing with Refined Minimal Dark. Multi-page architecture: `/` · `/about` · `/projects` · `/mrt`.

---

## 1. Concept: Refined Minimal Dark

### Signal
"Senior. Product-aware. Could ship at Linear or Vercel." Achieves this through precision execution, not decoration. Differentiation is in spacing, weight contrast, and motion restraint — not a novel concept.

### Typography
| Role | Font | Weight | Notes |
|---|---|---|---|
| All body + headings | Geist Sans | 400 / 600 / 700 | via `next/font/google` |
| Labels, tags, data, mono | Geist Mono | 400 | via `next/font/google` |

No Bebas Neue, no Sora, no JetBrains Mono from prior design. Clean break.

### Color Tokens (dark, default)
| Token | Value | Role |
|---|---|---|
| `--bg` | `#09090b` | page background |
| `--card` | `#111113` | card surfaces |
| `--surface-0` | `#0d0d0f` | featured card bg, nav bg |
| `--border` | `#27272a` | all 1px borders |
| `--border-subtle` | `#1f1f23` | inner dividers |
| `--fg-1` | `#fafafa` | primary text |
| `--fg-2` | `#a1a1aa` | secondary text |
| `--fg-3` | `#71717a` | muted / inactive nav |
| `--fg-4` | `#3f3f46` | very muted, eyebrows |
| `--primary` | `#3b82f6` | links, active, featured borders, CTAs |
| `--primary-tint` | `rgba(59,130,246,0.08)` | hover bg on ghost elements |
| `--green` | `#22c55e` | availability dot, live status |
| `--amber` | `#f59e0b` | CONFIDENTIAL badge |
| `--red` | `#ef4444` | error states (if needed) |

### Color Tokens (light variant — `html.light`)
| Token | Value |
|---|---|
| `--bg` | `#ffffff` |
| `--card` | `#f4f4f5` |
| `--surface-0` | `#fafafa` |
| `--border` | `#e4e4e7` |
| `--border-subtle` | `#f0f0f0` |
| `--fg-1` | `#09090b` |
| `--fg-2` | `#3f3f46` |
| `--fg-3` | `#71717a` |
| `--fg-4` | `#a1a1aa` |
| `--primary` | `#2563eb` | (slightly deeper for light bg contrast) |
| `--primary-tint` | `rgba(37,99,235,0.06)` |

### Motion
- **Page mount:** `opacity 0→1` + `translateY(8px→0)`, 300ms `cubic-bezier(0.16,1,0.3,1)`, once per route
- **Hover transitions:** `border-color` + `color` only, 150ms ease. No scale, no blur, no bounce.
- **Reduced motion:** all durations → 0.01ms via `prefers-reduced-motion`
- **Stat count-up:** retained from current build (fires once per session via `sessionStorage`)

### Theme Toggle
User-controlled dark/light. `localStorage` key `"theme"`. Anti-flash `<script>` in `<head>`. ThemeToggle component (Sun/Moon) in nav right zone.

---

## 2. Navigation

**Pattern:** Minimal Top Bar — 48px fixed header.

**Desktop layout:**
```
[AFP]                    [Work]  [About]  [Projects]  [Theme ☀/☾]
```
- `AFP` monogram: `font-weight: 700`, `font-size: 14px`, left-aligned
- Links: `font-size: 13px`, active = `--fg-1`, inactive = `--fg-3`, no underline, no hover bg
- Active state: text color change only — no underline, no pill, no indicator dot
- Right zone: ThemeToggle (28×28px icon button, same as current)
- No `/mrt` nav item — case study is accessed from `/projects` only

**Mobile (≤ 768px):**
- Hamburger icon (3 lines, 16px, `--fg-3`) replaces links
- Tap → full-screen overlay (`#09090b`, `z-index: 100`)
- Links stacked vertically, `font-size: 24px`, `font-weight: 600`
- Close button top-right (×)
- Overlay fades in 200ms

**No SystemBanner.** The 32px fixed ops-banner from the old design is removed entirely. Nav bar replaces it.

---

## 3. Home Page (`/`)

### Hero — Two-column split

**Left column (≈ 55% width):**
1. Availability line: green dot + "Available for engagement" (Geist Mono, 11px, `--green`)
2. Name: `Adinda Fadhil Patria` — `font-size: clamp(40px, 5.5vw, 64px)`, `font-weight: 700`, `letter-spacing: -0.03em`, `--fg-1`
3. Role + location: `Fullstack Engineer · South Jakarta, ID` — Geist Mono, 12px, `--fg-3`
4. Bio (2 sentences): "I ship complete systems end-to-end — design tokens to E2E tests to Fly.io. Two years operating. Currently on shift at MRT Jakarta."
5. CTAs row: `View Projects →` (filled, `--fg-1` bg on dark / `--bg` on light, white text) + `GitHub ↗` (ghost) + `LinkedIn ↗` (ghost)

**Right column (≈ 45% width):**
1. MRT featured card (see Projects card spec below, same component reused)
2. 3 stat tiles below card: `127 / E2E PASSING` · `2+ / YRS SHIPPING` · `3 / LIVE DEPLOYS`
   - Count-up animation on mount (existing `StatTile` logic, adapted to Geist)

**Below fold:**
- Single-line teaser: `"Selected Work →"` — links to `/projects`
- No full project list duplicated on home

**Mobile (≤ 768px):** stacks to single column — left first, right (MRT card + stats) below.

---

## 4. About Page (`/about`)

### Two-column layout

**Left — Timeline:**

Work experience as vertical timeline with connector line:

```
● MRT Jakarta                    2025 – PRESENT
  Software Engineer (Contract)
  Next.js · Node.js · Playwright · SSE

● Alturian Group                 2024 – 2026
  Software Engineer Specialist
  Laravel · Vue · React · Angular · Ionic
  [CONFIDENTIAL] badge

──────────────────────

● Universitas Pasundan           2020 – 2024
  B.Tech Informatics Engineering · GPA 3.70

● Binar Academy                  2023
  Full-Stack Web Development Bootcamp
```

- Active/current role dot: `--primary` (blue)
- Past roles: `--fg-4` (zinc)
- Connector line: 1px `--border`

**Right — Skills + Certs:**

Skills as grouped tag grid:
```
FRONTEND    [React 19] [Next.js] [TypeScript] [Tailwind] [Framer Motion] [Angular] [Vue.js] [Redux]
BACKEND     [Node.js] [Express] [Laravel] [PHP] [Prisma ORM]
INFRA       [Docker] [GitHub Actions] [Fly.io] [Vercel] [Supabase] [PostgreSQL]
TESTING     [Playwright] [Vitest] [React Testing Library] [Supertest]
MOBILE      [Ionic Framework]
```

Tags: same `MonoChip` component (or replacement), `font-size: 11px`, `--card` bg, `--border` border.

Certifications: collapsed by default behind "6 Certifications ▾" toggle. On expand, shows list of Udemy cert names + year. No logos, no badges — text only.

**No soft skills section.** Timeline + shipped work is the proof.

**Mobile:** stacks to single column — timeline first, skills below.

---

## 5. Projects Page (`/projects`)

### Layout: Asymmetric — Featured full-width + Two-up row

**Row 1 — MRT Jakarta (full width):**
```
┌─────────────────────────────────────────────────────────────────┐
│ ●  LIVE · CASE STUDY AVAILABLE                        2025      │
│ MRT Jakarta Dashboard                                           │
│ Full-stack ops platform · 15 pages · 127 E2E · Fly.io + Vercel │
│ [React 19] [Node.js] [TypeScript] [Playwright] [SSE] [Docker]   │
│                                                                 │
│ [Live Dashboard ↗]  [Case Study →]  [API Docs ↗]  [GitHub ↗]  │
└─────────────────────────────────────────────────────────────────┘
```
- `border-left: 2px solid --primary`
- Background: `--surface-0` (slightly elevated from page bg)
- Live status: green dot + "LIVE" in Geist Mono
- All 4 entry points as buttons in one row

**Row 2 — Two-up (Ruas + Alturian):**

| Left: Ruas | Right: Alturian |
|---|---|
| `2023 · THESIS` label | `2024–2026 · ENTERPRISE` label (amber) |
| Ruas — Online Exam Monitoring | Alturian Group — Enterprise Systems |
| React + Flask + TensorFlow | Laravel · Vue · React · Angular · Ionic |
| `[ML] [Python] [React]` chips | `[ERP] [POS] [SaaS] [Mobile]` chips |
| `GitHub ↗` link | `⊘ CONFIDENTIAL` amber badge, no links |
| 100% opacity | 75% opacity — signals no public access |

Alturian's reduced opacity is intentional — present but not hyped. Amber badge explains the absence of links without apology.

---

## 6. MRT Case Study (`/mrt`)

### Entry point buttons — top AND bottom of page
`[Live Dashboard ↗]  [API Docs ↗]  [E2E Report ↗]  [Source Code ↗]`

### 6 sections

| # | Title | Content rules |
|---|---|---|
| 01 | Overview | Problem statement (1 paragraph): what PT MRT Jakarta needed, why it was complex. My role in one sentence. Do NOT open with "I built a dashboard." |
| 02 | Architecture | Stack diagram: Next.js (frontend) → Express/Node (API) → PostgreSQL. Fly.io (backend) + Vercel (frontend). SSE flow for real-time. One diagram, rendered as SVG/image. Short prose below. |
| 03 | Design System | "Operations Terminal" — what it is, why it was built from scratch. 3–4 component screenshots (OpsCard, StatTile, TerminalBlock, LEDDot). Proves design ownership without lengthy text. |
| 04 | Key Challenges | Pick exactly 3 hard problems. Format per challenge: **Problem** (1–2 sentences) → **Solution** (2–3 sentences) → **Outcome** (1 sentence). Candidate problems: SSE reconnection/backpressure, Spatie RBAC with multi-role UI, real-time map with 15+ concurrent station updates. |
| 05 | Testing | "127 Playwright E2E tests." Link to live HTML report (GitHub Pages). 1 screenshot of the Playwright report. 2 sentences on strategy: what's covered, why E2E over unit for this domain. |
| 06 | Links | Repeat all 4 entry points. Deployment status (live/healthy). GitHub repo link + star count if nonzero. |

**Length target:** Each section 2–4 paragraphs. Total page: ~800–1000 words prose + diagrams/screenshots. Not a README, not a blog post.

---

## 7. Technical Stack (unchanged from current)

- Next.js 16 · App Router · React 19 · TypeScript strict
- Tailwind v4 (CSS-based config)
- Framer Motion (page transitions)
- `next/font/google` — Geist + Geist Mono replacing Bebas Neue / JetBrains Mono / Sora
- Vercel deployment, `NEXT_PUBLIC_BUILD_SHA` env injected

### File/folder changes vs current build

| Current | New |
|---|---|
| `src/styles/tokens.css` — rewrite | New zinc palette, Geist vars, remove all Bebas/JetBrains refs |
| `src/components/SystemBanner.tsx` — DELETE | Replaced by `Navbar.tsx` |
| `src/components/sections/` — all rewrites | New layouts per spec above |
| `src/app/page.tsx` | Home page assembly |
| `src/app/about/page.tsx` | New route |
| `src/app/projects/page.tsx` | New route |
| `src/app/mrt/page.tsx` | Rewrite |
| `DESIGN.md` | Archive or overwrite with this spec |

### Components to build/rewrite

| Component | Status | Notes |
|---|---|---|
| `Navbar` | New | Replaces SystemBanner. Fixed 48px, mobile hamburger. |
| `MobileMenu` | New | Full-screen overlay, Framer Motion AnimatePresence |
| `ThemeToggle` | Keep | Already built, move to Navbar |
| `ProjectCard` | New | Reusable. Featured variant (full-width) + standard variant (half-width) |
| `StatTile` | Keep + restyle | Count-up logic stays, visual reskin to Geist |
| `TimelineItem` | New | Work/edu row with dot + connector |
| `SkillGrid` | New | Category label + tag row |
| `CertAccordion` | New | Collapsed certs expand |
| `CaseStudySection` | New | Wrapper for /mrt sections |
| `PageTransition` | Keep | Already built |
| `ScrollToTop` | Keep | Already built |

---

## 8. Out of Scope

- Blog / writing section
- Contact form (email link only)
- Animations beyond page mount + hover transitions
- Dark/light auto-follow system (only user-controlled toggle)
- Analytics integration
- OG image generation

---

## Decisions Log

| Decision | Rationale |
|---|---|
| Geist over Inter/Space Grotesk | Vercel-made, production-grade, used by companies you named. Avoids "generic SWE portfolio 2024" trap. |
| No `/mrt` in main nav | Case study is a destination accessed from Projects — not a top-level section. Keeps nav tight. |
| Alturian at 75% opacity | Signals confidentiality visually, not apologetically. Present but not promoted. |
| No soft skills section | Timeline + deployed projects are proof. Text claims about "collaboration" are filler. |
| Certs collapsed by default | Present for completeness, not as a lead signal. GPA 3.70 + live deploys outrank Udemy certs. |
| MRT on home AND projects | Home is not purely a teaser — MRT is too strong to hide below fold. |
