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
