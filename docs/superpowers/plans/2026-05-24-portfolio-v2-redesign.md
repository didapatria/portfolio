# Portfolio v2 — Refined Minimal Dark Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full portfolio rebuild — scrap Operations Terminal, ship Refined Minimal Dark (zinc palette, Geist fonts, multi-page `/` `/about` `/projects` `/mrt`, Navbar replacing SystemBanner).

**Architecture:** Token-only CSS system (`tokens.css`) feeds all CSS vars. Geist + Geist Mono via `next/font/google` as `--font-sans` / `--font-mono`. Each page is a Server Component; interactive sub-components are `'use client'`. No test suite — `npm run build` is the verification gate after each task.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind v4, Framer Motion, lucide-react, next/font/google (Geist + Geist Mono), Vercel

---

## File Map

**Delete entirely:**
- `src/components/SystemBanner.tsx`
- `src/components/LEDDot.tsx`
- `src/components/OpsCard.tsx`
- `src/components/SectionLabel.tsx`
- `src/components/TerminalBlock.tsx`
- `src/components/sections/` (full directory)

**Rewrite (keep filename):**
- `src/styles/tokens.css` — new zinc palette + type classes
- `src/app/globals.css` — trim to reset + responsive utilities
- `src/app/layout.tsx` — Geist fonts, Navbar replaces SystemBanner
- `src/components/MonoChip.tsx` — reskin to Geist
- `src/components/StatTile.tsx` — reskin, keep count-up logic
- `src/app/page.tsx` — two-column hero
- `src/app/mrt/page.tsx` — 6-section case study

**Keep unchanged:**
- `src/components/ThemeToggle.tsx`
- `src/components/PageTransition.tsx`
- `src/components/ScrollToTop.tsx`

**Create new:**
- `src/components/Navbar.tsx`
- `src/components/MobileMenu.tsx`
- `src/components/StatusBadge.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/TimelineItem.tsx`
- `src/components/SkillGrid.tsx`
- `src/components/CertAccordion.tsx`
- `src/app/about/page.tsx`
- `src/app/projects/page.tsx`

---

## Task 1: Cleanup

**Files:** Delete 5 components + sections dir; stub `page.tsx` + `layout.tsx`

- [ ] **Delete old components**

```bash
rm src/components/SystemBanner.tsx
rm src/components/LEDDot.tsx
rm src/components/OpsCard.tsx
rm src/components/SectionLabel.tsx
rm src/components/TerminalBlock.tsx
rm -rf src/components/sections/
```

- [ ] **Stub `src/app/page.tsx`** so the app compiles without old imports

```tsx
export default function HomePage() {
  return <main style={{ padding: '80px 24px' }}><p>Rebuilding…</p></main>;
}
```

- [ ] **Stub `src/app/mrt/page.tsx`**

```tsx
export default function MRTPage() {
  return <main style={{ padding: '80px 24px' }}><p>Coming soon.</p></main>;
}
```

- [ ] **Strip `src/app/layout.tsx`** to bare minimum (remove SystemBanner import, keep PageTransition + ScrollToTop)

```tsx
import type { Metadata } from 'next';
import { Bebas_Neue, JetBrains_Mono, Sora } from 'next/font/google';
import { PageTransition } from '@/components/PageTransition';
import { ScrollToTop } from '@/components/ScrollToTop';
import './globals.css';

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: 'Adinda Fadhil Patria — Fullstack Engineer',
  description: 'I ship complete systems end-to-end: design tokens to E2E tests to Fly.io. Based in Jakarta.',
  metadataBase: new URL('https://didapatria.dev'),
};

const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=document.documentElement;if(s==='light'){d.classList.add('light');d.classList.remove('dark');}else if(s==='dark'){d.classList.add('dark');d.classList.remove('light');}else{var sys=window.matchMedia('(prefers-color-scheme: light)').matches;if(sys)d.classList.add('light');else d.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${jetBrainsMono.variable} ${sora.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <PageTransition>{children}</PageTransition>
        <ScrollToTop />
      </body>
    </html>
  );
}
```

- [ ] **Verify build compiles**

```bash
npm run build
```

Expected: clean build, 2 routes (/ and /mrt).

- [ ] **Commit**

```bash
git add -A
git commit -m "chore: cleanup old Operations Terminal components + token file"
```

---

## Task 2: Tokens

**Files:** Rewrite `src/styles/tokens.css`

- [ ] **Write new `src/styles/tokens.css`**

