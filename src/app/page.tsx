import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const evidence = [
  {
    label: "Open Items",
    description:
      "Open assessment infrastructure for K-12. 34K+ CC-licensed items, AI generation, LLM evaluation, adaptive practice — built on the Learning Commons Knowledge Graph.",
    stat: "34K+ open items",
    detail: "CC-licensed, standards-aligned",
    link: "https://openitems.impact-edu.ai",
  },
  {
    label: "SmartPaper",
    description:
      "Computer vision for paper-to-digital assessment. Teachers print, students write by hand, AI scores instantly. Deployed across government schools in Rajasthan, India.",
    stat: "5M+ assessments",
    detail: "UNESCO-recognized",
    link: "https://www.getsmartpaper.com",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Problem — centered pullquote with hand-drawn quotes */}
      <section className="py-20 sm:py-28 bg-surface paper-texture">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <blockquote className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-[1.75rem] lg:text-[2rem] font-semibold text-foreground leading-snug">
              What does it mean to be literate when AI can write?
              <br className="hidden sm:inline" />
              What math matters when AI can compute?
            </blockquote>
            <p className="mt-8 text-muted leading-relaxed max-w-xl mx-auto">
              AI fundamentally changes what students need to know — but
              education&apos;s standards were written before AI existed, and
              updating them takes years. We&apos;re building the open research
              infrastructure to find answers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Evidence — two strong cards */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="annotation mb-3">Track record</p>
            <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-3">
              Built on a decade of shipped work
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl mb-12">
              Tools already in use by millions of students, backed by rigorous
              evidence.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {evidence.map((item) => (
              <ScrollReveal key={item.label}>
                <div className="bg-paper rounded-lg border border-border p-8 hover:border-accent/30 transition-colors h-full">
                  <div className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground mb-1">
                    {item.stat}
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent mb-4">
                    {item.detail}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-accent hover:text-accent-light transition-colors"
                    >
                      {item.link.replace("https://", "").replace("www.", "")}{" "}
                      &rarr;
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoStrip />

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground">
              Interested in funding or partnering on impact research?
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              We&apos;re looking for foundations, researchers, and school
              districts who want evidence — not hype — about AI in education.
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
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
