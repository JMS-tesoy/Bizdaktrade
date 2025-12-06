import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bizdaktrade - Professional Forex Copy Trading",
  description:
    "Copy professional forex trading signals directly to your MT5 account. Real-time signal delivery via REST API.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};
