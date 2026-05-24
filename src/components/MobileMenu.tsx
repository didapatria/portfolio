'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

type ActiveSection = 'home' | 'about' | 'projects' | 'mrt';

const LINKS = [
  { label: 'Work',     section: 'home' as ActiveSection },
  { label: 'About',    section: 'about' as ActiveSection },
  { label: 'Projects', section: 'projects' as ActiveSection },
] as const;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeSection: ActiveSection;
}

export function MobileMenu({ open, onClose, activeSection }: MobileMenuProps) {
  const isActive = (section: ActiveSection) => {
    if (section === 'projects') return activeSection === 'projects' || activeSection === 'mrt';
    return activeSection === section;
  };

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
            background: 'var(--bg)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            padding: '0 24px 40px',
          }}
        >
          {/* Top bar mirrors Navbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
            <a
              href="#home"
              onClick={onClose}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: 'var(--fg-1)', textDecoration: 'none' }}
            >
              AFP
            </a>
            <button
              onClick={onClose}
              aria-label="Close navigation"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--fg-3)',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 40, flex: 1 }}>
            {LINKS.map(({ label, section }) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: isActive(section) ? 'var(--fg-1)' : 'var(--fg-4)',
                  padding: '10px 0',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
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
