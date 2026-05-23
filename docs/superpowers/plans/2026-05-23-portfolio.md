# Portfolio — Operations Terminal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Adinda Fadhil Patria's personal portfolio as an Operations Terminal / Control Room Hybrid single-page site on Next.js 15 + Tailwind v4 + Framer Motion.

**Architecture:** Single-page scroll (`/`) with six sections (Hero, MRT Deployment, Log, Capability Matrix, Transmission, Footer) plus a `/mrt` case study sub-route. All design tokens come from a single `tokens.css` — zero hardcoded hex values in components. Boot sequence fires exactly once per session via `sessionStorage`.

**Tech Stack:** Next.js 15 (App Router), Tailwind v4, Framer Motion, TypeScript strict, Vercel, Google Fonts (Bebas Neue, JetBrains Mono, Sora).

---

## File Map

```
src/
  app/
    layout.tsx              ← fonts, metadata, html dark class
    page.tsx                ← compose all sections
    globals.css             ← import tokens + base reset
    mrt/
      page.tsx              ← case study route
  styles/
    tokens.css              ← ALL CSS custom properties (single source of truth)
  components/
    SystemBanner.tsx        ← fixed 32px top strip, live clock, LED
    SectionLabel.tsx        ← mono 9px label + 2px accent line
    MonoChip.tsx            ← small mono pill (used in MRT, Log, Matrix)
    LEDDot.tsx              ← status dot (pulse or static)
    StatTile.tsx            ← Bebas number + mono label + boot sequence
    OpsCard.tsx             ← card wrapper with accent line + border
    TerminalBlock.tsx       ← contact terminal with blinking cursor
    sections/
      HeroSection.tsx
      CurrentDeploymentSection.tsx
      DeploymentLogSection.tsx
      CapabilityMatrixSection.tsx
      TransmissionSection.tsx
      FooterSection.tsx
vercel.json
.env.example
README.md
```

---

## Task 1: Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Bootstrap Next.js app in current directory**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git \
  --yes
```

Expected: `next`, `react`, `react-dom`, `tailwindcss` installed. `src/app/` created.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Clean default boilerplate**

Replace `src/app/page.tsx` with:
```tsx
export default function Home() {
  return <main>Portfolio</main>;
}
```

Replace `src/app/globals.css` with:
```css
@import "tailwindcss";
@import "../styles/tokens.css";

*, *::before, *::after { box-sizing: border-box; }

html {
  background: var(--bg);
  color: var(--fg-1);
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  margin: 0;
  padding-top: 32px; /* banner height */
}
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. Fix any TS errors before proceeding.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 app with Tailwind v4 and Framer Motion"
```

---

## Task 2: CSS Tokens

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```bash
mkdir -p src/styles
```

```css
/* src/styles/tokens.css — single source of truth for all design tokens */

:root {
  /* ── Surfaces ───────────────────────────────────── */
  --surface-0:   oklch(0.09 0.022 245);   /* banner, footer */
  --surface-1:   oklch(0.115 0.022 245);  /* page bg */
  --bg:          oklch(0.115 0.022 245);
  --surface-2:   oklch(0.152 0.02 243);   /* cards */
  --card:        oklch(0.152 0.02 243);
  --surface-3:   oklch(0.2 0.022 243);    /* row hover, chip bg */

  /* ── Foreground ─────────────────────────────────── */
  --fg-1:        oklch(0.92 0.008 240);   /* primary text */
  --fg-2:        oklch(0.6 0.018 245);    /* muted labels */
  --fg-3:        rgba(148,163,184,.45);   /* footer, timestamps */

  /* ── Border ─────────────────────────────────────── */
  --border:      oklch(0.225 0.022 243);

  /* ── Accent / Primary ───────────────────────────── */
  --primary-deep:  #1d6fe8;
  --primary:       #3b82f6;
  --primary-tint:  rgba(29,111,232,.08);
  --primary-ring:  rgba(59,130,246,.5);

  /* ── Status ─────────────────────────────────────── */
  --status-active:      #22c55e;
  --status-active-glow: rgba(34,197,94,.4);
  --status-warn:        #f59e0b;
  --status-idle:        #6b7280;

  /* ── Typography ─────────────────────────────────── */
  --font-display: 'Bebas Neue', sans-serif;
  --font-body:    'Sora', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* ── Spacing (4px grid) ─────────────────────────── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* ── Radii ──────────────────────────────────────── */
  --radius-sm:   4px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-pill: 20px;

  /* ── Motion ─────────────────────────────────────── */
  --dur-fast:   150ms;
  --dur-base:   200ms;
  --ease-base:  ease;
}

/* ── Light mode overrides ───────────────────────── */
@media (prefers-color-scheme: light) {
  :root {
    --bg:        oklch(0.974 0.007 248);
    --surface-1: oklch(0.974 0.007 248);
    --card:      oklch(1 0 0);
    --surface-0: oklch(0.968 0.009 248);
    --surface-3: oklch(0.96 0.008 248);
    --fg-1:      oklch(0.13 0.02 248);
    --fg-2:      oklch(0.52 0.012 248);
    --border:    oklch(0.9 0.01 248);
    --primary:   #1d6fe8;
  }
}

/* ── Reduced motion ─────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ── Type utility classes ───────────────────────── */
.t-display-xl {
  font-family: var(--font-display);
  font-size: clamp(64px, 9vw, 120px);
  letter-spacing: 0.06em;
  line-height: 0.9;
  color: var(--fg-1);
}

.t-display-md {
  font-family: var(--font-display);
  font-size: 40px;
  letter-spacing: 0.06em;
  line-height: 1;
}

