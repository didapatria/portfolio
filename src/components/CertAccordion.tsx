'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Cert {
  name: string;
  issuer: string;
  date: string;
}

export function CertAccordion({ certs }: { certs: Cert[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.06em', color: 'var(--fg-3)',
        }}
      >
        {certs.length} CERTIFICATIONS
        <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }}>
          <ChevronDown size={12} />
        </span>
      </button>

      <div className={`cert-list${open ? ' open' : ''}`}>
        <div className="cert-list-inner">
          <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {certs.map((cert) => (
              <div key={cert.name}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', margin: '0 0 1px', lineHeight: 1.4 }}>
                  {cert.name}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', margin: 0, letterSpacing: '0.04em' }}>
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
