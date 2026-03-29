/** Dial codes for the contact form prefix selector (E.164). */

export interface PhoneDialOption {
  readonly code: string;
  readonly label: string;
}

export const PHONE_DIAL_OPTIONS: readonly PhoneDialOption[] = [
  { code: "+33", label: "France" },
  { code: "+32", label: "Belgique" },
  { code: "+352", label: "Luxembourg" },
  { code: "+41", label: "Suisse" },
  { code: "+1", label: "États-Unis / Canada" },
  { code: "+44", label: "Royaume-Uni" },
  { code: "+49", label: "Allemagne" },
  { code: "+39", label: "Italie" },
  { code: "+34", label: "Espagne" },
  { code: "+31", label: "Pays-Bas" },
  { code: "+351", label: "Portugal" },
  { code: "+30", label: "Grèce" },
  { code: "+353", label: "Irlande" },
  { code: "+43", label: "Autriche" },
  { code: "+48", label: "Pologne" },
  { code: "+420", label: "République tchèque" },
  { code: "+212", label: "Maroc" },
  { code: "+213", label: "Algérie" },
  { code: "+216", label: "Tunisie" },
  { code: "+221", label: "Sénégal" },
  { code: "+225", label: "Côte d’Ivoire" },
  { code: "+590", label: "Guadeloupe" },
  { code: "+596", label: "Martinique" },
  { code: "+262", label: "La Réunion / Mayotte" },
  { code: "+687", label: "Nouvelle-Calédonie" },
  { code: "+689", label: "Polynésie française" },
] as const;

export const DEFAULT_PHONE_DIAL_CODE = "+33" as const;
