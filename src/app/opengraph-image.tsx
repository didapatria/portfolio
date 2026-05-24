import { ImageResponse } from 'next/og';

export const alt = 'Adinda Fadhil Patria — Fullstack Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#09090b',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#fafafa',
          position: 'relative',
        }}
      >
        {/* top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #3b82f6 0%, transparent 100%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#22c55e',
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              letterSpacing: 2,
              color: '#22c55e',
              textTransform: 'uppercase',
            }}
          >
            Available for engagement
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
              color: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Adinda Fadhil Patria</span>
            <span style={{ fontSize: 36, color: '#a1a1aa', fontWeight: 500, letterSpacing: -1, marginTop: 16 }}>
              Fullstack Engineer
            </span>
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 22,
              color: '#71717a',
              letterSpacing: 1,
              display: 'flex',
            }}
          >
            React · Node.js · Playwright · Jakarta, ID
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #27272a',
            paddingTop: 24,
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: 16, color: '#71717a', letterSpacing: 1.5 }}>
            didapatria.dev
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: 16, color: '#3f3f46', letterSpacing: 1.5 }}>
            v3.0.0
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
