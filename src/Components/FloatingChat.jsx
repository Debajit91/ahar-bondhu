import React, { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import Logo from "../../public/Logo.png";
import { BiChat } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function FloatingChat({ userId }) {
  const [open, setOpen] = useState(false);
  const [showUnread, setShowUnread] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    if (open) setShowUnread(false);
  }, [open]);

  return (
    <>
      <button
        aria-label={open ? "Close support chat" : "Open support chat"}
        onClick={() => setOpen((v) => !v)}
        className="btn btn-primary btn-circle fixed right-5 bottom-5 shadow-lg z-[1000]
             w-16 h-16 md:w-20 md:h-20 text-3xl md:text-4xl flex items-center justify-center"
      >
        {open ? <AiOutlineClose /> : <BiChat />}
        {!open && showUnread && (
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-error ring-2 ring-base-100" />
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Support chat"
          className="card fixed right-5 bottom-5 w-[360px] max-w-[92vw] h-[520px] max-h-[75vh] bg-base-100 border border-base-200 shadow-2xl z-[1000] animate-fadeIn flex flex-col"
        >
          <div className="card-title flex items-center gap-2 px-3 py-4 border-b border-base-200 bg-base-200">
            <img
              src={Logo}
              alt="App Logo"
              className="h-6 w-6 object-contain rounded"
            />
            <div className="font-semibold text-sm">Support Assistant</div>
            <div className="ml-auto text-xs text-success">● online</div>
          </div>

          <div className="flex-1 min-h-0">
            <Chat userId={userId} />
          </div>
        </div>
      )}
    </>
  );
}
