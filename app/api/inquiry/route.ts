import { NextResponse } from "next/server";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim().slice(0, 5000);

  if (!name || !email) {
    return NextResponse.json({ error: "Please provide your name and email." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.RESEND_FROM || "MEEC Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Not configured yet — fail clearly so the form can show a helpful message.
    return NextResponse.json(
      { error: "The inquiry inbox isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New inquiry from ${name}${subject ? ` — ${subject}` : ""}`,
        html: `
          <h2 style="font-family:sans-serif">New website inquiry</h2>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
            <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding:4px 12px 4px 0"><strong>Subject</strong></td><td>${escapeHtml(subject || "—")}</td></tr>
          </table>
          ${
            message
              ? `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #0f6e56;padding-left:12px;margin-top:16px">${escapeHtml(message)}</p>`
              : ""
          }
          <p style="font-family:sans-serif;font-size:12px;color:#777">Sent from the MEEC website contact form.</p>
        `,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return NextResponse.json({ error: "Could not send your inquiry. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Inquiry route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
