import { MonoChip } from './MonoChip';

interface SkillCategory {
  label: string;
  chips: string[];
}

export function SkillGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {categories.map(({ label, chips }) => (
        <div key={label} style={{ display: 'grid', gridTemplateColumns: '76px 1fr', gap: '4px 10px', alignItems: 'start' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: 2 }}>
            {label}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {chips.map((chip) => <MonoChip key={chip}>{chip}</MonoChip>)}
          </div>
        </div>
      ))}
    </div>
  );
}
