import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free, open-source tools for education — games, assessment, research instruments, and AI teacher tools from Impact-Edu.ai.",
};

type ToolStatus = "live" | "beta" | "coming-soon";

interface Tool {
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: ToolStatus;
  stat?: { value: string; label: string };
  href: string;
  external?: boolean;
}

const tools: Tool[] = [
  {
    name: "PlayPower Games",
    tagline: "50+ free K-8 math games",
    description:
      "Free educational math games covering half of K-8 topics, available in English and Spanish. Built by Play Power Labs, distributed freely for the field.",
    category: "Games & Learning",
    status: "live",
    stat: { value: "10M+", label: "US students reached" },
    href: "https://playpowergames.com",
    external: true,
  },
  {
    name: "Open Assessment Items",
    tagline: "34K+ CC-licensed K-12 math items",
    description:
      "Creative Commons licensed assessment items with psychometric data, AI generation, LLM evaluation, and 18 interactive math widgets — built on the Learning Commons Knowledge Graph.",
    category: "Assessment & Data",
    status: "live",
    stat: { value: "34K+", label: "CC-licensed items" },
    href: "/openitems",
  },
  {
    name: "SmartPaper",
    tagline: "Computer vision for paper-based assessment",
    description:
      "Teachers print worksheets, students write by hand, AI scores instantly. Deployed across government schools in Rajasthan, India. UNESCO-recognized.",
    category: "Assessment & Data",
    status: "live",
    stat: { value: "5M+", label: "assessments processed" },
    href: "https://www.getsmartpaper.com",
    external: true,
  },
  {
    name: "Item Difficulty Estimator",
    tagline: "LLM-powered difficulty estimation for assessment items",
    description:
      "Estimate assessment item difficulty using chain-of-thought analysis with bias correction. Supports 9 item types and 28 interactive math widgets across K-8. Based on our AIED 2026 research.",
    category: "Research Tools",
    status: "live",
    href: "/tools/difficulty-estimator",
  },
  {
    name: "UpGrade",
    tagline: "Open-source A/B testing for education",
    description:
      "Experimentation platform purpose-built for educational software. Supports multi-armed bandit and factorial designs. Funded by Gates Foundation and Schmidt Futures.",
    category: "Research Tools",
    status: "live",
    stat: { value: "Open", label: "source" },
    href: "https://github.com/CarnegieLearningWeb/UpGrade",
    external: true,
  },
  {
    name: "AI Teacher Tools",
    tagline: "Lesson planning, worksheets, text leveling",
    description:
      "AI-powered tools for teachers: lesson planning, activity planning, worksheet creation, and text leveling. Full K-12 curriculum generation at $25 total cost.",
    category: "AI Tools",
    status: "beta",
    href: "https://playpowergames.com",
    external: true,
  },
];

const statusConfig: Record<ToolStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  beta: {
    label: "Beta",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-surface text-muted border-border",
  },
};

export default function ToolsPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Open Tools
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            Free tools for the field
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Everything we build is open. Games, assessment infrastructure,
            research instruments, and AI tools — free for educators, researchers,
            and developers.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => {
              const status = statusConfig[tool.status];
              const Tag = tool.external ? "a" : Link;
              const linkProps = tool.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <Tag
                  key={tool.name}
                  href={tool.href}
                  {...linkProps}
                  className="group block p-6 bg-paper rounded-lg border border-border hover:border-accent/30 transition-colors"
                >
                  {/* Top row: category + status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted">
                      {tool.category}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Stat */}
                  {tool.stat && (
                    <div className="mb-3">
                      <span className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
                        {tool.stat.value}
                      </span>
                      <span className="text-xs text-muted ml-2">
                        {tool.stat.label}
                      </span>
                    </div>
                  )}

                  {/* Name + tagline */}
                  <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-accent mt-0.5">{tool.tagline}</p>

                  {/* Description */}
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Link indicator */}
                  <div className="mt-4 text-sm text-accent group-hover:text-accent-light transition-colors">
                    {tool.external
                      ? `${tool.href.replace("https://", "").replace("www.", "")} \u2192`
                      : `Try it \u2192`}
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface paper-texture border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground">
                Building something for education?
              </h2>
              <p className="text-sm text-muted mt-1 max-w-lg">
                All our tools are open source or Creative Commons licensed.
                Fork, extend, integrate — and let us know what you build.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors whitespace-nowrap"
            >
              Get in touch &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
