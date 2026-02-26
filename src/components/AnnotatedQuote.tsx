"use client";

import Annotate from "@/components/Annotate";

export default function AnnotatedQuote() {
  return (
    <blockquote className="font-[family-name:var(--font-source-serif)] text-2xl sm:text-[1.75rem] lg:text-[2rem] font-semibold text-foreground leading-snug">
      What does it mean to be{" "}
      <Annotate type="highlight" color="rgba(255, 220, 100, 0.35)" padding={3}>
        literate
      </Annotate>{" "}
      when AI can write?
      <br className="hidden sm:inline" />
      What{" "}
      <Annotate type="highlight" color="rgba(255, 220, 100, 0.35)" padding={3}>
        math
      </Annotate>{" "}
      matters when AI can compute?
    </blockquote>
  );
}
