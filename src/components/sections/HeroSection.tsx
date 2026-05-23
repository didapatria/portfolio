'use client';

import { StatTile } from '../StatTile';

const STATS = [
  { value: 2,   suffix: '+', label: 'YRS SHIPPING', delay: 100 },
  { value: 127, suffix: '',  label: 'E2E PASSING',  delay: 280 },
  { value: 3,   suffix: '',  label: 'LIVE DEPLOY.', delay: 460, isLast: true },
] as const;

const BRACKET_POSITIONS = [
  { top: 24, left: 24, top_b: true, left_b: true },
  { top: 24, right: 24, top_b: true, right_b: true },
  { bottom: 24, left: 24, bottom_b: true, left_b: true },
  { bottom: 24, right: 24, bottom_b: true, right_b: true },
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
          backgroundImage:
            'radial-gradient(circle, var(--primary-tint) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* corner brackets */}
      {BRACKET_POSITIONS.map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            top:    'top' in pos    ? pos.top    : undefined,
            bottom: 'bottom' in pos ? pos.bottom : undefined,
            left:   'left' in pos   ? pos.left   : undefined,
            right:  'right' in pos  ? pos.right  : undefined,
            borderTop:    'top_b' in pos    ? '1px solid rgba(29,111,232,0.2)' : 'none',
            borderBottom: 'bottom_b' in pos ? '1px solid rgba(29,111,232,0.2)' : 'none',
            borderLeft:   'left_b' in pos   ? '1px solid rgba(29,111,232,0.2)' : 'none',
            borderRight:  'right_b' in pos  ? '1px solid rgba(29,111,232,0.2)' : 'none',
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
            textWrap: 'pretty' as React.CSSProperties['textWrap'],
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
              transition:
                'background-color var(--dur-fast) var(--ease-base)',
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
              transition:
                'border-color var(--dur-fast) var(--ease-base), background-color var(--dur-fast) var(--ease-base)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                'rgba(59,130,246,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                'var(--border)';
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
              transition:
                'border-color var(--dur-fast) var(--ease-base), background-color var(--dur-fast) var(--ease-base)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                'rgba(59,130,246,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                'var(--border)';
            }}
          >
            LINKEDIN →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .hero-name { font-size: clamp(48px, 11vw, 72px) !important; }
        }
      `}</style>
    </section>
  );
}
