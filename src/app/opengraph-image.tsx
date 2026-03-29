import { ImageResponse } from "next/og";
import { siteCopy } from "@/lib/site-copy";

export const alt = siteCopy.meta.title;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #0d1814 0%, #172922 42%, #0a1210 100%)",
          padding: 72,
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#e6ede8",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 920,
          }}
        >
          {siteCopy.seo.personName}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 30,
            fontWeight: 500,
            color: "#8fa99a",
            maxWidth: 860,
            lineHeight: 1.35,
          }}
        >
          {siteCopy.seo.jobTitle}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#4a7a5c",
            fontWeight: 500,
          }}
        >
          {siteCopy.seo.siteName}
        </div>
      </div>
    ),
    { ...size }
  );
}
