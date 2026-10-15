import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { profile } from "@/content/profile";

export async function POST(req: Request) {
  const ip = clientKey(req.headers);
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many messages, please try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const { name, email, message } = parsed.data;
  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: profile.email,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
