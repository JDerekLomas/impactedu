"use client";

import { useEffect, useRef } from "react";

/**
 * Hand-drawn margin doodles for the research page — one per area.
 * Styled like sketches in a research notebook: simple, wobbly, accent-colored.
 * Animated with stroke-dasharray to draw in on scroll.
 */

interface Props {
  area: string;
  className?: string;
}

function useDrawIn(delay = 0) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path, circle, line");
    paths.forEach((el, i) => {
      const path = el as SVGPathElement;
      const length =
        "getTotalLength" in path ? path.getTotalLength() : 100;
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            path.style.transition = `stroke-dashoffset 0.8s ease ${delay + i * 200}ms`;
            path.style.strokeDashoffset = "0";
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(svg);
    });
  }, [delay]);

  return ref;
}

const stroke = "var(--accent)";
const muted = "var(--muted-light)";

/** 01 — Compass: pointing toward new direction */
function LearningPriorities() {
  const ref = useDrawIn(200);
  return (
    <svg ref={ref} viewBox="0 0 80 90" fill="none" aria-hidden="true" className="w-16">
      {/* Compass circle */}
      <path
        d="M 40 8 C 58 6, 72 20, 72 40 C 72 58, 58 72, 40 72 C 22 72, 8 58, 8 40 C 8 22, 22 8, 38 7"
        stroke={muted} strokeWidth={1.5} strokeLinecap="round"
      />
      {/* Compass needle — points NE */}
      <path
        d="M 40 40 L 54 18"
        stroke={stroke} strokeWidth={2.5} strokeLinecap="round"
      />
      <path
        d="M 40 40 L 26 58"
        stroke={muted} strokeWidth={1.5} strokeLinecap="round"
      />
      {/* Small tick marks */}
      <path d="M 40 10 L 40 14" stroke={muted} strokeWidth={1} strokeLinecap="round" />
      <path d="M 70 40 L 66 40" stroke={muted} strokeWidth={1} strokeLinecap="round" />
      <path d="M 40 70 L 40 66" stroke={muted} strokeWidth={1} strokeLinecap="round" />
      <path d="M 10 40 L 14 40" stroke={muted} strokeWidth={1} strokeLinecap="round" />
      {/* Question mark floating above */}
      <path
        d="M 56 4 C 56 0, 66 0, 66 5 C 66 9, 61 10, 61 14"
        stroke={stroke} strokeWidth={1.5} strokeLinecap="round"
      />
      <path d="M 61 18 L 61 19" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      {/* "new" label */}
      <text x="40" y="86" textAnchor="middle" fill="var(--muted-light)"
        fontFamily="var(--font-jetbrains-mono)" fontSize="7" letterSpacing="0.08em">
        NEW?
      </text>
    </svg>
  );
}

/** 02 — Branching flowchart: adaptive pathways */
function Measurement() {
  const ref = useDrawIn(200);
  return (
    <svg ref={ref} viewBox="0 0 80 100" fill="none" aria-hidden="true" className="w-16">
      {/* Top item box */}
      <path d="M 28 4 L 52 4 L 52 16 L 28 16 Z" stroke={muted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Stem down */}
      <path d="M 40 16 L 40 30" stroke={muted} strokeWidth={1.5} strokeLinecap="round" />
      {/* Branch left */}
      <path d="M 40 30 C 38 36, 22 36, 16 42" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      {/* Branch right */}
      <path d="M 40 30 C 42 36, 58 36, 64 42" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      {/* Left box (easy) */}
      <path d="M 4 42 L 28 42 L 28 54 L 4 54 Z" stroke={muted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Right box (hard) */}
      <path d="M 52 42 L 76 42 L 76 54 L 52 54 Z" stroke={muted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Left branch continues */}
      <path d="M 16 54 L 16 62" stroke={muted} strokeWidth={1} strokeLinecap="round" />
      <path d="M 16 62 C 14 66, 6 66, 6 70" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M 16 62 C 18 66, 26 66, 26 70" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      {/* Right branch continues */}
      <path d="M 64 54 L 64 62" stroke={muted} strokeWidth={1} strokeLinecap="round" />
      <path d="M 64 62 C 62 66, 54 66, 54 70" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M 64 62 C 66 66, 74 66, 74 70" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      {/* Small dots at leaves */}
      <path d="M 6 72 L 6 73" stroke={stroke} strokeWidth={3} strokeLinecap="round" />
      <path d="M 26 72 L 26 73" stroke={stroke} strokeWidth={3} strokeLinecap="round" />
      <path d="M 54 72 L 54 73" stroke={stroke} strokeWidth={3} strokeLinecap="round" />
      <path d="M 74 72 L 74 73" stroke={stroke} strokeWidth={3} strokeLinecap="round" />
      {/* Label */}
      <text x="40" y="90" textAnchor="middle" fill="var(--muted-light)"
        fontFamily="var(--font-jetbrains-mono)" fontSize="6" letterSpacing="0.06em">
        ADAPTIVE
      </text>
    </svg>
  );
}

