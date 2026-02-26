import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { STUDY_PLANNER_PROMPT } from "@/lib/interview-prompts";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, research_goals } = await request.json();

  if (!title || !research_goals) {
    return NextResponse.json(
      { error: "Title and research_goals are required" },
      { status: 400 }
    );
  }

  // Generate interview guide using Claude
  const anthropic = new Anthropic();
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: STUDY_PLANNER_PROMPT,
    messages: [
      {
        role: "user",
        content: `Study title: ${title}\n\nResearch goals:\n${research_goals}`,
      },
    ],
  });

  const guideText =
    msg.content[0].type === "text" ? msg.content[0].text : "";
  let interview_guide;
  try {
    interview_guide = JSON.parse(guideText);
  } catch {
    interview_guide = { raw: guideText };
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("interview_studies")
    .insert({ title, research_goals, interview_guide })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
