import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Past and current work from Impact-Edu.ai — tools and research already reaching 15 million students across the US and India.",
};

const projects = [
  {
    number: "01",
    title: "SmartPaper",
    tagline: "Bridging paper and digital learning at national scale",
    description:
      "Computer vision tool that lets teachers print worksheets, students write by hand, and AI scores instantly. Deployed across government schools in Rajasthan, India — bridging the gap between paper-based classrooms and digital assessment infrastructure.",
    stats: [
      { value: "5M+", label: "student assessments processed" },
      { value: "120K", label: "item responses in longitudinal dataset" },
      { value: "6", label: "longitudinal assessments conducted" },
    ],
    details: [
      "Deployed in partnership with Indian state governments in Rajasthan",
      "Measurable reduction in learning poverty across participating schools",
      "UNESCO-recognized assessment innovation",
      "Generates open psychometric data on assessment items at scale",
    ],
    link: "https://www.getsmartpaper.com",
  },
  {
    number: "02",
    title: "PlayPower Educational Content",
    tagline: "Standards-aligned math reaching millions of US students",
    description:
      "25+ educational games and AI-generated curriculum content distributed by Savvas Learning to school districts across the United States. Full K-12 mathematics curriculum generated at $25-50 total cost with 85% auto-approve rate and 98% mathematical accuracy.",
    stats: [
      { value: "10M+", label: "US students reached" },
      { value: "25+", label: "educational games" },
      { value: "98%", label: "mathematical accuracy" },
    ],
    details: [
      "Distributed by Savvas Learning (one of the largest US K-12 publishers)",
      "AI-generated curriculum content with human expert review pipeline",
      "Standards-aligned to Common Core and state frameworks",
      "Full K-12 math curriculum generated for $25-50 total cost",
    ],
    link: "https://playpowerlabs.com",
  },
  {
    number: "03",
    title: "Open Assessment Items (MCQMCP)",
    tagline: "34,000+ CC-licensed items with psychometric data",
    description:
      "A growing bank of openly licensed assessment items spanning K-12 mathematics — one of the largest open collections of its kind. Each item includes difficulty estimates, discrimination parameters, and alignment data. Built for adaptive testing, research, and anyone who needs high-quality assessment items without licensing barriers.",
    stats: [
      { value: "34K+", label: "CC-licensed assessment items" },
      { value: "K-12", label: "mathematics coverage" },
      { value: "Open", label: "psychometric data included" },
    ],
    details: [
      "Creative Commons licensed — free for any use",
      "Item-level psychometric data (difficulty, discrimination, alignment)",
      "Supports adaptive testing and research applications",
      "Synthetic student simulation for instant calibration feedback on new items",
      "One of the largest open assessment item banks available",
    ],
    link: null,
  },
  {
    number: "04",
    title: "UpGrade",
    tagline: "Open-source A/B testing for education",
    description:
      "An open-source experimentation platform purpose-built for educational software, enabling researchers and developers to run rigorous A/B tests within learning environments. Originally built on Carnegie Learning's infrastructure.",
    stats: [
      { value: "Open", label: "source" },
      { value: "2", label: "major funders" },
    ],
    details: [
      "Funded by the Gates Foundation and Schmidt Futures",
      "Built on Carnegie Learning's infrastructure",
      "Purpose-built for educational experimentation",
      "Supports multi-armed bandit and factorial designs",
    ],
    link: null,
  },
  {
    number: "05",
    title: "AI Research Tools",
    tagline: "Qualitative and quantitative instruments for studying AI in education",
    description:
      "A suite of research tools for studying AI's impact — including AI-powered qualitative interviews (text and voice), adaptive testing platforms, and synthetic student simulation for rapid psychometric feedback.",
    stats: [
      { value: "Text + Voice", label: "AI interview modalities" },
      { value: "Adaptive", label: "testing platform" },
      { value: "Synthetic", label: "student simulation" },
    ],
    details: [
      "AI-powered qualitative interviews by text and voice",
      "Adaptive testing engine with real-time item selection",
      "Synthetic student simulation for instant psychometric calibration",
      "Open evaluation frameworks for assessing AI tool quality",
    ],
    link: null,
  },
];

const publications = [
  {
    title: "LLM Difficulty Estimation",
    venue: "AIED 2026",
    description:
      "200 experimental conditions, 15+ large language models evaluated for math item difficulty estimation.",
  },
  {
    title: "A/B Testing at Scale Workshops",
    venue: "L@S 2020-2023",
    description:
      "Four annual workshops convening researchers on experimentation methodology in learning at scale.",
  },
  {
    title: "CHI Honorable Mention",
    venue: "CHI",
    description:
      "Large-scale experiment with 70,000+ subjects on design choices in educational games.",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Work
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            Built on a decade of shipped work
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Tools and research already reaching 15 million students across the US and India. Everything we build produces open data, open tools, and open research — evidence for the whole field.
          </p>
        </div>
      </section>

      {/* Stats overview */}
      <section className="py-10 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "15M+", label: "students reached", note: "US + India" },
              { value: "75+", label: "publications", note: "CHI, AIED, EDM, L@S, JCAL" },
              { value: "34K+", label: "open assessment items", note: "CC-licensed" },
              { value: "5M", label: "assessments via SmartPaper", note: "Rajasthan, India" },
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

      {/* Projects */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {projects.map((project) => (
              <div
                key={project.number}
                className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4"
              >
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-muted-light">
                  {project.number}
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
                    {project.title}
                  </h2>
                  <p className="text-accent text-sm font-medium mt-0.5">
                    {project.tagline}
                  </p>
                  <p className="mt-4 text-muted leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="p-3 bg-surface rounded border border-border">
                        <div className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <ul className="mt-5 space-y-2">
                    {project.details.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1 flex-shrink-0">&mdash;</span>
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-accent hover:text-accent-light transition-colors"
                    >
                      {project.link.replace("https://", "").replace("www.", "")} &rarr;
                    </a>
                  )}

                  {project.number !== "05" && (
                    <div className="mt-8 border-b border-border" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-16 bg-surface paper-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Selected publications
          </p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground leading-snug mb-8">
            75+ publications across top venues
          </h2>

          <div className="space-y-4">
            {publications.map((pub) => (
              <div key={pub.title} className="p-4 bg-paper rounded-lg border border-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{pub.title}</h3>
                    <p className="text-sm text-muted mt-1 leading-relaxed">{pub.description}</p>
                  </div>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent whitespace-nowrap mt-0.5">
                    {pub.venue}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted">
            Full publication list spanning CHI, AIED, EDM, L@S, JCAL, and more. Venues include ACM, Springer, IEEE, and ISLS.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground">
                See where we&apos;re headed
              </h2>
              <p className="text-sm text-muted mt-1">
                Our roadmap for the next phase of research and tools.
              </p>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors"
            >
              Roadmap &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
