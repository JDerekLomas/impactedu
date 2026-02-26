import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Impact-Edu.ai's research and development areas: Impact Research, Research Tools, Practitioner Training, and Field-Building.",
};

const programs = [
  {
    number: "01",
    title: "Impact Research",
    tagline: "Evidence on what actually works",
    description:
      "We conduct and fund applied research on AI in education — efficacy studies, equity analyses, and measurement frameworks. Published openly for the entire field, not locked behind vendor partnerships.",
    items: [
      "Efficacy studies of AI tutoring and assessment tools in real classroom settings",
      "Investigations of how large language models support (or hinder) deep learning",
      "Analysis of equity gaps in AI-powered education tools",
      "Development of measurement frameworks for AI learning impact",
      "Large-scale dataset analysis (16M+ student responses from Indian state assessments)",
    ],
    evidence: "AIED 2026 paper: 200 experimental conditions, 15+ models, LLM difficulty estimation. SmartPaper: measurable reduction in learning poverty across Rajasthan.",
  },
  {
    number: "02",
    title: "Research Tools",
    tagline: "Open infrastructure for studying AI in education",
    description:
      "We build and maintain open-source tools purpose-built for education research — anchored by Open Items, our open assessment platform built on the CZI Learning Commons Knowledge Graph.",
    items: [
      "Open Items: 34K+ CC-licensed assessment items with AI generation, LLM evaluation, and adaptive practice (openitems.impact-edu.ai)",
      "Built on the Learning Commons Knowledge Graph — 250K standards, 2K learning components, 273K relationships",
      "LLM-as-Judge evaluation pipeline scoring on 5 dimensions with 85% auto-approve rate",
      "AI interview tools for qualitative research — text and voice",
      "Synthetic student simulation for instant psychometric feedback on new items",
      "UpGrade: open-source A/B testing for education (Gates Foundation + Schmidt Futures)",
    ],
    evidence: "Full K-12 curriculum content generation at $25-50 total cost. 98% mathematical accuracy. First applied project built on the Learning Commons Knowledge Graph.",
  },
  {
    number: "03",
    title: "Practitioner Training",
    tagline: "Helping educators use AI with evidence, not fear",
    description:
      "We train educators to be informed, critical, and effective users of AI — making evidence-based decisions about which tools work and which are hype.",
    items: [
      "AI Literacy Lab for hands-on practice with conversational AI",
      "Professional development programs for teachers and instructional designers",
      "District-level AI integration planning support",
      "Train-the-trainer programs that scale through educator networks",
      "Practical guides and resources freely available online",
    ],
    evidence: null,
  },
  {
    number: "04",
    title: "Field-Building & Convening",
    tagline: "Connecting the people who need to be in the same room",
    description:
      "We strengthen the ecosystem connecting researchers, practitioners, developers, and policymakers — the people whose collaboration determines whether AI in education works for everyone.",
    items: [
      "Annual convening of researchers and practitioners working on AI in education",
      "Working groups on critical topics: assessment, equity, safety, efficacy",
      "Policy briefs that translate research into actionable guidance",
      "Community of practice for educators implementing AI tools",
    ],
    evidence: "4 annual A/B Testing at Scale workshops at L@S (2020-2023). Deep relationships across CMU, TU Delft, BrainPOP, Carnegie Learning, Savvas, Pratham.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Programs
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            Research and development areas
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Four interconnected areas focused on understanding and improving AI&apos;s impact in education — from research to tools to practice.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program) => (
              <div
                key={program.number}
                id={program.title.toLowerCase().replace(/\s+/g, "-")}
                className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4"
              >
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-muted-light">
                  {program.number}
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
                    {program.title}
                  </h2>
                  <p className="text-accent text-sm font-medium mt-0.5">
                    {program.tagline}
                  </p>
                  <p className="mt-4 text-muted leading-relaxed max-w-2xl">
                    {program.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {program.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1 flex-shrink-0">&mdash;</span>
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {program.evidence && (
                    <div className="mt-5 px-4 py-3 bg-surface rounded border-l-2 border-accent">
                      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent mb-1">
                        Evidence
                      </p>
                      <p className="text-sm text-muted leading-relaxed">{program.evidence}</p>
                    </div>
                  )}

                  {program.number !== "04" && (
                    <div className="mt-8 border-b border-border" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground">
                Want to partner on research?
              </h2>
              <p className="text-sm text-muted mt-1">
                We&apos;re looking for researchers, school districts, and funders.
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
