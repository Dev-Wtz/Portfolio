import { buildHomeJsonLd } from "@/lib/json-ld";

export default function JsonLd() {
  const data = buildHomeJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
