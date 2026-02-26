import { NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase";

interface TranscriptMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  const { session_id, messages } = (await request.json()) as {
    session_id: string;
    messages: TranscriptMessage[];
  };

  if (!session_id || !messages?.length) {
    return Response.json({ error: "session_id and messages required" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Verify session exists
  const { data: session, error: sessErr } = await supabase
    .from("interview_sessions")
    .select("id, status")
    .eq("id", session_id)
    .single();

  if (sessErr || !session) {
    return Response.json({ error: "Session not found" }, { status: 404 });
  }

  // Insert all messages
  const rows = messages.map((msg, i) => ({
    session_id,
    role: msg.role,
    content: msg.content,
    created_at: new Date(Date.now() + i).toISOString(),
  }));

  const { error: insertErr } = await supabase
    .from("interview_messages")
    .insert(rows);

  if (insertErr) {
    return Response.json({ error: "Failed to save", details: insertErr.message }, { status: 500 });
  }

  // Mark session completed
  await supabase
    .from("interview_sessions")
    .update({ status: "completed" })
    .eq("id", session_id);

  return Response.json({ saved: messages.length });
}
