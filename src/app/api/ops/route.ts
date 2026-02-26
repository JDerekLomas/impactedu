import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REPO = "JDerekLomas/impactedu";
const GITHUB_API = "https://api.github.com";

const OPS_LABELS = new Set([
  "grant",
  "partnership",
  "research",
  "hiring",
  "infrastructure",
  "ops",
]);

async function ghFetch(path: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }
  return res.json();
}

interface GHLabel {
  name: string;
  color: string;
  description?: string;
}

interface GHIssue {
  number: number;
  pull_request?: unknown;
  labels: GHLabel[];
}

export async function GET() {
  try {
    // Fetch all issues + milestones (small repo, < 100 issues)
    const [allIssues, milestones] = await Promise.all([
      ghFetch(
        `/repos/${REPO}/issues?state=all&per_page=100&sort=created&direction=asc`
      ),
      ghFetch(
        `/repos/${REPO}/milestones?state=open&sort=due_on&direction=asc`
      ),
    ]);

    // Filter to ops-labeled issues (not PRs)
    const issues = (allIssues as GHIssue[]).filter(
      (i) =>
        !i.pull_request &&
        i.labels.some((l) => OPS_LABELS.has(l.name))
    );

    return NextResponse.json({ issues, milestones });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
