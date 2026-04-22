import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist",
  openGraph: {
    title: "Page not found",
    description: "This page does not exist",
    url: "https://your-vercel-url.vercel.app/not-found",
    images: [
      "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    ],
  },
};

export default function NotFound() {
  return <h1>404 - Not Found</h1>;
}