'use client';

import { ProjectCard } from '@/components/ProjectCard';
import { StatTile } from '@/components/StatTile';
import { TimelineItem } from '@/components/TimelineItem';
import { SkillGrid } from '@/components/SkillGrid';
import { CertAccordion } from '@/components/CertAccordion';
import { ExternalLink, ArrowRight } from 'lucide-react';

// ── HOME DATA ────────────────────────────────────

const MRT_LINKS = [
  { label: 'Live Dashboard', href: 'https://mrt-station-dashboard.vercel.app', primary: true },
  { label: 'Case Study',     href: '/mrt' },
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
    location: 'South Jakarta · Retail Technology',
    badge: 'confidential' as const,
    subRoles: [
      {
        title: 'Software Engineer Specialist',
        period: 'Jan 2026 – May 2026',
        bullets: [
          'Designed and developed scalable web and hybrid mobile apps for retail operations',
          'Built and maintained backend: RESTful APIs, scheduled jobs, automation (Laravel + SQL)',
          'Improved frontend maintainability and performance across multiple apps',
          'Collaborated with QA, product, and design to deliver production-ready solutions',
        ],
        chips: ['Laravel', 'Vue.js', 'React', 'Angular', 'Ionic', 'TypeScript', 'Tailwind', 'MySQL'],
      },
      {
        title: 'Junior Software Engineer',
        period: 'Apr 2024 – Jan 2026',
        bullets: [
          'Fullstack features across Laravel, Vue.js, Angular, and Ionic Framework',
          'REST API integration and data processing workflows for internal business systems',
          'Automation: scheduled jobs, background workers, import/export modules',
          'Debugging, maintenance, and production support for system reliability',
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

const TOP_SKILLS = [
  { name: 'React 19',   level: 90, label: 'Expert' },
  { name: 'TypeScript', level: 85, label: 'Expert' },
  { name: 'Next.js',    level: 80, label: 'Advanced' },
  { name: 'Node.js',    level: 75, label: 'Advanced' },
  { name: 'Playwright', level: 80, label: 'Advanced' },
  { name: 'Laravel',    level: 70, label: 'Proficient' },
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

// ── HELPERS ──────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-4)', margin: '0 0 20px' }}>
      {children}
    </p>
  );
}

function LabeledDivider({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '40px 0 20px' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────

export default function HomePage() {
  return (
    <main id="main">
      {/* ── HOME ─────────────────────────────── */}
      <section id="home" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px' }}>
        <div style={{ paddingTop: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '6px 12px 6px 10px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 'var(--radius-sm)' }}>
            <span className="availability-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Available for engagement
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(56px, 7vw, 80px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: 'var(--fg-1)',
              margin: '0 0 16px',
            }}
          >
            Adinda<br />Fadhil Patria
          </h1>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.04em', margin: '0 0 20px' }}>
            Fullstack Engineer · South Jakarta, ID
          </p>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.6, maxWidth: 560, margin: '0 0 32px' }}>
            I ship complete systems end-to-end — design tokens to E2E tests to Fly.io.
            Two years operating. Currently on shift at MRT Jakarta.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 18px',
                background: 'var(--fg-1)', borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                color: 'var(--bg)', textDecoration: 'none',
                transition: 'opacity var(--dur-fast) ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
            >
              View Projects <ArrowRight size={14} />
            </a>
            <a
              href="https://github.com/didapatria"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 18px',
                background: 'transparent', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)', fontSize: 13,
                color: 'var(--fg-2)', textDecoration: 'none',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(59,130,246,0.3)'; el.style.color = 'var(--fg-1)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--fg-2)'; }}
            >
              GitHub <ExternalLink size={14} />
            </a>
            <a
              href="https://linkedin.com/in/didapatria"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 18px',
                background: 'transparent', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)', fontSize: 13,
                color: 'var(--fg-2)', textDecoration: 'none',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(59,130,246,0.3)'; el.style.color = 'var(--fg-1)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--fg-2)'; }}
            >
              LinkedIn <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <LabeledDivider>Featured Work</LabeledDivider>

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

              <LabeledDivider>Education</LabeledDivider>

              {EDUCATION.map((item, i) => (
                <TimelineItem key={i} {...item} isLast={i === EDUCATION.length - 1} />
              ))}
            </div>

            {/* Skills + Certs */}
            <div>
              <SectionLabel>Skills</SectionLabel>
              <SkillGrid topSkills={TOP_SKILLS} categories={SKILLS} />

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
                { label: 'Case Study',     href: '/mrt' },
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
    </main>
  );
}
