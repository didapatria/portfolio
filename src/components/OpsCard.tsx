interface OpsCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function OpsCard({ children, style, className }: OpsCardProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            'linear-gradient(90deg, var(--primary) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />
      {children}
    </div>
  );
}
