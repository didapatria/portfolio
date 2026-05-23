interface LEDDotProps {
  pulse?: boolean;
  size?: number;
  color?: string;
}

export function LEDDot({ pulse = false, size = 6, color = 'var(--status-active)' }: LEDDotProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`,
        flexShrink: 0,
        animation: pulse ? 'led-pulse 2.4s ease-in-out infinite' : 'none',
      }}
    />
  );
}
