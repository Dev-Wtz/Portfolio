import { siteCopy } from "@/lib/site-copy";
import { getSiteUrl } from "@/lib/seo";

/**
 * Identité et hébergement : renseigner via variables d’environnement
 * NEXT_PUBLIC_* pour affichage public (obligatoire en production pour les mentions légales).
 */
export interface LegalPublisherConfig {
  siteUrl: string;
  publisherName: string;
  legalForm: string;
  addressLine: string;
  siret: string;
  vatNumber: string;
  email: string;
  phone: string;
  hostName: string;
  hostAddress: string;
  hostPhone: string;
  dpoEmail: string;
  /** URL de la CNIL pour réclamation */
  cnilComplaintUrl: string;
}

function envOr(key: string, fallback: string): string {
  const v = process.env[key]?.trim();
  return v && v.length > 0 ? v : fallback;
}

export function getLegalPublisherConfig(): LegalPublisherConfig {
  const siteUrl = getSiteUrl();
  const contactEmail = envOr(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    "devwtz@gmail.com"
  );
  return {
    siteUrl,
    publisherName: envOr(
      "NEXT_PUBLIC_LEGAL_PUBLISHER_NAME",
      siteCopy.seo.personName
    ),
    legalForm: envOr(
      "NEXT_PUBLIC_LEGAL_FORM",
      "Auto-entrepreneur"
    ),
    addressLine: envOr(
      "NEXT_PUBLIC_LEGAL_ADDRESS",
      "22 rue du Général Pershing, 54400 Longwy, France"
    ),
    siret: envOr(
      "NEXT_PUBLIC_LEGAL_SIRET",
      "933 664 674 00019"
    ),
    vatNumber: envOr(
      "NEXT_PUBLIC_LEGAL_VAT_NUMBER",
      "TVA non applicable, article 293 B du CGI"
    ),
    email: contactEmail,
    phone: envOr(
      "NEXT_PUBLIC_LEGAL_PHONE",
      "+33 6 15 83 77 84"
    ),
    hostName: envOr("NEXT_PUBLIC_HOST_NAME", "Vercel Inc."),
    hostAddress: envOr(
      "NEXT_PUBLIC_HOST_ADDRESS",
      "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis"
    ),
    hostPhone: envOr(
      "NEXT_PUBLIC_HOST_PHONE",
      "Support : https://vercel.com/help"
    ),
    dpoEmail: envOr("NEXT_PUBLIC_DPO_EMAIL", contactEmail),
    cnilComplaintUrl: "https://www.cnil.fr/fr/plaintes",
  };
}

export const LEGAL_ROUTES = {
  mentions: "/legal/mentions-legales",
  privacy: "/legal/politique-confidentialite",
  cookies: "/legal/politique-cookies",
  terms: "/legal/cgu",
  a11y: "/legal/declaration-accessibilite",
} as const;

export const COOKIE_CONSENT_KEY = "portfolio_cookie_consent_v1";
export const COOKIE_CONSENT_VERSION = "1";
