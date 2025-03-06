"use client";

import { Providers } from "@/components/providers";
import "../../globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { ContactFloater } from "@/components/contact/contacts-floater";
import { BackToTop } from "@/components/back-to-top";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <Providers>
      <Head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Earthycrafts" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Navbar className={path === "/products" ? "sticky top-0" : ""} />
      <ContactFloater />
      {children}
      <BackToTop />
      {path !== "/products" && <Footer />}
    </Providers>
  );
}
