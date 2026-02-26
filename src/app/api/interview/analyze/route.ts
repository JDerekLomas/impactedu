import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { ANALYSIS_PROMPT } from "@/lib/interview-prompts";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { study_id } = await request.json();

  if (!study_id) {
    return NextResponse.json(
      { error: "study_id is required" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  // Get all completed sessions for this study
  const { data: sessions } = await supabase
    .from("interview_sessions")
    .select("id, participant_name, status")
    .eq("study_id", study_id)
    .eq("status", "completed");

  if (!sessions || sessions.length === 0) {
    return NextResponse.json(
      { error: "No completed sessions to analyze" },
      { status: 400 }
    );
  }

  // Get messages for each session
  const transcripts = [];
  for (const session of sessions) {
    const { data: messages } = await supabase
      .from("interview_messages")
      .select("role, content, created_at")
      .eq("session_id", session.id)
      .order("created_at", { ascending: true });

    const visibleMessages = (messages || []).filter(
      (m) => m.role !== "user" || !m.content.startsWith("[")
    );

    transcripts.push({
      session_id: session.id,
      participant: session.participant_name || "Anonymous",
      messages: visibleMessages,
    });
  }

  // Run analysis with Claude
  const anthropic = new Anthropic();
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8192,
    system: ANALYSIS_PROMPT,
    messages: [
      {
        role: "user",
        content: `Analyze these interview transcripts:\n\n${JSON.stringify(transcripts, null, 2)}`,
      },
    ],
  });

  const analysisText =
    msg.content[0].type === "text" ? msg.content[0].text : "";
  let analysis;
  try {
    analysis = JSON.parse(analysisText);
  } catch {
    analysis = { raw: analysisText };
  }

  // Save insights
  if (analysis.themes) {
    const insights = analysis.themes.map(
      (theme: { theme: string; summary: string; supporting_quotes: unknown[] }) => ({
        study_id,
        theme: theme.theme,
        summary: theme.summary,
        supporting_quotes: theme.supporting_quotes || [],
      })
    );

    await supabase.from("interview_insights").insert(insights);
  }

  return NextResponse.json(analysis);
}
