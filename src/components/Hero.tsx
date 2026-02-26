import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden dot-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-6">
            A program of Wisdom Frontiers
          </p>

          <h1 className="font-[family-name:var(--font-source-serif)] text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-foreground leading-[1.15] tracking-tight">
            Open research infrastructure{" "}
            <span className="underline-accent">for AI in education</span>
          </h1>

          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
            AI is creating entirely new learning objectives — but we can&apos;t measure what we haven&apos;t defined. Impact-Edu.ai builds the open assessments, open tools, and open research the field needs to understand what actually works. No paywalls. No vendor lock-in. Evidence for everyone.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors"
            >
              Our research areas
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded hover:bg-surface transition-colors"
            >
              Partner with us
            </Link>
          </div>
        </div>

        {/* Field note stats strip */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "15M+", label: "students reached", note: "US + India" },
              { value: "75+", label: "publications", note: "CHI, AIED, EDM, L@S" },
              { value: "5M", label: "assessments via SmartPaper", note: "Rajasthan, India" },
              { value: "$25", label: "for a full K-12 curriculum", note: "AI content generation" },
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
      </div>
    </section>
  );
}
