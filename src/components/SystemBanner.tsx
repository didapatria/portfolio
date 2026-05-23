'use client';

import { useEffect, useRef, useState } from 'react';
import { LEDDot } from './LEDDot';
import { ThemeToggle } from './ThemeToggle';

export function SystemBanner() {
  const [hhmm, setHhmm] = useState('--:--');
  const [ss, setSs] = useState('--');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const tick = () => {
      const parts = fmt.formatToParts(new Date());
      const h = parts.find((p) => p.type === 'hour')?.value ?? '00';
      const m = parts.find((p) => p.type === 'minute')?.value ?? '00';
      const s = parts.find((p) => p.type === 'second')?.value ?? '00';
      setHhmm(`${h}:${m}`);
      setSs(s);
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 32,
        background: 'var(--surface-0)',
        borderBottom: '1px solid var(--border)',
        zIndex: 50,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      {/* Left — LED + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <LEDDot pulse />
        <span className="t-mono-xs" style={{ color: 'var(--fg-2)' }}>
          ACTIVE
          <span className="banner-full-text"> · AVAILABLE FOR ENGAGEMENT</span>
        </span>
      </div>

      {/* Center — live clock */}
      <div
        className="banner-clock"
        style={{
          justifySelf: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          className="t-mono-tabular"
          style={{ color: 'var(--fg-2)', fontSize: '9.5px', letterSpacing: '0.08em' }}
        >
          ID-JKT · UTC+7 · {hhmm}
        </span>
        <span
          style={{
            color: 'var(--fg-2)',
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            animation: 'colon-blink 1s steps(2) infinite',
          }}
        >
          :
        </span>
        <span
          className="t-mono-tabular"
          style={{ color: 'var(--fg-2)', fontSize: '9.5px', letterSpacing: '0.08em' }}
        >
          {ss}
        </span>
      </div>

      {/* Right — version + theme toggle */}
      <div
        className="banner-version"
        style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <span className="t-mono-xs" style={{ color: 'var(--fg-2)' }}>
          PORTFOLIO v1.0.0
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
