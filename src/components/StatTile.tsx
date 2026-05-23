'use client';

import { useEffect, useRef, useState } from 'react';

interface StatTileProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
  isLast?: boolean;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function StatTile({
  value,
  suffix = '',
  label,
  delay,
  isLast = false,
}: StatTileProps) {
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const booted = useRef(
    typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem('bootDone') === '1'
  );

  useEffect(() => {
    if (reduced || booted.current) {
      setDisplay(value);
      setVisible(true);
      return;
    }

    const visTimer = setTimeout(() => setVisible(true), delay);

    const startTime = performance.now() + delay;
    const DURATION = 400;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - t, 2); /* easeOutQuad */
      setDisplay(Math.round(value * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (isLast) {
        sessionStorage.setItem('bootDone', '1');
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      clearTimeout(visTimer);
      cancelAnimationFrame(raf);
    };
  }, [value, delay, reduced, isLast]);

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        minWidth: 180,
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 250ms ease, transform 250ms ease',
        flex: '1 1 180px',
      }}
    >
      {/* accent line */}
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
        }}
      />
      <span
        className="t-display-md"
        style={{
          display: 'block',
          color: 'var(--fg-1)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {display}
        {suffix}
      </span>
      <div
        style={{
          width: 24,
          height: 1,
          background: 'var(--border)',
          margin: '8px 0',
        }}
      />
      <span className="t-mono-xs" style={{ color: 'var(--fg-2)' }}>
        {label}
      </span>
    </div>
  );
}
