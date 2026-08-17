import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetRx — Veterinary Care Platform",
  description: "PetRx multi-tenant veterinary clinic management platform.",
  applicationName: "PetRx",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
