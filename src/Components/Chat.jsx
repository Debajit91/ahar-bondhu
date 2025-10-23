import React, { useEffect, useRef, useState } from "react";
import { chatURL } from "../Api/axiosInstance";

export default function Chat({ userId = "u_local" }) {
  const [messages, setMessages] = useState([]); // [{role:'user'|'assistant', content:string}]
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);
  const scrollerRef = useRef(null);

  // Auto-scroll
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
        } catch (_) {}
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${msg}` }]);
        setLoading(false);
        return;
      }

      // Start a new assistant message and stream into it
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
    <div className="flex h-full flex-col bg-white">
      {/* Error banner */}
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-3 py-2 border-b border-red-200">
          {error}
        </div>
      )}

      {/* Messages area */}
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-white"
      >
        {messages.length === 0 && (
          <div className="text-gray-500 text-sm">
            👋 Hi! Ask anything about the app and I’ll help. Tip: press <kbd className="px-1 py-0.5 bg-gray-100 border rounded">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-gray-100 border rounded">Shift</kbd>+<kbd className="px-1 py-0.5 bg-gray-100 border rounded">Enter</kbd> for a new line.
          </div>
        )}

        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={[
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  isUser
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200",
                ].join(" ")}
              >
                {!isUser && <div className="text-[11px] font-semibold mb-1 text-gray-600">Assistant</div>}
                {isUser && <div className="text-[11px] font-semibold mb-1 text-blue-100">You</div>}
                <div>{m.content}</div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 border border-gray-200 text-gray-900 rounded-2xl rounded-bl-md px-3 py-2 text-sm">
              <div className="text-[11px] font-semibold mb-1 text-gray-600">Assistant</div>
              <div className="flex gap-1 items-center">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse" style={{ animationDelay: "100ms" }}>●</span>
                <span className="animate-pulse" style={{ animationDelay: "200ms" }}>●</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t bg-white p-2">
        <div className="flex items-end gap-2">
          <textarea
            className="flex-1 resize-none rounded-lg border border-gray-300 p-2 text-sm text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className={`h-10 px-4 rounded-lg text-sm font-medium text-white ${loading || !input.trim()
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
            title="Send (Enter)"
          >
            Send
          </button>
          <button
            onClick={stop}
            disabled={!loading}
            className={`h-10 px-3 rounded-lg text-sm font-medium border ${!loading
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            title="Stop streaming"
          >
            Stop
          </button>
        </div>
        <div className="mt-1 text-[11px] text-gray-500">
          Press <kbd className="px-1 py-0.5 bg-gray-100 border rounded">Enter</kbd> to send • <kbd className="px-1 py-0.5 bg-gray-100 border rounded">Shift</kbd>+<kbd className="px-1 py-0.5 bg-gray-100 border rounded">Enter</kbd> for a new line
        </div>
      </div>
    </div>
  );
}
