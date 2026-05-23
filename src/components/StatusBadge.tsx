type StatusVariant = 'live' | 'thesis' | 'enterprise' | 'confidential';

const CONFIG: Record<StatusVariant, { label: string; color: string; bg: string; border: string; dot?: boolean }> = {
  live:         { label: 'LIVE',          color: 'var(--green)', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)',   dot: true },
  thesis:       { label: 'THESIS',        color: 'var(--fg-3)',  bg: 'transparent',            border: 'var(--border)' },
  enterprise:   { label: 'ENTERPRISE',    color: 'var(--amber)', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)' },
  confidential: { label: 'CONFIDENTIAL',  color: 'var(--amber)', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)' },
};

export function StatusBadge({ variant }: { variant: StatusVariant }) {
  const c = CONFIG[variant];
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        height: 22, padding: '0 8px',
        background: c.bg, border: `1px solid ${c.border}`,
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)', fontSize: 10,
        letterSpacing: '0.08em', color: c.color, flexShrink: 0,
      }}
    >
      {c.dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />}
      {c.label}
    </span>
  );
}
