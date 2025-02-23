"use client";

import IntroLoader from "@/components/loaders/intro-loader";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redirect to home page after loading
    const timeout = setTimeout(() => {
      redirect("/home");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <IntroLoader />;
}
