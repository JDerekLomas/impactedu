import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (!text) {
    return Response.json({ error: "text is required" }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "TTS not configured" }, { status: 500 });
  }

  // Use "Rachel" voice — warm, professional, conversational
  const voiceId = "21m00Tcm4TlvDq8ikWAM";

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return Response.json(
      { error: "TTS failed", details: err },
      { status: 500 }
    );
  }

  const audioBuffer = await res.arrayBuffer();

  return new Response(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
