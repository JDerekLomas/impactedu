import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Impact-Edu.ai.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Contact
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            Let&apos;s talk about impact research
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Whether you&apos;re a foundation, researcher, school district, or developer — we&apos;d like to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <div className="space-y-6">
                <div>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:hello@impact-edu.ai"
                    className="text-foreground hover:text-accent transition-colors font-medium"
                  >
                    hello@impact-edu.ai
                  </a>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-2">
                    Program Director
                  </p>
                  <p className="text-foreground font-medium">Derek Lomas, PhD</p>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-2">
                    Website
                  </p>
                  <a
                    href="https://impact-edu.ai"
                    className="text-foreground hover:text-accent transition-colors font-medium"
                  >
                    impact-edu.ai
                  </a>
                </div>
              </div>

              <div className="mt-10 p-5 bg-surface rounded-lg border border-border">
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-2">
                  Organization
                </p>
                <p className="text-sm text-foreground font-medium">Wisdom Frontiers</p>
                <p className="text-sm text-muted mt-0.5">
                  A California nonprofit corporation. All inquiries about governance or fiscal matters should be directed to Wisdom Frontiers.
                </p>
              </div>
            </div>

            {/* Ways to partner */}
            <div>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-4">
                Ways to partner
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Foundations & Funders",
                    description:
                      "Fund open research, open tools, and practitioner training that benefits the entire field. We move fast and produce evidence.",
                  },
                  {
                    title: "Researchers",
                    description:
                      "Partner on studies of AI tool efficacy, collaborate on open datasets, co-author publications, or use our research tools.",
                  },
                  {
                    title: "School Districts",
                    description:
                      "Join research studies, pilot open tools, get evidence-based AI integration support.",
                  },
                  {
                    title: "Developers",
                    description:
                      "Contribute to open-source tools, help build evaluation frameworks, develop research infrastructure.",
                  },
                ].map((area) => (
                  <div
                    key={area.title}
                    className="p-4 bg-paper rounded-lg border border-border"
                  >
                    <h3 className="font-semibold text-foreground text-sm">{area.title}</h3>
                    <p className="text-sm text-muted mt-1 leading-relaxed">{area.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
