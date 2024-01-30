/** @format */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perhitungan SWOT",
  description: "Website menghitung SWOT pada UOGP",
  authors: [{ name: "Thina" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-color-2">{children}</body>
    </html>
  );
}