```css
/* ── DARK (default) ───────────────────────────── */
:root {
  --bg:            #09090b;
  --card:          #111113;
  --surface-0:     #0d0d0f;
  --border:        #27272a;
  --border-subtle: #1f1f23;
  --fg-1:          #fafafa;
  --fg-2:          #a1a1aa;
  --fg-3:          #71717a;
  --fg-4:          #3f3f46;
  --primary:       #3b82f6;
  --primary-tint:  rgba(59,130,246,0.08);
  --green:         #22c55e;
  --amber:         #f59e0b;
  --red:           #ef4444;

  --font-sans: 'Geist', sans-serif;
  --font-mono: 'Geist Mono', monospace;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  --dur-fast: 120ms;
  --dur-base: 200ms;
}

/* ── LIGHT (html.light) ──────────────────────── */
html.light {
  --bg:            #ffffff;
  --card:          #f4f4f5;
  --surface-0:     #fafafa;
  --border:        #e4e4e7;
  --border-subtle: #f0f0f0;
  --fg-1:          #09090b;
  --fg-2:          #3f3f46;
  --fg-3:          #71717a;
  --fg-4:          #a1a1aa;
  --primary:       #2563eb;
  --primary-tint:  rgba(37,99,235,0.06);
}

/* ── TYPE CLASSES ────────────────────────────── */
.t-display {
  font-family: var(--font-sans);
  font-size: clamp(40px, 5.5vw, 64px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
}
.t-heading {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.t-subheading {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.t-body-lg {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
}
.t-body {
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.6;
}
.t-body-sm {
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.5;
}
.t-mono {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
}
.t-mono-sm {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ── NAVBAR RESPONSIVE ───────────────────────── */
.nav-desktop { display: flex; }
.nav-hamburger { display: none !important; }

@media (max-width: 768px) {
  .nav-desktop  { display: none !important; }
  .nav-hamburger { display: flex !important; }
}

/* ── CERT ACCORDION ──────────────────────────── */
.cert-list {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-base) ease;
}
.cert-list.open { grid-template-rows: 1fr; }
.cert-list-inner { overflow: hidden; }

/* ── SCROLL TO TOP ───────────────────────────── */
.scroll-top-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  background: var(--surface-0);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-3);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: opacity var(--dur-base) ease, transform var(--dur-base) ease,
    border-color var(--dur-fast) ease, color var(--dur-fast) ease;
}
.scroll-top-btn.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
.scroll-top-btn:hover { border-color: rgba(37,99,235,0.4); color: var(--primary); }

/* ── RESPONSIVE GRIDS ────────────────────────── */
@media (max-width: 768px) {
  .hero-grid       { grid-template-columns: 1fr !important; }
  .about-grid      { grid-template-columns: 1fr !important; }
  .projects-two-up { grid-template-columns: 1fr !important; }
  .mrt-entry-btns  { grid-template-columns: 1fr 1fr !important; }
}
```

- [ ] **Update `src/app/globals.css`** — trim to reset + body only (remove all old component classes)

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
  font-family: var(--font-sans);
  margin: 0;
  padding-top: 48px; /* navbar height */
}

a { color: inherit; text-decoration: none; }
```

- [ ] **Commit**

```bash
git add src/styles/tokens.css src/app/globals.css
git commit -m "feat(tokens): Refined Minimal Dark palette — zinc + blue, light/dark vars"
```

---

## Task 3: Fonts

**Files:** Modify `src/app/layout.tsx`

- [ ] **Replace font imports in `src/app/layout.tsx`** — swap Bebas/Sora/JetBrains for Geist

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { PageTransition } from '@/components/PageTransition';
import { ScrollToTop } from '@/components/ScrollToTop';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adinda Fadhil Patria — Fullstack Engineer',
  description: 'I ship complete systems end-to-end: design tokens to E2E tests to Fly.io. Based in Jakarta.',
  metadataBase: new URL('https://didapatria.dev'),
  openGraph: {
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description: 'Portfolio — Next.js, TypeScript, Playwright, Fly.io.',
    url: 'https://didapatria.dev',
    siteName: 'Adinda Fadhil Patria',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description: 'Portfolio — Next.js, TypeScript, Playwright, Fly.io.',
  },
  icons: {
    icon: '/didapatria.svg',
    shortcut: '/didapatria.svg',
  },
};

const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=document.documentElement;if(s==='light'){d.classList.add('light');d.classList.remove('dark');}else if(s==='dark'){d.classList.add('dark');d.classList.remove('light');}else{var sys=window.matchMedia('(prefers-color-scheme: light)').matches;if(sys)d.classList.add('light');else d.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <PageTransition>{children}</PageTransition>
        <ScrollToTop />
      </body>
    </html>
  );
}
```

- [ ] **Build verify**

```bash
npm run build
```

Expected: clean build. If `Geist` / `Geist_Mono` are not found in `next/font/google` types, run `npm install geist` and change imports to:
```tsx
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
// then use GeistSans.variable and GeistMono.variable on <html>
// and set --font-sans / --font-mono to the actual font-family values
```

- [ ] **Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(fonts): replace Bebas Neue/Sora/JetBrains with Geist + Geist Mono"
```

---

## Task 4: Navbar + MobileMenu

**Files:**
- Create `src/components/Navbar.tsx`
- Create `src/components/MobileMenu.tsx`
- Modify `src/app/layout.tsx` — add `<Navbar />`

- [ ] **Create `src/components/Navbar.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

const LINKS = [
  { label: 'Work',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 48,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 14,
            color: 'var(--fg-1)',
            letterSpacing: '-0.01em',
            marginRight: 'auto',
          }}
        >
          AFP
        </Link>

        {/* Desktop */}
        <nav
          className="nav-desktop"
          style={{ alignItems: 'center', gap: 24 }}
        >
          {LINKS.map(({ label, href }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: active ? 'var(--fg-1)' : 'var(--fg-3)',
                  transition: 'color 150ms ease',
                }}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 18,
                height: 1.5,
                background: 'var(--fg-3)',
                borderRadius: 1,
              }}
            />
          ))}
        </button>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} currentPath={pathname} />
    </>
  );
}
```

- [ ] **Create `src/components/MobileMenu.tsx`**

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { label: 'Work',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
] as const;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileMenu({ open, onClose, currentPath }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#09090b',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            padding: '0 24px 40px',
          }}
        >
          {/* Top bar mirrors Navbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
            <Link
              href="/"
              onClick={onClose}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: 'var(--fg-1)' }}
            >
              AFP
            </Link>
            <button
              onClick={onClose}
              aria-label="Close navigation"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--fg-3)',
                fontSize: 18,
                padding: 4,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 40, flex: 1 }}>
            {LINKS.map(({ label, href }) => {
              const active = href === '/' ? currentPath === '/' : currentPath.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 28,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: active ? 'var(--fg-1)' : 'var(--fg-4)',
                    padding: '10px 0',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.08em' }}>
              THEME
            </span>
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Add `<Navbar />` to `src/app/layout.tsx`** — insert before `<PageTransition>`

```tsx
// add to imports
import { Navbar } from '@/components/Navbar';

