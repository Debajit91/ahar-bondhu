import React, { useEffect, useRef, useState } from "react";
import { chatURL } from "../Api/axiosInstance";

export default function Chat({ userId = "u_local" }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    setError("");
    const next = [...messages, { role: "user", content: input.trim() }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const resp = await fetch(chatURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, userId }),
        signal: ac.signal,
      });

      if (!resp.ok || !resp.body) {
        let msg = "Server error";
        try {
          const data = await resp.json();
          if (data?.error) msg = data.error;
        } catch {}
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${msg}` }]);
        setLoading(false);
        return;
      }

      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: assistant };
          return copy;
        });
      }
    } catch (e) {
      if (e.name === "AbortError") {
        setMessages((m) => [...m, { role: "assistant", content: "⏹️ Stopped." }]);
      } else {
        setError("Network error. Check that the API is running and CORS/proxy is set.");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const stop = () => abortRef.current?.abort();

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex h-full flex-col bg-base-100 text-base-content">
      {error && (
        <div className="alert alert-error text-sm shadow-sm">
          <span>{error}</span>
        </div>
      )}

      <div ref={scrollerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm opacity-70">
            👋 Hi! Ask anything about the app.  
            Tip: <kbd className="kbd kbd-xs">Enter</kbd> to send,  
            <kbd className="kbd kbd-xs">Shift</kbd>+<kbd className="kbd kbd-xs">Enter</kbd> for a new line.
          </div>
        )}

        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <div key={i} className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
              <div className={`chat-bubble ${isUser ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                <div className="text-xs font-semibold mb-1 opacity-70">
                  {isUser ? "You" : "Assistant"}
                </div>
                <div>{m.content}</div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-secondary">
              <div className="flex gap-1 items-center">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse delay-100">●</span>
                <span className="animate-pulse delay-200">●</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-base-200 p-2 bg-base-200">
        <div className="flex items-end gap-2">
          <textarea
            className="textarea textarea-bordered textarea-sm w-full"
            rows={2}
            placeholder="Describe your issue…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="btn btn-primary btn-sm"
          >
            Send
          </button>
          <button
            onClick={stop}
            disabled={!loading}
            className="btn btn-ghost btn-sm"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
