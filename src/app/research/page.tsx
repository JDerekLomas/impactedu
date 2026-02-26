import type { Metadata } from "next";
import Link from "next/link";
import ResearchDoodles from "@/components/doodles/ResearchDoodles";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research questions driving AI-accelerated education research at Impact-Edu.ai — across learning priorities, measurement, AI tools, and equity.",
};

const areas = [
  {
    number: "01",
    title: "New Learning Priorities",
    tagline: "What should students actually learn now?",
    framing:
      "AI changes what skills matter. We need faster methods to identify shifting priorities and translate them into curriculum — not in five-year cycles, but continuously.",
    questions: [
      {
        q: "What should students learn in an AI age?",
        context:
          "Core academic content remains, but the balance between knowledge, skills, and dispositions is shifting. Which competencies gain importance when AI handles routine cognitive tasks?",
      },
      {
        q: "How do we rapidly identify new learning priorities?",
        context:
          "Traditional curriculum revision takes years. Can AI-accelerated methods — labor market analysis, expert elicitation, student outcome tracking — compress that cycle?",
      },
      {
        q: "What does AI literacy look like across development?",
        context:
          "A kindergartener and a high schooler need different things. What does a developmentally appropriate AI literacy progression look like from K through 12?",
      },
    ],
  },
  {
    number: "02",
    title: "Measurement & Assessment",
    tagline: "Better instruments, faster feedback",
    framing:
      "Assessment is the bottleneck. If we can measure learning faster and more accurately — especially for new competencies — everything downstream improves: instruction, intervention, and research itself.",
    questions: [
      {
        q: "Can LLMs accurately estimate item difficulty?",
        context:
          "Calibrating assessment items traditionally requires hundreds of student responses. If language models can predict difficulty and discrimination parameters, we can build better tests at a fraction of the cost.",
      },
      {
        q: "Can paper-based adaptive assessment close the feedback loop without screens?",
        context:
          "Billions of students learn without devices. SmartPaper demonstrates that computer vision can score handwritten work — but can we push further toward adaptive sequencing on paper?",
      },
      {
        q: "How do open psychometric datasets change assessment quality?",
        context:
          "Our 34,000+ open items with calibration data are among the largest such collections. Does open access to item parameters actually improve the assessments teachers and researchers build?",
      },
    ],
  },
  {
    number: "03",
    title: "AI Tools & Their Effects",
    tagline: "What works, what doesn't, what's worth the cost",
    framing:
      "The market is flooded with AI education tools making bold claims. Rigorous evidence on what actually improves learning — and at what cost — is scarce and urgently needed.",
    questions: [
      {
        q: "What is the actual impact of AI tutoring on learning outcomes?",
        context:
          "AI tutoring products claim transformative results, but independent evidence is thin. We need well-designed studies measuring real learning gains, not just engagement metrics.",
      },
      {
        q: "Do lightweight AI supplements improve learning more per dollar than full platforms?",
        context:
          "A $25 AI-generated curriculum unit vs. a $50/student platform subscription. When is less more? Cost-effectiveness analysis is almost entirely absent from edtech research.",
      },
      {
        q: "How do AI teacher tools affect instruction quality?",
        context:
          "AI lesson planners, worksheet generators, and text leveling tools save teachers time. But do they actually improve the quality of instruction students receive?",
      },
    ],
  },
  {
    number: "04",
    title: "Equity & Access",
    tagline: "Who benefits, who gets left behind",
    framing:
      "AI could narrow educational inequality — or widen it. The difference depends on infrastructure, design choices, and whether research itself reaches the communities that need it most.",
    questions: [
      {
        q: "Does AI widen or narrow the resource gap between schools?",
        context:
          "Well-resourced schools adopt AI tools faster. But AI also dramatically lowers the cost of high-quality materials. Which force wins, and under what conditions?",
      },
      {
        q: "What works in low-infrastructure settings?",
        context:
          "Paper-based assessment, offline-first tools, SMS-delivered content. Which approaches deliver measurable learning gains where connectivity and devices are scarce?",
      },
      {
        q: "Can AI-accelerated research itself be more equitable?",
        context:
          "Traditional education research is slow and expensive, concentrating evidence in wealthy contexts. If AI compresses the research cycle, can we generate evidence faster for underserved populations?",
      },
    ],
  },
];

const methods = [
  "Synthetic student simulation for rapid item calibration",
  "AI-powered qualitative interviews (text and voice)",
  "Paper-based adaptive testing at national scale",
  "LLM evaluation across 200+ experimental conditions",
  "Open psychometric datasets for reproducible research",
  "Cost-effectiveness analysis of AI interventions",
];

export default function ResearchPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Research
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            Research questions for AI-accelerated education
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            These are the specific questions driving our work, organized into
            four areas. Each is concrete, answerable, and designed to produce
            evidence the field can act on.
          </p>
        </div>
      </section>

      {/* Research areas */}
      {areas.map((area, i) => (
        <section
          key={area.number}
          className={`py-16 ${i % 2 === 1 ? "bg-surface paper-texture" : ""}`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-muted-light">
                <span>{area.number}</span>
                <ResearchDoodles area={area.number} className="mt-4 hidden lg:block" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
                  {area.title}
                </h2>
                <p className="text-accent text-sm font-medium mt-0.5">
                  {area.tagline}
                </p>
                <p className="mt-4 text-muted leading-relaxed max-w-2xl">
                  {area.framing}
                </p>

                <div className="mt-8 space-y-4">
                  {area.questions.map((question) => (
                    <div
                      key={question.q}
                      className="p-5 bg-paper rounded-lg border border-border hover:border-accent/30 transition-colors"
                    >
                      <h3 className="font-[family-name:var(--font-source-serif)] text-lg font-semibold text-foreground leading-snug">
                        {question.q}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {question.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Methods */}
      <section className="py-16 bg-surface paper-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4">
            <div />
            <div>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
                How we work
              </p>
              <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground leading-snug mb-4">
                AI-accelerated methods
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl mb-6">
                We use AI to compress the research cycle itself — generating
                evidence in weeks instead of years, with open data and
                reproducible methods throughout.
              </p>
              <ul className="space-y-2">
                {methods.map((method) => (
                  <li key={method} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-1 flex-shrink-0">
                      &mdash;
                    </span>
                    <span className="text-muted">{method}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground">
                Interested in collaborating on research?
              </h2>
              <p className="text-sm text-muted mt-1">
                We partner with researchers, funders, and school systems.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors"
            >
              Get in touch &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
