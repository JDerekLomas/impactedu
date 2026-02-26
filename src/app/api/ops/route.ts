import { NextResponse } from "next/server";

const REPO = "JDerekLomas/impactedu";
const GITHUB_API = "https://api.github.com";

// Labels that mark ops-related issues (created by our setup)
const OPS_LABELS = [
  "grant",
  "partnership",
  "research",
  "hiring",
  "infrastructure",
  "ops",
];

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
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export async function GET() {
  try {
    // Fetch issues and milestones in parallel
    const [issues, milestones] = await Promise.all([
      ghFetch(
        `/repos/${REPO}/issues?state=all&per_page=100&labels=${OPS_LABELS.join(",")}&sort=created&direction=asc`
      ),
      ghFetch(`/repos/${REPO}/milestones?state=open&sort=due_on&direction=asc`),
    ]);

    // GitHub issues API returns PRs too — filter them out
    // Also filter to only ops-labeled issues
    const filtered = issues.filter(
      (i: { pull_request?: unknown; labels: { name: string }[] }) =>
        !i.pull_request &&
        i.labels.some((l: { name: string }) => OPS_LABELS.includes(l.name))
    );

    return NextResponse.json({ issues: filtered, milestones });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
