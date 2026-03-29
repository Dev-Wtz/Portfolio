import { PROJECT_META } from "@/lib/constants";
import { siteCopy } from "@/lib/site-copy";
import { getSiteUrl } from "@/lib/seo";

interface GraphEntity {
  "@type": string;
  "@id": string;
  [key: string]: unknown;
}

/**
 * Single @graph: WebSite + WebPage + Person + ProfessionalService (verifiable from on-page copy).
 */
export function buildHomeJsonLd(): Record<string, unknown> {
  const base = getSiteUrl();
  const websiteId = `${base}/#website`;
  const webpageId = `${base}/#webpage`;
  const personId = `${base}/#person`;
  const serviceId = `${base}/#professionalService`;

  const ogImage = `${base}/opengraph-image`;
  const featuredWorkId = `${base}/#featuredWork`;

  const knowsAbout = [
    "Développement web",
    "Design UI/UX",
    "React",
    "Next.js",
    "Performance web",
    "WebGL",
    "Accessibilité",
  ];

  const serviceTypes = [
    siteCopy.services.web.title,
    siteCopy.services.ui.title,
    siteCopy.services.creative.title,
    siteCopy.services.perf.title,
    siteCopy.services.aiAutomation.title,
    siteCopy.services.customSoftware.title,
  ];

  const itemListElement = PROJECT_META.map((meta, i) => {
    const p = siteCopy.work.projects[meta.slug];
    return {
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.description,
    };
  });

  const graph: GraphEntity[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: base,
      name: siteCopy.seo.siteName,
      description: siteCopy.meta.description,
      inLanguage: siteCopy.seo.locale.replace("_", "-"),
      publisher: { "@id": personId },
    },
    {
      "@type": "ItemList",
      "@id": featuredWorkId,
      name: siteCopy.work.title,
      description: siteCopy.work.description,
      itemListElement,
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: base,
      name: siteCopy.meta.title,
      description: siteCopy.meta.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      hasPart: { "@id": featuredWorkId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImage,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: siteCopy.seo.personName,
      url: base,
      jobTitle: siteCopy.seo.jobTitle,
      description: siteCopy.meta.description,
      knowsAbout,
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: siteCopy.seo.siteName,
      url: base,
      description: siteCopy.services.description,
      provider: { "@id": personId },
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      serviceType: serviceTypes,
    },
  ];

  const sameAs = buildSameAsUrls();
  if (sameAs.length > 0) {
    const person = graph.find((g) => g["@id"] === personId);
    if (person) {
      person.sameAs = sameAs;
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function buildSameAsUrls(): string[] {
  const out: string[] = [];
  const website = process.env.NEXT_PUBLIC_WEBSITE_URL?.trim();
  const github = process.env.NEXT_PUBLIC_GITHUB_URL?.trim();
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();

  if (website && /^https?:\/\//i.test(website)) {
    out.push(website);
  }
  if (github && /^https?:\/\//i.test(github)) {
    out.push(github);
  }
  if (linkedin && /^https?:\/\//i.test(linkedin)) {
    out.push(linkedin);
  }
  return out;
}
