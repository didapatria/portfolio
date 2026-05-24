import { MonoChip } from './MonoChip';

interface SubRole {
  title: string;
  period: string;
  bullets: string[];
  chips: string[];
}

interface TimelineItemProps {
  org: string;
  period: string;
  role?: string;
  stack?: string;
  bullets?: string[];
  chips?: string[];
  badge?: 'confidential';
  subRoles?: SubRole[];
  isActive?: boolean;
  isLast?: boolean;
}

function ConfidentialBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 18, padding: '0 6px',
      background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', color: 'var(--amber)',
    }}>
      CONFIDENTIAL
    </span>
  );
}

export function TimelineItem({
  org, period, role, stack, bullets, chips,
  badge, subRoles, isActive = false, isLast = false,
}: TimelineItemProps) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      {/* dot + stem */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 3 }}>
        <div style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: isActive ? 'var(--primary)' : 'var(--fg-4)',
          flexShrink: 0,
          boxShadow: isActive ? '0 0 8px rgba(59,130,246,0.4)' : 'none',
        }} />
        {!isLast && (
          <div style={{ width: 1, flex: 1, minHeight: 20, background: 'var(--border)', marginTop: 4 }} />
        )}
      </div>

      {/* content */}
      <div style={{ paddingBottom: isLast ? 0 : 24, flex: 1, minWidth: 0 }}>
        {/* org + period */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
            {org}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.04em', flexShrink: 0 }}>
            {period}
          </span>
        </div>

        {/* flat role */}
        {role && (
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: bullets?.length ? 4 : 0 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-3)' }}>{role}</span>
              {badge === 'confidential' && <ConfidentialBadge />}
            </div>
            {bullets?.map((b, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-3)', margin: '2px 0', lineHeight: 1.5 }}>
                · {b}
              </p>
            ))}
            {chips && chips.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                {chips.map((c) => <MonoChip key={c}>{c}</MonoChip>)}
              </div>
            )}
          </div>
        )}

        {/* legacy stack string */}
        {stack && !chips && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-4)', margin: 0, lineHeight: 1.4 }}>
            {stack}
          </p>
        )}

        {/* parent-only badge (no role) */}
        {!role && badge === 'confidential' && (
          <div style={{ marginBottom: 6 }}>
            <ConfidentialBadge />
          </div>
        )}

        {/* nested sub-roles */}
        {subRoles && subRoles.length > 0 && (
          <div style={{ marginTop: 10, borderLeft: '1px solid var(--border)', paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {subRoles.map((sr, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--fg-2)' }}>{sr.title}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.04em', flexShrink: 0 }}>{sr.period}</span>
                </div>
                {sr.bullets.map((b, bi) => (
                  <p key={bi} style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-3)', margin: '2px 0', lineHeight: 1.5 }}>
                    · {b}
                  </p>
                ))}
                {sr.chips.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                    {sr.chips.map((c) => <MonoChip key={c}>{c}</MonoChip>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
