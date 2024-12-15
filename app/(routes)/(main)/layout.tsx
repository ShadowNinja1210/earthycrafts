import { Providers } from "@/components/providers";
import "../../globals.css";
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  );
}
