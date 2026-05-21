import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootLayoutClient } from "./root-layout-client";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export const viewport: Viewport = {
  themeColor: "#B79A5B",
};

export const metadata: Metadata = {
  title: "CHEZ MISS - Luxury, Beauty, Confidence",
  description: "Premium beauty products for professionals and enthusiasts.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-heart-96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/logo-heart-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CHEZ MISS",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CHEZ MISS" />
        <meta name="msapplication-TileColor" content="#B79A5B" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-heart-192.png" />
      </head>
      <body className="antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
