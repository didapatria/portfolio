# Adinda Fadhil Patria — Portfolio

Operations Terminal design system portfolio.

**Live:** https://didapatria.dev *(placeholder — update after first Vercel deploy)*

## Tech Stack

- Next.js 16 (App Router)
- Tailwind v4
- Framer Motion
- TypeScript strict
- Google Fonts: Bebas Neue · JetBrains Mono · Sora
- Vercel

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run lint
```

## Environment

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BUILD_SHA` | Git commit SHA (auto-set by Vercel CI) |
| `NEXT_PUBLIC_BUILD_DATE` | Deploy date YYYY-MM-DD (auto-set by `next.config.ts`) |

## Deploy

Push to `main` — Vercel auto-deploys. Build SHA is injected via Vercel's system environment variable `VERCEL_GIT_COMMIT_SHA`.

Set in Vercel project settings:
```
NEXT_PUBLIC_BUILD_SHA = $VERCEL_GIT_COMMIT_SHA
```
