'use client';

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
