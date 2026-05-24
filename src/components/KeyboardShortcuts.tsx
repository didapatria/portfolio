'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const ROUTES: Record<string, string> = {
  h: '/#home',
  a: '/#about',
  p: '/#projects',
  m: '/mrt',
};

export function KeyboardShortcuts() {
  const router = useRouter();
  const pending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();

      if (!pending.current && key === 'g') {
        pending.current = true;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => { pending.current = false; }, 1000);
        return;
      }

      if (pending.current && ROUTES[key]) {
        e.preventDefault();
        router.push(ROUTES[key]);
        pending.current = false;
        if (timer.current) clearTimeout(timer.current);
      } else if (pending.current) {
        pending.current = false;
        if (timer.current) clearTimeout(timer.current);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);

  return null;
}
