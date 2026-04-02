import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sunflower = localFont({
  src: [
    {
      path: "../public/fonts/Sunflower-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Sunflower-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Sunflower-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sunflower",
  display: "swap",
  adjustFontFallback: false,
});

const inter = localFont({
  src: "../public/fonts/Inter.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArmorClaw | Intent Assurance for OpenClaw Agents",
  description:
    "Verify every agent action against approved intent before execution. No silent drift. No unauthorized outcomes.",
  icons: {
    icon: "/images/logo.jpeg",
    apple: "/images/logo.jpeg",
  },
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
