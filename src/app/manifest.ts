import type { MetadataRoute } from "next";
import { siteCopy } from "@/lib/site-copy";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteCopy.seo.appName,
    short_name: siteCopy.seo.appShortName,
    description: siteCopy.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#040605",
    theme_color: "#172922",
    lang: "fr",
    orientation: "portrait-primary",
  };
}
