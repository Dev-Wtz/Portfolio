import nodemailer from "nodemailer";
import {
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  isValidContactPhone,
} from "@/lib/contact-validation";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ParsedContactRequest =
  | { type: "spam" }
  | { type: "invalid"; error: string }
  | { type: "valid"; payload: ContactPayload };

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
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (!isValidContactName(name)) {
    return { type: "invalid", error: "Nom invalide." };
  }
  if (!isValidContactEmail(email)) {
    return { type: "invalid", error: "Adresse e-mail invalide." };
  }
  if (!isValidContactPhone(phone)) {
    return { type: "invalid", error: "Numéro de téléphone invalide." };
  }
  if (!isValidContactMessage(message)) {
    return { type: "invalid", error: "Message invalide." };
  }

  return { type: "valid", payload: { name, email, phone, message } };
}

function replyToHeader(name: string, email: string): string {
  const safe = name.replace(/["\\\r\n]/g, "").trim() || "Contact";
  return `"${safe}" <${email}>`;
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const user = process.env.CONTACT_SMTP_USER?.trim();
  const pass = process.env.CONTACT_SMTP_PASS?.trim();
  const toRaw =
    process.env.CONTACT_MAIL_TO?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  if (!toRaw) {
    throw new Error("MAIL_TO_NOT_CONFIGURED");
  }

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
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });

  const fromName =
    process.env.CONTACT_MAIL_FROM_NAME?.trim() || "Portfolio — Contact";

  const subjectName =
    payload.name.length > 80 ? `${payload.name.slice(0, 77)}…` : payload.name;
  const sentAt = new Date().toISOString();
  const sentAtLocal = new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });

  await transporter.sendMail({
    from: `"${fromName.replace(/"/g, "")}" <${user}>`,
    to: toRaw,
    replyTo: replyToHeader(payload.name, payload.email),
    subject: `[Portfolio — Contact] ${subjectName}`,
    text: [
      `Nouveau message depuis le formulaire du portfolio.`,
      `Reçu le : ${sentAtLocal} (${sentAt})`,
      "",
      `Nom : ${payload.name}`,
      `E-mail : ${payload.email}`,
      `Téléphone : ${payload.phone}`,
      "",
      "Message :",
      payload.message,
    ].join("\n"),
    html: `<p style="margin:0 0 1em;color:#555;font-size:14px">Message reçu via le formulaire — <time datetime="${escapeHtml(sentAt)}">${escapeHtml(sentAtLocal)}</time></p>
<hr style="border:none;border-top:1px solid #ddd;margin:0 0 1em" />
<p><strong>Nom</strong> : ${escapeHtml(payload.name)}</p>
<p><strong>E-mail</strong> : <a href="mailto:${encodeURIComponent(payload.email)}">${escapeHtml(payload.email)}</a></p>
<p><strong>Téléphone</strong> : <a href="tel:${escapeHtml(payload.phone.replace(/[^\d+]/g, ""))}">${escapeHtml(payload.phone)}</a></p>
<p><strong>Message</strong></p>
<p style="white-space:pre-wrap">${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>`,
  });
}
