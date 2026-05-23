import type { Metadata } from 'next';
import { Bebas_Neue, JetBrains_Mono, Sora } from 'next/font/google';
import { SystemBanner } from '@/components/SystemBanner';
import { PageTransition } from '@/components/PageTransition';
import { ScrollToTop } from '@/components/ScrollToTop';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adinda Fadhil Patria — Fullstack Engineer',
  description:
    'I ship complete systems end-to-end: design tokens to E2E tests to Fly.io. Based in Jakarta.',
  metadataBase: new URL('https://didapatria.dev'),
  openGraph: {
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description:
      'Operations Terminal portfolio — Next.js, TypeScript, Playwright, Fly.io.',
    url: 'https://didapatria.dev',
    siteName: 'Adinda Fadhil Patria',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description:
      'Operations Terminal portfolio — Next.js, TypeScript, Playwright, Fly.io.',
  },
};

/* Anti-flash: runs before React hydrates — sets dark/light class from localStorage */
const themeScript = `(function(){
  try {
    var s = localStorage.getItem('theme');
    var d = document.documentElement;
    if (s === 'light') { d.classList.add('light'); d.classList.remove('dark'); }
    else if (s === 'dark') { d.classList.add('dark'); d.classList.remove('light'); }
    else {
      var sys = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (sys) d.classList.add('light');
      else d.classList.add('dark');
    }
  } catch(e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${jetBrainsMono.variable} ${sora.variable}`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SystemBanner />
        <PageTransition>{children}</PageTransition>
        <ScrollToTop />
      </body>
    </html>
  );
}
