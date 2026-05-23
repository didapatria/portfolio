'use client';

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
              className="t-mono-data"
              style={{
                color: 'var(--fg-1)',
                fontSize: 12,
                transition: 'color var(--dur-fast) var(--ease-base)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'var(--primary)';
                el.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'var(--fg-1)';
                el.style.textDecoration = 'none';
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
              animation: 'cursor-blink 1s steps(2) infinite',
            }}
          />
        </div>
      </div>
    </OpsCard>
  );
}