// update body:
<body>
  <Navbar />
  <PageTransition>{children}</PageTransition>
  <ScrollToTop />
</body>
```

- [ ] **Build verify**

```bash
npm run build
```

- [ ] **Commit**

```bash
git add src/components/Navbar.tsx src/components/MobileMenu.tsx src/app/layout.tsx
git commit -m "feat(navbar): fixed 48px nav with mobile hamburger overlay"
```

---

## Task 5: Shared Components

**Files:**
- Rewrite `src/components/MonoChip.tsx`
- Rewrite `src/components/StatTile.tsx`
- Create `src/components/StatusBadge.tsx`
- Create `src/components/ProjectCard.tsx`
- Create `src/components/TimelineItem.tsx`
- Create `src/components/SkillGrid.tsx`
- Create `src/components/CertAccordion.tsx`

- [ ] **Rewrite `src/components/MonoChip.tsx`**

```tsx
interface MonoChipProps {
  children: React.ReactNode;
}

export function MonoChip({ children }: MonoChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 22,
        padding: '0 8px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--fg-2)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}
```

- [ ] **Rewrite `src/components/StatTile.tsx`** — keep count-up logic, remove accent bars, use Geist

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface StatTileProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
  isLast?: boolean;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
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
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('bootDone') === '1'
  );

  useEffect(() => {
    if (reduced || booted.current) {
      setDisplay(value);
      setVisible(true);
      return;
    }
    const visTimer = setTimeout(() => setVisible(true), delay);
    const startTime = performance.now() + delay;
    const DURATION = 400;
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - t, 2);
      setDisplay(Math.round(value * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (isLast) {
        sessionStorage.setItem('bootDone', '1');
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { clearTimeout(visTimer); cancelAnimationFrame(raf); };
  }, [value, delay, reduced, isLast]);

  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        flex: '1 1 120px',
        minWidth: 110,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 250ms ease, transform 250ms ease',
      }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-sans)',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: 'var(--fg-1)',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
        }}
      >
        {display}{suffix}
      </span>
      <div style={{ width: 20, height: 1, background: 'var(--border)', margin: '8px 0' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Create `src/components/StatusBadge.tsx`**

```tsx
type StatusVariant = 'live' | 'thesis' | 'enterprise' | 'confidential';

const CONFIG: Record<StatusVariant, { label: string; color: string; bg: string; border: string; dot?: boolean }> = {
  live:         { label: 'LIVE',          color: 'var(--green)', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)',   dot: true },
  thesis:       { label: 'THESIS',        color: 'var(--fg-3)',  bg: 'transparent',            border: 'var(--border)' },
  enterprise:   { label: 'ENTERPRISE',    color: 'var(--amber)', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)' },
  confidential: { label: 'CONFIDENTIAL',  color: 'var(--amber)', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)' },
};

export function StatusBadge({ variant }: { variant: StatusVariant }) {
  const c = CONFIG[variant];
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        height: 22, padding: '0 8px',
        background: c.bg, border: `1px solid ${c.border}`,
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)', fontSize: 10,
        letterSpacing: '0.08em', color: c.color, flexShrink: 0,
      }}
    >
      {c.dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />}
      {c.label}
    </span>
  );
}
```

- [ ] **Create `src/components/ProjectCard.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { MonoChip } from './MonoChip';
import { StatusBadge } from './StatusBadge';

interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
}

interface ProjectCardProps {
  variant: 'featured' | 'standard';
  title: string;
  period: string;
  status: 'live' | 'thesis' | 'enterprise';
  description: string;
  stackChips: string[];
  links?: ProjectLink[];
  metrics?: string[];
  confidential?: boolean;
}

