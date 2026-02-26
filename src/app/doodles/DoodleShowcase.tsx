"use client";

import { useEffect, useRef, useState } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

/* ─────────────────────────────────────────────
   Section 1: react-rough-notation
   Dynamic annotations that wrap real DOM elements
   ───────────────────────────────────────────── */

function RoughNotationSection() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-1">
        Source 1: react-rough-notation
      </h2>
      <p className="text-sm text-muted mb-2">
        Dynamic SVG annotations that wrap actual DOM elements. Built on RoughJS.
        MIT license, 3.8kb.
      </p>
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent mb-6">
        npm install react-rough-notation
      </p>

      {/* All annotation types */}
      <div className="space-y-10">
        <RoughNotationGroup show={show}>
          {/* Underline */}
          <div className="bg-paper border border-border rounded-lg p-8">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
              type=&quot;underline&quot;
            </p>
            <h3 className="font-[family-name:var(--font-source-serif)] text-3xl font-bold text-foreground">
              What matters now in{" "}
              <RoughNotation
                type="underline"
                color="var(--accent)"
                strokeWidth={2}
                padding={2}
                order={1}
              >
                education
              </RoughNotation>
            </h3>
          </div>

          {/* Circle */}
          <div className="bg-paper border border-border rounded-lg p-8">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
              type=&quot;circle&quot;
            </p>
            <div className="flex items-center gap-8">
              <RoughNotation
                type="circle"
                color="var(--accent)"
                strokeWidth={2}
                padding={12}
                order={2}
              >
                <span className="font-[family-name:var(--font-source-serif)] text-4xl font-bold text-foreground">
                  15M+
                </span>
              </RoughNotation>
              <span className="text-muted">students reached</span>
            </div>
          </div>

          {/* Box */}
          <div className="bg-paper border border-border rounded-lg p-8">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
              type=&quot;box&quot;
            </p>
            <p className="text-foreground text-lg">
              We build{" "}
              <RoughNotation
                type="box"
                color="var(--accent)"
                strokeWidth={2}
                padding={4}
                order={3}
              >
                open infrastructure
              </RoughNotation>{" "}
              for education research.
            </p>
          </div>

          {/* Highlight */}
          <div className="bg-paper border border-border rounded-lg p-8">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
              type=&quot;highlight&quot;
            </p>
            <p className="text-foreground text-lg">
              AI fundamentally changes{" "}
              <RoughNotation
                type="highlight"
                color="rgba(255, 220, 100, 0.4)"
                order={4}
              >
                what students need to know
              </RoughNotation>
              .
            </p>
          </div>

          {/* Bracket */}
          <div className="bg-paper border border-border rounded-lg p-8">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
              type=&quot;bracket&quot;
            </p>
            <div className="max-w-sm">
              <RoughNotation
                type="bracket"
                color="var(--accent)"
                strokeWidth={2}
                brackets={["left"]}
                padding={8}
                order={5}
              >
                <div className="space-y-2 text-sm text-muted pl-4">
                  <p>Open research, open data</p>
                  <p>Open assessments, open tools</p>
                  <p>Open training, open community</p>
                </div>
              </RoughNotation>
            </div>
          </div>

          {/* Strike-through */}
          <div className="bg-paper border border-border rounded-lg p-8">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
              type=&quot;strike-through&quot;
            </p>
            <p className="text-foreground text-lg">
              Education needs{" "}
              <RoughNotation
                type="strike-through"
                color="var(--accent)"
                strokeWidth={2}
                order={6}
              >
                more standardized tests
              </RoughNotation>{" "}
              better questions.
            </p>
          </div>

          {/* Crossed-off */}
          <div className="bg-paper border border-border rounded-lg p-8">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
              type=&quot;crossed-off&quot;
            </p>
            <p className="text-foreground text-lg">
              <RoughNotation
                type="crossed-off"
                color="var(--accent)"
                strokeWidth={2}
                order={7}
              >
                Hype-driven edtech
              </RoughNotation>{" "}
              &rarr; Evidence-driven research
            </p>
          </div>
        </RoughNotationGroup>

        {/* Configurable demo */}
        <ConfigurableDemo />
      </div>
    </div>
  );
}