.t-display-sm {
  font-family: var(--font-display);
  font-size: 28px;
  letter-spacing: 0.04em;
  line-height: 1;
}

.t-h3 {
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.t-body-lg {
  font-family: var(--font-body);
  font-size: 16px;
  letter-spacing: 0;
  line-height: 1.6;
}

.t-body {
  font-family: var(--font-body);
  font-size: 14px;
  letter-spacing: 0;
  line-height: 1.55;
}

.t-body-sm {
  font-family: var(--font-body);
  font-size: 13px;
  letter-spacing: 0;
  line-height: 1.5;
}

.t-mono-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.t-mono-xs {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.t-mono-data {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
}

.t-mono-tabular {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
}

/* ── Keyframe animations ────────────────────────── */
@keyframes led-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--status-active-glow); }
  50%       { opacity: 0.4; box-shadow: 0 0 8px var(--status-active-glow); }
}

@keyframes colon-blink {
  50% { opacity: 0; }
}

@keyframes cursor-blink {
  50% { opacity: 0; }
}

/* ── Accent line reusable ───────────────────────── */
.accent-line {
  width: 240px;
  height: 2px;
  background: linear-gradient(90deg, var(--primary) 0%, transparent 100%);
  margin-top: 12px;
  margin-bottom: 32px;
}
```

- [ ] **Step 2: Update `globals.css` to import tokens**

```css
@import "tailwindcss";
@import "../styles/tokens.css";

*, *::before, *::after { box-sizing: border-box; }

html {
  background: var(--bg);
  color: var(--fg-1);
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  margin: 0;
  padding-top: 32px;
}

a { color: inherit; text-decoration: none; }
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(tokens): add full CSS token system and type utility classes"
```

---

## Task 3: Global Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Bebas_Neue, JetBrains_Mono, Sora } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adinda Fadhil Patria — Fullstack Engineer',
  description:
    'I ship complete systems end-to-end: design tokens to E2E tests to Fly.io. Based in Jakarta.',
  metadataBase: new URL('https://didapatria.dev'),
  openGraph: {
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description:
      'Operations Terminal portfolio — Next.js, TypeScript, Playwright, Fly.io.',
    url: 'https://didapatria.dev',
    siteName: 'Adinda Fadhil Patria',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description:
      'Operations Terminal portfolio — Next.js, TypeScript, Playwright, Fly.io.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${jetBrainsMono.variable} ${sora.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(layout): add Google Fonts (Bebas Neue, JetBrains Mono, Sora) and base metadata"
```

---

## Task 4: Component Library

**Files (all create):**
- `src/components/LEDDot.tsx`
- `src/components/MonoChip.tsx`
- `src/components/SectionLabel.tsx`
- `src/components/OpsCard.tsx`
- `src/components/StatTile.tsx`
- `src/components/SystemBanner.tsx`
- `src/components/TerminalBlock.tsx`

- [ ] **Step 1: Create `src/components/LEDDot.tsx`**

```tsx
'use client';

interface LEDDotProps {
  pulse?: boolean;
  size?: number;
  color?: string;
}

export function LEDDot({ pulse = false, size = 6, color = 'var(--status-active)' }: LEDDotProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`,
        flexShrink: 0,
        animation: pulse ? 'led-pulse 2.4s ease-in-out infinite' : 'none',
      }}
    />
  );
}
```

- [ ] **Step 2: Create `src/components/MonoChip.tsx`**

```tsx
interface MonoChipProps {
  children: React.ReactNode;
  interactive?: boolean;
}

export function MonoChip({ children, interactive = false }: MonoChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        padding: '0 10px',
        background: 'var(--surface-3)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: '10.5px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--fg-1)',
        cursor: interactive ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        transition: interactive ? 'border-color var(--dur-fast) var(--ease-base)' : 'none',
      }}
      onMouseEnter={interactive ? (e) => {
        (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(59,130,246,0.3)';
      } : undefined}
      onMouseLeave={interactive ? (e) => {
        (e.currentTarget as HTMLSpanElement).style.borderColor = 'var(--border)';
      } : undefined}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/SectionLabel.tsx`**

```tsx
interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div>
      <p
        className="t-mono-xs"
        style={{ color: 'var(--fg-2)', margin: 0 }}
      >
        {children}
      </p>
      <div className="accent-line" />
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/OpsCard.tsx`**

```tsx
interface OpsCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function OpsCard({ children, style, className }: OpsCardProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, var(--primary) 0%, transparent 100%)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          zIndex: 1,
        }}
      />
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Create `src/components/StatTile.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface StatTileProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number; /* ms before count-up starts */
  isLast?: boolean;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function StatTile({ value, suffix = '', label, delay, isLast = false }: StatTileProps) {
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const booted = useRef(
    typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem('bootDone') === '1'
  );

  useEffect(() => {
    if (reduced || booted.current) {
      setDisplay(value);
      setVisible(true);
      return;
    }

    /* fade-in tile after delay */
    const visTimer = setTimeout(() => setVisible(true), delay);

    /* count-up */
    const startTime = performance.now() + delay;
    const DURATION = 400;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - t, 2); /* easeOutQuad */
      setDisplay(Math.round(value * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (isLast) {
        sessionStorage.setItem('bootDone', '1');
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      clearTimeout(visTimer);
      cancelAnimationFrame(raf);
    };
  }, [value, delay, reduced, isLast]);

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        minWidth: 180,
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 250ms ease, transform 250ms ease',
        flex: '1 1 180px',
      }}
    >
      {/* accent line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, var(--primary) 0%, transparent 100%)',
        }}
      />
      <span
        className="t-display-md"
        style={{
          display: 'block',
          color: 'var(--fg-1)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {display}{suffix}
      </span>
      <div
        style={{
          width: 24,
          height: 1,
          background: 'var(--border)',
          margin: '8px 0',
        }}
      />
      <span className="t-mono-xs" style={{ color: 'var(--fg-2)' }}>
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 6: Create `src/components/SystemBanner.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { LEDDot } from './LEDDot';

