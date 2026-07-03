"use client";

import { useState } from "react";
import Icon from "./Icon";

type Status = "idle" | "sending" | "sent" | "error";

export default function SubscribeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      subject: String(data.get("subject") || ""),
    };

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setMessage(json.error || "Could not send. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form className="mt-6 grid w-full max-w-md gap-3" onSubmit={onSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="iq-name" className="sr-only">
            Your name
          </label>
          <input
            id="iq-name"
            name="name"
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
            name="email"
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
        name="subject"
        type="text"
        placeholder="Subject"
        className="h-12 w-full rounded-xl border-0 bg-white px-4 text-base text-ink placeholder:text-muted/70"
      />
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-primary-deep transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : status === "sent" ? "Inquiry sent" : "Send inquiry"}
        <Icon name={status === "sent" ? "shield" : "send"} className="h-4 w-4" />
      </button>

      {status === "sent" && (
        <p role="status" aria-live="polite" className="text-sm text-white/90">
          Thanks — we&rsquo;ve received your inquiry and will be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-accent-soft">
          {message}
        </p>
      )}
    </form>
  );
}
