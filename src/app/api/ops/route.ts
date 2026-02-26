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
    // GitHub Issues API treats comma-separated labels as AND (all must match).
    // We need OR (any label matches), so fetch per-label and dedupe.
    const labelFetches = OPS_LABELS.map((label) =>
      ghFetch(
        `/repos/${REPO}/issues?state=all&per_page=100&labels=${encodeURIComponent(label)}&sort=created&direction=asc`
      )
    );
    const [milestones, ...labelResults] = await Promise.all([
      ghFetch(`/repos/${REPO}/milestones?state=open&sort=due_on&direction=asc`),
      ...labelFetches,
    ]);

    // Dedupe issues by number, filter out PRs
    const seen = new Set<number>();
    const issues: { number: number; pull_request?: unknown; labels: { name: string }[] }[] = [];
    for (const batch of labelResults) {
      for (const issue of batch) {
        if (!seen.has(issue.number) && !issue.pull_request) {
          seen.add(issue.number);
          issues.push(issue);
        }
      }
    }

    // Sort by issue number
    issues.sort((a, b) => a.number - b.number);

    return NextResponse.json({ issues, milestones });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
