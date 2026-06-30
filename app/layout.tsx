import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iphoneservicetz.co.tz"),
  title: "iPhone Service TZ | iPhone, Apple & Android Devices Repair in Dar es Salaam",
  description:
    "Professional iPhone, iPad, Android, Apple Watch, and MacBook repair in Mwenge, Dar es Salaam. Book a diagnostic or repair appointment online.",
  openGraph: {
    title: "iPhone Service TZ",
    description: "Premium Apple and Android device repair in Mwenge, Dar es Salaam.",
    type: "website",
    locale: "en_TZ",
    images: ["/images/hero-repair-studio.webp"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f9fc",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
