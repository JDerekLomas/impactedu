import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { buildInterviewSystemPrompt } from "@/lib/interview-prompts";

// Create a new session for a study
export async function POST(request: NextRequest) {
  const { study_id, participant_name } = await request.json();

  if (!study_id) {
    return NextResponse.json(
      { error: "study_id is required" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  // Verify study exists
  const { data: study, error: studyError } = await supabase
    .from("interview_studies")
    .select("*")
    .eq("id", study_id)
    .single();

  if (studyError || !study) {
    return NextResponse.json({ error: "Study not found" }, { status: 404 });
  }

  // Create session
  const { data: session, error } = await supabase
    .from("interview_sessions")
    .insert({ study_id, participant_name })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Generate opening message from the AI
  const anthropic = new Anthropic();
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: buildInterviewSystemPrompt(study),
    messages: [
      {
        role: "user",
        content:
          participant_name
            ? `[The participant "${participant_name}" has just joined the interview. Greet them and begin.]`
            : "[A participant has just joined the interview. Greet them and begin.]",
      },
    ],
  });

  const openingMessage =
    msg.content[0].type === "text" ? msg.content[0].text : "Hello!";

  // Save opening messages
  await supabase.from("interview_messages").insert([
    {
      session_id: session.id,
      role: "user" as const,
      content: participant_name
        ? `[The participant "${participant_name}" has just joined the interview. Greet them and begin.]`
        : "[A participant has just joined the interview. Greet them and begin.]",
    },
    {
      session_id: session.id,
      role: "assistant" as const,
      content: openingMessage,
    },
  ]);

  return NextResponse.json({
    session,
    opening_message: openingMessage,
  });
}

// Get session details with messages
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Session id is required" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  const showAll = searchParams.get("all") === "true";

  const { data: session, error } = await supabase
    .from("interview_sessions")
    .select("*, interview_studies(title, research_goals, interview_guide, system_prompt)")
    .eq("id", id)
    .single();

  if (error || !session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const { data: messages } = await supabase
    .from("interview_messages")
    .select("id, role, content, created_at")
    .eq("session_id", id)
    .order("created_at", { ascending: true });

  const visibleMessages = showAll
    ? (messages || [])
    : (messages || []).filter(
        (m) => m.role !== "user" || !m.content.startsWith("[")
      );

  return NextResponse.json({ session, messages: visibleMessages });
}

// Update session status
export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { status } = await request.json();

  if (!id || !status) {
    return NextResponse.json(
      { error: "id and status are required" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  const update: Record<string, unknown> = { status };
  if (status === "completed") {
    update.completed_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("interview_sessions")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
