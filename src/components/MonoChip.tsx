'use client';

interface MonoChipProps {
  children: React.ReactNode;
  interactive?: boolean;
}

export function MonoChip({ children, interactive = false }: MonoChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        padding: '0 10px',
        background: 'var(--surface-3)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: '10.5px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--fg-1)',
        cursor: interactive ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        transition: interactive ? 'border-color var(--dur-fast) var(--ease-base)' : 'none',
      }}
      onMouseEnter={
        interactive
          ? (e) => {
              (e.currentTarget as HTMLSpanElement).style.borderColor =
                'rgba(59,130,246,0.3)';
            }
          : undefined
      }
      onMouseLeave={
        interactive
          ? (e) => {
              (e.currentTarget as HTMLSpanElement).style.borderColor =
                'var(--border)';
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
