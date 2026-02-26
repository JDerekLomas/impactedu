import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { session_id } = await request.json();

  if (!session_id) {
    return Response.json({ error: "session_id is required" }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return Response.json({ error: "Voice not configured" }, { status: 500 });
  }

  const url = new URL("https://api.elevenlabs.io/v1/convai/conversation/get_signed_url");
  url.searchParams.set("agent_id", agentId);

  const res = await fetch(url.toString(), {
    headers: { "xi-api-key": apiKey },
  });

  if (!res.ok) {
    const err = await res.text();
    return Response.json({ error: "Failed to get signed URL", details: err }, { status: 500 });
  }

  const data = await res.json();
  return Response.json({ signed_url: data.signed_url });
}
