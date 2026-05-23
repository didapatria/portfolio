interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div>
      <p className="t-mono-xs" style={{ color: 'var(--fg-2)', margin: 0 }}>
        {children}
      </p>
      <div className="accent-line" />
    </div>
  );
}
