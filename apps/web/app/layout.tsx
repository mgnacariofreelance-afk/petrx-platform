import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "../components/theme-toggle";

export const metadata: Metadata = {
  title: "PetRx — Veterinary Care Platform",
  description: "PetRx multi-tenant veterinary clinic management platform.",
  applicationName: "PetRx",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <div className="global-theme-control"><ThemeToggle /></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
