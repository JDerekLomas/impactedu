import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ studyId: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { studyId } = await params;
  const supabase = createServiceClient();

  const { data: study, error } = await supabase
    .from("interview_studies")
    .select(
      "*, interview_sessions(id, participant_name, status, started_at, completed_at), interview_insights(id, theme, summary, supporting_quotes)"
    )
    .eq("id", studyId)
    .single();

  if (error || !study) {
    return NextResponse.json({ error: "Study not found" }, { status: 404 });
  }

  return NextResponse.json(study);
}
