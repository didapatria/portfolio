'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MonoChip } from './MonoChip';

interface SkillCategory {
  label: string;
  chips: string[];
}

interface TopSkill {
  name: string;
  level: number;
  label: string;
}

interface SkillGridProps {
  topSkills: TopSkill[];
  categories: SkillCategory[];
}

export function SkillGrid({ topSkills, categories }: SkillGridProps) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {topSkills.map((skill, i) => (
        <div key={skill.name} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 84px', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--fg-1)' }}>
            {skill.name}
          </span>

          <div
            style={{
              position: 'relative',
              height: 4,
              borderRadius: 999,
              background: 'var(--border)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1], delay: i * 0.08 }}
              style={{
                height: '100%',
                background: 'var(--primary)',
                borderRadius: 999,
              }}
            />
          </div>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.06em', textAlign: 'right', textTransform: 'uppercase' }}>
            {skill.label}
          </span>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        style={{
          alignSelf: 'flex-start',
          marginTop: 4,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--fg-3)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {expanded ? 'Hide ▴' : 'Show all skills ▾'}
      </button>

      {expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
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
      )}
    </div>
  );
}