export function ProjectCard({
  variant,
  title, period, status, description,
  stackChips, links = [], metrics = [],
  confidential = false,
}: ProjectCardProps) {
  const featured = variant === 'featured';

  return (
    <div
      style={{
        background: 'var(--surface-0)',
        border: '1px solid var(--border)',
        borderLeft: '2px solid var(--primary)',
        borderRadius: 'var(--radius-lg)',
        padding: featured ? '28px 32px' : '20px 24px',
        width: '100%',
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <StatusBadge variant={status} />
          {confidential && <StatusBadge variant="confidential" />}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.04em', flexShrink: 0 }}>
          {period}
        </span>
      </div>

      {/* title */}
      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: featured ? 22 : 16,
        fontWeight: 700,
        letterSpacing: featured ? '-0.02em' : '-0.01em',
        color: 'var(--fg-1)',
        margin: '0 0 8px',
        lineHeight: 1.2,
      }}>
        {title}
      </h3>

      {/* description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--fg-2)',
        lineHeight: 1.55,
        margin: '0 0 12px',
        maxWidth: featured ? 640 : undefined,
      }}>
        {description}
      </p>

      {/* metrics */}
      {metrics.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
          {metrics.map((m) => (
            <span key={m} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em' }}>
              {m}
            </span>
          ))}
        </div>
      )}

      {/* stack chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: links.length > 0 ? 16 : 0 }}>
        {stackChips.map((chip) => <MonoChip key={chip}>{chip}</MonoChip>)}
      </div>

      {/* links */}
      {links.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {links.map(({ label, href, primary }) => {
            const isInternal = href.startsWith('/');
            const sharedStyle: React.CSSProperties = {
              display: 'inline-flex', alignItems: 'center',
              height: 32, padding: '0 14px',
              background: primary ? 'var(--fg-1)' : 'transparent',
              border: primary ? 'none' : '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              fontWeight: primary ? 600 : 400,
              color: primary ? 'var(--bg)' : 'var(--fg-2)',
              textDecoration: 'none',
              transition: 'border-color 150ms ease, color 150ms ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            };
            if (isInternal) {
              return (
                <Link key={label} href={href} style={sharedStyle}>
                  {label} →
                </Link>
              );
            }
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={sharedStyle}
                onMouseEnter={!primary ? (e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)';
                } : undefined}
                onMouseLeave={!primary ? (e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-2)';
                } : undefined}
              >
                {label} ↗
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Create `src/components/TimelineItem.tsx`**

```tsx
interface TimelineItemProps {
  org: string;
  role: string;
  period: string;
  stack?: string;
  badge?: 'confidential';
  isActive?: boolean;
  isLast?: boolean;
}

export function TimelineItem({
  org, role, period, stack,
  badge, isActive = false, isLast = false,
}: TimelineItemProps) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      {/* dot + stem */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 3 }}>
        <div style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: isActive ? 'var(--primary)' : 'var(--fg-4)',
          flexShrink: 0,
          boxShadow: isActive ? '0 0 8px rgba(59,130,246,0.4)' : 'none',
        }} />
        {!isLast && (
          <div style={{ width: 1, flex: 1, minHeight: 20, background: 'var(--border)', marginTop: 4 }} />
        )}
      </div>

      {/* content */}
      <div style={{ paddingBottom: isLast ? 0 : 24, flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
            {org}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.04em', flexShrink: 0 }}>
            {period}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: stack ? 3 : 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-3)' }}>{role}</span>
          {badge === 'confidential' && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', height: 18, padding: '0 6px',
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', color: 'var(--amber)',
            }}>
              CONFIDENTIAL
            </span>
          )}
        </div>
        {stack && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-4)', margin: 0, lineHeight: 1.4 }}>
            {stack}
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Create `src/components/SkillGrid.tsx`**

```tsx
import { MonoChip } from './MonoChip';

interface SkillCategory {
  label: string;
  chips: string[];
}

export function SkillGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {categories.map(({ label, chips }) => (
        <div key={label} style={{ display: 'grid', gridTemplateColumns: '76px 1fr', gap: '4px 10px', alignItems: 'start' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: 2 }}>
            {label}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {chips.map((chip) => <MonoChip key={chip}>{chip}</MonoChip>)}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Create `src/components/CertAccordion.tsx`**

```tsx
'use client';

import { useState } from 'react';

interface Cert {
  name: string;
  issuer: string;
  date: string;
}

export function CertAccordion({ certs }: { certs: Cert[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.06em', color: 'var(--fg-3)',
        }}
      >
        {certs.length} CERTIFICATIONS
        <span style={{ fontSize: 10, display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }}>
          ▾
        </span>
      </button>

      <div className={`cert-list${open ? ' open' : ''}`}>
        <div className="cert-list-inner">
          <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {certs.map((cert) => (
              <div key={cert.name}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', margin: '0 0 1px', lineHeight: 1.4 }}>
                  {cert.name}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', margin: 0, letterSpacing: '0.04em' }}>
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Build verify** — all shared components compile clean

```bash
npm run build
```

Expected: clean build, no TS errors. If `React.CSSProperties` not imported somewhere, add `import type React from 'react'` at top.

- [ ] **Commit**

```bash
git add src/components/MonoChip.tsx src/components/StatTile.tsx \
        src/components/StatusBadge.tsx src/components/ProjectCard.tsx \
        src/components/TimelineItem.tsx src/components/SkillGrid.tsx \
        src/components/CertAccordion.tsx
git commit -m "feat(components): ProjectCard, TimelineItem, SkillGrid, CertAccordion, MonoChip, StatusBadge"
```

---

## Task 6: Home Page

**Files:** Rewrite `src/app/page.tsx`

- [ ] **Write `src/app/page.tsx`**

```tsx
import { ProjectCard } from '@/components/ProjectCard';
import { StatTile } from '@/components/StatTile';

const MRT_LINKS = [
  { label: 'Live Dashboard', href: 'https://mrt-station-dashboard.vercel.app', primary: true },
  { label: 'Case Study',     href: '/mrt' },
  { label: 'API Docs',       href: 'https://mrt-station-backend.fly.dev/api/docs' },
  { label: 'GitHub',         href: 'https://github.com/didapatria/mrt-station-dashboard' },
];

const STATS = [
  { value: 127, suffix: '',  label: 'E2E PASSING',  delay: 100 },
  { value: 2,   suffix: '+', label: 'YRS SHIPPING', delay: 280 },
  { value: 3,   suffix: '',  label: 'LIVE DEPLOYS', delay: 460, isLast: true as const },
];

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px' }}>
      <div
        className="hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: 48,
          alignItems: 'start',
          minHeight: 'calc(100vh - 144px)',
        }}
      >
        {/* ── LEFT: bio ── */}
        <div style={{ paddingTop: 40 }}>
          {/* availability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.08em' }}>
              Available for engagement
            </span>
          </div>

          <h1
            className="t-display"
            style={{ color: 'var(--fg-1)', margin: '0 0 12px' }}
          >
            Adinda<br />Fadhil Patria
          </h1>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.04em', margin: '0 0 20px' }}>
            Fullstack Engineer · South Jakarta, ID
          </p>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6, maxWidth: 440, margin: '0 0 32px' }}>
            I ship complete systems end-to-end — design tokens to E2E tests to Fly.io.
            Two years operating. Currently on shift at MRT Jakarta.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href="/projects"
              style={{
                display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 18px',
                background: 'var(--fg-1)', borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                color: 'var(--bg)', textDecoration: 'none',
              }}
            >
              View Projects →
            </a>
            <a
              href="https://github.com/didapatria"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 18px',
                background: 'transparent', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)', fontSize: 13,
                color: 'var(--fg-2)', textDecoration: 'none',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/didapatria"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 18px',
                background: 'transparent', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)', fontSize: 13,
                color: 'var(--fg-2)', textDecoration: 'none',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* ── RIGHT: MRT card + stats ── */}
        <div style={{ paddingTop: 40 }}>
          <ProjectCard
            variant="featured"
            title="MRT Jakarta Dashboard"
            period="Apr–May 2026"
            status="live"
            description="Full-stack ops platform for PT MRT Jakarta — 15 pages, real-time SSE, Incident Management, JWT + Google OAuth, Spatie RBAC, interactive maps, i18n, PWA, PDF export."
            stackChips={['React 19', 'Node.js', 'TypeScript', 'PostgreSQL', 'Playwright', 'SSE', 'Docker']}
            metrics={['15 PAGES', '127 E2E TESTS', '260+ COMMITS']}
            links={MRT_LINKS}
          />

          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            {STATS.map((s) => (
              <StatTile
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                delay={s.delay}
                isLast={s.isLast ?? false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* below fold */}
      <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
        <a
          href="/projects"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)',
            letterSpacing: '0.06em', transition: 'color 150ms ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-4)'; }}
        >
          Selected Work →
        </a>
      </div>
    </main>
  );
}
```

- [ ] **Build verify**

```bash
npm run build
```

- [ ] **Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): two-column hero, MRT featured card, stat tiles"
```

---

## Task 7: About Page

**Files:** Create `src/app/about/page.tsx`

- [ ] **Create `src/app/about/page.tsx`**

```tsx
import { TimelineItem } from '@/components/TimelineItem';
import { SkillGrid } from '@/components/SkillGrid';
import { CertAccordion } from '@/components/CertAccordion';

const WORK = [
  {
    org: 'PT MRT Jakarta',
    role: 'Software Engineer (Contract)',
    period: 'May 2026 – Present',
    stack: 'React.js · Redux · Express.js · JavaScript · Material UI · PostgreSQL',
    isActive: true,
  },
  {
    org: 'Alturian Group',
    role: 'Software Engineer Specialist',
    period: 'Jan 2026 – May 2026',
    stack: 'Laravel · Vue.js · React.js · Angular · Ionic · TypeScript · MySQL',
    badge: 'confidential' as const,
  },
  {
    org: 'Alturian Group',
    role: 'Junior Software Engineer',
    period: 'Apr 2024 – Jan 2026',
    stack: 'Laravel · Vue.js · Angular · Ionic · MySQL',
    badge: 'confidential' as const,
  },
];

const EDUCATION = [
  {
    org: 'Universitas Pasundan',
    role: 'B.Tech Informatics Engineering · GPA 3.70/4.00',
    period: '2019 – 2023',
    stack: 'MBKM Independent Study Track · Focus: Frontend JavaScript',
  },
  {
    org: 'Binar Academy',
    role: 'Independent Study – Front-End JavaScript',
    period: 'Feb – Jul 2022',
    stack: 'Final Score: Very Good · React.js · Tailwind CSS · Redux',
  },
];

const SKILLS = [
  { label: 'Frontend', chips: ['React 19', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'Material UI', 'Framer Motion'] },
  { label: 'Backend',  chips: ['Node.js', 'Express.js', 'Laravel', 'PHP', 'REST API', 'Prisma ORM'] },
  { label: 'Infra',    chips: ['Docker', 'GitHub Actions', 'Fly.io', 'Vercel', 'Supabase', 'PostgreSQL', 'MySQL'] },
  { label: 'Testing',  chips: ['Playwright', 'Vitest', 'React Testing Library', 'Supertest'] },
  { label: 'Mobile',   chips: ['Ionic Framework'] },
];

const CERTS = [
  { name: 'Master Laravel for Beginners & Intermediate',         issuer: 'Udemy',          date: 'Jun 2024' },
  { name: 'Vue – The Complete Guide (Router & Composition API)', issuer: 'Udemy',          date: 'Jun 2024' },
  { name: 'Angular – The Complete Guide',                        issuer: 'Udemy',          date: 'May 2024' },
  { name: 'Ionic – Build iOS, Android & Web Apps',               issuer: 'Udemy',          date: 'May 2024' },
  { name: 'Next.js – The Complete Developer\'s Guide',           issuer: 'Udemy',          date: 'Apr 2024' },
  { name: 'Front-End JavaScript (SIB Kampus Merdeka)',           issuer: 'Binar Academy',  date: 'Aug 2022' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-4)', margin: '0 0 20px' }}>
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 96px' }}>
      <div
        className="about-grid"
        style={{ display: 'grid', gridTemplateColumns: '60fr 40fr', gap: 64, alignItems: 'start' }}
      >
        {/* ── LEFT: Timeline ── */}
        <div>
          <SectionLabel>Experience</SectionLabel>
          {WORK.map((item, i) => (
            <TimelineItem key={i} {...item} isLast={i === WORK.length - 1} />
          ))}

          <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />

          <SectionLabel>Education</SectionLabel>
          {EDUCATION.map((item, i) => (
            <TimelineItem key={i} {...item} isLast={i === EDUCATION.length - 1} />
          ))}
        </div>

        {/* ── RIGHT: Skills + Certs ── */}
        <div>
          <SectionLabel>Skills</SectionLabel>
          <SkillGrid categories={SKILLS} />

          <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />

          <CertAccordion certs={CERTS} />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Build verify**

```bash
npm run build
```

Expected: 3 routes (/ /about /mrt).

- [ ] **Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat(about): timeline (work + edu), skill grid, cert accordion"
```

---

## Task 8: Projects Page

**Files:** Create `src/app/projects/page.tsx`

- [ ] **Create `src/app/projects/page.tsx`**

```tsx
import { ProjectCard } from '@/components/ProjectCard';

export default function ProjectsPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 96px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-4)', margin: '0 0 32px' }}>
        Projects
      </p>

      {/* Row 1: MRT featured */}
      <div style={{ marginBottom: 14 }}>
        <ProjectCard
          variant="featured"
          title="MRT Jakarta Dashboard"
          period="Apr–May 2026"
          status="live"
          description="Full-stack ops platform for PT MRT Jakarta — 15 pages, real-time SSE, Incident Management, JWT + Google OAuth, Spatie RBAC, interactive maps, i18n, PWA, PDF export."
          stackChips={['React 19', 'Node.js', 'TypeScript', 'PostgreSQL', 'Playwright', 'SSE', 'Docker']}
          metrics={['15 PAGES', '127 E2E TESTS', '260+ COMMITS', 'v2.18.0']}
          links={[
            { label: 'Live Dashboard', href: 'https://mrt-station-dashboard.vercel.app', primary: true },
            { label: 'Case Study',     href: '/mrt' },
            { label: 'API Docs',       href: 'https://mrt-station-backend.fly.dev/api/docs' },
            { label: 'GitHub',         href: 'https://github.com/didapatria/mrt-station-dashboard' },
          ]}
        />
      </div>

      {/* Row 2: two-up */}
      <div
        className="projects-two-up"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
      >
        <ProjectCard
          variant="standard"
          title="Ruas — Online Exam Monitoring"
          period="Feb–Nov 2023"
          status="thesis"
          description="Real-time online exam monitoring with ML-based proctoring. Thesis project — face and gaze tracking with TensorFlow."
          stackChips={['React', 'Python Flask', 'TensorFlow', 'Redux Toolkit', 'Tailwind']}
          links={[
            { label: 'Frontend', href: 'https://github.com/didapatria/fe_ruas_client' },
            { label: 'Backend',  href: 'https://github.com/didapatria/be_ruas_server' },
          ]}
        />

        <ProjectCard
          variant="standard"
          title="Alturian Group — Enterprise Systems"
          period="Apr 2024 – May 2026"
          status="enterprise"
          description="Enterprise systems for retail industry — e-commerce, ERP, POS, loyalty, SaaS, and mobile apps serving live customers."
          stackChips={['Laravel', 'Vue.js', 'React', 'Angular', 'Ionic', 'MySQL']}
          confidential
        />
      </div>
    </main>
  );
}
```

- [ ] **Build verify**

```bash
npm run build
```

Expected: 4 routes (/ /about /projects /mrt).

- [ ] **Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat(projects): asymmetric layout — MRT featured, Ruas + Alturian two-up"
```

---

## Task 9: MRT Case Study

**Files:** Rewrite `src/app/mrt/page.tsx`

- [ ] **Write `src/app/mrt/page.tsx`**

```tsx
import Link from 'next/link';
import { MonoChip } from '@/components/MonoChip';

const ENTRY_LINKS = [
  { label: 'Live Dashboard', href: 'https://mrt-station-dashboard.vercel.app',           primary: true },
  { label: 'API Docs',       href: 'https://mrt-station-backend.fly.dev/api/docs',       primary: false },
  { label: 'E2E Report',     href: 'https://didapatria.github.io/mrt-station-dashboard', primary: false },
  { label: 'GitHub',         href: 'https://github.com/didapatria/mrt-station-dashboard', primary: false },
];

function EntryButtons() {
  return (
    <div className="mrt-entry-btns" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 8, justifyContent: 'start' }}>
      {ENTRY_LINKS.map(({ label, href, primary }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', height: 34, padding: '0 16px',
            background: primary ? 'var(--fg-1)' : 'transparent',
            border: primary ? 'none' : '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-sans)', fontSize: 12,
            fontWeight: primary ? 600 : 400,
            color: primary ? 'var(--bg)' : 'var(--fg-2)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {label} ↗
        </a>
      ))}
    </div>
  );
}

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.1em' }}>{number}</span>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--fg-1)', margin: 0 }}>
        {children}
      </h2>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.65, maxWidth: 680 }}>
      {children}
    </div>
  );
}

