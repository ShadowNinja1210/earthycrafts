import type { Metadata } from "next";
import "../../../globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "@/components/dashboard/app-side-bar";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { BackToTop } from "@/components/back-to-top";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Earthycrafts",
  description: "Dashboard for Earthycrafts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Providers>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSideBar />
              <main className="container px-4 py-4">
                <SidebarTrigger />
                <Toaster />
                {children}
                <BackToTop />
              </main>
            </SidebarProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
