"use client";

import { useState } from "react";
import Link from "next/link";

interface EstimateResult {
  rawLlmEstimate: number;
  correctedEstimate: number;
  confidence: string;
  analysis: {
    cognitiveSteps: number;
    cognitiveStepsRationale: string;
    prerequisiteLoad: string;
    prerequisiteDetails: string;
    commonMisconceptions: string[];
    transferDistance: string;
    workingMemoryLoad: string;
    distractorQuality: string;
    reasoning: string;
  };
  biasCorrection: {
    applied: boolean;
    method: string;
    rawToFinal: string;
  };
  model: string;
  estimatedAt: string;
}

const EXAMPLE_ITEMS = [
  {
    label: "Easy (Grade 3)",
    stem: "What is 7 + 8?",
    options: ["15", "14", "16", "13"],
    gradeLevel: 3,
    skillName: "Addition within 20",
  },
  {
    label: "Medium (Grade 5)",
    stem: "Maria has 3/4 of a pizza. She eats 1/4. Then her brother gives her 1/2 of a pizza. How much pizza does she have now?",
    options: ["1 whole pizza", "3/4 of a pizza", "1/2 of a pizza", "1 1/4 pizzas"],
    gradeLevel: 5,
    skillName: "Add and subtract fractions with unlike denominators",
  },
  {
    label: "Hard (Grade 6)",
    stem: "The ratio of boys to girls in a class is 3:5. If there are 24 students total, how many more girls than boys are there?",
    options: ["6", "3", "9", "8"],
    gradeLevel: 6,
    skillName: "Ratio reasoning",
  },
];

function difficultyColor(d: number): string {
  if (d < 0.3) return "text-green-700";
  if (d < 0.5) return "text-yellow-700";
  if (d < 0.7) return "text-orange-600";
  return "text-red-700";
}

function difficultyLabel(d: number): string {
  if (d < 0.25) return "Very Easy";
  if (d < 0.4) return "Easy";
  if (d < 0.55) return "Medium";
  if (d < 0.7) return "Hard";
  return "Very Hard";
}

function difficultyBar(d: number): string {
  const pct = Math.round(d * 100);
  return `${pct}%`;
}

