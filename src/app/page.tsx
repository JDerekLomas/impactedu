import Hero from "@/components/Hero";
import Link from "next/link";

const researchAreas = [
  {
    number: "01",
    title: "New Learning Priorities",
    description:
      "AI changes what students need to know — but education's standards were written before AI existed and take years to update. We research what actually matters now and build open assessments to measure it.",
    examples: [
      "What does literacy mean when AI can write? What math matters when AI can compute?",
      "34K+ CC-licensed assessment items with open psychometric data",
      "Rapid priority-setting frameworks that bypass the multi-year standards cycle",
    ],
  },
  {
    number: "02",
    title: "Research Tools",
    description:
      "Open tools purpose-built for studying AI in education — adaptive assessments, AI-powered qualitative interviews, synthetic student simulation, item calibration.",
    examples: [
      "AI interviews by text and voice for qualitative research at scale",
      "Synthetic student simulation for instant psychometric feedback",
      "LLM evaluation framework (200 conditions, 15+ models — AIED 2026)",
    ],
  },
  {
    number: "03",
    title: "Research Hub",
    description:
      "A public database of relevant papers and an active research program conducting new studies — like our AIED 2026 work on LLM difficulty estimation.",
    examples: [
      "Public research database of AI-in-education papers",
      "Active research program with open publications",
      "Efficacy studies, equity analyses, measurement frameworks",
    ],
  },
  {
    number: "04",
    title: "Practitioner Training & Field-Building",
    description:
      "Helping educators make evidence-based decisions about AI tools, and connecting the researchers, practitioners, and policymakers who need to be in the same room.",
    examples: [
      "AI Literacy Lab for hands-on practice",
      "District-level AI integration planning",
      "Convenings and working groups on assessment, equity, safety",
    ],
  },
];

const evidence = [
  {
    label: "SmartPaper",
    description:
      "Computer vision tool bridging paper and digital learning. Teachers print worksheets, students write by hand, AI scores instantly. Deployed across government schools in Rajasthan, India.",
    stat: "5M+ student assessments",
    detail: "6 longitudinal assessments, 120K item responses, UNESCO-recognized",
    link: "https://www.getsmartpaper.com",
  },
  {
    label: "PlayPower educational content",
    description:
      "Standards-aligned math content distributed by Savvas Learning to districts across the United States, with 25+ educational games and AI-generated curriculum.",
    stat: "10M+ US students reached",
    detail: "Via Savvas distribution partnership",
    link: "https://playpowerlabs.com",
  },
  {
    label: "UpGrade",
    description:
      "Open-source A/B testing platform for educational software, built on Carnegie Learning's infrastructure. Funded by the Gates Foundation and Schmidt Futures.",
    stat: "Open source",
    detail: "Gates Foundation + Schmidt Futures funded",
    link: null,
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* The problem — field note style */}
      <section className="py-16 bg-surface paper-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
              The problem
            </p>
            <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground leading-snug">
              Education has a crisis of purpose
            </h2>
            <div className="mt-4 space-y-3 text-muted leading-relaxed">
              <p>
                AI fundamentally changes what students need to know — but education&apos;s standards were written before AI existed. The Common Core has no sense of priority across objectives. The process of adding new standards takes years. There is no mechanism for rapidly identifying what matters most in a world where AI can do much of what we currently teach.
              </p>
              <p>
                What does it mean to be literate when AI can write? What math matters when AI can compute? How do diverse students learn to evaluate and use AI tools effectively? These aren&apos;t hypothetical questions — they&apos;re urgent ones, and nobody has good answers yet.
              </p>
              <p>
                Meanwhile, well-funded schools experiment while under-resourced schools fall further behind. Vendors make claims. Teachers make decisions. Nobody has the evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research areas */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            What we do
          </p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-10">
            Four research and development areas
          </h2>

          <div className="space-y-8">
            {researchAreas.map((area) => (
              <div
                key={area.number}
                className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4 pb-8 border-b border-border last:border-0 last:pb-0"
              >
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-muted-light">
                  {area.number}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-source-serif)] text-xl font-semibold text-foreground mb-2">
                    {area.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-3">{area.description}</p>
                  <ul className="space-y-1">
                    {area.examples.map((ex) => (
                      <li key={ex} className="text-sm text-muted-light flex items-start gap-2">
                        <span className="text-accent mt-1.5 text-[8px]">&#9679;</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence / track record */}
      <section className="py-16 bg-surface paper-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Track record
          </p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-3">
            Built on a decade of shipped work
          </h2>
          <p className="text-muted leading-relaxed max-w-2xl mb-10">
            Impact-Edu.ai draws on the research and engineering track record of its founding team — tools already in use by millions of students, backed by rigorous evidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {evidence.map((item) => (
              <div
                key={item.label}
                className="bg-paper rounded-lg border border-border p-6 hover:border-accent/30 transition-colors"
              >
                <div className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground mb-1">
                  {item.stat}
                </div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent mb-3">
                  {item.detail}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-accent hover:text-accent-light transition-colors"
                  >
                    {item.link.replace("https://", "").replace("www.", "")} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research heritage */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
                Why us
              </p>
              <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                Moving at the speed of AI, grounded in learning science
              </h2>
              <div className="mt-4 space-y-3 text-muted leading-relaxed">
                <p>
                  Our team comes from Carnegie Mellon&apos;s LearnLab — where intelligent tutoring systems were pioneered — and has spent the last decade shipping AI-powered education tools at scale in the US and India.
                </p>
                <p>
                  We combine the rigor of learning science research with the velocity of a startup. Funders get an organization that can publish in top venues <em>and</em> ship working tools to millions of students.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "PhD under Ken Koedinger at CMU (founder of intelligent tutoring)",
                "75+ publications across CHI, AIED, EDM, L@S, JCAL",
                "CHI Honorable Mention — 70K-subject experiment",
                "Gates Foundation & Schmidt Futures funded tools",
                "UNESCO-recognized assessment innovation",
                "10M students reached in the US via Savvas partnership",
                "5M student assessments in Indian government schools",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm">
                  <span className="text-accent mt-1 flex-shrink-0">&mdash;</span>
                  <span className="text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground">
            Interested in funding or partnering on impact research?
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            We&apos;re looking for foundations, researchers, and school districts who want evidence — not hype — about AI in education.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors"
            >
              Get in touch
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded hover:bg-surface-alt transition-colors"
            >
              About us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
