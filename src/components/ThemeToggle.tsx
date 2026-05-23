'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'dark' | 'light';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    /* Read current state from html class set by anti-flash script */
    const html = document.documentElement;
    const current = html.classList.contains('light') ? 'light' : 'dark';
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(next);
    localStorage.setItem('theme', next);
    setTheme(next);
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
        transition:
          'border-color var(--dur-fast) ease, color var(--dur-fast) ease',
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