function ArchDiagram() {
  const box = (label: string, sub: string, accent: string) => (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderTop: `2px solid ${accent}`,
      borderRadius: 'var(--radius-md)', padding: '12px 16px',
      textAlign: 'center', minWidth: 100,
    }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent, letterSpacing: '0.08em', margin: '0 0 4px' }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', margin: 0, lineHeight: 1.3 }}>{sub}</p>
    </div>
  );

  return (
    <div style={{ background: 'var(--surface-0)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {box('VERCEL', 'Next.js 15\nReact 19', '#3b82f6')}
        <span style={{ color: 'var(--fg-4)', fontSize: 14 }}>→</span>
        {box('FLY.IO', 'Express.js\nNode.js', '#6366f1')}
        <span style={{ color: 'var(--fg-4)', fontSize: 14 }}>→</span>
        {box('POSTGRESQL', 'Database\nPersistent', '#22c55e')}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', textAlign: 'center', margin: '14px 0 0', letterSpacing: '0.04em' }}>
        SSE (real-time) · JWT + Google OAuth · Docker (local dev) · GitHub Actions (CI)
      </p>
    </div>
  );
}

function Challenge({ title, problem, solution, outcome }: { title: string; problem: string; solution: string; outcome: string }) {
  return (
    <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: 16, marginBottom: 24 }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', margin: '0 0 8px' }}>{title}</p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', margin: '0 0 6px', lineHeight: 1.55 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.08em', marginRight: 6 }}>PROBLEM</span>
        {problem}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', margin: '0 0 6px', lineHeight: 1.55 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.08em', marginRight: 6 }}>SOLUTION</span>
        {solution}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-3)', margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>
        {outcome}
      </p>
    </div>
  );
}

