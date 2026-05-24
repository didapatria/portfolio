'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
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

function linkKind(href: string): 'anchor' | 'internal' | 'external' {
  if (href.startsWith('#')) return 'anchor';
  if (href.startsWith('/')) return 'internal';
  return 'external';
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <StatusBadge variant={status} />
          {confidential && <StatusBadge variant="confidential" />}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.04em', flexShrink: 0 }}>
          {period}
        </span>
      </div>

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

      {metrics.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
          {metrics.map((m) => (
            <span key={m} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em' }}>
              {m}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: links.length > 0 ? 16 : 0 }}>
        {stackChips.map((chip) => <MonoChip key={chip}>{chip}</MonoChip>)}
      </div>

      {links.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {links.map(({ label, href, primary }) => {
            const kind = linkKind(href);
            const isExternal = kind === 'external';
            const sharedStyle: React.CSSProperties = {
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 32, padding: '0 14px',
              background: primary ? 'var(--fg-1)' : 'transparent',
              border: primary ? 'none' : '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              fontWeight: primary ? 600 : 400,
              color: primary ? 'var(--bg)' : 'var(--fg-2)',
              textDecoration: 'none',
              transition: 'border-color var(--dur-fast) ease, color var(--dur-fast) ease, opacity var(--dur-fast) ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            };

            const icon = isExternal
              ? <ExternalLink size={12} />
              : <ArrowRight size={12} />;

            const hoverEnter = primary
              ? (e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }
              : (e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'var(--primary)';
                  el.style.color = 'var(--primary)';
                };
            const hoverLeave = primary
              ? (e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }
              : (e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'var(--border)';
                  el.style.color = 'var(--fg-2)';
                };

            const anchorProps = isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' as const }
              : {};

            if (kind === 'internal') {
              return (
                <Link
                  key={label}
                  href={href}
                  style={sharedStyle}
                  onMouseEnter={hoverEnter as unknown as React.MouseEventHandler<HTMLAnchorElement>}
                  onMouseLeave={hoverLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
                >
                  {label} {icon}
                </Link>
              );
            }

            return (
              <a
                key={label}
                href={href}
                {...anchorProps}
                style={sharedStyle}
                onMouseEnter={hoverEnter}
                onMouseLeave={hoverLeave}
              >
                {label} {icon}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
