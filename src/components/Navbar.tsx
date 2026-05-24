'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

type ActiveSection = 'home' | 'about' | 'projects' | 'mrt';

const LINKS = [
  { label: 'Work',     section: 'home' as ActiveSection },
  { label: 'About',    section: 'about' as ActiveSection },
  { label: 'Projects', section: 'projects' as ActiveSection },
] as const;

function isLinkActive(linkSection: ActiveSection, active: ActiveSection) {
  if (linkSection === 'projects') return active === 'projects' || active === 'mrt';
  return active === linkSection;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ActiveSection>('home');

  useEffect(() => {
    const SECTIONS: ActiveSection[] = ['home', 'about', 'projects', 'mrt'];
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-48px 0px -50% 0px', threshold: 0 },
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
            marginRight: 'auto',
            textDecoration: 'none',
          }}
        >
          AFP
        </a>

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
                color: isLinkActive(section, active) ? 'var(--fg-1)' : 'var(--fg-3)',
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
