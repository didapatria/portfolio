"use client";

import Link from "next/link";
import { MonoChip } from "@/components/MonoChip";
import { OpsCard } from "@/components/OpsCard";
import { SectionLabel } from "@/components/SectionLabel";

const CHIPS = [
  "15 PAGES",
  "127 E2E TESTS",
  "290+ COMMITS",
  "v2.18.0",
  "REACT 19",
  "NODE.JS",
  "POSTGRESQL",
  "DOCKER",
  "PLAYWRIGHT",
];

const LINKS = [
  { label: "LIVE DASHBOARD", href: "https://mrt-station-dashboard.vercel.app" },
  { label: "API DOCS", href: "https://mrt-station-backend.fly.dev/api/docs" },
  {
    label: "E2E REPORT",
    href: "https://didapatria.github.io/mrt-station-dashboard",
  },
  {
    label: "SOURCE CODE",
    href: "https://github.com/didapatria/mrt-station-dashboard",
  },
];

export default function MRTCaseStudy() {
  return (
    <main
      style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px 128px" }}
    >
      <Link
        href="/"
        className="t-mono-xs"
        style={{
          color: "var(--fg-2)",
          display: "inline-block",
          marginBottom: 32,
          transition: "color var(--dur-fast) ease",
        }}
      >
        ← BACK TO PORTFOLIO
      </Link>

      <SectionLabel>CASE STUDY</SectionLabel>

      <OpsCard style={{ marginBottom: 32 }}>
        <div style={{ padding: "40px 48px" }}>
          {/* header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <div>
              <h1
                className="t-display-md"
                style={{ color: "var(--fg-1)", margin: 0 }}
              >
                MRT JAKARTA
              </h1>
              <p
                className="t-body"
                style={{ color: "var(--fg-2)", margin: "4px 0 0" }}
              >
                Station Management Dashboard
              </p>
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 24,
                padding: "0 12px",
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "var(--radius-pill)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--status-active)",
                  boxShadow: "0 0 6px var(--status-active-glow)",
                }}
              />
              <span
                className="t-mono-label"
                style={{ color: "var(--status-active)" }}
              >
                DEPLOYED
              </span>
            </span>
          </div>

          <div
            style={{ height: 1, background: "var(--border)", marginBottom: 24 }}
          />

          {/* chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 24,
            }}
          >
            {CHIPS.map((c) => (
              <MonoChip key={c}>{c}</MonoChip>
            ))}
          </div>

          {/* description */}
          <p
            className="t-body"
            style={{
              color: "var(--fg-1)",
              maxWidth: 720,
              lineHeight: 1.55,
              marginBottom: 32,
            }}
          >
            Full-stack operations dashboard for PT MRT Jakarta — 15 pages,
            real-time SSE, Incident Management, JWT + Google OAuth, Spatie RBAC,
            interactive maps, and an Operations Terminal design system. 127
            Playwright E2E tests. Deployed on Fly.io + Vercel.
          </p>

          {/* entry buttons */}
          <div
            className="entry-buttons"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 320px))",
              gap: 12,
            }}
          >
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono-label"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: 48,
                  padding: "0 20px",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--fg-1)",
                  letterSpacing: "0.14em",
                  transition:
                    "background-color 150ms ease, border-color 150ms ease, color 150ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "var(--primary-tint)";
                  el.style.borderColor = "rgba(59,130,246,0.3)";
                  el.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--fg-1)";
                }}
              >
                <span>{label}</span>
                <span>→</span>
              </a>
            ))}
          </div>
        </div>
      </OpsCard>

      <style>{`
        @media (max-width: 767px) {
          .entry-buttons { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
