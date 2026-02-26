import Hero from "@/components/Hero";
import Link from "next/link";

const researchAreas = [
  {
    number: "01",
    title: "Impact Research",
    description:
      "Efficacy studies, equity analyses, and measurement of what actually works when AI enters classrooms. Not vendor marketing — real evidence.",
    examples: [
      "LLM difficulty estimation across 200 experimental conditions (AIED 2026)",
      "Measurable reduction in learning poverty via SmartPaper in Rajasthan",
      "Large-scale A/B testing workshops at L@S (2020-2023)",
    ],
  },
  {
    number: "02",
    title: "Research Tools",
    description:
      "Open tools purpose-built for studying AI in education — adaptive assessments, AI-powered qualitative interviews, synthetic student simulation, item calibration.",
    examples: [
      "Adaptive testing with 34K+ CC-licensed items (MCQMCP)",
      "AI interviews by text and voice for qualitative research",
      "Synthetic student calibration for instant psychometric feedback",
    ],
  },
  {
    number: "03",
    title: "Practitioner Training",
    description:
      "Helping educators and districts make evidence-based decisions about AI tools — not adopt them fearfully or uncritically.",
    examples: [
      "AI Literacy Lab for hands-on practice",
      "District-level AI integration planning",
      "Train-the-trainer programs that scale through educator networks",
    ],
  },
  {
    number: "04",
    title: "Field-Building",
    description:
      "Connecting researchers, practitioners, developers, and policymakers. Convening the people who need to be in the same room.",
    examples: [
      "Annual convenings on AI in education",
      "Working groups on assessment, equity, safety, efficacy",
      "Policy briefs that translate research into guidance",
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
              AI is transforming education faster than we can measure its impact
            </h2>
            <div className="mt-4 space-y-3 text-muted leading-relaxed">
              <p>
                Well-funded schools adopt AI tools while under-resourced schools fall behind. Vendors make claims no one can verify. Educators make decisions without evidence. The gap between what AI <em>could</em> do for learning and what we <em>know</em> it does is enormous.
              </p>
              <p>
                We need research infrastructure that moves as fast as the technology — open tools for measuring impact, not just building products.
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
