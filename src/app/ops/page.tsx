"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

/* ---------- types ---------- */

interface Label {
  name: string;
  color: string;
  description?: string;
}

interface Milestone {
  number: number;
  title: string;
  description: string;
  due_on: string | null;
  open_issues: number;
  closed_issues: number;
  html_url: string;
}

interface Issue {
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  labels: Label[];
  milestone: Milestone | null;
  assignee: { login: string; avatar_url: string } | null;
  created_at: string;
  updated_at: string;
  body: string | null;
}

type CategoryKey =
  | "grant"
  | "partnership"
  | "research"
  | "hiring"
  | "infrastructure"
  | "ops";
type PriorityKey = "priority:high" | "priority:medium" | "priority:low";
type FilterKey = CategoryKey | "all";

/* ---------- constants ---------- */

const CATEGORY_META: Record<CategoryKey, { label: string; color: string }> = {
  grant: { label: "Grant", color: "#0E8A16" },
  partnership: { label: "Partnership", color: "#1D76DB" },
  research: { label: "Research", color: "#D93F0B" },
  hiring: { label: "Hiring", color: "#FBCA04" },
  infrastructure: { label: "Infrastructure", color: "#5319E7" },
  ops: { label: "Ops", color: "#006B75" },
};

const PRIORITY_ORDER: Record<PriorityKey, number> = {
  "priority:high": 0,
  "priority:medium": 1,
  "priority:low": 2,
};

/* ---------- helpers ---------- */

function getCategory(issue: Issue): CategoryKey {
  for (const l of issue.labels) {
    if (l.name in CATEGORY_META) return l.name as CategoryKey;
  }
  return "ops";
}

function getPriority(issue: Issue): PriorityKey {
  for (const l of issue.labels) {
    if (l.name in PRIORITY_ORDER) return l.name as PriorityKey;
  }
  return "priority:medium";
}

