'use client';

import { ProjectCard } from '@/components/ProjectCard';
import { StatTile } from '@/components/StatTile';
import { TimelineItem } from '@/components/TimelineItem';
import { SkillGrid } from '@/components/SkillGrid';
import { CertAccordion } from '@/components/CertAccordion';
import { MonoChip } from '@/components/MonoChip';

// ── HOME DATA ────────────────────────────────────

const MRT_LINKS = [
  { label: 'Live Dashboard', href: 'https://mrt-station-dashboard.vercel.app', primary: true },
  { label: 'Case Study',     href: '#mrt' },
  { label: 'API Docs',       href: 'https://mrt-station-backend.fly.dev/api/docs' },
  { label: 'GitHub',         href: 'https://github.com/didapatria/mrt-station-dashboard' },
];

const STATS = [
  { value: 127, suffix: '',  label: 'E2E PASSING',  delay: 100 },
  { value: 2,   suffix: '+', label: 'YRS SHIPPING', delay: 280 },
  { value: 3,   suffix: '',  label: 'LIVE DEPLOYS', delay: 460, isLast: true as const },
];

// ── ABOUT DATA ───────────────────────────────────

const WORK = [
  {
    org: 'PT MRT Jakarta',
    role: 'Software Engineer (Contract)',
    period: 'May 2026 – Present',
    isActive: true,
    bullets: [
      'Built full-stack ops platform for 15 stations — real-time SSE, Incident Management, RBAC, i18n, PWA, PDF export',
      '127 Playwright E2E tests in CI, 260+ commits, shipped as v2.18.0',
    ],
    chips: ['React.js', 'Redux', 'Express.js', 'TypeScript', 'PostgreSQL', 'Material UI'],
  },
  {
    org: 'Alturian Group',
    period: 'Apr 2024 – May 2026',
    badge: 'confidential' as const,
    subRoles: [
      {
        title: 'Software Engineer Specialist',
        period: 'Jan 2026 – May 2026',
        bullets: [
          'Led enterprise e-commerce and ERP development for retail industry clients',
          'Extended existing Vue/Angular codebases with React and TypeScript modules',
        ],
        chips: ['Laravel', 'Vue.js', 'React.js', 'Angular', 'Ionic', 'TypeScript', 'MySQL'],
      },
      {
        title: 'Junior Software Engineer',
        period: 'Apr 2024 – Jan 2026',
        bullets: [
          'Developed customer-facing mobile apps with Ionic Framework',
          'Built internal tools and reports in Laravel + Vue.js for live retail clients',
        ],
        chips: ['Laravel', 'Vue.js', 'Angular', 'Ionic', 'MySQL'],
      },
    ],
  },
];

const EDUCATION = [
  {
    org: 'Universitas Pasundan',
    role: 'B.Tech Informatics Engineering · GPA 3.70/4.00',
    period: '2019 – 2023',
    stack: 'MBKM Independent Study Track · Focus: Frontend JavaScript',
  },
  {
    org: 'Binar Academy',
    role: 'Independent Study – Front-End JavaScript',
    period: 'Feb – Jul 2022',
    stack: 'Final Score: Very Good · React.js · Tailwind CSS · Redux',
    isLast: true,
  },
];

const SKILLS = [
  { label: 'Frontend', chips: ['React 19', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'Material UI', 'Framer Motion'] },
  { label: 'Backend',  chips: ['Node.js', 'Express.js', 'Laravel', 'PHP', 'REST API', 'Prisma ORM'] },
  { label: 'Infra',    chips: ['Docker', 'GitHub Actions', 'Fly.io', 'Vercel', 'Supabase', 'PostgreSQL', 'MySQL'] },
  { label: 'Testing',  chips: ['Playwright', 'Vitest', 'React Testing Library', 'Supertest'] },
  { label: 'Mobile',   chips: ['Ionic Framework'] },
];

const CERTS = [
  { name: 'Master Laravel for Beginners & Intermediate',         issuer: 'Udemy',          date: 'Jun 2024' },
  { name: 'Vue – The Complete Guide (Router & Composition API)', issuer: 'Udemy',          date: 'Jun 2024' },
  { name: 'Angular – The Complete Guide',                        issuer: 'Udemy',          date: 'May 2024' },
  { name: 'Ionic – Build iOS, Android & Web Apps',               issuer: 'Udemy',          date: 'May 2024' },
  { name: "Next.js – The Complete Developer's Guide",            issuer: 'Udemy',          date: 'Apr 2024' },
  { name: 'Front-End JavaScript (SIB Kampus Merdeka)',           issuer: 'Binar Academy',  date: 'Aug 2022' },
];

// ── MRT DATA ─────────────────────────────────────

const STACK_CHIPS = ['React 19', 'Node.js', 'TypeScript', 'PostgreSQL', 'Playwright', 'SSE', 'Docker', 'JWT', 'Google OAuth'];

