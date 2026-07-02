"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import Icon from "./Icon";

export default function FloatingContact() {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open &&
        site.phones.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="group flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-5 pr-2 shadow-[0_10px_30px_-12px_rgba(15,110,86,0.5)] transition-transform hover:scale-[1.03]"
          >
            <span className="text-sm font-semibold tracking-wide text-ink">{phone}</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7360f2] text-white">
              <Icon name="phone" className="h-5 w-5" />
            </span>
          </a>
        ))}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Hide contact numbers" : "Show contact numbers"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <Icon name={open ? "arrow" : "phone"} className={`h-5 w-5 ${open ? "rotate-90" : ""}`} />
      </button>
    </div>
  );
}
