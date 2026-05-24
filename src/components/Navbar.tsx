'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

type ActiveSection = 'home' | 'about' | 'projects';

const LINKS = [
  { label: 'Work',     section: 'home' as ActiveSection },
  { label: 'About',    section: 'about' as ActiveSection },
  { label: 'Projects', section: 'projects' as ActiveSection },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ActiveSection>('home');
  const ratios = useRef<Record<ActiveSection, number>>({ home: 0, about: 0, projects: 0 });

  useEffect(() => {
    const SECTIONS: ActiveSection[] = ['home', 'about', 'projects'];
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
          let top: ActiveSection = 'home';
          let topRatio = -1;
          (Object.keys(ratios.current) as ActiveSection[]).forEach((k) => {
            if (ratios.current[k] > topRatio) {
              topRatio = ratios.current[k];
              top = k;
            }
          });
          if (topRatio > 0) setActive(top);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
        <a
          href="#home"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 14,
            color: 'var(--fg-1)',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
          }}
        >
          AFP
        </a>

        <div
          className="nav-available"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 12, marginRight: 'auto' }}
        >
          <span
            className="availability-dot"
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Available
          </span>
        </div>

        {/* Desktop */}
        <nav
          className="nav-desktop"
          style={{ alignItems: 'center', gap: 24 }}
        >
          {LINKS.map(({ label, section }) => (
            <a
              key={section}
              href={`#${section}`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: active === section ? 'var(--fg-1)' : 'var(--fg-3)',
                transition: 'color 150ms ease',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
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
            display: 'flex',
            alignItems: 'center',
            color: 'var(--fg-3)',
          }}
        >
          <Menu size={18} />
        </button>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} activeSection={active} />
    </>
  );
}