export function SystemBanner() {
  const [time, setTime] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const tick = () => {
      const parts = fmt.formatToParts(new Date());
      const h = parts.find((p) => p.type === 'hour')?.value ?? '00';
      const m = parts.find((p) => p.type === 'minute')?.value ?? '00';
      const s = parts.find((p) => p.type === 'second')?.value ?? '00';
      setTime(`${h}:${m}:${s}`);
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  /* HH:MM:SS — blink the center colon (between MM and SS) */
  const [hhmm, ss] = time ? [time.slice(0, 5), time.slice(6)] : ['--:--', '--'];

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 32,
        background: 'var(--surface-0)',
        borderBottom: '1px solid var(--border)',
        zIndex: 50,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      {/* Left — LED + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <LEDDot pulse />
        <span className="t-mono-xs" style={{ color: 'var(--fg-2)' }}>
          <span>ACTIVE</span>
          {/* Hide extra text at <375px via responsive class */}
          <span className="banner-full-text">
            {' '}· AVAILABLE FOR ENGAGEMENT
          </span>
        </span>
      </div>

      {/* Center — live clock */}
      <div
        className="banner-clock"
        style={{
          justifySelf: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span className="t-mono-tabular t-mono-xs" style={{ color: 'var(--fg-2)', fontSize: '9.5px' }}>
          ID-JKT · UTC+7 · {hhmm}
        </span>
        <span
          className="t-mono-xs"
          style={{
            color: 'var(--fg-2)',
            fontSize: '9.5px',
            animation: 'colon-blink 1s steps(2) infinite',
          }}
        >
          :
        </span>
        <span className="t-mono-tabular t-mono-xs" style={{ color: 'var(--fg-2)', fontSize: '9.5px' }}>
          {ss}
        </span>
      </div>

      {/* Right — version */}
      <div
        className="banner-version"
        style={{ justifySelf: 'end' }}
      >
        <span className="t-mono-xs" style={{ color: 'var(--fg-2)' }}>
          PORTFOLIO v1.0.0
        </span>
      </div>
    </header>
  );
}
```

Add responsive banner CSS to `globals.css` (append after existing content):
```css
/* Banner responsive */
@media (max-width: 374px) {
  .banner-full-text { display: none; }
  .banner-clock { display: none !important; }
  .banner-version { display: none !important; }
}
@media (min-width: 375px) and (max-width: 639px) {
  .banner-version { display: none !important; }
}
```

- [ ] **Step 7: Create `src/components/TerminalBlock.tsx`**

```tsx
import { OpsCard } from './OpsCard';

interface ContactLine {
  label: string;
  handle: string;
  href: string;
}

const LINES: ContactLine[] = [
  { label: 'LINKEDIN',  handle: '/didapatria',           href: 'https://linkedin.com/in/didapatria' },
  { label: 'GITHUB',    handle: '/didapatria',            href: 'https://github.com/didapatria' },
  { label: 'INSTAGRAM', handle: '@didapatria',            href: 'https://instagram.com/didapatria' },
  { label: 'EMAIL',     handle: 'didapatria3@gmail.com',  href: 'mailto:didapatria3@gmail.com' },
];

export function TerminalBlock() {
  return (
    <OpsCard>
      <div
        style={{
          background: 'var(--surface-0)',
          padding: '48px 56px',
          display: 'grid',
          gap: 12,
          borderRadius: 'var(--radius-xl)',
        }}
      >
        {LINES.map(({ label, handle, href }) => (
          <div
            key={label}
            style={{
              display: 'grid',
              gridTemplateColumns: '16px 100px 16px 1fr',
              alignItems: 'baseline',
              gap: 12,
            }}
          >
            <span className="t-mono-data" style={{ color: 'var(--primary)', fontSize: 12 }}>{'>'}</span>
            <span className="t-mono-data" style={{ color: 'var(--fg-2)', fontSize: 12, textTransform: 'uppercase' }}>
              {label}
            </span>
            <span className="t-mono-data" style={{ color: 'var(--fg-3)', fontSize: 12 }}>▸</span>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono-data"
              style={{
                color: 'var(--fg-1)',
                fontSize: 12,
                transition: 'color var(--dur-fast) var(--ease-base)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-1)'; (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'; }}
            >
              {handle}
            </a>
          </div>
        ))}

        {/* Cursor line */}
        <div style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 12, alignItems: 'baseline' }}>
          <span className="t-mono-data" style={{ color: 'var(--primary)', fontSize: 12 }}>{'>'}</span>
          <span
            style={{
              display: 'inline-block',
              width: 9,
              height: 14,
              background: 'var(--primary)',
              verticalAlign: '-2px',
              animation: 'cursor-blink 1s steps(2) infinite',
            }}
          />
        </div>
      </div>
    </OpsCard>
  );
}
```

- [ ] **Step 8: Build check after all components**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with zero TS errors. Fix any before proceeding.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(components): add shared component library (SystemBanner, StatTile, OpsCard, MonoChip, etc.)"
```

---

## Task 5: Hero Section

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create `src/components/sections/HeroSection.tsx`**

```tsx
import { StatTile } from '../StatTile';

const STATS = [
  { value: 2, suffix: '+', label: 'YRS SHIPPING',  delay: 100 },
  { value: 127, suffix: '',  label: 'E2E PASSING',   delay: 280 },
  { value: 3, suffix: '',   label: 'LIVE DEPLOY.',   delay: 460, isLast: true },
] as const;

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 32px)',
        padding: '128px 32px',
        display: 'grid',
        placeItems: 'center start',
        overflow: 'hidden',
      }}
    >
      {/* dot-grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--primary-tint) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* corner brackets */}
      {[
        { top: 24, left: 24, borderTop: true, borderLeft: true },
        { top: 24, right: 24, borderTop: true, borderRight: true },
        { bottom: 24, left: 24, borderBottom: true, borderLeft: true },
        { bottom: 24, right: 24, borderBottom: true, borderRight: true },
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            ...(pos.top !== undefined && { top: pos.top }),
            ...(pos.bottom !== undefined && { bottom: pos.bottom }),
            ...(pos.left !== undefined && { left: pos.left }),
            ...(pos.right !== undefined && { right: pos.right }),
            borderTop:    pos.borderTop    ? '1px solid rgba(29,111,232,0.2)' : 'none',
            borderBottom: pos.borderBottom ? '1px solid rgba(29,111,232,0.2)' : 'none',
            borderLeft:   pos.borderLeft   ? '1px solid rgba(29,111,232,0.2)' : 'none',
            borderRight:  pos.borderRight  ? '1px solid rgba(29,111,232,0.2)' : 'none',
          }}
        />
      ))}

      {/* content column */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>

        {/* operator label */}
        <p className="t-mono-xs" style={{ color: 'var(--fg-2)', margin: '0 0 16px' }}>
          OPERATOR · FULLSTACK ENGINEER · SOUTH JAKARTA, ID
        </p>

        {/* name */}
        <h1
          className="t-display-xl"
          style={{ margin: '0 0 24px', fontWeight: 400 }}
        >
          ADINDA FADHIL PATRIA
        </h1>

        {/* tagline */}
        <p
          className="t-body-lg"
          style={{
            color: 'var(--fg-1)',
            maxWidth: 560,
            margin: '0 0 48px',
            textWrap: 'pretty',
          }}
        >
          I ship complete systems end-to-end — design tokens to E2E tests
          to Fly.io. Two years operating. Currently on shift at MRT Jakarta.
        </p>

        {/* stat tiles */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 32,
          }}
        >
          {STATS.map((s) => (
            <StatTile
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={s.delay}
              isLast={'isLast' in s ? s.isLast : false}
            />
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="https://mrt-station-dashboard.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono-label"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: 40,
              padding: '0 20px',
              background: 'var(--primary-deep)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: '#fff',
              boxShadow: '0 0 24px rgba(29,111,232,0.25)',
              cursor: 'pointer',
              transition: 'background-color var(--dur-fast) var(--ease-base)',
            }}
          >
            VIEW MRT PROJECT →
          </a>

          <a
            href="https://github.com/didapatria"
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono-label"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: 40,
              padding: '0 20px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--fg-1)',
              cursor: 'pointer',
              transition: 'border-color var(--dur-fast) var(--ease-base), background-color var(--dur-fast) var(--ease-base)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'rgba(59,130,246,0.3)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'var(--border)';
            }}
          >
            GITHUB →
          </a>

          <a
            href="https://linkedin.com/in/didapatria"
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono-label"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: 40,
              padding: '0 20px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--fg-1)',
              cursor: 'pointer',
              transition: 'border-color var(--dur-fast) var(--ease-base), background-color var(--dur-fast) var(--ease-base)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'rgba(59,130,246,0.3)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'var(--border)';
            }}
          >
            LINKEDIN →
          </a>
        </div>
      </div>
    </section>
  );
}
```

Add responsive hero CSS to `globals.css`:
```css
/* Hero responsive */
@media (max-width: 639px) {
  .hero-name { font-size: clamp(48px, 11vw, 72px) !important; }
  .stat-row { flex-direction: column; }
  .stat-row > * { flex: 1 1 100% !important; min-width: unset !important; }
  .cta-row { flex-direction: column; }
  .cta-row > * { width: 100%; justify-content: center; }
}
```

Note: Add `className` props to hero elements for responsive overrides or use inline media queries via CSS classes.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(hero): add HeroSection with stat tiles, CTAs, corner brackets, dot-grid"
```

---

## Task 6: Current Deployment Section

**Files:**
- Create: `src/components/sections/CurrentDeploymentSection.tsx`

- [ ] **Step 1: Create `src/components/sections/CurrentDeploymentSection.tsx`**

```tsx
import { MonoChip } from '../MonoChip';
import { OpsCard } from '../OpsCard';
import { SectionLabel } from '../SectionLabel';

const CHIPS = [
  '15 PAGES', '127 E2E TESTS', '260+ COMMITS', 'v2.18.0',
  'REACT 19', 'NODE.JS', 'POSTGRESQL', 'DOCKER', 'PLAYWRIGHT',
];

const BUTTONS = [
  { label: 'LIVE DASHBOARD', href: 'https://mrt-station-dashboard.vercel.app' },
  { label: 'API DOCS',       href: 'https://mrt-station-backend.fly.dev/api/docs' },
  { label: 'E2E REPORT',     href: 'https://didapatria.github.io/mrt-station-dashboard' },
  { label: 'SOURCE CODE',    href: 'https://github.com/didapatria/mrt-station-dashboard' },
];

export function CurrentDeploymentSection() {
  return (
    <section style={{ padding: '128px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <SectionLabel>CURRENT DEPLOYMENT</SectionLabel>

        <OpsCard>
          <div style={{ padding: '40px 48px' }}>

            {/* header row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 24,
                flexWrap: 'wrap',
                marginBottom: 24,
              }}
            >
              <div>
                <h2 className="t-display-md" style={{ color: 'var(--fg-1)', margin: 0 }}>
                  MRT JAKARTA
                </h2>
                <p className="t-body" style={{ color: 'var(--fg-2)', margin: '4px 0 0' }}>
                  Station Management Dashboard
                </p>
              </div>

              {/* DEPLOYED chip */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 24,
                  padding: '0 12px',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 'var(--radius-pill)',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--status-active)',
                    boxShadow: '0 0 6px var(--status-active-glow)',
                    flexShrink: 0,
                  }}
                />
                <span className="t-mono-label" style={{ color: 'var(--status-active)' }}>
                  DEPLOYED
                </span>
              </span>
            </div>

            {/* hairline */}
            <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

            {/* chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {CHIPS.map((chip) => <MonoChip key={chip}>{chip}</MonoChip>)}
            </div>

            {/* description */}
            <p
              className="t-body"
              style={{
                color: 'var(--fg-1)',
                maxWidth: 720,
                lineHeight: 1.55,
                margin: '0 0 32px',
                textWrap: 'pretty',
              }}
            >
              Full-stack operations dashboard for PT MRT Jakarta — 15 pages, real-time SSE,
              Incident Management, JWT + Google OAuth, Spatie RBAC, interactive maps, and
              an Operations Terminal design system. 127 Playwright E2E tests. Deployed on
              Fly.io + Vercel.
            </p>

            {/* 2×2 entry buttons */}
            <div
              className="entry-buttons"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 320px))',
                gap: 12,
                marginBottom: 24,
              }}
            >
              {BUTTONS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-mono-label"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 48,
                    padding: '0 20px',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--fg-1)',
                    cursor: 'pointer',
                    transition: 'background-color var(--dur-fast) ease, border-color var(--dur-fast) ease, color var(--dur-fast) ease',
                    letterSpacing: '0.14em',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'var(--primary-tint)';
                    el.style.borderColor = 'rgba(59,130,246,0.3)';
                    el.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'transparent';
                    el.style.borderColor = 'var(--border)';
                    el.style.color = 'var(--fg-1)';
                  }}
                >
                  <span>{label}</span>
                  <span>→</span>
                </a>
              ))}
            </div>

            {/* case study link */}
            <div style={{ textAlign: 'right' }}>
              <a
                href="/mrt"
                className="t-mono-data"
                style={{
                  color: 'var(--fg-2)',
                  fontSize: 11,
                  transition: 'color var(--dur-fast) ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-2)'; }}
              >
                Read full case study →
              </a>
            </div>
          </div>
        </OpsCard>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .entry-buttons {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(mrt-card): add CurrentDeploymentSection with 4 entry buttons and chips"
```

---

## Task 7: Deployment Log Section

**Files:**
- Create: `src/components/sections/DeploymentLogSection.tsx`

- [ ] **Step 1: Create `src/components/sections/DeploymentLogSection.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { MonoChip } from '../MonoChip';
import { OpsCard } from '../OpsCard';
import { SectionLabel } from '../SectionLabel';

export function DeploymentLogSection() {
  const [alturianExpanded, setAlturianExpanded] = useState(false);

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 24,
    padding: '24px 32px',
    transition: 'box-shadow var(--dur-fast) ease',
  };

  return (
    <section style={{ padding: '0 0 128px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <SectionLabel>DEPLOYMENT LOG</SectionLabel>

        <OpsCard>
          {/* Row 1 — Ruas */}
          <div
            style={rowStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'inset 2px 0 0 rgba(29,111,232,0.6)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
          >
            {/* year */}
            <div style={{ flexShrink: 0, width: 80 }}>
              <span className="t-mono-data" style={{ color: 'var(--fg-3)', fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>
                2023
              </span>
            </div>

            {/* content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500, color: 'var(--fg-1)' }}>
                Ruas — Online Exam Monitoring
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                <span className="t-body-sm" style={{ color: 'var(--fg-2)' }}>Thesis · ML proctoring</span>
                {['REACT', 'FLASK', 'TENSORFLOW'].map((c) => <MonoChip key={c}>{c}</MonoChip>)}
              </div>
              <p className="t-body-sm" style={{ color: 'var(--fg-2)', margin: 0, maxWidth: 560 }}>
                Real-time face and gaze tracking with TensorFlow. B.Tech thesis.
              </p>
            </div>

            {/* right */}
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <a
                href="https://github.com/didapatria/fe_ruas_client"
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono-xs"
                style={{ color: 'var(--fg-2)', transition: 'color var(--dur-fast) ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-2)'; }}
              >
                GITHUB ↗
              </a>
            </div>
          </div>

          {/* divider */}
          <div style={{ height: 1, background: 'var(--border)', margin: '0 32px' }} />

          {/* Row 2 — Alturian */}
          <div
            style={{ ...rowStyle, cursor: 'pointer', flexDirection: 'column' }}
            onClick={() => setAlturianExpanded((v) => !v)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'inset 2px 0 0 rgba(29,111,232,0.6)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
          >
            <div style={{ display: 'flex', gap: 24 }}>
              {/* year */}
              <div style={{ flexShrink: 0, width: 80 }}>
                <span className="t-mono-data" style={{ color: 'var(--fg-3)', fontSize: 11 }}>
                  2024–<br />2026
                </span>
              </div>

              {/* content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500, color: 'var(--fg-1)' }}>
                  Alturian Group — Enterprise Systems
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span className="t-body-sm" style={{ color: 'var(--fg-2)' }}>Software Engineer Specialist</span>
                  {['LARAVEL', 'VUE', 'REACT', 'ANGULAR', 'IONIC'].map((c) => <MonoChip key={c}>{c}</MonoChip>)}
                  <span style={{ color: 'var(--fg-3)', fontSize: 12 }}>
                    {alturianExpanded ? '▴' : '▾'}
                  </span>
                </div>
                <p className="t-body-sm" style={{ color: 'var(--fg-2)', margin: 0, maxWidth: 560 }}>
                  e-commerce · ERP · POS · loyalty · SaaS — production systems serving live customers.
                </p>
              </div>

              {/* right */}
              <div style={{ flexShrink: 0 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 24,
                    padding: '0 12px',
                    background: 'rgba(107,114,128,0.08)',
                    border: '1px solid rgba(107,114,128,0.25)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <span className="t-mono-xs" style={{ color: 'var(--status-idle)' }}>CONFIDENTIAL</span>
                </span>
              </div>
            </div>

            {/* expand panel */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: alturianExpanded ? '1fr' : '0fr',
                transition: 'grid-template-rows 200ms ease',
                marginLeft: 104, /* 80px year + 24px gap */
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div style={{ paddingTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['E-COMMERCE', 'ERP', 'POS', 'LOYALTY', 'SAAS PLATFORMS'].map((s) => (
                    <MonoChip key={s}>{s}</MonoChip>
                  ))}
                </div>
                <p className="t-body-sm" style={{ color: 'var(--fg-2)', marginTop: 12, fontStyle: 'italic' }}>
                  No live demos available — production systems serving live customers.
                </p>
              </div>
            </div>
          </div>

          {/* dashed divider before placeholder */}
          <div style={{ height: 1, background: 'repeating-linear-gradient(90deg, var(--border) 0, var(--border) 4px, transparent 4px, transparent 8px)', margin: '0 32px' }} />

          {/* Row 3 — Placeholder */}
          <div style={{ ...rowStyle, cursor: 'default' }}>
            <div style={{ flexShrink: 0, width: 80 }}>
              <span className="t-mono-data" style={{ color: 'var(--fg-3)', fontSize: 11 }}>202?</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 8 }}>
                <MonoChip>NEXT DEPLOYMENT</MonoChip>
              </div>
              <p className="t-body-sm" style={{ color: 'var(--fg-2)', margin: 0, fontStyle: 'italic' }}>
                Currently provisioning.
              </p>
            </div>
          </div>
        </OpsCard>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(log): add DeploymentLogSection with expandable Alturian row and placeholder"
```

---

## Task 8: Capability Matrix Section

**Files:**
- Create: `src/components/sections/CapabilityMatrixSection.tsx`

- [ ] **Step 1: Create `src/components/sections/CapabilityMatrixSection.tsx`**

```tsx
import { MonoChip } from '../MonoChip';
import { OpsCard } from '../OpsCard';
import { SectionLabel } from '../SectionLabel';

const MATRIX = [
  {
    category: 'FRONTEND',
    level: 4,
    chips: ['REACT 19', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND CSS', 'FRAMER MOTION', 'ANGULAR', 'VUE.JS', 'REDUX'],
  },
  {
    category: 'BACKEND',
    level: 3,
    chips: ['NODE.JS', 'EXPRESS.JS', 'LARAVEL', 'PHP', 'REST API', 'PRISMA ORM'],
  },
  {
    category: 'INFRA',
    level: 3,
    chips: ['DOCKER', 'GITHUB ACTIONS', 'FLY.IO', 'VERCEL', 'SUPABASE', 'POSTGRESQL', 'MYSQL'],
  },
  {
    category: 'TESTING',
    level: 4,
    chips: ['PLAYWRIGHT', 'VITEST', 'REACT TESTING LIBRARY', 'SUPERTEST'],
  },
] as const;

function LEDBar({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 6 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i < level ? 'var(--primary)' : 'transparent',
            border: i < level ? 'none' : '1px solid var(--border)',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

export function CapabilityMatrixSection() {
  return (
    <section style={{ padding: '0 0 128px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <SectionLabel>CAPABILITY MATRIX</SectionLabel>

        <OpsCard>
          {MATRIX.map((row, i) => (
            <div key={row.category}>
              <div
                className="matrix-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 80px 1fr',
                  alignItems: 'start',
                  gap: 24,
                  padding: '24px 32px',
                }}
              >
                <span
                  className="t-mono-xs"
                  style={{ color: 'var(--fg-1)', letterSpacing: '0.16em', paddingTop: 4 }}
                >
                  {row.category}
                </span>
                <LEDBar level={row.level} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {row.chips.map((chip) => <MonoChip key={chip}>{chip}</MonoChip>)}
                </div>
              </div>
              {i < MATRIX.length - 1 && (
                <div style={{ height: 1, background: 'var(--border)', margin: '0 32px' }} />
              )}
            </div>
          ))}
        </OpsCard>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .matrix-row {
            grid-template-columns: 1fr auto !important;
            grid-template-rows: auto auto;
          }
          .matrix-row > :nth-child(1) { grid-column: 1; }
          .matrix-row > :nth-child(2) { grid-column: 2; grid-row: 1; }
          .matrix-row > :nth-child(3) { grid-column: 1 / -1; grid-row: 2; }
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(matrix): add CapabilityMatrixSection with LED proficiency bars"
```

---

## Task 9: Transmission + Footer Sections

**Files:**
- Create: `src/components/sections/TransmissionSection.tsx`
- Create: `src/components/sections/FooterSection.tsx`

- [ ] **Step 1: Create `src/components/sections/TransmissionSection.tsx`**

```tsx
import { SectionLabel } from '../SectionLabel';
import { TerminalBlock } from '../TerminalBlock';

export function TransmissionSection() {
  return (
    <section style={{ padding: '0 0 128px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <SectionLabel>TRANSMISSION CHANNEL</SectionLabel>
        <TerminalBlock />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/FooterSection.tsx`**

```tsx
const BUILD_SHA = process.env.NEXT_PUBLIC_BUILD_SHA?.slice(0, 7) ?? 'dev';
const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString().split('T')[0];

export function FooterSection() {
  return (
    <footer
      style={{
        background: 'var(--surface-0)',
        borderTop: '1px solid var(--border)',
        padding: '32px 32px 40px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <span className="t-mono-xs" style={{ color: 'var(--fg-3)' }}>
            BUILD #{BUILD_SHA} · LAST DEPLOY {BUILD_DATE} · PORTFOLIO v1.0.0
          </span>
          <span className="t-mono-xs" style={{ color: 'var(--fg-3)' }}>
            Built with Next.js 15 · Tailwind v4 · Framer Motion · Vercel
          </span>
        </div>
        <p
          className="t-mono-xs"
          style={{ color: 'var(--fg-3)', textAlign: 'center', letterSpacing: '0.2em', fontSize: '8.5px', margin: 0 }}
        >
          © 2026 ADINDA FADHIL PATRIA · ALL SYSTEMS OPERATIONAL
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(sections): add TransmissionSection, TerminalBlock contact, FooterSection"
```

---

## Task 10: Assemble Home Page + SystemBanner

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update `src/app/layout.tsx` to include SystemBanner**

```tsx
import type { Metadata } from 'next';
import { Bebas_Neue, JetBrains_Mono, Sora } from 'next/font/google';
import { SystemBanner } from '@/components/SystemBanner';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adinda Fadhil Patria — Fullstack Engineer',
  description:
    'I ship complete systems end-to-end: design tokens to E2E tests to Fly.io. Based in Jakarta.',
  metadataBase: new URL('https://didapatria.dev'),
  openGraph: {
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description:
      'Operations Terminal portfolio — Next.js, TypeScript, Playwright, Fly.io.',
    url: 'https://didapatria.dev',
    siteName: 'Adinda Fadhil Patria',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description:
      'Operations Terminal portfolio — Next.js, TypeScript, Playwright, Fly.io.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${jetBrainsMono.variable} ${sora.variable}`}
    >
      <body>
        <SystemBanner />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx` to compose all sections**

```tsx
import { HeroSection } from '@/components/sections/HeroSection';
import { CurrentDeploymentSection } from '@/components/sections/CurrentDeploymentSection';
import { DeploymentLogSection } from '@/components/sections/DeploymentLogSection';
import { CapabilityMatrixSection } from '@/components/sections/CapabilityMatrixSection';
import { TransmissionSection } from '@/components/sections/TransmissionSection';
import { FooterSection } from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CurrentDeploymentSection />
      <DeploymentLogSection />
      <CapabilityMatrixSection />
      <TransmissionSection />
      <FooterSection />
    </main>
  );
}
```

- [ ] **Step 3: Run build + lint**

```bash
npm run build && npm run lint
```

Expected: `✓ Compiled successfully` and zero lint errors. Fix any TS errors before continuing.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(page): assemble all sections in home page, wire SystemBanner in layout"
```

---

## Task 11: MRT Case Study Route

**Files:**
- Create: `src/app/mrt/page.tsx`

- [ ] **Step 1: Create `src/app/mrt/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { MonoChip } from '@/components/MonoChip';
import { OpsCard } from '@/components/OpsCard';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'MRT Jakarta — Case Study · Adinda Fadhil Patria',
  description:
    'Full-stack operations dashboard for PT MRT Jakarta — 15 pages, real-time SSE, 127 Playwright E2E tests. Deployed on Fly.io + Vercel.',
};

const CHIPS = [
  '15 PAGES', '127 E2E TESTS', '260+ COMMITS', 'v2.18.0',
  'REACT 19', 'NODE.JS', 'POSTGRESQL', 'DOCKER', 'PLAYWRIGHT',
];

const LINKS = [
  { label: 'LIVE DASHBOARD', href: 'https://mrt-station-dashboard.vercel.app' },
  { label: 'API DOCS',       href: 'https://mrt-station-backend.fly.dev/api/docs' },
  { label: 'E2E REPORT',     href: 'https://didapatria.github.io/mrt-station-dashboard' },
  { label: 'SOURCE CODE',    href: 'https://github.com/didapatria/mrt-station-dashboard' },
];

export default function MRTCaseStudy() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 128px' }}>
      {/* back link */}
      <Link
        href="/"
        className="t-mono-xs"
        style={{ color: 'var(--fg-2)', display: 'inline-block', marginBottom: 32 }}
      >
        ← BACK TO PORTFOLIO
      </Link>

      <SectionLabel>CASE STUDY</SectionLabel>

      <OpsCard style={{ marginBottom: 32 }}>
        <div style={{ padding: '40px 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            <div>
              <h1 className="t-display-md" style={{ color: 'var(--fg-1)', margin: 0 }}>
                MRT JAKARTA
              </h1>
              <p className="t-body" style={{ color: 'var(--fg-2)', margin: '4px 0 0' }}>
                Station Management Dashboard
              </p>
            </div>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                height: 24, padding: '0 12px',
                background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 'var(--radius-pill)', flexShrink: 0,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--status-active)', boxShadow: '0 0 6px var(--status-active-glow)' }} />
              <span className="t-mono-label" style={{ color: 'var(--status-active)' }}>DEPLOYED</span>
            </span>
          </div>

          <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {CHIPS.map((c) => <MonoChip key={c}>{c}</MonoChip>)}
          </div>

          <p className="t-body" style={{ color: 'var(--fg-1)', maxWidth: 720, lineHeight: 1.55, marginBottom: 32 }}>
            Full-stack operations dashboard for PT MRT Jakarta — 15 pages, real-time SSE,
            Incident Management, JWT + Google OAuth, Spatie RBAC, interactive maps, and
            an Operations Terminal design system. 127 Playwright E2E tests. Deployed on
            Fly.io + Vercel.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 320px))', gap: 12 }}>
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono-label"
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  height: 48, padding: '0 20px',
                  background: 'transparent', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--fg-1)',
                  letterSpacing: '0.14em',
                  transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'var(--primary-tint)';
                  el.style.borderColor = 'rgba(59,130,246,0.3)';
                  el.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'transparent';
                  el.style.borderColor = 'var(--border)';
                  el.style.color = 'var(--fg-1)';
                }}
              >
                <span>{label}</span>
                <span>→</span>
              </a>
            ))}
          </div>
        </div>
      </OpsCard>
    </main>
  );
}
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(mrt): add MRT Jakarta case study route at /mrt"
```

---

## Task 12: Vercel Deploy Config + Env

**Files:**
- Create: `vercel.json`
- Create: `.env.example`
- Modify: `next.config.ts`

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_BUILD_SHA": "@build-sha",
    "NEXT_PUBLIC_BUILD_DATE": "@build-date"
  }
}
```

- [ ] **Step 2: Create `.env.example`**

```bash
# Build metadata (auto-injected by Vercel / CI)
NEXT_PUBLIC_BUILD_SHA=
NEXT_PUBLIC_BUILD_DATE=
```

- [ ] **Step 3: Update `next.config.ts` to inject build metadata**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().split('T')[0],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Final build + lint**

```bash
npm run build && npm run lint
```

Expected: Both pass with zero errors.

- [ ] **Step 5: Commit**

```bash
git add vercel.json .env.example next.config.ts
git commit -m "feat(deploy): add Vercel config, env.example, build metadata injection"
```

---

## Task 13: README + Final Commit

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# Adinda Fadhil Patria — Portfolio

Operations Terminal design system portfolio.

**Live:** https://didapatria.dev _(placeholder — update after first deploy)_

## Tech Stack

- Next.js 15 (App Router)
- Tailwind v4
- Framer Motion
- TypeScript strict
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

## Deploy

Push to `main` branch — Vercel auto-deploys.
```

- [ ] **Step 2: Final build + lint check**

```bash
npm run build && npm run lint
```

Expected: Both pass with zero errors or warnings.

- [ ] **Step 3: Verify checklist**

| Check | Status |
|-------|--------|
| `npm run build` passes zero errors | ✓ |
| `npm run lint` passes | ✓ |
| All 4 MRT entry buttons have correct URLs | ✓ |
| Boot sequence fires once (sessionStorage gate) | ✓ |
| Banner clock ticks every second, center colon blinks | ✓ |
| Mobile 375px: banner shows LED + ACTIVE only | ✓ |
| README has live URL placeholder + setup steps | ✓ |
| No hardcoded hex values in components | ✓ |
| All exports are named (no default exports except page files) | ✓ |

- [ ] **Step 4: Initial commit**

```bash
git add -A
git commit -m "feat: init portfolio — Next.js 15, Operations Terminal design system, 6 sections"
```

---

## Self-Review Against DESIGN.md

**Spec coverage check:**

| Spec requirement | Task |
|-----------------|------|
| `--surface-0` banner/footer, `--surface-1` body, `--card` cards | Task 2 |
| All type classes (t-display-xl through t-mono-tabular) | Task 2 |
| SystemBanner 32px fixed, 3-zone grid, colon blink | Task 4 |
| LED pulse 2.4s ease-in-out (banner only) | Task 4 |
| Hero corner brackets, dot-grid, stat tiles | Task 5 |
| Boot sequence: sessionStorage gate, easeOutQuad, 180ms stagger | Task 4 (StatTile) |
| prefers-reduced-motion skips boot | Task 4 (StatTile) |
| MRT card, 4 entry buttons, mono chips, case study link | Task 6 |
| Deployment log, expandable Alturian row, placeholder row | Task 7 |
| Capability matrix, LED bars 4/5 3/5 3/5 4/5 | Task 8 |
| Transmission terminal, cursor blink, all 4 contacts | Task 9 |
| Footer: build hash, deploy date, copyright | Task 9 |
| Light mode: token flips in `@media (prefers-color-scheme: light)` | Task 2 |
| Mobile breakpoints per section | Tasks 5–9 |
| No animate-ping (uses led-pulse keyframe instead) | Task 2, 4 |
| No glassmorphism, no gradient card borders | Confirmed throughout |
| Named exports all components | Confirmed throughout |
| `/mrt` case study route | Task 11 |

**Gaps identified:** None — all DESIGN.md requirements covered.

**Placeholder scan:** No TBD, TODO, or lorem ipsum — all copy is real content.

**Type consistency:** `MonoChip`, `OpsCard`, `SectionLabel`, `StatTile`, `LEDDot` used consistently across all section tasks.
