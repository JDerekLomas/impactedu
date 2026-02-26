"use client";

import { useEffect, useRef } from "react";

/**
 * Hand-drawn margin doodles for the research page — one per area.
 * Styled like sketches a researcher might draw while thinking:
 * wobbly lines, margin annotations, accent-colored emphasis.
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

    const paths = svg.querySelectorAll("path");
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            path.style.transition = `stroke-dashoffset 0.7s ease ${delay + i * 120}ms`;
            path.style.strokeDashoffset = "0";
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(svg);
    });
  }, [delay]);

  return ref;
}

const a = "var(--accent)";
const m = "var(--muted-light)";
const ml = "var(--border)";

/**
 * 01 — A signpost at a crossroads, one arm circled with "?"
 * "Which way now?"
 */
function LearningPriorities() {
  const ref = useDrawIn(200);
  return (
    <svg ref={ref} viewBox="0 0 100 120" fill="none" aria-hidden="true" className="w-20">
      {/* Ground line — wobbly */}
      <path d="M 8 98 C 20 99, 35 97, 50 98 C 65 99, 80 97, 92 98" stroke={ml} strokeWidth={1.5} strokeLinecap="round" />
      {/* Post */}
      <path d="M 50 98 C 49 85, 51 60, 50 30" stroke={m} strokeWidth={2.5} strokeLinecap="round" />
      {/* Sign arm right — "AI AGE" */}
      <path d="M 50 38 C 55 37, 65 36, 82 34" stroke={a} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M 78 30 L 86 34 L 78 38" stroke={a} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Sign arm left — old direction, crossed out */}
      <path d="M 50 50 C 44 49, 34 50, 18 52" stroke={m} strokeWidth={2} strokeLinecap="round" />
      <path d="M 22 48 L 14 52 L 22 56" stroke={m} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Strikethrough on old sign */}
      <path d="M 22 47 L 42 55" stroke={m} strokeWidth={1.5} strokeLinecap="round" />
      {/* Circle around the new direction sign — emphasis */}
      <path d="M 56 26 C 72 22, 92 26, 90 38 C 88 48, 68 48, 54 44 C 44 40, 44 30, 56 26" stroke={a} strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
      {/* Big question mark above */}
      <path d="M 42 8 C 40 2, 56 0, 58 8 C 60 14, 50 16, 50 22" stroke={a} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M 50 26 L 50 27" stroke={a} strokeWidth={3} strokeLinecap="round" />
      {/* Tiny annotation text */}
      <text x="50" y="112" textAnchor="middle" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "7px", letterSpacing: "0.1em" }}>
        WHICH WAY?
      </text>
    </svg>
  );
}

/**
 * 02 — A paper/worksheet with branching arrows coming off it
 * Like an assessment item spawning adaptive paths
 */
function Measurement() {
  const ref = useDrawIn(200);
  return (
    <svg ref={ref} viewBox="0 0 100 120" fill="none" aria-hidden="true" className="w-20">
      {/* Worksheet — wobbly rectangle */}
      <path d="M 20 6 C 22 4, 60 5, 80 6 C 82 8, 81 40, 80 55 C 78 57, 22 56, 20 55 C 18 53, 19 8, 20 6" stroke={m} strokeWidth={2} strokeLinecap="round" />
      {/* Lines on worksheet */}
      <path d="M 28 16 C 36 15, 54 15, 72 16" stroke={ml} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M 28 24 C 40 23, 56 23, 72 24" stroke={ml} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M 28 32 C 44 31, 60 31, 72 32" stroke={ml} strokeWidth={1.5} strokeLinecap="round" />
      {/* Checkmark on first line */}
      <path d="M 26 14 L 30 18 L 38 12" stroke={a} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* X on second line */}
      <path d="M 26 22 L 32 28" stroke={a} strokeWidth={2} strokeLinecap="round" />
      <path d="M 32 22 L 26 28" stroke={a} strokeWidth={2} strokeLinecap="round" />
      {/* Arrow branching down from worksheet */}
      <path d="M 50 55 C 50 62, 50 66, 50 70" stroke={a} strokeWidth={2} strokeLinecap="round" />
      {/* Branch left */}
      <path d="M 50 70 C 44 76, 30 80, 20 86" stroke={a} strokeWidth={2} strokeLinecap="round" />
      <path d="M 24 82 L 18 88 L 26 90" stroke={a} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Branch right */}
      <path d="M 50 70 C 56 76, 70 80, 80 86" stroke={a} strokeWidth={2} strokeLinecap="round" />
      <path d="M 76 82 L 82 88 L 74 90" stroke={a} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Branch center */}
      <path d="M 50 70 C 50 78, 50 84, 50 90" stroke={m} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M 47 86 L 50 92 L 53 86" stroke={m} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Small dots at endpoints */}
      <path d="M 18 90 L 18 91" stroke={a} strokeWidth={4} strokeLinecap="round" />
      <path d="M 82 90 L 82 91" stroke={a} strokeWidth={4} strokeLinecap="round" />
      <path d="M 50 94 L 50 95" stroke={m} strokeWidth={4} strokeLinecap="round" />
      {/* "easy" / "hard" annotations */}
      <text x="12" y="102" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "6px" }}>
        easy
      </text>
      <text x="74" y="102" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "6px" }}>
        hard
      </text>
      <text x="50" y="114" textAnchor="middle" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "7px", letterSpacing: "0.1em" }}>
        ADAPT
      </text>
    </svg>
  );
}

