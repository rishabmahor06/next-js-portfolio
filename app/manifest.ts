import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rishab Kumar | Applied AI Engineer",
    short_name: "Rishab Kumar",
    description:
      "Rishab Kumar - Applied AI Engineer working at the intersection of AI, data, and scalable software systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/profile-img.jpg",
        sizes: "639x639",
        type: "image/jpeg",
      },
      {
        src: "/profile-img.jpg",
        sizes: "639x639",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
    categories: [
      "portfolio",
      "ai",
      "software engineering",
      "machine learning",
      "developer",
      "web development",
    ],
    lang: "en",
    dir: "ltr",
    scope: "/",
  };
}
