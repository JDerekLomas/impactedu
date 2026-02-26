import type { Metadata } from "next";
import DoodleShowcase from "./DoodleShowcase";

export const metadata: Metadata = {
  title: "Doodle Library",
  robots: "noindex",
};

export default function DoodlesPage() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
          Brand system
        </p>
        <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug">
          Doodle Library
        </h1>
        <p className="mt-4 text-muted leading-relaxed max-w-2xl mb-16">
          Hand-drawn SVG annotations for the field-notes aesthetic. Each draws
          itself in on scroll. Pick the ones that work, kill the rest.
        </p>

        <DoodleShowcase />
      </div>
    </section>
  );
}
