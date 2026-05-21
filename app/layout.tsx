import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "CHEZ MISS - Luxury, Beauty, Confidence",
  description: "Premium beauty products for professionals and enthusiasts.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
