"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  created_at: string;
}

interface SessionInfo {
  id: string;
  status: string;
  participant_name: string | null;
  started_at: string;
  completed_at: string | null;
  interview_studies: {
    title: string;
    research_goals: string;
  };
}

export default function TranscriptPage() {
  const { sessionId } = useParams();
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTranscript();
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadTranscript() {
    try {
      const res = await fetch(`/api/interview/sessions?id=${sessionId}&all=true`);
      if (!res.ok) throw new Error("Session not found");
      const data = await res.json();
      setSession(data.session);
      setMessages(data.messages);
    } catch {
      setError("Could not load transcript");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <p className="text-muted annotation">Loading transcript...</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <p className="text-muted">{error || "Session not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-source-serif)] font-bold text-2xl text-foreground">
            {session.interview_studies?.title || "Interview Transcript"}
          </h1>
          <div className="mt-2 space-y-1 text-sm text-muted">
            {session.participant_name && <p>Participant: {session.participant_name}</p>}
            <p>Session: {sessionId}</p>
            <p>Status: {session.status}</p>
            <p>Started: {new Date(session.started_at).toLocaleString()}</p>
            <p>{messages.length} messages</p>
          </div>
        </div>

        {/* Messages */}
        {messages.length === 0 ? (
          <p className="text-muted text-center py-12">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-baseline gap-3 mb-1">
                  <span
                    className={`text-xs font-mono font-medium uppercase tracking-wide ${
                      msg.role === "assistant" ? "text-accent" : "text-primary"
                    }`}
                  >
                    {msg.role}
                  </span>
                  <span className="text-xs text-muted-light">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Refresh */}
        <div className="mt-8 text-center">
          <button
            onClick={() => { setLoading(true); loadTranscript(); }}
            className="px-4 py-2 text-sm rounded border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
