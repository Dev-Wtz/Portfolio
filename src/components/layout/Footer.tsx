"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { ExternalLink, Mail, Globe, type LucideIcon } from "lucide-react";
import { siteCopy } from "@/lib/site-copy";
import SectionFibers from "@/components/layout/SectionFibers";

interface FooterLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

function buildFooterLinks(): FooterLink[] {
  const links: FooterLink[] = [];

  const web = process.env.NEXT_PUBLIC_WEBSITE_URL?.trim();
  if (web && /^https?:\/\//i.test(web)) {
    links.push({
      icon: Globe,
      href: web,
      label: siteCopy.footer.linkWebsite,
    });
  }

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    links.push({
      icon: Mail,
      href: `mailto:${email}`,
      label: siteCopy.footer.linkEmail,
    });
  }

  const profile = process.env.NEXT_PUBLIC_PROFILE_URL?.trim();
  if (profile && /^https?:\/\//i.test(profile)) {
    links.push({
      icon: ExternalLink,
      href: profile,
      label: siteCopy.footer.linkLinks,
    });
  }

  if (links.length === 0) {
    links.push({
      icon: Mail,
      href: "#contact",
      label: siteCopy.footer.linkContactForm,
    });
  }

  return links;
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const socialLinks = useMemo(() => buildFooterLinks(), []);

  const year = new Date().getFullYear();
  const rightsText = siteCopy.footer.rights.replace(
    "{{year}}",
    String(year)
  );

  return (
    <footer
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-card-border bg-background px-6 py-12"
    >
      <SectionFibers preset="footer" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row"
      >
        <p className="text-sm text-muted">{rightsText}</p>

        <nav aria-label={siteCopy.footer.ariaSocial}>
          <ul className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>
    </footer>
  );
}
