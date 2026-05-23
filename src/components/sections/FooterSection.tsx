const BUILD_SHA =
  process.env.NEXT_PUBLIC_BUILD_SHA?.slice(0, 7) ?? 'dev';
const BUILD_DATE =
  process.env.NEXT_PUBLIC_BUILD_DATE ??
  new Date().toISOString().split('T')[0];

const COMMIT_URL =
  BUILD_SHA !== 'dev'
    ? `https://github.com/didapatria/portfolio/commit/${process.env.NEXT_PUBLIC_BUILD_SHA}`
    : null;

export function FooterSection() {
  return (
    <footer
      style={{
        position: 'relative',
        background: 'var(--surface-0)',
        borderTop: '1px solid var(--border)',
        padding: '32px 32px 40px',
        overflow: 'hidden',
      }}
    >
      {/* dot-grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, var(--primary-tint) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
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
            BUILD{' '}
            {COMMIT_URL ? (
              <a
                href={COMMIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--fg-3)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  transition: 'color var(--dur-fast) ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-3)';
                }}
              >
                #{BUILD_SHA}
              </a>
            ) : (
              <span>#{BUILD_SHA}</span>
            )}{' '}
            · LAST DEPLOY {BUILD_DATE} · PORTFOLIO v1.0.0
          </span>
          <span className="t-mono-xs" style={{ color: 'var(--fg-3)' }}>
            Built with Next.js · Tailwind v4 · Framer Motion · Vercel
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
