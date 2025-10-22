import React, { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import Logo from "../../public/Logo.png";

export default function FloatingChat({ userId }) {
  const [open, setOpen] = useState(false);
  const [showUnread, setShowUnread] = useState(false);
  const panelRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Show a small unread dot when panel closed and a message arrives (simple demo)
  // You can wire this to a global store if you want real unread logic.
  useEffect(() => {
    if (!open) {
      // any async notifications could flip this to true
      // here we just clear it when opened
    } else {
      setShowUnread(false);
    }
  }, [open]);

  return (
    <>
      {/* Floating Toggle */}
      <button
        aria-label={open ? "Close support chat" : "Open support chat"}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-5 bottom-5 w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white text-2xl cursor-pointer z-[1000] transition-colors"
      >
        {open ? "×" : "💬"}
        {!open && showUnread && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Support chat"
          className="fixed right-5 bottom-24 w-[360px] max-w-[92vw] h-[520px] max-h-[75vh] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-[1000] flex flex-col animate-[fadeIn_150ms_ease]"
          style={{ animationFillMode: "both" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b bg-gray-50">
            <img src={Logo} alt="Ahar Bondhu" className="h-6 w-6 object-contain rounded" />
            <div className="font-semibold text-sm">Support Assistant</div>
            <div className="ml-auto text-[11px] text-green-600">● online</div>
          </div>

          {/* Body */}
          <div className="flex-1 min-h-0">
            <Chat userId={userId} />
          </div>
        </div>
      )}
    </>
  );
}
