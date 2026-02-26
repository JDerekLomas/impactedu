"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  created_at: string;
}

interface SessionData {
  session: {
    id: string;
    status: string;
    participant_name: string | null;
    interview_studies: {
      title: string;
      research_goals: string;
    };
  };
  messages: Message[];
}

export default function InterviewPage() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [studyTitle, setStudyTitle] = useState("");
  const [sessionStatus, setSessionStatus] = useState("active");
  const [streamingText, setStreamingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadSession();
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  async function loadSession() {
    try {
      const res = await fetch(`/api/interview/sessions?id=${sessionId}`);
      if (!res.ok) throw new Error("Session not found");
      const data: SessionData = await res.json();
      setMessages(data.messages);
      setStudyTitle(data.session.interview_studies?.title || "Interview");
      setSessionStatus(data.session.status);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending || sessionStatus !== "active") return;

    const userMessage = input.trim();
    setInput("");
    setSending(true);

    // Add user message optimistically
    const tempUserMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const res = await fetch("/api/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: userMessage }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Process complete lines only (SSE lines end with \n\n)
          const parts = buffer.split("\n");
          // Keep the last part as it may be incomplete
          buffer = parts.pop() || "";

          for (const line of parts) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                // handled below after loop
              } else {
                try {
                  const parsed = JSON.parse(data);
                  accumulated += parsed.text;
                  setStreamingText(accumulated);
                } catch {
                  // skip malformed chunks
                }
              }
            }
          }
        }

        // Stream ended — finalize the message
        if (accumulated) {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: accumulated,
              created_at: new Date().toISOString(),
            },
          ]);
          setStreamingText("");
        }
      }
    } catch (err) {
      console.error("Send error:", err);
    } finally {
      setSending(false);
      textareaRef.current?.focus();
    }
  }

  async function endInterview() {
    setSending(true);
    try {
      // Send a closing message
      const res = await fetch("/api/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message:
            "[The participant has indicated they would like to end the interview. Please provide a summary of what you discussed and thank them.]",
        }),
      });

      if (res.ok) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        if (reader) {
          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split("\n");
            buffer = parts.pop() || "";
            for (const line of parts) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ") && trimmed.slice(6) !== "[DONE]") {
                try {
                  const parsed = JSON.parse(trimmed.slice(6));
                  accumulated += parsed.text;
                  setStreamingText(accumulated);
                } catch {
                  // skip
                }
              }
            }
          }
        }

        if (accumulated) {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: accumulated,
              created_at: new Date().toISOString(),
            },
          ]);
          setStreamingText("");
        }
      }

      // Mark session as completed
      await fetch(`/api/interview/sessions?id=${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });

      setSessionStatus("completed");
    } catch (err) {
      console.error("End interview error:", err);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <p className="text-muted annotation">Loading interview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-border bg-[var(--paper)]">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-source-serif)] font-bold text-lg text-foreground">
              {studyTitle}
            </h1>
            <p className="annotation mt-0.5">
              {sessionStatus === "active"
                ? "Interview in progress"
                : "Interview complete"}
            </p>
          </div>
          {sessionStatus === "active" && (
            <button
              onClick={endInterview}
              disabled={sending}
              className="px-4 py-1.5 text-sm rounded border border-border text-muted hover:text-foreground hover:border-foreground transition-colors disabled:opacity-50"
            >
              End Interview
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-surface text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {streamingText && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg px-4 py-3 bg-surface text-foreground">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {streamingText}
                  <span className="inline-block w-1.5 h-4 bg-accent ml-0.5 animate-pulse" />
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      {sessionStatus === "active" && (
        <div className="border-t border-border bg-[var(--paper)]">
          <form
            onSubmit={sendMessage}
            className="max-w-3xl mx-auto px-4 py-3"
          >
            <div className="flex gap-3 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your response..."
                rows={1}
                disabled={sending}
                className="flex-1 resize-none rounded-lg border border-border bg-[var(--background)] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent disabled:opacity-50"
                style={{ minHeight: "44px", maxHeight: "120px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = Math.min(target.scrollHeight, 120) + "px";
                }}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "..." : "Send"}
              </button>
            </div>
            <p className="text-xs text-muted-light mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </form>
        </div>
      )}

      {sessionStatus === "completed" && (
        <div className="border-t border-border bg-surface">
          <div className="max-w-3xl mx-auto px-4 py-4 text-center">
            <p className="text-sm text-muted">
              This interview has been completed. Thank you for your time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