export default function DifficultyEstimatorPage() {
  const [stem, setStem] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [gradeLevel, setGradeLevel] = useState(5);
  const [skillName, setSkillName] = useState("");
  const [itemType, setItemType] = useState("multiple-choice");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState("");

  async function estimate() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const body: Record<string, unknown> = {
        stem,
        gradeLevel,
        skillName: skillName || undefined,
        itemType,
      };

      if (itemType === "multiple-choice") {
        const filledOptions = options.filter((o) => o.trim());
        if (filledOptions.length >= 2) {
          body.options = filledOptions;
        }
      }

      const res = await fetch("/api/estimate-difficulty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Estimation failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function loadExample(idx: number) {
    const ex = EXAMPLE_ITEMS[idx];
    setStem(ex.stem);
    setOptions(ex.options);
    setGradeLevel(ex.gradeLevel);
    setSkillName(ex.skillName);
    setItemType("multiple-choice");
    setResult(null);
    setError("");
  }

  return (
    <>
      {/* Header */}
      <section className="py-12 dot-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-accent mb-3">
            Research Tool
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            Item Difficulty Estimator
          </h1>
          <p className="mt-3 text-muted leading-relaxed max-w-2xl">
            Estimate assessment item difficulty using the AIED 2026 approach:
            LLM chain-of-thought analysis with anchored rubrics and bias
            correction. Based on our research across 200 experimental conditions
            and 15+ models.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Examples */}
        <div className="mb-8">
          <p className="text-sm text-muted mb-2">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_ITEMS.map((ex, i) => (
              <button
                key={i}
                onClick={() => loadExample(i)}
                className="px-3 py-1.5 text-xs border border-border rounded hover:bg-surface-alt transition-colors"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Item Stem
              </label>
              <textarea
                value={stem}
                onChange={(e) => setStem(e.target.value)}
                rows={4}
                placeholder="Enter the question text..."
                className="w-full px-3 py-2 border border-border rounded bg-paper text-foreground text-sm placeholder:text-muted-light focus:outline-none focus:ring-1 focus:ring-accent resize-y"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Grade Level
                </label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded bg-paper text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Item Type
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded bg-paper text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="short-answer">Short Answer</option>
                  <option value="numeric">Numeric</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Skill Name{" "}
                <span className="text-muted-light font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g., Add fractions with unlike denominators"
                className="w-full px-3 py-2 border border-border rounded bg-paper text-foreground text-sm placeholder:text-muted-light focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {itemType === "multiple-choice" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Answer Options
                </label>
                <div className="space-y-2">
                  {options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-muted w-5">
                        {String.fromCharCode(65 + i)})
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const next = [...options];
                          next[i] = e.target.value;
                          setOptions(next);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        className="flex-1 px-3 py-1.5 border border-border rounded bg-paper text-foreground text-sm placeholder:text-muted-light focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={estimate}
              disabled={!stem.trim() || loading}
              className="w-full py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Estimating difficulty..." : "Estimate Difficulty"}
            </button>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Results */}
          <div>
            {loading && (
              <div className="flex items-center justify-center h-64 text-muted">
                <div className="text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto mb-3" />
                  <p className="text-sm">
                    Analyzing item difficulty...
                  </p>
                  <p className="text-xs text-muted-light mt-1">
                    Chain-of-thought analysis with bias correction
                  </p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-5">
                {/* Difficulty Score */}
                <div className="p-5 bg-paper rounded-lg border border-border">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">
                      Estimated Difficulty
                    </h3>
                    <span
                      className={`font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase ${
                        result.confidence === "high"
                          ? "text-green-700"
                          : result.confidence === "medium"
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {result.confidence} confidence
                    </span>
                  </div>

                  <div className="flex items-end gap-3">
                    <span
                      className={`font-[family-name:var(--font-source-serif)] text-4xl font-bold ${difficultyColor(
                        result.correctedEstimate
                      )}`}
                    >
                      {result.correctedEstimate.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted mb-1">
                      P(incorrect) &mdash;{" "}
                      {difficultyLabel(result.correctedEstimate)}
                    </span>
                  </div>

                  {/* Visual bar */}
                  <div className="mt-3 h-2 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{
                        width: difficultyBar(result.correctedEstimate),
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-muted-light">Easy</span>
                    <span className="text-[10px] text-muted-light">Hard</span>
                  </div>
                </div>

                {/* Bias Correction */}
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2">
                    Bias Correction
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted">
                      Raw LLM: {result.rawLlmEstimate.toFixed(2)}
                    </span>
                    <span className="text-muted-light">&rarr;</span>
                    <span className="font-medium text-foreground">
                      Corrected: {result.correctedEstimate.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-light mt-1">
                    {result.biasCorrection.method}
                  </p>
                </div>

                {/* Analysis */}
                <div className="p-4 bg-paper rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-3">
                    Difficulty Factor Analysis
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted">Cognitive Steps</span>
                      <div className="font-medium text-foreground">
                        {result.analysis.cognitiveSteps}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted">Prerequisite Load</span>
                      <div className="font-medium text-foreground capitalize">
                        {result.analysis.prerequisiteLoad}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted">Transfer Distance</span>
                      <div className="font-medium text-foreground capitalize">
                        {result.analysis.transferDistance}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted">Working Memory</span>
                      <div className="font-medium text-foreground capitalize">
                        {result.analysis.workingMemoryLoad}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted">Distractor Quality</span>
                      <div className="font-medium text-foreground capitalize">
                        {result.analysis.distractorQuality}
                      </div>
                    </div>
                  </div>

                  {result.analysis.commonMisconceptions?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <span className="text-xs text-muted">
                        Common Misconceptions
                      </span>
                      <ul className="mt-1 space-y-1">
                        {result.analysis.commonMisconceptions.map((m, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted flex items-start gap-1.5"
                          >
                            <span className="text-accent mt-0.5 flex-shrink-0">
                              &mdash;
                            </span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted">Reasoning</span>
                    <p className="text-sm text-foreground mt-1 leading-relaxed">
                      {result.analysis.reasoning}
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-muted-light text-center">
                  Model: {result.model} &middot; {result.estimatedAt}
                </p>
              </div>
            )}

            {!result && !loading && (
              <div className="flex items-center justify-center h-64 text-muted text-sm">
                <div className="text-center">
                  <p>Enter an item and click &ldquo;Estimate Difficulty&rdquo;</p>
                  <p className="text-xs text-muted-light mt-2">
                    Or try one of the examples above
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Method section */}
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                1. Chain-of-thought analysis
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                The LLM analyzes 7 difficulty factors before estimating:
                cognitive steps, prerequisites, misconceptions, transfer
                distance, working memory, distractor quality, and reading load.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                2. Anchored rubric
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Instead of asking &ldquo;how hard is this?&rdquo; we provide
                grade-level calibrated examples at each difficulty level. This
                grounds estimates in concrete comparisons.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                3. Bias correction
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                LLMs exhibit variance collapse (clustering around 0.50) and
                systematic overconfidence. We apply corrections from our AIED
                2026 research across 200 conditions.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/openitems"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded hover:bg-surface-alt transition-colors"
            >
              Open Items &rarr;
            </Link>
            <Link
              href="/blog/aied-2026"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded hover:bg-surface-alt transition-colors"
            >
              AIED 2026 Paper &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
