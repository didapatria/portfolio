'use client';

import { StatTile } from '../StatTile';

const STATS = [
  { value: 2,   suffix: '+', label: 'YRS SHIPPING', delay: 100 },
  { value: 127, suffix: '',  label: 'E2E PASSING',  delay: 280 },
  { value: 3,   suffix: '',  label: 'LIVE DEPLOY.', delay: 460, isLast: true },
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
          zIndex: 0,
        }}
      />

      {/* scanline overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* corner brackets — 20px arms, primary/30 */}
      {(
        [
          { top: 24, left: 24,   bt: true,  bl: true  },
          { top: 24, right: 24,  bt: true,  br: true  },
          { bottom: 24, left: 24,  bb: true,  bl: true  },
          { bottom: 24, right: 24, bb: true,  br: true  },
        ] as const
      ).map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            top:    'top' in pos    ? pos.top    : undefined,
            bottom: 'bottom' in pos ? pos.bottom : undefined,
            left:   'left' in pos   ? pos.left   : undefined,
            right:  'right' in pos  ? pos.right  : undefined,
            borderTop:    'bt' in pos ? '1px solid rgba(29,111,232,0.3)' : 'none',
            borderBottom: 'bb' in pos ? '1px solid rgba(29,111,232,0.3)' : 'none',
            borderLeft:   'bl' in pos ? '1px solid rgba(29,111,232,0.3)' : 'none',
            borderRight:  'br' in pos ? '1px solid rgba(29,111,232,0.3)' : 'none',
            zIndex: 2,
          }}
        />
      ))}

      {/* content column */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 760 }}>

        {/* operator label with blinking cursor */}
        <p
          className="t-mono-xs"
          style={{ color: 'var(--fg-2)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 0 }}
        >
          OPERATOR · FULLSTACK ENGINEER · SOUTH JAKARTA, ID&nbsp;
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 11,
              background: 'var(--fg-2)',
              verticalAlign: 'middle',
              animation: 'subtitle-cursor 1s steps(1) infinite',
            }}
          />
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
              boxShadow: '0 0 20px rgba(29,111,232,0.3)',
              cursor: 'pointer',
              transition: 'background-color var(--dur-fast) var(--ease-base), box-shadow var(--dur-fast) var(--ease-base)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = '0 0 32px rgba(29,111,232,0.5)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = '0 0 20px rgba(29,111,232,0.3)';
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
              transition: 'border-color var(--dur-fast) var(--ease-base)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(59,130,246,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
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
              transition: 'border-color var(--dur-fast) var(--ease-base)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(59,130,246,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
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
