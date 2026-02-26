"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Session {
  id: string;
  participant_name: string | null;
  status: string;
  started_at: string;
  completed_at: string | null;
}

interface Study {
  id: string;
  title: string;
  research_goals: string;
  interview_guide: unknown;
  created_at: string;
  interview_sessions: Session[];
}

export default function AdminInterviewsPage() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [goals, setGoals] = useState("");

  useEffect(() => {
    loadStudies();
  }, []);

  async function loadStudies() {
    try {
      const res = await fetch("/api/interview/studies");
      if (res.ok) {
        const data = await res.json();
        setStudies(data);
      }
    } catch (err) {
      console.error("Failed to load studies:", err);
    } finally {
      setLoading(false);
    }
  }

  async function createStudy(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !goals.trim()) return;
    setCreating(true);

    try {
      const res = await fetch("/api/interview/create-study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, research_goals: goals }),
      });

      if (res.ok) {
        setTitle("");
        setGoals("");
        setShowForm(false);
        loadStudies();
      }
    } catch (err) {
      console.error("Failed to create study:", err);
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="annotation">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground">
            Interview Studies
          </h1>
          <p className="text-muted text-sm mt-1">
            Create and manage AI-conducted qualitative interviews
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors"
        >
          {showForm ? "Cancel" : "New Study"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={createStudy}
          className="mb-8 p-6 rounded-lg border border-border bg-paper"
        >
          <div className="mb-4">
            <label className="annotation block mb-1.5">Study Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Impact EdU Business Partner Interview"
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div className="mb-4">
            <label className="annotation block mb-1.5">
              Research Goals
            </label>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="What do you want to learn? Be specific about the topics, questions, and decisions this interview should inform."
              rows={6}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={creating || !title.trim() || !goals.trim()}
            className="px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            {creating ? "Generating interview guide..." : "Create Study"}
          </button>
        </form>
      )}

      {studies.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p className="text-lg mb-2">No studies yet</p>
          <p className="text-sm">
            Create your first study to start conducting AI interviews.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {studies.map((study) => {
            const completed = study.interview_sessions.filter(
              (s) => s.status === "completed"
            ).length;
            const active = study.interview_sessions.filter(
              (s) => s.status === "active"
            ).length;
            const total = study.interview_sessions.length;

            return (
              <Link
                key={study.id}
                href={`/admin/interviews/${study.id}`}
                className="block p-5 rounded-lg border border-border bg-paper hover:border-muted transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-lg text-foreground">
                      {study.title}
                    </h2>
                    <p className="text-sm text-muted mt-1 line-clamp-2">
                      {study.research_goals}
                    </p>
                  </div>
                  <div className="ml-4 text-right shrink-0">
                    <p className="annotation">
                      {total} session{total !== 1 ? "s" : ""}
                    </p>
                    {active > 0 && (
                      <p className="text-xs text-accent mt-0.5">
                        {active} active
                      </p>
                    )}
                    {completed > 0 && (
                      <p className="text-xs text-primary mt-0.5">
                        {completed} completed
                      </p>
                    )}
                  </div>
                </div>
                <p className="annotation mt-3">
                  Created{" "}
                  {new Date(study.created_at).toLocaleDateString()}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
