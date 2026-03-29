import Link from "next/link";
import { LEGAL_ROUTES } from "@/lib/legal-config";
import { siteCopy } from "@/lib/site-copy";

const legalNav = [
  { href: LEGAL_ROUTES.mentions, label: siteCopy.footer.linkMentions },
  { href: LEGAL_ROUTES.privacy, label: siteCopy.footer.linkPrivacy },
  { href: LEGAL_ROUTES.cookies, label: siteCopy.footer.linkCookies },
  { href: LEGAL_ROUTES.terms, label: siteCopy.footer.linkTerms },
  { href: LEGAL_ROUTES.a11y, label: siteCopy.footer.linkA11y },
] as const;

export default function LegalSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-card-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-accent transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {siteCopy.legal.backToSite}
          </Link>
          <nav
            aria-label={siteCopy.footer.ariaLegal}
            className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm"
          >
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-card-border px-6 py-8">
        <p className="mx-auto max-w-3xl text-center text-xs text-muted">
          {siteCopy.legal.footerNote}
        </p>
      </footer>
    </div>
  );
}
