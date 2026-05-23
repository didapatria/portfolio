import Link from 'next/link';
import { MonoChip } from '@/components/MonoChip';

const ENTRY_LINKS = [
  { label: 'Live Dashboard', href: 'https://mrt-station-dashboard.vercel.app',            primary: true },
  { label: 'API Docs',       href: 'https://mrt-station-backend.fly.dev/api/docs',        primary: false },
  { label: 'E2E Report',     href: 'https://didapatria.github.io/mrt-station-dashboard',  primary: false },
  { label: 'GitHub',         href: 'https://github.com/didapatria/mrt-station-dashboard', primary: false },
];

function EntryButtons() {
  return (
    <div className="mrt-entry-btns" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 8, justifyContent: 'start' }}>
      {ENTRY_LINKS.map(({ label, href, primary }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', height: 34, padding: '0 16px',
            background: primary ? 'var(--fg-1)' : 'transparent',
            border: primary ? 'none' : '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-sans)', fontSize: 12,
            fontWeight: primary ? 600 : 400,
            color: primary ? 'var(--bg)' : 'var(--fg-2)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {label} ↗
        </a>
      ))}
    </div>
  );
}

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.1em' }}>{number}</span>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--fg-1)', margin: 0 }}>
        {children}
      </h2>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.65, maxWidth: 680 }}>
      {children}
    </div>
  );
}

function ArchDiagram() {
  const box = (label: string, sub: string, accent: string) => (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderTop: `2px solid ${accent}`,
      borderRadius: 'var(--radius-md)', padding: '12px 16px',
      textAlign: 'center', minWidth: 100,
    }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent, letterSpacing: '0.08em', margin: '0 0 4px' }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', margin: 0, lineHeight: 1.3 }}>{sub}</p>
    </div>
  );

  return (
    <div style={{ background: 'var(--surface-0)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {box('VERCEL', 'Next.js 15 / React 19', '#3b82f6')}
        <span style={{ color: 'var(--fg-4)', fontSize: 14 }}>→</span>
        {box('FLY.IO', 'Express.js / Node.js', '#6366f1')}
        <span style={{ color: 'var(--fg-4)', fontSize: 14 }}>→</span>
        {box('POSTGRESQL', 'Database / Persistent', '#22c55e')}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', textAlign: 'center', margin: '14px 0 0', letterSpacing: '0.04em' }}>
        SSE (real-time) · JWT + Google OAuth · Docker (local dev) · GitHub Actions (CI)
      </p>
    </div>
  );
}

function Challenge({ title, problem, solution, outcome }: { title: string; problem: string; solution: string; outcome: string }) {
  return (
    <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: 16, marginBottom: 24 }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', margin: '0 0 8px' }}>{title}</p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', margin: '0 0 6px', lineHeight: 1.55 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.08em', marginRight: 6 }}>PROBLEM</span>
        {problem}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', margin: '0 0 6px', lineHeight: 1.55 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.08em', marginRight: 6 }}>SOLUTION</span>
        {solution}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-3)', margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>
        {outcome}
      </p>
    </div>
  );
}

const STACK_CHIPS = ['React 19', 'Node.js', 'TypeScript', 'PostgreSQL', 'Playwright', 'SSE', 'Docker', 'JWT', 'Google OAuth'];

