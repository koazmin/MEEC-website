"use client";

import { useState } from "react";
import { site } from "@/lib/content";

function ViberIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.2 1C7.1 1 4.5 3.2 4.1 3.6c-2.2 2-3.1 5-3.1 8.3 0 2.8.7 5.3 2.3 7.1.9 1 2.3 1.8 3.7 2.1v2.4c0 .3.2.5.4.5.1 0 .3-.1.4-.2l2.5-2.8c.7.1 1.3.1 2 .1h.1c5.1 0 9.6-2.7 9.6-8.8C22 5.5 18.8 1 12.2 1Zm5.3 13.4c-.5.6-1.5 1.2-2.3 1.4-.1 0-.2.1-.3.1-.5 0-1.4-.3-3.1-1.3-1.4-.8-2.5-1.8-3.4-3-.8-1-1.3-2.1-1.4-3 0-.8.3-1.5.8-2 .3-.3.7-.4 1-.4h.5c.3 0 .6.1.8.7l.7 1.8c.1.3 0 .6-.2.9l-.4.5c-.1.2-.1.4 0 .5.5.9 1.1 1.5 1.8 2 .3.2.7.4 1.1.6.2.1.4.1.5 0l.7-.8c.2-.3.5-.3.8-.2l1.7.9c.4.2.5.5.5.8 0 .2 0 .4-.2.5Z" />
    </svg>
  );
}

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open &&
        site.phones.map((phone) => {
          const cleanPhone = phone.replace(/\s/g, "");
          return (
            <a
              key={phone}
              href={`viber://chat?number=%2B95${cleanPhone.replace(/^0/, "")}`}
              className="group flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-5 pr-2 shadow-[0_10px_30px_-12px_rgba(15,110,86,0.5)] transition-transform hover:scale-[1.03]"
            >
              <span className="text-sm font-semibold tracking-wide text-ink">{phone}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7360f2] text-white">
                <ViberIcon className="h-5 w-5" />
              </span>
            </a>
          );
        })}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Hide contact numbers" : "Show contact numbers"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7360f2] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <ViberIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