function daysUntil(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function urgencyClass(days: number): string {
  if (days < 0) return "text-red-700 bg-red-50";
  if (days <= 14) return "text-amber-700 bg-amber-50";
  if (days <= 30) return "text-yellow-700 bg-yellow-50";
  return "text-muted bg-surface";
}

/* ---------- components ---------- */

function MilestoneCard({ m }: { m: Milestone }) {
  const days = m.due_on ? daysUntil(m.due_on) : null;
  const total = m.open_issues + m.closed_issues;
  const pct = total > 0 ? Math.round((m.closed_issues / total) * 100) : 0;

  return (
    <a
      href={m.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-paper rounded-lg border border-border hover:border-accent/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-[family-name:var(--font-source-serif)] text-sm font-bold text-foreground leading-tight">
          {m.title}
        </h3>
        {days !== null && (
          <span
            className={`flex-shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-[10px] px-2 py-0.5 rounded ${urgencyClass(days)}`}
          >
            {days < 0
              ? `${Math.abs(days)}d overdue`
              : days === 0
                ? "Today"
                : `${days}d`}
          </span>
        )}
      </div>
      {m.due_on && (
        <p className="text-xs text-muted mt-1">{formatDate(m.due_on)}</p>
      )}
      {total > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-muted mb-1">
            <span>
              {m.closed_issues}/{total} tasks
            </span>
            <span>{pct}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </a>
  );
}

function IssueCard({ issue }: { issue: Issue }) {
  const cat = getCategory(issue);
  const meta = CATEGORY_META[cat];
  const priority = getPriority(issue);
  const isDone = issue.state === "closed";

  // Extract checkboxes from body for progress
  const checks = issue.body?.match(/- \[[ x]\]/g) ?? [];
  const done = checks.filter((c) => c.includes("[x]")).length;
  const total = checks.length;

  return (
    <a
      href={issue.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-lg border transition-colors ${
        isDone
          ? "bg-surface/50 border-border/50 opacity-60"
          : "bg-paper border-border hover:border-accent/40"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Status indicator */}
        <div className="mt-0.5 flex-shrink-0">
          {isDone ? (
            <svg
              className="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-muted-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 16 16"
              strokeWidth={1.5}
            >
              <circle cx="8" cy="8" r="7" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h4
            className={`text-sm font-medium leading-tight ${isDone ? "line-through text-muted" : "text-foreground"}`}
          >
            {issue.title}
          </h4>

          {/* Labels row */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span
              className="inline-block text-[10px] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `#${meta.color}18`,
                color: `#${meta.color}`,
              }}
            >
              {meta.label}
            </span>
            {priority === "priority:high" && (
              <span className="inline-block text-[10px] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-50 text-red-700">
                Urgent
              </span>
            )}
            {issue.milestone && (
              <span className="text-[10px] text-muted font-[family-name:var(--font-jetbrains-mono)]">
                {issue.milestone.title}
              </span>
            )}
          </div>

          {/* Progress bar from checkboxes */}
          {total > 0 && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-surface-alt rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent/70 rounded-full transition-all"
                    style={{
                      width: `${Math.round((done / total) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted font-[family-name:var(--font-jetbrains-mono)]">
                  {done}/{total}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Issue number */}
        <span className="text-[10px] text-muted-light font-[family-name:var(--font-jetbrains-mono)] flex-shrink-0">
          #{issue.number}
        </span>
      </div>
    </a>
  );
}

function FilterPill({
  label,
  active,
  color,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  color?: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-paper text-muted hover:text-foreground hover:border-foreground/30"
      }`}
    >
      {color && !active && (
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: `#${color}` }}
        />
      )}
      {label}
      <span
        className={`font-[family-name:var(--font-jetbrains-mono)] text-[10px] ${active ? "text-background/70" : "text-muted-light"}`}
      >
        {count}
      </span>
    </button>
  );
}

/* ---------- main page ---------- */

export default function OpsPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [showClosed, setShowClosed] = useState(false);

  useEffect(() => {
    fetch("/api/ops")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setIssues(data.issues ?? []);
          setMilestones(data.milestones ?? []);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Derived data
  const filtered = useMemo(() => {
    let list = issues;
    if (!showClosed) list = list.filter((i) => i.state === "open");
    if (filter !== "all")
      list = list.filter((i) =>
        i.labels.some((l) => l.name === filter)
      );
    // Sort: priority high first, then by milestone due date, then creation
    list.sort((a, b) => {
      const pa = PRIORITY_ORDER[getPriority(a)] ?? 1;
      const pb = PRIORITY_ORDER[getPriority(b)] ?? 1;
      if (pa !== pb) return pa - pb;
      const da = a.milestone?.due_on ?? "9999";
      const db = b.milestone?.due_on ?? "9999";
      if (da !== db) return da.localeCompare(db);
      return a.number - b.number;
    });
    return list;
  }, [issues, filter, showClosed]);

  const categoryCounts = useMemo(() => {
    const open = issues.filter((i) => i.state === "open");
    const counts: Record<string, number> = { all: open.length };
    for (const key of Object.keys(CATEGORY_META)) {
      counts[key] = open.filter((i) =>
        i.labels.some((l) => l.name === key)
      ).length;
    }
    return counts;
  }, [issues]);

  const stats = useMemo(() => {
    const open = issues.filter((i) => i.state === "open").length;
    const closed = issues.filter((i) => i.state === "closed").length;
    const highPriority = issues.filter(
      (i) =>
        i.state === "open" &&
        i.labels.some((l) => l.name === "priority:high")
    ).length;
    return { open, closed, highPriority, total: open + closed };
  }, [issues]);

  return (
    <>
      {/* Header */}
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Operations
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            Grant pipeline &amp; research ops
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Tracking grant applications, partnerships, research preparation, and
            team building for the{" "}
            <span className="text-foreground font-medium">
              AI Across Ages
            </span>{" "}
            study and Impact-Edu.ai programs.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="mt-3 text-sm text-muted">Loading from GitHub...</p>
          </div>
        </section>
      ) : error ? (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-sm text-red-800">
              Failed to load issues: {error}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Stats bar */}
          <section className="py-6 bg-surface border-y border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
                    {stats.open}
                  </div>
                  <div className="text-xs text-muted mt-0.5">Open tasks</div>
                </div>
                <div className="text-center">
                  <div className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-accent">
                    {stats.highPriority}
                  </div>
                  <div className="text-xs text-muted mt-0.5">Urgent</div>
                </div>
                <div className="text-center">
                  <div className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
                    {milestones.length}
                  </div>
                  <div className="text-xs text-muted mt-0.5">Deadlines</div>
                </div>
                <div className="text-center">
                  <div className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
                    {stats.total > 0
                      ? Math.round(
                          (stats.closed / stats.total) * 100
                        )
                      : 0}
                    %
                  </div>
                  <div className="text-xs text-muted mt-0.5">Complete</div>
                </div>
              </div>
            </div>
          </section>

          {/* Milestones / Deadlines */}
          {milestones.length > 0 && (
            <section className="py-10">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-4">
                  Upcoming Deadlines
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {milestones.map((m) => (
                    <MilestoneCard key={m.number} m={m} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Filters + Issue list */}
          <section className="py-10 border-t border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <FilterPill
                  label="All"
                  active={filter === "all"}
                  count={categoryCounts.all ?? 0}
                  onClick={() => setFilter("all")}
                />
                {Object.entries(CATEGORY_META).map(([key, meta]) => (
                  <FilterPill
                    key={key}
                    label={meta.label}
                    color={meta.color}
                    active={filter === key}
                    count={categoryCounts[key] ?? 0}
                    onClick={() => setFilter(key as FilterKey)}
                  />
                ))}
                <div className="ml-auto">
                  <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showClosed}
                      onChange={(e) => setShowClosed(e.target.checked)}
                      className="rounded border-border accent-accent"
                    />
                    Show completed
                  </label>
                </div>
              </div>

              {/* Issue cards */}
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-muted text-sm">
                  No tasks match this filter.
                </div>
              ) : (
                <div className="space-y-2">
                  {filtered.map((issue) => (
                    <IssueCard key={issue.number} issue={issue} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Footer CTA */}
          <section className="py-12 bg-surface border-t border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h2 className="font-[family-name:var(--font-source-serif)] text-lg font-bold text-foreground">
                    Managed via GitHub Issues
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    Tasks are synced from{" "}
                    <a
                      href="https://github.com/JDerekLomas/impactedu/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-light transition-colors underline underline-offset-2"
                    >
                      github.com/JDerekLomas/impactedu
                    </a>
                    . Create issues there or via Claude Code to add tasks.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-ink transition-colors"
                >
                  Get involved
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
