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
            Research infrastructure for AI in education
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Impact-Edu.ai conducts and funds research on AI&apos;s real impact in classrooms, and builds the open tools that make that research possible.
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
              AI is transforming education — but we&apos;re flying blind
            </h2>
            <div className="mt-4 space-y-3 text-muted leading-relaxed">
              <p>
                AI tools are being adopted in schools faster than anyone can study their effects. Well-funded schools experiment while under-resourced schools fall further behind. Vendors make claims. Teachers make decisions. Nobody has the evidence.
              </p>
              <p>The field needs:</p>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                ["Open research", "on what works — grounded in learning science, not vendor claims"],
                ["Research tools", "adaptive tests, AI interviews, measurement frameworks — that move at the speed of AI"],
                ["Practitioner training", "so educators can make evidence-based decisions, not fear-based ones"],
                ["Field infrastructure", "standards, evaluation frameworks, and convenings that connect the people who matter"],
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