function ConfigurableDemo() {
  const [show, setShow] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [iterations, setIterations] = useState(2);

  return (
    <div className="bg-paper border border-border rounded-lg p-8">
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
        Interactive: tune parameters
      </p>
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setShow(!show)}
          className="px-4 py-2 bg-foreground text-background text-sm rounded"
        >
          {show ? "Hide" : "Show"} annotations
        </button>
        <label className="flex items-center gap-2 text-sm text-muted">
          strokeWidth:
          <input
            type="range"
            min={1}
            max={5}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-20"
          />
          <span className="font-mono text-xs">{strokeWidth}</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          iterations:
          <input
            type="range"
            min={1}
            max={4}
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="w-20"
          />
          <span className="font-mono text-xs">{iterations}</span>
        </label>
      </div>
      <RoughNotationGroup show={show}>
        <h3 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground leading-relaxed">
          <RoughNotation
            type="underline"
            color="var(--accent)"
            strokeWidth={strokeWidth}
            iterations={iterations}
            order={1}
          >
            Impact
          </RoughNotation>
          {" "}through{" "}
          <RoughNotation
            type="circle"
            color="var(--accent)"
            strokeWidth={strokeWidth}
            iterations={iterations}
            padding={8}
            order={2}
          >
            open
          </RoughNotation>
          {" "}
          <RoughNotation
            type="highlight"
            color="rgba(255, 220, 100, 0.35)"
            iterations={iterations}
            order={3}
          >
            research infrastructure
          </RoughNotation>
        </h3>
      </RoughNotationGroup>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section 2: SVG Backgrounds hand-drawn elements
   Static, high-quality single-path SVGs
   ───────────────────────────────────────────── */

const svgBackgroundsDoodles = {
  underlines: [
    {
      name: "Angry Underline",
      viewBox: "0 0 1412 136",
      path: "M2.9 51.31c1.54 1.59 3.55 2.42 5.67 2.93 9.55 2.69 12.36 4.04 30.44 7.8-3 .3-5.73.44-8.57 3.08a9.83 9.83 0 0 0-2.07 10.92c.83 2.7 3.33 4.22 5.31 6.05 10.97 9.24 37.74 12.54 57.74 16.6 28.32 5.7 56.66 11.52 85.37 14.86 23.26 11.61 80.27 14.32 103.75 15.4 34.52 2.19 69.08 3.36 103.65 3.76 121.04 6.36 242.43.51 363.58.82 271.97-15.76 111.74-7.14 354.24-27.85 46.28-2.18 92.54-4.84 138.71-8.85 12.39-1.12 31.77-2.4 34.68-3.76 3.32-1.16 5.52-4.34 6.02-7.77 123.48-7.79 121.13-7.18 123.45-8.4 4.59-1.61 7.1-7.14 5.79-11.8a10.12 10.12 0 0 0-9.64-7.34c-46.89.01-33.59-2.78-103.06 3.46l10.94-1.87c1.99-.76 4.08-1.67 5.19-3.58 4.19-4.72 2.14-13.98-5.64-15.77-3.38-2.63-6.42-2-14.13-2.11-4.56-.7-9.13-1.34-13.72-1.81 34.64-5.34 46.49-8.03 55.99-12.31 2.43-1.11 4.63-2.64 6.94-3.97 14.45-7.01 3.34-24.98-8.18-18.36-2.71 1.43-5.2 3.25-7.94 4.62-11.02 4.17-22.83 5.68-34.36 7.85-36.51 6.23-65.21 9.47-105.27 13.24-39.97 3.44-79.94 7.17-120.01 9.1-112.89 6.65-225.89 10.72-338.92 13.94-139.42 4.28-72.29 2.74-238.74 3.83-152.12.02-105.22.84-209.3-3.14-24.84-.9-33.26-1.91-65.79-4.63-17.2-1.82-43.29-7.05-66.97-9.27-4.21-.16-8.68-1.39-12.64.37a9.33 9.33 0 0 0-5.97 7.81l-.03.26c-68.56-8.07-86.97-8.7-119.44-11.18a7.6 7.6 0 0 0-3.85.86 9.31 9.31 0 0 0-5.97 7.81c-.59 3.07.64 6.15 2.75 8.4Z",
    },
    {
      name: "Double Underline",
      viewBox: "0 0 1283 132",
      path: "M1282.46 5.79c-.91-3.88-5.18-6.65-9.04-5.54-104.37 29.02-193.78 56.87-361.6 74.53-268.41 28.16-539.6 14.6-803.08-26.38C94.9 47.97-.34 26.24.08 41.38c-1.56 14.21 19.47 12.91 29.6 17.24 32.82 8.6 66.1 15.33 99.4 21.81 238.99 44.43 482.98 55.29 725.63 49.01 92.37-4.11 185.68-9.96 275.51-33.09 18.68-6.31 42.79-9.21 55.18-25.89 6.76-13.28-12.41-21.16-13.83-6.12-17.69 11.67-39.31 15.61-59.45 21.34-114.56 25.18-245.31 30.46-361.99 30.36-191.39.45-383.13-10.13-572-42.21 277.31 36.42 560.77 44.96 837.82 2.23 104.21-15.4 195.11-42.74 260.97-61.22a7.57 7.57 0 0 0 5.54-9.05Z",
    },
    {
      name: "Dual Underline",
      viewBox: "0 0 1213 73",
      path: "M1212.41 5.51c3.05 12.87-22.36 11.93-30.26 15.68-94.32 20.51-269.09 32.42-365.48 37.51-77.91 3.82-155.66 9.93-233.67 11.67-57.49 2.56-115.05-.19-172.57 1.58-121.28.91-243.17 1.88-363.69-13.33-12.51-2.64-25.8-2.92-37.77-7.45-30.66-21.42 26.02-21.53 38.52-19.26 359.95 29.05 364.68 27.36 638.24 17.85 121-3.78 241.22-19.21 426.76-41.46 4.72-.65 9.18 3.56 8.45 8.36a941.74 941.74 0 0 0 54.29-9.21c9.33-2.33 18.7-4.56 27.95-7.19a7.59 7.59 0 0 1 9.23 5.24Z",
    },
    {
      name: "Marker Smirk",
      viewBox: "0 0 1576 141",
      path: "M153.58 20.56c54.61 7.77 11.57 2.06 114.89 15.59 13.33 1.74 90.26 10.48 91.36 10.58 134.57 12.96 190.69 18.5 388.54 25.15 129.22 1.29 93.08 1.1 154.55.57 81.39-.71 59.62-.04 125.55-4.57 63.95-4.4 45.79-3.03 63.95-4.82 122.74-12.1 74.45-6.7 196.81-22.16.11-.01 87.68-12.88 144.71-23.82l59.43-11.39c1.85-.35 3.34 1.62 4.26 2.89 5.62 7.81 7.57 23.36 5.18 27.51 24.07-1.73 36.84-3.04 53.78-2.26 2.94.14 5.88.72 8.79 1.14 7.63 2.7 13.25 29.31 8.37 33.57a11.5 11.5 0 0 1-6.34 3.04 61.01 61.01 0 0 1-21.5 10.23c-4.78 1.12-7.26 1.09-26.8 2.32-26.15 1.64-20.08 2.59-70.36 10.41-124.17 19.35-260.96 36.26-386.48 42.12-203.77 9.49-418.63-.99-621.76-19.77C188.84 102.05 36.15 75.18 30.07 74.7a10.51 10.51 0 0 1-4.75-1.64c-1.91-1.23-3.06-3.52-4.14-5.42-5.56-9.8-6.47-22.79-4.73-27.16-2.45-1.29-4.88-2.65-7.33-3.91C4.2 34.06-2.72 12.7 1.11 4.47c.85-1.32 1.61-2.4 2.71-3.52C4.57.19 5.83 0 6.95 0c7.42 0 128.62 17.94 146.63 20.56Z",
    },
    {
      name: "Needle Underline",
      viewBox: "0 0 1418 125",
      path: "M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z",
    },
  ],
  arrows: [
    {
      name: "Curved Arrow",
      viewBox: "0 0 500 500",
      path: "m385.54 271.64-.8.45.8-.45ZM447.89 211.06c-18.76-27.31-44.82-59.56-66.31-83.65a9.18 9.18 0 0 0-5.38-3.7c-10.65-2.09-14.53 7.22-6.33 14.04 18.97 23.31 37.56 47.09 54.62 71.86-27.69-9-80.46-12.81-89.57-14-78.54-5.99-162.26 9.22-223.16 62.1-32.32 27.27-66.02 69.31-65.22 113.55-.02 7.28 17.74 8.59 19.2-5.66 7.56-72.25 95.56-133.37 162.44-146.43 55.03-12.22 112.14-8.65 167.2 1.5 23.18 4.25 22.56 5.37 29.51 7.79-17.27 11.16-35.79 20.45-53.52 30.85-6.49 5.38-28.25 9.44-21.03 20.84 10.16 11.23 24.87-4.35 35.21-8.51a2123.25 2123.25 0 0 0 33.44-19.16c10.18-7.17 31.93-15.13 34.5-27.99.37-5.08-2.96-9.39-5.57-13.44Z",
    },
    {
      name: "Straight Arrow",
      viewBox: "0 0 500 500",
      path: "M473.33 238.76c-37.87-14.12-73.32-33.93-109.85-51.12-10.8-3.82-14.66 15.48-5.99 19.86 23.28 11.17 46.34 22.86 69.79 33.68-8.74.27-209.98-1.83-252.82-1.8-32.97-.16-65.98-.49-98.88-2.88-17.48-.3-37.89-8.08-51.42.58-4.96 3.18-4.14 15.74 2.11 17.84 5.71 1.42 11.54 2.14 17.37 2.81 104.31 12.85 276.22 4.59 380.98 2.13a2013.6 2013.6 0 0 0-78.59 35.55c-5.86 1.41-7.88 9.35-5.19 14.27 2.25 4.8 7.23 3.29 10.87 1.17 77.31-35.03 102.2-42.06 121.51-51.28 7.42-4.05 8.17-17.08.12-20.81Z",
    },
    {
      name: "Twist Arrow",
      viewBox: "0 0 500 500",
      path: "M437.65 228.63c-11-11.3-28.02-30.74-43.85-33.25-13.68.4-4.24 16.99 4.72 15.98 1.67-.27 14.6 12 20.99 18.95-73.13-19.32-152.62-31.59-224.6-2.19-24.36-20.09-70.46-5.55-97.86 2.74-10.7 4.38-44.74 15.3-45.58 27.63 2.63 10.11 14.03 9.62 19.87 2.58 6.8-4.63 14.23-8.1 21.77-11.33 27.16-10.03 57.65-20.38 86.74-14.81-19.75 10.96-45.07 24.46-49.37 48.67-.98 20.42 24.81 26.36 39.14 16.1 18.7-11.31 37.58-31.54 34.51-54.98 67.16-28.65 141.54-17.06 210.28.69a634.53 634.53 0 0 0-26.86 9.82c-4.5 1.55-4.87 7.28-1.98 10.53 6.02 8.29 15.78 3.88 23.3.63 8.17-3.12 16.31-6.28 24.61-9.03 22.39-5.78 16.3-15.12 4.17-28.72Zm-286.98 58.93c4.9-15.45 20.39-24.72 33.42-32.9-6.02 14.67-18.84 26.87-33.42 32.9Z",
    },
    {
      name: "Arc Arrow",
      viewBox: "0 0 500 500",
      path: "M371.35 189.98c-12.56-10.09-25.59-19.57-38.1-29.72-6.06-6.52-20.68-5.12-21.92 5.06.93 9.17 20.2 24.39 34.26 35.46-96.43 7.44-143.02 2.75-177.77 3.41-70.86 1.35-54.39 2.66-53.96 128.92.03 13.12 22.95 14.53 24.58 1.52 2.74-34.23 4.04-68.63 4.26-102.97 51.39-2.58 104.86 3.26 136.86 2.87 18.27-.22 44.73-1.1 65.18-3.9a1134 1134 0 0 0-18.02 30.68c-4.51 6.5-.06 14.96 6.75 17.61 7.11 3.19 17.22 1.89 21.74-4.94 7.1-12.42 14.32-24.76 21.23-37.28 12.08-22.34 20.53-30.54-5.11-46.71Z",
    },
  ],
  circles: [
    {
      name: "Circle Clean",
      viewBox: "0 0 800 800",
      path: "M753.7 376.2c-8-61.2-39.1-117.5-73.6-167.8C607.5 111 479.5 60.9 359.8 78.3c-44 7.4-86.4 24.5-125.2 46.5-44.6 27.8-81.2 68-109.3 112a615 615 0 0 0-74.8 185.7C39.8 464 47 506.8 65.8 544.6c-5.8 4-.5 11.4 2.3 15.9 18.2 33.5 41.2 64.9 71.3 88.7 115.6 90 280.3 96 415 49.6C695 653.3 773.3 521.5 753.8 376.3Zm-239.5 316c-136.6 36.5-312.7 20.6-407.9-94.6 4-2.6 3.8-8.5 1.4-12.2-6.2-9.5-12-19.3-17.4-29.3a281 281 0 0 1-19.7-46.9C48.6 450.9 90.6 351 116 296c32.7-66.4 80.7-129.6 148-163.3a319 319 0 0 1 395.5 76.1c41.3 55 75.8 119.9 78.9 189.7 7.8 149-82 257.8-224.2 293.8Z",
    },
    {
      name: "Oval Clean",
      viewBox: "0 0 1200 600",
      path: "M544.2 466c-106.2-.7-287.6-8.5-372.9-73.8-55.6-44.7-29.8-105.5 20.8-140.9C336.8 151.2 560.3 126 733 136.2c54 3 109.5 11.6 161.6 28.2 23 5.8 42.3 19.5 64.1 28 57 22.3 138.4 82.6 82.7 147.2-89.2 98.1-367.1 125.6-497.1 126.3Zm-22.3-13c121.7.1 244.4-12 361.5-46.2 129.7-35.4 249.2-119.4 68-203-4.3 1.5-8.2-1.1-11-4.3-46.2-17.8-95.3-26.8-143.3-38.6-61.7-17.5-126.3-16.2-189.8-13.6-124.7 7.1-251.8 29-363.4 87.4-86 43.3-135.6 121-23 171.5 95 38 199.6 44.5 301 46.8Z",
    },
    {
      name: "Oval Flap",
      viewBox: "0 0 1240 600",
      path: "M460.3 531c-106.7-3.3-217.2-12.7-315.6-56.5C88 448.7 32.7 394.4 37 327.8c3.2-36 29-64 53.5-88.3C191.8 144.2 332.1 108 465.9 86.2c164-25.2 332-22.5 495.8 2.7 15.7.9 175 34.4 136.2 49.7 73.3 30.4 139 103 86.1 181.7-32.6 46.3-85.7 73.2-135.4 97.6C963 457 870.8 479.5 779 498.6c-104.8 21.1-211.5 35-318.5 32.5Zm28.5-16.5c155.2 2.7 623.7-69.6 687.7-223.9 28.8-82.1-66-134.7-132.5-153a1727.2 1727.2 0 0 0-139-33.7c-6.6-1.8-18.7-1-17.8-10.6-216.3-22.4-493-11.6-689 89.6-56.6 31.2-163.8 103-138.7 178.2 13.4 45.7 52 79.2 94 98.8 105 45.6 222.2 53.2 335.3 54.6Z",
    },
    {
      name: "Oval Overline",
      viewBox: "0 0 900 450",
      path: "M495.6 400c-123.6-3-268.2-23-373-92.4-39.3-25.8-66.2-77.2-42.1-122.2 30-56.3 95-81 152.2-100.9L194 86.1c-16.7.5-17.6-21.7 0-21.4 47.6-2.2 95.2-3.7 142.8-5a841 841 0 0 1 158.4-9.3c83.8 4.7 171.3 15 245.5 56.9 13.6 9.4 49.3 31 39.4 49.8 72.4 52.8 60.8 142.5-14.6 185.5-81.6 45-177.9 56.9-269.9 57.5ZM468 374c97.5 1.8 210.7-6 293.4-62.2 49-36.7 47.4-101.3-2.4-136.6-40.4-31.3-90.2-47.5-138.5-62.1l.5.1C463.7 67.7 279.7 59 140.4 157.5c-80 64.6-19.7 130 54.2 159.8 86.4 36 180.2 52.1 273.3 56.6ZM654.8 97.6c30.6 9.7 60.9 21 89.3 36-43.9-33.2-100-44.5-153.1-53.4 21.4 5 42.7 10.9 63.8 17.4Z",
    },
  ],
};

function SVGBackgroundsSection() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-1">
        Source 2: SVG Backgrounds
      </h2>
      <p className="text-sm text-muted mb-2">
        Professionally designed hand-drawn SVGs. Single-path, lightweight. Free tier with attribution.
      </p>
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent mb-6">
        svgbackgrounds.com/elements
      </p>

      {/* Underlines */}
      <h3 className="font-semibold text-foreground mb-4">Underlines</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {svgBackgroundsDoodles.underlines.map((item) => (
          <div
            key={item.name}
            className="bg-paper border border-border rounded-lg p-6 flex flex-col items-center gap-4"
          >
            <div className="w-full h-16 flex items-center justify-center">
              <svg
                viewBox={item.viewBox}
                fill="currentColor"
                className="w-full max-w-[280px] h-auto text-foreground"
              >
                <path d={item.path} />
              </svg>
            </div>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light">
              {item.name}
            </p>
            {/* In context */}
            <div className="w-full border-t border-border pt-4">
              <h4 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground relative inline-block">
                What matters now
                <svg
                  viewBox={item.viewBox}
                  fill="var(--accent)"
                  className="absolute -bottom-2 left-0 w-full h-[14px] opacity-70"
                >
                  <path d={item.path} />
                </svg>
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <h3 className="font-semibold text-foreground mb-4">Arrows</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {svgBackgroundsDoodles.arrows.map((item) => (
          <div
            key={item.name}
            className="bg-paper border border-border rounded-lg p-6 flex flex-col items-center gap-3"
          >
            <div className="w-full h-20 flex items-center justify-center">
              <svg
                viewBox={item.viewBox}
                fill="currentColor"
                className="w-16 h-16 text-foreground"
              >
                <path d={item.path} />
              </svg>
            </div>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Circles */}
      <h3 className="font-semibold text-foreground mb-4">Circles &amp; Ovals</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {svgBackgroundsDoodles.circles.map((item) => (
          <div
            key={item.name}
            className="bg-paper border border-border rounded-lg p-6 flex flex-col items-center gap-4"
          >
            <div className="w-full h-20 flex items-center justify-center">
              <svg
                viewBox={item.viewBox}
                fill="currentColor"
                className="w-auto h-16 text-foreground max-w-full"
              >
                <path d={item.path} />
              </svg>
            </div>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light">
              {item.name}
            </p>
            {/* In context: circle around a stat */}
            <div className="w-full border-t border-border pt-4 flex justify-center">
              <div className="relative inline-block">
                <span className="font-[family-name:var(--font-source-serif)] text-3xl font-bold text-foreground">
                  34K+
                </span>
                <svg
                  viewBox={item.viewBox}
                  fill="var(--accent)"
                  className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] opacity-30"
                >
                  <path d={item.path} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* In-context examples */}
      <h3 className="font-semibold text-foreground mb-4">In Context</h3>
      <div className="space-y-6">
        {/* Arrow to CTA */}
        <div className="bg-paper border border-border rounded-lg p-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
            Arrow pointing to CTA
          </p>
          <div className="flex items-center gap-4">
            <svg
              viewBox="0 0 500 500"
              fill="var(--accent)"
              className="w-16 h-16 opacity-50"
            >
              <path d={svgBackgroundsDoodles.arrows[1].path} />
            </svg>
            <button className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded">
              Get in touch
            </button>
          </div>
        </div>

        {/* Heading with underline */}
        <div className="bg-paper border border-border rounded-lg p-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
            Heading with underline
          </p>
          <h3 className="font-[family-name:var(--font-source-serif)] text-3xl font-bold text-foreground relative inline-block">
            Education has a crisis of purpose
            <svg
              viewBox="0 0 1418 125"
              fill="var(--accent)"
              className="absolute -bottom-2 left-0 w-full h-[12px] opacity-60"
            >
              <path d={svgBackgroundsDoodles.underlines[4].path} />
            </svg>
          </h3>
        </div>

        {/* Circled stat */}
        <div className="bg-paper border border-border rounded-lg p-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light mb-4">
            Circled stat
          </p>
          <div className="flex items-center gap-8">
            <div className="relative inline-block">
              <span className="font-[family-name:var(--font-source-serif)] text-5xl font-bold text-foreground">
                5M+
              </span>
              <svg
                viewBox="0 0 800 800"
                fill="var(--accent)"
                className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] opacity-25"
              >
                <path d={svgBackgroundsDoodles.circles[0].path} />
              </svg>
            </div>
            <span className="text-muted text-lg">assessments delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section 3: dddoodle (fffuel.co)
   Browser-viewable samples from the pack
   ───────────────────────────────────────────── */

function DddoodleSection() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-1">
        Source 3: dddoodle (fffuel.co)
      </h2>
      <p className="text-sm text-muted mb-2">
        126 hand-drawn SVG illustrations. CC BY 4.0 license. Uses SVG filters for hand-drawn effect.
        36 arrows, 18 circles, 9 lines, 5 boxes, 58 misc.
      </p>
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent mb-6">
        Downloaded to /dddoodle-pack-extracted
      </p>

      <p className="text-sm text-muted mb-6 bg-surface p-4 rounded-lg border border-border">
        These use SVG filter effects (feTurbulence + feDisplacementMap) which makes them heavier
        and harder to customize colors on. They look great standalone but are less practical for
        inline annotations. Browse the downloaded pack at{" "}
        <code className="text-xs bg-surface-alt px-1 py-0.5 rounded">
          /dddoodle-pack-extracted/dddoodle-pack/
        </code>
      </p>

      {/* Show a few samples using img tags from the pack */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          "arrows/arrow-1",
          "arrows/arrow-5",
          "arrows/arrow-10",
          "arrows/arrow-20",
          "circles/circle-1",
          "circles/circle-5",
          "circles/circle-10",
          "circles/circle-15",
          "lines/line-1",
          "lines/line-3",
          "lines/line-5",
          "lines/line-7",
          "misc/misc-1",
          "misc/misc-2",
          "misc/misc-10",
          "misc/misc-20",
        ].map((path) => (
          <div
            key={path}
            className="bg-paper border border-border rounded-lg p-4 flex flex-col items-center gap-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/dddoodle/${path}.svg`}
              alt={path}
              className="w-20 h-20 object-contain"
            />
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-wider text-muted-light text-center">
              {path.split("/")[1]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main showcase
   ───────────────────────────────────────────── */

export default function DoodleShowcase() {
  return (
    <div className="space-y-24">
      <RoughNotationSection />
      <SVGBackgroundsSection />
      <DddoodleSection />

      {/* Comparison / recommendation */}
      <div className="bg-surface border border-border rounded-lg p-8">
        <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-4">
          Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-muted font-medium">Feature</th>
                <th className="text-left py-2 px-4 text-muted font-medium">rough-notation</th>
                <th className="text-left py-2 px-4 text-muted font-medium">SVG Backgrounds</th>
                <th className="text-left py-2 px-4 text-muted font-medium">dddoodle</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium text-foreground">Approach</td>
                <td className="py-2 px-4">Dynamic, wraps DOM</td>
                <td className="py-2 px-4">Static SVG paths</td>
                <td className="py-2 px-4">Static SVG + filters</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium text-foreground">Types</td>
                <td className="py-2 px-4">7 annotation types</td>
                <td className="py-2 px-4">150+ elements</td>
                <td className="py-2 px-4">126 illustrations</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium text-foreground">Color control</td>
                <td className="py-2 px-4">Full (CSS color)</td>
                <td className="py-2 px-4">Full (fill/stroke)</td>
                <td className="py-2 px-4">Limited (filter-based)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium text-foreground">Animation</td>
                <td className="py-2 px-4">Built-in draw</td>
                <td className="py-2 px-4">Manual (dasharray)</td>
                <td className="py-2 px-4">None built-in</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium text-foreground">Size</td>
                <td className="py-2 px-4">3.8kb gzip</td>
                <td className="py-2 px-4">~1-2kb per SVG</td>
                <td className="py-2 px-4">~2-5kb per SVG</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-foreground">License</td>
                <td className="py-2 px-4">MIT</td>
                <td className="py-2 px-4">Attribution (free)</td>
                <td className="py-2 px-4">CC BY 4.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
