import { ProjectCard } from '@/components/ProjectCard';

export default function ProjectsPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 96px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-4)', margin: '0 0 32px' }}>
        Projects
      </p>

      {/* Row 1: MRT featured */}
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

      {/* Row 2: two-up */}
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
    </main>
  );
}
