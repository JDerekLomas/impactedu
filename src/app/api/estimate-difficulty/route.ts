/**
 * Difficulty Estimation API (AIED Approach)
 *
 * POST /api/estimate-difficulty
 *
 * Uses Claude to estimate item difficulty via chain-of-thought analysis
 * with anchored rubric and bias correction.
 */

import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

const SYSTEM_PROMPT = `You are an expert psychometrician estimating item difficulty for K-12 math assessments. You will analyze assessment items and estimate their difficulty using a rigorous chain-of-thought process.

Estimate difficulty as P(incorrect) — the probability that a TYPICAL student at the target grade level answers incorrectly. This is NOT about whether YOU find it hard. Think about real students with typical misconceptions and skill gaps.

Known biases to guard against:
- VARIANCE COLLAPSE: Don't cluster all estimates around 0.40-0.60. Easy items should be 0.15-0.25, hard items 0.70-0.85.
- SYSTEMATIC OVERESTIMATION: LLMs tend to think items are easier than they are for students. Adjust upward slightly.
- DISTRACTOR BLINDNESS: Plausible distractors make items HARDER. A MC item with 4 plausible options is harder than one with 1 obvious wrong answer.

You MUST respond with valid JSON only, no other text.`;

function buildPrompt(input: {
  stem: string;
  options?: string[];
  gradeLevel: number;
  subject: string;
  skillName?: string;
  itemType?: string;
}): string {
  const optionsText = input.options?.length
    ? input.options.map((o, i) => `  ${String.fromCharCode(65 + i)}) ${o}`).join("\n")
    : "(Open response — no options)";

  return `Estimate the difficulty of this assessment item:

### Item
**Grade Level**: ${input.gradeLevel}
**Subject**: ${input.subject}
**Skill**: ${input.skillName || "N/A"}
**Type**: ${input.itemType || "unknown"}

**Stem**: ${input.stem}

**Options**:
${optionsText}

### Anchored Difficulty Scale (Grade ${input.gradeLevel})

| P(incorrect) | Description | Example |
|--------------|-------------|---------|
| 0.15-0.25 | Direct recall/application, single step | "What is 7 + 8?" |
| 0.30-0.40 | One operation, familiar context | "A rectangle is 4cm by 6cm. Find the area." |
| 0.45-0.55 | Strategy selection or 2 steps | "Which fraction equals 3/6?" |
| 0.60-0.70 | Multi-step, unfamiliar context | "Scale a recipe from 4 to 6 people" |
| 0.75-0.85 | Transfer, multi-step reasoning, novel | "Ratio of 3:5 with 24 total — how many more?" |

### Chain-of-Thought Analysis

Analyze these factors BEFORE estimating:
1. **Cognitive steps**: How many distinct mental operations?
2. **Prerequisite knowledge**: What must the student already know?
3. **Common misconceptions**: What errors will students make?
4. **Transfer distance**: How similar to typical practice problems?
5. **Working memory load**: How much must be held in mind simultaneously?
6. **Distractor quality**: How plausible are the wrong answers? (MC only)
7. **Reading load**: Is the text complexity appropriate or a barrier?

Return JSON:
{
  "difficulty": 0.00,
  "confidence": "high|medium|low",
  "analysis": {
    "cognitiveSteps": 0,
    "cognitiveStepsRationale": "...",
    "prerequisiteLoad": "low|medium|high",
    "prerequisiteDetails": "...",
    "commonMisconceptions": ["..."],
    "transferDistance": "near|moderate|far",
    "workingMemoryLoad": "low|medium|high",
    "distractorQuality": "weak|moderate|strong|n/a",
    "reasoning": "2-3 sentence justification comparing to anchors"
  }
}`;
}

/** Bias correction based on AIED 2026 findings */
function correctBias(raw: number): number {
  const center = 0.5;
  const stretch = 1.3;
  const shift = 0.03;
  let corrected = center + (raw - center) * stretch + shift;
  return Math.max(0.1, Math.min(0.9, Math.round(corrected * 100) / 100));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.stem) {
      return Response.json(
        { error: "stem is required" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt({
      stem: body.stem,
      options: body.options,
      gradeLevel: body.gradeLevel || 5,
      subject: body.subject || "Mathematics",
      skillName: body.skillName,
      itemType: body.itemType,
    });

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const parsed = JSON.parse(text);

    // Apply bias correction
    const rawDifficulty = parsed.difficulty;
    const correctedDifficulty = correctBias(rawDifficulty);

    return Response.json({
      rawLlmEstimate: rawDifficulty,
      correctedEstimate: correctedDifficulty,
      confidence: parsed.confidence,
      analysis: parsed.analysis,
      biasCorrection: {
        applied: true,
        method: "AIED-2026 variance-collapse + overestimation correction",
        rawToFinal: `${rawDifficulty.toFixed(2)} → ${correctedDifficulty.toFixed(2)}`,
      },
      model: "claude-haiku-4-5-20251001",
      estimatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Difficulty estimation error:", error);
    return Response.json(
      {
        error: "Estimation failed",
        details: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
