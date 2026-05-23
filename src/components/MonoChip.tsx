interface MonoChipProps {
  children: React.ReactNode;
}

export function MonoChip({ children }: MonoChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 22,
        padding: '0 8px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--fg-2)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}
