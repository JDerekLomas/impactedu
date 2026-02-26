import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Items — Open Assessment Infrastructure for K-12",
  description:
    "34K+ CC-licensed assessment items, AI generation, LLM evaluation, adaptive practice — built on the Learning Commons Knowledge Graph. A program of Impact-Edu.ai.",
};

const PLATFORM_URL = "https://playpowerlearn-v2.vercel.app";

const features = [
  {
    title: "34K+ CC-Licensed Items",
    description:
      "Openly licensed assessment items spanning K-12 mathematics with difficulty estimates, discrimination parameters, and standards alignment data.",
  },
  {
    title: "Knowledge Graph Integration",
    description:
      "Built on the CZI Learning Commons Knowledge Graph — 250K standards, 2K learning components, 273K prerequisite relationships.",
  },
  {
    title: "LLM Evaluation Pipeline",
    description:
      "5-dimension quality scoring (accuracy, grade-appropriateness, pedagogy, validity, completeness). 85% auto-approve rate, 98% mathematical accuracy.",
  },
  {
    title: "AI Content Generation",
    description:
      "Generate standards-aligned items using Gemini 3 Flash. Full K-12 curriculum content at $25-50 total cost.",
  },
  {
    title: "Adaptive Practice",
    description:
      "Elo-rated difficulty calibration with spaced repetition. 9 item types, 18 interactive math widgets.",
  },
  {
    title: "Open API + SDKs",
    description:
      "REST API and embeddable SDKs so other tools can build on the item bank. npm for educational assessment.",
  },
];

const demos = [
  {
    label: "Item Types Demo",
    description: "Try all 9 item types — interactive, scored, with hints",
    href: `${PLATFORM_URL}/demo`,
  },
  {
    label: "Widget Gallery",
    description: "18 interactive math widgets: ten frames, number lines, fraction bars, and more",
    href: `${PLATFORM_URL}/demo/widgets`,
  },
  {
    label: "Curriculum Browser",
    description: "Browse standards frameworks with coverage data and skill trees",
    href: `${PLATFORM_URL}/curriculum`,
  },
  {
    label: "Skill Explorer",
    description: "Coverage dashboard, learning progressions, prerequisite relationships",
    href: `${PLATFORM_URL}/explore`,
  },
  {
    label: "Content Generator",
    description: "AI item generation with quality evaluation",
    href: `${PLATFORM_URL}/generate`,
  },
  {
    label: "Adaptive Practice",
    description: "Student-facing practice by grade and skill",
    href: `${PLATFORM_URL}/practice`,
  },
];

export default function OpenItemsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-28 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-accent mb-3">
            Open Infrastructure
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-3xl">
            Open Items
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
            Open assessment infrastructure for K-12 education. Built on the{" "}
            <a
              href="https://learningcommons.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors underline"
            >
              Learning Commons Knowledge Graph
            </a>
            .
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`${PLATFORM_URL}/demo`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors"
            >
              Try the demo
            </a>
            <a
              href="https://github.com/JDerekLomas/open-items"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded hover:bg-surface-alt transition-colors"
            >
              View source
            </a>
          </div>
        </div>
      </section>

      {/* The gap */}
      <section className="py-16 bg-surface paper-texture">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="font-[family-name:var(--font-source-serif)] text-xl sm:text-2xl font-semibold text-foreground leading-snug">
            CZI built the Knowledge Graph. Student Achievement Partners built the Coherence Map.
            We build the tools that make these frameworks actionable.
          </blockquote>
          <p className="mt-6 text-muted leading-relaxed">
            Most players in AI &amp; education fall into one of three camps: proprietary platforms,
            pure research, or infrastructure builders. Open Items is the missing fourth camp —{" "}
            <strong className="text-foreground">applied open tools built on open infrastructure</strong>.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Capabilities
          </p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-10">
            What Open Items provides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-5 bg-paper rounded-lg border border-border"
              >
                <h3 className="font-semibold text-foreground text-sm mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live demos */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Live demos
          </p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-10">
            See it working
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {demos.map((demo) => (
              <a
                key={demo.label}
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-paper rounded-lg border border-border hover:border-accent/30 transition-colors"
              >
                <h3 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">
                  {demo.label} &rarr;
                </h3>
                <p className="text-sm text-muted leading-relaxed mt-1">
                  {demo.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "34K+", label: "CC-licensed items", note: "K-12 math" },
              { value: "250K", label: "standards integrated", note: "via Knowledge Graph" },
              { value: "18", label: "interactive widgets", note: "math manipulatives" },
              { value: "98%", label: "mathematical accuracy", note: "LLM-evaluated" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted mt-0.5">{stat.label}</div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-muted-light mt-1 uppercase tracking-wider">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open principles */}
      <section className="py-16 bg-surface paper-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground mb-8">
            Open by design
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Open Access",
                description:
                  "All items CC-licensed. All research published openly. No paywalls, no licensing barriers.",
              },
              {
                title: "Open Source",
                description:
                  "Full source code on GitHub. Fork it, extend it, build on it. No vendor lock-in.",
              },
              {
                title: "Open Data",
                description:
                  "Psychometric parameters, difficulty estimates, alignment data — all published for the field.",
              },
            ].map((principle) => (
              <div key={principle.title}>
                <h3 className="font-semibold text-foreground mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground">
                Want to build on Open Items?
              </h2>
              <p className="text-sm text-muted mt-1">
                We&apos;re looking for researchers, curriculum developers, and ed-tech builders.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
