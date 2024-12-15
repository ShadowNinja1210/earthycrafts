import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earthycrafts",
  description: "Dashboard for Earthycrafts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased flex justify-center items-center min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
