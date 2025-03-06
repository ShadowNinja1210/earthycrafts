"use client";

import { Providers } from "@/components/providers";
import "../../globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { ContactFloater } from "@/components/contact/contacts-floater";
import { BackToTop } from "@/components/back-to-top";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <Providers>
      <Navbar className={path === "/products" ? "sticky top-0" : ""} />
      <ContactFloater />
      {children}
      <BackToTop />
      {path !== "/products" && <Footer />}
    </Providers>
  );
}
