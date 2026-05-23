'use client';

import { useEffect, useRef, useState } from 'react';
import { OpsCard } from './OpsCard';

interface ContactLine {
  label: string;
  handle: string;
  href: string;
}

const LINES: ContactLine[] = [
  { label: 'LINKEDIN',  handle: '/didapatria',          href: 'https://linkedin.com/in/didapatria' },
  { label: 'GITHUB',    handle: '/didapatria',           href: 'https://github.com/didapatria' },
  { label: 'INSTAGRAM', handle: '@didapatria',           href: 'https://instagram.com/didapatria' },
  { label: 'EMAIL',     handle: 'didapatria3@gmail.com', href: 'mailto:didapatria3@gmail.com' },
];

export function TerminalBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const [pinged, setPinged] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPinged(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <OpsCard>
      <div
        ref={ref}
        style={{
          background: 'var(--surface-0)',
          padding: '48px 56px',
          display: 'grid',
          gap: 12,
          borderRadius: 'var(--radius-xl)',
          borderLeft: '2px solid rgba(29,111,232,0.4)',
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
            <span
              className="t-mono-data"
              style={{ color: 'var(--primary)', fontSize: 12 }}
            >
              {'>'}
            </span>
            <span
              className="t-mono-data"
              style={{
                color: 'var(--fg-2)',
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
            <span
              className="t-mono-data"
              style={{ color: 'var(--fg-3)', fontSize: 12 }}
            >
              ▸
            </span>
            <a
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="t-mono-data terminal-handle"
              style={{
                color: 'var(--fg-1)',
                fontSize: 12,
              }}
            >
              {handle}
            </a>
          </div>
        ))}

        {/* cursor line */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '16px 1fr',
            gap: 12,
            alignItems: 'baseline',
          }}
        >
          <span
            className="t-mono-data"
            style={{ color: 'var(--primary)', fontSize: 12 }}
          >
            {'>'}
          </span>
          <span
            style={{
              display: 'inline-block',
              width: 9,
              height: 14,
              background: 'var(--primary)',
              verticalAlign: '-2px',
              animation: pinged
                ? 'cursor-ping 0.5s ease-out, cursor-blink 1s steps(2) 0.5s infinite'
                : 'cursor-blink 1s steps(2) infinite',
            }}
          />
        </div>
      </div>
    </OpsCard>
  );
}
