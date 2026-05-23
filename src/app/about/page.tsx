import { TimelineItem } from '@/components/TimelineItem';
import { SkillGrid } from '@/components/SkillGrid';
import { CertAccordion } from '@/components/CertAccordion';

const WORK = [
  {
    org: 'PT MRT Jakarta',
    role: 'Software Engineer (Contract)',
    period: 'May 2026 – Present',
    stack: 'React.js · Redux · Express.js · JavaScript · Material UI · PostgreSQL',
    isActive: true,
  },
  {
    org: 'Alturian Group',
    role: 'Software Engineer Specialist',
    period: 'Jan 2026 – May 2026',
    stack: 'Laravel · Vue.js · React.js · Angular · Ionic · TypeScript · MySQL',
    badge: 'confidential' as const,
  },
  {
    org: 'Alturian Group',
    role: 'Junior Software Engineer',
    period: 'Apr 2024 – Jan 2026',
    stack: 'Laravel · Vue.js · Angular · Ionic · MySQL',
    badge: 'confidential' as const,
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-4)', margin: '0 0 20px' }}>
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 96px' }}>
      <div
        className="about-grid"
        style={{ display: 'grid', gridTemplateColumns: '60fr 40fr', gap: 64, alignItems: 'start' }}
      >
        {/* ── LEFT: Timeline ── */}
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

        {/* ── RIGHT: Skills + Certs ── */}
        <div>
          <SectionLabel>Skills</SectionLabel>
          <SkillGrid categories={SKILLS} />

          <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />

          <CertAccordion certs={CERTS} />
        </div>
      </div>
    </main>
  );
}