const STACK_CHIPS = ['React 19', 'Node.js', 'TypeScript', 'PostgreSQL', 'Playwright', 'SSE', 'Docker', 'JWT', 'Google OAuth'];

export default function MRTPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 96px' }}>
      {/* back link */}
      <Link
        href="/projects"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em', display: 'inline-block', marginBottom: 32, transition: 'color 150ms ease' }}
      >
        ← Back to Projects
      </Link>

      {/* header */}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
        Case Study
      </p>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--fg-1)', margin: '0 0 8px', lineHeight: 1.1 }}>
        MRT Jakarta Dashboard
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-3)', margin: '0 0 20px' }}>
        Apr–May 2026 · Full-stack · Deployed
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 24 }}>
        {STACK_CHIPS.map((c) => <MonoChip key={c}>{c}</MonoChip>)}
      </div>

      {/* Entry buttons — top */}
      <EntryButtons />

      <div style={{ height: 1, background: 'var(--border)', margin: '40px 0' }} />

      {/* 01 Overview */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="01">Overview</SectionTitle>
        <Prose>
          <p style={{ margin: '0 0 12px' }}>
            PT MRT Jakarta needed a centralized platform to manage 15 stations simultaneously — coordinating incident response, tracking real-time operational data, and enabling different staff roles to act on live information. The existing approach relied on fragmented tools and manual coordination, creating delays in incident escalation and limited visibility across the network.
          </p>
          <p style={{ margin: 0 }}>
            I designed and built the full platform as a contract engagement: frontend design system, API architecture, authentication, authorization model, real-time data layer, and deployment pipeline — 15 pages shipping as v2.18.0 with 127 Playwright E2E tests passing in CI.
          </p>
        </Prose>
      </div>

      {/* 02 Architecture */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="02">Architecture</SectionTitle>
        <Prose>
          <p style={{ margin: '0 0 4px' }}>
            Frontend on Vercel (Next.js 15 / React 19), API on Fly.io (Express.js / Node.js), PostgreSQL as the persistent store. Real-time station updates are pushed via Server-Sent Events — the frontend maintains a persistent SSE connection to the API, receiving events as station state changes.
          </p>
        </Prose>
        <ArchDiagram />
      </div>

      {/* 03 Design System */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="03">Design System</SectionTitle>
        <Prose>
          <p style={{ margin: '0 0 12px' }}>
            Built "Operations Terminal" — a purpose-built dark ops-board design system. No component library. Every token, component, and motion primitive was defined from scratch: CSS custom properties for color, typography, and spacing; a component library including OpsCard, StatTile, TerminalBlock, LEDDot, and MonoChip; and a motion grammar (LED pulse, count-up animation, hover transitions) with full reduced-motion support.
          </p>
          <p style={{ margin: 0 }}>
            The system is portable — this portfolio is built on a variant of it. Design ownership is the claim; the shared tokens between the dashboard and the portfolio are the proof.
          </p>
        </Prose>
      </div>

      {/* 04 Key Challenges */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="04">Key Challenges</SectionTitle>
        <Challenge
          title="SSE Reconnection Under Load"
          problem="Server-Sent Events drop silently when the server restarts or the connection times out. Station controllers saw stale data without knowing their connection had dropped."
          solution="Implemented an automatic exponential-backoff reconnection strategy on the client with a visible connection-state indicator in the UI. The API sends a heartbeat event every 15 seconds; the client treats silence beyond 20 seconds as a disconnect and reconnects automatically."
          outcome="Zero reported stale-data incidents after rollout. Connection health is now visible to the operator at all times."
        />
        <Challenge
          title="Multi-role RBAC with Spatie"
          problem="Different staff roles (station controller, supervisor, admin, auditor) needed different views and action sets across the same 15 pages — not just route guards, but per-component permission checks."
          solution="Used Laravel Spatie Permission on the API to define role-permission pairs, then exposed a permissions payload in the JWT. The Next.js frontend reads the payload on mount and conditionally renders action buttons, form fields, and entire panels based on the decoded permissions — no second round-trip."
          outcome="Role enforcement is consistent across all 15 pages with a single shared permissions hook. Adding a new role requires one API change and no frontend changes."
        />
        <Challenge
          title="Interactive Map with 15+ Concurrent Stations"
          problem="The station map needed to show live status for all 15 stations simultaneously — color-coded by incident state — while remaining performant enough to update in real time without full re-renders."
          solution="Station state is held in a Zustand store updated by the SSE stream. The map renders 15 station markers as individual React components keyed by station ID, each subscribing only to its own slice of the store. React renders only the markers whose state changes."
          outcome="Map updates are immediate and smooth at 60fps. No full page re-renders on station state changes."
        />
      </div>

      {/* 05 Testing */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="05">Testing</SectionTitle>
        <Prose>
          <p style={{ margin: '0 0 12px' }}>
            127 Playwright E2E tests cover the full application: authentication flows (JWT + Google OAuth), all 15 pages, incident lifecycle (create → escalate → resolve), RBAC (each role's permitted and forbidden actions), and real-time update reception.
          </p>
          <p style={{ margin: 0 }}>
            E2E was chosen over unit tests for this domain because the critical behaviors are interaction sequences across multiple pages and real API responses — not isolated functions. The test suite runs on every push via GitHub Actions and the HTML report is published to GitHub Pages.
          </p>
        </Prose>
        <div style={{ marginTop: 16 }}>
          <a
            href="https://didapatria.github.io/mrt-station-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 14px',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', textDecoration: 'none',
              transition: 'border-color 150ms ease, color 150ms ease',
            }}
          >
            View E2E Report ↗
          </a>
        </div>
      </div>

      {/* 06 Links */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="06">Links</SectionTitle>
        <EntryButtons />
        <div style={{ marginTop: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.06em' }}>
            Status: LIVE · v2.18.0 · 260+ commits
          </span>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 0 32px' }} />
      <Link
        href="/projects"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em' }}
      >
        ← Back to Projects
      </Link>
    </main>
  );
}
```

- [ ] **Build verify**

```bash
npm run build
```

Expected: 4 routes clean. If `React.ReactNode` type errors appear without import, add `import type React from 'react'` at top of affected files.

- [ ] **Commit**

```bash
git add src/app/mrt/page.tsx
git commit -m "feat(mrt): full case study — 6 sections, entry buttons, architecture diagram"
```

---

## Task 10: Final Build + Lint + Deploy

- [ ] **Run lint**

```bash
npm run lint
```

Fix any reported issues before proceeding.

- [ ] **Run full build**

```bash
npm run build
```

Expected output:
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /mrt
└ ○ /projects
○  (Static)  prerendered as static content
```

- [ ] **Light mode spot-check** — start dev server, toggle to light mode, verify:
  - bg flips to `#ffffff`, cards to `#f4f4f5`
  - Nav border visible on white bg
  - ProjectCard border-left still visible
  - StatTile cards legible

```bash
npm run dev
# open localhost:3000, click ThemeToggle
```

- [ ] **Mobile spot-check** (DevTools → 375px viewport):
  - Home: hero stacks to single column
  - Navbar: hamburger visible, desktop links hidden
  - MobileMenu: opens full-screen, links 28px+
  - Projects: two-up stacks to single column
  - /mrt: entry buttons wrap to 2×2 grid

- [ ] **Commit version bump**

```bash
# Update NEXT_PUBLIC_BUILD_SHA if needed
git add -A
git commit -m "design: v2.0.0 — Refined Minimal Dark, Geist, multi-page architecture"
```

- [ ] **Deploy**

```bash
vercel --prod
```

- [ ] **Verify live URL** — confirm 4 routes load, theme toggle works, MRT links open correctly.

---

## Self-Review Checklist

- [x] **Spec coverage:** tokens ✓, fonts ✓, Navbar ✓, MobileMenu ✓, all shared components ✓, all 4 pages ✓, light mode ✓, mobile ✓, deploy ✓
- [x] **No placeholders:** all steps have actual code
- [x] **Type consistency:** `StatusBadge variant` defined and used consistently; `ProjectCard variant` 'featured'|'standard' defined in Task 5 and consumed in Tasks 6–8; `TimelineItem badge` typed as `'confidential' as const` in data arrays
- [x] **Geist fallback documented** in Task 3 if `next/font/google` types don't include Geist
- [x] **`'use client'`** present on all interactive components: Navbar, MobileMenu, CertAccordion, StatTile, ProjectCard (hover handlers), ThemeToggle (unchanged)
- [x] **Server components** (no event handlers): AboutPage, ProjectsPage, MRTPage (static content, no interactivity needed) — note MRTPage has no `onMouse*` handlers except in-page anchor hovers which won't need `'use client'`; if hover handlers are added to back-link, add `'use client'`
