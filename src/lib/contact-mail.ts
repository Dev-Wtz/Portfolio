import nodemailer from "nodemailer";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ParsedContactRequest =
  | { type: "spam" }
  | { type: "invalid"; error: string }
  | { type: "valid"; payload: ContactPayload };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function parseContactRequest(body: unknown): ParsedContactRequest {
  if (body === null || typeof body !== "object") {
    return { type: "invalid", error: "Requête invalide." };
  }

  const o = body as Record<string, unknown>;

  if (typeof o.website === "string" && o.website.trim().length > 0) {
    return { type: "spam" };
  }

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (name.length < 2 || name.length > 120) {
    return { type: "invalid", error: "Nom invalide." };
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { type: "invalid", error: "Adresse e-mail invalide." };
  }
  if (message.length < 10 || message.length > 8000) {
    return { type: "invalid", error: "Message invalide." };
  }

  return { type: "valid", payload: { name, email, message } };
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const user = process.env.CONTACT_SMTP_USER?.trim();
  const pass = process.env.CONTACT_SMTP_PASS?.trim();
  const toRaw =
    process.env.CONTACT_MAIL_TO?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "devwtz@gmail.com";

  if (!user || !pass) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const host = process.env.CONTACT_SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.CONTACT_SMTP_PORT) || 465;
  const secureEnv = process.env.CONTACT_SMTP_SECURE?.trim();
  const secure =
    secureEnv === "true" || (secureEnv !== "false" && port === 465);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure && port === 587,
    auth: { user, pass },
  });

  const fromName =
    process.env.CONTACT_MAIL_FROM_NAME?.trim() || "Portfolio — Contact";

  const subjectName =
    payload.name.length > 80 ? `${payload.name.slice(0, 77)}…` : payload.name;

  await transporter.sendMail({
    from: `"${fromName.replace(/"/g, "")}" <${user}>`,
    to: toRaw,
    replyTo: payload.email,
    subject: `[Portfolio] Message de ${subjectName}`,
    text: [`Nom : ${payload.name}`, `E-mail : ${payload.email}`, "", payload.message].join(
      "\n"
    ),
    html: `<p><strong>Nom</strong> : ${escapeHtml(payload.name)}</p>
<p><strong>E-mail</strong> : ${escapeHtml(payload.email)}</p>
<p><strong>Message</strong></p>
<p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>`,
  });
}
