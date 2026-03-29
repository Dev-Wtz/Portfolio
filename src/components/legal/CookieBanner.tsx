"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_VERSION,
  LEGAL_ROUTES,
} from "@/lib/legal-config";
import { siteCopy } from "@/lib/site-copy";

export interface CookieConsentValue {
  v: string;
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

function parseStored(raw: string | null): CookieConsentValue | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as CookieConsentValue;
    if (o.v !== COOKIE_CONSENT_VERSION) return null;
    if (o.essential !== true) return null;
    return o;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const stored = parseStored(localStorage.getItem(COOKIE_CONSENT_KEY));
      setVisible(stored === null);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const persist = useCallback((analytics: boolean, marketing: boolean) => {
    const value: CookieConsentValue = {
      v: COOKIE_CONSENT_VERSION,
      essential: true,
      analytics,
      marketing,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-updated"));
  }, []);

  if (!visible) {
    return null;
  }

  const copy = siteCopy.cookieBanner;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-card-border bg-background/98 p-4 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="min-w-0 flex-1 space-y-2">
          <h2
            id="cookie-banner-title"
            className="font-serif text-lg font-semibold text-foreground"
          >
            {copy.title}
          </h2>
          <p id="cookie-banner-desc" className="text-sm leading-relaxed text-muted">
            {copy.body}{" "}
            <Link
              href={LEGAL_ROUTES.cookies}
              className="text-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {copy.policy}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            className="rounded-xl border border-card-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => persist(false, false)}
          >
            {copy.rejectOptional}
          </button>
          <button
            type="button"
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => persist(true, false)}
          >
            {copy.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
