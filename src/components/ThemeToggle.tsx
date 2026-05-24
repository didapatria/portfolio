'use client';

import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

function subscribe(callback: () => void) {
  const obs = new MutationObserver(callback);
  obs.observe(document.documentElement, { attributeFilter: ['class'] });
  return () => obs.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'dark');

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(next);
    localStorage.setItem('theme', next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        background: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--fg-2)',
        cursor: 'pointer',
        transition: 'border-color var(--dur-fast) ease, color var(--dur-fast) ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = 'rgba(59,130,246,0.4)';
        el.style.color = 'var(--primary)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = 'var(--border)';
        el.style.color = 'var(--fg-2)';
      }}
    >
      {theme === 'dark' ? <Sun size={11} /> : <Moon size={11} />}
    </button>
  );
}
