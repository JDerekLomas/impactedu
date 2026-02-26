import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  const { data: studies, error } = await supabase
    .from("interview_studies")
    .select("*, interview_sessions(id, participant_name, status, started_at, completed_at)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(studies);
}
