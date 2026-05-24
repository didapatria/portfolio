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
  location?: string;
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

function CompanyDot({ isActive }: { isActive: boolean }) {
  return (
    <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
      <div style={{
        width: 10, height: 10,
        borderRadius: '50%',
        background: isActive ? 'var(--primary)' : 'var(--fg-4)',
        boxShadow: isActive ? '0 0 8px var(--primary-glow)' : 'none',
        position: 'relative',
        zIndex: 1,
      }} />
      {isActive && (
        <span
          className="timeline-ping"
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: '50%',
            border: '1.5px solid var(--primary)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

export function TimelineItem({
  org, period, location, role, stack, bullets, chips,
  badge, subRoles, isActive = false, isLast = false,
}: TimelineItemProps) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {/* dot + stem */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 4 }}>
        <CompanyDot isActive={isActive} />
        {!isLast && (
          <div style={{ width: 2, flex: 1, minHeight: 24, background: 'var(--border-subtle)', marginTop: 4 }} />
        )}
      </div>

      {/* content */}
      <div style={{ paddingBottom: isLast ? 0 : 28, flex: 1, minWidth: 0 }}>
        {/* org + period */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: location ? 2 : 4, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', letterSpacing: '-0.005em' }}>
            {org}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.04em', flexShrink: 0 }}>
            {period}
          </span>
        </div>
        {location && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.04em', margin: '0 0 6px' }}>
            {location}
          </p>
        )}

        {/* flat role */}
        {role && (
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: bullets?.length ? 6 : 0 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 400, color: 'var(--fg-2)' }}>{role}</span>
              {badge === 'confidential' && <ConfidentialBadge />}
            </div>
            {bullets?.map((b, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', margin: '4px 0', lineHeight: 1.6 }}>
                · {b}
              </p>
            ))}
            {chips && chips.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
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
          <div style={{ marginBottom: 8 }}>
            <ConfidentialBadge />
          </div>
        )}

        {/* nested sub-roles */}
        {subRoles && subRoles.length > 0 && (
          <div
            style={{
              marginTop: 12,
              marginLeft: 24,
              borderLeft: '2px solid var(--border-subtle)',
              paddingLeft: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {subRoles.map((sr, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: -22,
                    top: 6,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--border)',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--fg-1)' }}>{sr.title}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.04em', flexShrink: 0 }}>{sr.period}</span>
                </div>
                {sr.bullets.map((b, bi) => (
                  <p key={bi} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', margin: '3px 0', lineHeight: 1.6 }}>
                    · {b}
                  </p>
                ))}
                {sr.chips.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
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
