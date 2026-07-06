"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      message: String(data.get("message") || ""),
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

  const inputClasses = "h-12 w-full rounded-xl border-0 bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-all focus:outline-none focus:ring-4 focus:ring-accent/40";

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
            className={inputClasses}
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
            className={inputClasses}
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
        className={inputClasses}
      />
      <label htmlFor="iq-message" className="sr-only">
        Message
      </label>
      <textarea
        id="iq-message"
        name="message"
        rows={4}
        placeholder="Tell us a little about your goals or questions…"
        className="w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-all focus:outline-none focus:ring-4 focus:ring-accent/40"
      />

      <motion.button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        whileTap={status === "idle" || status === "error" ? { scale: 0.95 } : {}}
        className={`relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-base font-semibold transition-colors ${
          status === "sent" ? "bg-white text-primary-deep" : "bg-accent text-primary-deep hover:bg-accent-soft"
        } disabled:opacity-70`}
      >
        <AnimatePresence mode="wait">
          {status === "sending" ? (
            <motion.span key="sending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              Sending…
            </motion.span>
          ) : status === "sent" ? (
            <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
              Inquiry sent
              <Icon name="check" className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              Send inquiry
              <Icon name="send" className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {status === "sent" && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            role="status" 
            aria-live="polite" 
            className="text-sm text-white/90"
          >
            Thanks — we&rsquo;ve received your inquiry and will be in touch shortly.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }}
            role="alert" 
            className="text-sm text-accent-soft"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
