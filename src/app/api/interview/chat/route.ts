import { NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { buildInterviewSystemPrompt } from "@/lib/interview-prompts";

export async function POST(request: NextRequest) {
  const { session_id, message } = await request.json();

  if (!session_id || !message) {
    return Response.json(
      { error: "session_id and message are required" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  // Get session and study
  const { data: session, error: sessionError } = await supabase
    .from("interview_sessions")
    .select("*, interview_studies(*)")
    .eq("id", session_id)
    .single();

  if (sessionError || !session) {
    return Response.json({ error: "Session not found" }, { status: 404 });
  }

  if (session.status !== "active") {
    return Response.json(
      { error: "Interview session is no longer active" },
      { status: 400 }
    );
  }

  const study = session.interview_studies;

  // Save user message
  await supabase.from("interview_messages").insert({
    session_id,
    role: "user",
    content: message,
  });

  // Fetch conversation history
  const { data: messages } = await supabase
    .from("interview_messages")
    .select("role, content")
    .eq("session_id", session_id)
    .order("created_at", { ascending: true });

  const conversationHistory = (messages || []).map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  // Stream response from Claude
  const anthropic = new Anthropic();
  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: buildInterviewSystemPrompt(study),
    messages: conversationHistory,
  });

  // Create a readable stream for the response
  const encoder = new TextEncoder();
  let fullResponse = "";

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullResponse += event.delta.text;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
            );
          }
        }

        // Save assistant response
        await supabase.from("interview_messages").insert({
          session_id,
          role: "assistant",
          content: fullResponse,
        });

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
