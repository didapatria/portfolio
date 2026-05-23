'use client';

import Link from 'next/link';
import { MonoChip } from './MonoChip';
import { StatusBadge } from './StatusBadge';

interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
}

interface ProjectCardProps {
  variant: 'featured' | 'standard';
  title: string;
  period: string;
  status: 'live' | 'thesis' | 'enterprise';
  description: string;
  stackChips: string[];
  links?: ProjectLink[];
  metrics?: string[];
  confidential?: boolean;
}

export function ProjectCard({
  variant,
  title, period, status, description,
  stackChips, links = [], metrics = [],
  confidential = false,
}: ProjectCardProps) {
  const featured = variant === 'featured';

  return (
    <div
      style={{
        background: 'var(--surface-0)',
        border: '1px solid var(--border)',
        borderLeft: '2px solid var(--primary)',
        borderRadius: 'var(--radius-lg)',
        padding: featured ? '28px 32px' : '20px 24px',
        width: '100%',
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <StatusBadge variant={status} />
          {confidential && <StatusBadge variant="confidential" />}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.04em', flexShrink: 0 }}>
          {period}
        </span>
      </div>

      {/* title */}
      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: featured ? 22 : 16,
        fontWeight: 700,
        letterSpacing: featured ? '-0.02em' : '-0.01em',
        color: 'var(--fg-1)',
        margin: '0 0 8px',
        lineHeight: 1.2,
      }}>
        {title}
      </h3>

      {/* description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--fg-2)',
        lineHeight: 1.55,
        margin: '0 0 12px',
        maxWidth: featured ? 640 : undefined,
      }}>
        {description}
      </p>

      {/* metrics */}
      {metrics.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
          {metrics.map((m) => (
            <span key={m} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em' }}>
              {m}
            </span>
          ))}
        </div>
      )}

      {/* stack chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: links.length > 0 ? 16 : 0 }}>
        {stackChips.map((chip) => <MonoChip key={chip}>{chip}</MonoChip>)}
      </div>

      {/* links */}
      {links.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {links.map(({ label, href, primary }) => {
            const isInternal = href.startsWith('/');
            const sharedStyle: React.CSSProperties = {
              display: 'inline-flex', alignItems: 'center',
              height: 32, padding: '0 14px',
              background: primary ? 'var(--fg-1)' : 'transparent',
              border: primary ? 'none' : '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              fontWeight: primary ? 600 : 400,
              color: primary ? 'var(--bg)' : 'var(--fg-2)',
              textDecoration: 'none',
              transition: 'border-color 150ms ease, color 150ms ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            };
            if (isInternal) {
              return (
                <Link key={label} href={href} style={sharedStyle}>
                  {label} →
                </Link>
              );
            }
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={sharedStyle}
                onMouseEnter={!primary ? (e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)';
                } : undefined}
                onMouseLeave={!primary ? (e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-2)';
                } : undefined}
              >
                {label} ↗
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
