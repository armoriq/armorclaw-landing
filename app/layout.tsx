import type { Metadata } from "next";
import { Sunflower, Inter } from "next/font/google";
import "./globals.css";

const sunflower = Sunflower({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sunflower",
  display: "swap",
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArmorClaw — Intent Assurance for OpenClaw Agents",
  description:
    "Verify every agent action against approved intent before execution. No silent drift. No unauthorized outcomes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sunflower.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
