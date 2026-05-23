'use client';

import { useState } from 'react';
import { MonoChip } from '../MonoChip';
import { OpsCard } from '../OpsCard';
import { SectionLabel } from '../SectionLabel';

export function DeploymentLogSection() {
  const [alturianExpanded, setAlturianExpanded] = useState(false);

  const rowBase: React.CSSProperties = {
    display: 'flex',
    gap: 24,
    padding: '24px 32px',
    transition: 'box-shadow var(--dur-fast) ease',
  };

  return (
    <section style={{ padding: '0 0 128px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <SectionLabel>DEPLOYMENT LOG</SectionLabel>

        <OpsCard>
          {/* ── Row 1: Ruas ── */}
          <div
            style={rowBase}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                'inset 2px 0 0 rgba(29,111,232,0.6)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ flexShrink: 0, width: 80 }}>
              <span
                className="t-mono-data"
                style={{
                  color: 'var(--fg-3)',
                  fontSize: 11,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                2023
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: '0 0 4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--fg-1)',
                }}
              >
                Ruas — Online Exam Monitoring
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                  marginBottom: 8,
                }}
              >
                <span className="t-body-sm" style={{ color: 'var(--fg-2)' }}>
                  Thesis · ML proctoring
                </span>
                {['REACT', 'FLASK', 'TENSORFLOW'].map((c) => (
                  <MonoChip key={c}>{c}</MonoChip>
                ))}
              </div>
              <p
                className="t-body-sm"
                style={{ color: 'var(--fg-2)', margin: 0, maxWidth: 560 }}
              >
                Real-time face and gaze tracking with TensorFlow. B.Tech thesis.
              </p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <a
                href="https://github.com/didapatria/fe_ruas_client"
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono-xs"
                style={{
                  color: 'var(--fg-2)',
                  transition: 'color var(--dur-fast) ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--fg-2)';
                }}
              >
                GITHUB ↗
              </a>
            </div>
          </div>

          {/* divider */}
          <div style={{ height: 1, background: 'var(--border)', margin: '0 32px' }} />

          {/* ── Row 2: Alturian ── */}
          <div
            style={{ ...rowBase, cursor: 'pointer', flexDirection: 'column' }}
            onClick={() => setAlturianExpanded((v) => !v)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                'inset 2px 0 0 rgba(29,111,232,0.6)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ flexShrink: 0, width: 80 }}>
                <span
                  className="t-mono-data"
                  style={{ color: 'var(--fg-3)', fontSize: 11 }}
                >
                  2024–
                  <br />
                  2026
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: '0 0 4px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'var(--fg-1)',
                  }}
                >
                  Alturian Group — Enterprise Systems
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                    marginBottom: 8,
                  }}
                >
                  <span className="t-body-sm" style={{ color: 'var(--fg-2)' }}>
                    Software Engineer Specialist
                  </span>
                  {['LARAVEL', 'VUE', 'REACT', 'ANGULAR', 'IONIC'].map((c) => (
                    <MonoChip key={c}>{c}</MonoChip>
                  ))}
                  <span style={{ color: 'var(--fg-3)', fontSize: 12 }}>
                    {alturianExpanded ? '▴' : '▾'}
                  </span>
                </div>
                <p
                  className="t-body-sm"
                  style={{ color: 'var(--fg-2)', margin: 0, maxWidth: 560 }}
                >
                  e-commerce · ERP · POS · loyalty · SaaS — production systems
                  serving live customers.
                </p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 24,
                    padding: '0 12px',
                    background: 'rgba(107,114,128,0.08)',
                    border: '1px solid rgba(107,114,128,0.25)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <span
                    className="t-mono-xs"
                    style={{ color: 'var(--status-idle)' }}
                  >
                    CONFIDENTIAL
                  </span>
                </span>
              </div>
            </div>

            {/* expand panel — grid-template-rows trick */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: alturianExpanded ? '1fr' : '0fr',
                transition: 'grid-template-rows 200ms ease',
                marginLeft: 104,
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    paddingTop: 16,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  {['E-COMMERCE', 'ERP', 'POS', 'LOYALTY', 'SAAS PLATFORMS'].map(
                    (s) => (
                      <MonoChip key={s}>{s}</MonoChip>
                    )
                  )}
                </div>
                <p
                  className="t-body-sm"
                  style={{
                    color: 'var(--fg-2)',
                    marginTop: 12,
                    fontStyle: 'italic',
                  }}
                >
                  No live demos available — production systems serving live
                  customers.
                </p>
              </div>
            </div>
          </div>

          {/* dashed divider */}
          <div
            style={{
              height: 1,
              background:
                'repeating-linear-gradient(90deg, var(--border) 0, var(--border) 4px, transparent 4px, transparent 8px)',
              margin: '0 32px',
            }}
          />

          {/* ── Row 3: Placeholder ── */}
          <div style={{ ...rowBase, cursor: 'default' }}>
            <div style={{ flexShrink: 0, width: 80 }}>
              <span
                className="t-mono-data"
                style={{ color: 'var(--fg-3)', fontSize: 11 }}
              >
                202?
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 8 }}>
                <MonoChip>NEXT DEPLOYMENT</MonoChip>
              </div>
              <p
                className="t-body-sm"
                style={{ color: 'var(--fg-2)', margin: 0, fontStyle: 'italic' }}
              >
                Currently provisioning.
              </p>
            </div>
          </div>
        </OpsCard>
      </div>
    </section>
  );
}
