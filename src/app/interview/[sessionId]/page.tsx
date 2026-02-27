"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { useConversation } from "@elevenlabs/react";

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
      interview_guide: unknown;
      system_prompt?: string | null;
    };
  };
  messages: Message[];
}

type InterviewMode = "choosing" | "text" | "voice";

// ── SVG Icons ──────────────────────────────────────────────

function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function KeyboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M7 16h10" />
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────

export default function InterviewPage() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [studyTitle, setStudyTitle] = useState("");
  const [sessionStatus, setSessionStatus] = useState("active");
  const [streamingText, setStreamingText] = useState("");
  const [mode, setMode] = useState<InterviewMode>("choosing");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Voice mode state ───────────────────────────────────
  const [voiceMessages, setVoiceMessages] = useState<Array<{ source: string; text: string }>>([]);
  const [voiceConnecting, setVoiceConnecting] = useState(false);
  const studyDataRef = useRef<SessionData["session"]["interview_studies"] | null>(null);
  const voiceMessagesRef = useRef<Array<{ source: string; text: string }>>([]);
  const voiceSavedRef = useRef(false);

  const conversation = useConversation({
    onConnect: () => {
      setVoiceConnecting(false);
    },
    onDisconnect: () => {
      // Save transcript when voice session ends
      saveVoiceTranscript();
    },
    onMessage: ({ message, source }) => {
      setVoiceMessages((prev) => {
        const next = [...prev, { source, text: message }];
        voiceMessagesRef.current = next;
        return next;
      });
    },
    onError: (error) => {
      console.error("Voice error:", error);
      setVoiceConnecting(false);
    },
  });

  useEffect(() => {
    loadSession();
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText, voiceMessages]);

  // Save voice transcript on tab close / navigate away
  useEffect(() => {
    if (mode !== "voice") return;

    const handleBeforeUnload = () => {
      const msgs = voiceMessagesRef.current;
      if (msgs.length === 0 || voiceSavedRef.current) return;
      const transcript = msgs.map((m) => ({
        role: m.source === "ai" ? "assistant" : "user",
        content: m.text,
      }));
      navigator.sendBeacon(
        "/api/interview/voice-save",
        new Blob(
          [JSON.stringify({ session_id: sessionId, messages: transcript })],
          { type: "application/json" }
        )
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [mode, sessionId]);

  async function loadSession() {
    try {
      const res = await fetch(`/api/interview/sessions?id=${sessionId}`);
      if (!res.ok) throw new Error("Session not found");
      const data: SessionData = await res.json();
      setMessages(data.messages);
      setStudyTitle(data.session.interview_studies?.title || "Interview");
      setSessionStatus(data.session.status);
      studyDataRef.current = data.session.interview_studies;

      // If session already has messages, go straight to text mode
      if (data.messages.length > 0) {
        setMode("text");
      }
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  // ── Voice mode functions ───────────────────────────────

  const buildSystemPrompt = useCallback(() => {
    const study = studyDataRef.current;
    if (!study) return undefined;

    if (study.system_prompt) return study.system_prompt;

    const guide = study.interview_guide
      ? JSON.stringify(study.interview_guide, null, 2)
      : "No specific guide provided. Use your best judgment based on the research goals.";

    return `You are a skilled qualitative research interviewer conducting an interview for the study: "${study.title}".

## Research Goals
${study.research_goals}

## Interview Guide
${guide}

## Your Behavior

### Opening
- Introduce yourself warmly. You are an AI research assistant conducting this interview on behalf of Impact-Edu.ai.
- Keep the intro SHORT — 2-3 sentences max. Don't over-explain.
- Your very first question should be simple and answerable with "yes" or "no" — something like "Are you ready to get started?" or "Is now still a good time?" This builds comfort before diving in.
- After they confirm, ease in with easy factual questions before going deeper.

### Question Progression (IMPORTANT)
- Start EASY: simple factual questions they can answer quickly and confidently.
- Move to MEDIUM: opinions and preferences.
- End with HARD: strategic questions, tradeoffs, and things they might not have fully thought through yet.
- Never open with a complex multi-part question.

### During the Interview
- Follow the interview guide, but adapt naturally based on their responses.
- Ask one question at a time. Keep questions clear and concise.
- When an answer is vague or brief, probe for specifics.
- When they mention something interesting, follow the thread before moving on.
- Mirror back what you hear to confirm understanding.
- Never suggest answers or provide examples that might bias their response.
- Be genuinely curious.

### Closing
- When you've covered all the key topics, summarize the main themes you heard.
- Ask if there's anything they'd like to add.
- Thank them sincerely.

### Style
- Conversational and warm, but professional.
- Short turns — 2-3 sentences max.
- You're a listener, not a lecturer.`;
  }, []);

  async function startVoiceSession() {
    setVoiceConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const prompt = buildSystemPrompt();
      const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!;

      await conversation.startSession({
        agentId,
        connectionType: "websocket",
        overrides: prompt
          ? {
              agent: {
                prompt: { prompt },
                firstMessage: `Hey! Thanks for taking the time to chat. Derek asked me to have a quick conversation with you about ${studyTitle}. It should only take about ten minutes. Sound good?`,
              },
            }
          : undefined,
      });
    } catch (err) {
      console.error("Voice session error:", err);
      setVoiceConnecting(false);
    }
  }

  async function endVoiceSession() {
    await conversation.endSession();
  }

  const saveVoiceTranscript = useCallback(async () => {
    const msgs = voiceMessagesRef.current;
    if (msgs.length === 0 || voiceSavedRef.current) return;
    voiceSavedRef.current = true;
    try {
      const transcript = msgs.map((m) => ({
        role: m.source === "ai" ? "assistant" : "user",
        content: m.text,
      }));
      await fetch("/api/interview/voice-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, messages: transcript }),
      });
    } catch (err) {
      console.error("Failed to save voice transcript:", err);
      voiceSavedRef.current = false; // Allow retry on failure
    }
  }, [sessionId]);

  // ── Text mode functions ────────────────────────────────

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending || sessionStatus !== "active") return;

    const userMessage = input.trim();
    setInput("");
    setSending(true);

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
          const parts = buffer.split("\n");
          buffer = parts.pop() || "";

          for (const line of parts) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const data = trimmed.slice(6);
              if (data !== "[DONE]") {
                try {
                  const parsed = JSON.parse(data);
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

  // ── Loading state ──────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <p className="text-muted annotation">Loading interview...</p>
      </div>
    );
  }

  // ── Mode chooser ───────────────────────────────────────

  if (mode === "choosing" && sessionStatus === "active") {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full px-6">
            <h1 className="font-[family-name:var(--font-source-serif)] font-bold text-2xl text-foreground text-center mb-2">
              {studyTitle}
            </h1>
            <p className="text-muted text-center text-sm mb-10">
              How would you like to do this interview?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => startVoiceSession().then(() => setMode("voice"))}
                disabled={voiceConnecting}
                className="flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-[var(--paper)] hover:border-accent hover:bg-accent/5 transition-all disabled:opacity-50"
              >
                <MicIcon className="text-accent" />
                <span className="font-medium text-foreground">Voice</span>
                <span className="text-xs text-muted text-center">Natural conversation with voice</span>
              </button>
              <button
                onClick={async () => {
                  setMode("text");
                  // If no messages yet, trigger the opening message
                  if (messages.length === 0) {
                    setSending(true);
                    try {
                      const res = await fetch("/api/interview/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          session_id: sessionId,
                          message: "[The interview is starting. Please introduce yourself and begin.]",
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
                                } catch { /* skip */ }
                              }
                            }
                          }
                        }
                        if (accumulated) {
                          setMessages((prev) => [...prev, {
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: accumulated,
                            created_at: new Date().toISOString(),
                          }]);
                          setStreamingText("");
                        }
                      }
                    } finally {
                      setSending(false);
                    }
                  }
                }}
                className="flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-[var(--paper)] hover:border-accent hover:bg-accent/5 transition-all"
              >
                <KeyboardIcon className="text-accent" />
                <span className="font-medium text-foreground">Text</span>
                <span className="text-xs text-muted text-center">Type your responses</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Voice mode UI ──────────────────────────────────────

  if (mode === "voice") {
    const isConnected = conversation.status === "connected";
    const isSpeaking = conversation.isSpeaking;

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
                {voiceConnecting
                  ? "Connecting..."
                  : isConnected
                  ? isSpeaking
                    ? "Interviewer is speaking..."
                    : "Listening to you..."
                  : sessionStatus === "completed"
                  ? "Interview complete"
                  : "Disconnected"}
              </p>
            </div>
            {isConnected && (
              <button
                onClick={endVoiceSession}
                className="px-4 py-1.5 text-sm rounded border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
              >
                End Interview
              </button>
            )}
          </div>
        </div>

        {/* Voice visualization + transcript */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {/* Pulsing indicator */}
            {isConnected && (
              <div className="flex justify-center py-8 mb-6">
                <div className="relative">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${
                      isSpeaking
                        ? "bg-accent/20"
                        : "bg-primary/20"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                        isSpeaking
                          ? "bg-accent/40"
                          : "bg-primary/40"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSpeaking
                            ? "bg-accent animate-pulse"
                            : "bg-primary animate-pulse"
                        }`}
                      >
                        {isSpeaking ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                        ) : (
                          <MicIcon className="text-white w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Ripple animation when active */}
                  {isConnected && (
                    <div className={`absolute inset-0 rounded-full border-2 animate-ping opacity-20 ${
                      isSpeaking ? "border-accent" : "border-primary"
                    }`} />
                  )}
                </div>
              </div>
            )}

            {voiceConnecting && (
              <div className="flex justify-center py-12">
                <p className="text-muted animate-pulse">Connecting to voice interview...</p>
              </div>
            )}

            {/* Transcript */}
            <div className="space-y-4">
              {voiceMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.source === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 ${
                      msg.source === "user"
                        ? "bg-primary text-white"
                        : "bg-surface text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        {sessionStatus === "completed" || !isConnected ? (
          <div className="border-t border-border bg-surface">
            <div className="max-w-3xl mx-auto px-4 py-4 text-center">
              <p className="text-sm text-muted">
                {sessionStatus === "completed"
                  ? "This interview has been completed. Thank you for your time."
                  : "Voice session disconnected."}
              </p>
            </div>
          </div>
        ) : (
          <div className="border-t border-border bg-[var(--paper)]">
            <div className="max-w-3xl mx-auto px-4 py-3 text-center">
              <p className="text-xs text-muted-light">
                {isSpeaking
                  ? "The interviewer is speaking — you can interrupt at any time"
                  : "Speak naturally — the interviewer is listening"}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Text mode UI (existing) ────────────────────────────

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
