import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Impact-Edu.ai's roadmap — open assessments, AI research tools, measurement frameworks, and a global research network.",
};

const roadmapItems = [
  {
    number: "01",
    title: "Open Assessments at Scale",
    tagline: "The field's biggest blind spot",
    status: "In progress",
    description:
      "There is remarkably little openly available assessment data in education. Most items are proprietary, most psychometric data is locked behind vendor agreements, and researchers have to build from scratch every time. We're changing that.",
    goals: [
      "Expand our open item bank from 34K to 100K+ CC-licensed assessment items across K-12 math and reading",
      "Publish item-level psychometric data — difficulty, discrimination, response distributions — for every item",
      "Build open adaptive testing infrastructure any researcher or district can deploy",
      "Create open datasets of student response patterns for AI training and evaluation",
      "Develop synthetic student simulation for instant calibration of new items without live data collection",
    ],
    why: "Open assessments with open data are foundational infrastructure. Without them, every researcher starts from zero. With them, the entire field can build on shared evidence.",
  },
  {
    number: "02",
    title: "AI Qualitative Research Tools",
    tagline: "Understanding the human side at scale",
    status: "In progress",
    description:
      "Quantitative data tells you what happened. Qualitative data tells you why. AI-powered interviews — by text and voice — make it possible to conduct deep qualitative research at a scale that was previously impossible.",
    goals: [
      "Expand AI interview tools to support multi-language qualitative research",
      "Develop real-time analysis dashboards for ongoing interview studies",
      "Publish open protocols for AI-assisted qualitative research in education",
      "Create training materials for researchers using AI qualitative methods",
    ],
    why: "Educators' and students' experiences matter. Qualitative research has always been limited by the time it takes to conduct and analyze interviews. AI changes that calculus entirely.",
  },
  {
    number: "03",
    title: "Public Research Database & Hub",
    tagline: "Making the evidence findable and actionable",
    status: "Planning",
    description:
      "The research on AI in education is scattered across dozens of venues, paywalled, and hard for practitioners to find. We're building a public, searchable database of relevant papers — and an active research hub where we conduct new studies and publish openly.",
    goals: [
      "Curate and maintain a public database of AI-in-education research papers",
      "Provide practitioner-friendly summaries and evidence ratings",
      "Host active research projects — like our AIED 2026 LLM evaluation work — with open data and open code",
      "Create a living evidence map: what we know, what we don't, and where the gaps are",
    ],
    why: "Practitioners can't use evidence they can't find. Researchers can't build on work they don't know about. A curated, open research database is foundational infrastructure for the field.",
  },
  {
    number: "04",
    title: "New Learning Objectives for the AI Era",
    tagline: "Measuring what matters now, not just what mattered a decade ago",
    status: "Planning",
    description:
      "Education largely operates around fixed learning objectives that change very slowly. But AI is creating entirely new things students need to learn — understanding AI capabilities and limitations, evaluating AI-generated content, using AI tools productively across disciplines. These objectives don't yet have clear definitions, let alone assessments.",
    goals: [
      "Identify and define new learning objectives for AI literacy across K-12",
      "Develop assessments that measure emerging AI competencies for diverse student populations",
      "Create frameworks for how AI literacy objectives intersect with existing disciplinary standards",
      "Publish open item banks for AI literacy assessment",
    ],
    why: "You can't improve what you can't measure. And right now, we can't measure AI literacy because we haven't agreed on what it means. Defining these objectives — and building assessments for them — is prerequisite work for the entire field.",
  },
  {
    number: "05",
    title: "Measurement Frameworks",
    tagline: "Defining what 'works' actually means",
    status: "Planning",
    description:
      "When a vendor says their AI tool 'improves learning,' what does that mean? We're developing rigorous frameworks for measuring AI's impact on learning — going beyond engagement metrics to actual learning outcomes, equity effects, and long-term retention.",
    goals: [
      "Publish open measurement frameworks for evaluating AI tutoring tools",
      "Develop equity-focused evaluation criteria that surface differential impact across student populations",
      "Create practical rubrics districts can use to evaluate AI tool claims",
      "Establish evidence standards — what counts as rigorous evidence of learning impact",
    ],
    why: "Without shared measurement standards, the field can't distinguish tools that work from tools that merely engage. Frameworks create accountability.",
  },
  {
    number: "06",
    title: "Practitioner Training & AI Literacy",
    tagline: "Evidence-based decisions, not fear-based ones",
    status: "Planning",
    description:
      "Educators are making decisions about AI tools right now — often without training, evidence, or institutional support. We're building training programs that help teachers and districts make evidence-based decisions about AI.",
    goals: [
      "Launch AI Literacy Lab — hands-on training for educators",
      "Develop district-level AI integration playbooks grounded in evidence",
      "Create train-the-trainer programs that scale through educator networks",
      "Publish freely available guides, rubrics, and evaluation checklists",
    ],
    why: "The gap between AI adoption and AI understanding is dangerous. Teachers deserve support that's based on evidence, not vendor demos.",
  },
  {
    number: "07",
    title: "Global Research Network",
    tagline: "Connecting the people who need to be in the same room",
    status: "Building",
    description:
      "The people studying AI in education, the people building AI education tools, the people using those tools in classrooms, and the people making policy about them — they're often not talking to each other. We're building the connective tissue.",
    goals: [
      "Annual convening of researchers and practitioners working on AI in education",
      "Working groups on assessment, equity, safety, and efficacy",
      "Policy briefs that translate research findings into actionable guidance",
      "International partnerships — including work with AI for Education (Paul Aetherton) and Rising Academy Network (Shabnam Aggarwal)",
    ],
    collaborators: [
      {
        name: "Paul Aetherton",
        org: "AI for Education",
        link: "https://ai-for-education.org",
      },
      {
        name: "Shabnam Aggarwal",
        org: "Rising Academy Network",
        link: null,
      },
    ],
    why: "No single organization can solve this. The field needs infrastructure for collaboration — shared tools, shared data, shared research agendas.",
  },
];

