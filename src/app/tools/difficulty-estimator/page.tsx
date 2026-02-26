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

interface ExampleItem {
  stem: string;
  options?: string[];
  gradeLevel: number;
  skillName: string;
  itemType: string;
  widget?: string;
}

// ============================================================================
// Item Types
// ============================================================================

const ITEM_TYPES = [
  {
    id: "multiple-choice",
    label: "Multiple Choice",
    description: "4 options, 1 correct, misconception-mapped distractors",
    icon: "A B C D",
    grades: "K-8",
  },
  {
    id: "multiple-select",
    label: "Multiple Select",
    description: "Select all that apply from a set of options",
    icon: "[ ] [ ] [x]",
    grades: "2-8",
  },
  {
    id: "true-false",
    label: "True / False",
    description: "Binary judgment on a mathematical statement",
    icon: "T / F",
    grades: "K-8",
  },
  {
    id: "short-answer",
    label: "Short Answer",
    description: "Free-text response, pattern-matched scoring",
    icon: "___",
    grades: "1-8",
  },
  {
    id: "numeric",
    label: "Numeric Entry",
    description: "Exact numeric answer with tolerance range",
    icon: "# =",
    grades: "K-8",
  },
  {
    id: "fill-in-blank",
    label: "Fill in the Blank",
    description: "Cloze-style with inline blanks in context",
    icon: "___ + ___",
    grades: "1-8",
  },
  {
    id: "matching",
    label: "Matching",
    description: "Connect items across two columns",
    icon: "A—1 B—2",
    grades: "2-8",
  },
  {
    id: "ordering",
    label: "Ordering",
    description: "Drag items into correct sequence",
    icon: "1 2 3 4",
    grades: "2-8",
  },
  {
    id: "essay",
    label: "Essay / Explanation",
    description: "Extended response, LLM-evaluated with rubric",
    icon: "Explain...",
    grades: "3-8",
  },
];

// ============================================================================
// Widgets
// ============================================================================

const WIDGET_CATEGORIES = [
  {
    category: "Counting",
    widgets: [
      { id: "ten-frame", label: "Ten Frame", grades: "K-2", description: "2x5 grid for addition/subtraction to 20" },
      { id: "counting-scene", label: "Counting Scene", grades: "K-2", description: "60+ sprite types in configurable arrangements" },
    ],
  },
  {
    category: "Place Value",
    widgets: [
      { id: "base-ten-blocks", label: "Base Ten Blocks", grades: "1-3", description: "Hundreds, tens, and ones blocks" },
      { id: "place-value-chart", label: "Place Value Chart", grades: "1-4", description: "Interactive column chart" },
    ],
  },
  {
    category: "Operations",
    widgets: [
      { id: "number-line", label: "Number Line", grades: "K-5", description: "Jumps, highlights, position markers" },
      { id: "area-model", label: "Area Model", grades: "3-5", description: "Rectangular grid for multiplication/division" },
      { id: "multiplication-array", label: "Array", grades: "2-4", description: "Dot array with row/column highlights" },
      { id: "integer-number-line", label: "Integer Number Line", grades: "6-8", description: "Negative to positive with regions" },
    ],
  },
  {
    category: "Fractions",
    widgets: [
      { id: "fraction-bar", label: "Fraction Bar", grades: "3-5", description: "Bar divided into equal parts" },
      { id: "fraction-circle", label: "Fraction Circle", grades: "3-5", description: "Pie-chart style sectors" },
      { id: "fraction-comparison", label: "Fraction Comparison", grades: "3-5", description: "Side-by-side bars or circles" },
      { id: "chocolate-bar", label: "Chocolate Bar", grades: "3-5", description: "Grid fraction with eaten parts" },
    ],
  },
  {
    category: "Measurement",
    widgets: [
      { id: "analog-clock", label: "Clock", grades: "1-3", description: "12-hour face with draggable hands" },
      { id: "measuring-cup", label: "Measuring Cup", grades: "3-5", description: "Liquid fractions" },
    ],
  },
  {
    category: "Data",
    widgets: [
      { id: "dot-plot", label: "Dot Plot", grades: "3-6", description: "Stacked dots on number line" },
      { id: "histogram", label: "Histogram", grades: "6-8", description: "Grouped frequency bars" },
      { id: "box-plot", label: "Box Plot", grades: "6-8", description: "Quartiles and whiskers" },
      { id: "scatter-plot", label: "Scatter Plot", grades: "8", description: "Correlation visualization" },
      { id: "tape-diagram", label: "Tape Diagram", grades: "3-6", description: "Bar segments for ratios" },
    ],
  },
  {
    category: "Geometry",
    widgets: [
      { id: "coordinate-plane", label: "Coordinate Plane", grades: "5-8", description: "Points, lines, regions" },
      { id: "shape-builder", label: "Shape Builder", grades: "K-3", description: "Drag-and-drop geometric shapes" },
      { id: "right-triangle", label: "Right Triangle", grades: "7-8", description: "Labeled sides with Pythagorean theorem" },
      { id: "volume-builder", label: "Volume Builder", grades: "5-6", description: "3D cube structures (WebGL)" },
    ],
  },
];