/**
 * 03 — A magnifying glass examining a squiggly line graph
 * with "hmm" annotation
 */
function AITools() {
  const ref = useDrawIn(200);
  return (
    <svg ref={ref} viewBox="0 0 100 120" fill="none" aria-hidden="true" className="w-20">
      {/* Axes — wobbly */}
      <path d="M 12 14 C 11 30, 12 55, 12 88" stroke={m} strokeWidth={2} strokeLinecap="round" />
      <path d="M 10 86 C 30 87, 60 86, 88 87" stroke={m} strokeWidth={2} strokeLinecap="round" />
      {/* Line graph — messy, uncertain */}
      <path d="M 16 76 C 22 72, 28 60, 34 64 C 40 68, 42 50, 50 42 C 56 36, 60 44, 66 38 C 72 32, 76 24, 82 20"
        stroke={m} strokeWidth={2} strokeLinecap="round" />
      {/* Second line — the "AI" condition, in accent */}
      <path d="M 16 78 C 24 70, 30 52, 38 40 C 44 30, 52 26, 58 22 C 64 18, 72 14, 80 12"
        stroke={a} strokeWidth={2.5} strokeLinecap="round" />
      {/* Circle around the gap between lines — "is this real?" */}
      <path d="M 42 28 C 56 22, 68 24, 70 36 C 72 46, 60 50, 48 48 C 38 46, 34 36, 42 28"
        stroke={a} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
      {/* Arrow pointing to gap */}
      <path d="M 78 48 C 74 46, 70 44, 66 42" stroke={a} strokeWidth={1.5} strokeLinecap="round" />
      {/* Small annotation */}
      <text x="80" y="56" fill={a}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "7px", fontStyle: "italic" }}>
        real?
      </text>
      {/* Axis labels */}
      <text x="4" y="12" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "6px" }}>
        ^
      </text>
      <text x="86" y="96" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "6px" }}>
        $
      </text>
      <text x="50" y="114" textAnchor="middle" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "7px", letterSpacing: "0.1em" }}>
        EVIDENCE
      </text>
    </svg>
  );
}

/**
 * 04 — Two circles (schools) connected, one bigger/darker
 * with an arrow suggesting flow/rebalancing
 */
function Equity() {
  const ref = useDrawIn(200);
  return (
    <svg ref={ref} viewBox="0 0 100 120" fill="none" aria-hidden="true" className="w-20">
      {/* Big circle — well-resourced school */}
      <path d="M 30 22 C 44 18, 56 24, 56 38 C 56 50, 44 58, 30 58 C 16 58, 6 48, 6 36 C 6 24, 16 18, 28 20"
        stroke={m} strokeWidth={2.5} strokeLinecap="round" />
      {/* Fill suggestion — hatching */}
      <path d="M 16 28 C 22 26, 38 28, 46 32" stroke={ml} strokeWidth={1} strokeLinecap="round" />
      <path d="M 12 36 C 20 34, 40 36, 50 40" stroke={ml} strokeWidth={1} strokeLinecap="round" />
      <path d="M 14 44 C 22 42, 36 44, 44 48" stroke={ml} strokeWidth={1} strokeLinecap="round" />
      {/* Small circle — under-resourced school */}
      <path d="M 72 56 C 80 54, 88 58, 88 66 C 88 74, 80 78, 72 78 C 64 78, 58 72, 58 66 C 58 60, 64 54, 72 56"
        stroke={m} strokeWidth={2} strokeLinecap="round" />
      {/* Arrow from big to small — resource flow */}
      <path d="M 46 50 C 50 54, 54 56, 58 60" stroke={a} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M 54 54 L 60 62 L 52 62" stroke={a} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Annotation: arrow curving back suggesting "or does it flow the other way?" */}
      <path d="M 62 54 C 68 44, 76 40, 80 36" stroke={a} strokeWidth={1.5} strokeLinecap="round" strokeDasharray="3 3" />
      {/* Question marks near both */}
      <path d="M 30 12 C 28 8, 36 6, 38 10 C 40 14, 34 15, 34 18" stroke={a} strokeWidth={2} strokeLinecap="round" />
      <path d="M 34 22 L 34 23" stroke={a} strokeWidth={2.5} strokeLinecap="round" />
      {/* Labels */}
      <text x="28" y="40" textAnchor="middle" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "7px" }}>
        $$$
      </text>
      <text x="73" y="70" textAnchor="middle" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "6px" }}>
        $
      </text>
      {/* Bottom label */}
      <text x="50" y="98" textAnchor="middle" fill={m}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "7px", letterSpacing: "0.1em" }}>
        FOR WHOM?
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
    <div className={`${className} -rotate-2`}>
      <Component />
    </div>
  );
}
