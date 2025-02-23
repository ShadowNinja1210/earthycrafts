import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import TopLoader from "@/components/loaders/top-loader";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earthycrafts",
  description: "Handmade with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <TopLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
