import type { Metadata } from "next";
import "./globals.css";
import "@/styles/features.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BAYAN SÚLU — интернет-магазин ковров",
  description: "Интернет-магазин ковров, дорожек и ковролина.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body><Header />{children}<Footer /></body>
    </html>
  );
}