const principles = [
  {
    title: "Open Access",
    description:
      "All research published openly. No paywalls, no vendor gatekeeping. Evidence belongs to the field.",
  },
  {
    title: "Open Source",
    description:
      "All tools we build are open source. Anyone can use, modify, and contribute. No lock-in.",
  },
  {
    title: "Open Data",
    description:
      "Assessment data, psychometric parameters, research datasets — published openly for anyone to use and build on.",
  },
];

export default function RoadmapPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Roadmap
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            What we&apos;re building next
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Our roadmap is guided by a simple question: what does the field need that no one else is building? The answer, overwhelmingly, is open infrastructure — open assessments, open data, open tools, open research.
          </p>
        </div>
      </section>

      {/* Open principles */}
      <section className="py-10 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="p-4 bg-paper rounded-lg border border-border">
                <h3 className="font-[family-name:var(--font-source-serif)] text-lg font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap items */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {roadmapItems.map((item) => (
              <div
                key={item.number}
                className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4"
              >
                <div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-muted-light">
                    {item.number}
                  </div>
                  <div className={`mt-1 inline-block font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                    item.status === "In progress"
                      ? "bg-accent/10 text-accent"
                      : item.status === "Building"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                  }`}>
                    {item.status}
                  </div>
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-accent text-sm font-medium mt-0.5">
                    {item.tagline}
                  </p>
                  <p className="mt-4 text-muted leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {item.goals.map((goal) => (
                      <li key={goal} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1 flex-shrink-0">&mdash;</span>
                        <span className="text-muted">{goal}</span>
                      </li>
                    ))}
                  </ul>

                  {item.collaborators && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {item.collaborators.map((c) => (
                        <div key={c.name} className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface rounded border border-border text-sm">
                          <span className="text-foreground font-medium">{c.name}</span>
                          <span className="text-muted">&mdash;</span>
                          {c.link ? (
                            <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors">
                              {c.org}
                            </a>
                          ) : (
                            <span className="text-muted">{c.org}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 px-4 py-3 bg-surface rounded border-l-2 border-accent">
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent mb-1">
                      Why this matters
                    </p>
                    <p className="text-sm text-muted leading-relaxed">{item.why}</p>
                  </div>

                  {item.number !== "07" && (
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
                Want to fund or collaborate on this work?
              </h2>
              <p className="text-sm text-muted mt-1">
                We&apos;re looking for foundations, researchers, and districts who want to build open infrastructure for the field.
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