// ============================================================================
// Example items spanning item types and widgets
// ============================================================================

const EXAMPLES: Record<string, ExampleItem[]> = {
  "Item Types": [
    {
      stem: "What is 7 + 8?",
      options: ["15", "14", "16", "13"],
      gradeLevel: 3,
      skillName: "Addition within 20",
      itemType: "multiple-choice",
    },
    {
      stem: "Select ALL the fractions that are equivalent to 1/2.",
      options: ["2/4", "3/5", "4/8", "5/12", "6/12"],
      gradeLevel: 4,
      skillName: "Equivalent fractions",
      itemType: "multiple-select",
    },
    {
      stem: "True or false: 0.75 is greater than 3/4.",
      gradeLevel: 4,
      skillName: "Compare decimals and fractions",
      itemType: "true-false",
    },
    {
      stem: "A recipe calls for 2/3 cup of flour. You want to make 1.5 batches. How many cups of flour do you need? Enter your answer as a fraction or decimal.",
      gradeLevel: 6,
      skillName: "Multiply fractions by whole numbers",
      itemType: "numeric",
    },
    {
      stem: "Complete the equation: 3 x ___ = 24",
      gradeLevel: 3,
      skillName: "Unknown factor in multiplication",
      itemType: "fill-in-blank",
    },
    {
      stem: "Put these fractions in order from least to greatest: 3/4, 1/2, 2/3, 5/6",
      gradeLevel: 4,
      skillName: "Order fractions",
      itemType: "ordering",
    },
    {
      stem: "Match each shape with its number of sides:\nTriangle, Pentagon, Hexagon, Octagon",
      options: ["3 sides", "5 sides", "6 sides", "8 sides"],
      gradeLevel: 3,
      skillName: "Classify polygons by sides",
      itemType: "matching",
    },
    {
      stem: "Explain why 1/3 is NOT equal to 1/4. Use words, numbers, or pictures to show your reasoning.",
      gradeLevel: 3,
      skillName: "Understand fraction size",
      itemType: "essay",
    },
  ],
  "With Widgets": [
    {
      stem: "Look at the ten frame. How many more counters do you need to make 10?",
      options: ["3", "4", "7", "10"],
      gradeLevel: 1,
      skillName: "Make 10",
      itemType: "multiple-choice",
      widget: "ten-frame",
    },
    {
      stem: "Use the number line. Start at 3. Jump forward 4. Where do you land?",
      gradeLevel: 1,
      skillName: "Add on a number line",
      itemType: "numeric",
      widget: "number-line",
    },
    {
      stem: "The base ten blocks show a number. What number is shown?",
      options: ["234", "243", "324", "342"],
      gradeLevel: 2,
      skillName: "Read base ten representations",
      itemType: "multiple-choice",
      widget: "base-ten-blocks",
    },
    {
      stem: "What fraction of the bar is shaded?",
      options: ["2/5", "3/5", "2/3", "3/8"],
      gradeLevel: 3,
      skillName: "Identify fractions from visual models",
      itemType: "multiple-choice",
      widget: "fraction-bar",
    },
    {
      stem: "Use the array to find 4 x 6.",
      gradeLevel: 3,
      skillName: "Multiply with arrays",
      itemType: "numeric",
      widget: "multiplication-array",
    },
    {
      stem: "What time does the clock show?",
      options: ["2:30", "2:35", "3:10", "6:10"],
      gradeLevel: 2,
      skillName: "Tell time to 5 minutes",
      itemType: "multiple-choice",
      widget: "analog-clock",
    },
    {
      stem: "Which fraction is larger? Use the fraction circles to compare 2/3 and 3/4.",
      options: ["2/3", "3/4", "They are equal"],
      gradeLevel: 4,
      skillName: "Compare fractions with visual models",
      itemType: "multiple-choice",
      widget: "fraction-circle",
    },
    {
      stem: "Count the animals in each row. There are 3 rows with 5 animals each. How many animals are there in all?",
      options: ["15", "8", "12", "35"],
      gradeLevel: 2,
      skillName: "Repeated addition and arrays",
      itemType: "multiple-choice",
      widget: "counting-scene",
    },
    {
      stem: "Use the area model to find 23 x 14. Break each number into tens and ones, then find the total area.",
      gradeLevel: 4,
      skillName: "Multi-digit multiplication with area model",
      itemType: "numeric",
      widget: "area-model",
    },
    {
      stem: "The tape diagram shows the relationship between apples and oranges. If there are 15 apples, how many oranges are there?",
      options: ["10", "20", "25", "30"],
      gradeLevel: 6,
      skillName: "Ratio and tape diagrams",
      itemType: "multiple-choice",
      widget: "tape-diagram",
    },
    {
      stem: "Plot the point (3, -2) on the coordinate plane. In which quadrant is this point?",
      options: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      gradeLevel: 6,
      skillName: "Coordinate plane quadrants",
      itemType: "multiple-choice",
      widget: "coordinate-plane",
    },
    {
      stem: "The dot plot shows shoe sizes in a class. What is the most common shoe size?",
      gradeLevel: 4,
      skillName: "Interpret dot plots",
      itemType: "short-answer",
      widget: "dot-plot",
    },
  ],
};

