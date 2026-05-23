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
