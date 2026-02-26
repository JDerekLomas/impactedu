"use client";

import { useEffect, useRef } from "react";

/**
 * Hand-crafted SVG doodles — confident pen strokes with intentional imperfection.
 * Each path is a manually tuned bezier curve. Animated with stroke-dasharray
 * to "draw in" when visible.
 */

export type DoodleType =
  | "underline"
  | "underline-thick"
  | "double-underline"
  | "circle"
  | "circle-small"
  | "arrow-right"
  | "arrow-down"
  | "arrow-curved"
  | "bracket"
  | "brace"
  | "star"
  | "asterisk"
  | "checkmark"
  | "x-mark"
  | "question"
  | "exclamation"
  | "lightbulb"
  | "scribble-line"
  | "squiggle"
  | "loop"
  | "spiral"
  | "connection-dots"
  | "thought-bubble"
  | "box"
  | "triangle"
  | "emphasis-lines";

interface DoodlePath {
  paths: string[];
  viewBox: string;
}

interface DoodleProps {
  type: DoodleType;
  color?: string;
  strokeWidth?: number;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const doodles: Record<DoodleType, DoodlePath> = {
  // --- Lines & Underlines ---
  underline: {
    paths: ["M 2 6 Q 30 2, 55 5.5 T 110 4 T 165 6 T 198 3.5"],
    viewBox: "0 0 200 10",
  },
  "underline-thick": {
    paths: ["M 2 7 C 25 3, 45 9, 70 5 S 120 8, 150 4 S 185 7, 198 5"],
    viewBox: "0 0 200 12",
  },
  "double-underline": {
    paths: [
      "M 2 4 Q 50 1, 100 4 T 198 3",
      "M 4 10 Q 55 7, 105 10 T 196 9",
    ],
    viewBox: "0 0 200 14",
  },
  "scribble-line": {
    paths: [
      "M 2 8 C 15 4, 25 12, 40 7 S 60 11, 75 6 S 95 10, 110 5 S 130 9, 145 6 S 165 10, 180 7 S 195 4, 198 8",
    ],
    viewBox: "0 0 200 16",
  },
  squiggle: {
    paths: [
      "M 2 16 C 12 4, 24 4, 34 16 S 56 28, 66 16 S 88 4, 98 16 S 120 28, 130 16 S 152 4, 162 16 S 184 28, 194 16",
    ],
    viewBox: "0 0 196 32",
  },

  // --- Circles & Shapes ---
  circle: {
    paths: [
      "M 52 4 C 78 2, 96 14, 96 30 C 96 46, 74 58, 48 58 C 22 58, 4 46, 4 30 C 4 16, 20 4, 46 3",
    ],
    viewBox: "0 0 100 62",
  },
  "circle-small": {
    paths: [
      "M 20 3 C 30 1, 37 8, 37 18 C 37 28, 28 35, 18 35 C 8 35, 2 27, 2 18 C 2 9, 9 3, 17 3",
    ],
    viewBox: "0 0 40 38",
  },
  box: {
    paths: [
      "M 4 6 L 96 4 L 98 56 L 3 58 Z",
    ],
    viewBox: "0 0 102 62",
  },
  triangle: {
    paths: ["M 50 4 L 96 56 L 4 58 Z"],
    viewBox: "0 0 100 62",
  },

  // --- Arrows ---
  "arrow-right": {
    paths: [
      "M 4 16 Q 40 13, 80 15 T 148 14",
      "M 134 6 L 156 14 L 132 24",
    ],
    viewBox: "0 0 160 30",
  },
  "arrow-down": {
    paths: [
      "M 14 4 Q 12 30, 15 55 T 13 100",
      "M 4 88 L 14 108 L 24 86",
    ],
    viewBox: "0 0 28 112",
  },
  "arrow-curved": {
    paths: [
      "M 4 48 C 10 12, 50 2, 90 8 C 120 12, 140 30, 146 50",
      "M 136 40 L 150 54 L 155 36",
    ],
    viewBox: "0 0 160 60",
  },

  // --- Brackets & Braces ---
  bracket: {
    paths: ["M 16 2 C 4 8, 2 22, 8 34 C 2 46, 4 60, 16 66"],
    viewBox: "0 0 20 68",
  },
  brace: {
    paths: [
      "M 2 4 L 90 4 L 90 16",
      "M 90 16 L 90 28 L 2 28",
    ],
    viewBox: "0 0 94 32",
  },

  // --- Symbols ---
  star: {
    paths: [
      "M 20 2 L 25 14 L 38 14 L 28 22 L 32 35 L 20 27 L 8 35 L 12 22 L 2 14 L 15 14 Z",
    ],
    viewBox: "0 0 40 38",
  },
  asterisk: {
    paths: [
      "M 16 2 L 16 30",
      "M 4 8 L 28 24",
      "M 28 8 L 4 24",
    ],
    viewBox: "0 0 32 32",
  },
  checkmark: {
    paths: ["M 4 22 L 14 34 L 40 6"],
    viewBox: "0 0 44 40",
  },
  "x-mark": {
    paths: [
      "M 4 4 L 28 28",
      "M 28 4 L 4 28",
    ],
    viewBox: "0 0 32 32",
  },
  question: {
    paths: [
      "M 12 12 C 12 2, 32 2, 32 12 C 32 20, 22 22, 22 30",
      "M 21 38 L 22 40",
    ],
    viewBox: "0 0 44 46",
  },
  exclamation: {
    paths: [
      "M 10 4 L 11 28",
      "M 10 36 L 11 38",
    ],
    viewBox: "0 0 22 42",
  },

  // --- Concepts ---
  lightbulb: {
    paths: [
      "M 20 6 C 8 6, 2 16, 6 26 C 8 30, 12 32, 12 36 L 28 36 C 28 32, 32 30, 34 26 C 38 16, 32 6, 20 6",
      "M 14 40 L 26 40",
      "M 15 44 L 25 44",
    ],
    viewBox: "0 0 40 48",
  },
  loop: {
    paths: [
      "M 4 20 C 4 6, 20 2, 30 10 C 40 18, 36 34, 24 36 C 12 38, 6 28, 10 20 C 14 12, 26 10, 32 16",
    ],
    viewBox: "0 0 44 42",
  },
  spiral: {
    paths: [
      "M 24 22 C 28 18, 30 22, 28 26 C 24 32, 16 32, 12 26 C 6 18, 10 8, 20 6 C 32 4, 40 14, 38 26 C 36 38, 22 44, 10 42",
    ],
    viewBox: "0 0 44 48",
  },
  "connection-dots": {
    paths: [
      "M 6 6 L 34 20",
      "M 34 20 L 14 38",
      "M 34 20 L 54 36",
    ],
    viewBox: "0 0 60 44",
  },
  "thought-bubble": {
    paths: [
      "M 30 4 C 50 2, 64 10, 64 24 C 64 38, 48 46, 30 46 C 12 46, 2 38, 2 24 C 2 12, 14 4, 28 4",
      "M 20 46 C 18 50, 14 52, 10 54",
      "M 8 56 C 6 58, 4 58, 4 60",
    ],
    viewBox: "0 0 68 64",
  },
  "emphasis-lines": {
    paths: [
      "M 2 4 L 18 4",
      "M 4 12 L 22 12",
      "M 2 20 L 16 20",
    ],
    viewBox: "0 0 24 24",
  },
};

export const doodleTypes = Object.keys(doodles) as DoodleType[];

export default function Doodle({
  type,
  color = "var(--accent)",
  strokeWidth = 2,
  className = "",
  animate = true,
  delay = 0,
}: DoodleProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !animate) return;

    const paths = svg.querySelectorAll("path");
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            path.style.transition = `stroke-dashoffset 0.6s ease ${delay + i * 150}ms`;
            path.style.strokeDashoffset = "0";
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(svg);
      // Store cleanup
      path.dataset.observerCleanup = "true";
    });

    return () => {
      // Observers will be garbage collected with the elements
    };
  }, [animate, delay]);

  const { paths: pathData, viewBox } = doodles[type];

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {pathData.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
