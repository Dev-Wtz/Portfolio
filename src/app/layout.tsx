import type { Metadata, Viewport } from "next";
import { geistSans, playfairDisplay } from "@/lib/fonts";
import { siteCopy } from "@/lib/site-copy";
import { getSiteUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const siteUrl = getSiteUrl();

const twitterRaw = process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim();
const twitterCreator =
  twitterRaw && twitterRaw.length > 0
    ? twitterRaw.startsWith("@")
      ? twitterRaw
      : `@${twitterRaw}`
    : undefined;

const googleVerify = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  title: {
    default: siteCopy.meta.title,
    template: `%s · ${siteCopy.seo.personName}`,
  },
  description: siteCopy.meta.description,
  keywords: [...siteCopy.meta.keywords],
  applicationName: siteCopy.seo.appShortName,
  authors: [{ name: siteCopy.seo.personName, url: siteUrl }],
  creator: siteCopy.seo.personName,
  publisher: siteCopy.seo.personName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteCopy.seo.locale,
    url: siteUrl,
    siteName: siteCopy.seo.siteName,
    title: siteCopy.meta.title,
    description: siteCopy.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteCopy.meta.title,
    description: siteCopy.meta.description,
    ...(twitterCreator ? { creator: twitterCreator } : {}),
  },
  ...(googleVerify
    ? { verification: { google: googleVerify } }
    : {}),
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#040605" },
    { color: "#172922" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="noise min-h-full">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