// ============================================================================
// Helpers
// ============================================================================

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

// ============================================================================
// Page
// ============================================================================

export default function DifficultyEstimatorPage() {
  const [stem, setStem] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [gradeLevel, setGradeLevel] = useState(5);
  const [skillName, setSkillName] = useState("");
  const [itemType, setItemType] = useState("multiple-choice");
  const [activeWidget, setActiveWidget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState("");
  const [exampleTab, setExampleTab] = useState<string>("Item Types");

  async function estimate() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const body: Record<string, unknown> = {
        stem: activeWidget
          ? `[Widget: ${activeWidget}] ${stem}`
          : stem,
        gradeLevel,
        skillName: skillName || undefined,
        itemType,
      };

      if (itemType === "multiple-choice" || itemType === "multiple-select") {
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

  function loadExample(ex: ExampleItem) {
    setStem(ex.stem);
    setOptions(ex.options || ["", "", "", ""]);
    setGradeLevel(ex.gradeLevel);
    setSkillName(ex.skillName);
    setItemType(ex.itemType);
    setActiveWidget(ex.widget || "");
    setResult(null);
    setError("");
  }

  return (
    <>
      {/* Header */}
      <section className="py-12 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-accent mb-3">
            Research Tool
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            Item Difficulty Estimator
          </h1>
          <p className="mt-3 text-muted leading-relaxed max-w-2xl">
            Estimate assessment item difficulty using the AIED 2026 approach.
            Supports 9 item types and 28 interactive math widgets across K-8.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* ================================================================ */}
        {/* Examples by Item Type / Widget */}
        {/* ================================================================ */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <p className="annotation">Try an example</p>
            <div className="flex gap-1">
              {Object.keys(EXAMPLES).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setExampleTab(tab)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    exampleTab === tab
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground border border-border"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXAMPLES[exampleTab].map((ex, i) => (
              <button
                key={i}
                onClick={() => loadExample(ex)}
                className="text-left p-3 bg-paper rounded-lg border border-border hover:border-accent/30 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-accent">
                      {ex.itemType.replace("-", " ")}
                    </span>
                    {ex.widget && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-surface rounded text-muted">
                        {ex.widget}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-light whitespace-nowrap">
                    Gr. {ex.gradeLevel}
                  </span>
                </div>
                <p className="text-sm text-foreground mt-1.5 leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                  {ex.stem}
                </p>
                <p className="text-[11px] text-muted-light mt-1">
                  {ex.skillName}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* Input + Results */}
        {/* ================================================================ */}
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

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Grade
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
                  {ITEM_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Widget
                </label>
                <select
                  value={activeWidget}
                  onChange={(e) => setActiveWidget(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded bg-paper text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="">None</option>
                  {WIDGET_CATEGORIES.map((cat) => (
                    <optgroup key={cat.category} label={cat.category}>
                      {cat.widgets.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
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

            {(itemType === "multiple-choice" || itemType === "multiple-select" || itemType === "matching") && (
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
                  <p className="text-sm">Analyzing item difficulty...</p>
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
                        width: `${Math.round(result.correctedEstimate * 100)}%`,
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
                <div className="text-center max-w-xs">
                  <p>Select an example or enter your own item</p>
                  <p className="text-xs text-muted-light mt-2">
                    Supports 9 item types and 28 interactive widgets
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================================================================ */}
        {/* Item Types Reference */}
        {/* ================================================================ */}
        <section className="mt-16 pt-12 border-t border-border">
          <p className="annotation mb-3">9 Item Types</p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-6">
            Assessment formats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ITEM_TYPES.map((t) => (
              <div
                key={t.id}
                className="p-4 bg-paper rounded-lg border border-border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {t.label}
                    </h3>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-muted-light whitespace-nowrap ml-2">
                    {t.grades}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* Widgets Reference */}
        {/* ================================================================ */}
        <section className="mt-12 pt-12 border-t border-border">
          <p className="annotation mb-3">28 Interactive Widgets</p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-xl font-bold text-foreground mb-6">
            Math manipulatives
          </h2>
          <div className="space-y-6">
            {WIDGET_CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-semibold text-foreground text-sm mb-2">
                  {cat.category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {cat.widgets.map((w) => (
                    <div
                      key={w.id}
                      className="p-3 bg-paper rounded border border-border"
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {w.label}
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-muted-light">
                          {w.grades}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted mt-0.5 leading-snug">
                        {w.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* Method + Links */}
        {/* ================================================================ */}
        <section className="mt-12 pt-12 border-t border-border">
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
                grade-level calibrated examples at each difficulty level,
                grounding estimates in concrete comparisons.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                3. Bias correction
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                LLMs exhibit variance collapse and systematic overconfidence. We
                apply corrections from our AIED 2026 research across 200
                experimental conditions.
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
