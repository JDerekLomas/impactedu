import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REPO = "JDerekLomas/impactedu";
const GITHUB_API = "https://api.github.com";

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

export async function GET() {
  try {
    // Use search API for OR-based label matching (single request instead of 6)
    const labelQuery = [
      "grant",
      "partnership",
      "research",
      "hiring",
      "infrastructure",
      "ops",
    ]
      .map((l) => `label:${l}`)
      .join("+");

    const [searchResult, milestones] = await Promise.all([
      ghFetch(
        `/search/issues?q=repo:${REPO}+is:issue+${labelQuery}&per_page=100&sort=created&order=asc`
      ),
      ghFetch(
        `/repos/${REPO}/milestones?state=open&sort=due_on&direction=asc`
      ),
    ]);

    return NextResponse.json({
      issues: searchResult.items ?? [],
      milestones,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