const ENTRY_LINKS = [
  { label: 'Live Dashboard', href: 'https://mrt-station-dashboard.vercel.app',            primary: true },
  { label: 'API Docs',       href: 'https://mrt-station-backend.fly.dev/api/docs',        primary: false },
  { label: 'E2E Report',     href: 'https://didapatria.github.io/mrt-station-dashboard',  primary: false },
  { label: 'GitHub',         href: 'https://github.com/didapatria/mrt-station-dashboard', primary: false },
];

// ── HELPERS ──────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-4)', margin: '0 0 20px' }}>
      {children}
    </p>
  );
}

function EntryButtons() {
  return (
    <div className="mrt-entry-btns" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 8, justifyContent: 'start' }}>
      {ENTRY_LINKS.map(({ label, href, primary }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
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

function MrtSectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
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

// ── PAGE ─────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      {/* ── HOME ─────────────────────────────── */}
      <section id="home" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px' }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '55fr 45fr',
            gap: 48,
            alignItems: 'start',
            minHeight: 'calc(100vh - 144px)',
          }}
        >
          {/* bio */}
          <div style={{ paddingTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.08em' }}>
                Available for engagement
              </span>
            </div>

            <h1 className="t-display" style={{ color: 'var(--fg-1)', margin: '0 0 12px' }}>
              Adinda<br />Fadhil Patria
            </h1>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.04em', margin: '0 0 20px' }}>
              Fullstack Engineer · South Jakarta, ID
            </p>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6, maxWidth: 440, margin: '0 0 32px' }}>
              I ship complete systems end-to-end — design tokens to E2E tests to Fly.io.
              Two years operating. Currently on shift at MRT Jakarta.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href="#projects"
                style={{
                  display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 18px',
                  background: 'var(--fg-1)', borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                  color: 'var(--bg)', textDecoration: 'none',
                }}
              >
                View Projects →
              </a>
              <a
                href="https://github.com/didapatria"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 18px',
                  background: 'transparent', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-sans)', fontSize: 13,
                  color: 'var(--fg-2)', textDecoration: 'none',
                  transition: 'border-color 150ms ease, color 150ms ease',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(59,130,246,0.3)'; el.style.color = 'var(--fg-1)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--fg-2)'; }}
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/didapatria"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 18px',
                  background: 'transparent', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-sans)', fontSize: 13,
                  color: 'var(--fg-2)', textDecoration: 'none',
                  transition: 'border-color 150ms ease, color 150ms ease',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(59,130,246,0.3)'; el.style.color = 'var(--fg-1)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--fg-2)'; }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* MRT card + stats */}
          <div style={{ paddingTop: 40 }}>
            <ProjectCard
              variant="featured"
              title="MRT Jakarta Dashboard"
              period="Apr–May 2026"
              status="live"
              description="Full-stack ops platform for PT MRT Jakarta — 15 pages, real-time SSE, Incident Management, JWT + Google OAuth, Spatie RBAC, interactive maps, i18n, PWA, PDF export."
              stackChips={['React 19', 'Node.js', 'TypeScript', 'PostgreSQL', 'Playwright', 'SSE', 'Docker']}
              metrics={['15 PAGES', '127 E2E TESTS', '260+ COMMITS']}
              links={MRT_LINKS}
            />

            <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
              {STATS.map((s) => (
                <StatTile
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delay={s.delay}
                  isLast={s.isLast ?? false}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href="#projects"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)',
              letterSpacing: '0.06em', transition: 'color 150ms ease', textDecoration: 'none',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-4)'; }}
          >
            Selected Work →
          </a>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────── */}
      <section id="about" style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 96px' }}>
          <div
            className="about-grid"
            style={{ display: 'grid', gridTemplateColumns: '60fr 40fr', gap: 64, alignItems: 'start' }}
          >
            {/* Timeline */}
            <div>
              <SectionLabel>Experience</SectionLabel>
              {WORK.map((item, i) => (
                <TimelineItem key={i} {...item} isLast={i === WORK.length - 1} />
              ))}

              <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />

              <SectionLabel>Education</SectionLabel>
              {EDUCATION.map((item, i) => (
                <TimelineItem key={i} {...item} isLast={i === EDUCATION.length - 1} />
              ))}
            </div>

            {/* Skills + Certs */}
            <div>
              <SectionLabel>Skills</SectionLabel>
              <SkillGrid categories={SKILLS} />

              <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />

              <CertAccordion certs={CERTS} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────── */}
      <section id="projects" style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 96px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-4)', margin: '0 0 32px' }}>
            Projects
          </p>

          <div style={{ marginBottom: 14 }}>
            <ProjectCard
              variant="featured"
              title="MRT Jakarta Dashboard"
              period="Apr–May 2026"
              status="live"
              description="Full-stack ops platform for PT MRT Jakarta — 15 pages, real-time SSE, Incident Management, JWT + Google OAuth, Spatie RBAC, interactive maps, i18n, PWA, PDF export."
              stackChips={['React 19', 'Node.js', 'TypeScript', 'PostgreSQL', 'Playwright', 'SSE', 'Docker']}
              metrics={['15 PAGES', '127 E2E TESTS', '260+ COMMITS', 'v2.18.0']}
              links={[
                { label: 'Live Dashboard', href: 'https://mrt-station-dashboard.vercel.app', primary: true },
                { label: 'Case Study',     href: '#mrt' },
                { label: 'API Docs',       href: 'https://mrt-station-backend.fly.dev/api/docs' },
                { label: 'GitHub',         href: 'https://github.com/didapatria/mrt-station-dashboard' },
              ]}
            />
          </div>

          <div
            className="projects-two-up"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
          >
            <ProjectCard
              variant="standard"
              title="Ruas — Online Exam Monitoring"
              period="Feb–Nov 2023"
              status="thesis"
              description="Real-time online exam monitoring with ML-based proctoring. Thesis project — face and gaze tracking with TensorFlow."
              stackChips={['React', 'Python Flask', 'TensorFlow', 'Redux Toolkit', 'Tailwind']}
              links={[
                { label: 'Frontend', href: 'https://github.com/didapatria/fe_ruas_client' },
                { label: 'Backend',  href: 'https://github.com/didapatria/be_ruas_server' },
              ]}
            />

            <ProjectCard
              variant="standard"
              title="Alturian Group — Enterprise Systems"
              period="Apr 2024 – May 2026"
              status="enterprise"
              description="Enterprise systems for retail industry — e-commerce, ERP, POS, loyalty, SaaS, and mobile apps serving live customers."
              stackChips={['Laravel', 'Vue.js', 'React', 'Angular', 'Ionic', 'MySQL']}
              confidential
            />
          </div>
        </div>
      </section>

      {/* ── MRT CASE STUDY ───────────────────── */}
      <section id="mrt" style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 96px' }}>
          {/* back link */}
          <a
            href="#projects"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em', display: 'inline-block', marginBottom: 32, transition: 'color 150ms ease', textDecoration: 'none' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-4)'; }}
          >
            ← Back to Projects
          </a>

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

          <EntryButtons />

          <div style={{ height: 1, background: 'var(--border)', margin: '40px 0' }} />

          <div style={{ marginBottom: 40 }}>
            <MrtSectionTitle number="01">Overview</MrtSectionTitle>
            <Prose>
              <p style={{ margin: '0 0 12px' }}>
                PT MRT Jakarta needed a centralized platform to manage 15 stations simultaneously — coordinating incident response, tracking real-time operational data, and enabling different staff roles to act on live information. The existing approach relied on fragmented tools and manual coordination, creating delays in incident escalation and limited visibility across the network.
              </p>
              <p style={{ margin: 0 }}>
                I designed and built the full platform as a contract engagement: frontend design system, API architecture, authentication, authorization model, real-time data layer, and deployment pipeline — 15 pages shipping as v2.18.0 with 127 Playwright E2E tests passing in CI.
              </p>
            </Prose>
          </div>

          <div style={{ marginBottom: 40 }}>
            <MrtSectionTitle number="02">Architecture</MrtSectionTitle>
            <Prose>
              <p style={{ margin: '0 0 4px' }}>
                Frontend on Vercel (Next.js 15 / React 19), API on Fly.io (Express.js / Node.js), PostgreSQL as the persistent store. Real-time station updates are pushed via Server-Sent Events — the frontend maintains a persistent SSE connection to the API, receiving events as station state changes.
              </p>
            </Prose>
            <ArchDiagram />
          </div>

          <div style={{ marginBottom: 40 }}>
            <MrtSectionTitle number="03">Design System</MrtSectionTitle>
            <Prose>
              <p style={{ margin: '0 0 12px' }}>
                Built &ldquo;Operations Terminal&rdquo; — a purpose-built dark ops-board design system. No component library. Every token, component, and motion primitive was defined from scratch: CSS custom properties for color, typography, and spacing; a component library including OpsCard, StatTile, TerminalBlock, LEDDot, and MonoChip; and a motion grammar (LED pulse, count-up animation, hover transitions) with full reduced-motion support.
              </p>
              <p style={{ margin: 0 }}>
                The system is portable — this portfolio was built on a variant of it. Design ownership is the claim; the shared tokens between the dashboard and the portfolio are the proof.
              </p>
            </Prose>
          </div>

          <div style={{ marginBottom: 40 }}>
            <MrtSectionTitle number="04">Key Challenges</MrtSectionTitle>
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

          <div style={{ marginBottom: 40 }}>
            <MrtSectionTitle number="05">Testing</MrtSectionTitle>
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

          <div style={{ marginBottom: 40 }}>
            <MrtSectionTitle number="06">Links</MrtSectionTitle>
            <EntryButtons />
            <div style={{ marginTop: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.06em' }}>
                Status: LIVE · v2.18.0 · 260+ commits
              </span>
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '0 0 32px' }} />
          <a
            href="#projects"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.06em', textDecoration: 'none', transition: 'color 150ms ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-4)'; }}
          >
            ← Back to Projects
          </a>
        </div>
      </section>
    </main>
  );
}