export default function MRTPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 96px' }}>
      {/* back link */}
      <Link
        href="/projects"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em', display: 'inline-block', marginBottom: 32, transition: 'color 150ms ease' }}
      >
        ← Back to Projects
      </Link>

      {/* header */}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
        Case Study
      </p>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--fg-1)', margin: '0 0 8px', lineHeight: 1.1 }}>
        MRT Jakarta Dashboard
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-3)', margin: '0 0 20px' }}>
        Apr–May 2026 · Full-stack · Deployed
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 24 }}>
        {STACK_CHIPS.map((c) => <MonoChip key={c}>{c}</MonoChip>)}
      </div>

      {/* Entry buttons — top */}
      <EntryButtons />

      <div style={{ height: 1, background: 'var(--border)', margin: '40px 0' }} />

      {/* 01 Overview */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="01">Overview</SectionTitle>
        <Prose>
          <p style={{ margin: '0 0 12px' }}>
            PT MRT Jakarta needed a centralized platform to manage 15 stations simultaneously — coordinating incident response, tracking real-time operational data, and enabling different staff roles to act on live information. The existing approach relied on fragmented tools and manual coordination, creating delays in incident escalation and limited visibility across the network.
          </p>
          <p style={{ margin: 0 }}>
            I designed and built the full platform as a contract engagement: frontend design system, API architecture, authentication, authorization model, real-time data layer, and deployment pipeline — 15 pages shipping as v2.18.0 with 127 Playwright E2E tests passing in CI.
          </p>
        </Prose>
      </div>

      {/* 02 Architecture */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="02">Architecture</SectionTitle>
        <Prose>
          <p style={{ margin: '0 0 4px' }}>
            Frontend on Vercel (Next.js 15 / React 19), API on Fly.io (Express.js / Node.js), PostgreSQL as the persistent store. Real-time station updates are pushed via Server-Sent Events — the frontend maintains a persistent SSE connection to the API, receiving events as station state changes.
          </p>
        </Prose>
        <ArchDiagram />
      </div>

      {/* 03 Design System */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="03">Design System</SectionTitle>
        <Prose>
          <p style={{ margin: '0 0 12px' }}>
            Built "Operations Terminal" — a purpose-built dark ops-board design system. No component library. Every token, component, and motion primitive was defined from scratch: CSS custom properties for color, typography, and spacing; a component library including OpsCard, StatTile, TerminalBlock, LEDDot, and MonoChip; and a motion grammar (LED pulse, count-up animation, hover transitions) with full reduced-motion support.
          </p>
          <p style={{ margin: 0 }}>
            The system is portable — this portfolio was built on a variant of it. Design ownership is the claim; the shared tokens between the dashboard and the portfolio are the proof.
          </p>
        </Prose>
      </div>

      {/* 04 Key Challenges */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="04">Key Challenges</SectionTitle>
        <Challenge
          title="SSE Reconnection Under Load"
          problem="Server-Sent Events drop silently when the server restarts or the connection times out. Station controllers saw stale data without knowing their connection had dropped."
          solution="Implemented an automatic exponential-backoff reconnection strategy on the client with a visible connection-state indicator in the UI. The API sends a heartbeat event every 15 seconds; the client treats silence beyond 20 seconds as a disconnect and reconnects automatically."
          outcome="Zero reported stale-data incidents after rollout. Connection health is now visible to the operator at all times."
        />
        <Challenge
          title="Multi-role RBAC with Spatie"
          problem="Different staff roles (station controller, supervisor, admin, auditor) needed different views and action sets across the same 15 pages — not just route guards, but per-component permission checks."
          solution="Used Laravel Spatie Permission on the API to define role-permission pairs, then exposed a permissions payload in the JWT. The Next.js frontend reads the payload on mount and conditionally renders action buttons, form fields, and entire panels based on the decoded permissions — no second round-trip."
          outcome="Role enforcement is consistent across all 15 pages with a single shared permissions hook. Adding a new role requires one API change and no frontend changes."
        />
        <Challenge
          title="Interactive Map with 15+ Concurrent Stations"
          problem="The station map needed to show live status for all 15 stations simultaneously — color-coded by incident state — while remaining performant enough to update in real time without full re-renders."
          solution="Station state is held in a Zustand store updated by the SSE stream. The map renders 15 station markers as individual React components keyed by station ID, each subscribing only to its own slice of the store. React renders only the markers whose state changes."
          outcome="Map updates are immediate and smooth at 60fps. No full page re-renders on station state changes."
        />
      </div>

      {/* 05 Testing */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="05">Testing</SectionTitle>
        <Prose>
          <p style={{ margin: '0 0 12px' }}>
            127 Playwright E2E tests cover the full application: authentication flows (JWT + Google OAuth), all 15 pages, incident lifecycle (create → escalate → resolve), RBAC (each role&apos;s permitted and forbidden actions), and real-time update reception.
          </p>
          <p style={{ margin: 0 }}>
            E2E was chosen over unit tests for this domain because the critical behaviors are interaction sequences across multiple pages and real API responses — not isolated functions. The test suite runs on every push via GitHub Actions and the HTML report is published to GitHub Pages.
          </p>
        </Prose>
        <div style={{ marginTop: 16 }}>
          <a
            href="https://didapatria.github.io/mrt-station-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 14px',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', textDecoration: 'none',
              transition: 'border-color 150ms ease, color 150ms ease',
            }}
          >
            View E2E Report ↗
          </a>
        </div>
      </div>

      {/* 06 Links */}
      <div style={{ marginBottom: 40 }}>
        <SectionTitle number="06">Links</SectionTitle>
        <EntryButtons />
        <div style={{ marginTop: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.06em' }}>
            Status: LIVE · v2.18.0 · 260+ commits
          </span>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 0 32px' }} />
      <Link
        href="/projects"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em' }}
      >
        ← Back to Projects
      </Link>
    </main>
  );
}
