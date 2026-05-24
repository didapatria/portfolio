import { ExternalLink } from 'lucide-react';

const BUILD_SHA = (process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev').slice(0, 7);
const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE ?? '';

const NAV = [
  { label: 'Work',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'MRT',      href: '#mrt' },
];

const SOCIAL = [
  { label: 'GitHub',   href: 'https://github.com/didapatria' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/didapatria' },
  { label: 'Email',    href: 'mailto:didapatria3@gmail.com' },
];

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-0)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
        <div
          className="footer-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 48, alignItems: 'start' }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', margin: '0 0 4px' }}>
              Adinda Fadhil Patria
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.04em', margin: 0 }}>
              Fullstack Engineer · South Jakarta, ID
            </p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.1em', margin: '0 0 4px', textTransform: 'uppercase' }}>
              Navigate
            </p>
            {NAV.map(({ label, href }) => (
              <a key={href} href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </nav>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.1em', margin: '0 0 4px', textTransform: 'uppercase' }}>
              Connect
            </p>
            {SOCIAL.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', textDecoration: 'none' }}
              >
                {label}
                {href.startsWith('http') && <ExternalLink size={10} />}
              </a>
            ))}
          </nav>
        </div>

        <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} Adinda Fadhil Patria · v2.1.1
          </span>
          <a
            href={`https://github.com/didapatria/portfolio/commit/${process.env.NEXT_PUBLIC_BUILD_SHA ?? 'main'}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.06em', textDecoration: 'none' }}
          >
            build {BUILD_SHA}{BUILD_DATE && ` · ${BUILD_DATE}`}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </footer>
  );
}
