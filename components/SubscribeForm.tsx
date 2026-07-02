"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function SubscribeForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-6 grid w-full max-w-md gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="iq-name" className="sr-only">
            Your name
          </label>
          <input
            id="iq-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-12 w-full rounded-xl border-0 bg-white px-4 text-base text-ink placeholder:text-muted/70"
          />
        </div>
        <div>
          <label htmlFor="iq-email" className="sr-only">
            Email address
          </label>
          <input
            id="iq-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="your@email.com"
            className="h-12 w-full rounded-xl border-0 bg-white px-4 text-base text-ink placeholder:text-muted/70"
          />
        </div>
      </div>
      <label htmlFor="iq-subject" className="sr-only">
        Subject
      </label>
      <input
        id="iq-subject"
        type="text"
        placeholder="Subject"
        className="h-12 w-full rounded-xl border-0 bg-white px-4 text-base text-ink placeholder:text-muted/70"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-primary-deep transition-transform hover:scale-[1.02] active:scale-95"
      >
        {sent ? "Inquiry sent" : "Send inquiry"}
        <Icon name={sent ? "shield" : "send"} className="h-4 w-4" />
      </button>
      {sent && (
        <p role="status" aria-live="polite" className="text-sm text-white/85">
          Thanks — we&rsquo;ll be in touch shortly.
        </p>
      )}
    </form>
  );
}
