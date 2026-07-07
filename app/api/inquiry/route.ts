import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  // cPanel mailbox SMTP (e.g. mail.meec.edu.mm:465, inquiry@meec.edu.mm).
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.INQUIRY_TO_EMAIL || user;

  if (!host || !user || !pass || !to) {
    // Not configured yet — fail clearly so the form can show a helpful message.
    return NextResponse.json(
      { error: "The inquiry inbox isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // SSL on 465, STARTTLS otherwise
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"MEEC Website" <${user}>`,
      to,
      replyTo: email,
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
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Inquiry SMTP error:", err);
    return NextResponse.json({ error: "Could not send your inquiry. Please try again." }, { status: 502 });
  }
}
