import type { Metadata } from "next";
import "./globals.css";
import "@/styles/features.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";

export const metadata: Metadata = {
  title: "Ковры Дорожки Ковролин — интернет-магазин ковров",
  description: "Интернет-магазин ковров, дорожек и ковролина.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <CartToast />
        <Footer />
      </body>
    </html>
  );
}
