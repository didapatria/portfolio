const BUILD_SHA =
  process.env.NEXT_PUBLIC_BUILD_SHA?.slice(0, 7) ?? 'dev';
const BUILD_DATE =
  process.env.NEXT_PUBLIC_BUILD_DATE ??
  new Date().toISOString().split('T')[0];

export function FooterSection() {
  return (
    <footer
      style={{
        background: 'var(--surface-0)',
        borderTop: '1px solid var(--border)',
        padding: '32px 32px 40px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <span className="t-mono-xs" style={{ color: 'var(--fg-3)' }}>
            BUILD #{BUILD_SHA} · LAST DEPLOY {BUILD_DATE} · PORTFOLIO v1.0.0
          </span>
          <span className="t-mono-xs" style={{ color: 'var(--fg-3)' }}>
            Built with Next.js 15 · Tailwind v4 · Framer Motion · Vercel
          </span>
        </div>
        <p
          className="t-mono-xs"
          style={{
            color: 'var(--fg-3)',
            textAlign: 'center',
            letterSpacing: '0.2em',
            fontSize: '8.5px',
            margin: 0,
          }}
        >
          © 2026 ADINDA FADHIL PATRIA · ALL SYSTEMS OPERATIONAL
        </p>
      </div>
    </footer>
  );
}
