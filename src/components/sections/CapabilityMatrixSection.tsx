import { MonoChip } from '../MonoChip';
import { OpsCard } from '../OpsCard';
import { SectionLabel } from '../SectionLabel';

const MATRIX = [
  {
    category: 'FRONTEND',
    level: 4,
    chips: [
      'REACT 19', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND CSS',
      'FRAMER MOTION', 'ANGULAR', 'VUE.JS', 'REDUX',
    ],
  },
  {
    category: 'BACKEND',
    level: 3,
    chips: ['NODE.JS', 'EXPRESS.JS', 'LARAVEL', 'PHP', 'REST API', 'PRISMA ORM'],
  },
  {
    category: 'INFRA',
    level: 3,
    chips: [
      'DOCKER', 'GITHUB ACTIONS', 'FLY.IO', 'VERCEL',
      'SUPABASE', 'POSTGRESQL', 'MYSQL',
    ],
  },
  {
    category: 'TESTING',
    level: 4,
    chips: ['PLAYWRIGHT', 'VITEST', 'REACT TESTING LIBRARY', 'SUPERTEST'],
  },
] as const;

function LEDBar({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 6 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i < level ? 'var(--primary)' : 'transparent',
            border: i < level ? 'none' : '1px solid var(--border)',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

export function CapabilityMatrixSection() {
  return (
    <section style={{ padding: '0 0 128px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <SectionLabel>CAPABILITY MATRIX</SectionLabel>

        <OpsCard>
          {MATRIX.map((row, i) => (
            <div key={row.category}>
              <div
                className="matrix-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 80px 1fr',
                  alignItems: 'start',
                  gap: 24,
                  padding: '24px 32px',
                }}
              >
                <span
                  className="t-mono-xs"
                  style={{
                    color: 'var(--fg-1)',
                    letterSpacing: '0.16em',
                    paddingTop: 4,
                    width: 100,
                    flexShrink: 0,
                  }}
                >
                  {row.category}
                </span>
                <LEDBar level={row.level} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {row.chips.map((chip) => (
                    <MonoChip key={chip} interactive>{chip}</MonoChip>
                  ))}
                </div>
              </div>
              {i < MATRIX.length - 1 && (
                <div
                  style={{
                    height: 1,
                    background:
                      'linear-gradient(90deg, rgba(29,111,232,0.2) 0%, rgba(29,111,232,0.05) 40%, transparent 100%)',
                    margin: '0 32px',
                  }}
                />
              )}
            </div>
          ))}
        </OpsCard>
      </div>
    </section>
  );
}
