import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Impact-Edu.ai — research and tools for equitable AI in education.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            About
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            Redefining what students need to learn — and proving what works
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            AI changes what matters in education. But education&apos;s goals were set before AI existed, and updating them takes years. Impact-Edu.ai builds the open research, open assessments, and open tools to help the field identify new priorities and produce evidence fast.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 bg-surface paper-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
              The gap
            </p>
            <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground leading-snug">
              Are we teaching the most important things?
            </h2>
            <div className="mt-4 space-y-3 text-muted leading-relaxed">
              <p>
                Education&apos;s standards were designed before AI existed. The Common Core has no sense of priority — no way to say which objectives matter most. Adding new standards takes years. There is no rapid mechanism for asking: what do students need to learn now that AI can do much of what we currently teach?
              </p>
              <p>
                Meanwhile, AI tools are being adopted faster than anyone can study their effects. Vendors make claims nobody can verify. Assessment items are locked behind proprietary licenses. The field is flying blind — on both what to teach and how to measure it.
              </p>
              <p>The field needs:</p>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                ["New learning priorities", "— identifying what students actually need to know in an AI age, not just what we've always taught"],
                ["Open assessments and data", "— items, psychometric data, and research datasets published openly, not locked behind vendor agreements"],
                ["Research at the speed of AI", "— open tools for rapid evidence production: adaptive tests, AI interviews, synthetic student simulation"],
                ["Practitioner support", "— so educators can make evidence-based decisions about AI, not fear-based ones"],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-1 flex-shrink-0">&mdash;</span>
                  <span className="text-muted">
                    <strong className="text-foreground">{bold}</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
              Our approach
            </p>
            <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground leading-snug">
              High velocity, rigorous evidence
            </h2>
            <div className="mt-4 space-y-3 text-muted leading-relaxed">
              <p>
                Impact-Edu.ai is grounded in decades of learning science research — particularly the work of Carnegie Mellon&apos;s LearnLab and the Pittsburgh Science of Learning Center. We bring this research tradition into the current AI moment with the speed and execution capacity of a technology organization.
              </p>
              <p>
                We don&apos;t just study AI in education — we build the tools that make studying it possible. Adaptive assessments. AI-powered qualitative interviews. Synthetic student simulation for instant psychometric feedback. Open item banks and evaluation frameworks.
              </p>
              <p>
                Our work already reaches 15 million students across the US and India through partnerships with Savvas Learning (US distribution) and Indian state governments (SmartPaper deployments in Rajasthan).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="py-16 bg-surface paper-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
                Structure
              </p>
              <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground leading-snug">
                A program of Wisdom Frontiers
              </h2>
              <div className="mt-4 space-y-3 text-muted leading-relaxed">
                <p>
                  Impact-Edu.ai operates as a program of Wisdom Frontiers, a California nonprofit corporation. Independent board oversight governs all program decisions. All work products are published openly — open access, open source, Creative Commons.
                </p>
              </div>
            </div>

            <div>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
                Relationship to Play Power Labs
              </p>
              <div className="text-sm text-muted leading-relaxed space-y-3">
                <p>
                  Impact-Edu.ai&apos;s Program Director is also a principal of Play Power Labs, a for-profit company that develops commercial AI-powered educational products. This relationship is disclosed, governed by Wisdom Frontiers&apos; Conflict of Interest Policy, and managed with arm&apos;s-length transactions and recusal procedures.
                </p>
                <p>
                  <strong className="text-foreground">Distinct missions:</strong> Play Power Labs builds commercial products. Impact-Edu.ai produces public goods — open research, open tools, free training — that benefit the entire field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Leadership
          </p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground leading-snug mb-8">
            Team
          </h2>

          <div className="border border-border rounded-lg p-6 bg-paper max-w-2xl">
            <h3 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground">
              Derek Lomas, PhD
            </h3>
            <p className="text-accent text-sm font-medium mt-0.5">Program Director</p>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              PhD in Human-Computer Interaction from Carnegie Mellon University under Ken Koedinger, one of the founders of the intelligent tutoring systems field. Former Assistant Professor at TU Delft. 75+ publications spanning learning science, game design, and AI-powered education. Research has involved 70,000+ experimental subjects. Tools have reached 15 million students across the US and India.
            </p>
          </div>

          <div className="mt-6 border border-border rounded-lg p-6 bg-paper max-w-2xl">
            <h3 className="font-[family-name:var(--font-source-serif)] text-lg font-semibold text-foreground">
              Advisory Board
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Impact-Edu.ai is convening an advisory board of leading researchers, practitioners, and policy experts. Details forthcoming.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground">
                Want to learn more?
              </h2>
              <p className="text-sm text-muted mt-1">Explore our programs or get in touch.</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors"
              >
                Programs
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded hover:bg-surface-alt transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
