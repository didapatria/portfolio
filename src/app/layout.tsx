import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { PageTransition } from '@/components/PageTransition';
import { ScrollToTop } from '@/components/ScrollToTop';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adinda Fadhil Patria — Fullstack Engineer',
  description: 'I ship complete systems end-to-end: design tokens to E2E tests to Fly.io. Based in Jakarta.',
  metadataBase: new URL('https://didapatria.dev'),
  openGraph: {
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description: 'Portfolio — Next.js, TypeScript, Playwright, Fly.io.',
    url: 'https://didapatria.dev',
    siteName: 'Adinda Fadhil Patria',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adinda Fadhil Patria — Fullstack Engineer',
    description: 'Portfolio — Next.js, TypeScript, Playwright, Fly.io.',
  },
  icons: {
    icon: '/didapatria.svg',
    shortcut: '/didapatria.svg',
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.classList.add(t==='light'||t==='dark'?t:p);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <ScrollToTop />
      </body>
    </html>
  );
}
