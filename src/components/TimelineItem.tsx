interface TimelineItemProps {
  org: string;
  role: string;
  period: string;
  stack?: string;
  badge?: 'confidential';
  isActive?: boolean;
  isLast?: boolean;
}

export function TimelineItem({
  org, role, period, stack,
  badge, isActive = false, isLast = false,
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
            {org}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.04em', flexShrink: 0 }}>
            {period}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: stack ? 3 : 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-3)' }}>{role}</span>
          {badge === 'confidential' && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', height: 18, padding: '0 6px',
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', color: 'var(--amber)',
            }}>
              CONFIDENTIAL
            </span>
          )}
        </div>
        {stack && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-4)', margin: 0, lineHeight: 1.4 }}>
            {stack}
          </p>
        )}
      </div>
    </div>
  );
}
