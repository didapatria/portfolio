import type { Metadata } from 'next';
import { Bebas_Neue, JetBrains_Mono, Sora } from 'next/font/google';
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
      <body>{children}</body>
    </html>
  );
}
