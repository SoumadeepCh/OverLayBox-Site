import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OverlayBox — Style Any Website with Plain English",
  description:
    "OverlayBox is a free Chrome extension that lets you transform any website using natural language commands. Dark mode, animations, themes, macros — all 100% local.",
  keywords: [
    "chrome extension",
    "CSS editor",
    "DOM manipulation",
    "overlay",
    "dark mode",
    "web customization",
    "natural language",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
