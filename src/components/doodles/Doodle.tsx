"use client";

import { useEffect, useRef } from "react";

/**
 * Hand-crafted SVG doodles — confident pen strokes with intentional imperfection.
 * Each path is a manually tuned bezier curve, not generated noise.
 * Animated with stroke-dasharray to "draw in" on mount.
 */

type DoodleType = "underline" | "circle" | "arrow" | "bracket";

interface DoodleProps {
  type: DoodleType;
  color?: string;
  strokeWidth?: number;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const paths: Record<DoodleType, { d: string; viewBox: string }> = {
  underline: {
    // Confident wavy line — subtle vertical variation (2-3px)
    d: "M 2 6 Q 30 2, 55 5.5 T 110 4 T 165 6 T 198 3.5",
    viewBox: "0 0 200 10",
  },
  circle: {
    // Imperfect ellipse — doesn't quite close, like a quick annotation
    d: "M 52 4 C 78 2, 96 12, 96 28 C 96 44, 74 56, 48 56 C 22 56, 4 44, 4 28 C 4 14, 18 4, 44 3",
    viewBox: "0 0 100 60",
  },
  arrow: {
    // Confident horizontal arrow — slight curve, sharp head
    d: "M 4 16 Q 40 13, 80 15 T 156 14 M 142 6 L 160 14 L 140 24",
    viewBox: "0 0 164 30",
  },
  bracket: {
    // Curly bracket — like a margin annotation
    d: "M 16 2 C 4 8, 2 20, 8 32 C 2 44, 4 56, 16 62",
    viewBox: "0 0 20 64",
  },
};

export default function Doodle({
  type,
  color = "var(--accent)",
  strokeWidth = 2,
  className = "",
  animate = true,
  delay = 0,
}: DoodleProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !animate) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = `stroke-dashoffset 0.8s ease ${delay}ms`;
          path.style.strokeDashoffset = "0";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(path);
    return () => observer.disconnect();
  }, [animate, delay]);

  const { d, viewBox } = paths[type];

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
