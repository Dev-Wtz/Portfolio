/** Shared rules for the contact form (client + API). No server-only imports. */

export const CONTACT_NAME_MIN = 2;
export const CONTACT_NAME_MAX = 120;

export const CONTACT_MESSAGE_MIN = 30;
export const CONTACT_MESSAGE_MAX = 500;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * E.164-style: optional +, then 10–15 digits (espaces, points, tirets ignorés).
 */
export function isValidContactPhone(raw: string): boolean {
  const compact = raw.trim().replace(/[\s().-]/g, "");
  const digits = compact.startsWith("+") ? compact.slice(1) : compact;
  if (!/^\d+$/.test(digits)) return false;
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidContactEmail(email: string): boolean {
  const t = email.trim();
  return EMAIL_RE.test(t) && t.length <= 254;
}

export function isValidContactName(name: string): boolean {
  const t = name.trim();
  if (/\d/.test(t)) return false;
  return t.length >= CONTACT_NAME_MIN && t.length <= CONTACT_NAME_MAX;
}

/** Indicatifs où un 0 national de tête est retiré avant composition (hors +1). */
const DIAL_STRIP_LEADING_ZERO = new Set([
  "+33",
  "+32",
  "+352",
  "+41",
  "+44",
  "+49",
  "+39",
  "+34",
  "+31",
  "+351",
  "+30",
  "+353",
  "+43",
  "+48",
  "+420",
]);

/**
 * Compose indicatif + saisie nationale (chiffres uniquement conservés).
 * Pour plusieurs indicatifs EU, supprime un 0 de tête sur le national.
 */
export function composeInternationalPhone(
  dialCode: string,
  nationalRaw: string
): string {
  const dial = dialCode.trim().startsWith("+")
    ? dialCode.trim()
    : `+${dialCode.trim()}`;
  let n = nationalRaw.replace(/\D/g, "");
  if (n.length === 0) return dial;
  if (DIAL_STRIP_LEADING_ZERO.has(dial) && n.startsWith("0")) {
    n = n.slice(1);
  }
  return `${dial}${n}`;
}

export function isValidComposedContactPhone(
  dialCode: string,
  nationalRaw: string
): boolean {
  return isValidContactPhone(composeInternationalPhone(dialCode, nationalRaw));
}

export function isValidContactMessage(message: string): boolean {
  const t = message.trim();
  return t.length >= CONTACT_MESSAGE_MIN && t.length <= CONTACT_MESSAGE_MAX;
}