/** 03 — Magnifying glass over a bar chart */
function AITools() {
  const ref = useDrawIn(200);
  return (
    <svg ref={ref} viewBox="0 0 80 90" fill="none" aria-hidden="true" className="w-16">
      {/* Bar chart */}
      <path d="M 8 68 L 8 50" stroke={muted} strokeWidth={6} strokeLinecap="round" />
      <path d="M 22 68 L 22 38" stroke={muted} strokeWidth={6} strokeLinecap="round" />
      <path d="M 36 68 L 36 28" stroke={stroke} strokeWidth={6} strokeLinecap="round" />
      <path d="M 50 68 L 50 44" stroke={muted} strokeWidth={6} strokeLinecap="round" />
      {/* Baseline */}
      <path d="M 2 72 L 58 72" stroke={muted} strokeWidth={1.5} strokeLinecap="round" />
      {/* Magnifying glass */}
      <path
        d="M 52 22 C 52 12, 64 6, 72 12 C 78 16, 78 28, 70 32 C 64 36, 54 32, 52 24"
        stroke={stroke} strokeWidth={2} strokeLinecap="round"
      />
      {/* Glass handle */}
      <path d="M 54 34 L 44 46" stroke={stroke} strokeWidth={2.5} strokeLinecap="round" />
      {/* Question annotation */}
      <text x="66" y="8" textAnchor="middle" fill="var(--accent)"
        fontFamily="var(--font-jetbrains-mono)" fontSize="8" fontWeight="bold">
        ?
      </text>
      {/* Label */}
      <text x="40" y="86" textAnchor="middle" fill="var(--muted-light)"
        fontFamily="var(--font-jetbrains-mono)" fontSize="6" letterSpacing="0.06em">
        EVIDENCE
      </text>
    </svg>
  );
}

/** 04 — Balance scale with tilt */
function Equity() {
  const ref = useDrawIn(200);
  return (
    <svg ref={ref} viewBox="0 0 80 90" fill="none" aria-hidden="true" className="w-16">
      {/* Center post */}
      <path d="M 40 14 L 40 68" stroke={muted} strokeWidth={1.5} strokeLinecap="round" />
      {/* Base */}
      <path d="M 26 68 L 54 68" stroke={muted} strokeWidth={2} strokeLinecap="round" />
      {/* Fulcrum triangle */}
      <path d="M 36 14 L 40 8 L 44 14" stroke={muted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Beam — tilted to show imbalance */}
      <path d="M 8 28 L 72 20" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      {/* Left pan (lower = heavier) */}
      <path d="M 8 28 C 4 28, 2 32, 4 34 C 6 36, 10 36, 12 34 C 14 32, 12 28, 8 28" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      {/* Right pan (higher = lighter) */}
      <path d="M 72 20 C 68 20, 66 24, 68 26 C 70 28, 74 28, 76 26 C 78 24, 76 20, 72 20" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      {/* Strings */}
      <path d="M 8 28 L 14 18" stroke={muted} strokeWidth={1} strokeLinecap="round" />
      <path d="M 72 20 L 66 16" stroke={muted} strokeWidth={1} strokeLinecap="round" />
      {/* Arrow suggesting rebalancing */}
      <path d="M 60 40 C 64 36, 68 38, 68 42" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M 66 38 L 70 42 L 65 44" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Label */}
      <text x="40" y="82" textAnchor="middle" fill="var(--muted-light)"
        fontFamily="var(--font-jetbrains-mono)" fontSize="6" letterSpacing="0.06em">
        EQUITY
      </text>
    </svg>
  );
}

const doodleMap: Record<string, () => React.JSX.Element> = {
  "01": LearningPriorities,
  "02": Measurement,
  "03": AITools,
  "04": Equity,
};

export default function ResearchDoodles({ area, className = "" }: Props) {
  const Component = doodleMap[area];
  if (!Component) return null;
  return (
    <div className={className}>
      <Component />
    </div>
  );
}
