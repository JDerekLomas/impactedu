"use client";

import Doodle, { doodleTypes, type DoodleType } from "@/components/doodles/Doodle";

const categories: { label: string; types: DoodleType[]; description: string }[] = [
  {
    label: "Lines & Underlines",
    description: "For emphasizing headings, key phrases, or section breaks",
    types: ["underline", "underline-thick", "double-underline", "scribble-line", "squiggle"],
  },
  {
    label: "Circles & Shapes",
    description: "For highlighting stats, annotating key numbers, or framing content",
    types: ["circle", "circle-small", "box", "triangle"],
  },
  {
    label: "Arrows",
    description: "For drawing attention, connecting ideas, or pointing to CTAs",
    types: ["arrow-right", "arrow-down", "arrow-curved"],
  },
  {
    label: "Brackets & Braces",
    description: "For margin annotations, grouping content, or callouts",
    types: ["bracket", "brace"],
  },
  {
    label: "Symbols",
    description: "For marking importance, status, or emphasis",
    types: ["star", "asterisk", "checkmark", "x-mark", "question", "exclamation"],
  },
  {
    label: "Concepts",
    description: "For adding personality — ideas, connections, thought",
    types: ["lightbulb", "loop", "spiral", "connection-dots", "thought-bubble", "emphasis-lines"],
  },
];

function DoodleCard({ type }: { type: DoodleType }) {
  return (
    <div className="group relative bg-paper border border-border rounded-lg p-6 flex flex-col items-center gap-4 hover:border-accent/40 transition-colors">
      {/* On dot-grid to show how it looks on the actual site */}
      <div className="w-full h-24 flex items-center justify-center dot-grid rounded">
        <Doodle
          type={type}
          animate={false}
          className="w-auto h-12 max-w-[140px]"
        />
      </div>

      {/* With draw animation */}
      <div className="w-full h-24 flex items-center justify-center bg-surface rounded">
        <Doodle
          type={type}
          animate={true}
          className="w-auto h-12 max-w-[140px]"
        />
      </div>

      {/* Label */}
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-wider text-muted-light">
        {type}
      </p>
    </div>
  );
}

function UsageExample({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper border border-border rounded-lg p-8">
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function DoodleShowcase() {
  return (
    <div className="space-y-20">
      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat.label}>
          <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-1">
            {cat.label}
          </h2>
          <p className="text-sm text-muted mb-6">{cat.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {cat.types.map((type) => (
              <DoodleCard key={type} type={type} />
            ))}
          </div>
        </div>
      ))}

      {/* Usage examples — how they'd look in context */}
      <div>
        <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-1">
          In Context
        </h2>
        <p className="text-sm text-muted mb-6">
          How these might look placed on actual page elements
        </p>

        <div className="space-y-8">
          {/* Heading with underline */}
          <UsageExample title="Heading underline">
            <h3 className="font-[family-name:var(--font-source-serif)] text-3xl font-bold text-foreground relative inline-block">
              What matters now
              <Doodle
                type="underline"
                animate={false}
                className="absolute -bottom-1 left-0 w-full h-[10px]"
              />
            </h3>
          </UsageExample>

          {/* Stat with circle */}
          <UsageExample title="Circled stat">
            <div className="flex items-center gap-8">
              <div className="relative inline-block">
                <span className="font-[family-name:var(--font-source-serif)] text-4xl font-bold text-foreground">
                  15M+
                </span>
                <Doodle
                  type="circle"
                  animate={false}
                  className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] opacity-50"
                />
              </div>
              <span className="text-muted">students reached</span>
            </div>
          </UsageExample>

          {/* Arrow pointing to CTA */}
          <UsageExample title="Arrow to CTA">
            <div className="flex items-center gap-4">
              <Doodle
                type="arrow-right"
                animate={false}
                className="w-24 h-6 opacity-50"
              />
              <button className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded">
                Get in touch
              </button>
            </div>
          </UsageExample>

          {/* Bracket next to a list */}
          <UsageExample title="Margin bracket">
            <div className="flex gap-3">
              <Doodle
                type="bracket"
                animate={false}
                className="w-5 h-20 opacity-40 flex-shrink-0"
              />
              <div className="space-y-2 text-sm text-muted">
                <p>Open research, open data</p>
                <p>Open assessments, open tools</p>
                <p>Open training, open community</p>
              </div>
            </div>
          </UsageExample>

          {/* Curved arrow annotation */}
          <UsageExample title="Curved arrow annotation">
            <div className="relative">
              <p className="font-[family-name:var(--font-source-serif)] text-lg text-foreground">
                Education has a crisis of purpose.
              </p>
              <div className="absolute -right-4 -top-2">
                <Doodle
                  type="arrow-curved"
                  animate={false}
                  className="w-20 h-10 opacity-40"
                />
              </div>
            </div>
          </UsageExample>

          {/* Star next to important text */}
          <UsageExample title="Star annotation">
            <div className="flex items-start gap-2">
              <Doodle
                type="star"
                animate={false}
                className="w-5 h-5 flex-shrink-0 mt-1 opacity-60"
              />
              <p className="text-muted">
                <strong className="text-foreground">UNESCO-recognized</strong> assessment innovation
              </p>
            </div>
          </UsageExample>

          {/* Lightbulb next to insight */}
          <UsageExample title="Lightbulb insight">
            <div className="flex items-start gap-3">
              <Doodle
                type="lightbulb"
                animate={false}
                className="w-6 h-8 flex-shrink-0 opacity-50"
              />
              <p className="text-sm text-muted italic">
                What does it mean to be literate when AI can write?
              </p>
            </div>
          </UsageExample>

          {/* Squiggle divider */}
          <UsageExample title="Section divider">
            <div className="flex flex-col items-center gap-6">
              <p className="text-muted text-center">End of section one.</p>
              <Doodle
                type="squiggle"
                animate={false}
                className="w-40 h-6 opacity-30"
              />
              <p className="text-muted text-center">Beginning of section two.</p>
            </div>
          </UsageExample>

          {/* Connection dots for related items */}
          <UsageExample title="Connection diagram">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Research</span>
              <Doodle
                type="connection-dots"
                animate={false}
                className="w-12 h-8 opacity-40"
              />
              <span className="text-sm font-medium text-foreground">Tools</span>
              <Doodle
                type="connection-dots"
                animate={false}
                className="w-12 h-8 opacity-40"
              />
              <span className="text-sm font-medium text-foreground">Practice</span>
            </div>
          </UsageExample>

          {/* Color variants */}
          <UsageExample title="Color variants">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <Doodle type="underline" animate={false} color="var(--accent)" className="w-24 h-3" />
                <p className="text-[10px] text-muted-light mt-2">accent</p>
              </div>
              <div className="text-center">
                <Doodle type="underline" animate={false} color="var(--muted)" className="w-24 h-3" />
                <p className="text-[10px] text-muted-light mt-2">muted</p>
              </div>
              <div className="text-center">
                <Doodle type="underline" animate={false} color="var(--foreground)" className="w-24 h-3" />
                <p className="text-[10px] text-muted-light mt-2">foreground</p>
              </div>
              <div className="text-center">
                <Doodle type="underline" animate={false} color="var(--primary)" className="w-24 h-3" />
                <p className="text-[10px] text-muted-light mt-2">primary</p>
              </div>
            </div>
          </UsageExample>
        </div>
      </div>
    </div>
  );
}
