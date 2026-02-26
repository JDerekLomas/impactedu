"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Session {
  id: string;
  participant_name: string | null;
  status: string;
  started_at: string;
  completed_at: string | null;
}

interface Insight {
  id: string;
  theme: string;
  summary: string;
  supporting_quotes: { quote: string; context: string }[];
}

interface InterviewGuide {
  sections?: {
    title: string;
    purpose: string;
    questions: { main: string; probes: string[] }[];
  }[];
  estimated_duration_minutes?: number;
  opening_context?: string;
}

interface Study {
  id: string;
  title: string;
  research_goals: string;
  interview_guide: InterviewGuide | null;
  interview_sessions: Session[];
  interview_insights: Insight[];
  created_at: string;
}

interface Message {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

export default function StudyDetailPage() {
  const { studyId } = useParams();
  const [study, setStudy] = useState<Study | null>(null);
  const [loading, setLoading] = useState(true);
  const [creatingSession, setCreatingSession] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [interviewLink, setInterviewLink] = useState<string | null>(null);

  const loadStudy = useCallback(async () => {
    try {
      const res = await fetch(`/api/interview/studies/${studyId}`);
      if (res.ok) {
        setStudy(await res.json());
      }
    } catch (err) {
      console.error("Failed to load study:", err);
    } finally {
      setLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    loadStudy();
  }, [loadStudy]);

  async function createSession() {
    setCreatingSession(true);
    try {
      const res = await fetch("/api/interview/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          study_id: studyId,
          participant_name: participantName || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setInterviewLink(
          `${window.location.origin}/interview/${data.session.id}`
        );
        setParticipantName("");
        loadStudy();
      }
    } catch (err) {
      console.error("Failed to create session:", err);
    } finally {
      setCreatingSession(false);
    }
  }

  async function loadTranscript(sessionId: string) {
    setLoadingTranscript(true);
    setSelectedSession(sessionId);
    try {
      const res = await fetch(`/api/interview/sessions?id=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setTranscript(data.messages);
      }
    } catch (err) {
      console.error("Failed to load transcript:", err);
    } finally {
      setLoadingTranscript(false);
    }
  }

  async function runAnalysis() {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/interview/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ study_id: studyId }),
      });

      if (res.ok) {
        loadStudy();
      }
    } catch (err) {
      console.error("Failed to analyze:", err);
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="annotation">Loading study...</p>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-muted">Study not found.</p>
      </div>
    );
  }

  const completedSessions = study.interview_sessions.filter(
    (s) => s.status === "completed"
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/interviews"
          className="annotation hover:text-foreground transition-colors"
        >
          &larr; All Studies
        </Link>
        <h1 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-foreground mt-3">
          {study.title}
        </h1>
        <p className="text-muted text-sm mt-2 max-w-3xl">
          {study.research_goals}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Sessions & Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Create Session */}
          <div className="p-4 rounded-lg border border-border bg-paper">
            <h2 className="annotation mb-3">New Interview Session</h2>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Participant name (optional)"
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 mb-3"
            />
            <button
              onClick={createSession}
              disabled={creatingSession}
              className="w-full px-4 py-2 rounded bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-50"
            >
              {creatingSession ? "Creating..." : "Create & Get Link"}
            </button>
          </div>

          {/* Interview Link */}
          {interviewLink && (
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
              <h2 className="annotation mb-2 text-accent">Interview Link</h2>
              <p className="text-xs text-muted mb-2">
                Share this with the participant:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={interviewLink}
                  readOnly
                  className="flex-1 rounded border border-border bg-background px-3 py-1.5 text-xs font-mono text-foreground"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(interviewLink);
                  }}
                  className="px-3 py-1.5 rounded border border-border text-xs text-muted hover:text-foreground transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Sessions List */}
          <div>
            <h2 className="annotation mb-3">
              Sessions ({study.interview_sessions.length})
            </h2>
            {study.interview_sessions.length === 0 ? (
              <p className="text-sm text-muted">No sessions yet</p>
            ) : (
              <div className="space-y-2">
                {study.interview_sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => loadTranscript(session.id)}
                    className={`w-full text-left p-3 rounded border transition-colors ${
                      selectedSession === session.id
                        ? "border-accent bg-accent/5"
                        : "border-border bg-paper hover:border-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {session.participant_name || "Anonymous"}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          session.status === "completed"
                            ? "bg-primary/10 text-primary"
                            : session.status === "active"
                              ? "bg-accent/10 text-accent"
                              : "bg-muted/10 text-muted"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      {new Date(session.started_at).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Analysis */}
          {completedSessions.length > 0 && (
            <div>
              <button
                onClick={runAnalysis}
                disabled={analyzing}
                className="w-full px-4 py-2 rounded bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
              >
                {analyzing
                  ? "Analyzing transcripts..."
                  : `Analyze ${completedSessions.length} completed session${completedSessions.length !== 1 ? "s" : ""}`}
              </button>
            </div>
          )}

          {/* Interview Guide */}
          {study.interview_guide &&
            "sections" in study.interview_guide &&
            study.interview_guide.sections && (
              <div>
                <h2 className="annotation mb-3">Interview Guide</h2>
                <div className="space-y-3">
                  {study.interview_guide.sections.map(
                    (section, i) => (
                      <div
                        key={i}
                        className="p-3 rounded border border-border bg-paper"
                      >
                        <h3 className="text-sm font-medium text-foreground">
                          {section.title}
                        </h3>
                        <p className="text-xs text-muted mt-1">
                          {section.purpose}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {section.questions.map((q, j) => (
                            <li
                              key={j}
                              className="text-xs text-muted-light pl-3 border-l-2 border-border"
                            >
                              {q.main}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Right: Transcript & Insights */}
        <div className="lg:col-span-2">
          {/* Transcript */}
          {selectedSession && (
            <div className="mb-8">
              <h2 className="annotation mb-3">Transcript</h2>
              {loadingTranscript ? (
                <p className="text-sm text-muted">Loading transcript...</p>
              ) : transcript.length === 0 ? (
                <p className="text-sm text-muted">No messages yet</p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto p-4 rounded-lg border border-border bg-paper">
                  {transcript.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 ${
                          msg.role === "user"
                            ? "bg-primary/10 text-foreground"
                            : "bg-surface text-foreground"
                        }`}
                      >
                        <p className="text-xs font-mono text-muted-light mb-1">
                          {msg.role === "user" ? "Participant" : "Interviewer"}
                        </p>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Insights */}
          {study.interview_insights.length > 0 && (
            <div>
              <h2 className="annotation mb-3">
                Analysis Insights ({study.interview_insights.length} themes)
              </h2>
              <div className="space-y-4">
                {study.interview_insights.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 rounded-lg border border-border bg-paper"
                  >
                    <h3 className="font-[family-name:var(--font-source-serif)] font-bold text-foreground">
                      {insight.theme}
                    </h3>
                    <p className="text-sm text-muted mt-2">
                      {insight.summary}
                    </p>
                    {insight.supporting_quotes.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {insight.supporting_quotes.map((q, i) => (
                          <blockquote
                            key={i}
                            className="text-xs text-muted-light pl-3 border-l-2 border-accent italic"
                          >
                            &ldquo;{q.quote}&rdquo;
                            {q.context && (
                              <span className="block not-italic mt-0.5 text-muted">
                                — {q.context}
                              </span>
                            )}
                          </blockquote>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selectedSession && study.interview_insights.length === 0 && (
            <div className="flex items-center justify-center h-64 text-muted">
              <p className="text-sm">
                Select a session to view its transcript, or create a new
                interview session.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
