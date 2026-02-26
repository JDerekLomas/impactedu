"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

type DoodleType =
  | "underline"
  | "circle"
  | "arrow"
  | "quotes"
  | "star"
  | "bracket";

interface DoodleProps {
  type: DoodleType;
  width?: number;
  height?: number;
  color?: string;
  seed?: number;
  className?: string;
}

export default function Doodle({
  type,
  width = 100,
  height = 40,
  color = "var(--accent)",
  seed = 1,
  className = "",
}: DoodleProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const opts = { stroke: color, roughness: 1.5, seed };

    switch (type) {
      case "underline":
        svg.appendChild(
          rc.line(4, height * 0.7, width - 4, height * 0.6, {
            ...opts,
            strokeWidth: 2,
            bowing: 3,
          })
        );
        break;

      case "circle":
        svg.appendChild(
          rc.ellipse(width / 2, height / 2, width - 12, height - 12, {
            ...opts,
            strokeWidth: 1.5,
            roughness: 2,
            fill: "none",
          })
        );
        break;

      case "arrow": {
        const mid = height / 2;
        svg.appendChild(
          rc.line(8, mid, width - 16, mid, {
            ...opts,
            strokeWidth: 1.5,
          })
        );
        svg.appendChild(
          rc.line(width - 22, mid - 7, width - 10, mid, {
            ...opts,
            strokeWidth: 1.5,
            roughness: 1,
          })
        );
        svg.appendChild(
          rc.line(width - 22, mid + 7, width - 10, mid, {
            ...opts,
            strokeWidth: 1.5,
            roughness: 1,
          })
        );
        break;
      }

      case "quotes": {
        // Opening quotation mark — two small curved strokes
        const draw = (x: number) => {
          svg.appendChild(
            rc.path(
              `M ${x + 8} ${height * 0.2} C ${x + 6} ${height * 0.5}, ${x} ${height * 0.6}, ${x + 2} ${height * 0.75}`,
              { ...opts, strokeWidth: 2, roughness: 1.2 }
            )
          );
        };
        draw(width * 0.2);
        draw(width * 0.5);
        break;
      }

      case "star": {
        const cx = width / 2;
        const cy = height / 2;
        const r = Math.min(width, height) / 2 - 5;
        const points: [number, number][] = [];
        for (let i = 0; i < 10; i++) {
          const angle = (Math.PI / 5) * i - Math.PI / 2;
          const rad = i % 2 === 0 ? r : r * 0.38;
          points.push([
            cx + rad * Math.cos(angle),
            cy + rad * Math.sin(angle),
          ]);
        }
        svg.appendChild(
          rc.polygon(points, {
            ...opts,
            strokeWidth: 1.5,
            fill: "none",
          })
        );
        break;
      }

      case "bracket":
        svg.appendChild(
          rc.path(
            `M ${width - 4} 6 C ${8} ${height * 0.15}, ${8} ${height * 0.85}, ${width - 4} ${height - 6}`,
            { ...opts, strokeWidth: 1.5, roughness: 1.8, fill: "none" }
          )
        );
        break;
    }
  }, [type, width, height, color, seed]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    />
  );
}
