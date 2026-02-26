import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden dot-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            <p className="hero-enter hero-enter-1 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-6">
              A program of Wisdom Frontiers
            </p>

            <h1 className="hero-enter hero-enter-2 font-[family-name:var(--font-source-serif)] text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-foreground leading-[1.15] tracking-tight">
              What should students learn{" "}
              <span className="underline-accent">in an AI age?</span>
            </h1>

            <p className="hero-enter hero-enter-3 mt-6 text-lg text-muted leading-relaxed max-w-xl">
              Open research, open assessments, and open tools — helping education figure out what matters now.
            </p>

            <div className="hero-enter hero-enter-4 mt-8 flex flex-col sm:flex-row gap-3">
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

          {/* Illustration — desktop only */}
          <div className="hero-enter hero-enter-5 hidden lg:block pt-8">
            <Image
              src="/illustrations/classroom-1.png"
              alt="Pencil sketch of students writing in a classroom"
              width={360}
              height={255}
              className="rounded opacity-70 mix-blend-multiply"
              priority
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="hero-enter hero-enter-5 mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { value: "15M+", label: "students reached" },
              { value: "75+", label: "peer-reviewed publications" },
              { value: "5M", label: "assessments in India" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
