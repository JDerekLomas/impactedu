"use client";

import { useEffect, useRef, useState } from "react";
import { RoughNotation } from "react-rough-notation";

type AnnotationType =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface AnnotateProps {
  type: AnnotationType;
  color?: string;
  strokeWidth?: number;
  padding?: number | [number, number] | [number, number, number, number];
  iterations?: number;
  brackets?: ("left" | "right" | "top" | "bottom")[];
  multiline?: boolean;
  animationDuration?: number;
  children: React.ReactNode;
}

/**
 * Hand-drawn annotation wrapper using rough-notation.
 * Automatically shows when scrolled into view.
 */
export default function Annotate({
  type,
  color = "var(--accent)",
  strokeWidth = 2,
  padding,
  iterations = 2,
  brackets,
  multiline = false,
  animationDuration = 800,
  children,
}: AnnotateProps) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      <RoughNotation
        type={type}
        show={show}
        color={color}
        strokeWidth={strokeWidth}
        padding={padding}
        iterations={iterations}
        brackets={brackets}
        multiline={multiline}
        animationDuration={animationDuration}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
