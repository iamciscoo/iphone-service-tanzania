import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iphoneservicetz.co.tz"),
  title: "iPhone Service TZ | iPhone, iPad & Android Repair in Dar es Salaam",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
